import Link from "next/link";
import {
  ArrowRight,
  Mail,
  MapPin,
  Phone,
  Share2,
  Camera,
  BriefcaseBusiness,
  GraduationCap,
} from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-[#061A3A] text-white">
      {/* ============================================================
          FONDO DECORATIVO
      ============================================================ */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 -top-40 h-[450px] w-[450px] rounded-full bg-[#21409A]/20 blur-[120px]" />

        <div className="absolute -bottom-44 right-0 h-[480px] w-[480px] rounded-full bg-cyan-400/10 blur-[140px]" />

        <div className="absolute right-[8%] top-[5%] h-64 w-64 rounded-full border-[45px] border-white/[0.02]" />

        <div className="absolute bottom-[-180px] left-[35%] h-96 w-96 rounded-full border-[60px] border-cyan-300/[0.025]" />
      </div>

      {/* ============================================================
          CONTENIDO PRINCIPAL
      ============================================================ */}
      <div className="relative mx-auto max-w-7xl px-5 pb-10 pt-14 sm:px-6 md:pb-12 md:pt-16 lg:px-8">
        {/* ============================================================
            BLOQUE SUPERIOR
        ============================================================ */}
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          {/* ============================================================
              MARCA
          ============================================================ */}
          <div>
            <Link
              href="/home"
              className="group inline-flex items-center gap-4"
              aria-label="Ir al inicio de ASEUNICESMAG"
            >
              {/* LOGO */}
              <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/15 bg-white/10 shadow-[0_12px_30px_rgba(0,0,0,0.18)] backdrop-blur transition-transform duration-300 group-hover:scale-105">
                <img
                  src="/logo/LOGOBLANCO.png"
                  alt="Logo ASEUNICESMAG"
                  className="h-full w-full object-contain"
                />
              </div>

              <div>
                <h2 className="text-2xl font-black tracking-[-0.02em] text-white sm:text-3xl">
                  ASEUNICESMAG
                </h2>

                <p className="mt-1 text-[9px] font-extrabold uppercase tracking-[0.32em] text-blue-200/70 sm:text-[10px]">
                  Asociación de Egresados
                </p>
              </div>
            </Link>

            {/* MENSAJE */}
            <h3 className="mt-8 max-w-2xl text-3xl font-black leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-[42px]">
              El vínculo con tu Universidad
              <span className="block text-[#7DD3FC]">
                continúa con nosotros.
              </span>
            </h3>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-blue-100/65 sm:text-base">
              Una comunidad que conecta egresados, crea oportunidades y
              fortalece el crecimiento profesional, académico y social.
            </p>

            {/* ACCIONES */}
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/afiliacion"
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-white px-6 py-3.5 text-sm font-black text-[#21409A] shadow-[0_10px_30px_rgba(0,0,0,0.18)] transition-all duration-300 hover:-translate-y-1 hover:bg-blue-50"
              >
                Afíliate a ASEUNICESMAG

                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>

              <Link
                href="/convenios"
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.06] px-6 py-3.5 text-sm font-black text-white backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:bg-white/10"
              >
                Conocer convenios
              </Link>
            </div>
          </div>

          {/* ============================================================
              CONTACTO
          ============================================================ */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.12)] backdrop-blur-sm sm:p-7">
              <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-cyan-300/10 blur-3xl" />

              <div className="relative">
                <div className="mb-6">
                  <p className="text-[10px] font-black uppercase tracking-[0.28em] text-cyan-300">
                    Estamos para ti
                  </p>

                  <h3 className="mt-2 text-2xl font-black text-white">
                    Hablemos
                  </h3>
                </div>

                <div className="space-y-3">
                  {/* UBICACIÓN */}
                  <div className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.05] p-4 transition hover:bg-white/[0.09]">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-cyan-300">
                      <MapPin size={19} />
                    </div>

                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-blue-100/50">
                        Ubicación
                      </p>

                      <p className="mt-1 text-sm font-bold text-white">
                        Pasto, Nariño · Colombia
                      </p>
                    </div>
                  </div>

                  {/* CORREO */}
                  <a
                    href="mailto:aseunicesmag@gmail.com"
                    className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.05] p-4 transition hover:bg-white/[0.09]"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-cyan-300">
                      <Mail size={19} />
                    </div>

                    <div className="min-w-0">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-blue-100/50">
                        Correo
                      </p>

                      <p className="mt-1 truncate text-sm font-bold text-white">
                        aseunicesmag@gmail.com
                      </p>
                    </div>
                  </a>

                  {/* TELÉFONO */}
                  <a
                    href="tel:3185335311"
                    className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.05] p-4 transition hover:bg-white/[0.09]"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-cyan-300">
                      <Phone size={19} />
                    </div>

                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-blue-100/50">
                        Línea de atención
                      </p>

                      <p className="mt-1 text-sm font-bold text-white">
                        +57 318 533 5311
                      </p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================
            SEPARADOR
        ============================================================ */}
        <div className="my-10 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

        {/* ============================================================
            NAVEGACIÓN MÍNIMA + REDES
        ============================================================ */}
        <div className="flex flex-col gap-7 md:flex-row md:items-center md:justify-between">
          {/* ENLACES */}
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 md:justify-start">
            <Link
              href="/home"
              className="text-sm font-bold text-blue-100/65 transition hover:text-white"
            >
              Inicio
            </Link>

            <Link
              href="/convenios"
              className="text-sm font-bold text-blue-100/65 transition hover:text-white"
            >
              Convenios
            </Link>

            <Link
              href="/afiliacion"
              className="text-sm font-bold text-blue-100/65 transition hover:text-white"
            >
              Afiliación
            </Link>
          </nav>

          {/* REDES SOCIALES */}
          <div className="flex items-center justify-center gap-2.5 md:justify-end">
            <span className="mr-2 hidden text-[10px] font-black uppercase tracking-[0.2em] text-blue-100/40 sm:block">
              Síguenos
            </span>

            <Link
              href="#"
              aria-label="Redes sociales"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-white transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:text-[#21409A]"
            >
              <Share2 size={17} />
            </Link>

            <Link
              href="#"
              aria-label="Instagram"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-white transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:text-[#21409A]"
            >
              <Camera size={17} />
            </Link>

            <Link
              href="#"
              aria-label="LinkedIn"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-white transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:text-[#21409A]"
            >
              <BriefcaseBusiness size={17} />
            </Link>
          </div>
        </div>
      </div>

      {/* ============================================================
          PIE INFERIOR
      ============================================================ */}
      <div className="relative border-t border-white/[0.08] bg-[#04142E]/60">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 py-5 text-center sm:px-6 md:flex-row md:text-left lg:px-8">
          <p className="text-[11px] font-medium text-blue-100/45">
            © {year} ASEUNICESMAG. Todos los derechos reservados.
          </p>

          <div className="flex items-center gap-2">
            <GraduationCap
              size={14}
              className="text-cyan-300"
            />

            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-blue-100/45">
              Comunidad · Conexión · Crecimiento
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}