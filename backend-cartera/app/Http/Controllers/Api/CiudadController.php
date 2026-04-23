<?php

namespace App\Http\Controllers\Api;

use App\Models\Ciudad;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CiudadController extends BaseApiController
{
    public function index(Request $request)
    {
        $query = Ciudad::query();

        if ($request->filled('buscar')) {
            $buscar = $request->buscar;
            $query->where(function ($q) use ($buscar) {
                $q->where('departamento', 'like', "%{$buscar}%")
                  ->orWhere('ciudad', 'like', "%{$buscar}%")
                  ->orWhere('codigo_dane', 'like', "%{$buscar}%");
            });
        }

        return $this->success($query->orderBy('departamento')->orderBy('ciudad')->paginate(30), 'Listado de ciudades');
    }

    public function show(int $id)
    {
        $ciudad = Ciudad::with('asociados')->find($id);

        if (!$ciudad) {
            return $this->error('Ciudad no encontrada', null, 404);
        }

        return $this->success($ciudad, 'Detalle de la ciudad');
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'departamento' => 'required|string|max:100',
            'ciudad' => 'required|string|max:100',
            'codigo_dane' => 'nullable|string|max:20',
        ]);

        if ($validator->fails()) {
            return $this->error('Datos inválidos', $validator->errors(), 422);
        }

        $ciudad = Ciudad::create($request->all());

        return $this->success($ciudad, 'Ciudad creada correctamente', 201);
    }

    public function update(Request $request, int $id)
    {
        $ciudad = Ciudad::find($id);

        if (!$ciudad) {
            return $this->error('Ciudad no encontrada', null, 404);
        }

        $validator = Validator::make($request->all(), [
            'departamento' => 'required|string|max:100',
            'ciudad' => 'required|string|max:100',
            'codigo_dane' => 'nullable|string|max:20',
        ]);

        if ($validator->fails()) {
            return $this->error('Datos inválidos', $validator->errors(), 422);
        }

        $ciudad->update($request->all());

        return $this->success($ciudad->fresh(), 'Ciudad actualizada correctamente');
    }
}