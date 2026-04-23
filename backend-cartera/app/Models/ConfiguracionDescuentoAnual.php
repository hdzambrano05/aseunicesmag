<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ConfiguracionDescuentoAnual extends Model
{
    protected $table = 'configuracion_descuentos_anuales';

    public $timestamps = false;

    protected $fillable = [
        'anio',
        'descuento_id',
        'activo',
        'fecha_inicio',
        'fecha_fin',
    ];

    protected $casts = [
        'activo' => 'boolean',
        'fecha_inicio' => 'date',
        'fecha_fin' => 'date',
    ];

    public function descuento()
    {
        return $this->belongsTo(Descuento::class, 'descuento_id');
    }
}