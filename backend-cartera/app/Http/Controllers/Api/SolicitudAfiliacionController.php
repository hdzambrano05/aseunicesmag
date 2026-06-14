<?php

namespace App\Http\Controllers\Api;

use App\Mail\AfiliacionAprobadaMail;
use App\Mail\AfiliacionRechazadaMail;
use App\Mail\NuevaSolicitudAfiliacionMail;
use App\Models\ArchivoAdjunto;
use App\Models\Asociado;
use App\Models\Obligacion;
use App\Models\PeriodoCobro;
use App\Models\ReciboPago;
use App\Models\SmmlvHistorico;
use App\Models\SolicitudAfiliacion;
use App\Models\TipoObligacion;
use App\Models\Usuario;
use App\Models\SolicitudReferido;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Storage;

class SolicitudAfiliacionController extends BaseApiController
{
    public function index(Request $request)
    {
        $query = SolicitudAfiliacion::with([
            'usuario',
            'asociado',
            'aprobador',
            'archivos',
        ])->orderByDesc('fecha_solicitud');

        if ($request->filled('estado')) {
            $query->where('estado', $request->estado);
        }

        return $this->success(
            $query->paginate(20),
            'Listado de solicitudes de afiliación'
        );
    }

    public function show(int $id)
    {
        $solicitud = SolicitudAfiliacion::with([
            'usuario',
            'asociado',
            'aprobador',
            'archivos',
        ])->find($id);

        if (!$solicitud) {
            return $this->error('Solicitud no encontrada', null, 404);
        }

        foreach ($solicitud->archivos as $archivo) {
            $archivo->url = asset('storage/' . $archivo->ruta_archivo);
        }

        return $this->success($solicitud, 'Detalle de la solicitud');
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'fecha_solicitud' => 'nullable|date',
            'se_afilia_por_vez' => 'required|string|max:30',
            'radicacion' => 'nullable|string|max:100',

            'nombres' => 'required|string|max:100',
            'apellidos' => 'required|string|max:100',
            'tipo_sangre' => 'nullable|string|max:10',
            'genero' => 'required|string|max:30',
            'numero_documento' => 'required|string|max:30',
            'fecha_expedicion' => 'nullable|date',
            'lugar_expedicion' => 'nullable|string|max:100',
            'fecha_nacimiento' => 'nullable|date',
            'direccion' => 'required|string|max:200',
            'telefono' => 'required|string|max:30',
            'correo' => 'required|email|max:150',

            'nivel_educativo' => 'nullable|string|max:50',
            'titulo_obtenido' => 'nullable|string|max:150',
            'ocupacion' => 'nullable|string|max:80',
            'empresa' => 'nullable|string|max:150',
            'fecha_vinculacion' => 'nullable|date',
            'cargo' => 'nullable|string|max:120',
            'telefono_empresa' => 'nullable|string|max:30',
            'estado_civil' => 'nullable|string|max:50',
            'personas_a_cargo' => 'nullable|integer|min:0',
            'numero_hijos' => 'nullable|integer|min:0',
            'hijos_0_5' => 'nullable|integer|min:0',
            'hijos_6_11' => 'nullable|integer|min:0',
            'hijos_12_17' => 'nullable|integer|min:0',
            'hijos_18_25' => 'nullable|integer|min:0',
            'tipo_vivienda' => 'nullable|string|max:50',
            'zona_ubicacion' => 'nullable|string|max:50',

            'motivacion_afiliacion' => 'required|string',
            'referido_por' => 'nullable|string|max:150',
            'firma_solicitante' => 'required|string',

            'acepta_habeas_data' => 'required',
            'acepta_terminos' => 'required',

            'copia_cedula' => 'required|file|mimes:pdf,jpg,jpeg,png|max:2048',
            'diploma' => 'required|file|mimes:pdf,jpg,jpeg,png|max:2048',
            'foto_digital' => 'required|image|max:2048',
            'recibo_pago' => 'required|file|mimes:pdf,jpg,jpeg,png|max:2048',

            'valor_reportado' => 'nullable|numeric|min:1',
            'fecha_pago' => 'nullable|date',
            'banco' => 'nullable|string|max:100',
            'referencia_pago' => 'nullable|string|max:100',
            'observacion_pago' => 'nullable|string',
            'aplica_practica' => 'nullable|boolean',
        ]);

        if ($validator->fails()) {
            return $this->error('Datos inválidos', $validator->errors(), 422);
        }

        DB::beginTransaction();

        try {
            $usuario = Usuario::where('numero_documento', $request->numero_documento)
                ->orWhere('correo', $request->correo)
                ->first();

            if ($usuario) {
                $usuario->update([
                    'tipo_documento' => $usuario->tipo_documento ?: 'CC',
                    'numero_documento' => $request->numero_documento,
                    'nombres' => $request->nombres,
                    'apellidos' => $request->apellidos,
                    'correo' => $request->correo,
                    'telefono' => $request->telefono,
                    'acepta_habeas_data' => $request->boolean('acepta_habeas_data'),
                    'acepta_terminos' => $request->boolean('acepta_terminos'),
                    'updated_at' => now(),
                ]);
            } else {
                $usuario = Usuario::create([
                    'rol_id' => 2,
                    'tipo_documento' => 'CC',
                    'numero_documento' => $request->numero_documento,
                    'nombres' => $request->nombres,
                    'apellidos' => $request->apellidos,
                    'correo' => $request->correo,
                    'telefono' => $request->telefono,
                    'password_hash' => Hash::make(Str::random(12)),
                    'email_verificado' => 0,
                    'estado_cuenta' => 'PENDIENTE',
                    'acepta_habeas_data' => $request->boolean('acepta_habeas_data'),
                    'acepta_terminos' => $request->boolean('acepta_terminos'),
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }

            $asociado = Asociado::where('usuario_id', $usuario->id)->first();

            if (!$asociado) {
                $asociado = Asociado::create([
                    'usuario_id' => $usuario->id,
                    'ciudad_id' => null,
                    'codigo_asociado' => 'ASO-' . now()->format('YmdHis') . '-' . $usuario->id,
                    'fecha_nacimiento' => $request->fecha_nacimiento,
                    'genero' => $request->genero,
                    'direccion' => $request->direccion,
                    'profesion' => $request->titulo_obtenido,
                    'empresa' => $request->empresa,
                    'cargo' => $request->cargo,
                    'programa_academico' => $request->nivel_educativo,
                    'universidad' => 'Universidad CESMAG',
                    'categoria_asociado' => 'REGULAR',
                    'estado_membresia' => 'PENDIENTE',
                    'observaciones' => $request->motivacion_afiliacion,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            } else {
                $asociado->update([
                    'fecha_nacimiento' => $request->fecha_nacimiento,
                    'genero' => $request->genero,
                    'direccion' => $request->direccion,
                    'profesion' => $request->titulo_obtenido,
                    'empresa' => $request->empresa,
                    'cargo' => $request->cargo,
                    'programa_academico' => $request->nivel_educativo,
                    'estado_membresia' => 'PENDIENTE',
                    'observaciones' => $request->motivacion_afiliacion,
                    'updated_at' => now(),
                ]);
            }

            $solicitud = SolicitudAfiliacion::create([
                'usuario_id' => $usuario->id,
                'asociado_id' => $asociado->id,
                'fecha_solicitud' => $request->fecha_solicitud ?? now(),
                'estado' => 'PENDIENTE',
                'origen' => 'WEB',
                'observacion_admin' => null,
                'aprobado_por' => null,
                'fecha_revision' => null,
            ]);

            SolicitudReferido::create([
                'solicitud_afiliacion_id' => $solicitud->id,

                'nombre_referente' => $request->referido_por,

                'documento_referente' => $request->documento_referido,

                'relacion_referente' => $request->relacion_referido,

                'motivacion_afiliacion' => $request->motivacion_afiliacion,
            ]);

            /*
|--------------------------------------------------------------------------
| GUARDAR FIRMA DEL SOLICITANTE
|--------------------------------------------------------------------------
*/

            $firma = null;

            if ($request->filled('firma_solicitante')) {

                $firmaBase64 = $request->firma_solicitante;

                if (preg_match('/^data:image\/(\w+);base64,/', $firmaBase64, $type)) {

                    $extensionFirma = strtolower($type[1]);

                    $firmaLimpia = substr($firmaBase64, strpos($firmaBase64, ',') + 1);

                    $firmaLimpia = base64_decode($firmaLimpia);

                    $nombreFirma = 'firma_solicitante_' . $solicitud->id . '.' . $extensionFirma;

                    $rutaFirma = 'afiliaciones/firmas/' . $nombreFirma;

                    Storage::disk('public')->put(
                        $rutaFirma,
                        $firmaLimpia
                    );

                    ArchivoAdjunto::create([
                        'modulo' => 'afiliacion',
                        'referencia_id' => $solicitud->id,
                        'tipo_archivo' => 'FIRMA_SOLICITANTE',
                        'nombre_original' => $nombreFirma,
                        'ruta_archivo' => $rutaFirma,
                        'extension' => $extensionFirma,
                        'mime_type' => 'image/' . $extensionFirma,
                        'peso_bytes' => Storage::disk('public')->size($rutaFirma),
                        'subido_por' => $usuario->id ?? null,
                        'fecha_subida' => now(),
                    ]);

                    $firma = $request->firma_solicitante;
                }
            }

            /*
|--------------------------------------------------------------------------
| GENERAR PDF DEL FORMULARIO
|--------------------------------------------------------------------------
*/

            $pdf = Pdf::loadView('pdf.formato_afiliacion', [
                'datos' => $request->all(),
                'firma' => $firma,
            ]);

            $nombrePdf = 'formulario_afiliacion_' . $solicitud->id . '.pdf';

            $rutaPdf = 'afiliaciones/pdfs/' . $nombrePdf;

            Storage::disk('public')->put(
                $rutaPdf,
                $pdf->output()
            );

            /*
|--------------------------------------------------------------------------
| GUARDAR PDF EN ARCHIVOS_ADJUNTOS
|--------------------------------------------------------------------------
*/

            ArchivoAdjunto::create([
                'modulo' => 'afiliacion',
                'referencia_id' => $solicitud->id,
                'tipo_archivo' => 'FORMULARIO_AFILIACION',
                'nombre_original' => $nombrePdf,
                'ruta_archivo' => $rutaPdf,
                'extension' => 'pdf',
                'mime_type' => 'application/pdf',
                'peso_bytes' => Storage::disk('public')->size($rutaPdf),
                'subido_por' => $usuario->id ?? null,
                'fecha_subida' => now(),
            ]);

            $this->guardarArchivo($request, 'copia_cedula', 'COPIA_CEDULA', $solicitud->id, $usuario->id);
            $this->guardarArchivo($request, 'diploma', 'DIPLOMA', $solicitud->id, $usuario->id);
            $this->guardarArchivo($request, 'foto_digital', 'FOTO_DIGITAL', $solicitud->id, $usuario->id);

            $anio = now()->year;

            $smmlv = SmmlvHistorico::where('anio', $anio)
                ->where('activo', 1)
                ->first();

            if (!$smmlv) {
                DB::rollBack();
                return $this->error('No existe SMMLV activo para el año ' . $anio, null, 400);
            }

            $tipoAfiliacion = TipoObligacion::where('codigo', 'AFILIACION')->first();

            if (!$tipoAfiliacion) {
                DB::rollBack();
                return $this->error('No existe el tipo de obligación AFILIACION', null, 400);
            }

            $valorBaseAfiliacion = round($smmlv->valor * 0.05, 2);
            $valorDescuento = 0;

            if ($request->boolean('aplica_practica', false)) {
                $valorDescuento = round($valorBaseAfiliacion * 0.50, 2);
            }

            $saldoAfiliacion = max($valorBaseAfiliacion - $valorDescuento, 0);

            $obligacionAfiliacion = Obligacion::create([
                'asociado_id' => $asociado->id,
                'tipo_obligacion_id' => $tipoAfiliacion->id,
                'periodo_id' => null,
                'smmlv_id' => $smmlv->id,
                'numero_obligacion' => 'AFI-' . now()->format('YmdHis') . '-' . $asociado->id,
                'concepto' => 'Cuota de afiliación',
                'valor_base' => $valorBaseAfiliacion,
                'valor_descuento' => $valorDescuento,
                'valor_recargo' => 0,
                'saldo_pendiente' => $saldoAfiliacion,
                'estado' => 'EN_REVISION',
                'fecha_generacion' => now(),
                'fecha_vencimiento' => now()->addDays(30)->toDateString(),
                'observacion' => $request->boolean('aplica_practica', false)
                    ? 'Afiliación con descuento del 50% por práctica empresarial'
                    : 'Afiliación equivalente al 5% del SMMLV',
                'generada_automaticamente' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            $archivoRecibo = $request->file('recibo_pago');
            $rutaRecibo = $archivoRecibo->store('recibos_pago', 'public');

            ReciboPago::create([
                'asociado_id' => $asociado->id,
                'obligacion_id' => $obligacionAfiliacion->id,
                'numero_recibo' => 'REC-' . now()->format('YmdHis') . '-' . random_int(100, 999),
                'referencia_pago' => $request->referencia_pago,
                'valor_reportado' => $request->valor_reportado ?? $saldoAfiliacion,
                'fecha_pago' => $request->fecha_pago ?? now()->toDateString(),
                'banco' => $request->banco,
                'observacion_usuario' => $request->observacion_pago,
                'nombre_archivo' => $archivoRecibo->getClientOriginalName(),
                'ruta_archivo' => $rutaRecibo,
                'extension' => $archivoRecibo->getClientOriginalExtension(),
                'mime_type' => $archivoRecibo->getMimeType(),
                'peso_bytes' => $archivoRecibo->getSize(),
                'hash_archivo' => hash_file('sha256', $archivoRecibo->getRealPath()),
                'estado' => 'PENDIENTE',
                'cargado_por' => $usuario->id,
                'fecha_carga' => now(),
            ]);

            DB::commit();

            Mail::to('denilson1299@gmail.com')->send(
                new NuevaSolicitudAfiliacionMail($solicitud)
            );

            return $this->success(
                $solicitud->fresh(['usuario', 'asociado', 'archivos']),
                'Solicitud de afiliación registrada correctamente',
                201
            );
        } catch (\Throwable $e) {
            DB::rollBack();

            return $this->error('Error al registrar la solicitud', [
                'detalle' => $e->getMessage(),
                'linea' => $e->getLine(),
                'archivo' => $e->getFile(),
            ], 500);
        }
    }

    public function update(Request $request, int $id)
    {
        $solicitud = SolicitudAfiliacion::find($id);

        if (!$solicitud) {
            return $this->error('Solicitud no encontrada', null, 404);
        }

        $validator = Validator::make($request->all(), [
            'asociado_id' => 'nullable|exists:asociados,id',
            'estado' => 'required|string|max:30',
            'origen' => 'nullable|string|max:50',
            'observacion_admin' => 'nullable|string',
            'aprobado_por' => 'nullable|exists:usuarios,id',
            'fecha_revision' => 'nullable|date',
        ]);

        if ($validator->fails()) {
            return $this->error('Datos inválidos', $validator->errors(), 422);
        }

        $solicitud->update($request->all());

        return $this->success(
            $solicitud->fresh(),
            'Solicitud actualizada correctamente'
        );
    }

    public function pendientes(Request $request)
    {
        $estado = $request->get('estado', 'PENDIENTE');

        $solicitudes = SolicitudAfiliacion::with([
            'usuario',
            'asociado',
            'archivos',
        ])
            ->where('estado', $estado)
            ->orderByDesc('fecha_solicitud')
            ->get()
            ->map(function ($solicitud) {
                $solicitud->archivos->map(function ($archivo) {
                    $archivo->url = asset('storage/' . $archivo->ruta_archivo);
                    return $archivo;
                });

                return $solicitud;
            });

        return response()->json([
            'success' => true,
            'data' => $solicitudes,
        ]);
    }

    public function aprobar(Request $request, int $id)
    {
        DB::beginTransaction();

        try {
            $solicitud = SolicitudAfiliacion::with([
                'usuario',
                'asociado',
            ])->find($id);

            if (!$solicitud) {
                return $this->error('Solicitud no encontrada', null, 404);
            }

            if ($solicitud->estado === 'APROBADA') {
                return $this->error('Esta solicitud ya fue aprobada', null, 400);
            }

            $usuario = $solicitud->usuario;
            $asociado = $solicitud->asociado;

            if (!$usuario || !$asociado) {
                return $this->error('Usuario o asociado no encontrado', null, 404);
            }

            $passwordPlano = Str::random(10);

            $usuario->update([
                'password_hash' => Hash::make($passwordPlano),
                'estado_cuenta' => 'ACTIVO',
                'email_verificado' => 1,
                'updated_at' => now(),
            ]);

            $solicitud->update([
                'estado' => 'APROBADA',
                'aprobado_por' => optional($request->user())->id,
                'fecha_revision' => now(),
                'observacion_admin' => $request->observacion_admin,
            ]);

            $asociado->update([
                'estado_membresia' => 'ACTIVO',
                'fecha_afiliacion' => now()->toDateString(),
                'updated_at' => now(),
            ]);

            $this->generarSostenimientoInicial($asociado);

            Mail::to($usuario->correo)->send(
                new AfiliacionAprobadaMail($usuario, $passwordPlano)
            );

            DB::commit();

            return $this->success(
                $solicitud->fresh(['usuario', 'asociado']),
                'Afiliación aprobada correctamente. Se generó la cuota de sostenimiento y se enviaron las credenciales.'
            );
        } catch (\Throwable $e) {
            DB::rollBack();

            return $this->error('Error al aprobar la afiliación', [
                'detalle' => $e->getMessage(),
                'linea' => $e->getLine(),
                'archivo' => $e->getFile(),
            ], 500);
        }
    }

    public function rechazar(Request $request, int $id)
    {
        DB::beginTransaction();

        try {
            $solicitud = SolicitudAfiliacion::with(['usuario', 'asociado'])->find($id);

            if (!$solicitud) {
                return $this->error('Solicitud no encontrada', null, 404);
            }

            $usuario = $solicitud->usuario;

            $solicitud->update([
                'estado' => 'RECHAZADA',
                'observacion_admin' => $request->observacion_admin ?? $request->observacion,
                'aprobado_por' => optional($request->user())->id,
                'fecha_revision' => now(),
            ]);

            if ($solicitud->asociado) {
                $solicitud->asociado->update([
                    'estado_membresia' => 'RECHAZADO',
                    'updated_at' => now(),
                ]);
            }

            if ($usuario && $usuario->correo) {
                Mail::to($usuario->correo)->send(
                    new AfiliacionRechazadaMail(
                        $usuario,
                        $request->observacion_admin ?? $request->observacion
                    )
                );
            }

            DB::commit();

            return $this->success(
                $solicitud->fresh(),
                'Solicitud rechazada y correo enviado correctamente'
            );
        } catch (\Throwable $e) {
            DB::rollBack();

            return $this->error('Error al rechazar', [
                'detalle' => $e->getMessage(),
                'linea' => $e->getLine(),
                'archivo' => $e->getFile(),
            ], 500);
        }
    }

    private function generarSostenimientoInicial(Asociado $asociado): void
    {
        $tipoSostenimiento = TipoObligacion::where('codigo', 'SOSTENIMIENTO')->first();

        if (!$tipoSostenimiento) {
            throw new \Exception('No existe el tipo de obligación SOSTENIMIENTO');
        }

        $anio = now()->year;

        $smmlv = SmmlvHistorico::where('anio', $anio)
            ->where('activo', 1)
            ->first();

        if (!$smmlv) {
            throw new \Exception('No existe SMMLV activo para el año ' . $anio);
        }

        $periodo = PeriodoCobro::where('anio', $anio)
            ->where('tipo_periodo', 'MENSUAL')
            ->whereDate('fecha_inicio', '<=', now())
            ->whereDate('fecha_fin', '>=', now())
            ->where('activo', 1)
            ->first();

        if (!$periodo) {
            throw new \Exception('No existe periodo mensual activo para la fecha actual');
        }

        $yaTieneObligacion = Obligacion::where('asociado_id', $asociado->id)
            ->where('tipo_obligacion_id', $tipoSostenimiento->id)
            ->where('periodo_id', $periodo->id)
            ->whereIn('estado', ['PENDIENTE', 'EN_REVISION', 'VENCIDA', 'PAGADA', 'ABONO'])
            ->exists();

        if ($yaTieneObligacion) {
            return;
        }

        $valorBase = round($smmlv->valor * 0.01, 2);

        Obligacion::create([
            'asociado_id' => $asociado->id,
            'tipo_obligacion_id' => $tipoSostenimiento->id,
            'periodo_id' => $periodo->id,
            'smmlv_id' => $smmlv->id,
            'numero_obligacion' => 'SOS-' . now()->format('YmdHis') . '-' . $asociado->id,
            'concepto' => 'Cuota de sostenimiento - ' . $periodo->nombre,
            'valor_base' => $valorBase,
            'valor_descuento' => 0,
            'valor_recargo' => 0,
            'saldo_pendiente' => $valorBase,
            'estado' => 'PENDIENTE',
            'fecha_generacion' => now(),
            'fecha_vencimiento' => $periodo->fecha_fin,
            'observacion' => 'Obligación generada automáticamente al aprobar afiliación',
            'generada_automaticamente' => 1,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }

    private function guardarArchivo(
        Request $request,
        string $campo,
        string $tipo,
        int $solicitudId,
        int $usuarioId
    ) {
        if (!$request->hasFile($campo)) {
            return null;
        }

        $archivo = $request->file($campo);
        $ruta = $archivo->store('afiliaciones/' . strtolower($tipo), 'public');

        return ArchivoAdjunto::create([
            'modulo' => 'afiliacion',
            'referencia_id' => $solicitudId,
            'tipo_archivo' => $tipo,
            'nombre_original' => $archivo->getClientOriginalName(),
            'ruta_archivo' => $ruta,
            'extension' => $archivo->getClientOriginalExtension(),
            'mime_type' => $archivo->getMimeType(),
            'peso_bytes' => $archivo->getSize(),
            'subido_por' => $usuarioId,
            'fecha_subida' => now(),
        ]);
    }
}
