<?php

namespace App\Http\Controllers\Api;

use App\Models\Usuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends BaseApiController
{
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'correo' => 'required|email',
            'password' => 'required|string|min:6',
        ]);

        if ($validator->fails()) {
            return $this->error('Datos inválidos', $validator->errors(), 422);
        }

        $usuario = Usuario::with(['rol', 'asociado'])
            ->where('correo', $request->correo)
            ->first();

        if (!$usuario) {
            return $this->error('Credenciales incorrectas', null, 401);
        }

        if (!Hash::check($request->password, $usuario->password_hash)) {
            return $this->error('Credenciales incorrectas', null, 401);
        }

        if ($usuario->estado_cuenta !== 'ACTIVO') {
            return $this->error('La cuenta no se encuentra activa', null, 403);
        }

        $nombreRol = strtoupper($usuario->rol->nombre ?? '');

        if ($nombreRol === 'ASOCIADO') {
            if (!$usuario->asociado) {
                return $this->error('Este usuario no tiene información de asociado', null, 403);
            }

            if ($usuario->asociado->estado_membresia !== 'ACTIVO') {
                return $this->error('La membresía del asociado no se encuentra activa', null, 403);
            }
        }

        $token = $usuario->createToken('api-token')->plainTextToken;

        $usuario->ultimo_login = now();
        $usuario->save();

        return $this->success([
            'token' => $token,
            'usuario' => $usuario,
            'rol' => $nombreRol,
            'redirect' => $nombreRol === 'ADMIN'
                ? '/admin/dashboard'
                : '/dashboard/usuario',
        ], 'Inicio de sesión exitoso');
    }
    public function me(Request $request)
    {
        $usuario = $request->user()->load([
            'rol',
            'asociado.ciudad',
        ]);

        return $this->success($usuario, 'Usuario autenticado');
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()?->delete();

        return $this->success(null, 'Sesión cerrada correctamente');
    }

    public function cambiarPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'password_actual' => 'required|string|min:6',
            'password' => 'required|string|min:6|confirmed',
        ], [
            'password_actual.required' => 'La contraseña actual es obligatoria.',
            'password.required' => 'La nueva contraseña es obligatoria.',
            'password.confirmed' => 'La confirmación de la contraseña no coincide.',
        ]);

        if ($validator->fails()) {
            return $this->error('Datos inválidos', $validator->errors(), 422);
        }

        $usuario = $request->user();

        if (!$usuario) {
            return $this->error('Usuario no autenticado', null, 401);
        }

        if (!Hash::check($request->password_actual, $usuario->password_hash)) {
            return $this->error('La contraseña actual no es correcta', null, 422);
        }

        $usuario->password_hash = Hash::make($request->password);
        $usuario->save();

        return $this->success(null, 'Contraseña actualizada correctamente');
    }
}
