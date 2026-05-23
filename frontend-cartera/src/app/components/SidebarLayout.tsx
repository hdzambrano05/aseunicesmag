"use client";

import { useEffect, useRef, useState } from "react";
import {
  GraduationCap,
  LogOut,
  User,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Settings,
  Eye,
  EyeOff,
  Save,
  Loader2,
} from "lucide-react";

import { usePathname, useRouter } from "next/navigation";
import type { LucideIcon } from "lucide-react";

type UsuarioSesion = {
  id?: number;
  nombre: string;
  nombres?: string;
  apellidos?: string;
  rol: string;
  correo?: string;
  numero_documento?: string;
  telefono?: string;
};

type MenuItem = {
  label: string;
  icon: LucideIcon;
  path: string;
  badge?: number;
};

type SidebarLayoutProps = {
  children: React.ReactNode;
  titulo?: string;
  subtitulo?: string;
  menu: MenuItem[];
};

export default function SidebarLayout({
  children,
  titulo = "Panel",
  subtitulo = "Sistema ASEUNICESMAG",
  menu,
}: SidebarLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();

  const [sidebarAbierto, setSidebarAbierto] = useState(true);
  const [menuUsuario, setMenuUsuario] = useState(false);
  const [modalPerfil, setModalPerfil] = useState(false);
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [guardandoPassword, setGuardandoPassword] = useState(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const [usuario, setUsuario] = useState<UsuarioSesion>({
    nombre: "Usuario",
    rol: "Usuario",
  });

  const [formPassword, setFormPassword] = useState({
    password_actual: "",
    password: "",
    password_confirmation: "",
  });

  useEffect(() => {
    const userStorage = localStorage.getItem("usuario");

    if (userStorage) {
      try {
        const user = JSON.parse(userStorage);

        const nombres = user.nombres || "";
        const apellidos = user.apellidos || "";

        setUsuario({
          id: user.id,
          nombre: `${nombres} ${apellidos}`.trim() || user.nombre || "Usuario",
          nombres,
          apellidos,
          rol: user.rol?.nombre || user.rol || "Usuario",
          correo: user.correo || "",
          numero_documento: user.numero_documento || "",
          telefono: user.telefono || "",
        });
      } catch {
        setUsuario({
          nombre: "Usuario",
          rol: "Usuario",
        });
      }
    }
  }, []);

  useEffect(() => {
    const cerrar = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setMenuUsuario(false);
      }
    };

    document.addEventListener("mousedown", cerrar);

    return () => {
      document.removeEventListener("mousedown", cerrar);
    };
  }, []);

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    router.push("/login");
  };

  const abrirPerfil = () => {
    setMenuUsuario(false);
    setModalPerfil(true);
  };

  const limpiarPassword = () => {
    setFormPassword({
      password_actual: "",
      password: "",
      password_confirmation: "",
    });
  };

  const cambiarPassword = async () => {
    if (
      !formPassword.password_actual ||
      !formPassword.password ||
      !formPassword.password_confirmation
    ) {
      alert("Completa todos los campos.");
      return;
    }

    if (formPassword.password !== formPassword.password_confirmation) {
      alert("La nueva contraseña no coincide.");
      return;
    }

    try {
      setGuardandoPassword(true);

      const token = localStorage.getItem("token");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/perfil/cambiar-password`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formPassword),
        },
      );

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          data?.message ||
            data?.mensaje ||
            "No se pudo actualizar la contraseña",
        );
      }

      alert("Contraseña actualizada correctamente.");
      limpiarPassword();
      setModalPerfil(false);
    } catch (error: any) {
      alert(error.message || "Error al cambiar contraseña.");
    } finally {
      setGuardandoPassword(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <button
        type="button"
        onClick={() => setSidebarAbierto(true)}
        className="fixed left-4 top-4 z-50 flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-slate-700 shadow-lg ring-1 ring-slate-200 lg:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      {sidebarAbierto && (
        <div
          onClick={() => setSidebarAbierto(false)}
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen flex-col border-r border-slate-200 bg-white/95 px-4 py-5 shadow-2xl shadow-slate-900/10 backdrop-blur transition-all duration-300 lg:shadow-none ${
          sidebarAbierto
            ? "translate-x-0 lg:w-72"
            : "-translate-x-full lg:w-24 lg:translate-x-0"
        } w-72`}
      >
        <div className="mb-8 flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-600/25">
              <GraduationCap className="h-6 w-6" />
            </div>

            {sidebarAbierto && (
              <div className="min-w-0">
                <h2 className="truncate text-base font-black text-slate-900">
                  {titulo}
                </h2>
                <p className="truncate text-xs font-semibold text-slate-400">
                  {subtitulo}
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

                      if (window.innerWidth < 1024) {
                        setSidebarAbierto(false);
                      }
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

                    {sidebarAbierto && Number(item.badge) > 0 && (
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

        <div className="border-t border-slate-200 pt-4">
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setMenuUsuario(!menuUsuario)}
              className={`mb-3 flex w-full items-center gap-3 rounded-3xl bg-slate-50 p-3 ring-1 ring-slate-100 transition hover:bg-slate-100 ${
                !sidebarAbierto ? "justify-center" : "justify-between"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
                  <User className="h-5 w-5" />
                </div>

                {sidebarAbierto && (
                  <div className="min-w-0 text-left">
                    <p className="truncate text-sm font-black text-slate-800">
                      {usuario.nombre}
                    </p>

                    <p className="truncate text-xs font-semibold text-slate-500">
                      {usuario.rol}
                    </p>
                  </div>
                )}
              </div>

              {sidebarAbierto && (
                <ChevronDown
                  className={`h-4 w-4 text-slate-400 transition ${
                    menuUsuario ? "rotate-180" : ""
                  }`}
                />
              )}
            </button>

            {menuUsuario && sidebarAbierto && (
              <div className="absolute bottom-[78px] left-0 w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
                <button
                  type="button"
                  onClick={abrirPerfil}
                  className="flex w-full items-center gap-3 px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-blue-700"
                >
                  <Settings className="h-4 w-4" />
                  Mi perfil
                </button>

                <button
                  type="button"
                  onClick={cerrarSesion}
                  className="flex w-full items-center gap-3 border-t border-slate-100 px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-red-50 hover:text-red-600"
                >
                  <LogOut className="h-4 w-4" />
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>
        </div>
      </aside>

      <main
        className={`min-h-screen transition-all duration-300 ${
          sidebarAbierto ? "lg:pl-72" : "lg:pl-24"
        }`}
      >
        <div className="px-5 py-8 pt-20 lg:px-10 lg:pt-8">{children}</div>
      </main>

      {modalPerfil && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-900/40 px-4 backdrop-blur-sm">
          <div className="w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 px-7 py-5">
              <div>
                <p className="text-sm font-bold text-blue-700">Mi perfil</p>
                <h2 className="text-2xl font-black text-slate-900">
                  Información de usuario
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setModalPerfil(false)}
                className="rounded-full bg-slate-100 p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600"
              >
                <X size={20} />
              </button>
            </div>

            <div className="max-h-[75vh] space-y-6 overflow-y-auto p-7">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs font-black uppercase text-slate-400">
                    Nombre
                  </p>
                  <p className="mt-1 font-bold text-slate-900">
                    {usuario.nombre}
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs font-black uppercase text-slate-400">
                    Rol
                  </p>
                  <p className="mt-1 font-bold text-blue-700">{usuario.rol}</p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs font-black uppercase text-slate-400">
                    Documento
                  </p>
                  <p className="mt-1 font-bold text-slate-900">
                    {usuario.numero_documento || "No registra"}
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs font-black uppercase text-slate-400">
                    Correo
                  </p>
                  <p className="mt-1 break-all font-bold text-slate-900">
                    {usuario.correo || "No registra"}
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4 md:col-span-2">
                  <p className="text-xs font-black uppercase text-slate-400">
                    Teléfono
                  </p>
                  <p className="mt-1 font-bold text-slate-900">
                    {usuario.telefono || "No registra"}
                  </p>
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 p-5">
                <h3 className="text-lg font-black text-slate-900">
                  Cambiar contraseña
                </h3>

                <div className="mt-4 grid gap-4">
                  <input
                    type={mostrarPassword ? "text" : "password"}
                    placeholder="Contraseña actual"
                    value={formPassword.password_actual}
                    onChange={(e) =>
                      setFormPassword({
                        ...formPassword,
                        password_actual: e.target.value,
                      })
                    }
                    className="h-12 rounded-full border border-slate-200 bg-slate-50 px-5 text-sm font-semibold outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                  />

                  <input
                    type={mostrarPassword ? "text" : "password"}
                    placeholder="Nueva contraseña"
                    value={formPassword.password}
                    onChange={(e) =>
                      setFormPassword({
                        ...formPassword,
                        password: e.target.value,
                      })
                    }
                    className="h-12 rounded-full border border-slate-200 bg-slate-50 px-5 text-sm font-semibold outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                  />

                  <div className="relative">
                    <input
                      type={mostrarPassword ? "text" : "password"}
                      placeholder="Confirmar nueva contraseña"
                      value={formPassword.password_confirmation}
                      onChange={(e) =>
                        setFormPassword({
                          ...formPassword,
                          password_confirmation: e.target.value,
                        })
                      }
                      className="h-12 w-full rounded-full border border-slate-200 bg-slate-50 px-5 pr-12 text-sm font-semibold outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                    />

                    <button
                      type="button"
                      onClick={() => setMostrarPassword(!mostrarPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                    >
                      {mostrarPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={cambiarPassword}
                  disabled={guardandoPassword}
                  className="mt-5 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-blue-700 px-7 text-sm font-bold text-white transition hover:bg-blue-800 disabled:opacity-60"
                >
                  {guardandoPassword ? (
                    <Loader2 size={17} className="animate-spin" />
                  ) : (
                    <Save size={17} />
                  )}
                  {guardandoPassword ? "Guardando..." : "Guardar contraseña"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
