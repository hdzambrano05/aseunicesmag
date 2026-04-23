<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Auditoria extends Model
{
    protected $table = 'auditoria';

    public $timestamps = false;

    protected $fillable = [
        'usuario_id',
        'modulo',
        'accion',
        'entidad',
        'entidad_id',
        'descripcion',
        'ip_address',
        'user_agent',
        'datos_antes',
        'datos_despues',
        'fecha_evento',
    ];

    protected $casts = [
        'fecha_evento' => 'datetime',
    ];

    public function usuario()
    {
        return $this->belongsTo(Usuario::class, 'usuario_id');
    }
}