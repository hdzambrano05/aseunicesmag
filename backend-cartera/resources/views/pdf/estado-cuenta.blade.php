<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <title>Estado de cuenta</title>

    <style>
        @page {
            margin: 25px;
        }

        body {
            font-family: "Times New Roman", serif;
            font-size: 11px;
            color: #111;
        }

        .contenedor {
            border: 3px solid #111;
            width: 100%;
        }

        table {
            width: 100%;
            border-collapse: collapse;
        }

        td,
        th {
            border: 2px solid #111;
            padding: 3px 5px;
            vertical-align: middle;
        }

        .sin-borde td {
            border: none;
        }

        .header {
            height: 95px;
        }

        .logo {
            width: 85px;
            text-align: center;
        }

        .logo img {
            max-width: 75px;
        }

        .titulo {
            text-align: center;
            font-weight: bold;
            font-size: 18px;
        }

        .subtitulo {
            text-align: center;
            font-size: 14px;
            line-height: 1.5;
        }

        .azul {
            background: #002060;
            color: #fff;
            font-weight: bold;
        }

        .azul-claro {
            color: #0070c0;
            font-weight: bold;
        }

        .center {
            text-align: center;
        }

        .right {
            text-align: right;
        }

        .bold {
            font-weight: bold;
        }

        .verde {
            color: #008000;
            font-weight: bold;
        }

        .rojo {
            color: #9c0006;
            font-weight: bold;
        }

        .total {
            font-size: 17px;
            color: #9c0006;
            font-weight: bold;
        }

        .total-verde {
            font-size: 14px;
            color: #008000;
            font-weight: bold;
        }

        .seccion {
            background: #002060;
            color: white;
            font-weight: bold;
            text-align: center;
            font-size: 14px;
        }

        .observaciones {
            padding: 14px 28px;
            text-align: justify;
            line-height: 1.35;
            font-size: 12px;
        }

        .observaciones p {
            margin: 8px 0;
        }

        .small {
            font-size: 10px;
        }
    </style>
</head>

