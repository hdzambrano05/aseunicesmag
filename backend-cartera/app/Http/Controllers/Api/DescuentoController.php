<?php

namespace App\Http\Controllers\Api;

use App\Models\Auditoria;
use App\Models\Descuento;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class DescuentoController extends BaseApiController
{
    public function index(Request $request)
    {
        $query = Descuento::query()
            ->orderByDesc('activo')
            ->orderBy('nombre');

        if ($request->filled('activo')) {
            $query->where('activo', $request->boolean('activo'));
        }

        if ($request->filled('codigo')) {
            $query->where('codigo', $request->codigo);
        }

        if ($request->filled('tipo_descuento')) {
            $query->where('tipo_descuento', $request->tipo_descuento);
        }

        $descuentos = $query->get();

        return $this->success($descuentos, 'Listado de descuentos');
    }

    public function show(int $id)
    {
        $descuento = Descuento::find($id);

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
            'tipo_descuento' => 'required|string|in:PORCENTAJE,VALOR,CUOTAS',
            'valor' => 'required|numeric|min:0',
            'aplica_a_tipo_periodo' => 'nullable|string|in:MENSUAL,SEMESTRAL,ANUAL,AFILIACION,SOSTENIMIENTO',
            'dias_limite' => 'nullable|integer|min:0',
            'maximo_por_anio' => 'nullable|integer|min:0',
            'activo' => 'nullable|boolean',
        ]);

        if ($validator->fails()) {
            return $this->error('Datos inválidos', $validator->errors(), 422);
        }

        DB::beginTransaction();

        try {
            $descuento = Descuento::create([
                'codigo' => strtoupper($request->codigo),
                'nombre' => $request->nombre,
                'descripcion' => $request->descripcion,
                'tipo_descuento' => strtoupper($request->tipo_descuento),
                'valor' => $request->valor,
                'aplica_a_tipo_periodo' => $request->aplica_a_tipo_periodo
                    ? strtoupper($request->aplica_a_tipo_periodo)
                    : null,
                'dias_limite' => $request->dias_limite,
                'maximo_por_anio' => $request->maximo_por_anio,
                'activo' => $request->boolean('activo', true),
                'created_at' => now(),
            ]);

            Auditoria::create([
                'usuario_id' => optional($request->user())->id,
                'modulo' => 'DESCUENTOS',
                'accion' => 'CREAR',
                'entidad' => 'descuentos',
                'entidad_id' => $descuento->id,
                'descripcion' => 'Creación de descuento',
                'ip_address' => $request->ip(),
                'user_agent' => $request->userAgent(),
                'datos_antes' => null,
                'datos_despues' => json_encode($descuento->toArray(), JSON_UNESCAPED_UNICODE),
                'fecha_evento' => now(),
            ]);

            DB::commit();

            return $this->success($descuento, 'Descuento creado correctamente', 201);
        } catch (\Throwable $e) {
            DB::rollBack();

            return $this->error('Error al crear descuento', [
                'detalle' => $e->getMessage(),
                'linea' => $e->getLine(),
                'archivo' => $e->getFile(),
            ], 500);
        }
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
            'tipo_descuento' => 'required|string|in:PORCENTAJE,VALOR,CUOTAS',
            'valor' => 'required|numeric|min:0',
            'aplica_a_tipo_periodo' => 'nullable|string|in:MENSUAL,SEMESTRAL,ANUAL,AFILIACION,SOSTENIMIENTO',
            'dias_limite' => 'nullable|integer|min:0',
            'maximo_por_anio' => 'nullable|integer|min:0',
            'activo' => 'required|boolean',
        ]);

        if ($validator->fails()) {
            return $this->error('Datos inválidos', $validator->errors(), 422);
        }

        DB::beginTransaction();

        try {
            $antes = $descuento->toArray();

            $descuento->update([
                'codigo' => strtoupper($request->codigo),
                'nombre' => $request->nombre,
                'descripcion' => $request->descripcion,
                'tipo_descuento' => strtoupper($request->tipo_descuento),
                'valor' => $request->valor,
                'aplica_a_tipo_periodo' => $request->aplica_a_tipo_periodo
                    ? strtoupper($request->aplica_a_tipo_periodo)
                    : null,
                'dias_limite' => $request->dias_limite,
                'maximo_por_anio' => $request->maximo_por_anio,
                'activo' => $request->boolean('activo'),
            ]);

            Auditoria::create([
                'usuario_id' => optional($request->user())->id,
                'modulo' => 'DESCUENTOS',
                'accion' => 'ACTUALIZAR',
                'entidad' => 'descuentos',
                'entidad_id' => $descuento->id,
                'descripcion' => 'Actualización de descuento',
                'ip_address' => $request->ip(),
                'user_agent' => $request->userAgent(),
                'datos_antes' => json_encode($antes, JSON_UNESCAPED_UNICODE),
                'datos_despues' => json_encode($descuento->fresh()->toArray(), JSON_UNESCAPED_UNICODE),
                'fecha_evento' => now(),
            ]);

            DB::commit();

            return $this->success($descuento->fresh(), 'Descuento actualizado correctamente');
        } catch (\Throwable $e) {
            DB::rollBack();

            return $this->error('Error al actualizar descuento', [
                'detalle' => $e->getMessage(),
                'linea' => $e->getLine(),
                'archivo' => $e->getFile(),
            ], 500);
        }
    }

    public function seedReglamento(Request $request)
    {
        DB::beginTransaction();

        try {
            $descuentos = [
                [
                    'codigo' => 'PRACTICA_EMPRESARIAL',
                    'nombre' => 'Descuento por práctica empresarial',
                    'descripcion' => 'Descuento del 50% sobre la cuota de afiliación para estudiantes que realizan práctica empresarial en ASEUNICESMAG.',
                    'tipo_descuento' => 'PORCENTAJE',
                    'valor' => 50,
                    'aplica_a_tipo_periodo' => 'AFILIACION',
                    'dias_limite' => null,
                    'maximo_por_anio' => null,
                    'activo' => 1,
                ],
                [
                    'codigo' => 'PRONTO_PAGO_SEMESTRAL',
                    'nombre' => 'Descuento por pronto pago semestral',
                    'descripcion' => 'Descuento del 5% por pago anticipado del semestre dentro de los primeros 8 días del periodo.',
                    'tipo_descuento' => 'PORCENTAJE',
                    'valor' => 5,
                    'aplica_a_tipo_periodo' => 'SEMESTRAL',
                    'dias_limite' => 8,
                    'maximo_por_anio' => null,
                    'activo' => 1,
                ],
                [
                    'codigo' => 'PRONTO_PAGO_ANUAL',
                    'nombre' => 'Descuento por pronto pago anual',
                    'descripcion' => 'Descuento del 10% por pago anticipado anual dentro de los primeros 8 días de enero.',
                    'tipo_descuento' => 'PORCENTAJE',
                    'valor' => 10,
                    'aplica_a_tipo_periodo' => 'ANUAL',
                    'dias_limite' => 8,
                    'maximo_por_anio' => null,
                    'activo' => 1,
                ],
                [
                    'codigo' => 'REFERIDO',
                    'nombre' => 'Descuento por referido',
                    'descripcion' => 'Descuento equivalente a dos cuotas mensuales de sostenimiento por cada referido válido.',
                    'tipo_descuento' => 'CUOTAS',
                    'valor' => 2,
                    'aplica_a_tipo_periodo' => 'SOSTENIMIENTO',
                    'dias_limite' => null,
                    'maximo_por_anio' => 5,
                    'activo' => 1,
                ],
            ];

            foreach ($descuentos as $item) {
                Descuento::updateOrCreate(
                    ['codigo' => $item['codigo']],
                    $item
                );
            }

            Auditoria::create([
                'usuario_id' => optional($request->user())->id,
                'modulo' => 'DESCUENTOS',
                'accion' => 'SEED_REGLAMENTO',
                'entidad' => 'descuentos',
                'entidad_id' => null,
                'descripcion' => 'Registro o actualización de descuentos del reglamento tarifario',
                'ip_address' => $request->ip(),
                'user_agent' => $request->userAgent(),
                'datos_antes' => null,
                'datos_despues' => json_encode($descuentos, JSON_UNESCAPED_UNICODE),
                'fecha_evento' => now(),
            ]);

            DB::commit();

            return $this->success(
                Descuento::orderBy('nombre')->get(),
                'Descuentos del reglamento registrados correctamente'
            );
        } catch (\Throwable $e) {
            DB::rollBack();

            return $this->error('Error al registrar descuentos del reglamento', [
                'detalle' => $e->getMessage(),
                'linea' => $e->getLine(),
                'archivo' => $e->getFile(),
            ], 500);
        }
    }

    public function cambiarEstado(Request $request, int $id)
    {
        $descuento = Descuento::find($id);

        if (!$descuento) {
            return $this->error('Descuento no encontrado', null, 404);
        }

        $validator = Validator::make($request->all(), [
            'activo' => 'required|boolean',
        ]);

        if ($validator->fails()) {
            return $this->error('Datos inválidos', $validator->errors(), 422);
        }

        $antes = $descuento->toArray();

        $descuento->update([
            'activo' => $request->boolean('activo'),
        ]);

        Auditoria::create([
            'usuario_id' => optional($request->user())->id,
            'modulo' => 'DESCUENTOS',
            'accion' => 'CAMBIAR_ESTADO',
            'entidad' => 'descuentos',
            'entidad_id' => $descuento->id,
            'descripcion' => 'Cambio de estado de descuento',
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
            'datos_antes' => json_encode($antes, JSON_UNESCAPED_UNICODE),
            'datos_despues' => json_encode($descuento->fresh()->toArray(), JSON_UNESCAPED_UNICODE),
            'fecha_evento' => now(),
        ]);

        return $this->success($descuento->fresh(), 'Estado del descuento actualizado correctamente');
    }
}