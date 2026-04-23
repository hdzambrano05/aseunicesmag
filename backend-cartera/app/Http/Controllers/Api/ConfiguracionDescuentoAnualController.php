<?php

namespace App\Http\Controllers\Api;

use App\Models\ConfiguracionDescuentoAnual;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ConfiguracionDescuentoAnualController extends BaseApiController
{
    public function index(Request $request)
    {
        $query = ConfiguracionDescuentoAnual::with('descuento')->orderByDesc('anio');

        if ($request->filled('anio')) {
            $query->where('anio', $request->anio);
        }

        return $this->success($query->paginate(20), 'Listado de configuraciones anuales de descuentos');
    }

    public function show(int $id)
    {
        $config = ConfiguracionDescuentoAnual::with('descuento')->find($id);

        if (!$config) {
            return $this->error('Configuración no encontrada', null, 404);
        }

        return $this->success($config, 'Detalle de la configuración anual');
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'anio' => 'required|integer',
            'descuento_id' => 'required|exists:descuentos,id',
            'activo' => 'required|boolean',
            'fecha_inicio' => 'nullable|date',
            'fecha_fin' => 'nullable|date|after_or_equal:fecha_inicio',
        ]);

        if ($validator->fails()) {
            return $this->error('Datos inválidos', $validator->errors(), 422);
        }

        $config = ConfiguracionDescuentoAnual::create($request->all());

        return $this->success($config, 'Configuración creada correctamente', 201);
    }

    public function update(Request $request, int $id)
    {
        $config = ConfiguracionDescuentoAnual::find($id);

        if (!$config) {
            return $this->error('Configuración no encontrada', null, 404);
        }

        $validator = Validator::make($request->all(), [
            'anio' => 'required|integer',
            'descuento_id' => 'required|exists:descuentos,id',
            'activo' => 'required|boolean',
            'fecha_inicio' => 'nullable|date',
            'fecha_fin' => 'nullable|date|after_or_equal:fecha_inicio',
        ]);

        if ($validator->fails()) {
            return $this->error('Datos inválidos', $validator->errors(), 422);
        }

        $config->update($request->all());

        return $this->success($config->fresh(), 'Configuración actualizada correctamente');
    }
}