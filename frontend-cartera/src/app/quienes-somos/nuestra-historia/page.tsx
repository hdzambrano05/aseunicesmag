"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Building2,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Sparkles,
} from "lucide-react";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function NuestraHistoriaPage() {
  const imagenPrincipal = "/landing/nuestra-historia/4.jpeg";

  const fotosFundacion = [
    "/landing/nuestra-historia/1.jpg",
    "/landing/nuestra-historia/2.jpg",
    "/landing/nuestra-historia/3.jpg",
  ];

  const fotosRefundacion = [
    "/landing/nuestra-historia/new/1.jpg",
    "/landing/nuestra-historia/new/2.jpg",
    "/landing/nuestra-historia/new/3.jpg",
  ];

  const [fundacionIndex, setFundacionIndex] = useState(0);
  const [refundacionIndex, setRefundacionIndex] = useState(0);

  const siguiente = (
    total: number,
    actual: number,
    setActual: React.Dispatch<React.SetStateAction<number>>,
  ) => {
    setActual(actual === total - 1 ? 0 : actual + 1);
  };

  const anterior = (
    total: number,
    actual: number,
    setActual: React.Dispatch<React.SetStateAction<number>>,
  ) => {
    setActual(actual === 0 ? total - 1 : actual - 1);
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen overflow-hidden bg-[#f4f8ff] text-[#07122f]">
        {/* HERO */}
        <section className="relative overflow-hidden bg-[#071f4d]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(56,189,248,0.25),transparent_30%),radial-gradient(circle_at_85%_10%,rgba(45,91,227,0.35),transparent_28%),linear-gradient(135deg,#071f4d,#21409A_55%,#0B7C95)]" />

          <div className="absolute left-0 top-0 h-full w-full opacity-20">
            <div className="absolute left-10 top-20 h-40 w-40 rounded-full border border-white/30" />
            <div className="absolute bottom-16 right-20 h-64 w-64 rounded-full border border-white/20" />
            <div className="absolute left-1/2 top-10 h-24 w-24 rounded-full border border-cyan-200/30" />
          </div>

          <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:px-10">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-5 py-2 text-sm font-black text-white backdrop-blur">
                <Sparkles size={16} />
                Quiénes somos
              </span>

              <h1 className="mt-8 text-5xl font-black leading-tight tracking-tight text-white md:text-7xl">
                Nuestra
                <span className="block text-cyan-100">Historia</span>
              </h1>

              <p className="mt-7 max-w-2xl text-lg leading-8 text-blue-50">
                ASEUNICESMAG nace como una comunidad de egresados comprometida
                con mantener vivo el vínculo con su Alma Máter, fortalecer la
                identidad institucional y proyectar su compromiso social en la
                región.
              </p>

              <div className="mt-10 flex flex-wrap gap-3">
                {["2013 Asamblea", "2014 Constitución", "2025 Refundación"].map(
                  (item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-black text-white backdrop-blur"
                    >
                      {item}
                    </span>
                  ),
                )}
              </div>
            </div>

            {/* IMAGEN PRINCIPAL */}
            <div className="relative">
              <div className="absolute -left-8 -top-8 h-32 w-32 rounded-full bg-cyan-300/25 blur-3xl" />
              <div className="absolute -bottom-8 -right-8 h-40 w-40 rounded-full bg-blue-300/25 blur-3xl" />

              <div className="relative rotate-1 rounded-[2.8rem] border border-white/25 bg-white/15 p-4 shadow-2xl backdrop-blur-xl">
                <div className="-rotate-1 overflow-hidden rounded-[2.2rem] border border-white/20 bg-white/10">
                  <div className="relative h-[390px] w-full">
                    <Image
                      src="/landing/nuestra-historia/new/1.jpg"
                      alt="Historia de ASEUNICESMAG"
                      fill
                      priority
                      className="object-cover"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#07122f]/60 via-transparent to-transparent" />
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
              className="h-14 w-full"
              preserveAspectRatio="none"
            >
              <path
                d="M0,70 C180,120 340,10 520,58 C700,105 850,115 1030,48 C1210,-18 1320,46 1440,20 L1440,120 L0,120 Z"
                fill="#f4f8ff"
              />
            </svg>
          </div>
        </section>

        {/* CONTENIDO */}
        <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <div className="space-y-24">
            {/* FUNDACIÓN */}
            <div className="grid items-start gap-10 lg:grid-cols-[0.95fr_1.05fr]">
              <div className="flex gap-5">
                <Building2 className="mt-1 shrink-0 text-gray-400" size={34} />

                <div>
                  <h2 className="text-3xl font-black text-[#143a78]">
                    Fundación
                  </h2>

                  <p className="mt-2 text-[15px] leading-7 text-[#07122f]">
                    La Asociación de Egresados de la Universidad CESMAG –
                    ASEUNICESMAG nació como una iniciativa de un grupo de
                    profesionales comprometidos con mantener el vínculo con su
                    Alma Máter y fortalecer la identidad institucional de los
                    egresados.
                  </p>

                  <p className="mt-7 text-[15px] leading-7 text-[#07122f]">
                    Su primera Asamblea de conformación se realizó en octubre de
                    2013, y la Asociación fue legalmente constituida en enero de
                    2014, consolidándose como un espacio de encuentro, apoyo y
                    desarrollo profesional.
                  </p>
                </div>
              </div>

              <div>
                <div className="relative h-[280px] w-full overflow-hidden bg-slate-100 shadow-md md:h-[360px]">
                  <Image
                    src={fotosFundacion[fundacionIndex]}
                    alt="Fundación ASEUNICESMAG"
                    fill
                    className="object-cover"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      anterior(
                        fotosFundacion.length,
                        fundacionIndex,
                        setFundacionIndex,
                      )
                    }
                    className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#07122f] shadow-lg transition hover:scale-105"
                  >
                    <ChevronLeft size={24} />
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      siguiente(
                        fotosFundacion.length,
                        fundacionIndex,
                        setFundacionIndex,
                      )
                    }
                    className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#07122f] shadow-lg transition hover:scale-105"
                  >
                    <ChevronRight size={24} />
                  </button>
                </div>

                <div className="mt-5 flex justify-center gap-3">
                  {fotosFundacion.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setFundacionIndex(index)}
                      className={`h-2 rounded-full transition-all ${
                        fundacionIndex === index
                          ? "w-9 bg-black"
                          : "w-2 bg-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* REFUNDACIÓN */}
            <div className="grid items-start gap-10 lg:grid-cols-[0.95fr_1.05fr]">
              <div className="flex gap-5">
                <Building2 className="mt-1 shrink-0 text-gray-400" size={34} />

                <div>
                  <h2 className="text-3xl font-black text-[#143a78]">
                    Refundación
                  </h2>

                  <p className="mt-2 text-[15px] leading-7 text-[#173b6c]">
                    En 2025, ASEUNICESMAG emprendió un proceso de refundación y
                    fortalecimiento institucional, que dio paso a una nueva
                    etapa caracterizada por la actualización de sus Estatutos
                    (Acta No. 012 de agosto de 2025), la aprobación del Código
                    de Gobierno Corporativo y Ética, y la implementación de una
                    estrategia de modernización tecnológica con la creación de su
                    nuevo sitio web y sistema digital de afiliación.
                  </p>

                  <p className="mt-7 text-[15px] leading-7 text-[#173b6c]">
                    Hoy, ASEUNICESMAG se consolida como una comunidad moderna,
                    ética e inclusiva, que integra la tradición humanista de la
                    Universidad CESMAG con los retos del presente, promoviendo el
                    liderazgo, la innovación y el compromiso social de sus
                    egresados.
                  </p>
                </div>
              </div>

              <div>
                <div className="relative h-[280px] w-full overflow-hidden bg-slate-100 shadow-md md:h-[360px]">
                  <Image
                    src={fotosRefundacion[refundacionIndex]}
                    alt="Refundación ASEUNICESMAG"
                    fill
                    className="object-cover"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      anterior(
                        fotosRefundacion.length,
                        refundacionIndex,
                        setRefundacionIndex,
                      )
                    }
                    className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#07122f] shadow-lg transition hover:scale-105"
                  >
                    <ChevronLeft size={24} />
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      siguiente(
                        fotosRefundacion.length,
                        refundacionIndex,
                        setRefundacionIndex,
                      )
                    }
                    className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#07122f] shadow-lg transition hover:scale-105"
                  >
                    <ChevronRight size={24} />
                  </button>
                </div>

                <div className="mt-5 flex justify-center gap-3">
                  {fotosRefundacion.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setRefundacionIndex(index)}
                      className={`h-2 rounded-full transition-all ${
                        refundacionIndex === index
                          ? "w-9 bg-black"
                          : "w-2 bg-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}