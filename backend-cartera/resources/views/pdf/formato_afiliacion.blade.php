<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <style>
        @page {
            margin: 20px 22px;
        }

        body {
            font-family: DejaVu Sans, sans-serif;
            font-size: 9px;
            color: #000;
        }

        table {
            width: 100%;
            border-collapse: collapse;
        }

        td,
        th {
            border: 1px solid #000;
            padding: 3px;
            vertical-align: middle;
        }

        .no-border td {
            border: none;
        }

        .header-title {
            font-size: 13px;
            font-weight: bold;
            text-align: center;
            line-height: 1.5;
        }

        .format-title {
            font-size: 16px;
            font-weight: bold;
            text-align: center;
        }

        .section-title {
            background: #f1f1f1;
            text-align: center;
            font-weight: bold;
            font-size: 10px;
        }

        .label {
            font-weight: bold;
            text-align: center;
            font-size: 8px;
        }

        .small {
            font-size: 7.5px;
        }

        .center {
            text-align: center;
        }

        .value {
            min-height: 15px;
        }

        .box {
            display: inline-block;
            width: 10px;
            height: 10px;
            border: 1px solid #000;
            text-align: center;
            line-height: 10px;
            font-size: 8px;
        }

        .motivation {
            height: 250px;
            vertical-align: top;
            padding: 8px;
        }

        .signature-space {
            height: 80px;
            text-align: center;
            vertical-align: bottom;
        }

        .firma-img {
            max-height: 55px;
            max-width: 190px;
        }

        .footer {
            margin-top: 18px;
            text-align: center;
            font-size: 9px;
        }

        .page-break {
            page-break-before: always;
        }

        .text-justify {
            text-align: justify;
            line-height: 1.25;
        }

        .admin-box {
            height: 55px;
            vertical-align: top;
        }
    </style>
</head>

