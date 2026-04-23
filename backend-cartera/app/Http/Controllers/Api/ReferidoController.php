<?php

namespace App\Http\Controllers\Api;

use App\Models\Referido;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ReferidoController extends BaseApiController
{
    public function index(Request $request)
    {
        $query = Referido::with(['referente.usuario', 'referido.usuario'])->orderByDesc('fecha_registro');

        if ($request->filled('estado')) {
            $query->where('estado', $request->estado);
        }

        if ($request->filled('asociado_referente_id')) {
            $query->where('asociado_referente_id', $request->asociado_referente_id);
        }

        return $this->success($query->paginate(20), 'Listado de referidos');
    }

    public function show(int $id)
    {
        $referido = Referido::with(['referente.usuario', 'referido.usuario'])->find($id);

        if (!$referido) {
            return $this->error('Referido no encontrado', null, 404);
        }

        return $this->success($referido, 'Detalle del referido');
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'asociado_referente_id' => 'required|exists:asociados,id',
            'asociado_referido_id' => 'required|exists:asociados,id|different:asociado_referente_id',
            'codigo_referido' => 'required|string|max:50',
            'fecha_registro' => 'required|date',
            'estado' => 'required|string|max:30',
            'beneficio_otorgado' => 'required|boolean',
            'valor_beneficio' => 'required|numeric|min:0',
            'observacion' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return $this->error('Datos inválidos', $validator->errors(), 422);
        }

        $referido = Referido::create($request->all());

        return $this->success($referido, 'Referido creado correctamente', 201);
    }

    public function update(Request $request, int $id)
    {
        $referido = Referido::find($id);

        if (!$referido) {
            return $this->error('Referido no encontrado', null, 404);
        }

        $validator = Validator::make($request->all(), [
            'codigo_referido' => 'required|string|max:50',
            'fecha_registro' => 'required|date',
            'estado' => 'required|string|max:30',
            'beneficio_otorgado' => 'required|boolean',
            'valor_beneficio' => 'required|numeric|min:0',
            'observacion' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return $this->error('Datos inválidos', $validator->errors(), 422);
        }

        $referido->update($request->all());

        return $this->success($referido->fresh(), 'Referido actualizado correctamente');
    }
}