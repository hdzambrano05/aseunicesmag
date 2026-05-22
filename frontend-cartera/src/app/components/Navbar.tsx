"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X, ChevronDown, Phone, User, LogIn } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [usuario, setUsuario] = useState<any>(null);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [openMobileDropdown, setOpenMobileDropdown] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const userStorage = localStorage.getItem("usuario");
    if (userStorage) setUsuario(JSON.parse(userStorage));
  }, []);

  const isActive = (path: string) =>
    pathname === path || pathname.startsWith(path + "/");

  const quienesSomosItems = [
    { label: "Nuestra Historia", path: "/quienes-somos/nuestra-historia" },
    { label: "Misión y visión", path: "/quienes-somos/mision-vision" },
    { label: "Asociados Honorarios", path: "/quienes-somos/asociados-honorarios" },
    { label: "Estructura de Gobierno", path: "/quienes-somos/estructura-gobierno" },
    { label: "Portafolio Institucional", path: "/quienes-somos/portafolio-institucional" },
  ];

  const navItems = [
    { label: "Inicio", path: "/home" },
    { label: "Afíliate aquí", path: "/afiliacion" },
    { label: "Convenios", path: "/convenios" },
  ];

  const openMenu = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpenDropdown(true);
  };

  const closeMenu = () => {
    timeoutRef.current = setTimeout(() => {
      setOpenDropdown(false);
    }, 280);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 shadow-sm backdrop-blur-xl">
      <nav className="relative mx-auto flex h-[66px] max-w-7xl items-center justify-between px-5 lg:px-8">
        {/* LOGO */}
        <Link href="/home" className="flex items-center gap-2.5">
          <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-[#dce5f4] bg-white shadow-sm">
            <img
              src="/logo/logo1.jpg"
              alt="ASEUNICESMAG"
              className="h-full w-full object-contain p-1"
            />
          </div>

          <div className="leading-none">
            <h1 className="text-[22px] font-black tracking-tight text-[#21409A]">
              ASEUNICESMAG
            </h1>
            <p className="mt-1 text-[8px] font-bold uppercase tracking-[0.42em] text-[#8b99b5]">
              Asociación de Egresados
            </p>
          </div>
        </Link>

        {/* DESKTOP */}
        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`relative rounded-full px-4 py-2 text-[13px] font-extrabold transition ${
                isActive(item.path)
                  ? "bg-[#eef4ff] text-[#21409A]"
                  : "text-[#34405a] hover:bg-[#f4f7fb] hover:text-[#21409A]"
              }`}
            >
              {item.label}
            </Link>
          ))}

          {/* QUIÉNES SOMOS */}
          <div
            className="relative"
            onMouseEnter={openMenu}
            onMouseLeave={closeMenu}
          >
            <button
              type="button"
              onClick={() => setOpenDropdown(!openDropdown)}
              className={`flex items-center gap-1 rounded-full px-4 py-2 text-[13px] font-extrabold transition ${
                isActive("/quienes-somos")
                  ? "bg-[#eef4ff] text-[#21409A]"
                  : "text-[#34405a] hover:bg-[#f4f7fb] hover:text-[#21409A]"
              }`}
            >
              Quiénes somos
              <ChevronDown
                size={15}
                className={`transition ${openDropdown ? "rotate-180" : ""}`}
              />
            </button>

            <div
              className={`absolute left-1/2 top-full z-50 w-[280px] -translate-x-1/2 pt-4 transition-all duration-300 ${
                openDropdown
                  ? "pointer-events-auto translate-y-0 opacity-100"
                  : "pointer-events-none -translate-y-2 opacity-0"
              }`}
            >
              <div className="relative overflow-hidden rounded-[24px] bg-[#102947] p-2 shadow-2xl shadow-[#102947]/30">
                <div className="absolute left-0 top-0 h-2 w-full bg-[#ed1c24]" />

                {quienesSomosItems.map((item) => (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={() => setOpenDropdown(false)}
                    className={`group mt-1 flex items-center justify-between rounded-[18px] px-4 py-3 text-[13px] font-bold transition ${
                      isActive(item.path)
                        ? "bg-white text-[#21409A]"
                        : "text-white hover:bg-white/10"
                    }`}
                  >
                    {item.label}
                    <span className="opacity-0 transition group-hover:opacity-100">
                      →
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link
            href="/transparencia"
            className={`rounded-full px-4 py-2 text-[13px] font-extrabold transition ${
              isActive("/transparencia")
                ? "bg-[#eef4ff] text-[#21409A]"
                : "text-[#34405a] hover:bg-[#f4f7fb] hover:text-[#21409A]"
            }`}
          >
            Transparencia y Gobierno
          </Link>
        </div>

        {/* DERECHA */}
        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="tel:3185335311"
            className="flex items-center gap-2 rounded-full bg-[#f2f6fd] px-4 py-2 text-[13px] font-black text-[#21409A]"
          >
            <Phone size={15} />
            318 5335311
          </a>

          {!usuario ? (
            <Link
              href="/login"
              className="inline-flex items-center gap-2 rounded-full bg-[#21409A] px-5 py-2.5 text-[13px] font-black text-white shadow-lg shadow-[#21409A]/25 transition hover:bg-[#17337c]"
            >
              <LogIn size={15} />
              Ingresar
            </Link>
          ) : (
            <Link
              href="/user/dashboard"
              className="inline-flex items-center gap-2 rounded-full bg-[#eef4ff] px-4 py-2.5 text-[13px] font-black text-[#21409A]"
            >
              <User size={15} />
              {usuario.nombres}
            </Link>
          )}
        </div>

        {/* MOBILE */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-[#eef4ff] text-[#21409A] lg:hidden"
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </nav>


      {/* MENÚ MOBILE */}
      {menuOpen && (
        <div className="border-t border-[#e5ecf7] bg-white px-5 py-5 shadow-xl lg:hidden">
          <div className="space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setMenuOpen(false)}
                className={`block rounded-2xl px-4 py-3 text-sm font-extrabold ${
                  isActive(item.path)
                    ? "bg-[#21409A] text-white"
                    : "text-[#34405a] hover:bg-[#f4f7fb]"
                }`}
              >
                {item.label}
              </Link>
            ))}

            <button
              onClick={() => setOpenMobileDropdown(!openMobileDropdown)}
              className="flex w-full items-center justify-between rounded-2xl px-4 py-3 text-sm font-extrabold text-[#34405a] hover:bg-[#f4f7fb]"
            >
              Quiénes somos
              <ChevronDown
                size={16}
                className={`transition ${
                  openMobileDropdown ? "rotate-180" : ""
                }`}
              />
            </button>

            {openMobileDropdown && (
              <div className="ml-3 space-y-1 border-l-2 border-[#ed1c24] pl-3">
                {quienesSomosItems.map((item) => (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={() => setMenuOpen(false)}
                    className={`block rounded-xl px-4 py-3 text-sm font-bold ${
                      isActive(item.path)
                        ? "bg-[#eef4ff] text-[#21409A]"
                        : "text-[#52607c] hover:bg-[#f4f7fb]"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}

            <Link
              href="/transparencia"
              onClick={() => setMenuOpen(false)}
              className={`block rounded-2xl px-4 py-3 text-sm font-extrabold ${
                isActive("/transparencia")
                  ? "bg-[#21409A] text-white"
                  : "text-[#34405a] hover:bg-[#f4f7fb]"
              }`}
            >
              Transparencia y Gobierno
            </Link>

            <a
              href="tel:3185335311"
              className="flex items-center gap-2 rounded-2xl bg-[#f2f6fd] px-4 py-3 text-sm font-black text-[#21409A]"
            >
              <Phone size={16} />
              318 5335311
            </a>

            {!usuario ? (
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="block rounded-2xl bg-[#21409A] px-4 py-3 text-center text-sm font-black text-white"
              >
                Ingresar
              </Link>
            ) : (
              <Link
                href="/user/dashboard"
                onClick={() => setMenuOpen(false)}
                className="block rounded-2xl bg-[#eef4ff] px-4 py-3 text-sm font-black text-[#21409A]"
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