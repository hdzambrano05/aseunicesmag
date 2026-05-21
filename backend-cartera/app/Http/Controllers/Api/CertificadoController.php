<?php

namespace App\Http\Controllers\Api;

use App\Models\Asociado;
use App\Models\Certificado;
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

        $valorSemestre = $valorMensual * 6;
        $valorAnual = $valorMensual * 12;

        /*
            Se toman recibos APROBADOS del año.
            Si pagó $102.000, se toma como un semestre pagado.
            Si pagó $204.000, se toma como el año completo pagado.
        */
        $recibosAprobados = ReciboPago::where('asociado_id', $asociado->id)
            ->whereIn('estado', ['APROBADO', 'APROBADA', 'PAGADO', 'PAGADA'])
            ->whereYear('fecha_pago', $anio)
            ->get();

        $totalPagado = (float) $recibosAprobados->sum('valor_reportado');

        $pagadoPrimerSemestre = 0;
        $pagadoSegundoSemestre = 0;

        if ($totalPagado >= $valorAnual) {
            $pagadoPrimerSemestre = $valorSemestre;
            $pagadoSegundoSemestre = $valorSemestre;
        } elseif ($totalPagado >= $valorSemestre) {
            $pagadoPrimerSemestre = $valorSemestre;
            $pagadoSegundoSemestre = $totalPagado - $valorSemestre;
        } else {
            $pagadoPrimerSemestre = $totalPagado;
            $pagadoSegundoSemestre = 0;
        }

        $totalPrimerSemestre = max(0, $valorSemestre - $pagadoPrimerSemestre);
        $totalSegundoSemestre = max(0, $valorSemestre - $pagadoSegundoSemestre);
        $totalGeneral = $totalPrimerSemestre + $totalSegundoSemestre;

        $mesesPrimerSemestre = $totalPrimerSemestre > 0
            ? ceil($totalPrimerSemestre / $valorMensual)
            : 0;

        $mesesSegundoSemestre = $totalSegundoSemestre > 0
            ? ceil($totalSegundoSemestre / $valorMensual)
            : 0;

        $pagoSemestralPrimero = $totalPrimerSemestre > 0
            ? $totalPrimerSemestre - ($totalPrimerSemestre * 0.10)
            : 0;

        $pagoSemestralSegundo = $totalSegundoSemestre > 0
            ? $totalSegundoSemestre - ($totalSegundoSemestre * 0.10)
            : 0;

        $pagoAnual = $totalGeneral > 0
            ? $totalGeneral - ($totalGeneral * 0.30)
            : 0;

        $numeroCertificado = 'CERT-' . now()->format('YmdHis') . '-' . $asociado->id;

        $data = [
            'asociado' => $asociado,
            'usuario' => $usuario,
            'fechaGeneracion' => Carbon::now()->locale('es')->translatedFormat('d \d\e F \d\e Y'),
            'numeroCertificado' => $numeroCertificado,

            'anio' => $anio,
            'valorMensual' => $valorMensual,
            'valorSemestre' => $valorSemestre,
            'valorAnual' => $valorAnual,

            'totalPagado' => $totalPagado,
            'pagadoPrimerSemestre' => $pagadoPrimerSemestre,
            'pagadoSegundoSemestre' => $pagadoSegundoSemestre,

            'totalPrimerSemestre' => $totalPrimerSemestre,
            'totalSegundoSemestre' => $totalSegundoSemestre,
            'totalGeneral' => $totalGeneral,

            'mesesPrimerSemestre' => $mesesPrimerSemestre,
            'mesesSegundoSemestre' => $mesesSegundoSemestre,

            'pagoSemestralPrimero' => $pagoSemestralPrimero,
            'pagoSemestralSegundo' => $pagoSemestralSegundo,
            'pagoAnual' => $pagoAnual,
        ];

        $pdf = Pdf::loadView('pdf.estado-cuenta', $data)
            ->setPaper('letter', 'portrait');

        $contenidoPdf = $pdf->output();

        $nombreArchivo = 'certificados/estado-cuenta-' .
            $asociado->id .
            '-' .
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
