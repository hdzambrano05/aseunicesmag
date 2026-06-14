import Link from "next/link";
import {
  Mail,
  MapPin,
  Phone,
  ArrowRight,
  HeartHandshake,
  Sparkles,
  Share2,
  Camera,
  BriefcaseBusiness,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative mt-14 overflow-hidden bg-[#07122f] text-white">
      {/* EFECTOS */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(56,189,248,0.12),transparent_30%),radial-gradient(circle_at_85%_10%,rgba(33,64,154,0.35),transparent_32%)]" />

      <div className="relative mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.7fr_0.9fr]">
          {/* MARCA */}
          <div>
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/10 px-4 py-2 backdrop-blur">
              {/* LOGO */}
              <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-blue-900 shadow-lg">
                <img
                  src="logo/LOGOBLANCO.png"
                  alt="ASEUNICESMAG"
                  className="h-full w-full object-contain "
                />
              </div>

              <span className="text-xs font-black tracking-[0.25em] text-white">
                ASEUNICESMAG
              </span>
            </div>
            
            <p className="mt-4 max-w-md text-sm leading-6 text-blue-100/70">
              Asociación comprometida con el crecimiento profesional, académico
              y social de sus asociados.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/user/afiliacion"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-black text-[#21409A] shadow-lg transition hover:-translate-y-1"
              >
                Afíliate
                <ArrowRight
                  size={15}
                  className="transition group-hover:translate-x-1"
                />
              </Link>

              <Link
                href="/login"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-white/20"
              >
                Ingresar
              </Link>
            </div>
          </div>

          {/* ENLACES */}
          <div>
            <h3 className="mb-4 flex items-center gap-2 text-base font-black">
              <Sparkles size={16} className="text-cyan-300" />
              Navegación
            </h3>

            <ul className="space-y-2 text-sm">
              {[
                { label: "Inicio", href: "/home" },
                { label: "Nuestra historia", href: "/nuestra-historia" },
                { label: "Portafolio", href: "/portafolio-institucional" },
                {
                  label: "Estructura de gobierno",
                  href: "/estructura-gobierno",
                },
                { label: "Afiliación", href: "/user/afiliacion" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-2 text-blue-100/70 transition hover:text-white"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 transition group-hover:w-3" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACTO */}
          <div>
            <h3 className="mb-4 text-base font-black">Contacto</h3>

            <div className="space-y-3">
              <div className="rounded-2xl border border-white/10 bg-white/10 p-3 backdrop-blur">
                <div className="flex gap-3">
                  <MapPin className="mt-0.5 text-cyan-300" size={18} />

                  <div>
                    <p className="text-sm font-bold text-white">
                      Pasto, Nariño
                    </p>

                    <p className="text-xs text-blue-100/70">Colombia</p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/10 p-3 backdrop-blur">
                <div className="flex gap-3">
                  <Mail className="mt-0.5 text-cyan-300" size={18} />

                  <div>
                    <p className="text-sm font-bold text-white">
                      aseunicesmag@gmail.com
                    </p>

                    <p className="text-xs text-blue-100/70">
                      Correo institucional
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/10 p-3 backdrop-blur">
                <div className="flex gap-3">
                  <Phone className="mt-0.5 text-cyan-300" size={18} />

                  <div>
                    <p className="text-sm font-bold text-white">
                      +57 318 533 5311
                    </p>

                    <p className="text-xs text-blue-100/70">
                      Atención institucional
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* REDES */}
            <div className="mt-5 flex gap-3">
              <Link
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white transition hover:-translate-y-1 hover:bg-white hover:text-[#21409A]"
              >
                <Share2 size={16} />
              </Link>

              <Link
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white transition hover:-translate-y-1 hover:bg-white hover:text-[#21409A]"
              >
                <Camera size={16} />
              </Link>

              <Link
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white transition hover:-translate-y-1 hover:bg-white hover:text-[#21409A]"
              >
                <BriefcaseBusiness size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER INFERIOR */}
      <div className="relative border-t border-white/10 bg-black/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 py-3 text-center text-[11px] text-blue-100/60 md:flex-row">
          <p>
            © {new Date().getFullYear()} ASEUNICESMAG. Todos los derechos
            reservados.
          </p>

          <p className="font-medium">Comunidad • Liderazgo • Transformación</p>
        </div>
      </div>
    </footer>
  );
}
