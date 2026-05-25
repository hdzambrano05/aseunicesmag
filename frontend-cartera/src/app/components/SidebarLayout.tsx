"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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

import { useAutoLogout } from "@/hooks/useAutoLogout";
import ProtectedRoute from "@/components/ProtectedRoute";

type RolUsuario =
  | string
  | {
      id: number;
      nombre: string;
      descripcion?: string;
      estado?: number;
    };

type UsuarioSesion = {
  id?: number;
  nombre?: string;
  nombres?: string;
  apellidos?: string;
  correo?: string;
  numero_documento?: string;
  telefono?: string;
  rol?: RolUsuario;
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

export default function SidebarLayout({ children, menu }: SidebarLayoutProps) {
  useAutoLogout();

  const pathname = usePathname();
  const router = useRouter();

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [perfilOpen, setPerfilOpen] = useState(false);
  const [modalConfigOpen, setModalConfigOpen] = useState(false);

  const [usuario, setUsuario] = useState<UsuarioSesion | null>(null);

  const [formPerfil, setFormPerfil] = useState({
    nombres: "",
    apellidos: "",
    correo: "",
    telefono: "",
    numero_documento: "",
  });

  const [formPassword, setFormPassword] = useState({
    password_actual: "",
    password: "",
    password_confirmation: "",
  });

  const [verPass, setVerPass] = useState(false);
  const [guardandoPerfil, setGuardandoPerfil] = useState(false);
  const [guardandoPassword, setGuardandoPassword] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const perfilRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const usuarioStorage = localStorage.getItem("usuario");
    const token = localStorage.getItem("token");

    if (!usuarioStorage || !token) {
      router.replace("/login");
      return;
    }

    try {
      const usuarioParseado = JSON.parse(usuarioStorage) as UsuarioSesion;
      setUsuario(usuarioParseado);

      setFormPerfil({
        nombres: usuarioParseado.nombres || usuarioParseado.nombre || "",
        apellidos: usuarioParseado.apellidos || "",
        correo: usuarioParseado.correo || "",
        telefono: usuarioParseado.telefono || "",
        numero_documento: usuarioParseado.numero_documento || "",
      });
    } catch {
      localStorage.removeItem("token");
      localStorage.removeItem("usuario");
      router.replace("/login");
    }
  }, [router]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        perfilRef.current &&
        !perfilRef.current.contains(event.target as Node)
      ) {
        setPerfilOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const nombreRol =
    typeof usuario?.rol === "object"
      ? usuario?.rol?.nombre
      : usuario?.rol || "";

  const rolUsuario = String(nombreRol).toUpperCase();
  const esAdmin = rolUsuario === "ADMIN" || rolUsuario === "ADMINISTRADOR";

  const menuFiltrado = useMemo(() => {
    if (esAdmin) return menu;
    return menu.filter((item) => !item.path.startsWith("/admin"));
  }, [menu, esAdmin]);

  const nombreUsuario =
    usuario?.nombres ||
    usuario?.nombre ||
    `${usuario?.nombres ?? ""} ${usuario?.apellidos ?? ""}`.trim() ||
    "Usuario";

  const anchoSidebar = sidebarOpen ? "lg:pl-72" : "lg:pl-24";

  const cerrarSesion = async () => {
    const token = localStorage.getItem("token");

    try {
      if (token) {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/logout`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });
      }
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("usuario");
      router.replace("/login");
    }
  };

  const abrirConfiguracion = () => {
    setPerfilOpen(false);
    setMensaje("");
    setError("");
    setModalConfigOpen(true);
  };

  const actualizarPerfil = async () => {
    setGuardandoPerfil(true);
    setMensaje("");
    setError("");

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/usuarios/${usuario?.id}/perfil`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formPerfil),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message || "No se pudo actualizar la información.",
        );
      }

      const usuarioActualizado = {
        ...usuario,
        ...formPerfil,
        nombre: formPerfil.nombres,
      };

      setUsuario(usuarioActualizado);
      localStorage.setItem("usuario", JSON.stringify(usuarioActualizado));

      setMensaje("Información actualizada correctamente.");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Ocurrió un error al actualizar la información.",
      );
    } finally {
      setGuardandoPerfil(false);
    }
  };

  const actualizarPassword = async () => {
    setGuardandoPassword(true);
    setMensaje("");
    setError("");

    if (formPassword.password !== formPassword.password_confirmation) {
      setError("La nueva contraseña y la confirmación no coinciden.");
      setGuardandoPassword(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/perfil/cambiar-password`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formPassword),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "No se pudo cambiar la contraseña.");
      }

      setFormPassword({
        password_actual: "",
        password: "",
        password_confirmation: "",
      });

      setMensaje("Contraseña actualizada correctamente.");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Ocurrió un error al cambiar la contraseña.",
      );
    } finally {
      setGuardandoPassword(false);
    }
  };

  const input =
    "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-800 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100";

  return (
    <ProtectedRoute
      rolesPermitidos={["ADMIN", "ADMINISTRADOR", "USUARIO", "ASOCIADO"]}
    >
      <div className="min-h-screen bg-slate-100">
        {mobileOpen && (
          <div
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 z-30 bg-slate-900/40 lg:hidden"
          />
        )}

        <aside
          className={`fixed left-0 top-0 z-40 h-screen border-r border-slate-200 bg-white shadow-xl transition-all duration-300 ${
            sidebarOpen ? "w-72" : "w-24"
          } ${
            mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between border-b border-slate-200 px-4 py-4">
              <div
                className={`flex items-center gap-3 ${
                  sidebarOpen ? "opacity-100" : "hidden"
                }`}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-700 text-white shadow-lg">
                  <GraduationCap className="h-6 w-6" />
                </div>

                <div>
                  <h1 className="text-sm font-black text-slate-900">
                    ASEUNICESMAG
                  </h1>
                  <p className="text-xs text-slate-500">
                    {esAdmin ? "Panel Administrativo" : "Panel de Usuario"}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="hidden rounded-xl border border-slate-200 bg-white p-2 text-slate-600 transition hover:bg-slate-100 lg:flex"
              >
                {sidebarOpen ? (
                  <ChevronLeft className="h-5 w-5" />
                ) : (
                  <ChevronRight className="h-5 w-5" />
                )}
              </button>

              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="rounded-xl border border-slate-200 bg-white p-2 text-slate-600 transition hover:bg-slate-100 lg:hidden"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-3 py-4">
              <div className="space-y-2">
                {menuFiltrado.map((item) => {
                  const active =
                    pathname === item.path ||
                    pathname.startsWith(`${item.path}/`);

                  return (
                    <button
                      key={item.path}
                      type="button"
                      onClick={() => {
                        setMobileOpen(false);
                        router.push(item.path);
                      }}
                      className={`group flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left transition-all duration-200 ${
                        active
                          ? "bg-blue-700 text-white shadow-lg"
                          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                      }`}
                    >
                      <item.icon className="h-5 w-5 shrink-0" />

                      {sidebarOpen && (
                        <>
                          <span className="flex-1 text-sm font-semibold">
                            {item.label}
                          </span>

                          {item.badge !== undefined && item.badge > 0 && (
                            <span
                              className={`rounded-full px-2 py-1 text-[10px] font-black ${
                                active
                                  ? "bg-white text-blue-700"
                                  : "bg-blue-100 text-blue-700"
                              }`}
                            >
                              {item.badge}
                            </span>
                          )}
                        </>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="border-t border-slate-200 p-4">
              <div className="relative" ref={perfilRef}>
                <button
                  type="button"
                  onClick={() => setPerfilOpen(!perfilOpen)}
                  className="flex w-full items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3 transition hover:bg-slate-100"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-700 text-white shadow-md">
                    <User className="h-5 w-5" />
                  </div>

                  {sidebarOpen && (
                    <>
                      <div className="flex-1 text-left">
                        <p className="text-sm font-bold text-slate-900">
                          {nombreUsuario}
                        </p>
                        <p className="text-xs text-slate-500">
                          {nombreRol || "Sin rol"}
                        </p>
                      </div>

                      <ChevronDown className="h-4 w-4 text-slate-500" />
                    </>
                  )}
                </button>

                {perfilOpen && (
                  <div className="absolute bottom-20 left-0 w-full rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl">
                    <button
                      type="button"
                      onClick={abrirConfiguracion}
                      className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                    >
                      <Settings className="h-4 w-4" />
                      Configuración
                    </button>

                    <button
                      type="button"
                      onClick={cerrarSesion}
                      className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                    >
                      <LogOut className="h-4 w-4" />
                      Cerrar sesión
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </aside>

        <div
          className={`min-h-screen transition-all duration-300 ${anchoSidebar}`}
        >
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="fixed left-4 top-4 z-20 rounded-2xl bg-blue-700 p-3 text-white shadow-lg lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>

          <main className="min-h-screen p-5">{children}</main>
        </div>

        {modalConfigOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4 backdrop-blur-sm">
            <div className="max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
              <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-5">
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-blue-700">
                    Configuración
                  </p>
                  <h2 className="text-2xl font-black text-slate-900">
                    Mi perfil
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() => setModalConfigOpen(false)}
                  className="rounded-2xl border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-100"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="grid gap-6 p-6 lg:grid-cols-2">
                <section className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <h3 className="text-lg font-black text-slate-900">
                    Información personal
                  </h3>
                  <p className="mb-5 text-sm text-slate-500">
                    Actualiza tus datos principales.
                  </p>

                  <div className="space-y-4">
                    <div>
                      <label className="mb-1 block text-xs font-black uppercase text-slate-500">
                        Nombres
                      </label>
                      <input
                        className={input}
                        value={formPerfil.nombres}
                        onChange={(e) =>
                          setFormPerfil({
                            ...formPerfil,
                            nombres: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div>
                      <label className="mb-1 block text-xs font-black uppercase text-slate-500">
                        Apellidos
                      </label>
                      <input
                        className={input}
                        value={formPerfil.apellidos}
                        onChange={(e) =>
                          setFormPerfil({
                            ...formPerfil,
                            apellidos: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div>
                      <label className="mb-1 block text-xs font-black uppercase text-slate-500">
                        Correo
                      </label>
                      <input
                        type="email"
                        className={input}
                        value={formPerfil.correo}
                        onChange={(e) =>
                          setFormPerfil({
                            ...formPerfil,
                            correo: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div>
                      <label className="mb-1 block text-xs font-black uppercase text-slate-500">
                        Teléfono
                      </label>
                      <input
                        className={input}
                        value={formPerfil.telefono}
                        onChange={(e) =>
                          setFormPerfil({
                            ...formPerfil,
                            telefono: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div>
                      <label className="mb-1 block text-xs font-black uppercase text-slate-500">
                        Documento
                      </label>
                      <input
                        className={input}
                        value={formPerfil.numero_documento}
                        onChange={(e) =>
                          setFormPerfil({
                            ...formPerfil,
                            numero_documento: e.target.value,
                          })
                        }
                      />
                    </div>

                    <button
                      type="button"
                      onClick={actualizarPerfil}
                      disabled={guardandoPerfil}
                      className="flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-700 px-5 py-3 text-sm font-black text-white shadow-lg transition hover:bg-blue-800 disabled:opacity-60"
                    >
                      {guardandoPerfil ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Save className="h-4 w-4" />
                      )}
                      Guardar información
                    </button>
                  </div>
                </section>

                <section className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <h3 className="text-lg font-black text-slate-900">
                    Cambiar contraseña
                  </h3>
                  <p className="mb-5 text-sm text-slate-500">
                    Ingresa tu contraseña actual y la nueva contraseña.
                  </p>

                  <div className="space-y-4">
                    <div>
                      <label className="mb-1 block text-xs font-black uppercase text-slate-500">
                        Contraseña actual
                      </label>
                      <div className="relative">
                        <input
                          type={verPass ? "text" : "password"}
                          className={`${input} pr-12`}
                          value={formPassword.password_actual}
                          onChange={(e) =>
                            setFormPassword({
                              ...formPassword,
                              password_actual: e.target.value,
                            })
                          }
                        />
                        <button
                          type="button"
                          onClick={() => setVerPass(!verPass)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
                        >
                          {verPass ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="mb-1 block text-xs font-black uppercase text-slate-500">
                        Nueva contraseña
                      </label>
                      <input
                        type={verPass ? "text" : "password"}
                        className={input}
                        value={formPassword.password}
                        onChange={(e) =>
                          setFormPassword({
                            ...formPassword,
                            password: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div>
                      <label className="mb-1 block text-xs font-black uppercase text-slate-500">
                        Confirmar contraseña
                      </label>
                      <input
                        type={verPass ? "text" : "password"}
                        className={input}
                        value={formPassword.password_confirmation}
                        onChange={(e) =>
                          setFormPassword({
                            ...formPassword,
                            password_confirmation: e.target.value,
                          })
                        }
                      />
                    </div>

                    <button
                      type="button"
                      onClick={actualizarPassword}
                      disabled={guardandoPassword}
                      className="flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-black text-white shadow-lg transition hover:bg-slate-800 disabled:opacity-60"
                    >
                      {guardandoPassword ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Save className="h-4 w-4" />
                      )}
                      Cambiar contraseña
                    </button>
                  </div>
                </section>
              </div>

              {(mensaje || error) && (
                <div className="px-6 pb-6">
                  <div
                    className={`rounded-2xl px-4 py-3 text-sm font-bold ${
                      mensaje
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-red-50 text-red-700"
                    }`}
                  >
                    {mensaje || error}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
