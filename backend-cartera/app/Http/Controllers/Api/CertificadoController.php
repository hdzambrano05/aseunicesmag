<?php

namespace App\Http\Controllers\Api;

use App\Models\Asociado;
use App\Models\Certificado;
use App\Models\Obligacion;
use App\Models\ReciboPago;
use Barryvdh\DomPDF\Facade\Pdf;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class CertificadoController extends BaseApiController
{
    public function index(Request $request)
    {
        $query = Certificado::with(['asociado.usuario', 'generadoPor'])
            ->orderByDesc('fecha_generacion');

        if ($request->filled('asociado_id')) {
            $query->where('asociado_id', $request->asociado_id);
        }

        if ($request->filled('tipo_certificado')) {
            $query->where('tipo_certificado', $request->tipo_certificado);
        }

        return $this->success($query->paginate(20), 'Listado de certificados');
    }

    public function show(int $id)
    {
        $certificado = Certificado::with(['asociado.usuario', 'generadoPor'])->find($id);

        if (!$certificado) {
            return $this->error('Certificado no encontrado', null, 404);
        }

        return $this->success($certificado, 'Detalle del certificado');
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'asociado_id' => 'required|exists:asociados,id',
            'tipo_certificado' => 'required|string|max:50',
            'numero_certificado' => 'required|string|max:50|unique:certificados,numero_certificado',
            'ruta_pdf' => 'nullable|string|max:255',
            'hash_documento' => 'nullable|string|max:255',
            'fecha_generacion' => 'required|date',
            'fecha_descarga' => 'nullable|date',
            'generado_por' => 'nullable|exists:usuarios,id',
            'estado' => 'nullable|string|max:30',
        ]);

        if ($validator->fails()) {
            return $this->error('Datos inválidos', $validator->errors(), 422);
        }

        $certificado = Certificado::create($request->all());

        return $this->success($certificado, 'Certificado creado correctamente', 201);
    }

    public function update(Request $request, int $id)
    {
        $certificado = Certificado::find($id);

        if (!$certificado) {
            return $this->error('Certificado no encontrado', null, 404);
        }

        $validator = Validator::make($request->all(), [
            'tipo_certificado' => 'required|string|max:50',
            'numero_certificado' => 'required|string|max:50|unique:certificados,numero_certificado,' . $id,
            'ruta_pdf' => 'nullable|string|max:255',
            'hash_documento' => 'nullable|string|max:255',
            'fecha_generacion' => 'required|date',
            'fecha_descarga' => 'nullable|date',
            'generado_por' => 'nullable|exists:usuarios,id',
            'estado' => 'nullable|string|max:30',
        ]);

        if ($validator->fails()) {
            return $this->error('Datos inválidos', $validator->errors(), 422);
        }

        $certificado->update($request->all());

        return $this->success($certificado->fresh(), 'Certificado actualizado correctamente');
    }

    public function buscarAsociados(Request $request)
    {
        $search = $request->get('search');

        $asociados = Asociado::with(['usuario', 'ciudad'])
            ->when($search, function ($query) use ($search) {
                $query->whereHas('usuario', function ($q) use ($search) {
                    $q->where('nombres', 'LIKE', "%{$search}%")
                        ->orWhere('apellidos', 'LIKE', "%{$search}%")
                        ->orWhere('numero_documento', 'LIKE', "%{$search}%")
                        ->orWhere('correo', 'LIKE', "%{$search}%")
                        ->orWhere('telefono', 'LIKE', "%{$search}%");
                })
                    ->orWhere('codigo_asociado', 'LIKE', "%{$search}%")
                    ->orWhere('programa_academico', 'LIKE', "%{$search}%");
            })
            ->orderByDesc('id')
            ->limit(30)
            ->get();

        return $this->success($asociados, 'Asociados encontrados');
    }

    public function generarEstadoCuenta(Request $request, int $asociadoId)
    {
        $asociado = Asociado::with(['usuario', 'ciudad'])->find($asociadoId);

        if (!$asociado) {
            return $this->error('Asociado no encontrado', null, 404);
        }

        $usuario = $asociado->usuario;
        $anio = now()->year;
        $valorMensual = 17000;

        $estadosPagadosRecibo = ['APROBADO', 'APROBADA', 'PAGADO', 'PAGADA'];
        $estadosPagadosObligacion = ['PAGADO', 'PAGADA', 'APROBADO', 'APROBADA'];

        $obligaciones = Obligacion::with([
            'periodo',
            'tipoObligacion',
            'recibosPago' => function ($q) use ($estadosPagadosRecibo, $anio) {
                $q->whereIn('estado', $estadosPagadosRecibo)
                    ->whereYear('fecha_pago', $anio)
                    ->orderBy('fecha_pago');
            },
        ])
            ->where('asociado_id', $asociado->id)
            ->where(function ($q) use ($anio) {
                $q->whereYear('fecha_generacion', $anio)
                    ->orWhereHas('periodo', function ($p) use ($anio) {
                        $p->where('anio', $anio);
                    });
            })
            ->orderBy('fecha_generacion')
            ->get();

        $filasEstadoCuenta = [];

        foreach ($obligaciones as $obligacion) {
            $periodo = $obligacion->periodo;

            $periodoInicio = $periodo && $periodo->fecha_inicio
                ? Carbon::parse($periodo->fecha_inicio)->format('d-m')
                : 'N/A';

            $periodoFin = $periodo && $periodo->fecha_fin
                ? Carbon::parse($periodo->fecha_fin)->format('d-m')
                : 'N/A';

            $periodoNombre = $periodo->nombre ?? 'Sin periodo';

            $fechaVencimiento = $obligacion->fecha_vencimiento
                ? Carbon::parse($obligacion->fecha_vencimiento)->format('d/m/Y')
                : 'N/A';

            $tipo = $obligacion->tipoObligacion->nombre ?? 'Obligación';
            $concepto = $obligacion->concepto ?? $tipo;

            $detalle = trim($tipo . ' - ' . $concepto);

            $saldoPendiente = max(0, (float) $obligacion->saldo_pendiente);

            foreach ($obligacion->recibosPago as $recibo) {
                $valorPagadoRecibo = (float) $recibo->valor_reportado;

                if ($valorPagadoRecibo <= 0) {
                    continue;
                }

                $filasEstadoCuenta[] = [
                    'obligacion_id' => $obligacion->id,
                    'numero_obligacion' => $obligacion->numero_obligacion,
                    'numero_recibo' => $recibo->numero_recibo,
                    'detalle' => $detalle,
                    'periodo_nombre' => $periodoNombre,
                    'periodo_inicio' => $periodoInicio,
                    'periodo_fin' => $periodoFin,
                    'fecha_pago' => $recibo->fecha_pago
                        ? Carbon::parse($recibo->fecha_pago)->format('d/m/Y')
                        : 'N/A',
                    'fecha_vencimiento' => $fechaVencimiento,
                    'valor_mes' => $valorMensual,
                    'meses' => max(1, round($valorPagadoRecibo / $valorMensual)),
                    'estado' => 'Pagado',
                    'valor' => $valorPagadoRecibo,
                    'banco' => $recibo->banco ?? 'No registra',
                ];
            }

            if ($saldoPendiente > 0 && !in_array(strtoupper($obligacion->estado), $estadosPagadosObligacion)) {
                $filasEstadoCuenta[] = [
                    'obligacion_id' => $obligacion->id,
                    'numero_obligacion' => $obligacion->numero_obligacion,
                    'numero_recibo' => null,
                    'detalle' => $detalle,
                    'periodo_nombre' => $periodoNombre,
                    'periodo_inicio' => $periodoInicio,
                    'periodo_fin' => $periodoFin,
                    'fecha_pago' => 'Pendiente',
                    'fecha_vencimiento' => $fechaVencimiento,
                    'valor_mes' => $valorMensual,
                    'meses' => max(1, ceil($saldoPendiente / $valorMensual)),
                    'estado' => 'Debe',
                    'valor' => $saldoPendiente,
                    'banco' => 'Pendiente',
                ];
            }
        }

        $totalPagado = collect($filasEstadoCuenta)
            ->where('estado', 'Pagado')
            ->sum('valor');

        $totalDebe = collect($filasEstadoCuenta)
            ->where('estado', 'Debe')
            ->sum('valor');

        $descuentoSemestral = $totalDebe > 0 ? round($totalDebe * 0.10) : 0;
        $totalConDescuento = $totalDebe > 0 ? $totalDebe - $descuentoSemestral : 0;

        $numeroCertificado = 'CERT-' . now()->format('YmdHis') . '-' . $asociado->id;

        $data = [
            'asociado' => $asociado,
            'usuario' => $usuario,
            'fechaGeneracion' => Carbon::now()->locale('es')->translatedFormat('d \d\e F \d\e Y'),
            'numeroCertificado' => $numeroCertificado,
            'anio' => $anio,
            'valorMensual' => $valorMensual,
            'filasEstadoCuenta' => $filasEstadoCuenta,
            'totalPagado' => $totalPagado,
            'totalDebe' => $totalDebe,
            'descuentoSemestral' => $descuentoSemestral,
            'totalConDescuento' => $totalConDescuento,
        ];

        $pdf = Pdf::loadView('pdf.estado-cuenta', $data)
            ->setPaper('letter', 'portrait');

        $contenidoPdf = $pdf->output();

        $nombreArchivo = 'certificados/estado-cuenta-' .
            $asociado->id . '-' .
            now()->format('YmdHis') .
            '.pdf';

        Storage::disk('public')->put($nombreArchivo, $contenidoPdf);

        Certificado::create([
            'asociado_id' => $asociado->id,
            'tipo_certificado' => 'ESTADO_CUENTA',
            'numero_certificado' => $numeroCertificado,
            'ruta_pdf' => $nombreArchivo,
            'hash_documento' => hash('sha256', $contenidoPdf),
            'fecha_generacion' => now(),
            'fecha_descarga' => now(),
            'generado_por' => Auth::id(),
            'estado' => 'GENERADO',
        ]);

        return $pdf->stream('estado-cuenta-' . $usuario->numero_documento . '.pdf');
    }
}
