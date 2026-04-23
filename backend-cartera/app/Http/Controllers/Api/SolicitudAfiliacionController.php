<?php

namespace App\Http\Controllers\Api;

use App\Models\SolicitudAfiliacion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SolicitudAfiliacionController extends BaseApiController
{
    public function index(Request $request)
    {
        $query = SolicitudAfiliacion::with(['usuario', 'asociado', 'aprobador'])
            ->orderByDesc('fecha_solicitud');

        if ($request->filled('estado')) {
            $query->where('estado', $request->estado);
        }

        return $this->success($query->paginate(20), 'Listado de solicitudes de afiliación');
    }

    public function show(int $id)
    {
        $solicitud = SolicitudAfiliacion::with(['usuario', 'asociado', 'aprobador'])->find($id);

        if (!$solicitud) {
            return $this->error('Solicitud no encontrada', null, 404);
        }

        return $this->success($solicitud, 'Detalle de la solicitud');
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'usuario_id' => 'required|exists:usuarios,id',
            'asociado_id' => 'nullable|exists:asociados,id',
            'fecha_solicitud' => 'required|date',
            'estado' => 'required|string|max:30',
            'origen' => 'nullable|string|max:50',
            'observacion_admin' => 'nullable|string',
            'aprobado_por' => 'nullable|exists:usuarios,id',
            'fecha_revision' => 'nullable|date',
        ]);

        if ($validator->fails()) {
            return $this->error('Datos inválidos', $validator->errors(), 422);
        }

        $solicitud = SolicitudAfiliacion::create($request->all());

        return $this->success($solicitud, 'Solicitud creada correctamente', 201);
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
}