<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TipoObligacion extends Model
{
    protected $table = 'tipos_obligacion';

    const UPDATED_AT = null;

    protected $fillable = [
        'codigo',
        'nombre',
        'descripcion',
        'es_recurrente',
        'permite_descuento',
        'afecta_estado_membresia',
    ];

    protected $casts = [
        'es_recurrente' => 'boolean',
        'permite_descuento' => 'boolean',
        'afecta_estado_membresia' => 'boolean',
    ];

    public function obligaciones()
    {
        return $this->hasMany(Obligacion::class, 'tipo_obligacion_id');
    }
}