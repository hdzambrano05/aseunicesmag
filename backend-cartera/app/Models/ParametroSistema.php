<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ParametroSistema extends Model
{
    protected $table = 'parametros_sistema';

    protected $fillable = [
        'clave',
        'valor',
        'descripcion',
        'tipo_dato',
        'vigencia_anio',
        'editable',
        'actualizado_por',
    ];

    protected $casts = [
        'editable' => 'boolean',
    ];

    public function actualizadoPor()
    {
        return $this->belongsTo(Usuario::class, 'actualizado_por');
    }
}