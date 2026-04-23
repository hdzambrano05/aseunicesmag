<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SmmlvHistorico extends Model
{
    protected $table = 'smmlv_historico';

    const UPDATED_AT = null;

    protected $fillable = [
        'anio',
        'valor',
        'fecha_inicio_vigencia',
        'fecha_fin_vigencia',
        'activo',
        'registrado_por',
    ];

    protected $casts = [
        'valor' => 'decimal:2',
        'fecha_inicio_vigencia' => 'date',
        'fecha_fin_vigencia' => 'date',
        'activo' => 'boolean',
    ];

    public function registradoPor()
    {
        return $this->belongsTo(Usuario::class, 'registrado_por');
    }

    public function obligaciones()
    {
        return $this->hasMany(Obligacion::class, 'smmlv_id');
    }
}