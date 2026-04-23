<?php

namespace App\Http\Controllers\Api;

use App\Models\Descuento;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class DescuentoController extends BaseApiController
{
    public function index()
    {
        return $this->success(
            Descuento::withCount('obligacionesAplicadas')->orderBy('nombre')->get(),
            'Listado de descuentos'
        );
    }

    public function show(int $id)
    {
        $descuento = Descuento::with(['obligacionesAplicadas', 'configuracionesAnuales'])->find($id);

        if (!$descuento) {
            return $this->error('Descuento no encontrado', null, 404);
        }

        return $this->success($descuento, 'Detalle del descuento');
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'codigo' => 'required|string|max:30|unique:descuentos,codigo',
            'nombre' => 'required|string|max:100',
            'descripcion' => 'nullable|string|max:255',
            'tipo_descuento' => 'required|string|max:20',
            'valor' => 'required|numeric|min:0',
            'aplica_a_tipo_periodo' => 'nullable|string|max:20',
            'dias_limite' => 'nullable|integer|min:0',
            'maximo_por_anio' => 'nullable|integer|min:0',
            'activo' => 'required|boolean',
        ]);

        if ($validator->fails()) {
            return $this->error('Datos inválidos', $validator->errors(), 422);
        }

        $descuento = Descuento::create($request->all());

        return $this->success($descuento, 'Descuento creado correctamente', 201);
    }

    public function update(Request $request, int $id)
    {
        $descuento = Descuento::find($id);

        if (!$descuento) {
            return $this->error('Descuento no encontrado', null, 404);
        }

        $validator = Validator::make($request->all(), [
            'codigo' => 'required|string|max:30|unique:descuentos,codigo,' . $id,
            'nombre' => 'required|string|max:100',
            'descripcion' => 'nullable|string|max:255',
            'tipo_descuento' => 'required|string|max:20',
            'valor' => 'required|numeric|min:0',
            'aplica_a_tipo_periodo' => 'nullable|string|max:20',
            'dias_limite' => 'nullable|integer|min:0',
            'maximo_por_anio' => 'nullable|integer|min:0',
            'activo' => 'required|boolean',
        ]);

        if ($validator->fails()) {
            return $this->error('Datos inválidos', $validator->errors(), 422);
        }

        $descuento->update($request->all());

        return $this->success($descuento->fresh(), 'Descuento actualizado correctamente');
    }
}