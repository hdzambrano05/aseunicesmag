<?php

namespace App\Http\Controllers\Api;

use App\Models\Auditoria;
use Illuminate\Http\Request;

class AuditoriaController extends BaseApiController
{
    public function index(Request $request)
    {
        $query = Auditoria::with('usuario')->orderByDesc('fecha_evento');

        if ($request->filled('modulo')) {
            $query->where('modulo', $request->modulo);
        }

        if ($request->filled('accion')) {
            $query->where('accion', $request->accion);
        }

        if ($request->filled('usuario_id')) {
            $query->where('usuario_id', $request->usuario_id);
        }

        $auditorias = $query->paginate(20);

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
}