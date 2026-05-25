<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <title>Afiliación aprobada</title>
</head>

<body style="margin:0; padding:0; background:#f3f6fb; font-family:Arial, Helvetica, sans-serif;">

    <table width="100%" cellpadding="0" cellspacing="0" style="padding:35px 12px;">
        <tr>
            <td align="center">

                <table width="640" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:14px; overflow:hidden; border:1px solid #e2e8f0;">

                    <tr>
                        <td style="background:#1e3a8a; padding:26px 30px; text-align:center;">
                            <h1 style="margin:0; color:#ffffff; font-size:22px;">
                                ASEUNICESMAG
                            </h1>
                            <p style="margin:8px 0 0; color:#dbeafe; font-size:14px;">
                                Bienvenida y activación de membresía
                            </p>
                        </td>
                    </tr>

                    <tr>
                        <td style="padding:34px 36px; color:#334155;">

                            <h2 style="margin:0 0 18px; color:#0f172a; font-size:21px;">
                                Estimado(a) {{ $usuario->nombres }} {{ $usuario->apellidos }}:
                            </h2>

                            <p style="font-size:15px; line-height:1.7; margin:0 0 16px;">
                                Reciba un cordial saludo de parte de <strong>ASEUNICESMAG</strong>.
                            </p>

                            <p style="font-size:15px; line-height:1.7; margin:0 0 16px;">
                                Nos complace informarle que su solicitud de afiliación ha sido
                                <strong style="color:#15803d;">aprobada exitosamente</strong> y, a partir de la fecha,
                                usted hace parte de nuestra Asociación de Egresados de la Universidad CESMAG.
                            </p>

                            <p style="font-size:15px; line-height:1.7; margin:0 0 16px;">
                                Con su ingreso podrá acceder a beneficios institucionales, convenios,
                                descuentos comerciales, programas de educación continua, actividades de integración
                                y demás servicios ofrecidos por ASEUNICESMAG, de acuerdo con las políticas vigentes.
                            </p>

                            <p style="font-size:15px; line-height:1.7; margin:0 0 24px;">
                                Para activar plenamente su membresía y habilitar la expedición de su certificado
                                de afiliación y carné digital, deberá encontrarse al día en sus obligaciones de sostenimiento.
                            </p>

                            <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e2e8f0; border-radius:12px; margin:24px 0;">
                                <tr>
                                    <td style="padding:22px;">
                                        <h3 style="margin:0 0 12px; color:#0f172a; font-size:17px;">
                                            Información de pago
                                        </h3>

                                        <p style="font-size:14px; line-height:1.7; margin:0 0 12px; color:#475569;">
                                            Las cuotas de sostenimiento podrán realizarse de manera semestral o anual,
                                            de acuerdo con las condiciones y beneficios aplicables al asociado.
                                        </p>

                                        <p style="font-size:14px; line-height:1.7; margin:0 0 12px; color:#475569;">
                                            El detalle de valores, descuentos vigentes, estado de cuenta y liquidación
                                            podrá consultarse desde su cuenta de usuario en la plataforma institucional.
                                        </p>

                                        <p style="font-size:14px; line-height:1.7; margin:0; color:#475569;">
                                            Una vez realizado el pago, podrá cargar el comprobante directamente desde la plataforma.
                                        </p>
                                    </td>
                                </tr>
                            </table>

                            <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #dbeafe; border-radius:12px; background:#f8fbff; margin:24px 0;">
                                <tr>
                                    <td style="padding:22px;">
                                        <h3 style="margin:0 0 16px; color:#0f172a; font-size:17px;">
                                            Datos de acceso a la plataforma
                                        </h3>

                                        <p style="margin:0 0 12px; font-size:14px;">
                                            <strong>Usuario:</strong><br>
                                            <span style="color:#1d4ed8;">{{ $usuario->correo }}</span>
                                        </p>

                                        <p style="margin:0; font-size:14px;">
                                            <strong>Contraseña temporal:</strong><br>
                                            <span style="display:inline-block; margin-top:6px; background:#ffffff; border:1px solid #cbd5e1; border-radius:8px; padding:10px 14px; color:#0f172a; font-weight:bold;">
                                                {{ $passwordPlano }}
                                            </span>
                                        </p>
                                    </td>
                                </tr>
                            </table>

                            <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e2e8f0; border-radius:12px; margin:24px 0;">
                                <tr>
                                    <td style="padding:22px;">
                                        <h3 style="margin:0 0 14px; color:#0f172a; font-size:17px;">
                                            Desde su perfil podrá:
                                        </h3>

                                        <p style="margin:0 0 8px; font-size:14px; color:#475569;">• Consultar su estado de cuenta</p>
                                        <p style="margin:0 0 8px; font-size:14px; color:#475569;">• Actualizar información personal</p>
                                        <p style="margin:0 0 8px; font-size:14px; color:#475569;">• Descargar su carné digital de membresía</p>
                                        <p style="margin:0 0 8px; font-size:14px; color:#475569;">• Descargar certificado de membresía</p>
                                        <p style="margin:0 0 8px; font-size:14px; color:#475569;">• Consultar beneficios y convenios vigentes</p>
                                        <p style="margin:0; font-size:14px; color:#475569;">• Consultar documentos institucionales, estatutos, Código de Ética y Gobierno Corporativo</p>
                                    </td>
                                </tr>
                            </table>

                            <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9; border-radius:12px; margin:24px 0;">
                                <tr>
                                    <td style="padding:18px 22px;">
                                        <p style="margin:0; font-size:14px; color:#334155; line-height:1.6;">
                                            <strong>Documentos institucionales:</strong><br>
                                            <a href="https://aseunicesmag.org/transparencia/" style="color:#1d4ed8; text-decoration:none;">
                                                https://aseunicesmag.org/transparencia/
                                            </a>
                                        </p>
                                    </td>
                                </tr>
                            </table>

                            <p style="font-size:14px; line-height:1.7; color:#64748b; margin:22px 0;">
                                Por seguridad, le recomendamos cambiar su contraseña una vez ingrese al sistema.
                            </p>

                            <div style="text-align:center; margin:30px 0;">
                                <a href="http://localhost:3000/login"
                                    style="display:inline-block; background:#1e3a8a; color:#ffffff; padding:13px 28px; text-decoration:none; border-radius:8px; font-weight:bold; font-size:14px;">
                                    Ingresar a la plataforma
                                </a>
                            </div>

                            <p style="font-size:15px; line-height:1.7; margin:0 0 26px;">
                                Agradecemos su confianza y le damos la bienvenida a nuestra comunidad de egresados.
                            </p>

                            <p style="margin:0; font-size:15px; color:#0f172a;">
                                Cordialmente,
                            </p>

                            <p style="margin:18px 0 4px; font-size:16px; font-weight:bold; color:#1e3a8a;">
                                YIGDA C. LÓPEZ MARROQUÍN
                            </p>

                            <p style="margin:0; font-size:14px; color:#64748b;">
                                Directora General y Representante Legal
                            </p>

                            <p style="margin:4px 0 0; font-size:14px; color:#64748b;">
                                ASEUNICESMAG
                            </p>

                        </td>
                    </tr>

                    <tr>
                        <td style="background:#f8fafc; padding:18px; text-align:center; border-top:1px solid #e2e8f0;">
                            <p style="margin:0; font-size:12px; color:#64748b;">
                                © {{ date('Y') }} ASEUNICESMAG - Todos los derechos reservados
                            </p>
                        </td>
                    </tr>

                </table>

            </td>
        </tr>
    </table>

</body>

</html>