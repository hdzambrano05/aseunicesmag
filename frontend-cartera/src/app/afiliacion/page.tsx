"use client";

import { useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Banknote,
  Building2,
  Download,
  FileText,
  GraduationCap,
  Handshake,
  HeartHandshake,
  Sparkles,
  Star,
  TrendingUp,
  Users,
  WalletCards,
} from "lucide-react";

import FormularioAfiliacion from "./components/FormularioAfiliacion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function AfiliacionPage() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const beneficios = [
    {
      icono: GraduationCap,
      titulo: "Formación académica",
      texto: "Descuentos en programas de UNICESMAG para egresados e hijos.",
    },
    {
      icono: Handshake,
      titulo: "Convenios comerciales",
      texto: "Tarifas preferenciales con aliados estratégicos.",
    },
    {
      icono: TrendingUp,
      titulo: "Desarrollo profesional",
      texto: "Mentorías, empleabilidad y participación en redes.",
    },
    {
      icono: HeartHandshake,
      titulo: "Bienestar y proyección social",
      texto: "Actividades culturales, recreativas y solidarias.",
    },
    {
      icono: Users,
      titulo: "Programa de referidos",
      texto: "Obtén dos cuotas de descuento por cada nuevo afiliado referido.",
    },
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#f4f8ff] text-[#07122f]">
        {!mostrarFormulario ? (
          <>
            <section className="relative overflow-hidden bg-[#071f4d]">
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(7,31,77,0.97),rgba(33,64,154,0.92),rgba(12,94,150,0.82)),url('/landing/afiliacion/banner-afiliacion.jpg')] bg-cover bg-center" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.28),transparent_30%),radial-gradient(circle_at_90%_10%,rgba(255,255,255,0.15),transparent_28%)]" />

              <div className="relative mx-auto max-w-7xl px-6 py-24 text-center lg:px-10">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-5 py-2 text-sm font-black text-white backdrop-blur">
                  <Sparkles size={16} />
                  Afíliate a ASEUNICESMAG
                </span>

                <h1 className="mx-auto mt-8 max-w-5xl text-5xl font-black leading-tight tracking-tight text-white md:text-7xl">
                  ¡Haz parte de nuestra
                  <span className="block text-cyan-100">comunidad!</span>
                </h1>

                <p className="mx-auto mt-7 max-w-3xl text-lg font-semibold leading-8 text-blue-50">
                  Fortalece el vínculo con tu Alma Máter y accede a beneficios,
                  formación y oportunidades profesionales.
                </p>

                <button
                  onClick={() => setMostrarFormulario(true)}
                  className="mt-10 inline-flex items-center gap-3 rounded-full bg-white px-9 py-5 text-base font-black text-[#21409A] shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:scale-105"
                >
                  Comenzar afiliación
                  <ArrowRight size={20} />
                </button>
              </div>
            </section>

            <section className="mx-auto grid max-w-7xl gap-8 px-6 py-20 lg:grid-cols-2 lg:px-10">
              <div className="rounded-[2.5rem] border border-[#dbe7ff] bg-white p-8 shadow-xl shadow-blue-950/5">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#eaf2ff] px-4 py-2 text-sm font-black text-[#21409A]">
                  <FileText size={16} />
                  Pasos para afiliarte
                </span>

                <p className="mt-6 leading-8 text-[#52607c]">
                  Si eres egresado(a), estudiante de último semestre o docente
                  de la Universidad CESMAG, puedes hacer parte de ASEUNICESMAG.
                </p>

                <div className="mt-8 space-y-5">
                  <div className="rounded-3xl border border-blue-200 bg-[#f8fbff] p-6">
                    <div className="flex gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#21409A] text-white">
                        <Banknote size={24} />
                      </div>

                      <div className="space-y-1 font-bold text-[#07122f]">
                        <p>Valor de afiliación: $87.000</p>
                        <p>Cuota de sostenimiento: $17.000</p>
                        <p>Bancolombia – Cta. de ahorros</p>
                        <p>N° 87922846411</p>
                        <p>NIT: 9006903173</p>
                        <p>ASEUNICESMAG</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 rounded-3xl border border-blue-200 bg-white p-5 font-black text-[#21409A]">
                    <WalletCards size={24} />
                    Diligencia el formulario de afiliación
                  </div>

                  <div className="flex items-center gap-4 rounded-3xl border border-blue-200 bg-white p-5 font-black text-[#21409A]">
                    <BadgeCheck size={24} />
                    Recibe tu carné y comienza a disfrutar los beneficios
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap gap-4">
                  <a
                    href="/documentos/formulario-afiliacion.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#21409A] to-[#38BDF8] px-6 py-4 text-sm font-black text-white shadow-lg shadow-blue-300/30"
                  >
                    <Download size={18} />
                    Formulario PDF
                  </a>

                  <a
                    href="/documentos/reglamento-tarifas.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-[#cfe0ff] bg-[#f4f8ff] px-6 py-4 text-sm font-black text-[#21409A]"
                  >
                    <FileText size={18} />
                    Reglamento tarifas PDF
                  </a>
                </div>
              </div>

              <div className="rounded-[2.5rem] bg-[#21409A] p-8 text-white shadow-2xl shadow-blue-950/20">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-black backdrop-blur">
                  <Star size={16} />
                  Beneficios para asociado
                </span>

                <h2 className="mt-6 text-4xl font-black">
                  Beneficios que impulsan tu crecimiento
                </h2>

                <div className="mt-8 grid gap-5">
                  {beneficios.map((item) => {
                    const Icono = item.icono;

                    return (
                      <div
                        key={item.titulo}
                        className="rounded-3xl bg-white p-5 text-[#07122f] shadow-lg transition-all duration-300 hover:-translate-y-1"
                      >
                        <div className="flex gap-4">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#eaf2ff] text-[#21409A]">
                            <Icono size={24} />
                          </div>

                          <div>
                            <h3 className="text-lg font-black text-[#21409A]">
                              {item.titulo}
                            </h3>
                            <p className="mt-1 text-sm leading-6 text-[#52607c]">
                              {item.texto}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          </>
        ) : (
          <section className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
            <button
              onClick={() => setMostrarFormulario(false)}
              className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#cfe0ff] bg-white px-6 py-3 text-sm font-black text-[#21409A] shadow-sm"
            >
              ← Volver a información
            </button>

            <FormularioAfiliacion />
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