<body>

    @php
    $d = $datos ?? [];
    $beneficiarios = $d['beneficiarios'] ?? [];
    $firma = $firma ?? null;
    @endphp

    <table>
        <tr>
            <td style="width: 16%; text-align:center;">
                <img src="{{ public_path('logo/logo_oficial.png') }}" style="width:55px;">
            </td>
            <td style="width: 48%;" class="header-title">
                ASOCIACIÓN DE EGRESADOS UNIVERSIDAD<br>
                CESMAG -ASEUNICESMAG<br>
                NIT. 900.690.317-3
            </td>
            <td style="width: 36%;" class="format-title">
                FORMATO DE AFILIACIÓN
            </td>
        </tr>
    </table>

    <br>

    <table>
        <tr>
            <td class="label" style="width: 29%;">FECHA DE SOLICITUD</td>
            <td class="label" style="width: 28%;">SE AFILIA POR VEZ</td>
            <td class="label" style="width: 43%;">RADICACIÓN ASEUNICESMAG</td>
        </tr>
        <tr>
            <td class="center">{{ $d['fecha_solicitud'] ?? '' }}</td>
            <td class="center">
                Primera: <span class="box">{{ ($d['se_afilia_por_vez'] ?? '') == 'Primera' ? 'X' : '' }}</span>
                &nbsp;&nbsp;
                Segunda: <span class="box">{{ ($d['se_afilia_por_vez'] ?? '') == 'Segunda' ? 'X' : '' }}</span>
            </td>
            <td class="center">{{ $d['radicacion'] ?? '' }}</td>
        </tr>
    </table>

    <table>
        <tr>
            <td colspan="6" class="section-title">1. INFORMACIÓN DEL SOLICITANTE</td>
        </tr>

        <tr>
            <td colspan="3" class="label">NOMBRES Y APELLIDOS</td>
            <td class="label">TIPO DE SANGRE</td>
            <td colspan="2" class="label">GÉNERO</td>
        </tr>
        <tr>
            <td colspan="3">{{ $d['nombres'] ?? '' }} {{ $d['apellidos'] ?? '' }}</td>
            <td class="center">{{ $d['tipo_sangre'] ?? '' }}</td>
            <td colspan="2" class="center">
                M: <span class="box">{{ ($d['genero'] ?? '') == 'M' ? 'X' : '' }}</span>
                F: <span class="box">{{ ($d['genero'] ?? '') == 'F' ? 'X' : '' }}</span>
                Otro: <span class="box">{{ ($d['genero'] ?? '') == 'Otro' ? 'X' : '' }}</span>
            </td>
        </tr>

        <tr>
            <td class="label">N° DE IDENTIFICACIÓN</td>
            <td class="label">FECHA DE EXPEDICIÓN</td>
            <td class="label">LUGAR DE EXPEDICIÓN</td>
            <td colspan="3" class="label">FECHA DE NACIMIENTO</td>
        </tr>
        <tr>
            <td>{{ $d['numero_documento'] ?? '' }}</td>
            <td>{{ $d['fecha_expedicion'] ?? '' }}</td>
            <td>{{ $d['lugar_expedicion'] ?? '' }}</td>
            <td colspan="3">{{ $d['fecha_nacimiento'] ?? '' }}</td>
        </tr>

        <tr>
            <td colspan="2" class="label">DIRECCIÓN DE RESIDENCIA Y BARRIO</td>
            <td class="label">N° CELULAR</td>
            <td colspan="3" class="label">CORREO ELECTRÓNICO</td>
        </tr>
        <tr>
            <td colspan="2">{{ $d['direccion'] ?? '' }}</td>
            <td>{{ $d['telefono'] ?? '' }}</td>
            <td colspan="3">{{ $d['correo'] ?? '' }}</td>
        </tr>

        <tr>
            <td class="label">NIVEL EDUCATIVO</td>
            <td colspan="2" class="label">TÍTULO OBTENIDO EN LA UNICESMAG</td>
            <td colspan="3" class="label">OCUPACIÓN</td>
        </tr>
        <tr>
            <td>
                Tec. <span class="box">{{ ($d['nivel_educativo'] ?? '') == 'Tecnico' ? 'X' : '' }}</span>
                Prof. <span class="box">{{ ($d['nivel_educativo'] ?? '') == 'Profesional' ? 'X' : '' }}</span>
                Doc. <span class="box">{{ ($d['nivel_educativo'] ?? '') == 'Doctorado' ? 'X' : '' }}</span><br>
                Esp. <span class="box">{{ ($d['nivel_educativo'] ?? '') == 'Especializacion' ? 'X' : '' }}</span>
                Mag. <span class="box">{{ ($d['nivel_educativo'] ?? '') == 'Magister' ? 'X' : '' }}</span>
            </td>
            <td colspan="2">{{ $d['titulo_obtenido'] ?? '' }}</td>
            <td colspan="3" class="small">
                Dependiente <span class="box">{{ ($d['ocupacion'] ?? '') == 'Dependiente' ? 'X' : '' }}</span>
                Independiente <span class="box">{{ ($d['ocupacion'] ?? '') == 'Independiente' ? 'X' : '' }}</span>
                Empleado <span class="box">{{ ($d['ocupacion'] ?? '') == 'Empleado' ? 'X' : '' }}</span>
                Hogar <span class="box">{{ ($d['ocupacion'] ?? '') == 'Hogar' ? 'X' : '' }}</span>
                Pensionado <span class="box">{{ ($d['ocupacion'] ?? '') == 'Pensionado' ? 'X' : '' }}</span>
            </td>
        </tr>

        <tr>
            <td colspan="3" class="label">EMPRESA DONDE LABORA</td>
            <td colspan="3" class="label">FECHA DE VINCULACIÓN</td>
        </tr>
        <tr>
            <td colspan="3">{{ $d['empresa'] ?? '' }}</td>
            <td colspan="3">{{ $d['fecha_vinculacion'] ?? '' }}</td>
        </tr>

        <tr>
            <td colspan="2" class="label">CARGO QUE DESEMPEÑA</td>
            <td class="label">TELÉFONO EMPRESA</td>
            <td colspan="3" class="label">ESTADO CIVIL</td>
        </tr>
        <tr>
            <td colspan="2">{{ $d['cargo'] ?? '' }}</td>
            <td>{{ $d['telefono_empresa'] ?? '' }}</td>
            <td colspan="3" class="small">
                Soltero(a) <span class="box">{{ ($d['estado_civil'] ?? '') == 'Soltero(a)' ? 'X' : '' }}</span>
                Casado(a) <span class="box">{{ ($d['estado_civil'] ?? '') == 'Casado(a)' ? 'X' : '' }}</span>
                Unión Libre <span class="box">{{ ($d['estado_civil'] ?? '') == 'Unión Libre' ? 'X' : '' }}</span>
                Viudo(a) <span class="box">{{ ($d['estado_civil'] ?? '') == 'Viudo(a)' ? 'X' : '' }}</span>
                Divorciado(a) <span class="box">{{ ($d['estado_civil'] ?? '') == 'Divorciado(a)' ? 'X' : '' }}</span>
            </td>
        </tr>

        <tr>
            <td class="label">N° PERSONAS A CARGO</td>
            <td class="label">NÚMERO HIJOS</td>
            <td class="label">Edad 0-5</td>
            <td class="label">Edad 6-11</td>
            <td class="label">Edad 12-17</td>
            <td class="label">Edad 18-25</td>
        </tr>
        <tr>
            <td>{{ $d['personas_a_cargo'] ?? '' }}</td>
            <td>{{ $d['numero_hijos'] ?? '' }}</td>
            <td>{{ $d['hijos_0_5'] ?? '' }}</td>
            <td>{{ $d['hijos_6_11'] ?? '' }}</td>
            <td>{{ $d['hijos_12_17'] ?? '' }}</td>
            <td>{{ $d['hijos_18_25'] ?? '' }}</td>
        </tr>

        <tr>
            <td colspan="3" class="label">TIPO DE VIVIENDA</td>
            <td colspan="3" class="label">ZONA UBICACIÓN</td>
        </tr>
        <tr>
            <td colspan="3" class="center">
                Propia <span class="box">{{ ($d['tipo_vivienda'] ?? '') == 'Propia' ? 'X' : '' }}</span>
                Arriendo <span class="box">{{ ($d['tipo_vivienda'] ?? '') == 'Arriendo' ? 'X' : '' }}</span>
                Familiar <span class="box">{{ ($d['tipo_vivienda'] ?? '') == 'Familiar' ? 'X' : '' }}</span>
            </td>
            <td colspan="3" class="center">
                Rural <span class="box">{{ ($d['zona_ubicacion'] ?? '') == 'Rural' ? 'X' : '' }}</span>
                Urbana <span class="box">{{ ($d['zona_ubicacion'] ?? '') == 'Urbana' ? 'X' : '' }}</span>
            </td>
        </tr>
    </table>

    <table>
        <tr>
            <td colspan="3" class="section-title">2. INFORMACIÓN FAMILIAR Y BENEFICIARIOS</td>
        </tr>
        <tr>
            <td class="label" style="width: 22%;">IDENTIFICACIÓN</td>
            <td class="label" style="width: 56%;">APELLIDOS Y NOMBRES</td>
            <td class="label" style="width: 22%;">PARENTESCO</td>
        </tr>

        @for($i = 0; $i < 4; $i++)
            <tr>
            <td>{{ $beneficiarios[$i]['identificacion'] ?? '' }}</td>
            <td>{{ $beneficiarios[$i]['nombres'] ?? '' }}</td>
            <td>{{ $beneficiarios[$i]['parentesco'] ?? '' }}</td>
            </tr>
            @endfor
    </table>

    <table>
        <tr>
            <td class="section-title">3. VOLUNTAD DE LA AFILIACIÓN Y CERTIFICACIÓN DE INFORMACIÓN</td>
        </tr>
        <tr>
            <td class="center small">
                Cuéntenos brevemente cuáles son sus motivaciones e intereses para afiliarse a ASEUNICESMAG
            </td>
        </tr>
        <tr>
            <td class="motivation">{{ $d['motivacion_afiliacion'] ?? '' }}</td>
        </tr>
    </table>

    <div class="footer">
        Carrera 20A No. 14-54, oficina Mezanine 2 edificio San Francisco UNICESMAG<br>
        aseunicesmag@gmail.com / Cel. 3185335311 - Tel: (602) 7244434 Ext. 1375
    </div>

    <div class="page-break"></div>

    <table>
        <tr>
            <td style="width: 16%; text-align:center;"></td>
            <td style="width: 48%;" class="header-title">
                ASOCIACIÓN DE EGRESADOS UNIVERSIDAD<br>
                CESMAG -ASEUNICESMAG<br>
                NIT. 900.690.317-3
            </td>
            <td style="width: 36%;" class="format-title">
                FORMATO DE AFILIACIÓN
            </td>
        </tr>
    </table>

    <br>

    <table>
        <tr>
            <td colspan="2" class="text-justify">
                Declaro mi voluntad de afiliarme a la <strong>Asociación de Egresados de la Universidad CESMAG – ASEUNICESMAG</strong>,
                comprometiéndome a cumplir sus estatutos, reglamentos y decisiones, y certifico que la información aquí registrada es veraz
            </td>
        </tr>
        <tr>
            <td class="label" style="width: 42%;">NOMBRE DEL ASOCIADO(A) QUE LO(A) REFIRIÓ</td>
            <td class="label">CUOTA DE AFILIACIÓN (PAGO ÚNICO)</td>
        </tr>
        <tr>
            <td style="height: 35px;">{{ $d['referido_por'] ?? '' }}</td>
            <td class="center">
                <strong style="font-size:14px;">$ 87.000</strong><br>
                <span class="small">
                    Una vez aceptada su afiliación se debe pagar la cuota de sostenimiento de $17.000<br>
                    mensuales (tarifa año 2026) pagaderos semestral o anual.
                </span>
            </td>
        </tr>
        <tr>
            <td colspan="2" class="signature-space">
                @if(!empty($firma))
                <img src="{{ $firma }}" class="firma-img"><br>
                @else
                _______________________________<br>
                @endif
                FIRMA DEL SOLICITANTE C.C. {{ $d['numero_documento'] ?? '' }}
            </td>
        </tr>
    </table>

    <table>
        <tr>
            <td class="section-title">4. AUTORIZACIÓN DE TRATAMIENTO DE DATOS PERSONALES</td>
        </tr>
        <tr>
            <td class="text-justify">
                De acuerdo con la Política de Tratamiento de Datos Personales de la ASOCIACIÓN DE EGRESADOS DE LA
                UNIVERSIDAD CESMAG – ASEUNICESMAG, y en cumplimiento de la Ley 1581 de 2012 y el Decreto 1377 de 2013,
                autorizo de manera libre, previa, expresa e informada el tratamiento de mis datos personales para fines relacionados
                con mi afiliación, la gestión administrativa, el cumplimiento de obligaciones legales y la comunicación de actividades y
                beneficios de la asociación.
                <br><br>
                Podré ejercer en cualquier momento mis derechos de acceso, rectificación, supresión o revocatoria de la autorización
                a través del correo: aseunicesmag@gmail.com.
                <br><br>
                <strong>Firma del titular:</strong>
                @if(!empty($firma))
                <img src="{{ $firma }}" style="height:28px; max-width:110px; vertical-align:middle;">
                @else
                _______________________
                @endif
                <br>
                <strong>C.C.:</strong> {{ $d['numero_documento'] ?? '' }}
                &nbsp;&nbsp;&nbsp;
                <strong>Fecha:</strong> {{ $d['fecha_solicitud'] ?? '' }}
            </td>
        </tr>
        <tr>
            <td>
                <strong>Anexar:</strong> Copia de cédula de ciudadanía, diploma del programa que se graduó en la UNICESMAG,
                fotografía digital y recibo de pago.
            </td>
        </tr>
    </table>

    <br>

    <table>
        <tr>
            <td colspan="3" class="section-title">5. PARA USO EXCLUSIVO DE LA ASEUNICESMAG</td>
        </tr>
        <tr>
            <td class="label" style="width: 34%;">AFILIACIÓN</td>
            <td class="label" style="width: 33%;">ACTA JUNTA DIRECTIVA</td>
            <td class="label" style="width: 33%;">AFÍLIESE A PARTIR DEL MES</td>
        </tr>
        <tr>
            <td>
                APROBADA: <span class="box"></span>
                &nbsp;&nbsp;
                RECHAZADA: <span class="box"></span>
            </td>
            <td>
                Nº. __________ &nbsp;&nbsp; FECHA: __________
            </td>
            <td></td>
        </tr>
        <tr>
            <td colspan="3" class="admin-box">
                OBSERVACIONES:
            </td>
        </tr>
        <tr>
            <td colspan="2" class="admin-box center">
                <strong>FIRMA PRESIDENTE (A) JUNTA DIRECTIVA</strong>
            </td>
            <td class="admin-box center">
                <strong>FIRMA SECRETARIO (A) JUNTA DIRECTIVA</strong>
            </td>
        </tr>
    </table>

    <div class="footer">
        Carrera 20A No. 14-54, oficina Mezanine 2 edificio San Francisco UNICESMAG<br>
        aseunicesmag@gmail.com / Cel. 3185335311 - Tel: (602) 7244434 Ext. 1375
    </div>

</body>

</html>