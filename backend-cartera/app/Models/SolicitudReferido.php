<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SolicitudReferido extends Model
{
    protected $table = 'solicitud_referidos';

    protected $fillable = [
        'solicitud_afiliacion_id',
        'nombre_referente',
        'documento_referente',
        'relacion_referente',
        'motivacion_afiliacion',
    ];

    public function solicitud()
    {
        return $this->belongsTo(SolicitudAfiliacion::class, 'solicitud_afiliacion_id');
    }
}