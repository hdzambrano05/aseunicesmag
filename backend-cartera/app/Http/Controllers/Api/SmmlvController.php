<?php

namespace App\Http\Controllers\Api;

use App\Models\Auditoria;
use App\Models\SmmlvHistorico;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class SmmlvController extends BaseApiController
{
    public function index()
    {
        $registros = SmmlvHistorico::with('registradoPor')
            ->orderByDesc('anio')
            ->get();

        return $this->success($registros, 'Histórico de SMMLV');
    }

    public function show(int $id)
    {
        $registro = SmmlvHistorico::with('registradoPor')->find($id);

        if (!$registro) {
            return $this->error('Registro de SMMLV no encontrado', null, 404);
        }

        return $this->success($registro, 'Detalle del SMMLV');
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'anio' => 'required|integer|min:2000|unique:smmlv_historico,anio',
            'valor' => 'required|numeric|min:1',
            'fecha_inicio_vigencia' => 'required|date',
            'fecha_fin_vigencia' => 'nullable|date|after_or_equal:fecha_inicio_vigencia',
            'activo' => 'nullable|boolean',
        ]);

        if ($validator->fails()) {
            return $this->error('Datos inválidos', $validator->errors(), 422);
        }

        DB::beginTransaction();

        try {
            if ($request->boolean('activo', true)) {
                SmmlvHistorico::query()->update(['activo' => 0]);
            }

            $registro = SmmlvHistorico::create([
                'anio' => $request->anio,
                'valor' => $request->valor,
                'fecha_inicio_vigencia' => $request->fecha_inicio_vigencia,
                'fecha_fin_vigencia' => $request->fecha_fin_vigencia,
                'activo' => $request->boolean('activo', true),
                'registrado_por' => $request->user()->id,
            ]);

            Auditoria::create([
                'usuario_id' => $request->user()->id,
                'modulo' => 'SMMLV',
                'accion' => 'CREAR',
                'entidad' => 'smmlv_historico',
                'entidad_id' => $registro->id,
                'descripcion' => 'Creación de registro SMMLV',
                'ip_address' => $request->ip(),
                'user_agent' => $request->userAgent(),
                'datos_antes' => null,
                'datos_despues' => json_encode($registro->toArray(), JSON_UNESCAPED_UNICODE),
                'fecha_evento' => now(),
            ]);

            DB::commit();

            return $this->success($registro, 'SMMLV registrado correctamente', 201);
        } catch (\Throwable $e) {
            DB::rollBack();
            return $this->error('Error al registrar SMMLV', $e->getMessage(), 500);
        }
    }

    public function update(Request $request, int $id)
    {
        $registro = SmmlvHistorico::find($id);

        if (!$registro) {
            return $this->error('Registro de SMMLV no encontrado', null, 404);
        }

        $validator = Validator::make($request->all(), [
            'anio' => 'required|integer|min:2000|unique:smmlv_historico,anio,' . $id,
            'valor' => 'required|numeric|min:1',
            'fecha_inicio_vigencia' => 'required|date',
            'fecha_fin_vigencia' => 'nullable|date|after_or_equal:fecha_inicio_vigencia',
            'activo' => 'required|boolean',
        ]);

        if ($validator->fails()) {
            return $this->error('Datos inválidos', $validator->errors(), 422);
        }

        DB::beginTransaction();

        try {
            $antes = $registro->toArray();

            if ($request->boolean('activo')) {
                SmmlvHistorico::where('id', '<>', $registro->id)->update(['activo' => 0]);
            }

            $registro->update([
                'anio' => $request->anio,
                'valor' => $request->valor,
                'fecha_inicio_vigencia' => $request->fecha_inicio_vigencia,
                'fecha_fin_vigencia' => $request->fecha_fin_vigencia,
                'activo' => $request->boolean('activo'),
            ]);

            Auditoria::create([
                'usuario_id' => $request->user()->id,
                'modulo' => 'SMMLV',
                'accion' => 'ACTUALIZAR',
                'entidad' => 'smmlv_historico',
                'entidad_id' => $registro->id,
                'descripcion' => 'Actualización de registro SMMLV',
                'ip_address' => $request->ip(),
                'user_agent' => $request->userAgent(),
                'datos_antes' => json_encode($antes, JSON_UNESCAPED_UNICODE),
                'datos_despues' => json_encode($registro->fresh()->toArray(), JSON_UNESCAPED_UNICODE),
                'fecha_evento' => now(),
            ]);

            DB::commit();

            return $this->success($registro->fresh(), 'SMMLV actualizado correctamente');
        } catch (\Throwable $e) {
            DB::rollBack();
            return $this->error('Error al actualizar SMMLV', $e->getMessage(), 500);
        }
    }
}