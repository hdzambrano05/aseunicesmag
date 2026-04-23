<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;

class BaseApiController extends Controller
{
    protected function success($data = null, string $message = 'Operación exitosa', int $status = 200): JsonResponse
    {
        return response()->json([
            'ok' => true,
            'message' => $message,
            'data' => $data,
        ], $status);
    }

    protected function error(string $message = 'Ocurrió un error', $errors = null, int $status = 400): JsonResponse
    {
        return response()->json([
            'ok' => false,
            'message' => $message,
            'errors' => $errors,
        ], $status);
    }
}