"use client";

import Image from "next/image";
import {
  Handshake,
  User,
  TrendingUp,
  Building2,
  FileText,
  Download,
  Sparkles,
} from "lucide-react";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function PortafolioInstitucionalPage() {
  const lineasAccion = [
    {
      icono: Handshake,
      titulo: "Asociatividad, Identidad y Gobernanza",
    },
    {
      icono: User,
      titulo: "Desarrollo Profesional, Educación Continua y Equidad",
    },
    {
      icono: TrendingUp,
      titulo: "Proyección Social y Territorio",
    },
    {
      icono: Building2,
      titulo: "Consultoría y Acompañamiento Estratégico",
    },
  ];

  return (
    <>
      <Navbar />

      <main className="min-h-screen overflow-hidden bg-[#eef3ff] text-[#07122f]">
        {/* HERO */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#123d88] via-[#1f43a8] to-[#0d8db4] px-6 pb-36 pt-24 text-white">
          <div className="absolute left-10 top-20 h-44 w-44 rounded-full border border-white/10" />
          <div className="absolute right-20 top-40 h-64 w-64 rounded-full border border-white/10" />
          <div className="absolute left-1/2 top-10 h-24 w-24 rounded-full border border-white/10" />

          <div className="relative mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
            <div>

              <h1 className="mt-8 text-5xl font-black leading-[0.95] md:text-7xl">
                Portafolio
                <span className="block text-[#c5f1ff]">Institucional</span>
              </h1>

            </div>

            <div className="relative flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[520px] rounded-[40px] border border-white/20 bg-white/10 p-5 shadow-2xl backdrop-blur">
                <div className="relative overflow-hidden rounded-[32px] bg-white">
                  <Image
                    src="/logo/logo1.jpg"
                    alt="Portafolio ASEUNICESMAG"
                    width={700}
                    height={700}
                    className="h-[520px] w-full object-contain p-10"
                    priority
                  />
                </div>

                <div className="absolute -bottom-6 left-8 rounded-[24px] bg-white px-6 py-5 shadow-2xl">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#edf4ff] text-[#21409A]">
                      <FileText className="h-7 w-7" />
                    </div>

                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.25em] text-[#7d91c4]">
                        ASEUNICESMAG
                      </p>

                      <h3 className="text-2xl font-black text-[#21409A]">
                        Comunidad institucional
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CONTENIDO */}
        <section className="relative z-10 -mt-8 px-6 pb-20">
          <div className="mx-auto max-w-7xl">
            {/* TEXTO OFICIAL */}
            <div className="rounded-[34px] bg-white p-10 shadow-xl">
              <p className="text-lg leading-9 text-[#334155]">
                Con más de once años de experiencia y en el marco de su
                fortalecimiento institucional iniciado en 2025, ASEUNICESMAG se
                proyecta como un referente regional en gobernanza, inclusión,
                educación continua y desarrollo social.
              </p>

              <p className="mt-8 text-lg leading-9 text-[#334155]">
                A través de la articulación de redes, conocimientos y alianzas
                estratégicas, la Asociación impulsa soluciones innovadoras y
                sostenibles dirigidas a instituciones públicas, privadas y
                organizaciones sociales, contribuyendo al bienestar y al
                desarrollo del suroccidente colombiano.
              </p>
            </div>

            {/* LÍNEAS DE ACCIÓN */}
            <div className="mt-24 text-center">
              <h2 className="text-5xl font-black text-[#21409A]">
                Líneas de Acción
              </h2>

              <div className="mt-14 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
                {lineasAccion.map((item) => {
                  const Icono = item.icono;

                  return (
                    <div
                      key={item.titulo}
                      className="group rounded-[32px] bg-white p-10 shadow-lg transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl"
                    >
                      <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-[28px] bg-gradient-to-br from-[#21409A] to-[#35a7ff] text-white shadow-xl transition-all duration-300 group-hover:scale-110">
                        <Icono className="h-12 w-12" />
                      </div>

                      <h3 className="mt-8 text-xl font-black leading-9 text-[#07122f]">
                        {item.titulo}
                      </h3>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* CTA */}
            <div className="relative mt-24 overflow-hidden rounded-[40px] bg-gradient-to-r from-[#123d88] via-[#21409A] to-[#0d8db4] px-10 py-20 text-center text-white shadow-2xl">
              <div className="absolute -left-10 top-0 h-44 w-44 rounded-full bg-white/10 blur-2xl" />
              <div className="absolute bottom-0 right-0 h-52 w-52 rounded-full bg-cyan-300/20 blur-3xl" />

              <div className="relative z-10">
                <h2 className="mx-auto max-w-4xl text-4xl font-black leading-tight md:text-6xl">
                  Conoce nuestro Portafolio Institucional completo
                </h2>

                <a
                  href="/documentos/PORTAFOLIO-INSTIUCIONAL-ASEUNICESMAG.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-10 inline-flex items-center gap-3 rounded-2xl bg-white px-8 py-5 text-lg font-black text-[#21409A] shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:scale-105"
                >
                  <Download className="h-6 w-6" />
                  Portafolio Institucional PDF
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}