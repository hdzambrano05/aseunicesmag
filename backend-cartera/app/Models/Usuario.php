<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Laravel\Sanctum\HasApiTokens;

class Usuario extends Authenticatable
{
    use HasApiTokens, SoftDeletes;

    protected $table = 'usuarios';

    protected $fillable = [
        'rol_id',
        'tipo_documento',
        'numero_documento',
        'nombres',
        'apellidos',
        'correo',
        'telefono',
        'password_hash',
        'foto_perfil',
        'ultimo_login',
        'email_verificado',
        'estado_cuenta',
        'acepta_habeas_data',
        'acepta_terminos',
        'token_recuperacion',
        'token_verificacion',
    ];

    protected $hidden = [
        'password_hash',
        'token_recuperacion',
        'token_verificacion',
        'remember_token',
    ];

    protected $casts = [
        'ultimo_login' => 'datetime',
        'email_verificado' => 'boolean',
        'acepta_habeas_data' => 'boolean',
        'acepta_terminos' => 'boolean',
        'deleted_at' => 'datetime',
    ];

    public function getAuthPassword()
    {
        return $this->password_hash;
    }

    public function rol()
    {
        return $this->belongsTo(Rol::class, 'rol_id');
    }

    public function asociado()
    {
        return $this->hasOne(Asociado::class, 'usuario_id');
    }

    public function sesiones()
    {
        return $this->hasMany(SesionUsuario::class, 'usuario_id');
    }

    public function solicitudesAfiliacion()
    {
        return $this->hasMany(SolicitudAfiliacion::class, 'usuario_id');
    }

    public function solicitudesAprobadas()
    {
        return $this->hasMany(SolicitudAfiliacion::class, 'aprobado_por');
    }

    public function cambiosEstadoMembresia()
    {
        return $this->hasMany(EstadoMembresiaHistorial::class, 'cambiado_por_usuario_id');
    }

    public function parametrosActualizados()
    {
        return $this->hasMany(ParametroSistema::class, 'actualizado_por');
    }

    public function smmlvRegistrados()
    {
        return $this->hasMany(SmmlvHistorico::class, 'registrado_por');
    }

    public function recibosCargados()
    {
        return $this->hasMany(ReciboPago::class, 'cargado_por');
    }

    public function recibosAprobados()
    {
        return $this->hasMany(ReciboPago::class, 'aprobado_por');
    }

    public function certificadosGenerados()
    {
        return $this->hasMany(Certificado::class, 'generado_por');
    }

    public function notificaciones()
    {
        return $this->hasMany(Notificacion::class, 'usuario_id');
    }

    public function auditorias()
    {
        return $this->hasMany(Auditoria::class, 'usuario_id');
    }

    public function archivosAdjuntos()
    {
        return $this->hasMany(ArchivoAdjunto::class, 'subido_por');
    }
}
