<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Certificado extends Model
{
    protected $table = 'certificados';

    public $timestamps = false;

    protected $fillable = [
        'asociado_id',
        'tipo_certificado',
        'numero_certificado',
        'ruta_pdf',
        'hash_documento',
        'fecha_generacion',
        'fecha_descarga',
        'generado_por',
        'estado',
    ];

    protected $casts = [
        'fecha_generacion' => 'datetime',
        'fecha_descarga' => 'datetime',
    ];

    public function asociado()
    {
        return $this->belongsTo(Asociado::class, 'asociado_id');
    }

    public function generadoPor()
    {
        return $this->belongsTo(Usuario::class, 'generado_por');
    }
}