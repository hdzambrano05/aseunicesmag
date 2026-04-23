<?php

namespace App\Http\Controllers\Api;

use App\Models\TipoObligacion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TipoObligacionController extends BaseApiController
{
    public function index()
    {
        $tipos = TipoObligacion::withCount('obligaciones')->orderBy('nombre')->get();
        return $this->success($tipos, 'Listado de tipos de obligación');
    }

    public function show(int $id)
    {
        $tipo = TipoObligacion::with('obligaciones')->find($id);

        if (!$tipo) {
            return $this->error('Tipo de obligación no encontrado', null, 404);
        }

        return $this->success($tipo, 'Detalle del tipo de obligación');
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'codigo' => 'required|string|max:30|unique:tipos_obligacion,codigo',
            'nombre' => 'required|string|max:100',
            'descripcion' => 'nullable|string|max:255',
            'es_recurrente' => 'required|boolean',
            'permite_descuento' => 'required|boolean',
            'afecta_estado_membresia' => 'required|boolean',
        ]);

        if ($validator->fails()) {
            return $this->error('Datos inválidos', $validator->errors(), 422);
        }

        $tipo = TipoObligacion::create($request->all());

        return $this->success($tipo, 'Tipo de obligación creado correctamente', 201);
    }

    public function update(Request $request, int $id)
    {
        $tipo = TipoObligacion::find($id);

        if (!$tipo) {
            return $this->error('Tipo de obligación no encontrado', null, 404);
        }

        $validator = Validator::make($request->all(), [
            'codigo' => 'required|string|max:30|unique:tipos_obligacion,codigo,' . $id,
            'nombre' => 'required|string|max:100',
            'descripcion' => 'nullable|string|max:255',
            'es_recurrente' => 'required|boolean',
            'permite_descuento' => 'required|boolean',
            'afecta_estado_membresia' => 'required|boolean',
        ]);

        if ($validator->fails()) {
            return $this->error('Datos inválidos', $validator->errors(), 422);
        }

        $tipo->update($request->all());

        return $this->success($tipo->fresh(), 'Tipo de obligación actualizado correctamente');
    }
}