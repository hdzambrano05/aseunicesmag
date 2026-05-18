<?php

namespace App\Http\Controllers\Api;

use App\Models\Auditoria;
use App\Models\SmmlvHistorico;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class SmmlvController extends BaseApiController
{
    public function index(Request $request)
    {
        $query = SmmlvHistorico::with('registradoPor')
            ->orderByDesc('anio');

        if ($request->filled('activo')) {
            $query->where('activo', $request->boolean('activo'));
        }

        if ($request->filled('anio')) {
            $query->where('anio', $request->anio);
        }

        return $this->success(
            $query->get(),
            'Histórico de SMMLV'
        );
    }

    public function activo()
    {
        $registro = SmmlvHistorico::with('registradoPor')
            ->where('activo', 1)
            ->orderByDesc('anio')
            ->first();

        if (!$registro) {
            return $this->error('No existe SMMLV activo', null, 404);
        }

        return $this->success($registro, 'SMMLV activo');
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
                SmmlvHistorico::query()->update([
                    'activo' => 0,
                ]);
            }

            $registro = SmmlvHistorico::create([
                'anio' => $request->anio,
                'valor' => $request->valor,
                'fecha_inicio_vigencia' => $request->fecha_inicio_vigencia,
                'fecha_fin_vigencia' => $request->fecha_fin_vigencia,
                'activo' => $request->boolean('activo', true),
                'registrado_por' => optional($request->user())->id,
                'created_at' => now(),
            ]);

            Auditoria::create([
                'usuario_id' => optional($request->user())->id,
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

            return $this->error('Error al registrar SMMLV', [
                'detalle' => $e->getMessage(),
                'linea' => $e->getLine(),
                'archivo' => $e->getFile(),
            ], 500);
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
                SmmlvHistorico::where('id', '<>', $registro->id)
                    ->update([
                        'activo' => 0,
                    ]);
            }

            $registro->update([
                'anio' => $request->anio,
                'valor' => $request->valor,
                'fecha_inicio_vigencia' => $request->fecha_inicio_vigencia,
                'fecha_fin_vigencia' => $request->fecha_fin_vigencia,
                'activo' => $request->boolean('activo'),
            ]);

            Auditoria::create([
                'usuario_id' => optional($request->user())->id,
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

            return $this->error('Error al actualizar SMMLV', [
                'detalle' => $e->getMessage(),
                'linea' => $e->getLine(),
                'archivo' => $e->getFile(),
            ], 500);
        }
    }

    public function cambiarEstado(Request $request, int $id)
    {
        $registro = SmmlvHistorico::find($id);

        if (!$registro) {
            return $this->error('Registro de SMMLV no encontrado', null, 404);
        }

        $validator = Validator::make($request->all(), [
            'activo' => 'required|boolean',
        ]);

        if ($validator->fails()) {
            return $this->error('Datos inválidos', $validator->errors(), 422);
        }

        DB::beginTransaction();

        try {
            $antes = $registro->toArray();

            if ($request->boolean('activo')) {
                SmmlvHistorico::where('id', '<>', $registro->id)
                    ->update([
                        'activo' => 0,
                    ]);
            }

            $registro->update([
                'activo' => $request->boolean('activo'),
            ]);

            Auditoria::create([
                'usuario_id' => optional($request->user())->id,
                'modulo' => 'SMMLV',
                'accion' => 'CAMBIAR_ESTADO',
                'entidad' => 'smmlv_historico',
                'entidad_id' => $registro->id,
                'descripcion' => 'Cambio de estado de SMMLV',
                'ip_address' => $request->ip(),
                'user_agent' => $request->userAgent(),
                'datos_antes' => json_encode($antes, JSON_UNESCAPED_UNICODE),
                'datos_despues' => json_encode($registro->fresh()->toArray(), JSON_UNESCAPED_UNICODE),
                'fecha_evento' => now(),
            ]);

            DB::commit();

            return $this->success($registro->fresh(), 'Estado del SMMLV actualizado correctamente');
        } catch (\Throwable $e) {
            DB::rollBack();

            return $this->error('Error al cambiar estado del SMMLV', [
                'detalle' => $e->getMessage(),
                'linea' => $e->getLine(),
                'archivo' => $e->getFile(),
            ], 500);
        }
    }
}