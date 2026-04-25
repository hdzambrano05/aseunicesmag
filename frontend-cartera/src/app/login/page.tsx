"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type RolLogin = {
  id: number;
  nombre: string;
};

type UsuarioLogin = {
  id: number;
  nombres: string;
  apellidos: string;
  correo: string;
  estado_cuenta: string;
  rol?: RolLogin;
};

type LoginResponse = {
  ok: boolean;
  message: string;
  data?: {
    token: string;
    usuario: UsuarioLogin;
  };
  errors?: Record<string, string[]>;
};

export default function LoginPage() {
  const router = useRouter();

  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [recordarme, setRecordarme] = useState(true);
  const [loading, setLoading] = useState(false);
  const [mensajeGeneral, setMensajeGeneral] = useState("");
  const [errores, setErrores] = useState<{
    correo?: string;
    password?: string;
  }>({});

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const formularioValido = useMemo(() => {
    return correo.trim() !== "" && password.trim() !== "";
  }, [correo, password]);

  const validarFormulario = () => {
    const nuevosErrores: { correo?: string; password?: string } = {};

    if (!correo.trim()) {
      nuevosErrores.correo = "El correo es obligatorio.";
    }

    if (!password.trim()) {
      nuevosErrores.password = "La contraseña es obligatoria.";
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const guardarSesion = (token: string, usuario: UsuarioLogin) => {
    if (recordarme) {
      localStorage.setItem("token", token);
      localStorage.setItem("usuario", JSON.stringify(usuario));
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("usuario");
    } else {
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("usuario", JSON.stringify(usuario));
      localStorage.removeItem("token");
      localStorage.removeItem("usuario");
    }
  };

  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMensajeGeneral("");
    setErrores({});

    if (!validarFormulario()) return;

    if (!apiUrl) {
      setMensajeGeneral("No se encontró la URL de la API.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${apiUrl}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          correo: correo.trim(),
          password,
        }),
      });

      const data: LoginResponse = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "No fue posible iniciar sesión.");
      }

      if (!data?.data?.token || !data?.data?.usuario) {
        throw new Error("La respuesta del servidor no es válida.");
      }

      guardarSesion(data.data.token, data.data.usuario);
      router.push("/admin/dashboard");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setMensajeGeneral(error.message);
      } else {
        setMensajeGeneral("Ocurrió un error al iniciar sesión.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-100 px-6">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-slate-900">Iniciar sesión</h1>
          <p className="mt-2 text-slate-600">
            Ingresa con tu correo institucional y contraseña
          </p>
        </div>

        <div className="rounded-3xl bg-white p-8 shadow-xl">
          <form onSubmit={login} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Correo
              </label>
              <input
                type="email"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                placeholder="admin@correo.com"
                className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
              />
              {errores.correo && (
                <p className="mt-2 text-sm text-red-600">{errores.correo}</p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={mostrarPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="********"
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 pr-24 text-slate-900 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                />
                <button
                  type="button"
                  onClick={() => setMostrarPassword(!mostrarPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-600"
                >
                  {mostrarPassword ? "Ocultar" : "Mostrar"}
                </button>
              </div>
              {errores.password && (
                <p className="mt-2 text-sm text-red-600">{errores.password}</p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-slate-600">
                <input
                  type="checkbox"
                  checked={recordarme}
                  onChange={(e) => setRecordarme(e.target.checked)}
                />
                Recordarme
              </label>

              <span className="text-sm text-slate-600">
                ¿Olvidaste tu contraseña?
              </span>
            </div>

            {mensajeGeneral && (
              <div className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">
                {mensajeGeneral}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !formularioValido}
              className="w-full rounded-2xl bg-slate-900 py-3 text-white font-semibold hover:bg-slate-800 disabled:opacity-60"
            >
              {loading ? "Ingresando..." : "Ingresar"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
