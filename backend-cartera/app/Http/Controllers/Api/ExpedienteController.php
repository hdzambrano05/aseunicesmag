<?php

namespace App\Http\Controllers\Api;

use App\Models\Asociado;
use App\Models\ArchivoAdjunto;
use App\Models\SolicitudAfiliacion;
use App\Models\ReciboPago;

class ExpedienteController extends BaseApiController
{
    public function index()
    {
        $asociados = Asociado::with('usuario')
            ->orderByDesc('id')
            ->get()
            ->map(function ($asociado) {

                $solicitudes = SolicitudAfiliacion::where('asociado_id', $asociado->id)
                    ->orWhere('usuario_id', $asociado->usuario_id)
                    ->pluck('id');

                $archivosAfiliacion = ArchivoAdjunto::where('modulo', 'afiliacion')
                    ->whereIn('referencia_id', $solicitudes)
                    ->orderByDesc('fecha_subida')
                    ->get()
                    ->map(function ($archivo) {
                        return [
                            'id' => $archivo->id,
                            'origen' => 'ARCHIVO_ADJUNTO',
                            'modulo' => $archivo->modulo,
                            'tipo_archivo' => 'Documento de afiliación',
                            'nombre_original' => $archivo->nombre_original,
                            'ruta_archivo' => $archivo->ruta_archivo,
                            'extension' => $archivo->extension,
                            'mime_type' => $archivo->mime_type,
                            'peso_bytes' => $archivo->peso_bytes,
                            'fecha_subida' => $archivo->fecha_subida,
                            'url_descarga' => url('/api/archivos-adjuntos/' . $archivo->id . '/descargar'),
                        ];
                    });

                $recibos = ReciboPago::where('asociado_id', $asociado->id)
                    ->orderByDesc('fecha_carga')
                    ->get()
                    ->map(function ($recibo) {
                        return [
                            'id' => $recibo->id,
                            'origen' => 'RECIBO_PAGO',
                            'modulo' => 'recibos_pago',
                            'tipo_archivo' => 'Comprobante de pago',
                            'nombre_original' => $recibo->nombre_archivo,
                            'ruta_archivo' => $recibo->ruta_archivo,
                            'extension' => $recibo->extension,
                            'mime_type' => $recibo->mime_type,
                            'peso_bytes' => $recibo->peso_bytes,
                            'fecha_subida' => $recibo->fecha_carga,
                            'estado' => $recibo->estado,
                            'valor_reportado' => $recibo->valor_reportado,
                            'url_descarga' => url('/storage/' . $recibo->ruta_archivo),
                        ];
                    });

                return [
                    'id' => $asociado->id,
                    'codigo_asociado' => $asociado->codigo_asociado,
                    'estado_membresia' => $asociado->estado_membresia,
                    'usuario' => $asociado->usuario,
                    'archivos' => $archivosAfiliacion->merge($recibos)->values(),
                ];
            });

        return $this->success($asociados, 'Expedientes cargados correctamente');
    }
}
