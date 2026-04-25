<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ArchivoAdjunto extends Model
{
    protected $table = 'archivos_adjuntos';

    public $timestamps = false;

    protected $fillable = [
        'modulo',
        'referencia_id',
        'tipo_archivo',
        'nombre_original',
        'ruta_archivo',
        'extension',
        'mime_type',
        'peso_bytes',
        'subido_por',
        'fecha_subida',
    ];

    protected $casts = [
        'peso_bytes' => 'integer',
        'fecha_subida' => 'datetime',
    ];

    public function usuario()
    {
        return $this->belongsTo(Usuario::class, 'subido_por');
    }
}
