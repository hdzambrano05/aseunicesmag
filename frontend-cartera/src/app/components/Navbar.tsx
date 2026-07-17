"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import {
  ArrowRight,
  ChevronDown,
  CircleUserRound,
  FileText,
  GraduationCap,
  Handshake,
  Home,
  Landmark,
  LogIn,
  Menu,
  Network,
  Phone,
  ShieldCheck,
  User,
  Users,
  X,
} from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  const [menuOpen, setMenuOpen] = useState(false);
  const [usuario, setUsuario] = useState<any>(null);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [openMobileDropdown, setOpenMobileDropdown] = useState(false);

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* ============================================================
     USUARIO
  ============================================================ */
  useEffect(() => {
    try {
      const userStorage = localStorage.getItem("usuario");

      if (userStorage) {
        setUsuario(JSON.parse(userStorage));
      }
    } catch (error) {
      console.error("Error leyendo usuario:", error);
      setUsuario(null);
    }
  }, []);

  /* ============================================================
     CERRAR MENÚ AL CAMBIAR DE RUTA
  ============================================================ */
  useEffect(() => {
    setMenuOpen(false);
    setOpenDropdown(false);
    setOpenMobileDropdown(false);
  }, [pathname]);

  /* ============================================================
     BLOQUEAR SCROLL CUANDO EL MENÚ MÓVIL ESTÁ ABIERTO
  ============================================================ */
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  /* ============================================================
     CERRAR CON ESCAPE
  ============================================================ */
  useEffect(() => {
    const cerrarConEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setOpenDropdown(false);
        setOpenMobileDropdown(false);
      }
    };

    window.addEventListener("keydown", cerrarConEscape);

    return () => {
      window.removeEventListener("keydown", cerrarConEscape);
    };
  }, []);

  /* ============================================================
     RUTA ACTIVA
  ============================================================ */
  const isActive = (path: string) => {
    return (
      pathname === path ||
      (path !== "/home" && pathname.startsWith(path + "/"))
    );
  };

  /* ============================================================
     MENÚS
  ============================================================ */
  const navItems = [
    {
      label: "Inicio",
      path: "/home",
      icon: Home,
    },
    {
      label: "Afíliate aquí",
      path: "/afiliacion",
      icon: GraduationCap,
    },
    {
      label: "Convenios",
      path: "/convenios",
      icon: Handshake,
    },
  ];

  const quienesSomosItems = [
    {
      label: "Nuestra Historia",
      descripcion: "Conoce nuestro origen y trayectoria",
      path: "/quienes-somos/nuestra-historia",
      icon: Landmark,
    },
    {
      label: "Misión y visión",
      descripcion: "Nuestro propósito institucional",
      path: "/quienes-somos/mision-vision",
      icon: ShieldCheck,
    },
    {
      label: "Asociados Honorarios",
      descripcion: "Personas destacadas de nuestra comunidad",
      path: "/quienes-somos/asociados-honorarios",
      icon: Users,
    },
    {
      label: "Estructura de Gobierno",
      descripcion: "Organización y equipo institucional",
      path: "/quienes-somos/estructura-gobierno",
      icon: Network,
    },
    {
      label: "Portafolio Institucional",
      descripcion: "Conoce nuestros servicios y propuestas",
      path: "/quienes-somos/portafolio-institucional",
      icon: FileText,
    },
  ];

  /* ============================================================
     DROPDOWN ESCRITORIO
  ============================================================ */
  const openMenu = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setOpenDropdown(true);
  };

  const closeMenu = () => {
    timeoutRef.current = setTimeout(() => {
      setOpenDropdown(false);
    }, 220);
  };

  return (
    <>
      <header className="sticky top-0 z-[100] w-full">
        {/* LÍNEA SUPERIOR CORPORATIVA */}
        <div className="h-[3px] w-full bg-gradient-to-r from-[#071F4D] via-[#21409A] to-[#38BDF8]" />

        {/* NAVBAR */}
        <div className="border-b border-slate-200/70 bg-white/95 shadow-[0_4px_20px_rgba(15,23,42,0.04)] backdrop-blur-xl">
          <nav className="relative mx-auto flex h-[70px] max-w-[1450px] items-center justify-between px-4 sm:px-5 lg:h-[74px] lg:px-7 xl:px-8">
            {/* ==================================================
                LOGO
            ================================================== */}
            <Link
              href="/home"
              className="group flex min-w-0 shrink-0 items-center gap-2.5 sm:gap-3"
              aria-label="Ir al inicio de ASEUNICESMAG"
            >
              <div className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#D9E4F5] bg-white shadow-[0_5px_16px_rgba(33,64,154,0.12)] transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_8px_22px_rgba(33,64,154,0.18)] sm:h-12 sm:w-12">
                <img
                  src="/logo/logo1.jpg"
                  alt="Logo ASEUNICESMAG"
                  className="h-full w-full object-contain"
                />
              </div>

              <div className="min-w-0 leading-none">
                <div className="flex items-center gap-2">
                  <h1 className="truncate text-[18px] font-black tracking-[-0.02em] text-[#21409A] sm:text-[21px] xl:text-[23px]">
                    ASEUNICESMAG
                  </h1>
                </div>

                <p className="mt-1.5 hidden whitespace-nowrap text-[7px] font-extrabold uppercase tracking-[0.35em] text-[#8190AA] min-[390px]:block sm:text-[8px]">
                  Asociación de Egresados
                </p>
              </div>
            </Link>

            {/* ==================================================
                NAVEGACIÓN DESKTOP
            ================================================== */}
            <div className="hidden items-center gap-0.5 xl:flex">
              {navItems.map((item) => {
                const activo = isActive(item.path);

                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={`group relative flex h-11 items-center rounded-full px-4 text-[13px] font-extrabold transition-all duration-300 ${
                      activo
                        ? "bg-[#EEF4FF] text-[#21409A]"
                        : "text-[#34405A] hover:bg-[#F6F8FC] hover:text-[#21409A]"
                    }`}
                  >
                    {item.label}

                    <span
                      className={`absolute bottom-[5px] left-1/2 h-[2px] -translate-x-1/2 rounded-full bg-[#21409A] transition-all duration-300 ${
                        activo
                          ? "w-5 opacity-100"
                          : "w-0 opacity-0 group-hover:w-4 group-hover:opacity-100"
                      }`}
                    />
                  </Link>
                );
              })}

              {/* QUIÉNES SOMOS */}
              <div
                className="relative"
                onMouseEnter={openMenu}
                onMouseLeave={closeMenu}
              >
                <button
                  type="button"
                  onClick={() => setOpenDropdown((actual) => !actual)}
                  aria-expanded={openDropdown}
                  className={`group relative flex h-11 items-center gap-1.5 rounded-full px-4 text-[13px] font-extrabold transition-all duration-300 ${
                    isActive("/quienes-somos")
                      ? "bg-[#EEF4FF] text-[#21409A]"
                      : "text-[#34405A] hover:bg-[#F6F8FC] hover:text-[#21409A]"
                  }`}
                >
                  Quiénes somos

                  <ChevronDown
                    size={15}
                    strokeWidth={2.5}
                    className={`transition-transform duration-300 ${
                      openDropdown ? "rotate-180" : ""
                    }`}
                  />

                  <span
                    className={`absolute bottom-[5px] left-1/2 h-[2px] -translate-x-1/2 rounded-full bg-[#21409A] transition-all duration-300 ${
                      isActive("/quienes-somos")
                        ? "w-5 opacity-100"
                        : "w-0 opacity-0 group-hover:w-4 group-hover:opacity-100"
                    }`}
                  />
                </button>

                {/* DROPDOWN */}
                <div
                  className={`absolute left-1/2 top-full z-[110] w-[380px] -translate-x-1/2 pt-4 transition-all duration-300 ${
                    openDropdown
                      ? "pointer-events-auto translate-y-0 opacity-100"
                      : "pointer-events-none -translate-y-2 opacity-0"
                  }`}
                >
                  <div className="relative overflow-hidden rounded-[24px] border border-white/10 bg-[#071F4D] p-2.5 shadow-[0_25px_60px_rgba(7,31,77,0.28)]">
                    {/* ACENTO SUPERIOR */}
                    <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#21409A] via-[#38BDF8] to-[#21409A]" />

                    {/* CABECERA */}
                    <div className="mb-2 px-4 pb-3 pt-4">
                      <p className="text-[9px] font-black uppercase tracking-[0.28em] text-cyan-300">
                        Nuestra organización
                      </p>

                      <h3 className="mt-1.5 text-lg font-black text-white">
                        Conoce ASEUNICESMAG
                      </h3>
                    </div>

                    <div className="space-y-1">
                      {quienesSomosItems.map((item) => {
                        const Icon = item.icon;
                        const activo = isActive(item.path);

                        return (
                          <Link
                            key={item.path}
                            href={item.path}
                            onClick={() => setOpenDropdown(false)}
                            className={`group/item flex items-center gap-3 rounded-[16px] px-3.5 py-3 transition-all duration-200 ${
                              activo
                                ? "bg-white text-[#21409A]"
                                : "text-white hover:bg-white/10"
                            }`}
                          >
                            <div
                              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors ${
                                activo
                                  ? "bg-[#EEF4FF] text-[#21409A]"
                                  : "bg-white/10 text-cyan-200 group-hover/item:bg-white/15"
                              }`}
                            >
                              <Icon size={18} />
                            </div>

                            <div className="min-w-0 flex-1">
                              <p className="text-[13px] font-extrabold">
                                {item.label}
                              </p>

                              <p
                                className={`mt-0.5 truncate text-[10px] font-medium ${
                                  activo
                                    ? "text-slate-500"
                                    : "text-blue-100/60"
                                }`}
                              >
                                {item.descripcion}
                              </p>
                            </div>

                            <ArrowRight
                              size={15}
                              className={`shrink-0 transition-transform duration-200 group-hover/item:translate-x-1 ${
                                activo
                                  ? "text-[#21409A]"
                                  : "text-white/50"
                              }`}
                            />
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* TRANSPARENCIA */}
              <Link
                href="/transparencia"
                className={`group relative flex h-11 items-center rounded-full px-4 text-[13px] font-extrabold transition-all duration-300 ${
                  isActive("/transparencia")
                    ? "bg-[#EEF4FF] text-[#21409A]"
                    : "text-[#34405A] hover:bg-[#F6F8FC] hover:text-[#21409A]"
                }`}
              >
                Transparencia y Gobierno

                <span
                  className={`absolute bottom-[5px] left-1/2 h-[2px] -translate-x-1/2 rounded-full bg-[#21409A] transition-all duration-300 ${
                    isActive("/transparencia")
                      ? "w-5 opacity-100"
                      : "w-0 opacity-0 group-hover:w-4 group-hover:opacity-100"
                  }`}
                />
              </Link>
            </div>

            {/* ==================================================
                ACCIONES DESKTOP
            ================================================== */}
            <div className="hidden shrink-0 items-center gap-2 xl:flex">
              <a
                href="tel:3185335311"
                className="group flex h-11 items-center gap-2 rounded-full border border-[#DCE6F5] bg-[#F7FAFF] px-4 text-[12px] font-black text-[#21409A] transition-all duration-300 hover:border-[#B9CEF0] hover:bg-white hover:shadow-md"
              >
                <Phone
                  size={15}
                  className="transition-transform group-hover:rotate-12"
                />

                <span>318 5335311</span>
              </a>

              {!usuario ? (
                <Link
                  href="/login"
                  className="group inline-flex h-11 items-center gap-2 rounded-full bg-gradient-to-r from-[#173B7A] to-[#21409A] px-5 text-[13px] font-black text-white shadow-[0_8px_22px_rgba(33,64,154,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(33,64,154,0.32)]"
                >
                  <LogIn size={16} />

                  Ingresar
                </Link>
              ) : (
                <Link
                  href="/user/dashboard"
                  className="group flex h-11 max-w-[170px] items-center gap-2 rounded-full border border-[#DCE6F5] bg-[#EEF4FF] px-4 text-[12px] font-black text-[#21409A] transition-all hover:bg-white hover:shadow-md"
                >
                  <CircleUserRound size={17} />

                  <span className="truncate">
                    {usuario.nombres || "Mi cuenta"}
                  </span>
                </Link>
              )}
            </div>

            {/* ==================================================
                TABLET / MÓVIL - ACCIONES
            ================================================== */}
            <div className="flex items-center gap-2 xl:hidden">
              {/* TELÉFONO TABLET */}
              <a
                href="tel:3185335311"
                aria-label="Llamar a ASEUNICESMAG"
                className="hidden h-10 w-10 items-center justify-center rounded-full border border-[#DCE6F5] bg-[#F7FAFF] text-[#21409A] transition hover:bg-[#EEF4FF] sm:flex"
              >
                <Phone size={17} />
              </a>

              {/* BOTÓN MENÚ */}
              <button
                type="button"
                onClick={() => setMenuOpen((actual) => !actual)}
                aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
                aria-expanded={menuOpen}
                className={`flex h-11 w-11 items-center justify-center rounded-full transition-all duration-300 ${
                  menuOpen
                    ? "rotate-90 bg-[#071F4D] text-white shadow-lg"
                    : "bg-[#EEF4FF] text-[#21409A] hover:bg-[#DFEAFC]"
                }`}
              >
                {menuOpen ? (
                  <X size={21} />
                ) : (
                  <Menu size={22} />
                )}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* ============================================================
          OVERLAY MÓVIL
      ============================================================ */}
      <div
        onClick={() => setMenuOpen(false)}
        className={`fixed inset-0 z-[80] bg-[#07122F]/50 backdrop-blur-sm transition-opacity duration-300 xl:hidden ${
          menuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      {/* ============================================================
          MENÚ RESPONSIVE
      ============================================================ */}
      <aside
        className={`fixed bottom-0 right-0 top-[73px] z-[90] w-full max-w-[420px] transform border-l border-slate-200 bg-white shadow-[-20px_0_60px_rgba(7,31,77,0.18)] transition-transform duration-500 ease-out xl:hidden ${
          menuOpen
            ? "translate-x-0"
            : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          {/* CABECERA MOBILE */}
          <div className="relative overflow-hidden border-b border-slate-100 bg-[#F7FAFF] px-6 py-6">
            <div className="absolute -right-16 -top-20 h-40 w-40 rounded-full bg-blue-200/40 blur-3xl" />

            <div className="relative">
              <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[#21409A]">
                Navegación
              </p>

              <h2 className="mt-2 text-2xl font-black tracking-tight text-[#07122F]">
                Explora ASEUNICESMAG
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Encuentra información, beneficios y servicios para
                nuestros asociados.
              </p>
            </div>
          </div>

          {/* CONTENIDO SCROLL */}
          <div className="flex-1 overflow-y-auto px-4 py-5">
            <div className="space-y-1.5">
              {navItems.map((item) => {
                const Icon = item.icon;
                const activo = isActive(item.path);

                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={`flex items-center gap-3 rounded-2xl px-4 py-3.5 transition-all ${
                      activo
                        ? "bg-[#21409A] text-white shadow-[0_8px_20px_rgba(33,64,154,0.2)]"
                        : "text-[#34405A] hover:bg-[#F5F8FC]"
                    }`}
                  >
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-xl ${
                        activo
                          ? "bg-white/15"
                          : "bg-[#EEF4FF] text-[#21409A]"
                      }`}
                    >
                      <Icon size={17} />
                    </div>

                    <span className="flex-1 text-sm font-extrabold">
                      {item.label}
                    </span>

                    <ArrowRight
                      size={15}
                      className={
                        activo
                          ? "text-white/70"
                          : "text-slate-300"
                      }
                    />
                  </Link>
                );
              })}

              {/* QUIÉNES SOMOS MOBILE */}
              <div>
                <button
                  type="button"
                  onClick={() =>
                    setOpenMobileDropdown(
                      (actual) => !actual,
                    )
                  }
                  className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3.5 transition-all ${
                    isActive("/quienes-somos")
                      ? "bg-[#EEF4FF] text-[#21409A]"
                      : "text-[#34405A] hover:bg-[#F5F8FC]"
                  }`}
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EEF4FF] text-[#21409A]">
                    <Users size={17} />
                  </div>

                  <span className="flex-1 text-left text-sm font-extrabold">
                    Quiénes somos
                  </span>

                  <ChevronDown
                    size={17}
                    className={`transition-transform duration-300 ${
                      openMobileDropdown
                        ? "rotate-180"
                        : ""
                    }`}
                  />
                </button>

                {/* SUBMENÚ */}
                <div
                  className={`grid transition-all duration-300 ${
                    openMobileDropdown
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="ml-5 mt-2 space-y-1 border-l-2 border-[#D8E5F6] pl-4">
                      {quienesSomosItems.map((item) => {
                        const Icon = item.icon;
                        const activo = isActive(item.path);

                        return (
                          <Link
                            key={item.path}
                            href={item.path}
                            className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition ${
                              activo
                                ? "bg-[#EEF4FF] font-extrabold text-[#21409A]"
                                : "font-bold text-[#52607C] hover:bg-[#F5F8FC]"
                            }`}
                          >
                            <Icon
                              size={16}
                              className="shrink-0"
                            />

                            {item.label}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* TRANSPARENCIA */}
              <Link
                href="/transparencia"
                className={`flex items-center gap-3 rounded-2xl px-4 py-3.5 transition-all ${
                  isActive("/transparencia")
                    ? "bg-[#21409A] text-white shadow-[0_8px_20px_rgba(33,64,154,0.2)]"
                    : "text-[#34405A] hover:bg-[#F5F8FC]"
                }`}
              >
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-xl ${
                    isActive("/transparencia")
                      ? "bg-white/15"
                      : "bg-[#EEF4FF] text-[#21409A]"
                  }`}
                >
                  <ShieldCheck size={17} />
                </div>

                <span className="flex-1 text-sm font-extrabold">
                  Transparencia y Gobierno
                </span>

                <ArrowRight
                  size={15}
                  className={
                    isActive("/transparencia")
                      ? "text-white/70"
                      : "text-slate-300"
                  }
                />
              </Link>
            </div>

            {/* CONTACTO */}
            <div className="my-6 h-px bg-slate-100" />

            <div>
              <p className="mb-3 px-2 text-[9px] font-black uppercase tracking-[0.25em] text-slate-400">
                Contacto
              </p>

              <a
                href="tel:3185335311"
                className="flex items-center gap-3 rounded-2xl border border-[#DCE6F5] bg-[#F7FAFF] p-4 text-[#21409A] transition hover:bg-[#EEF4FF]"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white shadow-sm">
                  <Phone size={18} />
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Línea de atención
                  </p>

                  <p className="mt-1 text-sm font-black">
                    318 5335311
                  </p>
                </div>
              </a>
            </div>
          </div>

          {/* FOOTER MOBILE */}
          <div className="border-t border-slate-100 bg-white p-4">
            {!usuario ? (
              <Link
                href="/login"
                className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#173B7A] to-[#21409A] px-5 py-4 text-sm font-black text-white shadow-[0_10px_25px_rgba(33,64,154,0.22)]"
              >
                <LogIn size={18} />

                Ingresar a mi cuenta

                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            ) : (
              <Link
                href="/user/dashboard"
                className="flex w-full items-center gap-3 rounded-2xl bg-[#EEF4FF] p-3.5 text-[#21409A]"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-sm">
                  <User size={19} />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#7284A3]">
                    Mi cuenta
                  </p>

                  <p className="mt-0.5 truncate text-sm font-black">
                    {usuario.nombres || "Usuario"}
                  </p>
                </div>

                <ArrowRight size={17} />
              </Link>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}