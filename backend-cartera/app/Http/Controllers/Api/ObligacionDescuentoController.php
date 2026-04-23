<?php

namespace App\Http\Controllers\Api;

use App\Models\ObligacionDescuento;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ObligacionDescuentoController extends BaseApiController
{
    public function index(Request $request)
    {
        $query = ObligacionDescuento::with(['obligacion', 'descuento'])->orderByDesc('fecha_aplicacion');

        if ($request->filled('obligacion_id')) {
            $query->where('obligacion_id', $request->obligacion_id);
        }

        if ($request->filled('descuento_id')) {
            $query->where('descuento_id', $request->descuento_id);
        }

        return $this->success($query->paginate(20), 'Listado de descuentos aplicados');
    }

    public function show(int $id)
    {
        $registro = ObligacionDescuento::with(['obligacion', 'descuento'])->find($id);

        if (!$registro) {
            return $this->error('Registro no encontrado', null, 404);
        }

        return $this->success($registro, 'Detalle del descuento aplicado');
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'obligacion_id' => 'required|exists:obligaciones,id',
            'descuento_id' => 'required|exists:descuentos,id',
            'valor_aplicado' => 'required|numeric|min:0',
            'fecha_aplicacion' => 'required|date',
            'aplicado_por_sistema' => 'required|boolean',
            'observacion' => 'nullable|string|max:255',
        ]);

        if ($validator->fails()) {
            return $this->error('Datos inválidos', $validator->errors(), 422);
        }

        $registro = ObligacionDescuento::create($request->all());

        return $this->success($registro, 'Descuento aplicado correctamente', 201);
    }

    public function update(Request $request, int $id)
    {
        $registro = ObligacionDescuento::find($id);

        if (!$registro) {
            return $this->error('Registro no encontrado', null, 404);
        }

        $validator = Validator::make($request->all(), [
            'valor_aplicado' => 'required|numeric|min:0',
            'fecha_aplicacion' => 'required|date',
            'aplicado_por_sistema' => 'required|boolean',
            'observacion' => 'nullable|string|max:255',
        ]);

        if ($validator->fails()) {
            return $this->error('Datos inválidos', $validator->errors(), 422);
        }

        $registro->update($request->all());

        return $this->success($registro->fresh(), 'Descuento aplicado actualizado correctamente');
    }
}