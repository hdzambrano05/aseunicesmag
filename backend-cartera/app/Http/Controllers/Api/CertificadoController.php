<?php

namespace App\Http\Controllers\Api;

use App\Models\Certificado;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CertificadoController extends BaseApiController
{
    public function index(Request $request)
    {
        $query = Certificado::with(['asociado.usuario', 'generadoPor'])->orderByDesc('fecha_generacion');

        if ($request->filled('asociado_id')) {
            $query->where('asociado_id', $request->asociado_id);
        }

        if ($request->filled('tipo_certificado')) {
            $query->where('tipo_certificado', $request->tipo_certificado);
        }

        return $this->success($query->paginate(20), 'Listado de certificados');
    }

    public function show(int $id)
    {
        $certificado = Certificado::with(['asociado.usuario', 'generadoPor'])->find($id);

        if (!$certificado) {
            return $this->error('Certificado no encontrado', null, 404);
        }

        return $this->success($certificado, 'Detalle del certificado');
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'asociado_id' => 'required|exists:asociados,id',
            'tipo_certificado' => 'required|string|max:50',
            'numero_certificado' => 'required|string|max:50|unique:certificados,numero_certificado',
            'ruta_pdf' => 'nullable|string|max:255',
            'hash_documento' => 'nullable|string|max:255',
            'fecha_generacion' => 'required|date',
            'fecha_descarga' => 'nullable|date',
            'generado_por' => 'nullable|exists:usuarios,id',
            'estado' => 'nullable|string|max:30',
        ]);

        if ($validator->fails()) {
            return $this->error('Datos inválidos', $validator->errors(), 422);
        }

        $certificado = Certificado::create($request->all());

        return $this->success($certificado, 'Certificado creado correctamente', 201);
    }

    public function update(Request $request, int $id)
    {
        $certificado = Certificado::find($id);

        if (!$certificado) {
            return $this->error('Certificado no encontrado', null, 404);
        }

        $validator = Validator::make($request->all(), [
            'tipo_certificado' => 'required|string|max:50',
            'numero_certificado' => 'required|string|max:50|unique:certificados,numero_certificado,' . $id,
            'ruta_pdf' => 'nullable|string|max:255',
            'hash_documento' => 'nullable|string|max:255',
            'fecha_generacion' => 'required|date',
            'fecha_descarga' => 'nullable|date',
            'generado_por' => 'nullable|exists:usuarios,id',
            'estado' => 'nullable|string|max:30',
        ]);

        if ($validator->fails()) {
            return $this->error('Datos inválidos', $validator->errors(), 422);
        }

        $certificado->update($request->all());

        return $this->success($certificado->fresh(), 'Certificado actualizado correctamente');
    }
}