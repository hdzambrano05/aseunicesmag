"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ArrowRight,
  Loader2,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import Navbar from "../components/Navbar";

export default function LoginPage() {
  const router = useRouter();

  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [verPassword, setVerPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const iniciarSesion = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const res = await fetch(`${apiUrl}/login`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ correo, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Credenciales incorrectas.");
      }

      localStorage.setItem("token", data.data.token);
      localStorage.setItem("usuario", JSON.stringify(data.data.usuario));

      const rol = data.data.usuario?.rol?.nombre?.toLowerCase();

      if (rol?.includes("admin")) {
        router.push("/admin/dashboard");
      } else {
        router.push("/user/dashboard");
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "No se pudo iniciar sesión. Intenta nuevamente.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#f4f7fb]">
        <section className="mx-auto grid min-h-[calc(100vh-80px)] max-w-7xl items-center gap-10 px-6 py-12 lg:grid-cols-[1fr_460px]">
          {/* IZQUIERDA */}
          <div className="hidden lg:block">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-bold text-blue-800 shadow-sm">
              <ShieldCheck className="h-4 w-4" />
              Portal seguro ASEUNICESMAG
            </div>

            <h1 className="mt-8 max-w-3xl text-5xl font-black leading-tight tracking-tight text-slate-950">
              Acceso institucional para asociados y administradores
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              Ingresa a la plataforma para consultar información, gestionar
              procesos, revisar pagos y administrar servicios de la asociación.
            </p>

            <div className="mt-10 grid max-w-2xl grid-cols-3 gap-4">
              {[
                ["Seguro", "Acceso protegido"],
                ["Roles", "Control por perfil"],
                ["Digital", "Gestión centralizada"],
              ].map(([titulo, texto]) => (
                <div
                  key={titulo}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <p className="text-lg font-black text-blue-900">{titulo}</p>
                  <p className="mt-1 text-sm text-slate-500">{texto}</p>
                </div>
              ))}
            </div>
          </div>

          {/* FORMULARIO */}
          <div className="w-full rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/70">
            <div className="mb-8">
              <p className="text-sm font-black uppercase tracking-widest text-blue-800">
                Inicio de sesión
              </p>

              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">
                Bienvenido
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Ingresa tus credenciales para continuar.
              </p>
            </div>

            {error && (
              <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
                {error}
              </div>
            )}

            <form onSubmit={iniciarSesion} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  Correo electrónico
                </label>

                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                  <input
                    type="email"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    placeholder="usuario@correo.com"
                    required
                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-12 pr-4 text-sm font-semibold text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-700 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  />
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="block text-sm font-bold text-slate-700">
                    Contraseña
                  </label>

                  <Link
                    href="/recuperar-password"
                    className="text-xs font-bold text-blue-700 hover:text-blue-900"
                  >
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>

                <div className="relative">
                  <LockKeyhole className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                  <input
                    type={verPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Ingresa tu contraseña"
                    required
                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-12 pr-12 text-sm font-semibold text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-700 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  />

                  <button
                    type="button"
                    onClick={() => setVerPassword(!verPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-blue-700"
                  >
                    {verPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-800 text-sm font-black text-white shadow-lg shadow-blue-900/20 transition hover:bg-blue-900 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Ingresando...
                  </>
                ) : (
                  <>
                    Ingresar
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-7 border-t border-slate-200 pt-6 text-center">
              <p className="text-sm text-slate-500">
                ¿Aún no estás afiliado?{" "}
                <Link
                  href="/afiliacion"
                  className="font-black text-blue-800 hover:text-blue-900"
                >
                  Solicita tu afiliación
                </Link>
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
