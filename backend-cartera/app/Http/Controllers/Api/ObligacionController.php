<?php

namespace App\Http\Controllers\Api;

use App\Models\Asociado;
use App\Models\Obligacion;
use Illuminate\Http\Request;

class ObligacionController extends BaseApiController
{
    public function index(Request $request)
    {
        $query = Obligacion::with([
            'asociado.usuario',
            'tipoObligacion',
            'periodo',
            'smmlv',
            'descuentosAplicados.descuento',
        ]);

        if ($request->filled('estado')) {
            $query->where('estado', $request->estado);
        }

        if ($request->filled('asociado_id')) {
            $query->where('asociado_id', $request->asociado_id);
        }

        if ($request->filled('tipo_obligacion_id')) {
            $query->where('tipo_obligacion_id', $request->tipo_obligacion_id);
        }

        $obligaciones = $query->orderByDesc('id')->paginate(10);

        return $this->success($obligaciones, 'Listado de obligaciones');
    }

    public function show(int $id)
    {
        $obligacion = Obligacion::with([
            'asociado.usuario',
            'tipoObligacion',
            'periodo',
            'smmlv',
            'descuentosAplicados.descuento',
            'recibosPago',
        ])->find($id);

        if (!$obligacion) {
            return $this->error('Obligación no encontrada', null, 404);
        }

        return $this->success($obligacion, 'Detalle de la obligación');
    }

    public function misObligaciones(Request $request)
    {
        $asociado = Asociado::where('usuario_id', $request->user()->id)->first();

        if (!$asociado) {
            return $this->error('Asociado no encontrado para el usuario autenticado', null, 404);
        }

        $obligaciones = Obligacion::with([
            'tipoObligacion',
            'periodo',
            'smmlv',
            'descuentosAplicados.descuento',
        ])
        ->where('asociado_id', $asociado->id)
        ->orderByDesc('fecha_generacion')
        ->get();

        $resumen = [
            'total_obligaciones' => $obligaciones->count(),
            'total_pendiente' => $obligaciones->sum('saldo_pendiente'),
            'total_pagadas' => $obligaciones->where('estado', 'PAGADA')->count(),
            'total_pendientes' => $obligaciones->where('estado', 'PENDIENTE')->count(),
        ];

        return $this->success([
            'resumen' => $resumen,
            'obligaciones' => $obligaciones,
        ], 'Estado de cuenta del asociado');
    }

    public function porAsociado(int $asociadoId)
    {
        $asociado = Asociado::find($asociadoId);

        if (!$asociado) {
            return $this->error('Asociado no encontrado', null, 404);
        }

        $obligaciones = Obligacion::with([
            'tipoObligacion',
            'periodo',
            'smmlv',
            'descuentosAplicados.descuento',
        ])
        ->where('asociado_id', $asociadoId)
        ->orderByDesc('fecha_generacion')
        ->get();

        return $this->success($obligaciones, 'Obligaciones del asociado');
    }
}