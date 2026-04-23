<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SolicitudAfiliacion extends Model
{
    protected $table = 'solicitudes_afiliacion';

    public $timestamps = false;

    protected $fillable = [
        'usuario_id',
        'asociado_id',
        'fecha_solicitud',
        'estado',
        'origen',
        'observacion_admin',
        'aprobado_por',
        'fecha_revision',
    ];

    protected $casts = [
        'fecha_solicitud' => 'datetime',
        'fecha_revision' => 'datetime',
    ];

    public function usuario()
    {
        return $this->belongsTo(Usuario::class, 'usuario_id');
    }

    public function asociado()
    {
        return $this->belongsTo(Asociado::class, 'asociado_id');
    }

    public function aprobador()
    {
        return $this->belongsTo(Usuario::class, 'aprobado_por');
    }
}