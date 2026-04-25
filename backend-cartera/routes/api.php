<?php

use App\Http\Controllers\Api\ArchivoAdjuntoController;
use App\Http\Controllers\Api\AsociadoController;
use App\Http\Controllers\Api\AuditoriaController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CertificadoController;
use App\Http\Controllers\Api\CiudadController;
use App\Http\Controllers\Api\ConfiguracionDescuentoAnualController;
use App\Http\Controllers\Api\DescuentoController;
use App\Http\Controllers\Api\EstadoMembresiaController;
use App\Http\Controllers\Api\NotificacionController;
use App\Http\Controllers\Api\ObligacionController;
use App\Http\Controllers\Api\ObligacionDescuentoController;
use App\Http\Controllers\Api\ParametroSistemaController;
use App\Http\Controllers\Api\PeriodoCobroController;
use App\Http\Controllers\Api\ReciboPagoController;
use App\Http\Controllers\Api\ReferidoController;
use App\Http\Controllers\Api\RolController;
use App\Http\Controllers\Api\SesionUsuarioController;
use App\Http\Controllers\Api\SmmlvController;
use App\Http\Controllers\Api\SolicitudAfiliacionController;
use App\Http\Controllers\Api\TipoObligacionController;
use App\Http\Controllers\Api\UsuarioController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/ping', function () {
    return response()->json([
        'ok' => true,
        'message' => 'API funcionando correctamente'
    ]);
});

Route::post('/login', [AuthController::class, 'login']);
Route::post('/afiliacion', [SolicitudAfiliacionController::class, 'store']);

