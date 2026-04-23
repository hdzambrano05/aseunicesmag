<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ReciboPago extends Model
{
    protected $table = 'recibos_pago';

    public $timestamps = false;

    protected $fillable = [
        'asociado_id',
        'obligacion_id',
        'numero_recibo',
        'referencia_pago',
        'valor_reportado',
        'fecha_pago',
        'banco',
        'observacion_usuario',
        'nombre_archivo',
        'ruta_archivo',
        'extension',
        'mime_type',
        'peso_bytes',
        'hash_archivo',
        'estado',
        'observacion_admin',
        'cargado_por',
        'aprobado_por',
        'fecha_carga',
        'fecha_revision',
    ];

    protected $casts = [
        'valor_reportado' => 'decimal:2',
        'fecha_pago' => 'date',
        'peso_bytes' => 'integer',
        'fecha_carga' => 'datetime',
        'fecha_revision' => 'datetime',
    ];

    public function asociado()
    {
        return $this->belongsTo(Asociado::class, 'asociado_id');
    }

    public function obligacion()
    {
        return $this->belongsTo(Obligacion::class, 'obligacion_id');
    }

    public function cargadoPor()
    {
        return $this->belongsTo(Usuario::class, 'cargado_por');
    }

    public function aprobadoPor()
    {
        return $this->belongsTo(Usuario::class, 'aprobado_por');
    }
}