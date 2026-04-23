<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Notificacion extends Model
{
    protected $table = 'notificaciones';

    public $timestamps = false;

    protected $fillable = [
        'usuario_id',
        'tipo',
        'titulo',
        'mensaje',
        'estado',
        'fecha_envio',
        'fecha_lectura',
        'referencia_modulo',
        'referencia_id',
    ];

    protected $casts = [
        'fecha_envio' => 'datetime',
        'fecha_lectura' => 'datetime',
    ];

    public function usuario()
    {
        return $this->belongsTo(Usuario::class, 'usuario_id');
    }
}