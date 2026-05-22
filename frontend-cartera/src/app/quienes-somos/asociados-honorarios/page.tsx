"use client";

import Link from "next/link";
import {
  Award,
  Download,
  GraduationCap,
  HeartHandshake,
  Sparkles,
  ShieldCheck,
  ImageIcon,
  ArrowRight,
  Star,
} from "lucide-react";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function AsociadosHonorariosPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen overflow-hidden bg-[#f4f8ff]">
        {/* HERO */}
        <section className="relative overflow-hidden bg-[#071f4d]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.18),transparent_30%),linear-gradient(135deg,#071f4d,#21409A_55%,#0B7C95)]" />

          {/* DECORACIÓN */}
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

          {/* ONDA */}
          <div className="absolute bottom-0 left-0 w-full">
            <svg
              viewBox="0 0 1440 120"
              className="h-16 w-full"
              preserveAspectRatio="none"
            >
              <path
                d="M0,64 C190,120 350,10 540,55 C730,100 920,110 1100,48 C1260,0 1350,35 1440,15 L1440,120 L0,120 Z"
                fill="#f4f8ff"
              />
            </svg>
          </div>
        </section>

        {/* CONTENIDO PRINCIPAL */}
        <section className="relative mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
            {/* TEXTO */}
            <div className="relative">
              <div className="absolute -left-10 top-0 h-44 w-44 rounded-full bg-[#21409A]/10 blur-3xl" />

              <div className="relative">
                <div className="mb-7 flex h-20 w-20 items-center justify-center rounded-[2rem] bg-gradient-to-br from-[#21409A] via-[#2D5BE3] to-[#38BDF8] text-white shadow-2xl shadow-blue-300/30">
                  <Award size={40} />
                </div>

                <span className="inline-flex items-center gap-2 rounded-full bg-[#eef5ff] px-5 py-2 text-sm font-black text-[#21409A]">
                  <GraduationCap size={16} />
                  Distinción institucional
                </span>

                <h2 className="mt-7 text-5xl font-black leading-tight text-[#07122f]">
                  Reconocimiento
                  <span className="block text-[#21409A]">
                    a nuestros asociados
                  </span>
                </h2>

                <p className="mt-8 text-lg leading-9 text-[#44506b]">
                  En reconocimiento a quienes han contribuido al desarrollo y
                  fortalecimiento de la Asociación, ASEUNICESMAG distingue a sus
                  Asociados(as) Honorarios(as), como símbolo de gratitud y
                  admiración por su compromiso con los valores institucionales y
                  el espíritu humanista CESMAG.
                </p>

                {/* FEATURES */}
                <div className="mt-10 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[2rem] border border-[#dbe7ff] bg-white p-5 shadow-lg shadow-blue-950/5">
                    <HeartHandshake className="mb-4 text-[#21409A]" size={30} />
                    <h3 className="text-xl font-black text-[#07122f]">
                      Gratitud institucional
                    </h3>
                  </div>

                  <div className="rounded-[2rem] border border-[#dbe7ff] bg-white p-5 shadow-lg shadow-blue-950/5">
                    <ShieldCheck className="mb-4 text-[#21409A]" size={30} />
                    <h3 className="text-xl font-black text-[#07122f]">
                      Compromiso humanista
                    </h3>
                  </div>
                </div>

                {/* BOTÓN PDF */}
                <div className="mt-10 flex flex-wrap gap-4">
                  <Link
                    href="/documentos/ASOCIADOS-HONORARIOS.pdf"
                    target="_blank"
                    className="group relative inline-flex items-center gap-3 overflow-hidden rounded-2xl bg-gradient-to-r from-[#21409A] via-[#2D5BE3] to-[#38BDF8] px-8 py-4 text-sm font-extrabold text-white shadow-[0_15px_40px_rgba(45,91,227,0.35)] transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02]"
                  >
                    {/* Glow */}
                    <span className="absolute inset-0 bg-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    {/* Icono */}
                    <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white/15 backdrop-blur-md">
                      <Download size={18} />
                    </span>

                    {/* Texto */}
                    <span className="relative flex flex-col text-left">
                      <span className="text-[11px] font-medium uppercase tracking-[0.25em] text-blue-100">
                        Documento
                      </span>

                      <span className="text-base font-black">Ver PDF</span>
                    </span>

                    {/* Flecha */}
                    <ArrowRight
                      size={20}
                      className="relative transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </Link>
                </div>
              </div>
            </div>

            {/* IMAGEN / TARJETA */}
            <div className="relative">
              {/* EFECTOS */}
              <div className="absolute -right-8 top-0 h-40 w-40 rounded-full bg-cyan-300/20 blur-3xl" />
              <div className="absolute bottom-0 left-0 h-52 w-52 rounded-full bg-blue-300/20 blur-3xl" />

              <div className="relative rotate-1 rounded-[3rem] bg-gradient-to-br from-[#21409A] via-[#2D5BE3] to-[#0B7C95] p-[1px] shadow-[0_30px_80px_rgba(33,64,154,0.35)]">
                <div className="-rotate-1 overflow-hidden rounded-[3rem] bg-[#0c2557]">
                  {/* PARTE SUPERIOR */}
                  <div className="relative overflow-hidden px-10 py-14">
                    <div className="absolute right-0 top-0 h-full w-full bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.14),transparent_35%)]" />

                    <div className="relative z-10">
                      <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-[2rem] border border-white/10 bg-white/10 text-white backdrop-blur">
                        <Star size={42} />
                      </div>

                      <h2 className="text-5xl font-black leading-tight text-white">
                        Asociados
                        <span className="block text-cyan-100">Honorarios</span>
                      </h2>

                      <div className="mt-8 h-[2px] w-full bg-gradient-to-r from-white/50 to-transparent" />

                      <p className="mt-8 max-w-lg leading-8 text-blue-50">
                        Reconocimiento institucional otorgado a quienes,
                        mediante su compromiso y trayectoria, han contribuido
                        significativamente al fortalecimiento de ASEUNICESMAG y
                        de la Universidad CESMAG.
                      </p>
                      <br />
                    </div>
                  </div>
                </div>
              </div>
              {/* TARJETA FLOTANTE */}
              <div className="absolute -bottom-8 left-8 rounded-[2rem] border border-[#dbe7ff] bg-white px-6 py-5 shadow-2xl shadow-blue-950/10">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eef5ff] text-[#21409A]">
                    <Award size={28} />
                  </div>

                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.25em] text-[#8da0c6]">
                      ASEUNICESMAG
                    </p>

                    <h3 className="text-xl font-black text-[#21409A]">
                      Honor y reconocimiento
                    </h3>
                  </div>
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
