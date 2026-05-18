<?php

namespace App\Http\Controllers\Api;

use App\Models\Asociado;
use App\Models\Auditoria;
use App\Models\Obligacion;
use App\Models\ReciboPago;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class ReciboPagoController extends BaseApiController
{
    public function index(Request $request)
    {
        $query = ReciboPago::with([
            'asociado.usuario',
            'obligacion.tipoObligacion',
            'obligacion.periodo',
            'cargadoPor',
            'aprobadoPor',
        ]);

        if ($request->filled('estado')) {
            $query->where('estado', $request->estado);
        }

        if ($request->filled('asociado_id')) {
            $query->where('asociado_id', $request->asociado_id);
        }

        if ($request->filled('obligacion_id')) {
            $query->where('obligacion_id', $request->obligacion_id);
        }

        $recibos = $query
            ->orderByDesc('fecha_carga')
            ->paginate($request->get('per_page', 10));

        return $this->success($recibos, 'Listado de recibos');
    }

    public function misRecibos(Request $request)
    {
        $usuario = $request->user();

        if (!$usuario) {
            return $this->error('Usuario no autenticado', null, 401);
        }

        $asociado = Asociado::where('usuario_id', $usuario->id)->first();

        if (!$asociado) {
            return $this->error('Asociado no encontrado', null, 404);
        }

        $recibos = ReciboPago::with([
            'obligacion.tipoObligacion',
            'obligacion.periodo',
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
            'referencia_pago' => 'nullable|string|max:100',
            'valor_reportado' => 'required|numeric|min:1',
            'fecha_pago' => 'nullable|date',
            'banco' => 'nullable|string|max:100',
            'observacion_usuario' => 'nullable|string',
            'archivo' => 'required|file|mimes:pdf,jpg,jpeg,png|max:2048',
        ]);

        if ($validator->fails()) {
            return $this->error('Datos inválidos', $validator->errors(), 422);
        }

        $usuario = $request->user();

        if (!$usuario) {
            return $this->error('Usuario no autenticado', null, 401);
        }

        $asociado = Asociado::where('usuario_id', $usuario->id)->first();

        if (!$asociado) {
            return $this->error('El usuario no tiene asociado relacionado', null, 404);
        }

        DB::beginTransaction();

        try {
            $obligacion = Obligacion::lockForUpdate()->find($request->obligacion_id);

            if (!$obligacion || intval($obligacion->asociado_id) !== intval($asociado->id)) {
                DB::rollBack();
                return $this->error('La obligación no pertenece al asociado autenticado', null, 403);
            }

            if ($obligacion->estado === 'PAGADA') {
                DB::rollBack();
                return $this->error('Esta obligación ya se encuentra pagada', null, 409);
            }

            if ($obligacion->estado === 'EN_REVISION') {
                DB::rollBack();
                return $this->error('Esta obligación ya tiene un recibo pendiente de revisión', null, 409);
            }

            $reciboPendiente = ReciboPago::where('obligacion_id', $obligacion->id)
                ->whereIn('estado', ['PENDIENTE', 'APROBADO'])
                ->exists();

            if ($reciboPendiente) {
                DB::rollBack();
                return $this->error('Esta obligación ya tiene un recibo cargado', null, 409);
            }

            $archivo = $request->file('archivo');
            $ruta = $archivo->store('recibos_pago', 'public');

            $recibo = ReciboPago::create([
                'asociado_id' => $asociado->id,
                'obligacion_id' => $obligacion->id,
                'numero_recibo' => 'REC-' . now()->format('YmdHis') . '-' . random_int(100, 999),
                'referencia_pago' => $request->referencia_pago,
                'valor_reportado' => $request->valor_reportado,
                'fecha_pago' => $request->fecha_pago ?? now()->toDateString(),
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

            $obligacion->update([
                'estado' => 'EN_REVISION',
                'updated_at' => now(),
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

            DB::commit();

            return $this->success(
                $recibo->fresh([
                    'asociado.usuario',
                    'obligacion.tipoObligacion',
                    'cargadoPor',
                ]),
                'Recibo cargado correctamente. Queda pendiente de revisión.',
                201
            );
        } catch (\Throwable $e) {
            DB::rollBack();

            return $this->error('Error al cargar el recibo', [
                'detalle' => $e->getMessage(),
                'linea' => $e->getLine(),
                'archivo' => $e->getFile(),
            ], 500);
        }
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
        $validator = Validator::make($request->all(), [
            'observacion_admin' => 'nullable|string|max:2000',
        ]);

        if ($validator->fails()) {
            return $this->error('Datos inválidos', $validator->errors(), 422);
        }

        $usuario = $request->user();

        if (!$usuario) {
            return $this->error('Usuario no autenticado', null, 401);
        }

        DB::beginTransaction();

        try {
            $recibo = ReciboPago::with('obligacion')
                ->lockForUpdate()
                ->find($id);

            if (!$recibo) {
                DB::rollBack();
                return $this->error('Recibo no encontrado', null, 404);
            }

            if ($recibo->estado === 'APROBADO') {
                DB::rollBack();
                return $this->error('El recibo ya fue aprobado', null, 409);
            }

            if ($recibo->estado === 'RECHAZADO') {
                DB::rollBack();
                return $this->error('El recibo ya fue rechazado', null, 409);
            }

            $antes = $recibo->toArray();

            $recibo->update([
                'estado' => 'APROBADO',
                'observacion_admin' => $request->observacion_admin,
                'aprobado_por' => $usuario->id,
                'fecha_revision' => now(),
            ]);

            if ($recibo->obligacion) {
                $valorPagado = floatval($recibo->valor_reportado);
                $saldoActual = floatval($recibo->obligacion->saldo_pendiente);
                $nuevoSaldo = max($saldoActual - $valorPagado, 0);

                $recibo->obligacion->update([
                    'saldo_pendiente' => $nuevoSaldo,
                    'estado' => $nuevoSaldo <= 0 ? 'PAGADA' : 'ABONO',
                    'updated_at' => now(),
                ]);
            }

            Auditoria::create([
                'usuario_id' => $usuario->id,
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

            return $this->success(
                $recibo->fresh([
                    'asociado.usuario',
                    'obligacion.tipoObligacion',
                    'aprobadoPor',
                ]),
                'Recibo aprobado correctamente'
            );
        } catch (\Throwable $e) {
            DB::rollBack();

            return $this->error('Error al aprobar el recibo', [
                'detalle' => $e->getMessage(),
                'linea' => $e->getLine(),
                'archivo' => $e->getFile(),
            ], 500);
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

        $usuario = $request->user();

        if (!$usuario) {
            return $this->error('Usuario no autenticado', null, 401);
        }

        DB::beginTransaction();

        try {
            $recibo = ReciboPago::with('obligacion')
                ->lockForUpdate()
                ->find($id);

            if (!$recibo) {
                DB::rollBack();
                return $this->error('Recibo no encontrado', null, 404);
            }

            if ($recibo->estado === 'APROBADO') {
                DB::rollBack();
                return $this->error('No se puede rechazar un recibo aprobado', null, 409);
            }

            if ($recibo->estado === 'RECHAZADO') {
                DB::rollBack();
                return $this->error('El recibo ya fue rechazado', null, 409);
            }

            $antes = $recibo->toArray();

            $recibo->update([
                'estado' => 'RECHAZADO',
                'observacion_admin' => $request->observacion_admin,
                'aprobado_por' => $usuario->id,
                'fecha_revision' => now(),
            ]);

            if ($recibo->obligacion) {
                $recibo->obligacion->update([
                    'estado' => 'PENDIENTE',
                    'updated_at' => now(),
                ]);
            }

            Auditoria::create([
                'usuario_id' => $usuario->id,
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

            DB::commit();

            return $this->success(
                $recibo->fresh([
                    'asociado.usuario',
                    'obligacion.tipoObligacion',
                    'aprobadoPor',
                ]),
                'Recibo rechazado correctamente'
            );
        } catch (\Throwable $e) {
            DB::rollBack();

            return $this->error('Error al rechazar el recibo', [
                'detalle' => $e->getMessage(),
                'linea' => $e->getLine(),
                'archivo' => $e->getFile(),
            ], 500);
        }
    }

    public function descargarArchivo(int $id)
    {
        $recibo = ReciboPago::find($id);

        if (!$recibo) {
            return $this->error('Recibo no encontrado', null, 404);
        }

        $rutaCompleta = storage_path('app/public/' . $recibo->ruta_archivo);

        if (!file_exists($rutaCompleta)) {
            return $this->error('Archivo no encontrado', null, 404);
        }

        return response()->download(
            $rutaCompleta,
            $recibo->nombre_archivo
        );
    }
}
