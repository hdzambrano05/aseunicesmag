<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Obligacion;
use App\Models\TipoObligacion;
use App\Models\PeriodoCobro;
use App\Services\CalculoObligacionService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ObligacionController extends Controller
{
    public function generarAfiliacion(Request $request, CalculoObligacionService $service)
    {
        $request->validate([
            'asociado_id' => 'required|exists:asociados,id',
            'anio' => 'required|integer',
            'aplica_practica' => 'nullable|boolean',
        ]);

        return DB::transaction(function () use ($request, $service) {
            $tipo = TipoObligacion::where('codigo', 'AFILIACION')->firstOrFail();

            $calculo = $service->calcularAfiliacion(
                $request->anio,
                $request->aplica_practica ?? false
            );

            $obligacion = Obligacion::create([
                'asociado_id' => $request->asociado_id,
                'tipo_obligacion_id' => $tipo->id,
                'periodo_id' => null,
                'smmlv_id' => $calculo['smmlv_id'],
                'numero_obligacion' => 'AFI-' . now()->format('YmdHis') . '-' . $request->asociado_id,
                'concepto' => 'Cuota de afiliación',
                'valor_base' => $calculo['valor_base'],
                'valor_descuento' => $calculo['valor_descuento'],
                'valor_recargo' => 0,
                'saldo_pendiente' => $calculo['saldo_pendiente'],
                'estado' => $calculo['saldo_pendiente'] <= 0 ? 'PAGADA' : 'PENDIENTE',
                'fecha_generacion' => now(),
                'fecha_vencimiento' => now()->addDays(30),
                'observacion' => $request->aplica_practica ? 'Descuento por práctica empresarial' : null,
                'generada_automaticamente' => 1,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Obligación de afiliación generada correctamente',
                'data' => $obligacion,
            ]);
        });
    }

    public function estadoPagoAsociado($asociadoId)
    {
        $obligacionesPendientes = Obligacion::with([
            'tipoObligacion',
            'periodo'
        ])
            ->where('asociado_id', $asociadoId)
            ->whereIn('estado', ['PENDIENTE', 'VENCIDA'])
            ->where('saldo_pendiente', '>', 0)
            ->orderBy('fecha_vencimiento', 'asc')
            ->get();

        $totalPendiente = $obligacionesPendientes->sum('saldo_pendiente');

        return response()->json([
            'success' => true,
            'tiene_deuda' => $totalPendiente > 0,
            'total_pendiente' => $totalPendiente,
            'obligaciones' => $obligacionesPendientes,
        ]);
    }

    public function generarSostenimiento(Request $request, CalculoObligacionService $service)
    {
        $request->validate([
            'asociado_id' => 'required|exists:asociados,id',
            'anio' => 'required|integer',
            'modalidad' => 'required|in:MENSUAL,SEMESTRAL,ANUAL',
            'periodo_id' => 'nullable|exists:periodos_cobro,id',
            'referidos_validos' => 'nullable|integer|min:0',
        ]);

        return DB::transaction(function () use ($request, $service) {
            $tipo = TipoObligacion::where('codigo', 'SOSTENIMIENTO')->firstOrFail();

            $calculo = $service->calcularSostenimiento(
                $request->anio,
                $request->modalidad,
                now(),
                $request->referidos_validos ?? 0
            );

            $periodo = null;

            if ($request->periodo_id) {
                $periodo = PeriodoCobro::find($request->periodo_id);
            }

            $obligacion = Obligacion::create([
                'asociado_id' => $request->asociado_id,
                'tipo_obligacion_id' => $tipo->id,
                'periodo_id' => $request->periodo_id ?? null,
                'smmlv_id' => $calculo['smmlv_id'],
                'numero_obligacion' => 'SOS-' . now()->format('YmdHis') . '-' . $request->asociado_id,
                'concepto' => 'Cuota de sostenimiento ' . $request->modalidad,
                'valor_base' => $calculo['valor_base'],
                'valor_descuento' => $calculo['valor_descuento'],
                'valor_recargo' => 0,
                'saldo_pendiente' => $calculo['saldo_pendiente'],
                'estado' => $calculo['saldo_pendiente'] <= 0 ? 'PAGADA' : 'PENDIENTE',
                'fecha_generacion' => now(),
                'fecha_vencimiento' => $periodo ? $periodo->fecha_fin : now()->addDays(30),
                'observacion' => 'Modalidad: ' . $request->modalidad,
                'generada_automaticamente' => 1,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Obligación de sostenimiento generada correctamente',
                'data' => $obligacion,
            ]);
        });
    }

    public function obligacionesPorAsociado($asociadoId)
    {
        $obligaciones = Obligacion::with(['tipoObligacion', 'periodo', 'smmlv'])
            ->where('asociado_id', $asociadoId)
            ->orderByDesc('fecha_generacion')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $obligaciones,
        ]);
    }
}
