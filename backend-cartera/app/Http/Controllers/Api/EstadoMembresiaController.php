<?php

namespace App\Http\Controllers\Api;

use App\Models\Asociado;
use App\Models\Auditoria;
use App\Models\EstadoMembresiaHistorial;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class EstadoMembresiaController extends BaseApiController
{
    public function historialPorAsociado(int $asociadoId)
    {
        $historial = EstadoMembresiaHistorial::with('usuario')
            ->where('asociado_id', $asociadoId)
            ->orderByDesc('fecha_cambio')
            ->get();

        return $this->success($historial, 'Historial de estados del asociado');
    }

    public function cambiarEstado(Request $request, int $asociadoId)
    {
        $validator = Validator::make($request->all(), [
            'estado_nuevo' => 'required|string|in:ACTIVO,INACTIVO,HONORARIO,RETIRADO,PENDIENTE',
            'motivo' => 'nullable|string|max:255',
            'nota' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return $this->error('Datos inválidos', $validator->errors(), 422);
        }

        $asociado = Asociado::with('usuario')->find($asociadoId);

        if (!$asociado) {
            return $this->error('Asociado no encontrado', null, 404);
        }

        DB::beginTransaction();

        try {
            $estadoAnterior = $asociado->estado_membresia;

            $asociado->update([
                'estado_membresia' => $request->estado_nuevo,
            ]);

            $historial = EstadoMembresiaHistorial::create([
                'asociado_id' => $asociado->id,
                'estado_anterior' => $estadoAnterior,
                'estado_nuevo' => $request->estado_nuevo,
                'motivo' => $request->motivo,
                'nota' => $request->nota,
                'cambiado_por_usuario_id' => $request->user()->id,
                'cambio_automatico' => 0,
                'fecha_cambio' => now(),
            ]);

            Auditoria::create([
                'usuario_id' => $request->user()->id,
                'modulo' => 'ESTADO_MEMBRESIA',
                'accion' => 'CAMBIAR_ESTADO',
                'entidad' => 'asociados',
                'entidad_id' => $asociado->id,
                'descripcion' => 'Cambio de estado de membresía',
                'ip_address' => $request->ip(),
                'user_agent' => $request->userAgent(),
                'datos_antes' => json_encode(['estado_membresia' => $estadoAnterior], JSON_UNESCAPED_UNICODE),
                'datos_despues' => json_encode(['estado_membresia' => $request->estado_nuevo], JSON_UNESCAPED_UNICODE),
                'fecha_evento' => now(),
            ]);

            DB::commit();

            return $this->success([
                'asociado' => $asociado->fresh(),
                'historial' => $historial,
            ], 'Estado de membresía actualizado correctamente');
        } catch (\Throwable $e) {
            DB::rollBack();
            return $this->error('Error al cambiar el estado de membresía', $e->getMessage(), 500);
        }
    }
}