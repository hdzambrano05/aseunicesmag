"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardUsuario() {
  const router = useRouter();
  const [usuario, setUsuario] = useState<any>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const user =
      localStorage.getItem("usuario") || sessionStorage.getItem("usuario");

    if (!user) {
      router.replace("/login");
      return;
    }

    try {
      const data = JSON.parse(user);

      const rol = data.rol?.nombre?.toUpperCase();
      const estadoMembresia = data.asociado?.estado_membresia?.toUpperCase();

      if (rol !== "ASOCIADO" || estadoMembresia !== "ACTIVO") {
        localStorage.removeItem("token");
        localStorage.removeItem("usuario");
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("usuario");
        router.replace("/login");
        return;
      }

      setUsuario(data);
    } catch {
      localStorage.removeItem("token");
      localStorage.removeItem("usuario");
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("usuario");
      router.replace("/login");
    } finally {
      setCargando(false);
    }
  }, [router]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("usuario");
    router.replace("/login");
  };

  if (cargando) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-100">
        <div className="rounded-2xl border border-slate-200 bg-white px-8 py-6 shadow-lg">
          <p className="text-sm font-semibold text-slate-600">Cargando...</p>
        </div>
      </main>
    );
  }

  if (!usuario) {
    return null;
  }

  return (
    <main className="min-h-screen bg-slate-100">
      <div className="flex min-h-screen">
        <aside className="hidden w-72 flex-col border-r border-slate-200 bg-slate-950 px-6 py-8 text-white lg:flex">
          <div className="mb-10">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-lg font-black text-slate-950">
              A
            </div>

            <h2 className="mt-4 text-xl font-black tracking-wide">
              ASEUNICESMAG
            </h2>
            <p className="mt-1 text-sm text-slate-400">Panel de asociado</p>
          </div>

          <nav className="flex flex-1 flex-col gap-2">
            <a
              href="/user/dashboard"
              className="rounded-xl bg-white px-4 py-3 text-sm font-bold text-slate-950 shadow-sm"
            >
              Dashboard
            </a>

            <a
              href="#"
              className="rounded-xl px-4 py-3 text-sm font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white"
            >
              Pagos
            </a>

            <a
              href="#"
              className="rounded-xl px-4 py-3 text-sm font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white"
            >
              Certificados
            </a>

            <a
              href="#"
              className="rounded-xl px-4 py-3 text-sm font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white"
            >
              Perfil
            </a>
          </nav>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              Sesión activa
            </p>
            <p className="mt-1 truncate text-sm font-bold text-white">
              {usuario.correo}
            </p>
          </div>
        </aside>

        <section className="flex-1 px-4 py-6 sm:px-6 lg:px-10">
          <header className="mb-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-black uppercase tracking-wider text-emerald-700">
                  Asociado activo
                </span>

                <h1 className="mt-4 text-3xl font-black text-slate-950">
                  Bienvenida, {usuario.nombres}
                </h1>

                <p className="mt-1 text-sm font-medium text-slate-500">
                  Consulta tu información, pagos, certificados y datos de perfil.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Correo registrado
                </p>
                <p className="mt-1 text-sm font-bold text-slate-800">
                  {usuario.correo}
                </p>
              </div>
            </div>
          </header>

          <div className="grid gap-5 md:grid-cols-3">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                ✓
              </div>

              <h3 className="text-sm font-black uppercase tracking-wider text-slate-400">
                Estado
              </h3>

              <p className="mt-3 text-2xl font-black text-emerald-600">
                {usuario.asociado?.estado_membresia}
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
                #
              </div>

              <h3 className="text-sm font-black uppercase tracking-wider text-slate-400">
                Código
              </h3>

              <p className="mt-3 text-2xl font-black text-slate-900">
                {usuario.asociado?.codigo_asociado || "No registrado"}
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-700">
                @
              </div>

              <h3 className="text-sm font-black uppercase tracking-wider text-slate-400">
                Correo
              </h3>

              <p className="mt-3 break-words text-base font-bold text-slate-900">
                {usuario.correo}
              </p>
            </div>
          </div>

          <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-xl font-black text-slate-950">
                  Accesos rápidos
                </h2>
                <p className="mt-1 text-sm font-medium text-slate-500">
                  Gestiona tus servicios como asociado.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href="#"
                  className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-100"
                >
                  Ver pagos
                </a>

                <a
                  href="#"
                  className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-100"
                >
                  Certificados
                </a>

                <a
                  href="#"
                  className="rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
                >
                  Editar perfil
                </a>
              </div>
            </div>
          </section>

          <div className="mt-8 flex justify-end">
            <button
              onClick={logout}
              className="rounded-xl bg-red-600 px-6 py-3 text-sm font-black text-white shadow-sm transition hover:bg-red-700 hover:shadow-md"
            >
              Cerrar sesión
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}