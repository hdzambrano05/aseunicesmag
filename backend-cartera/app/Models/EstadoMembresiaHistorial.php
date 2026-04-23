<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EstadoMembresiaHistorial extends Model
{
    protected $table = 'estados_membresia_historial';

    public $timestamps = false;

    protected $fillable = [
        'asociado_id',
        'estado_anterior',
        'estado_nuevo',
        'motivo',
        'nota',
        'cambiado_por_usuario_id',
        'cambio_automatico',
        'fecha_cambio',
    ];

    protected $casts = [
        'cambio_automatico' => 'boolean',
        'fecha_cambio' => 'datetime',
    ];

    public function asociado()
    {
        return $this->belongsTo(Asociado::class, 'asociado_id');
    }

    public function usuario()
    {
        return $this->belongsTo(Usuario::class, 'cambiado_por_usuario_id');
    }
}