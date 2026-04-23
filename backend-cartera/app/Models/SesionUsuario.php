<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SesionUsuario extends Model
{
    protected $table = 'sesiones_usuario';

    public $timestamps = false;

    protected $fillable = [
        'usuario_id',
        'token',
        'ip_address',
        'user_agent',
        'fecha_inicio',
        'fecha_expiracion',
        'fecha_cierre',
        'activa',
    ];

    protected $casts = [
        'fecha_inicio' => 'datetime',
        'fecha_expiracion' => 'datetime',
        'fecha_cierre' => 'datetime',
        'activa' => 'boolean',
    ];

    public function usuario()
    {
        return $this->belongsTo(Usuario::class, 'usuario_id');
    }
}