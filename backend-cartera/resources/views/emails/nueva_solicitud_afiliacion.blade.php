<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Nueva solicitud de afiliación</title>
</head>
<body style="margin:0; padding:0; background:#f1f5f9; font-family:Arial, Helvetica, sans-serif; color:#0f172a;">

    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9; padding:30px 12px;">
        <tr>
            <td align="center">

                <table width="100%" cellpadding="0" cellspacing="0" style="max-width:680px; background:#ffffff; border-radius:18px; overflow:hidden; box-shadow:0 12px 35px rgba(15,23,42,0.12);">

                    <tr>
                        <td style="background:linear-gradient(135deg,#1d4ed8,#0f172a); padding:32px 36px; text-align:center;">
                            <div style="display:inline-block; background:rgba(255,255,255,0.12); color:#ffffff; padding:7px 14px; border-radius:999px; font-size:12px; font-weight:bold; letter-spacing:1px; text-transform:uppercase;">
                                ASEUNICESMAG
                            </div>

                            <h1 style="margin:18px 0 8px; color:#ffffff; font-size:26px; line-height:1.3;">
                                Nueva solicitud de afiliación
                            </h1>

                            <p style="margin:0; color:#dbeafe; font-size:15px; line-height:1.6;">
                                Se ha registrado una nueva solicitud en el sistema.
                            </p>
                        </td>
                    </tr>

                    <tr>
                        <td style="padding:32px 36px;">

                            <p style="margin:0 0 24px; color:#334155; font-size:15px; line-height:1.7;">
                                Hola, administrador. Hay una nueva solicitud de afiliación pendiente por revisar en el panel administrativo.
                            </p>

                            <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:separate; border-spacing:0 10px;">
                                <tr>
                                    <td style="width:38%; background:#f8fafc; padding:13px 16px; border-radius:10px 0 0 10px; color:#64748b; font-size:13px; font-weight:bold;">
                                        Solicitante
                                    </td>
                                    <td style="background:#f8fafc; padding:13px 16px; border-radius:0 10px 10px 0; color:#0f172a; font-size:14px;">
                                        {{ $solicitud->usuario->nombres }} {{ $solicitud->usuario->apellidos }}
                                    </td>
                                </tr>

                                <tr>
                                    <td style="background:#f8fafc; padding:13px 16px; border-radius:10px 0 0 10px; color:#64748b; font-size:13px; font-weight:bold;">
                                        Documento
                                    </td>
                                    <td style="background:#f8fafc; padding:13px 16px; border-radius:0 10px 10px 0; color:#0f172a; font-size:14px;">
                                        {{ $solicitud->usuario->numero_documento }}
                                    </td>
                                </tr>

                                <tr>
                                    <td style="background:#f8fafc; padding:13px 16px; border-radius:10px 0 0 10px; color:#64748b; font-size:13px; font-weight:bold;">
                                        Correo
                                    </td>
                                    <td style="background:#f8fafc; padding:13px 16px; border-radius:0 10px 10px 0; color:#0f172a; font-size:14px;">
                                        {{ $solicitud->usuario->correo }}
                                    </td>
                                </tr>

                                <tr>
                                    <td style="background:#f8fafc; padding:13px 16px; border-radius:10px 0 0 10px; color:#64748b; font-size:13px; font-weight:bold;">
                                        Teléfono
                                    </td>
                                    <td style="background:#f8fafc; padding:13px 16px; border-radius:0 10px 10px 0; color:#0f172a; font-size:14px;">
                                        {{ $solicitud->usuario->telefono }}
                                    </td>
                                </tr>

                                <tr>
                                    <td style="background:#f8fafc; padding:13px 16px; border-radius:10px 0 0 10px; color:#64748b; font-size:13px; font-weight:bold;">
                                        Fecha de solicitud
                                    </td>
                                    <td style="background:#f8fafc; padding:13px 16px; border-radius:0 10px 10px 0; color:#0f172a; font-size:14px;">
                                        {{ $solicitud->fecha_solicitud }}
                                    </td>
                                </tr>

                                <tr>
                                    <td style="background:#f8fafc; padding:13px 16px; border-radius:10px 0 0 10px; color:#64748b; font-size:13px; font-weight:bold;">
                                        Estado
                                    </td>
                                    <td style="background:#f8fafc; padding:13px 16px; border-radius:0 10px 10px 0;">
                                        <span style="display:inline-block; background:#fef3c7; color:#92400e; padding:6px 12px; border-radius:999px; font-size:12px; font-weight:bold;">
                                            {{ $solicitud->estado }}
                                        </span>
                                    </td>
                                </tr>
                            </table>

                            <div style="margin-top:28px; padding:18px; background:#eff6ff; border-left:4px solid #1d4ed8; border-radius:12px;">
                                <p style="margin:0; color:#1e3a8a; font-size:14px; line-height:1.6;">
                                    Por favor ingrese al panel administrativo para validar la información, revisar los soportes y continuar con el proceso de aprobación.
                                </p>
                            </div>

                        </td>
                    </tr>

                    <tr>
                        <td style="background:#f8fafc; padding:20px 36px; text-align:center; border-top:1px solid #e2e8f0;">
                            <p style="margin:0; color:#64748b; font-size:12px; line-height:1.6;">
                                Este mensaje fue generado automáticamente por el sistema de afiliaciones de ASEUNICESMAG.
                            </p>
                        </td>
                    </tr>

                </table>

            </td>
        </tr>
    </table>

</body>
</html>