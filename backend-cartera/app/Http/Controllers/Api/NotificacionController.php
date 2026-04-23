<?php

namespace App\Http\Controllers\Api;

use App\Models\Notificacion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class NotificacionController extends BaseApiController
{
    public function index(Request $request)
    {
        $query = Notificacion::with('usuario')->orderByDesc('id');

        if ($request->filled('usuario_id')) {
            $query->where('usuario_id', $request->usuario_id);
        }

        if ($request->filled('estado')) {
            $query->where('estado', $request->estado);
        }

        return $this->success($query->paginate(20), 'Listado de notificaciones');
    }

    public function show(int $id)
    {
        $notificacion = Notificacion::with('usuario')->find($id);

        if (!$notificacion) {
            return $this->error('Notificación no encontrada', null, 404);
        }

        return $this->success($notificacion, 'Detalle de la notificación');
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'usuario_id' => 'required|exists:usuarios,id',
            'tipo' => 'required|string|max:30',
            'titulo' => 'required|string|max:150',
            'mensaje' => 'required|string',
            'estado' => 'required|string|max:20',
            'fecha_envio' => 'nullable|date',
            'fecha_lectura' => 'nullable|date',
            'referencia_modulo' => 'nullable|string|max:50',
            'referencia_id' => 'nullable|integer',
        ]);

        if ($validator->fails()) {
            return $this->error('Datos inválidos', $validator->errors(), 422);
        }

        $notificacion = Notificacion::create($request->all());

        return $this->success($notificacion, 'Notificación creada correctamente', 201);
    }

    public function update(Request $request, int $id)
    {
        $notificacion = Notificacion::find($id);

        if (!$notificacion) {
            return $this->error('Notificación no encontrada', null, 404);
        }

        $validator = Validator::make($request->all(), [
            'tipo' => 'required|string|max:30',
            'titulo' => 'required|string|max:150',
            'mensaje' => 'required|string',
            'estado' => 'required|string|max:20',
            'fecha_envio' => 'nullable|date',
            'fecha_lectura' => 'nullable|date',
            'referencia_modulo' => 'nullable|string|max:50',
            'referencia_id' => 'nullable|integer',
        ]);

        if ($validator->fails()) {
            return $this->error('Datos inválidos', $validator->errors(), 422);
        }

        $notificacion->update($request->all());

        return $this->success($notificacion->fresh(), 'Notificación actualizada correctamente');
    }

    public function marcarLeida(int $id)
    {
        $notificacion = Notificacion::find($id);

        if (!$notificacion) {
            return $this->error('Notificación no encontrada', null, 404);
        }

        $notificacion->update([
            'estado' => 'LEIDA',
            'fecha_lectura' => now(),
        ]);

        return $this->success($notificacion->fresh(), 'Notificación marcada como leída');
    }
}