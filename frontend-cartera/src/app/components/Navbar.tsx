"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, User } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [usuario, setUsuario] = useState<any>(null);

  const isActive = (path: string) => pathname === path;

  useEffect(() => {
    const userStorage = localStorage.getItem("usuario");
    if (userStorage) {
      setUsuario(JSON.parse(userStorage));
    }
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        
        {/* LOGO */}
        <Link href="/home" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-black shadow-lg">
            A
          </div>

          <div className="leading-tight">
            <h1 className="text-sm font-black text-slate-900">
              ASEUNICESMAG
            </h1>
            <p className="text-[10px] uppercase tracking-widest text-slate-400">
              Asociación
            </p>
          </div>
        </Link>

        {/* NAV DESKTOP */}
        <div className="hidden md:flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 p-1">
          {[
            { label: "Inicio", path: "/home" },
            { label: "Afiliación", path: "/afiliacion" },
          ].map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`px-4 py-1.5 text-sm font-bold rounded-full transition ${
                isActive(item.path)
                  ? "bg-white text-blue-700 shadow"
                  : "text-slate-500 hover:text-blue-700"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* DERECHA */}
        <div className="hidden md:flex items-center gap-3">
          {!usuario ? (
            <>
              <Link
                href="/login"
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-100"
              >
                Ingresar
              </Link>

              <Link
                href="/afiliacion"
                className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-black text-white shadow-lg hover:bg-blue-700"
              >
                Afiliarme
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-3 rounded-full bg-slate-100 px-3 py-1.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white">
                <User className="h-4 w-4" />
              </div>

              <span className="text-sm font-bold text-slate-700">
                {usuario.nombres}
              </span>
            </div>
          )}
        </div>

        {/* BOTÓN MOBILE */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200"
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {/* MENU MOBILE */}
      {menuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-6 py-4 space-y-3">
          <Link href="/home" className="block font-semibold text-slate-700">
            Inicio
          </Link>

          <Link
            href="/user/afiliacion"
            className="block font-semibold text-slate-700"
          >
            Afiliación
          </Link>

          {!usuario ? (
            <Link href="/login" className="block font-semibold text-blue-600">
              Ingresar
            </Link>
          ) : (
            <div className="text-sm text-slate-500">
              Sesión: {usuario.nombres}
            </div>
          )}
        </div>
      )}
    </header>
  );
}