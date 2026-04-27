"use client";

import { useEffect, useState } from "react";
import {
  GraduationCap,
  ClipboardCheck,
  FolderOpen,
  Settings,
  LogOut,
  User,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

type UsuarioSesion = {
  nombre: string;
  rol: string;
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const [sidebarAbierto, setSidebarAbierto] = useState(true);
  const [usuario, setUsuario] = useState<UsuarioSesion>({
    nombre: "Usuario",
    rol: "Administrador",
  });

  useEffect(() => {
    const userStorage = localStorage.getItem("usuario");

    if (userStorage) {
      try {
        const user = JSON.parse(userStorage);

        setUsuario({
          nombre:
            `${user.nombres || ""} ${user.apellidos || ""}`.trim() ||
            user.nombre ||
            "Usuario",
          rol: user.rol?.nombre || user.rol || "Administrador",
        });
      } catch {
        setUsuario({
          nombre: "Usuario",
          rol: "Administrador",
        });
      }
    }
  }, []);

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    router.push("/login");
  };

  const menu = [
    {
      label: "Verificación",
      icon: ClipboardCheck,
      path: "/admin/dashboard",
      badge: 3,
    },
    {
      label: "Expedientes",
      icon: FolderOpen,
      path: "/admin/expedientes",
    },
    {
      label: "Configuración",
      icon: Settings,
      path: "/admin/configuracion",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100">
      {/* BOTÓN MOBILE */}
      <button
        type="button"
        onClick={() => setSidebarAbierto(true)}
        className="fixed left-4 top-4 z-50 flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-slate-700 shadow-lg ring-1 ring-slate-200 lg:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* FONDO MOBILE */}
      {sidebarAbierto && (
        <div
          onClick={() => setSidebarAbierto(false)}
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen flex-col border-r border-slate-200 bg-white/95 px-4 py-5 shadow-2xl shadow-slate-900/10 backdrop-blur transition-all duration-300 lg:shadow-none ${
          sidebarAbierto
            ? "translate-x-0 lg:w-72"
            : "-translate-x-full lg:w-24 lg:translate-x-0"
        } w-72`}
      >
        {/* HEADER SIDEBAR */}
        <div className="mb-8 flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-600/25">
              <GraduationCap className="h-6 w-6" />
            </div>

            {sidebarAbierto && (
              <div className="min-w-0">
                <h2 className="truncate text-base font-black text-slate-900">
                  Panel Admin
                </h2>
                <p className="truncate text-xs font-semibold text-slate-400">
                  Gestión de afiliados
                </p>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => setSidebarAbierto(false)}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* BOTÓN COLAPSAR DESKTOP */}
        <button
          type="button"
          onClick={() => setSidebarAbierto(!sidebarAbierto)}
          className="absolute -right-4 top-7 hidden h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-md transition hover:bg-blue-50 hover:text-blue-700 lg:flex"
        >
          {sidebarAbierto ? (
            <ChevronLeft className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </button>

        {/* MENÚ */}
        <nav className="flex-1">
          <p
            className={`mb-3 px-3 text-[11px] font-black uppercase tracking-[0.18em] text-slate-400 ${
              !sidebarAbierto && "hidden"
            }`}
          >
            Menú principal
          </p>

          <ul className="space-y-2">
            {menu.map((item) => {
              const Icon = item.icon;
              const activo =
                pathname === item.path || pathname.startsWith(item.path + "/");

              return (
                <li key={item.path}>
                  <button
                    type="button"
                    onClick={() => {
                      router.push(item.path);
                      if (window.innerWidth < 1024) setSidebarAbierto(false);
                    }}
                    title={!sidebarAbierto ? item.label : undefined}
                    className={`group flex w-full items-center rounded-2xl px-4 py-3 text-sm font-black transition ${
                      sidebarAbierto ? "justify-between" : "justify-center"
                    } ${
                      activo
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-600/20"
                        : "text-slate-500 hover:bg-slate-100 hover:text-blue-700"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <Icon className="h-5 w-5 shrink-0" />
                      {sidebarAbierto && <span>{item.label}</span>}
                    </span>

                    {sidebarAbierto && item.badge && (
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-black ${
                          activo
                            ? "bg-white/20 text-white"
                            : "bg-blue-600 text-white"
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* USUARIO */}
        <div className="border-t border-slate-200 pt-4">
          <div
            className={`mb-3 flex items-center gap-3 rounded-3xl bg-slate-50 p-3 ring-1 ring-slate-100 ${
              !sidebarAbierto && "justify-center"
            }`}
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
              <User className="h-5 w-5" />
            </div>

            {sidebarAbierto && (
              <div className="min-w-0">
                <p className="truncate text-sm font-black text-slate-800">
                  {usuario.nombre}
                </p>
                <p className="truncate text-xs font-semibold text-slate-500">
                  {usuario.rol}
                </p>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={cerrarSesion}
            title={!sidebarAbierto ? "Cerrar sesión" : undefined}
            className={`flex w-full items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-black text-slate-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 ${
              !sidebarAbierto && "justify-center px-0"
            }`}
          >
            <LogOut className="h-5 w-5 shrink-0" />
            {sidebarAbierto && <span>Cerrar sesión</span>}
          </button>
        </div>
      </aside>

      {/* CONTENIDO */}
      <main
        className={`min-h-screen transition-all duration-300 ${
          sidebarAbierto ? "lg:pl-72" : "lg:pl-24"
        }`}
      >
        <div className="px-5 py-8 pt-20 lg:px-10 lg:pt-8">{children}</div>
      </main>
    </div>
  );
}
