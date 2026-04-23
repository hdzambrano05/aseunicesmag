<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ObligacionDescuento extends Model
{
    protected $table = 'obligacion_descuento';

    public $timestamps = false;

    protected $fillable = [
        'obligacion_id',
        'descuento_id',
        'valor_aplicado',
        'fecha_aplicacion',
        'aplicado_por_sistema',
        'observacion',
    ];

    protected $casts = [
        'valor_aplicado' => 'decimal:2',
        'fecha_aplicacion' => 'datetime',
        'aplicado_por_sistema' => 'boolean',
    ];

    public function obligacion()
    {
        return $this->belongsTo(Obligacion::class, 'obligacion_id');
    }

    public function descuento()
    {
        return $this->belongsTo(Descuento::class, 'descuento_id');
    }
}