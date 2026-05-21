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
            font-size: 12px;
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

        .rojo {
            color: #9c0006;
            font-weight: bold;
        }

        .total {
            font-size: 18px;
            color: #9c0006;
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

    $anio = now()->year;

    /*
    Estos valores deben llegar desde el CertificadoController.
    NO se calculan por defecto como 6 meses, porque si ya pagó uno,
    solo debe salir lo pendiente.
    */
    $valorMes = 17000;

    $totalPrimerSemestre = $totalPrimerSemestre ?? 0;
    $totalSegundoSemestre = $totalSegundoSemestre ?? 0;
    $totalGeneral = $totalGeneral ?? ($totalPrimerSemestre + $totalSegundoSemestre);

    $mesesPrimerSemestre = $valorMes > 0 ? ceil($totalPrimerSemestre / $valorMes) : 0;
    $mesesSegundoSemestre = $valorMes > 0 ? ceil($totalSegundoSemestre / $valorMes) : 0;

    $pagoSemestralPrimero = $pagoSemestralPrimero ?? (
    $totalPrimerSemestre > 0 ? $totalPrimerSemestre - ($totalPrimerSemestre * 0.10) : 0
    );

    $pagoSemestralSegundo = $pagoSemestralSegundo ?? (
    $totalSegundoSemestre > 0 ? $totalSegundoSemestre - ($totalSegundoSemestre * 0.10) : 0
    );

    $pagoAnual = $pagoAnual ?? (
    $totalGeneral > 0 ? $totalGeneral - ($totalGeneral * 0.30) : 0
    );

    function monedaPdf($valor) {
    return number_format($valor, 0, ',', '.');
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
                    <th style="width: 22%;">Detalle</th>
                    <th colspan="2" style="width: 20%;">Periodo</th>
                    <th style="width: 17%;">Valor mes</th>
                    <th style="width: 12%;">N° de meses</th>
                    <th style="width: 12%;">Estado de<br>cuenta</th>
                    <th style="width: 17%;">Valor</th>
                </tr>
            </thead>

            <tbody>
                @if($totalPrimerSemestre > 0)
                <tr>
                    <td>Sostenimiento {{ $anio }}-I</td>
                    <td class="center">1-ene</td>
                    <td class="center">30-jun</td>
                    <td class="right">$ {{ monedaPdf($valorMes) }}</td>
                    <td class="center">{{ $mesesPrimerSemestre }}</td>
                    <td class="center rojo">Debe</td>
                    <td class="right">$ {{ monedaPdf($totalPrimerSemestre) }}</td>
                </tr>
                @endif

                @if($totalSegundoSemestre > 0)
                <tr>
                    <td>Sostenimiento {{ $anio }}-II</td>
                    <td class="center">1-jul</td>
                    <td class="center">31-dic</td>
                    <td class="right">$ {{ monedaPdf($valorMes) }}</td>
                    <td class="center">{{ $mesesSegundoSemestre }}</td>
                    <td class="center rojo">Debe</td>
                    <td class="right">$ {{ monedaPdf($totalSegundoSemestre) }}</td>
                </tr>
                @endif

                @if($totalGeneral <= 0)
                    <tr>
                    <td colspan="7" class="center bold">
                        El asociado no presenta obligaciones pendientes por sostenimiento.
                    </td>
                    </tr>
                    @endif

                    <tr>
                        <td colspan="6" class="center bold">TOTAL</td>
                        <td class="right total">$ {{ monedaPdf($totalGeneral) }}</td>
                    </tr>
            </tbody>
        </table>

        @if($totalGeneral > 0)
        <table>
            <tr>
                <td colspan="5" class="seccion">PAGO DE CUOTAS PENDIENTES 10% DESCUENTO</td>
            </tr>

            @if($totalPrimerSemestre > 0)
            <tr>
                <td colspan="2" class="center bold">
                    Para activar membresía de enero a junio de {{ $anio }}
                </td>
                <td class="right azul-claro">Menos</td>
                <td class="center azul-claro">10%</td>
                <td class="right bold">$ {{ monedaPdf($totalPrimerSemestre) }}</td>
            </tr>

            <tr>
                <td colspan="3" class="azul-claro">
                    Fecha límite pago hasta el de 31 enero {{ $anio }}
                </td>
                <td class="right azul-claro bold">Total a pagar</td>
                <td class="right azul-claro bold">$ {{ monedaPdf($pagoSemestralPrimero) }}</td>
            </tr>
            @endif

            @if($totalSegundoSemestre > 0)
            <tr>
                <td colspan="2" class="center bold">
                    Para activar membresía de julio a diciembre de {{ $anio }}
                </td>
                <td class="right azul-claro">Menos</td>
                <td class="center azul-claro">10%</td>
                <td class="right bold">$ {{ monedaPdf($totalSegundoSemestre) }}</td>
            </tr>

            <tr>
                <td colspan="3" class="azul-claro">
                    Fecha límite pago hasta el de 05 julio {{ $anio }}
                </td>
                <td class="right azul-claro bold">Total a pagar</td>
                <td class="right azul-claro bold">$ {{ monedaPdf($pagoSemestralSegundo) }}</td>
            </tr>
            @endif

            @if($totalPrimerSemestre > 0 && $totalSegundoSemestre > 0)
            <tr>
                <td colspan="5" class="seccion">
                    PAGO DEL AÑO {{ $anio }} DESCUENTO 30%
                </td>
            </tr>

            <tr>
                <td colspan="2" class="center bold">
                    Para activar membresía hasta 31 de diciembre {{ $anio }}
                </td>
                <td class="right azul-claro">Menos</td>
                <td class="center azul-claro">30%</td>
                <td class="right bold">$ {{ monedaPdf($totalGeneral) }}</td>
            </tr>

            <tr>
                <td colspan="3" class="azul-claro">
                    Fecha límite pago hasta el de 31 enero {{ $anio }}
                </td>
                <td class="right azul-claro bold">Total a pagar</td>
                <td class="right azul-claro bold">$ {{ monedaPdf($pagoAnual) }}</td>
            </tr>
            @endif

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
        @endif

    </div>

</body>

</html>