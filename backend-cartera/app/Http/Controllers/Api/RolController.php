<?php

namespace App\Http\Controllers\Api;

use App\Models\Rol;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class RolController extends BaseApiController
{
    public function index()
    {
        $roles = Rol::withCount('usuarios')->orderBy('nombre')->get();
        return $this->success($roles, 'Listado de roles');
    }

    public function show(int $id)
    {
        $rol = Rol::with('usuarios')->find($id);

        if (!$rol) {
            return $this->error('Rol no encontrado', null, 404);
        }

        return $this->success($rol, 'Detalle del rol');
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nombre' => 'required|string|max:50|unique:roles,nombre',
            'descripcion' => 'nullable|string|max:255',
            'estado' => 'required|boolean',
        ]);

        if ($validator->fails()) {
            return $this->error('Datos inválidos', $validator->errors(), 422);
        }

        $rol = Rol::create($request->only(['nombre', 'descripcion', 'estado']));

        return $this->success($rol, 'Rol creado correctamente', 201);
    }

    public function update(Request $request, int $id)
    {
        $rol = Rol::find($id);

        if (!$rol) {
            return $this->error('Rol no encontrado', null, 404);
        }

        $validator = Validator::make($request->all(), [
            'nombre' => 'required|string|max:50|unique:roles,nombre,' . $id,
            'descripcion' => 'nullable|string|max:255',
            'estado' => 'required|boolean',
        ]);

        if ($validator->fails()) {
            return $this->error('Datos inválidos', $validator->errors(), 422);
        }

        $rol->update($request->only(['nombre', 'descripcion', 'estado']));

        return $this->success($rol->fresh(), 'Rol actualizado correctamente');
    }
}