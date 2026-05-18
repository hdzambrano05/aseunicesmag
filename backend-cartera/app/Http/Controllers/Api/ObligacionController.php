<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Asociado;
use App\Models\Obligacion;
use App\Models\PeriodoCobro;
use App\Models\TipoObligacion;
use App\Services\CalculoObligacionService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ObligacionController extends Controller
{
    public function generarAfiliacion(Request $request, CalculoObligacionService $service)
    {
        $request->validate([
            'asociado_id' => 'required|exists:asociados,id',
            'anio' => 'nullable|integer',
            'aplica_practica' => 'nullable|boolean',
        ]);

        try {
            return DB::transaction(function () use ($request, $service) {
                $asociado = Asociado::find($request->asociado_id);

                if (!$asociado) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Asociado no encontrado',
                    ], 404);
                }

                $tipo = TipoObligacion::where('codigo', 'AFILIACION')->first();

                if (!$tipo) {
                    return response()->json([
                        'success' => false,
                        'message' => 'No existe el tipo de obligación AFILIACION',
                    ], 400);
                }

                $anio = $request->anio ?? now()->year;

                $yaTieneAfiliacion = Obligacion::where('asociado_id', $asociado->id)
                    ->where('tipo_obligacion_id', $tipo->id)
                    ->whereIn('estado', ['PENDIENTE', 'EN_REVISION', 'PAGADA'])
                    ->exists();

                if ($yaTieneAfiliacion) {
                    return response()->json([
                        'success' => false,
                        'message' => 'El asociado ya tiene una obligación de afiliación registrada',
                    ], 409);
                }

                $calculo = $service->calcularAfiliacion(
                    $anio,
                    $request->boolean('aplica_practica', false)
                );

                $obligacion = Obligacion::create([
                    'asociado_id' => $asociado->id,
                    'tipo_obligacion_id' => $tipo->id,
                    'periodo_id' => null,
                    'smmlv_id' => $calculo['smmlv_id'],
                    'numero_obligacion' => 'AFI-' . now()->format('YmdHis') . '-' . $asociado->id,
                    'concepto' => 'Cuota de afiliación',
                    'valor_base' => $calculo['valor_base'],
                    'valor_descuento' => $calculo['valor_descuento'],
                    'valor_recargo' => $calculo['valor_recargo'],
                    'saldo_pendiente' => $calculo['saldo_pendiente'],
                    'estado' => $calculo['saldo_pendiente'] <= 0 ? 'PAGADA' : 'PENDIENTE',
                    'fecha_generacion' => now(),
                    'fecha_vencimiento' => now()->addDays(30)->toDateString(),
                    'observacion' => $request->boolean('aplica_practica', false)
                        ? 'Descuento del 50% por práctica empresarial'
                        : 'Afiliación equivalente al 5% del SMMLV',
                    'generada_automaticamente' => 1,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);

                return response()->json([
                    'success' => true,
                    'message' => 'Obligación de afiliación generada correctamente',
                    'data' => [
                        'obligacion' => $obligacion,
                        'calculo' => $calculo,
                    ],
                ], 201);
            });
        } catch (\Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al generar obligación de afiliación',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function generarSostenimiento(Request $request, CalculoObligacionService $service)
    {
        $request->validate([
            'asociado_id' => 'required|exists:asociados,id',
            'anio' => 'nullable|integer',
            'modalidad' => 'required|in:MENSUAL,SEMESTRAL,ANUAL',
            'periodo_id' => 'nullable|exists:periodos_cobro,id',
            'fecha_pago' => 'nullable|date',
            'referidos_validos' => 'nullable|integer|min:0',
        ]);

        try {
            return DB::transaction(function () use ($request, $service) {
                $asociado = Asociado::find($request->asociado_id);

                if (!$asociado) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Asociado no encontrado',
                    ], 404);
                }

                $tipo = TipoObligacion::where('codigo', 'SOSTENIMIENTO')->first();

                if (!$tipo) {
                    return response()->json([
                        'success' => false,
                        'message' => 'No existe el tipo de obligación SOSTENIMIENTO',
                    ], 400);
                }

                $anio = $request->anio ?? now()->year;
                $modalidad = strtoupper($request->modalidad);

                $fechaPago = $request->fecha_pago
                    ? \Carbon\Carbon::parse($request->fecha_pago)
                    : now();

                $calculo = $service->calcularSostenimiento(
                    $anio,
                    $modalidad,
                    $fechaPago,
                    intval($request->referidos_validos ?? 0)
                );

                $periodo = null;

                if ($request->periodo_id) {
                    $periodo = PeriodoCobro::find($request->periodo_id);
                }

                $yaExiste = Obligacion::where('asociado_id', $asociado->id)
                    ->where('tipo_obligacion_id', $tipo->id)
                    ->when($request->periodo_id, function ($query) use ($request) {
                        $query->where('periodo_id', $request->periodo_id);
                    })
                    ->whereIn('estado', ['PENDIENTE', 'EN_REVISION', 'PAGADA', 'ABONO'])
                    ->exists();

                if ($yaExiste && $request->periodo_id) {
                    return response()->json([
                        'success' => false,
                        'message' => 'El asociado ya tiene una obligación de sostenimiento para este periodo',
                    ], 409);
                }

                $obligacion = Obligacion::create([
                    'asociado_id' => $asociado->id,
                    'tipo_obligacion_id' => $tipo->id,
                    'periodo_id' => $request->periodo_id ?? null,
                    'smmlv_id' => $calculo['smmlv_id'],
                    'numero_obligacion' => 'SOS-' . now()->format('YmdHis') . '-' . $asociado->id,
                    'concepto' => 'Cuota de sostenimiento ' . $modalidad,
                    'valor_base' => $calculo['valor_base'],
                    'valor_descuento' => $calculo['valor_descuento'],
                    'valor_recargo' => $calculo['valor_recargo'],
                    'saldo_pendiente' => $calculo['saldo_pendiente'],
                    'estado' => $calculo['saldo_pendiente'] <= 0 ? 'PAGADA' : 'PENDIENTE',
                    'fecha_generacion' => now(),
                    'fecha_vencimiento' => $periodo
                        ? $periodo->fecha_fin
                        : now()->addDays(30)->toDateString(),
                    'observacion' => $this->generarObservacionSostenimiento($calculo),
                    'generada_automaticamente' => 1,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);

                return response()->json([
                    'success' => true,
                    'message' => 'Obligación de sostenimiento generada correctamente',
                    'data' => [
                        'obligacion' => $obligacion,
                        'calculo' => $calculo,
                    ],
                ], 201);
            });
        } catch (\Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al generar obligación de sostenimiento',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function estadoPagoAsociado($asociadoId)
    {
        $asociado = Asociado::find($asociadoId);

        if (!$asociado) {
            return response()->json([
                'success' => false,
                'message' => 'Asociado no encontrado',
            ], 404);
        }

        $obligacionesPendientes = Obligacion::with([
            'tipoObligacion',
            'periodo',
            'smmlv',
            'recibosPago',
        ])
            ->where('asociado_id', $asociadoId)
            ->whereIn('estado', ['PENDIENTE', 'VENCIDA', 'ABONO'])
            ->where('saldo_pendiente', '>', 0)
            ->whereDoesntHave('recibosPago', function ($query) {
                $query->whereIn('estado', ['PENDIENTE', 'APROBADO']);
            })
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

    public function obligacionesPorAsociado($asociadoId)
    {
        $asociado = Asociado::find($asociadoId);

        if (!$asociado) {
            return response()->json([
                'success' => false,
                'message' => 'Asociado no encontrado',
            ], 404);
        }

        $obligaciones = Obligacion::with([
            'tipoObligacion',
            'periodo',
            'smmlv',
            'recibosPago',
        ])
            ->where('asociado_id', $asociadoId)
            ->orderByDesc('fecha_generacion')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $obligaciones,
        ]);
    }

    public function misObligaciones(Request $request)
    {
        $usuario = $request->user();

        if (!$usuario) {
            return response()->json([
                'success' => false,
                'message' => 'Usuario no autenticado',
            ], 401);
        }

        $asociado = Asociado::where('usuario_id', $usuario->id)->first();

        if (!$asociado) {
            return response()->json([
                'success' => false,
                'message' => 'Asociado no encontrado',
            ], 404);
        }

        $obligaciones = Obligacion::with([
            'tipoObligacion',
            'periodo',
            'smmlv',
            'recibosPago',
        ])
            ->where('asociado_id', $asociado->id)
            ->orderByDesc('fecha_generacion')
            ->get();

        $obligacionesPendientes = $obligaciones
            ->whereIn('estado', ['PENDIENTE', 'VENCIDA', 'ABONO'])
            ->where('saldo_pendiente', '>', 0)
            ->filter(function ($obligacion) {
                return !$obligacion->recibosPago
                    ->whereIn('estado', ['PENDIENTE', 'APROBADO'])
                    ->count();
            })
            ->values();

        $totalPendiente = $obligacionesPendientes->sum('saldo_pendiente');

        return response()->json([
            'success' => true,
            'asociado_id' => $asociado->id,
            'tiene_deuda' => $totalPendiente > 0,
            'total_pendiente' => $totalPendiente,
            'obligaciones_pendientes' => $obligacionesPendientes,
            'data' => $obligaciones,
        ]);
    }

    private function generarObservacionSostenimiento(array $calculo): string
    {
        $observaciones = [];

        $observaciones[] = 'Modalidad: ' . ($calculo['modalidad'] ?? 'N/A');
        $observaciones[] = 'Cuota mensual: $' . number_format($calculo['cuota_mensual'] ?? 0, 0, ',', '.');

        if (($calculo['valor_descuento_pronto_pago'] ?? 0) > 0) {
            $observaciones[] = 'Descuento por pronto pago: $' . number_format($calculo['valor_descuento_pronto_pago'], 0, ',', '.');
        }

        if (($calculo['valor_descuento_referidos'] ?? 0) > 0) {
            $observaciones[] = 'Descuento por referidos: $' . number_format($calculo['valor_descuento_referidos'], 0, ',', '.');
        }

        if (($calculo['referidos_validos'] ?? 0) > 0) {
            $observaciones[] = 'Referidos aplicados: ' . $calculo['referidos_validos'];
        }

        return implode(' | ', $observaciones);
    }
    public function anular(Request $request, int $id)
    {
        $obligacion = Obligacion::find($id);

        if (!$obligacion) {
            return response()->json([
                'success' => false,
                'message' => 'Obligación no encontrada',
            ], 404);
        }

        if (in_array($obligacion->estado, ['PAGADA', 'EN_REVISION'])) {
            return response()->json([
                'success' => false,
                'message' => 'No se puede anular una obligación pagada o en revisión',
            ], 409);
        }

        $obligacion->update([
            'estado' => 'ANULADA',
            'saldo_pendiente' => 0,
            'observacion' => trim(($obligacion->observacion ?? '') . ' | Anulada por cambio de modalidad'),
            'updated_at' => now(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Obligación anulada correctamente',
            'data' => $obligacion->fresh(),
        ]);
    }
}
