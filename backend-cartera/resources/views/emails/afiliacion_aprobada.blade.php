<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Afiliación aprobada</title>
</head>
<body style="margin:0; padding:0; background:#f4f6f9; font-family:Arial, sans-serif;">

    <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
        <tr>
            <td align="center">

                <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.05);">

                    <!-- HEADER -->
                    <tr>
                        <td style="background:#1e293b; padding:20px; text-align:center;">
                            <h1 style="color:#ffffff; margin:0; font-size:20px;">
                                ASEUNICESMAG
                            </h1>
                        </td>
                    </tr>

                    <!-- CONTENIDO -->
                    <tr>
                        <td style="padding:30px; color:#334155;">

                            <h2 style="margin-top:0; color:#0f172a;">
                                Hola {{ $usuario->nombres }} {{ $usuario->apellidos }}
                            </h2>

                            <p style="font-size:15px; line-height:1.6;">
                                Nos complace informarte que tu afiliación ha sido 
                                <strong style="color:#16a34a;">aprobada exitosamente</strong>.
                            </p>

                            <!-- TARJETA -->
                            <div style="background:#f8fafc; border-radius:10px; padding:20px; margin:25px 0;">

                                <h3 style="margin-top:0; color:#0f172a;">Datos de acceso</h3>

                                <p style="margin:10px 0;">
                                    <strong>Usuario:</strong><br>
                                    <span style="color:#2563eb;">{{ $usuario->correo }}</span>
                                </p>

                                <p style="margin:10px 0;">
                                    <strong>Contraseña:</strong><br>
                                    <span style="color:#0f172a;">{{ $passwordPlano }}</span>
                                </p>

                            </div>

                            <p style="font-size:14px; color:#64748b;">
                                Por seguridad, te recomendamos cambiar tu contraseña una vez ingreses al sistema.
                            </p>

                            <!-- BOTÓN -->
                            <div style="text-align:center; margin:30px 0;">
                                <a href="http://localhost:3000/login"
                                   style="background:#2563eb; color:#ffffff; padding:12px 25px; text-decoration:none; border-radius:8px; font-weight:bold;">
                                    Ingresar al sistema
                                </a>
                            </div>

                            <p style="font-size:14px; color:#64748b;">
                                Bienvenido(a) a ASEUNICESMAG 🎉
                            </p>

                        </td>
                    </tr>

                    <!-- FOOTER -->
                    <tr>
                        <td style="background:#f1f5f9; padding:15px; text-align:center; font-size:12px; color:#64748b;">
                            © {{ date('Y') }} ASEUNICESMAG - Todos los derechos reservados
                        </td>
                    </tr>

                </table>

            </td>
        </tr>
    </table>

</body>
</html>