Route::middleware('auth:sanctum')->group(function () {

    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);

    Route::get('/roles', [RolController::class, 'index']);
    Route::get('/roles/{id}', [RolController::class, 'show']);
    Route::post('/roles', [RolController::class, 'store']);
    Route::put('/roles/{id}', [RolController::class, 'update']);

    Route::get('/usuarios', [UsuarioController::class, 'index']);
    Route::get('/usuarios/{id}', [UsuarioController::class, 'show']);
    Route::post('/usuarios', [UsuarioController::class, 'store']);
    Route::put('/usuarios/{id}', [UsuarioController::class, 'update']);

    Route::get('/sesiones-usuario', [SesionUsuarioController::class, 'index']);
    Route::get('/sesiones-usuario/{id}', [SesionUsuarioController::class, 'show']);
    Route::post('/sesiones-usuario', [SesionUsuarioController::class, 'store']);
    Route::put('/sesiones-usuario/{id}', [SesionUsuarioController::class, 'update']);

    Route::get('/ciudades', [CiudadController::class, 'index']);
    Route::get('/ciudades/{id}', [CiudadController::class, 'show']);
    Route::post('/ciudades', [CiudadController::class, 'store']);
    Route::put('/ciudades/{id}', [CiudadController::class, 'update']);

    Route::get('/asociados', [AsociadoController::class, 'index']);
    Route::get('/asociados/mi-perfil', [AsociadoController::class, 'miPerfil']);
    Route::get('/asociados/{id}', [AsociadoController::class, 'show']);

    Route::get('/solicitudes-afiliacion', [SolicitudAfiliacionController::class, 'index']);
    Route::get('/solicitudes-afiliacion/{id}', [SolicitudAfiliacionController::class, 'show']);
    Route::post('/solicitudes-afiliacion', [SolicitudAfiliacionController::class, 'store']);
    Route::put('/solicitudes-afiliacion/{id}', [SolicitudAfiliacionController::class, 'update']);
    Route::get('/admin/afiliaciones', [SolicitudAfiliacionController::class, 'pendientes']);
    Route::post('/admin/afiliacion/{id}/aprobar', [SolicitudAfiliacionController::class, 'aprobar']);
    Route::post('/admin/afiliacion/{id}/rechazar', [SolicitudAfiliacionController::class, 'rechazar']);

    Route::get('/tipos-obligacion', [TipoObligacionController::class, 'index']);
    Route::get('/tipos-obligacion/{id}', [TipoObligacionController::class, 'show']);
    Route::post('/tipos-obligacion', [TipoObligacionController::class, 'store']);
    Route::put('/tipos-obligacion/{id}', [TipoObligacionController::class, 'update']);

    Route::get('/periodos-cobro', [PeriodoCobroController::class, 'index']);
    Route::get('/periodos-cobro/{id}', [PeriodoCobroController::class, 'show']);
    Route::post('/periodos-cobro', [PeriodoCobroController::class, 'store']);
    Route::put('/periodos-cobro/{id}', [PeriodoCobroController::class, 'update']);

    Route::get('/obligaciones', [ObligacionController::class, 'index']);
    Route::get('/obligaciones/mis-obligaciones', [ObligacionController::class, 'misObligaciones']);
    Route::get('/obligaciones/{id}', [ObligacionController::class, 'show']);
    Route::get('/asociados/{asociadoId}/obligaciones', [ObligacionController::class, 'porAsociado']);

    Route::get('/descuentos', [DescuentoController::class, 'index']);
    Route::get('/descuentos/{id}', [DescuentoController::class, 'show']);
    Route::post('/descuentos', [DescuentoController::class, 'store']);
    Route::put('/descuentos/{id}', [DescuentoController::class, 'update']);

    Route::get('/obligacion-descuento', [ObligacionDescuentoController::class, 'index']);
    Route::get('/obligacion-descuento/{id}', [ObligacionDescuentoController::class, 'show']);
    Route::post('/obligacion-descuento', [ObligacionDescuentoController::class, 'store']);
    Route::put('/obligacion-descuento/{id}', [ObligacionDescuentoController::class, 'update']);

    Route::get('/referidos', [ReferidoController::class, 'index']);
    Route::get('/referidos/{id}', [ReferidoController::class, 'show']);
    Route::post('/referidos', [ReferidoController::class, 'store']);
    Route::put('/referidos/{id}', [ReferidoController::class, 'update']);

    Route::get('/recibos-pago', [ReciboPagoController::class, 'index']);
    Route::get('/recibos-pago/mis-recibos', [ReciboPagoController::class, 'misRecibos']);
    Route::post('/recibos-pago', [ReciboPagoController::class, 'store']);
    Route::get('/recibos-pago/{id}', [ReciboPagoController::class, 'show']);
    Route::get('/recibos-pago/{id}/archivo', [ReciboPagoController::class, 'descargarArchivo']);
    Route::post('/recibos-pago/{id}/aprobar', [ReciboPagoController::class, 'aprobar']);
    Route::post('/recibos-pago/{id}/rechazar', [ReciboPagoController::class, 'rechazar']);

    Route::get('/certificados', [CertificadoController::class, 'index']);
    Route::get('/certificados/{id}', [CertificadoController::class, 'show']);
    Route::post('/certificados', [CertificadoController::class, 'store']);
    Route::put('/certificados/{id}', [CertificadoController::class, 'update']);

    Route::get('/notificaciones', [NotificacionController::class, 'index']);
    Route::get('/notificaciones/{id}', [NotificacionController::class, 'show']);
    Route::post('/notificaciones', [NotificacionController::class, 'store']);
    Route::put('/notificaciones/{id}', [NotificacionController::class, 'update']);
    Route::post('/notificaciones/{id}/marcar-leida', [NotificacionController::class, 'marcarLeida']);

    Route::get('/smmlv', [SmmlvController::class, 'index']);
    Route::get('/smmlv/{id}', [SmmlvController::class, 'show']);
    Route::post('/smmlv', [SmmlvController::class, 'store']);
    Route::put('/smmlv/{id}', [SmmlvController::class, 'update']);

    Route::get('/parametros-sistema', [ParametroSistemaController::class, 'index']);
    Route::get('/parametros-sistema/{id}', [ParametroSistemaController::class, 'show']);
    Route::post('/parametros-sistema', [ParametroSistemaController::class, 'store']);
    Route::put('/parametros-sistema/{id}', [ParametroSistemaController::class, 'update']);

    Route::get('/asociados/{asociadoId}/historial-estados', [EstadoMembresiaController::class, 'historialPorAsociado']);
    Route::post('/asociados/{asociadoId}/cambiar-estado', [EstadoMembresiaController::class, 'cambiarEstado']);

    Route::get('/auditoria', [AuditoriaController::class, 'index']);
    Route::get('/auditoria/{id}', [AuditoriaController::class, 'show']);

    Route::get('/archivos-adjuntos', [ArchivoAdjuntoController::class, 'index']);
    Route::get('/archivos-adjuntos/{id}', [ArchivoAdjuntoController::class, 'show']);
    Route::post('/archivos-adjuntos', [ArchivoAdjuntoController::class, 'store']);
    Route::get('/archivos-adjuntos/{id}/descargar', [ArchivoAdjuntoController::class, 'descargar']);

    Route::get('/configuracion-descuentos-anuales', [ConfiguracionDescuentoAnualController::class, 'index']);
    Route::get('/configuracion-descuentos-anuales/{id}', [ConfiguracionDescuentoAnualController::class, 'show']);
    Route::post('/configuracion-descuentos-anuales', [ConfiguracionDescuentoAnualController::class, 'store']);
    Route::put('/configuracion-descuentos-anuales/{id}', [ConfiguracionDescuentoAnualController::class, 'update']);
});
