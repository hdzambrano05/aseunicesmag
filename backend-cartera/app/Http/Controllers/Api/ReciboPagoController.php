<?php

namespace App\Http\Controllers\Api;

use App\Models\Asociado;
use App\Models\Auditoria;
use App\Models\Obligacion;
use App\Models\ReciboPago;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class ReciboPagoController extends BaseApiController
{
    public function index(Request $request)
    {
        $query = ReciboPago::with([
            'asociado.usuario',
            'obligacion.tipoObligacion',
            'cargadoPor',
            'aprobadoPor',
        ]);

        if ($request->filled('estado')) {
            $query->where('estado', $request->estado);
        }

        if ($request->filled('asociado_id')) {
            $query->where('asociado_id', $request->asociado_id);
        }

        $recibos = $query->orderByDesc('fecha_carga')->paginate(10);

        return $this->success($recibos, 'Listado de recibos');
    }

    public function misRecibos(Request $request)
    {
        $asociado = Asociado::where('usuario_id', $request->user()->id)->first();

        if (!$asociado) {
            return $this->error('Asociado no encontrado', null, 404);
        }

        $recibos = ReciboPago::with([
            'obligacion.tipoObligacion',
            'aprobadoPor',
        ])
            ->where('asociado_id', $asociado->id)
            ->orderByDesc('fecha_carga')
            ->get();

        return $this->success($recibos, 'Recibos del asociado');
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'obligacion_id' => 'required|exists:obligaciones,id',
            'referencia_pago' => 'required|string|max:100',
            'valor_reportado' => 'nullable|numeric|min:0',
            'fecha_pago' => 'nullable|date',
            'banco' => 'nullable|string|max:100',
            'observacion_usuario' => 'nullable|string',
            'archivo' => 'required|file|mimes:pdf,jpg,jpeg,png|max:2048',
        ]);

        if ($validator->fails()) {
            return $this->error('Datos inválidos', $validator->errors(), 422);
        }

        $usuario = $request->user();
        $asociado = Asociado::where('usuario_id', $usuario->id)->first();

        if (!$asociado) {
            return $this->error('El usuario no tiene asociado relacionado', null, 404);
        }

        $obligacion = Obligacion::find($request->obligacion_id);

        if (!$obligacion || $obligacion->asociado_id !== $asociado->id) {
            return $this->error('La obligación no pertenece al asociado autenticado', null, 403);
        }

        $archivo = $request->file('archivo');
        $ruta = $archivo->store('recibos_pago', 'public');

        $recibo = ReciboPago::create([
            'asociado_id' => $asociado->id,
            'obligacion_id' => $request->obligacion_id,
            'numero_recibo' => 'REC-' . now()->format('YmdHis') . '-' . random_int(100, 999),
            'referencia_pago' => $request->referencia_pago,
            'valor_reportado' => $request->valor_reportado,
            'fecha_pago' => $request->fecha_pago,
            'banco' => $request->banco,
            'observacion_usuario' => $request->observacion_usuario,
            'nombre_archivo' => $archivo->getClientOriginalName(),
            'ruta_archivo' => $ruta,
            'extension' => $archivo->getClientOriginalExtension(),
            'mime_type' => $archivo->getMimeType(),
            'peso_bytes' => $archivo->getSize(),
            'hash_archivo' => hash_file('sha256', $archivo->getRealPath()),
            'estado' => 'PENDIENTE',
            'cargado_por' => $usuario->id,
            'fecha_carga' => now(),
        ]);

        Auditoria::create([
            'usuario_id' => $usuario->id,
            'modulo' => 'RECIBOS_PAGO',
            'accion' => 'CREAR',
            'entidad' => 'recibos_pago',
            'entidad_id' => $recibo->id,
            'descripcion' => 'Carga de recibo de pago',
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
            'datos_antes' => null,
            'datos_despues' => json_encode($recibo->toArray(), JSON_UNESCAPED_UNICODE),
            'fecha_evento' => now(),
        ]);

        return $this->success($recibo, 'Recibo cargado correctamente', 201);
    }

    public function show(int $id)
    {
        $recibo = ReciboPago::with([
            'asociado.usuario',
            'obligacion.tipoObligacion',
            'obligacion.periodo',
            'cargadoPor',
            'aprobadoPor',
        ])->find($id);

        if (!$recibo) {
            return $this->error('Recibo no encontrado', null, 404);
        }

        return $this->success($recibo, 'Detalle del recibo');
    }

    public function aprobar(Request $request, int $id)
    {
        DB::beginTransaction();

        try {
            $recibo = ReciboPago::with('obligacion')->find($id);

            if (!$recibo) {
                return $this->error('Recibo no encontrado', null, 404);
            }

            if ($recibo->estado === 'APROBADO') {
                return $this->error('El recibo ya fue aprobado', null, 409);
            }

            $antes = $recibo->toArray();

            $recibo->update([
                'estado' => 'APROBADO',
                'observacion_admin' => $request->observacion_admin,
                'aprobado_por' => $request->user()->id,
                'fecha_revision' => now(),
            ]);

            if ($recibo->obligacion) {
                $recibo->obligacion->update([
                    'estado' => 'PAGADA',
                    'saldo_pendiente' => 0,
                ]);
            }

            Auditoria::create([
                'usuario_id' => $request->user()->id,
                'modulo' => 'RECIBOS_PAGO',
                'accion' => 'APROBAR',
                'entidad' => 'recibos_pago',
                'entidad_id' => $recibo->id,
                'descripcion' => 'Aprobación de recibo de pago',
                'ip_address' => $request->ip(),
                'user_agent' => $request->userAgent(),
                'datos_antes' => json_encode($antes, JSON_UNESCAPED_UNICODE),
                'datos_despues' => json_encode($recibo->fresh()->toArray(), JSON_UNESCAPED_UNICODE),
                'fecha_evento' => now(),
            ]);

            DB::commit();

            return $this->success($recibo->fresh(), 'Recibo aprobado correctamente');
        } catch (\Throwable $e) {
            DB::rollBack();
            return $this->error('Error al aprobar el recibo', $e->getMessage(), 500);
        }
    }

    public function rechazar(Request $request, int $id)
    {
        $validator = Validator::make($request->all(), [
            'observacion_admin' => 'required|string|max:2000',
        ]);

        if ($validator->fails()) {
            return $this->error('Debe indicar el motivo del rechazo', $validator->errors(), 422);
        }

        $recibo = ReciboPago::find($id);

        if (!$recibo) {
            return $this->error('Recibo no encontrado', null, 404);
        }

        $antes = $recibo->toArray();

        $recibo->update([
            'estado' => 'RECHAZADO',
            'observacion_admin' => $request->observacion_admin,
            'aprobado_por' => $request->user()->id,
            'fecha_revision' => now(),
        ]);

        Auditoria::create([
            'usuario_id' => $request->user()->id,
            'modulo' => 'RECIBOS_PAGO',
            'accion' => 'RECHAZAR',
            'entidad' => 'recibos_pago',
            'entidad_id' => $recibo->id,
            'descripcion' => 'Rechazo de recibo de pago',
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
            'datos_antes' => json_encode($antes, JSON_UNESCAPED_UNICODE),
            'datos_despues' => json_encode($recibo->fresh()->toArray(), JSON_UNESCAPED_UNICODE),
            'fecha_evento' => now(),
        ]);

        return $this->success($recibo->fresh(), 'Recibo rechazado correctamente');
    }

    public function descargarArchivo(int $id)
    {
        $recibo = ReciboPago::find($id);

        if (!$recibo) {
            return $this->error('Recibo no encontrado', null, 404);
        }

        if (!Storage::disk('public')->exists($recibo->ruta_archivo)) {
            return $this->error('El archivo no existe en almacenamiento', null, 404);
        }

        $disk = Storage::disk('public');
        $rutaCompleta = $disk->path($recibo->ruta_archivo);
        return response()->download($rutaCompleta, $recibo->nombre_original);
    }
}
