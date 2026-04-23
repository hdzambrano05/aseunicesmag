<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Descuento extends Model
{
    protected $table = 'descuentos';

    const UPDATED_AT = null;

    protected $fillable = [
        'codigo',
        'nombre',
        'descripcion',
        'tipo_descuento',
        'valor',
        'aplica_a_tipo_periodo',
        'dias_limite',
        'maximo_por_anio',
        'activo',
    ];

    protected $casts = [
        'valor' => 'decimal:2',
        'activo' => 'boolean',
    ];

    public function obligacionesAplicadas()
    {
        return $this->hasMany(ObligacionDescuento::class, 'descuento_id');
    }

    public function configuracionesAnuales()
    {
        return $this->hasMany(ConfiguracionDescuentoAnual::class, 'descuento_id');
    }
}