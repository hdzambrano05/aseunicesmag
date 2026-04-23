<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Asociado extends Model
{
    protected $table = 'asociados';

    protected $fillable = [
        'usuario_id',
        'ciudad_id',
        'codigo_asociado',
        'fecha_nacimiento',
        'genero',
        'direccion',
        'profesion',
        'empresa',
        'cargo',
        'fecha_grado',
        'programa_academico',
        'universidad',
        'categoria_asociado',
        'estado_membresia',
        'fecha_afiliacion',
        'observaciones',
        'referido_por_asociado_id',
    ];

    protected $casts = [
        'fecha_nacimiento' => 'date',
        'fecha_grado' => 'date',
        'fecha_afiliacion' => 'date',
    ];

    public function usuario()
    {
        return $this->belongsTo(Usuario::class, 'usuario_id');
    }

    public function ciudad()
    {
        return $this->belongsTo(Ciudad::class, 'ciudad_id');
    }

    public function referidoPor()
    {
        return $this->belongsTo(Asociado::class, 'referido_por_asociado_id');
    }

    public function referidosDirectos()
    {
        return $this->hasMany(Asociado::class, 'referido_por_asociado_id');
    }

    public function solicitudesAfiliacion()
    {
        return $this->hasMany(SolicitudAfiliacion::class, 'asociado_id');
    }

    public function historialEstados()
    {
        return $this->hasMany(EstadoMembresiaHistorial::class, 'asociado_id');
    }

    public function obligaciones()
    {
        return $this->hasMany(Obligacion::class, 'asociado_id');
    }

    public function referidosComoReferente()
    {
        return $this->hasMany(Referido::class, 'asociado_referente_id');
    }

    public function referidosComoReferido()
    {
        return $this->hasMany(Referido::class, 'asociado_referido_id');
    }

    public function recibosPago()
    {
        return $this->hasMany(ReciboPago::class, 'asociado_id');
    }

    public function certificados()
    {
        return $this->hasMany(Certificado::class, 'asociado_id');
    }
}