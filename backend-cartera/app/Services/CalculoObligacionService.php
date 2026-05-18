<?php

namespace App\Services;

use App\Models\SmmlvHistorico;
use Carbon\Carbon;
use Exception;

class CalculoObligacionService
{
    private const PORCENTAJE_AFILIACION = 0.05;
    private const PORCENTAJE_SOSTENIMIENTO = 0.01;
    private const DESCUENTO_PRACTICA = 0.50;
    private const DESCUENTO_SEMESTRAL = 0.05;
    private const DESCUENTO_ANUAL = 0.10;
    private const MAX_REFERIDOS_ANUALES = 5;
    private const CUOTAS_DESCUENTO_REFERIDO = 2;

    public function obtenerSmmlv(int $anio)
    {
        $smmlv = SmmlvHistorico::where('anio', $anio)
            ->where('activo', 1)
            ->first();

        if (!$smmlv) {
            throw new Exception("No existe SMMLV activo para el año {$anio}");
        }

        return $smmlv;
    }

    public function obtenerSmmlvActivo()
    {
        $smmlv = SmmlvHistorico::where('activo', 1)
            ->orderByDesc('anio')
            ->first();

        if (!$smmlv) {
            throw new Exception('No existe SMMLV activo registrado');
        }

        return $smmlv;
    }

    public function calcularAfiliacion(
        int $anio,
        bool $aplicaPractica = false
    ): array {
        $smmlv = $this->obtenerSmmlv($anio);

        $valorBase = round($smmlv->valor * self::PORCENTAJE_AFILIACION, 2);
        $valorDescuento = 0;

        if ($aplicaPractica) {
            $valorDescuento = round($valorBase * self::DESCUENTO_PRACTICA, 2);
        }

        $saldoPendiente = max($valorBase - $valorDescuento, 0);

        return [
            'smmlv_id' => $smmlv->id,
            'anio' => $smmlv->anio,
            'smmlv' => $smmlv->valor,
            'porcentaje_afiliacion' => self::PORCENTAJE_AFILIACION * 100,
            'valor_base' => $valorBase,
            'valor_descuento' => $valorDescuento,
            'valor_recargo' => 0,
            'saldo_pendiente' => $saldoPendiente,
            'aplica_practica' => $aplicaPractica,
        ];
    }

    public function calcularSostenimiento(
        int $anio,
        string $modalidad,
        ?Carbon $fechaPago = null,
        int $referidosValidos = 0
    ): array {
        $smmlv = $this->obtenerSmmlv($anio);

        $modalidad = strtoupper($modalidad);
        $fechaPago = $fechaPago ?? now();

        $cuotaMensual = round($smmlv->valor * self::PORCENTAJE_SOSTENIMIENTO, 2);

        $meses = match ($modalidad) {
            'MENSUAL' => 1,
            'SEMESTRAL' => 6,
            'ANUAL' => 12,
            default => throw new Exception('Modalidad no válida. Use MENSUAL, SEMESTRAL o ANUAL'),
        };

        $valorBase = round($cuotaMensual * $meses, 2);
        $valorDescuentoProntoPago = 0;
        $valorDescuentoReferidos = 0;

        if (
            $modalidad === 'SEMESTRAL' &&
            $fechaPago->day <= 8 &&
            in_array($fechaPago->month, [1, 7])
        ) {
            $valorDescuentoProntoPago = round($valorBase * self::DESCUENTO_SEMESTRAL, 2);
        }

        if (
            $modalidad === 'ANUAL' &&
            $fechaPago->month === 1 &&
            $fechaPago->day <= 8
        ) {
            $valorDescuentoProntoPago = round($valorBase * self::DESCUENTO_ANUAL, 2);
        }

        $referidosAplicables = min(
            max($referidosValidos, 0),
            self::MAX_REFERIDOS_ANUALES
        );

        $valorDescuentoReferidos = round(
            ($cuotaMensual * self::CUOTAS_DESCUENTO_REFERIDO) * $referidosAplicables,
            2
        );

        $valorDescuentoTotal = min(
            $valorDescuentoProntoPago + $valorDescuentoReferidos,
            $valorBase
        );

        $saldoPendiente = max($valorBase - $valorDescuentoTotal, 0);

        return [
            'smmlv_id' => $smmlv->id,
            'anio' => $smmlv->anio,
            'smmlv' => $smmlv->valor,
            'modalidad' => $modalidad,
            'cuota_mensual' => $cuotaMensual,
            'meses' => $meses,
            'valor_base' => $valorBase,
            'valor_descuento_pronto_pago' => $valorDescuentoProntoPago,
            'valor_descuento_referidos' => $valorDescuentoReferidos,
            'valor_descuento' => $valorDescuentoTotal,
            'valor_recargo' => 0,
            'saldo_pendiente' => $saldoPendiente,
            'referidos_validos' => $referidosAplicables,
            'fecha_pago' => $fechaPago->toDateString(),
        ];
    }
}