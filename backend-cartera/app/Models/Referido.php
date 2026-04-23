<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Referido extends Model
{
    protected $table = 'referidos';

    public $timestamps = false;

    protected $fillable = [
        'asociado_referente_id',
        'asociado_referido_id',
        'codigo_referido',
        'fecha_registro',
        'estado',
        'beneficio_otorgado',
        'valor_beneficio',
        'observacion',
    ];

    protected $casts = [
        'fecha_registro' => 'datetime',
        'beneficio_otorgado' => 'boolean',
        'valor_beneficio' => 'decimal:2',
    ];

    public function referente()
    {
        return $this->belongsTo(Asociado::class, 'asociado_referente_id');
    }

    public function referido()
    {
        return $this->belongsTo(Asociado::class, 'asociado_referido_id');
    }
}