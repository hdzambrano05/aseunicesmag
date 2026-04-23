"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type UsuarioLogin = {
  id: number;
  nombres: string;
  apellidos: string;
  correo: string;
  estado_cuenta: string;
};

export default function DashboardPage() {
  const router = useRouter();
  const [usuario, setUsuario] = useState<UsuarioLogin | null>(null);

  useEffect(() => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    const usuarioGuardado =
      localStorage.getItem("usuario") || sessionStorage.getItem("usuario");

    if (!token) {
      router.push("/login");
      return;
    }

    if (usuarioGuardado) {
      setUsuario(JSON.parse(usuarioGuardado));
    }
  }, [router]);

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("usuario");
    router.push("/login");
  };

  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between rounded-3xl bg-white p-6 shadow">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
            <p className="mt-1 text-slate-500">
              Bienvenida al sistema ASEUNICESMAG
            </p>
          </div>

          <button
            onClick={cerrarSesion}
            className="rounded-xl bg-red-600 px-4 py-2 text-white font-medium hover:bg-red-700"
          >
            Cerrar sesión
          </button>
        </div>

        {usuario && (
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl bg-white p-6 shadow">
              <p className="text-sm text-slate-500">Usuario</p>
              <h2 className="mt-2 text-xl font-bold text-slate-900">
                {usuario.nombres} {usuario.apellidos}
              </h2>
              <p className="mt-2 text-slate-600">{usuario.correo}</p>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow">
              <p className="text-sm text-slate-500">Estado</p>
              <h2 className="mt-2 text-xl font-bold text-green-600">
                {usuario.estado_cuenta}
              </h2>
              <p className="mt-2 text-slate-600">Cuenta habilitada</p>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow">
              <p className="text-sm text-slate-500">Sesión</p>
              <h2 className="mt-2 text-xl font-bold text-slate-900">Activa</h2>
              <p className="mt-2 text-slate-600">
                Acceso correcto al panel administrativo
              </p>
            </div>
          </div>
        )}

        <div className="mt-6 rounded-3xl bg-white p-6 shadow">
          <h3 className="text-xl font-bold text-slate-900 mb-4">
            Módulos del sistema
          </h3>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-slate-200 p-4">
              <p className="font-semibold text-slate-900">Usuarios</p>
              <p className="mt-1 text-sm text-slate-500">
                Administración de accesos
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 p-4">
              <p className="font-semibold text-slate-900">Asociados</p>
              <p className="mt-1 text-sm text-slate-500">
                Gestión de afiliados y membresía
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 p-4">
              <p className="font-semibold text-slate-900">Obligaciones</p>
              <p className="mt-1 text-sm text-slate-500">
                Control de cartera y pagos
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 p-4">
              <p className="font-semibold text-slate-900">Reportes</p>
              <p className="mt-1 text-sm text-slate-500">
                Exportación y auditoría
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
