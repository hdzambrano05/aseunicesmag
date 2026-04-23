<?php

namespace App\Http\Controllers\Api;

use App\Models\PeriodoCobro;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PeriodoCobroController extends BaseApiController
{
    public function index(Request $request)
    {
        $query = PeriodoCobro::withCount('obligaciones')->orderByDesc('anio')->orderBy('fecha_inicio');

        if ($request->filled('anio')) {
            $query->where('anio', $request->anio);
        }

        if ($request->filled('tipo_periodo')) {
            $query->where('tipo_periodo', $request->tipo_periodo);
        }

        return $this->success($query->paginate(20), 'Listado de periodos de cobro');
    }

    public function show(int $id)
    {
        $periodo = PeriodoCobro::with('obligaciones')->find($id);

        if (!$periodo) {
            return $this->error('Periodo no encontrado', null, 404);
        }

        return $this->success($periodo, 'Detalle del periodo');
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nombre' => 'required|string|max:100',
            'tipo_periodo' => 'required|string|max:20',
            'fecha_inicio' => 'required|date',
            'fecha_fin' => 'required|date|after_or_equal:fecha_inicio',
            'fecha_limite_descuento' => 'nullable|date',
            'anio' => 'required|integer',
            'activo' => 'required|boolean',
        ]);

        if ($validator->fails()) {
            return $this->error('Datos inválidos', $validator->errors(), 422);
        }

        $periodo = PeriodoCobro::create($request->all());

        return $this->success($periodo, 'Periodo creado correctamente', 201);
    }

    public function update(Request $request, int $id)
    {
        $periodo = PeriodoCobro::find($id);

        if (!$periodo) {
            return $this->error('Periodo no encontrado', null, 404);
        }

        $validator = Validator::make($request->all(), [
            'nombre' => 'required|string|max:100',
            'tipo_periodo' => 'required|string|max:20',
            'fecha_inicio' => 'required|date',
            'fecha_fin' => 'required|date|after_or_equal:fecha_inicio',
            'fecha_limite_descuento' => 'nullable|date',
            'anio' => 'required|integer',
            'activo' => 'required|boolean',
        ]);

        if ($validator->fails()) {
            return $this->error('Datos inválidos', $validator->errors(), 422);
        }

        $periodo->update($request->all());

        return $this->success($periodo->fresh(), 'Periodo actualizado correctamente');
    }
}