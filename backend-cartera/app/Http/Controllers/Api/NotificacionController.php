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

        if ($request->filled('tipo')) {
            $query->where('tipo', $request->tipo);
        }

        return $this->success($query->paginate(20), 'Listado de notificaciones');
    }

    public function misNotificaciones(Request $request)
    {
        $usuario = $request->user();

        if (!$usuario) {
            return $this->error('Usuario no autenticado', null, 401);
        }

        $notificaciones = Notificacion::where('usuario_id', $usuario->id)
            ->orderByDesc('id')
            ->paginate(20);

        return $this->success($notificaciones, 'Mis notificaciones');
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
            'estado' => 'nullable|string|max:20',
            'fecha_envio' => 'nullable|date',
            'fecha_lectura' => 'nullable|date',
            'referencia_modulo' => 'nullable|string|max:50',
            'referencia_id' => 'nullable|integer',
        ]);

        if ($validator->fails()) {
            return $this->error('Datos inválidos', $validator->errors(), 422);
        }

        $notificacion = Notificacion::create([
            'usuario_id' => $request->usuario_id,
            'tipo' => $request->tipo,
            'titulo' => $request->titulo,
            'mensaje' => $request->mensaje,
            'estado' => $request->estado ?? 'NO_LEIDA',
            'fecha_envio' => $request->fecha_envio ?? now(),
            'fecha_lectura' => $request->fecha_lectura,
            'referencia_modulo' => $request->referencia_modulo,
            'referencia_id' => $request->referencia_id,
        ]);

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

        $notificacion->update([
            'tipo' => $request->tipo,
            'titulo' => $request->titulo,
            'mensaje' => $request->mensaje,
            'estado' => $request->estado,
            'fecha_envio' => $request->fecha_envio,
            'fecha_lectura' => $request->fecha_lectura,
            'referencia_modulo' => $request->referencia_modulo,
            'referencia_id' => $request->referencia_id,
        ]);

        return $this->success($notificacion->fresh(), 'Notificación actualizada correctamente');
    }

    public function marcarLeida(Request $request, int $id)
    {
        $usuario = $request->user();

        if (!$usuario) {
            return $this->error('Usuario no autenticado', null, 401);
        }

        $notificacion = Notificacion::find($id);

        if (!$notificacion) {
            return $this->error('Notificación no encontrada', null, 404);
        }

        if (intval($notificacion->usuario_id) !== intval($usuario->id)) {
            return $this->error('No puedes marcar esta notificación', null, 403);
        }

        $notificacion->update([
            'estado' => 'LEIDA',
            'fecha_lectura' => now(),
        ]);

        return $this->success($notificacion->fresh(), 'Notificación marcada como leída');
    }

    public function marcarTodasLeidas(Request $request)
    {
        $usuario = $request->user();

        if (!$usuario) {
            return $this->error('Usuario no autenticado', null, 401);
        }

        Notificacion::where('usuario_id', $usuario->id)
            ->where('estado', '!=', 'LEIDA')
            ->update([
                'estado' => 'LEIDA',
                'fecha_lectura' => now(),
            ]);

        return $this->success(null, 'Todas las notificaciones fueron marcadas como leídas');
    }

    public static function crearNotificacion(
        int $usuarioId,
        string $tipo,
        string $titulo,
        string $mensaje,
        ?string $referenciaModulo = null,
        ?int $referenciaId = null
    ) {
        return Notificacion::create([
            'usuario_id' => $usuarioId,
            'tipo' => $tipo,
            'titulo' => $titulo,
            'mensaje' => $mensaje,
            'estado' => 'NO_LEIDA',
            'fecha_envio' => now(),
            'fecha_lectura' => null,
            'referencia_modulo' => $referenciaModulo,
            'referencia_id' => $referenciaId,
        ]);
    }
}