<?php

namespace App\Http\Controllers\Api;

use App\Models\ArchivoAdjunto;
use App\Models\Asociado;
use App\Models\SolicitudAfiliacion;
use App\Models\Usuario;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Mail\AfiliacionAprobadaMail;
use App\Mail\AfiliacionRechazadaMail;

class SolicitudAfiliacionController extends BaseApiController
{
    public function index(Request $request)
    {
        $query = SolicitudAfiliacion::with(['usuario', 'asociado', 'aprobador', 'archivos'])
            ->orderByDesc('fecha_solicitud');

        if ($request->filled('estado')) {
            $query->where('estado', $request->estado);
        }

        return $this->success($query->paginate(20), 'Listado de solicitudes de afiliación');
    }

    public function show(int $id)
    {
        $solicitud = SolicitudAfiliacion::with(['usuario', 'asociado', 'aprobador', 'archivos'])->find($id);

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
            'fecha_solicitud' => 'required|date',
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
        ]);

        if ($validator->fails()) {
            return $this->error('Datos inválidos', $validator->errors(), 422);
        }

        DB::beginTransaction();

        try {
            $usuario = Usuario::where('numero_documento', $request->numero_documento)->first();

            if (!$usuario) {
                $usuario = Usuario::where('correo', $request->correo)->first();
            }

            if ($usuario) {
                $usuario->update([
                    'rol_id' => $usuario->rol_id ?: 2,
                    'tipo_documento' => $usuario->tipo_documento ?: 'CC',
                    'numero_documento' => $request->numero_documento,
                    'nombres' => $request->nombres,
                    'apellidos' => $request->apellidos,
                    'correo' => $request->correo,
                    'telefono' => $request->telefono,
                    'estado_cuenta' => 'ACTIVO',
                    'acepta_habeas_data' => $request->has('acepta_habeas_data') ? 1 : 0,
                    'acepta_terminos' => $request->has('acepta_terminos') ? 1 : 0,
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
                    'password_hash' => bcrypt($request->numero_documento),
                    'estado_cuenta' => 'ACTIVO',
                    'acepta_habeas_data' => $request->has('acepta_habeas_data') ? 1 : 0,
                    'acepta_terminos' => $request->has('acepta_terminos') ? 1 : 0,
                ]);
            }

            $asociado = Asociado::updateOrCreate(
                ['usuario_id' => $usuario->id],
                [
                    'codigo_asociado' => 'ASO-' . str_pad($usuario->id, 5, '0', STR_PAD_LEFT),
                    'fecha_nacimiento' => $request->fecha_nacimiento,
                    'genero' => $request->genero,
                    'direccion' => $request->direccion,
                    'profesion' => $request->titulo_obtenido,
                    'empresa' => $request->empresa,
                    'cargo' => $request->cargo,
                    'programa_academico' => $request->titulo_obtenido,
                    'universidad' => 'UNICESMAG',
                    'categoria_asociado' => 'REGULAR',
                    'estado_membresia' => 'PENDIENTE',
                    'fecha_afiliacion' => now(),
                    'observaciones' => $request->motivacion_afiliacion,
                ]
            );

            $solicitud = SolicitudAfiliacion::create([
                'usuario_id' => $usuario->id,
                'asociado_id' => $asociado->id,
                'fecha_solicitud' => now(),
                'estado' => 'PENDIENTE',
                'origen' => 'WEB',
                'observacion_admin' => null,
                'aprobado_por' => null,
                'fecha_revision' => null,
            ]);

            $this->guardarArchivo($request, 'copia_cedula', 'CEDULA', $solicitud->id, $usuario->id);
            $this->guardarArchivo($request, 'diploma', 'DIPLOMA', $solicitud->id, $usuario->id);
            $this->guardarArchivo($request, 'foto_digital', 'FOTO', $solicitud->id, $usuario->id);
            $this->guardarArchivo($request, 'recibo_pago', 'RECIBO_PAGO', $solicitud->id, $usuario->id);

            $rutaFirma = $this->guardarFirmaBase64(
                $request->firma_solicitante,
                $solicitud->id,
                $usuario->id
            );

            $rutaPdf = $this->generarPdfAfiliacion(
                $request,
                $usuario,
                $asociado,
                $solicitud,
                $rutaFirma
            );

            ArchivoAdjunto::create([
                'modulo' => 'afiliacion',
                'referencia_id' => $solicitud->id,
                'tipo_archivo' => 'FORMATO_AFILIACION',
                'nombre_original' => 'formato_afiliacion_' . $solicitud->id . '.pdf',
                'ruta_archivo' => $rutaPdf,
                'extension' => 'pdf',
                'mime_type' => 'application/pdf',
                'peso_bytes' => Storage::disk('public')->size($rutaPdf),
                'subido_por' => $usuario->id,
                'fecha_subida' => now(),
            ]);

            DB::commit();

            return $this->success([
                'solicitud_id' => $solicitud->id,
                'estado' => 'PENDIENTE',
                'pdf_url' => asset('storage/' . $rutaPdf),
            ], 'Solicitud enviada correctamente. Queda pendiente de aprobación.', 201);
        } catch (\Throwable $e) {
            DB::rollBack();

            return $this->error('Error al guardar la solicitud', [
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

        return $this->success($solicitud->fresh(), 'Solicitud actualizada correctamente');
    }

    public function pendientes(Request $request)
    {
        $estado = $request->get('estado', 'PENDIENTE');

        $solicitudes = SolicitudAfiliacion::with(['usuario', 'asociado', 'archivos'])
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
            'data' => $solicitudes
        ]);
    }

    public function aprobar(Request $request, int $id)
    {
        DB::beginTransaction();

        try {
            $solicitud = SolicitudAfiliacion::with(['asociado', 'usuario'])->find($id);

            if (!$solicitud) {
                return $this->error('Solicitud no encontrada', null, 404);
            }

            $usuario = $solicitud->usuario;

            if (!$usuario) {
                return $this->error('Usuario no encontrado', null, 404);
            }

            // Clave diferente para cada usuario aprobado
            $passwordPlano = Str::random(10);

            // Se guarda la clave encriptada en usuarios.password_hash
            $usuario->update([
                'password_hash' => Hash::make($passwordPlano),
                'estado_cuenta' => 'ACTIVO',
                'email_verificado' => 1,
            ]);

            $solicitud->update([
                'estado' => 'APROBADA',
                'aprobado_por' => optional($request->user())->id,
                'fecha_revision' => now(),
            ]);

            if ($solicitud->asociado) {
                $solicitud->asociado->update([
                    'estado_membresia' => 'ACTIVO',
                    'fecha_afiliacion' => now(),
                ]);
            }

            Mail::to($usuario->correo)->send(
                new AfiliacionAprobadaMail($usuario, $passwordPlano)
            );

            DB::commit();

            return $this->success(
                $solicitud->fresh(),
                'Afiliación aprobada correctamente. Se enviaron las credenciales al correo del usuario.'
            );
        } catch (\Throwable $e) {
            DB::rollBack();

            return $this->error('Error al aprobar la afiliación', [
                'detalle' => $e->getMessage()
            ], 500);
        }
    }

    public function rechazar(Request $request, int $id)
    {
        DB::beginTransaction();

        try {
            $solicitud = SolicitudAfiliacion::with(['usuario'])->find($id);

            if (!$solicitud) {
                return $this->error('Solicitud no encontrada', null, 404);
            }

            $usuario = $solicitud->usuario;

            $solicitud->update([
                'estado' => 'RECHAZADA',
                'observacion_admin' => $request->observacion,
                'aprobado_por' => optional($request->user())->id,
                'fecha_revision' => now(),
            ]);

            // 📧 Enviar correo
            if ($usuario && $usuario->correo) {
                Mail::to($usuario->correo)->send(
                    new AfiliacionRechazadaMail($usuario, $request->observacion)
                );
            }

            DB::commit();

            return $this->success(
                $solicitud,
                'Solicitud rechazada y correo enviado correctamente'
            );
        } catch (\Throwable $e) {
            DB::rollBack();

            return $this->error('Error al rechazar', [
                'detalle' => $e->getMessage()
            ], 500);
        }
    }

    private function guardarArchivo(Request $request, string $campo, string $tipo, int $solicitudId, int $usuarioId)
    {
        if (!$request->hasFile($campo)) {
            return null;
        }

        $archivo = $request->file($campo);
        $ruta = $archivo->store('afiliaciones/' . strtolower($tipo), 'public');

        ArchivoAdjunto::create([
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

        return $ruta;
    }

    private function guardarFirmaBase64(string $firmaBase64, int $solicitudId, int $usuarioId)
    {
        $firmaBase64 = preg_replace('/^data:image\/\w+;base64,/', '', $firmaBase64);
        $firmaBase64 = str_replace(' ', '+', $firmaBase64);

        $ruta = 'afiliaciones/firmas/firma_solicitante_' . $solicitudId . '.png';

        Storage::disk('public')->put($ruta, base64_decode($firmaBase64));

        ArchivoAdjunto::create([
            'modulo' => 'afiliacion',
            'referencia_id' => $solicitudId,
            'tipo_archivo' => 'FIRMA_SOLICITANTE',
            'nombre_original' => 'firma_solicitante_' . $solicitudId . '.png',
            'ruta_archivo' => $ruta,
            'extension' => 'png',
            'mime_type' => 'image/png',
            'peso_bytes' => Storage::disk('public')->size($ruta),
            'subido_por' => $usuarioId,
            'fecha_subida' => now(),
        ]);

        return $ruta;
    }

    private function generarPdfAfiliacion(
        Request $request,
        Usuario $usuario,
        Asociado $asociado,
        SolicitudAfiliacion $solicitud,
        string $rutaFirma
    ) {
        $pdf = Pdf::loadView('pdf.formato_afiliacion', [
            'request' => $request,
            'usuario' => $usuario,
            'asociado' => $asociado,
            'solicitud' => $solicitud,
            'firma' => 'data:image/png;base64,' . base64_encode(file_get_contents(storage_path('app/public/' . $rutaFirma))),
        ])->setPaper('letter');

        $rutaPdf = 'afiliaciones/pdfs/formato_afiliacion_' . $solicitud->id . '.pdf';

        Storage::disk('public')->put($rutaPdf, $pdf->output());

        return $rutaPdf;
    }
}
