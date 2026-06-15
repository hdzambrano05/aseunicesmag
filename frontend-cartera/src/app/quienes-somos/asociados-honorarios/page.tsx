"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Award,
  Download,
  GraduationCap,
  Sparkles,
} from "lucide-react";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function AsociadosHonorariosPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen overflow-hidden bg-white">
        {/* HERO */}
        <section className="relative overflow-hidden bg-[#071f4d]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.18),transparent_30%),linear-gradient(135deg,#071f4d,#21409A_55%,#0B7C95)]" />

          <div className="absolute left-0 top-0 h-full w-full opacity-20">
            <div className="absolute left-10 top-16 h-40 w-40 rounded-full border border-white/30" />
            <div className="absolute bottom-10 right-16 h-72 w-72 rounded-full border border-cyan-200/20" />
          </div>

          <div className="relative mx-auto max-w-7xl px-6 py-28 lg:px-10">
            <div className="max-w-4xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-black text-white backdrop-blur">
                <Sparkles size={16} />
                Reconocimiento institucional
              </span>

              <h1 className="mt-8 text-5xl font-black leading-tight tracking-tight text-white md:text-7xl">
                Asociados
                <span className="block bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
                  Honorarios
                </span>
              </h1>

              <p className="mt-7 max-w-3xl text-lg leading-8 text-blue-50">
                Un reconocimiento especial a quienes han contribuido al
                fortalecimiento institucional, al espíritu humanista y al
                crecimiento de ASEUNICESMAG.
              </p>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 w-full">
            <svg
              viewBox="0 0 1440 120"
              className="h-16 w-full"
              preserveAspectRatio="none"
            >
              <path
                d="M0,64 C190,120 350,10 540,55 C730,100 920,110 1100,48 C1260,0 1350,35 1440,15 L1440,120 L0,120 Z"
                fill="#ffffff"
              />
            </svg>
          </div>
        </section>

        {/* CONTENIDO COMO LA FOTO */}
        <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
          <div className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
            {/* TEXTO */}
            <div className="flex gap-5">
              <GraduationCap
                className="mt-1 shrink-0 text-gray-400"
                size={34}
              />

              <div>
                <h2 className="text-3xl font-black text-[#243f91]">
                  Asociados Honorarios
                </h2>

                <p className="mt-4 max-w-xl text-[15px] leading-8 text-[#07122f]">
                  En reconocimiento a quienes han contribuido al desarrollo y
                  fortalecimiento de la Asociación, ASEUNICESMAG distingue a sus
                  <strong> Asociados(as) Honorarios(as)</strong>, como símbolo
                  de gratitud y admiración por su compromiso con los valores
                  institucionales y el espíritu humanista CESMAG.
                </p>

                <div className="mt-10">
                  <Link
                    href="/documentos/ASOCIADOS-HONORARIOS.pdf"
                    target="_blank"
                    className="inline-flex items-center gap-3 rounded-lg bg-[#266BFF] px-6 py-4 text-sm font-semibold text-white shadow-md transition hover:bg-[#21409A]"
                  >
                    <Download size={18} />
                    Conoce a nuestros Asociados Honorarios
                  </Link>
                </div>
              </div>
            </div>

            {/* IMAGEN */}
            <div className="relative h-[320px] w-full overflow-hidden bg-slate-100">
              <Image
                src="/landing/asociados/asociados.png"
                alt="Asociados Honorarios ASEUNICESMAG"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}