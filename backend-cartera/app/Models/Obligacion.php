<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Obligacion extends Model
{
    protected $table = 'obligaciones';

    protected $fillable = [
        'asociado_id',
        'tipo_obligacion_id',
        'periodo_id',
        'smmlv_id',
        'numero_obligacion',
        'concepto',
        'valor_base',
        'valor_descuento',
        'valor_recargo',
        'saldo_pendiente',
        'estado',
        'fecha_generacion',
        'fecha_vencimiento',
        'observacion',
        'generada_automaticamente',
    ];

    protected $casts = [
        'valor_base' => 'decimal:2',
        'valor_descuento' => 'decimal:2',
        'valor_recargo' => 'decimal:2',
        'saldo_pendiente' => 'decimal:2',
        'fecha_generacion' => 'datetime',
        'fecha_vencimiento' => 'date',
        'generada_automaticamente' => 'boolean',
    ];

    public function asociado()
    {
        return $this->belongsTo(Asociado::class, 'asociado_id');
    }

    public function tipoObligacion()
    {
        return $this->belongsTo(TipoObligacion::class, 'tipo_obligacion_id');
    }

    public function periodo()
    {
        return $this->belongsTo(PeriodoCobro::class, 'periodo_id');
    }

    public function smmlv()
    {
        return $this->belongsTo(SmmlvHistorico::class, 'smmlv_id');
    }

    public function descuentosAplicados()
    {
        return $this->hasMany(ObligacionDescuento::class, 'obligacion_id');
    }

    public function recibosPago()
    {
        return $this->hasMany(ReciboPago::class, 'obligacion_id');
    }
}