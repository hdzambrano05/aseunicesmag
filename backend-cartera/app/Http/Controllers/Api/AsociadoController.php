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
            'obligaciones.tipoObligacion',
            'recibosPago',
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
            'obligaciones.recibosPago',
            'recibosPago.obligacion.tipoObligacion',
        ])->find($id);

        if (!$asociado) {
            return $this->error('Asociado no encontrado', null, 404);
        }

        return $this->success($asociado, 'Detalle del asociado');
    }

    public function miPerfil(Request $request)
    {
        $usuario = $request->user();

        if (!$usuario) {
            return $this->error('Usuario no autenticado', null, 401);
        }

        $asociado = Asociado::with([
            'usuario.rol',
            'ciudad',
            'obligaciones.tipoObligacion',
            'obligaciones.periodo',
            'obligaciones.smmlv',
            'obligaciones.recibosPago',
            'recibosPago.obligacion.tipoObligacion',
            'recibosPago.aprobadoPor',
        ])
            ->where('usuario_id', $usuario->id)
            ->first();

        if (!$asociado) {
            return $this->error('El usuario no tiene asociado relacionado', null, 404);
        }

        $obligacionesPendientes = $asociado->obligaciones
            ->whereIn('estado', ['PENDIENTE', 'VENCIDA', 'ABONO'])
            ->where('saldo_pendiente', '>', 0)
            ->values();

        $totalPendiente = $obligacionesPendientes->sum('saldo_pendiente');

        $data = $asociado->toArray();
        $data['tiene_deuda'] = $totalPendiente > 0;
        $data['total_pendiente'] = $totalPendiente;
        $data['obligaciones_pendientes'] = $obligacionesPendientes;

        return $this->success($data, 'Perfil del asociado');
    }
}
