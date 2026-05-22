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
  Sparkles,
  UserRoundCheck,
  Building2,
} from "lucide-react";
import Link from "next/link";

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
          : "No se pudo iniciar sesión.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen overflow-hidden bg-[#eef5ff]">
      {/* FONDO */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 top-0 h-[500px] w-[500px] rounded-full bg-blue-300/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[450px] w-[450px] rounded-full bg-cyan-300/20 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#21409A]/10 blur-3xl" />
      </div>

      {/* LADO IZQUIERDO */}
      <section className="relative hidden w-1/2 overflow-hidden bg-[#071f4d] lg:flex">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#071f4d,#21409A,#1D4ED8,#0EA5E9)]" />

        {/* FIGURAS */}
        <div className="absolute -left-40 top-10 h-[550px] w-[550px] rounded-full border-[80px] border-white/10" />
        <div className="absolute bottom-[-120px] left-10 h-[340px] w-[340px] rounded-full bg-white/10 backdrop-blur-2xl" />
        <div className="absolute right-10 top-28 h-[200px] w-[200px] rounded-full bg-cyan-300/20 backdrop-blur-2xl" />
        <div className="absolute -right-16 bottom-20 h-[240px] w-[240px] rounded-full border-[40px] border-white/10" />

        <div className="relative z-10 flex h-full flex-col justify-between p-16 text-white">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-black backdrop-blur">
              <ShieldCheck size={17} />
              Portal seguro ASEUNICESMAG
            </span>

            <h1 className="mt-14 max-w-2xl text-7xl font-black leading-[0.95] tracking-tight">
              Bienvenido a tu plataforma institucional
            </h1>

            <p className="mt-8 max-w-xl text-xl leading-9 text-blue-50">
              Ingresa para gestionar tus procesos, consultar información,
              revisar beneficios y acceder a los servicios digitales.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-5">
            {[
              ["Seguro", ShieldCheck],
              ["Asociados", UserRoundCheck],
              ["Gestión", Building2],
            ].map(([titulo, Icono]: any) => (
              <div
                key={titulo}
                className="rounded-[2rem] border border-white/15 bg-white/10 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:bg-white/15"
              >
                <Icono className="h-8 w-8 text-cyan-100" />

                <p className="mt-6 text-lg font-black">{titulo}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LOGIN */}
      <section className="relative flex w-full items-center justify-center overflow-hidden bg-white lg:w-1/2">
        {/* FIGURAS */}
        <div className="absolute right-0 top-0 h-72 w-72 rounded-bl-full bg-[#21409A]/8" />
        <div className="absolute bottom-0 left-0 h-80 w-80 rounded-tr-full bg-cyan-200/30" />
        <div className="absolute left-20 top-20 h-32 w-32 rounded-full bg-blue-100/60 blur-2xl" />

        <div className="relative z-10 w-full max-w-xl px-8">
          <div className="mb-10">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#eaf2ff] px-5 py-2 text-sm font-black text-[#21409A]">
              <Sparkles size={16} />
              Inicio de sesión
            </span>

            <h2 className="mt-7 text-6xl font-black tracking-tight text-[#07122f]">
              Sign in
            </h2>

            <p className="mt-4 text-lg leading-8 text-[#52607c]">
              Ingresa tus credenciales para continuar.
            </p>
          </div>

          {error && (
            <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-bold text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={iniciarSesion} className="space-y-6">
            <div className="relative">
              <Mail className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-[#21409A]" />

              <input
                type="email"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                placeholder="Correo electrónico"
                required
                className="h-16 w-full rounded-3xl border border-transparent bg-[#f1f5fb] pl-14 pr-5 text-base font-bold text-[#07122f] outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-[#21409A] focus:bg-white focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <div className="relative">
              <LockKeyhole className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-[#21409A]" />

              <input
                type={verPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña"
                required
                className="h-16 w-full rounded-3xl border border-transparent bg-[#f1f5fb] pl-14 pr-14 text-base font-bold text-[#07122f] outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-[#21409A] focus:bg-white focus:ring-4 focus:ring-blue-100"
              />

              <button
                type="button"
                onClick={() => setVerPassword(!verPassword)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-[#21409A]"
              >
                {verPassword ? (
                  <EyeOff size={22} />
                ) : (
                  <Eye size={22} />
                )}
              </button>
            </div>


            <button
              type="submit"
              disabled={loading}
              className="group flex h-16 w-full items-center justify-center gap-3 rounded-3xl bg-gradient-to-r from-[#071f4d] via-[#21409A] to-[#0EA5E9] text-lg font-black text-white shadow-2xl shadow-blue-900/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-blue-900/40 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Ingresando...
                </>
              ) : (
                <>
                  Ingresar
                  <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>

          <div className="my-10 flex items-center gap-4">
            <div className="h-px flex-1 bg-slate-200" />

            <span className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">
              ASEUNICESMAG
            </span>

            <div className="h-px flex-1 bg-slate-200" />
          </div>

          <p className="text-center text-base text-[#52607c]">
            ¿Aún no estás afiliado?{" "}
            <Link
              href="/afiliacion"
              className="font-black text-[#21409A] hover:text-[#071f4d]"
            >
              Solicita tu afiliación
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}