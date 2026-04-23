<?php

namespace App\Http\Controllers\Api;

use App\Models\Asociado;
use Illuminate\Http\Request;

class AsociadoController extends BaseApiController
{
    public function index(Request $request)
    {
        $query = Asociado::with([
            'usuario.rol',
            'ciudad',
            'referidoPor.usuario',
        ]);

        if ($request->filled('buscar')) {
            $buscar = $request->buscar;

            $query->where(function ($q) use ($buscar) {
                $q->where('codigo_asociado', 'like', "%{$buscar}%")
                  ->orWhere('estado_membresia', 'like', "%{$buscar}%")
                  ->orWhereHas('usuario', function ($uq) use ($buscar) {
                      $uq->where('nombres', 'like', "%{$buscar}%")
                         ->orWhere('apellidos', 'like', "%{$buscar}%")
                         ->orWhere('correo', 'like', "%{$buscar}%")
                         ->orWhere('numero_documento', 'like', "%{$buscar}%");
                  });
            });
        }

        if ($request->filled('estado_membresia')) {
            $query->where('estado_membresia', $request->estado_membresia);
        }

        $asociados = $query->orderByDesc('id')->paginate(10);

        return $this->success($asociados, 'Listado de asociados');
    }

    public function show(int $id)
    {
        $asociado = Asociado::with([
            'usuario.rol',
            'ciudad',
            'referidoPor.usuario',
            'historialEstados.usuario',
            'obligaciones.tipoObligacion',
            'obligaciones.periodo',
        ])->find($id);

        if (!$asociado) {
            return $this->error('Asociado no encontrado', null, 404);
        }

        return $this->success($asociado, 'Detalle del asociado');
    }

    public function miPerfil(Request $request)
    {
        $usuario = $request->user();

        $asociado = Asociado::with([
            'usuario.rol',
            'ciudad',
            'obligaciones.tipoObligacion',
            'obligaciones.periodo',
            'recibosPago',
        ])->where('usuario_id', $usuario->id)->first();

        if (!$asociado) {
            return $this->error('El usuario no tiene asociado relacionado', null, 404);
        }

        return $this->success($asociado, 'Perfil del asociado');
    }
}