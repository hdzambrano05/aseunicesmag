<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PeriodoCobro extends Model
{
    protected $table = 'periodos_cobro';

    public $timestamps = false;

    protected $fillable = [
        'nombre',
        'tipo_periodo',
        'fecha_inicio',
        'fecha_fin',
        'fecha_limite_descuento',
        'anio',
        'activo',
    ];

    protected $casts = [
        'fecha_inicio' => 'date',
        'fecha_fin' => 'date',
        'fecha_limite_descuento' => 'date',
        'activo' => 'boolean',
    ];

    public function obligaciones()
    {
        return $this->hasMany(Obligacion::class, 'periodo_id');
    }
}