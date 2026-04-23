<?php

namespace App\Http\Controllers\Api;

use App\Models\Auditoria;
use App\Models\ParametroSistema;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ParametroSistemaController extends BaseApiController
{
    public function index(Request $request)
    {
        $query = ParametroSistema::with('actualizadoPor')->orderBy('clave');

        if ($request->filled('vigencia_anio')) {
            $query->where('vigencia_anio', $request->vigencia_anio);
        }

        $parametros = $query->paginate(20);

        return $this->success($parametros, 'Listado de parámetros del sistema');
    }

    public function show(int $id)
    {
        $parametro = ParametroSistema::with('actualizadoPor')->find($id);

        if (!$parametro) {
            return $this->error('Parámetro no encontrado', null, 404);
        }

        return $this->success($parametro, 'Detalle del parámetro');
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'clave' => 'required|string|max:100|unique:parametros_sistema,clave',
            'valor' => 'required|string|max:255',
            'descripcion' => 'nullable|string|max:255',
            'tipo_dato' => 'required|string|max:30',
            'vigencia_anio' => 'nullable|integer',
            'editable' => 'required|boolean',
        ]);

        if ($validator->fails()) {
            return $this->error('Datos inválidos', $validator->errors(), 422);
        }

        $parametro = ParametroSistema::create([
            'clave' => $request->clave,
            'valor' => $request->valor,
            'descripcion' => $request->descripcion,
            'tipo_dato' => $request->tipo_dato,
            'vigencia_anio' => $request->vigencia_anio,
            'editable' => $request->boolean('editable'),
            'actualizado_por' => $request->user()->id,
        ]);

        Auditoria::create([
            'usuario_id' => $request->user()->id,
            'modulo' => 'PARAMETROS',
            'accion' => 'CREAR',
            'entidad' => 'parametros_sistema',
            'entidad_id' => $parametro->id,
            'descripcion' => 'Creación de parámetro del sistema',
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
            'datos_antes' => null,
            'datos_despues' => json_encode($parametro->toArray(), JSON_UNESCAPED_UNICODE),
            'fecha_evento' => now(),
        ]);

        return $this->success($parametro, 'Parámetro creado correctamente', 201);
    }

    public function update(Request $request, int $id)
    {
        $parametro = ParametroSistema::find($id);

        if (!$parametro) {
            return $this->error('Parámetro no encontrado', null, 404);
        }

        $validator = Validator::make($request->all(), [
            'clave' => 'required|string|max:100|unique:parametros_sistema,clave,' . $id,
            'valor' => 'required|string|max:255',
            'descripcion' => 'nullable|string|max:255',
            'tipo_dato' => 'required|string|max:30',
            'vigencia_anio' => 'nullable|integer',
            'editable' => 'required|boolean',
        ]);

        if ($validator->fails()) {
            return $this->error('Datos inválidos', $validator->errors(), 422);
        }

        $antes = $parametro->toArray();

        $parametro->update([
            'clave' => $request->clave,
            'valor' => $request->valor,
            'descripcion' => $request->descripcion,
            'tipo_dato' => $request->tipo_dato,
            'vigencia_anio' => $request->vigencia_anio,
            'editable' => $request->boolean('editable'),
            'actualizado_por' => $request->user()->id,
        ]);

        Auditoria::create([
            'usuario_id' => $request->user()->id,
            'modulo' => 'PARAMETROS',
            'accion' => 'ACTUALIZAR',
            'entidad' => 'parametros_sistema',
            'entidad_id' => $parametro->id,
            'descripcion' => 'Actualización de parámetro del sistema',
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
            'datos_antes' => json_encode($antes, JSON_UNESCAPED_UNICODE),
            'datos_despues' => json_encode($parametro->fresh()->toArray(), JSON_UNESCAPED_UNICODE),
            'fecha_evento' => now(),
        ]);

        return $this->success($parametro->fresh(), 'Parámetro actualizado correctamente');
    }
}