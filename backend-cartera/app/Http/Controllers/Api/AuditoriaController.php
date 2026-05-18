<?php

namespace App\Http\Controllers\Api;

use App\Models\Auditoria;
use Illuminate\Http\Request;

class AuditoriaController extends BaseApiController
{
    public function index(Request $request)
    {
        $query = Auditoria::with('usuario')
            ->orderByDesc('fecha_evento');

        if ($request->filled('modulo')) {
            $query->where('modulo', $request->modulo);
        }

        if ($request->filled('accion')) {
            $query->where('accion', $request->accion);
        }

        if ($request->filled('usuario_id')) {
            $query->where('usuario_id', $request->usuario_id);
        }

        if ($request->filled('entidad')) {
            $query->where('entidad', $request->entidad);
        }

        if ($request->filled('entidad_id')) {
            $query->where('entidad_id', $request->entidad_id);
        }

        if ($request->filled('fecha_inicio')) {
            $query->whereDate('fecha_evento', '>=', $request->fecha_inicio);
        }

        if ($request->filled('fecha_fin')) {
            $query->whereDate('fecha_evento', '<=', $request->fecha_fin);
        }

        $auditorias = $query->paginate(
            $request->get('per_page', 20)
        );

        return $this->success($auditorias, 'Listado de auditoría');
    }

    public function show(int $id)
    {
        $registro = Auditoria::with('usuario')->find($id);

        if (!$registro) {
            return $this->error('Registro de auditoría no encontrado', null, 404);
        }

        return $this->success($registro, 'Detalle de auditoría');
    }

    public function misAuditorias(Request $request)
    {
        $usuario = $request->user();

        if (!$usuario) {
            return $this->error('Usuario no autenticado', null, 401);
        }

        $auditorias = Auditoria::with('usuario')
            ->where('usuario_id', $usuario->id)
            ->orderByDesc('fecha_evento')
            ->paginate(
                $request->get('per_page', 20)
            );

        return $this->success($auditorias, 'Mis registros de auditoría');
    }

    public static function registrar(
        ?int $usuarioId,
        string $modulo,
        string $accion,
        ?string $entidad = null,
        ?int $entidadId = null,
        ?string $descripcion = null,
        ?string $ipAddress = null,
        ?string $userAgent = null,
        $datosAntes = null,
        $datosDespues = null
    ) {
        return Auditoria::create([
            'usuario_id' => $usuarioId,
            'modulo' => $modulo,
            'accion' => $accion,
            'entidad' => $entidad,
            'entidad_id' => $entidadId,
            'descripcion' => $descripcion,
            'ip_address' => $ipAddress,
            'user_agent' => $userAgent,
            'datos_antes' => is_array($datosAntes)
                ? json_encode($datosAntes, JSON_UNESCAPED_UNICODE)
                : $datosAntes,
            'datos_despues' => is_array($datosDespues)
                ? json_encode($datosDespues, JSON_UNESCAPED_UNICODE)
                : $datosDespues,
            'fecha_evento' => now(),
        ]);
    }
}
