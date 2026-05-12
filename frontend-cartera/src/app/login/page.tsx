"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ArrowRight,
  GraduationCap,
  ShieldCheck,
  Sparkles,
  Loader2,
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
        body: JSON.stringify({
          correo,
          password,
        }),
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
      <main className="relative min-h-screen overflow-hidden bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#2563eb66,transparent_35%),radial-gradient(circle_at_bottom_right,#38bdf866,transparent_35%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:48px_48px]" />

        <section className="relative z-10 grid min-h-screen lg:grid-cols-[1.05fr_.95fr]">
          <div className="hidden flex-col justify-between px-14 py-12 text-white lg:flex">
            <Link href="/home" className="flex w-fit items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white ring-1 ring-white/15 backdrop-blur">
                <GraduationCap className="h-7 w-7" />
              </div>

              <div>
                <h1 className="text-lg font-black tracking-tight">
                  ASEUNICESMAG
                </h1>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-100">
                  Asociación de Egresados
                </p>
              </div>
            </Link>

            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold text-blue-100 backdrop-blur">
                <Sparkles className="h-4 w-4" />
                Portal institucional seguro
              </span>

              <h2 className="mt-8 text-5xl font-black leading-tight tracking-tight">
                Bienvenido al espacio digital de tus beneficios y servicios.
              </h2>

              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
                Ingresa para consultar tu estado de afiliación, gestionar
                documentos, revisar pagos y acceder a los servicios disponibles
                para asociados.
              </p>

              <div className="mt-10 grid max-w-xl grid-cols-3 gap-4">
                <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur">
                  <ShieldCheck className="mb-3 h-6 w-6 text-blue-200" />
                  <p className="text-sm font-black">Acceso seguro</p>
                  <p className="mt-1 text-xs text-slate-300">
                    Protección por token
                  </p>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur">
                  <LockKeyhole className="mb-3 h-6 w-6 text-blue-200" />
                  <p className="text-sm font-black">Roles activos</p>
                  <p className="mt-1 text-xs text-slate-300">
                    Admin y asociado
                  </p>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur">
                  <GraduationCap className="mb-3 h-6 w-6 text-blue-200" />
                  <p className="text-sm font-black">Egresados</p>
                  <p className="mt-1 text-xs text-slate-300">
                    Gestión integral
                  </p>
                </div>
              </div>
            </div>

            <p className="text-xs font-medium text-slate-400">
              © ASEUNICESMAG — Plataforma de gestión de afiliados.
            </p>
          </div>

          <div className="flex items-center justify-center px-5 py-10">
            <div className="w-full max-w-md">
              <div className="mb-7 text-center lg:hidden">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-white ring-1 ring-white/15">
                  <GraduationCap className="h-8 w-8" />
                </div>
                <h1 className="text-2xl font-black text-white">ASEUNICESMAG</h1>
                <p className="mt-1 text-sm text-slate-300">
                  Asociación de Egresados
                </p>
              </div>

              <div className="rounded-[2rem] border border-white/15 bg-white/95 p-7 shadow-2xl shadow-blue-950/40 backdrop-blur-xl md:p-9">
                <div className="mb-8">
                  <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-black uppercase tracking-wide text-blue-700">
                    Inicio de sesión
                  </span>

                  <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-900">
                    Accede a tu cuenta
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Ingresa tus credenciales para continuar al panel
                    correspondiente.
                  </p>
                </div>

                {error && (
                  <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
                    {error}
                  </div>
                )}

                <form onSubmit={iniciarSesion} className="space-y-5">
                  <div>
                    <label className="mb-2 block text-sm font-black text-slate-700">
                      Correo electrónico
                    </label>

                    <div className="relative">
                      <Mail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                      <input
                        type="email"
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                        placeholder="usuario@correo.com"
                        required
                        className="h-13 w-full rounded-2xl border border-slate-200 bg-slate-50 py-4 pl-12 pr-4 text-sm font-semibold text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <label className="block text-sm font-black text-slate-700">
                        Contraseña
                      </label>

                      <Link
                        href="/recuperar-password"
                        className="text-xs font-bold text-blue-600 hover:text-blue-700"
                      >
                        ¿Olvidaste tu contraseña?
                      </Link>
                    </div>

                    <div className="relative">
                      <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                      <input
                        type={verPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Ingresa tu contraseña"
                        required
                        className="h-13 w-full rounded-2xl border border-slate-200 bg-slate-50 py-4 pl-12 pr-12 text-sm font-semibold text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                      />

                      <button
                        type="button"
                        onClick={() => setVerPassword(!verPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-blue-600"
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
                    className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-4 text-sm font-black text-white shadow-xl shadow-blue-600/25 transition hover:-translate-y-0.5 hover:shadow-2xl disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Validando acceso...
                      </>
                    ) : (
                      <>
                        Ingresar al sistema
                        <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                </form>

                <div className="mt-7 rounded-2xl bg-slate-50 p-4 text-center">
                  <p className="text-sm text-slate-500">
                    ¿Aún no tienes cuenta?{" "}
                    <Link
                      href="/user/afiliacion"
                      className="font-black text-blue-600 hover:text-blue-700"
                    >
                      Inicia tu afiliación
                    </Link>
                  </p>
                </div>
              </div>

              <p className="mt-6 text-center text-xs font-medium text-slate-400">
                Acceso protegido para usuarios autorizados.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
