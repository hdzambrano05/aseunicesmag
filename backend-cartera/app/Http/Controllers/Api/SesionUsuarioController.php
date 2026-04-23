<?php

namespace App\Http\Controllers\Api;

use App\Models\SesionUsuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SesionUsuarioController extends BaseApiController
{
    public function index(Request $request)
    {
        $query = SesionUsuario::with('usuario')->orderByDesc('fecha_inicio');

        if ($request->filled('usuario_id')) {
            $query->where('usuario_id', $request->usuario_id);
        }

        if ($request->filled('activa')) {
            $query->where('activa', $request->boolean('activa'));
        }

        return $this->success($query->paginate(20), 'Listado de sesiones');
    }

    public function show(int $id)
    {
        $sesion = SesionUsuario::with('usuario')->find($id);

        if (!$sesion) {
            return $this->error('Sesión no encontrada', null, 404);
        }

        return $this->success($sesion, 'Detalle de la sesión');
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'usuario_id' => 'required|exists:usuarios,id',
            'token' => 'required|string|max:500',
            'ip_address' => 'nullable|string|max:45',
            'user_agent' => 'nullable|string',
            'fecha_inicio' => 'required|date',
            'fecha_expiracion' => 'required|date|after_or_equal:fecha_inicio',
            'fecha_cierre' => 'nullable|date',
            'activa' => 'required|boolean',
        ]);

        if ($validator->fails()) {
            return $this->error('Datos inválidos', $validator->errors(), 422);
        }

        $sesion = SesionUsuario::create($request->all());

        return $this->success($sesion, 'Sesión creada correctamente', 201);
    }

    public function update(Request $request, int $id)
    {
        $sesion = SesionUsuario::find($id);

        if (!$sesion) {
            return $this->error('Sesión no encontrada', null, 404);
        }

        $validator = Validator::make($request->all(), [
            'token' => 'required|string|max:500',
            'ip_address' => 'nullable|string|max:45',
            'user_agent' => 'nullable|string',
            'fecha_inicio' => 'required|date',
            'fecha_expiracion' => 'required|date|after_or_equal:fecha_inicio',
            'fecha_cierre' => 'nullable|date',
            'activa' => 'required|boolean',
        ]);

        if ($validator->fails()) {
            return $this->error('Datos inválidos', $validator->errors(), 422);
        }

        $sesion->update($request->all());

        return $this->success($sesion->fresh(), 'Sesión actualizada correctamente');
    }
}