"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Menu,
  X,
  ChevronDown,
  Phone,
  User,
  LogIn,
} from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [usuario, setUsuario] = useState<any>(null);
  const [openDropdown, setOpenDropdown] = useState(false);

  const isActive = (path: string) => pathname === path;

  useEffect(() => {
    const userStorage = localStorage.getItem("usuario");
    if (userStorage) {
      setUsuario(JSON.parse(userStorage));
    }
  }, []);

  const navItems = [
    { label: "Inicio", path: "/home" },
    { label: "Afíliate aquí", path: "/afiliacion" },
    { label: "Convenios", path: "/convenios" },
    { label: "Transparencia", path: "/transparencia" },
  ];

  const dropdownItems = [
    { label: "Quiénes somos", path: "/quienes-somos" },
    { label: "Misión y Visión", path: "/mision-vision" },
    { label: "Junta Directiva", path: "/junta-directiva" },
    { label: "Contáctanos", path: "/contacto" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur-xl">
      <nav className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-6">
        {/* LOGO */}
        <Link href="/home" className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-white shadow-sm">
            <img
              src="/logo.png"
              alt="ASEUNICESMAG"
              className="h-full w-full object-contain p-1"
            />
          </div>

          <div className="leading-tight">
            <h1 className="text-xl font-black tracking-tight text-blue-800">
              ASEUNICESMAG
            </h1>
            <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-slate-400">
              Asociación de Egresados
            </p>
          </div>
        </Link>

        {/* NAV DESKTOP */}
        <div className="hidden items-center gap-7 lg:flex">
          {navItems.slice(0, 3).map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`relative text-sm font-bold transition ${
                isActive(item.path)
                  ? "text-blue-800"
                  : "text-slate-600 hover:text-blue-800"
              }`}
            >
              {item.label}

              {isActive(item.path) && (
                <span className="absolute -bottom-7 left-0 h-[3px] w-full rounded-full bg-blue-800" />
              )}
            </Link>
          ))}

          <div
            className="relative"
            onMouseEnter={() => setOpenDropdown(true)}
            onMouseLeave={() => setOpenDropdown(false)}
          >
            <button
              type="button"
              className="flex items-center gap-1 text-sm font-bold text-slate-600 transition hover:text-blue-800"
            >
              Quiénes somos
              <ChevronDown className="h-4 w-4" />
            </button>

            {openDropdown && (
              <div className="absolute left-0 top-8 w-64 rounded-2xl border border-slate-100 bg-white p-2 shadow-2xl shadow-slate-900/10">
                {dropdownItems.map((item) => (
                  <Link
                    key={item.path}
                    href={item.path}
                    className="block rounded-xl px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-blue-50 hover:text-blue-800"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/transparencia"
            className={`relative text-sm font-bold transition ${
              isActive("/transparencia")
                ? "text-blue-800"
                : "text-slate-600 hover:text-blue-800"
            }`}
          >
            Transparencia

            {isActive("/transparencia") && (
              <span className="absolute -bottom-7 left-0 h-[3px] w-full rounded-full bg-blue-800" />
            )}
          </Link>
        </div>

        {/* DERECHA */}
        <div className="hidden items-center gap-4 md:flex">
          <a
            href="tel:3185335311"
            className="hidden items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-xs font-black text-blue-800 xl:flex"
          >
            <Phone className="h-4 w-4" />
            318 5335311
          </a>

          {!usuario ? (
            <Link
              href="/login"
              className="inline-flex items-center gap-2 rounded-full bg-blue-800 px-5 py-2.5 text-sm font-black text-white shadow-lg shadow-blue-900/20 transition hover:bg-blue-900"
            >
              <LogIn className="h-4 w-4" />
              Ingresar
            </Link>
          ) : (
            <Link
              href="/user/dashboard"
              className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2.5 text-sm font-black text-blue-800"
            >
              <User className="h-4 w-4" />
              {usuario.nombres}
            </Link>
          )}
        </div>

        {/* BOTÓN MOBILE */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm lg:hidden"
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* LÍNEA CORPORATIVA */}
      <div className="h-[3px] w-full bg-gradient-to-r from-blue-950 via-blue-700 to-cyan-400" />

      {/* MOBILE */}
      {menuOpen && (
        <div className="border-t border-slate-100 bg-white px-6 py-5 shadow-xl lg:hidden">
          <div className="mx-auto max-w-7xl space-y-2">
            {[...navItems, ...dropdownItems].map((item) => (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setMenuOpen(false)}
                className={`block rounded-xl px-4 py-3 text-sm font-bold transition ${
                  isActive(item.path)
                    ? "bg-blue-50 text-blue-800"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                {item.label}
              </Link>
            ))}

            <a
              href="tel:3185335311"
              className="flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-3 text-sm font-black text-blue-800"
            >
              <Phone className="h-4 w-4" />
              Comunícate! 318 5335311
            </a>

            {!usuario ? (
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="block rounded-xl bg-blue-800 px-4 py-3 text-center text-sm font-black text-white"
              >
                Ingresar
              </Link>
            ) : (
              <Link
                href="/user/dashboard"
                onClick={() => setMenuOpen(false)}
                className="block rounded-xl bg-blue-50 px-4 py-3 text-sm font-black text-blue-800"
              >
                Sesión: {usuario.nombres}
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}