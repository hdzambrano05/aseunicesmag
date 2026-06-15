"use client";

import Image from "next/image";
import { Sparkles, GraduationCap } from "lucide-react";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function MisionVisionPage() {
  const valores = [
    { titulo: "Autonomía", imagen: "/landing/mision/valores/autonomia.png" },
    { titulo: "Ayuda Mútua", imagen: "/landing/mision/valores/ayuda-mutua.png" },
    { titulo: "Conciencia", imagen: "/landing/mision/valores/conciencia.png" },
    { titulo: "Honestidad", imagen: "/landing/mision/valores/honestidad.png" },
    { titulo: "Lealtad", imagen: "/landing/mision/valores/lealtad.png" },
    { titulo: "Responsabilidad", imagen: "/landing/mision/valores/responsabilidad.png" },
  ];

  const principios = [
    { titulo: "Transparencia", imagen: "/landing/mision/principios/transparencia.png" },
    { titulo: "Participación", imagen: "/landing/mision/principios/participacion.png" },
    { titulo: "Legalidad", imagen: "/landing/mision/principios/legalidad.png" },
    { titulo: "Equidad", imagen: "/landing/mision/principios/equidad.png" },
    { titulo: "Responsabilidad Social", imagen: "/landing/mision/principios/responsabilidad-social.png" },
    { titulo: "Rendición de Cuentas", imagen: "/landing/mision/principios/rendicion-cuentas.png" },
  ];

  return (
    <>
      <Navbar />

      <main className="min-h-screen overflow-hidden bg-white text-[#07122f]">
        {/* HERO */}
        <section className="relative overflow-hidden bg-[#071f4d]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(56,189,248,0.25),transparent_30%),radial-gradient(circle_at_85%_10%,rgba(45,91,227,0.35),transparent_28%),linear-gradient(135deg,#071f4d,#21409A_55%,#0B7C95)]" />

          <div className="absolute left-0 top-0 h-full w-full opacity-20">
            <div className="absolute left-10 top-20 h-40 w-40 rounded-full border border-white/30" />
            <div className="absolute bottom-16 right-20 h-64 w-64 rounded-full border border-white/20" />
            <div className="absolute left-1/2 top-10 h-24 w-24 rounded-full border border-cyan-200/30" />
          </div>

          <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 py-24 lg:grid-cols-[1.05fr_0.95fr] lg:px-10">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-5 py-2 text-sm font-black text-white backdrop-blur">
                <Sparkles size={16} />
                Identidad institucional
              </span>

              <h1 className="mt-8 text-5xl font-black leading-tight tracking-tight text-white md:text-7xl">
                Misión, Visión
                <span className="block text-cyan-100">y Principios</span>
              </h1>

              <p className="mt-7 max-w-2xl text-lg leading-8 text-blue-50">
                Una guía institucional que conecta el pensamiento humanista, la
                ética, la innovación social y el compromiso de los egresados con
                la región.
              </p>

              <div className="mt-10 flex flex-wrap gap-3">
                {["Humanismo", "Ética", "Innovación", "Región"].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-black text-white backdrop-blur"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-8 -top-8 h-32 w-32 rounded-full bg-cyan-300/25 blur-3xl" />
              <div className="absolute -bottom-8 -right-8 h-40 w-40 rounded-full bg-blue-300/25 blur-3xl" />

              <div className="relative rotate-1 rounded-[2.8rem] border border-white/25 bg-white/15 p-4 shadow-2xl backdrop-blur-xl">
                <div className="-rotate-1 overflow-hidden rounded-[2.2rem] border border-white/20">
                  <div className="relative h-[420px]">
                    <Image
                      src="/landing/mision/mision.jpg"
                      alt="Imagen institucional"
                      fill
                      priority
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30" />
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-7 left-8 rounded-3xl bg-white px-6 py-4 shadow-2xl">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eef5ff] text-[#21409A]">
                    <GraduationCap size={26} />
                  </div>

                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-[#8da0c6]">
                      ASEUNICESMAG
                    </p>
                    <p className="text-lg font-black text-[#21409A]">
                      Comunidad egresada
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 w-full">
            <svg
              viewBox="0 0 1440 120"
              className="h-16 w-full"
              preserveAspectRatio="none"
            >
              <path
                d="M0,70 C180,120 340,10 520,58 C700,105 850,115 1030,48 C1210,-18 1320,46 1440,20 L1440,120 L0,120 Z"
                fill="#ffffff"
              />
            </svg>
          </div>
        </section>

        {/* MISIÓN Y VISIÓN */}
        <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <div className="grid items-center gap-20 lg:grid-cols-2">
            <div>
              <h2 className="text-4xl font-black text-[#266BFF]">Misión</h2>

              <p className="mt-6 text-[15px] leading-8 text-[#173b6c]">
                La Asociación de Egresados de la Universidad CESMAG –
                ASEUNICESMAG, inspirada en principios humanistas y éticos,
                promueve la vinculación, el acompañamiento, la formación
                continua y el desarrollo profesional y social de sus
                asociados(as), proyectando su talento y compromiso hacia el
                fortalecimiento institucional y el impacto social en la región.
              </p>
            </div>

            <div className="relative h-[320px] overflow-hidden rounded-2xl">
              <Image
                src="/landing/mision/mision.jpg"
                alt="Misión ASEUNICESMAG"
                fill
                className="object-cover"
              />
            </div>

            <div className="relative h-[360px] overflow-hidden rounded-2xl">
              <Image
                src="/landing/mision/vision.jpg"
                alt="Visión ASEUNICESMAG"
                fill
                className="object-cover"
              />
            </div>

            <div>
              <h2 className="text-4xl font-black text-[#266BFF]">Visión</h2>

              <p className="mt-6 text-[15px] leading-8 text-[#173b6c]">
                ASEUNICESMAG será reconocida como una asociación referente por
                su compromiso ético, su capacidad de generar innovación social
                mediante soluciones creativas, inclusivas y sostenibles, y por
                la construcción de alianzas estratégicas que fortalezcan el
                tejido institucional y social en el suroccidente colombiano.
              </p>
            </div>
          </div>
        </section>

        {/* VALORES INSTITUCIONALES */}
        <section className="bg-[#e9f0f6] px-6 py-12 lg:px-10">
          <div className="mx-auto max-w-7xl text-center">
            <h2 className="text-4xl font-black text-[#266BFF]">
              Valores Institucionales
            </h2>

            <div className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
              {valores.map((valor) => (
                <div key={valor.titulo} className="flex flex-col items-center">
                  <div className="relative h-20 w-20">
                    <Image
                      src={valor.imagen}
                      alt={valor.titulo}
                      fill
                      className="object-contain"
                    />
                  </div>

                  <h3 className="mt-5 text-xl font-black text-[#266BFF]">
                    {valor.titulo}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PRINCIPIOS DE GOBIERNO */}
        <section className="bg-white px-6 py-12 lg:px-10">
          <div className="mx-auto max-w-7xl text-center">
            <h2 className="text-4xl font-black text-[#266BFF]">
              Principios de Gobierno
            </h2>

            <div className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
              {principios.map((principio) => (
                <div
                  key={principio.titulo}
                  className="flex flex-col items-center"
                >
                  <div className="relative h-20 w-20">
                    <Image
                      src={principio.imagen}
                      alt={principio.titulo}
                      fill
                      className="object-contain"
                    />
                  </div>

                  <h3 className="mt-5 text-xl font-black text-[#266BFF]">
                    {principio.titulo}
                  </h3>
                </div>
              ))}
            </div>

            <p className="mt-10 text-sm text-slate-500">
              Iconos diseñados por Wichai.wi from www.flaticon.es
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}