<?php

namespace App\Http\Controllers\Api;

use App\Models\ArchivoAdjunto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class ArchivoAdjuntoController extends BaseApiController
{
    public function index(Request $request)
    {
        $query = ArchivoAdjunto::with('usuario')->orderByDesc('fecha_subida');

        if ($request->filled('modulo')) {
            $query->where('modulo', $request->modulo);
        }

        if ($request->filled('referencia_id')) {
            $query->where('referencia_id', $request->referencia_id);
        }

        return $this->success($query->paginate(20), 'Listado de archivos adjuntos');
    }

    public function show(int $id)
    {
        $archivo = ArchivoAdjunto::with('usuario')->find($id);

        if (!$archivo) {
            return $this->error('Archivo adjunto no encontrado', null, 404);
        }

        return $this->success($archivo, 'Detalle del archivo adjunto');
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'modulo' => 'required|string|max:50',
            'referencia_id' => 'required|integer',
            'archivo' => 'required|file|max:5120',
        ]);

        if ($validator->fails()) {
            return $this->error('Datos inválidos', $validator->errors(), 422);
        }

        $file = $request->file('archivo');
        $ruta = $file->store('adjuntos', 'public');

        $archivo = ArchivoAdjunto::create([
            'modulo' => $request->modulo,
            'referencia_id' => $request->referencia_id,
            'nombre_original' => $file->getClientOriginalName(),
            'ruta_archivo' => $ruta,
            'extension' => $file->getClientOriginalExtension(),
            'mime_type' => $file->getMimeType(),
            'peso_bytes' => $file->getSize(),
            'subido_por' => optional($request->user())->id,
            'fecha_subida' => now(),
        ]);

        return $this->success($archivo, 'Archivo adjunto cargado correctamente', 201);
    }

    public function descargar(int $id)
    {
        $archivo = ArchivoAdjunto::find($id);

        if (!$archivo) {
            return $this->error('Archivo adjunto no encontrado', null, 404);
        }

        if (!Storage::disk('public')->exists($archivo->ruta_archivo)) {
            return $this->error('El archivo no existe en almacenamiento', null, 404);
        }

        $disk = Storage::disk('public');
        $rutaCompleta = $disk->path($archivo->ruta_archivo);
        return response()->download($rutaCompleta, $archivo->nombre_original);
    }
}