<body>

    @php
    $nombreCompleto = trim(($usuario->nombres ?? '') . ' ' . ($usuario->apellidos ?? ''));
    $documento = $usuario->numero_documento ?? '';
    $correo = $usuario->correo ?? '';
    $telefono = $usuario->telefono ?? '';
    $programa = $asociado->programa_academico ?? 'NO REGISTRADO';

    $fechaAfiliacion = $asociado->fecha_afiliacion
    ? \Carbon\Carbon::parse($asociado->fecha_afiliacion)->locale('es')->translatedFormat('d \d\e F \d\e Y')
    : 'NO REGISTRADA';

    $anio = $anio ?? now()->year;
    $valorMes = $valorMensual ?? 17000;

    $filasEstadoCuenta = $filasEstadoCuenta ?? [];
    $totalPagado = $totalPagado ?? 0;
    $totalDebe = $totalDebe ?? 0;
    $descuentoSemestral = $descuentoSemestral ?? 0;
    $totalConDescuento = $totalConDescuento ?? 0;

    function monedaPdf($valor) {
    return number_format((float) $valor, 0, ',', '.');
    }
    @endphp

    <div class="contenedor">

        <table class="sin-borde header">
            <tr>
                <td class="logo" style="width: 20%;">
                    <img src="{{ public_path('images/logo-aseunicesmag.png') }}">
                </td>

                <td style="width: 60%;">
                    <div class="titulo">ASOCIACIÓN DE EGRESADOS UNICESMAG</div>
                    <div class="subtitulo">
                        Nit. Nº 900690317-3<br>
                        <strong>Cel: 3185335311</strong><br>
                        aseunicesmag@gmail.com
                    </div>
                </td>

                <td class="logo" style="width: 20%;">
                    <img src="{{ public_path('images/logo-soy-unicesmag.png') }}">
                </td>
            </tr>
        </table>

        <table>
            <tr>
                <td class="azul" style="width: 18%;">Condición</td>
                <td style="width: 20%;">ASOCIADO AFILIADO</td>
                <td class="azul center" style="width: 32%;">ESTADO DE CUENTA A:</td>
                <td class="azul center" style="width: 30%;">{{ $fechaGeneracion }}</td>
            </tr>

            <tr>
                <td class="azul">Asociado:</td>
                <td colspan="2">{{ mb_strtoupper($nombreCompleto) }}</td>
                <td>
                    <table>
                        <tr>
                            <td class="azul center" style="width: 40%;">N° CC</td>
                            <td class="center bold">
                                {{ is_numeric($documento) ? number_format((int) $documento, 0, ',', '.') : $documento }}
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>

            <tr>
                <td class="azul">Correo:</td>
                <td colspan="2">{{ $correo }}</td>
                <td>
                    <table>
                        <tr>
                            <td class="azul center" style="width: 40%;">Teléfono</td>
                            <td class="center">{{ $telefono }}</td>
                        </tr>
                    </table>
                </td>
            </tr>

            <tr>
                <td class="azul">Fecha de afiliación:</td>
                <td colspan="3" class="center azul-claro">{{ $fechaAfiliacion }}</td>
            </tr>

            <tr>
                <td class="azul">Programa que egresó:</td>
                <td colspan="3">{{ mb_strtoupper($programa) }}</td>
            </tr>
        </table>

        <br>

        <table>
            <thead>
                <tr class="azul center">
                    <th style="width: 20%;">Detalle</th>
                    <th colspan="2" style="width: 14%;">Periodo</th>
                    <th style="width: 12%;">Fecha pago</th>
                    <th style="width: 12%;">Vencimiento</th>
                    <th style="width: 11%;">Valor mes</th>
                    <th style="width: 8%;">Meses</th>
                    <th style="width: 10%;">Estado</th>
                    <th style="width: 13%;">Valor</th>
                </tr>
            </thead>

            <tbody>
                @forelse($filasEstadoCuenta as $fila)
                <tr>
                    <td>{{ $fila['detalle'] }}</td>
                    <td class="center">{{ $fila['periodo_inicio'] ?? 'N/A' }}</td>
                    <td class="center">{{ $fila['periodo_fin'] ?? 'N/A' }}</td>
                    <td class="center small">{{ $fila['fecha_pago'] ?? 'N/A' }}</td>
                    <td class="center small">{{ $fila['fecha_vencimiento'] ?? 'N/A' }}</td>
                    <td class="right">$ {{ monedaPdf($fila['valor_mes'] ?? $valorMes) }}</td>
                    <td class="center">{{ $fila['meses'] ?? 1 }}</td>

                    @if(($fila['estado'] ?? '') === 'Pagado')
                    <td class="center verde">Pagado</td>
                    @else
                    <td class="center rojo">Debe</td>
                    @endif

                    <td class="right bold">$ {{ monedaPdf($fila['valor'] ?? 0) }}</td>
                </tr>
                @empty
                <tr>
                    <td colspan="9" class="center bold">
                        El asociado no presenta obligaciones registradas para este año.
                    </td>
                </tr>
                @endforelse

                <tr>
                    <td colspan="8" class="center bold">TOTAL PAGADO</td>
                    <td class="right total-verde">$ {{ monedaPdf($totalPagado) }}</td>
                </tr>

                <tr>
                    <td colspan="8" class="center bold">TOTAL DEBE</td>
                    <td class="right total">$ {{ monedaPdf($totalDebe) }}</td>
                </tr>
            </tbody>
        </table>

        @if($totalDebe > 0)
        <table>
            <tr>
                <td colspan="5" class="seccion">PAGO DE CUOTAS PENDIENTES 10% DESCUENTO</td>
            </tr>

            <tr>
                <td colspan="2" class="center bold">
                    Para activar membresía pendiente del año {{ $anio }}
                </td>
                <td class="right azul-claro">Menos</td>
                <td class="center azul-claro">10%</td>
                <td class="right bold">$ {{ monedaPdf($totalDebe) }}</td>
            </tr>

            <tr>
                <td colspan="3" class="azul-claro">
                    Fecha límite pago hasta el de 05 julio {{ $anio }}
                </td>
                <td class="right azul-claro bold">Total a pagar</td>
                <td class="right azul-claro bold">$ {{ monedaPdf($totalConDescuento) }}</td>
            </tr>

            <tr>
                <td colspan="5" class="seccion">RESUMEN DE DINERO</td>
            </tr>

            <tr>
                <td colspan="4" class="right bold">Total pagado aprobado</td>
                <td class="right verde">$ {{ monedaPdf($totalPagado) }}</td>
            </tr>

            <tr>
                <td colspan="4" class="right bold">Total pendiente sin descuento</td>
                <td class="right rojo">$ {{ monedaPdf($totalDebe) }}</td>
            </tr>

            <tr>
                <td colspan="4" class="right bold">Descuento aplicado 10%</td>
                <td class="right azul-claro">$ {{ monedaPdf($descuentoSemestral) }}</td>
            </tr>

            <tr>
                <td colspan="4" class="right bold">Total pendiente con descuento</td>
                <td class="right total">$ {{ monedaPdf($totalConDescuento) }}</td>
            </tr>
        </table>
        @else
        <table>
            <tr>
                <td colspan="5" class="seccion">ESTADO DE CUENTA</td>
            </tr>
            <tr>
                <td colspan="5" class="center verde bold">
                    El asociado se encuentra al día. No presenta valores pendientes.
                </td>
            </tr>
        </table>
        @endif

        <table>
            <tr>
                <td colspan="5" class="seccion">OBSERVACIONES</td>
            </tr>

            <tr>
                <td colspan="5" class="observaciones">
                    <p>
                        En este comienzo de año, y con el fin de facilitar la normalización de la afiliación
                        y la activación de membresías, la Junta Directiva, de acuerdo con lo aprobado por la
                        Asamblea General y tomando como base el salario mínimo legal vigente para {{ $anio }},
                        ha autorizado de manera excepcional los siguientes descuentos por pronto pago:
                    </p>

                    <p>
                        <strong>◆ Opción 1 – Pago semestral anticipado</strong><br>
                        Obtenga un 10 % de descuento al cancelar el valor correspondiente a las cuotas pendientes
                        de sostenimiento del semestre correspondiente.
                    </p>

                    <p>
                        <strong>◆ Opción 2 – Pago anual anticipado</strong><br>
                        Reciba un 30 % de descuento al realizar el pago total de las obligaciones pendientes del año {{ $anio }}.
                    </p>

                    <p>
                        Datos para realizar el pago:<br>
                        BANCOLOMBIA – Cuenta de ahorros N.° 879-228464-11<br>
                        NIT: 900.690.317-3 – ASEUNICESMAG
                    </p>

                    <p>
                        <strong>Una vez realizado el pago, agradecemos enviar el comprobante al correo:</strong><br>
                        aseunicesmag@gmail.com, indicando su nombre completo y número de cédula.
                    </p>

                    <p>
                        ¡Gracias por su sentido de pertenencia y apoyar en la reactivación de nuestra asociación!
                    </p>
                </td>
            </tr>
        </table>

    </div>

</body>

</html>