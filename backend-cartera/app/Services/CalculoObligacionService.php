<?php

namespace App\Services;

use App\Models\SmmlvHistorico;
use Carbon\Carbon;
use Exception;

class CalculoObligacionService
{
    public function obtenerSmmlv(int $anio)
    {
        return SmmlvHistorico::where('anio', $anio)
            ->where('activo', 1)
            ->firstOrFail();
    }

    public function calcularAfiliacion(int $anio, bool $aplicaPractica = false): array
    {
        $smmlv = $this->obtenerSmmlv($anio);

        $valorBase = round($smmlv->valor * 0.05, 2);
        $valorDescuento = 0;

        if ($aplicaPractica) {
            $valorDescuento = round($valorBase * 0.50, 2);
        }

        return [
            'smmlv_id' => $smmlv->id,
            'valor_base' => $valorBase,
            'valor_descuento' => $valorDescuento,
            'valor_recargo' => 0,
            'saldo_pendiente' => max($valorBase - $valorDescuento, 0),
        ];
    }

    public function calcularSostenimiento(int $anio, string $modalidad, ?Carbon $fechaPago = null, int $referidosValidos = 0): array
    {
        $smmlv = $this->obtenerSmmlv($anio);

        $cuotaMensual = round($smmlv->valor * 0.01, 2);

        $meses = match ($modalidad) {
            'MENSUAL' => 1,
            'SEMESTRAL' => 6,
            'ANUAL' => 12,
            default => throw new Exception('Modalidad no válida'),
        };

        $valorBase = round($cuotaMensual * $meses, 2);
        $valorDescuento = 0;

        $fechaPago = $fechaPago ?? now();

        if ($modalidad === 'SEMESTRAL' && $fechaPago->day <= 8) {
            $valorDescuento += round($valorBase * 0.05, 2);
        }

        if ($modalidad === 'ANUAL' && $fechaPago->month === 1 && $fechaPago->day <= 8) {
            $valorDescuento += round($valorBase * 0.10, 2);
        }

        $referidosAplicables = min($referidosValidos, 5);
        $valorDescuento += round(($cuotaMensual * 2) * $referidosAplicables, 2);

        $valorDescuento = min($valorDescuento, $valorBase);

        return [
            'smmlv_id' => $smmlv->id,
            'cuota_mensual' => $cuotaMensual,
            'meses' => $meses,
            'valor_base' => $valorBase,
            'valor_descuento' => $valorDescuento,
            'valor_recargo' => 0,
            'saldo_pendiente' => max($valorBase - $valorDescuento, 0),
        ];
    }
}
