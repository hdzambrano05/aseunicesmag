<?php

namespace App\Http\Controllers\Api;

use App\Models\Usuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UsuarioController extends BaseApiController
{
    public function index(Request $request)
    {
        $query = Usuario::with(['rol', 'asociado']);

        if ($request->filled('buscar')) {
            $buscar = $request->buscar;
            $query->where(function ($q) use ($buscar) {
                $q->where('nombres', 'like', "%{$buscar}%")
                  ->orWhere('apellidos', 'like', "%{$buscar}%")
                  ->orWhere('correo', 'like', "%{$buscar}%")
                  ->orWhere('numero_documento', 'like', "%{$buscar}%");
            });
        }

        if ($request->filled('rol_id')) {
            $query->where('rol_id', $request->rol_id);
        }

        $usuarios = $query->orderByDesc('id')->paginate(15);

        return $this->success($usuarios, 'Listado de usuarios');
    }

    public function show(int $id)
    {
        $usuario = Usuario::with([
            'rol',
            'asociado.ciudad',
            'sesiones',
            'notificaciones',
        ])->find($id);

        if (!$usuario) {
            return $this->error('Usuario no encontrado', null, 404);
        }

        return $this->success($usuario, 'Detalle del usuario');
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'rol_id' => 'required|exists:roles,id',
            'tipo_documento' => 'required|string|max:20',
            'numero_documento' => 'required|string|max:30|unique:usuarios,numero_documento',
            'nombres' => 'required|string|max:100',
            'apellidos' => 'required|string|max:100',
            'correo' => 'required|email|max:150|unique:usuarios,correo',
            'telefono' => 'nullable|string|max:30',
            'password' => 'required|string|min:6',
            'foto_perfil' => 'nullable|string|max:255',
            'email_verificado' => 'nullable|boolean',
            'estado_cuenta' => 'required|string|max:20',
            'acepta_habeas_data' => 'required|boolean',
            'acepta_terminos' => 'required|boolean',
        ]);

        if ($validator->fails()) {
            return $this->error('Datos inválidos', $validator->errors(), 422);
        }

        $usuario = Usuario::create([
            'rol_id' => $request->rol_id,
            'tipo_documento' => $request->tipo_documento,
            'numero_documento' => $request->numero_documento,
            'nombres' => $request->nombres,
            'apellidos' => $request->apellidos,
            'correo' => $request->correo,
            'telefono' => $request->telefono,
            'password_hash' => Hash::make($request->password),
            'foto_perfil' => $request->foto_perfil,
            'email_verificado' => $request->boolean('email_verificado', false),
            'estado_cuenta' => $request->estado_cuenta,
            'acepta_habeas_data' => $request->boolean('acepta_habeas_data'),
            'acepta_terminos' => $request->boolean('acepta_terminos'),
        ]);

        return $this->success($usuario, 'Usuario creado correctamente', 201);
    }

    public function update(Request $request, int $id)
    {
        $usuario = Usuario::find($id);

        if (!$usuario) {
            return $this->error('Usuario no encontrado', null, 404);
        }

        $validator = Validator::make($request->all(), [
            'rol_id' => 'required|exists:roles,id',
            'tipo_documento' => 'required|string|max:20',
            'numero_documento' => 'required|string|max:30|unique:usuarios,numero_documento,' . $id,
            'nombres' => 'required|string|max:100',
            'apellidos' => 'required|string|max:100',
            'correo' => 'required|email|max:150|unique:usuarios,correo,' . $id,
            'telefono' => 'nullable|string|max:30',
            'password' => 'nullable|string|min:6',
            'foto_perfil' => 'nullable|string|max:255',
            'email_verificado' => 'required|boolean',
            'estado_cuenta' => 'required|string|max:20',
            'acepta_habeas_data' => 'required|boolean',
            'acepta_terminos' => 'required|boolean',
        ]);

        if ($validator->fails()) {
            return $this->error('Datos inválidos', $validator->errors(), 422);
        }

        $data = [
            'rol_id' => $request->rol_id,
            'tipo_documento' => $request->tipo_documento,
            'numero_documento' => $request->numero_documento,
            'nombres' => $request->nombres,
            'apellidos' => $request->apellidos,
            'correo' => $request->correo,
            'telefono' => $request->telefono,
            'foto_perfil' => $request->foto_perfil,
            'email_verificado' => $request->boolean('email_verificado'),
            'estado_cuenta' => $request->estado_cuenta,
            'acepta_habeas_data' => $request->boolean('acepta_habeas_data'),
            'acepta_terminos' => $request->boolean('acepta_terminos'),
        ];

        if ($request->filled('password')) {
            $data['password_hash'] = Hash::make($request->password);
        }

        $usuario->update($data);

        return $this->success($usuario->fresh(), 'Usuario actualizado correctamente');
    }
}