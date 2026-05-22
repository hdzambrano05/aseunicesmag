"use client";

import {
  FileText,
  ShieldCheck,
  Landmark,
  Scale,
  LockKeyhole,
  Handshake,
  BarChart3,
  ArrowUpRight,
  Sparkles,
  Download,
  Eye,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function TransparenciaGobiernoPage() {
  const documentos = [
    {
      titulo: "Estatutos",
      descripcion:
        "Documento base de organización, derechos y deberes institucionales.",
      url: "/documentos/ESTATUTOS-ASEUNICESMAG.pdf",
      icono: Landmark,
    },
    {
      titulo: "Código de Gobierno Corporativo y Ética",
      descripcion:
        "Lineamientos de comportamiento ético, gobierno y buenas prácticas.",
      url: "/documentos/CODIGO-DE-GOBIERNO-CORPORATIVO-Y-ETICA-ASEUNICESMAG-2025-1.pdf",
      icono: ShieldCheck,
    },
    {
      titulo: "Política de tratamiento de datos personales",
      descripcion:
        "Protección, uso y manejo responsable de la información personal.",
      url: "/documentos/POLITICA-PROGRAMA-DE-ALIADOS_-DIRECTORIO-EMPRESARIAL-ASEUNICESMAG.pdf",
      icono: LockKeyhole,
    },
    {
      titulo: "Reglamento de tarifas ASEUNICESMAG",
      descripcion:
        "Información institucional sobre tarifas, valores y condiciones.",
      url: "/documentos/REGLAMENTO_TARIFAS_ASEUNICESMAG.pdf",
      icono: Scale,
    },
    {
      titulo: "Política de Aliados y Directorio Empresarial",
      descripcion:
        "Criterios para alianzas, beneficios y relacionamiento empresarial.",
      url: "/documentos/POLITICA-PROGRAMA-DE-ALIADOS_-DIRECTORIO-EMPRESARIAL-ASEUNICESMAG.pdf",
      icono: Handshake,
    },
    {
      titulo: "Informes de gestión",
      descripcion: "Resultados, avances y rendición de cuentas institucional.",
      url: "/documentos/informes-gestion.pdf",
      icono: BarChart3,
    },
  ];

  return (
    <>
      <Navbar />

      <main className="min-h-screen overflow-hidden bg-[#f4f8ff] text-[#07122f]">
        {/* HERO */}
        <section className="relative overflow-hidden bg-[#071f4d]">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(7,31,77,0.97),rgba(33,64,154,0.9),rgba(11,124,149,0.78)),url('/landing/transparencia/gobierno.jpg')] bg-cover bg-center" />

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.28),transparent_30%),radial-gradient(circle_at_85%_15%,rgba(255,255,255,0.18),transparent_25%)]" />

          <div className="relative mx-auto max-w-7xl px-6 py-24 text-center lg:px-10">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-5 py-2 text-sm font-black text-white backdrop-blur">
              <Sparkles size={16} />
              Transparencia institucional
            </span>

            <h1 className="mx-auto mt-8 max-w-5xl text-5xl font-black leading-tight tracking-tight text-white md:text-7xl">
              Transparencia y
              <span className="block text-cyan-100">Gobierno Corporativo</span>
            </h1>

            <p className="mx-auto mt-7 max-w-3xl text-lg font-semibold leading-8 text-blue-50">
              ASEUNICESMAG promueve la gestión ética, participativa y
              responsable.
            </p>

            <div className="mx-auto mt-8 h-px max-w-3xl bg-white/30" />

            <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-white/90">
              Consulta aquí los documentos clave de gobierno, control y
              transparencia.
            </p>
          </div>

          <div className="absolute bottom-0 left-0 w-full">
            <svg
              viewBox="0 0 1440 110"
              className="h-16 w-full"
              preserveAspectRatio="none"
            >
              <path
                d="M0,70 C220,120 360,20 560,65 C780,115 910,90 1080,45 C1260,0 1360,35 1440,15 L1440,110 L0,110 Z"
                fill="#f4f8ff"
              />
            </svg>
          </div>
        </section>

        {/* DOCUMENTOS */}
        <section className="relative mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <div className="mb-12 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-[#eaf2ff] px-5 py-2 text-sm font-black text-[#21409A]">
                <FileText size={17} />
                Documentos disponibles
              </span>

              <h2 className="mt-6 text-4xl font-black leading-tight text-[#07122f] md:text-5xl">
                Gobierno claro, accesible y responsable
              </h2>

              <p className="mt-5 max-w-2xl leading-8 text-[#52607c]">
                Accede a los documentos institucionales en una experiencia
                moderna, ordenada y fácil de consultar.
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {documentos.map((doc) => {
              const Icono = doc.icono;

              return (
                <article
                  key={doc.titulo}
                  className="group relative overflow-hidden rounded-[2.5rem] border border-[#dbe7ff] bg-white p-7 shadow-xl shadow-blue-950/5 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-950/10"
                >
                  <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-[#21409A]/10 blur-3xl transition group-hover:bg-cyan-300/20" />

                  <div className="relative">
                    <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-[#21409A] to-[#38BDF8] text-white shadow-xl shadow-blue-300/30">
                      <Icono size={30} />
                    </div>

                    <h3 className="mt-7 text-2xl font-black text-[#07122f]">
                      {doc.titulo}
                    </h3>

                    <p className="mt-4 min-h-[78px] leading-7 text-[#52607c]">
                      {doc.descripcion}
                    </p>

                    <div className="mt-7 flex flex-wrap gap-3">
                      <a
                        href={doc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#21409A] via-[#2D5BE3] to-[#38BDF8] px-5 py-3 text-sm font-black text-white shadow-lg shadow-blue-300/30 transition-all duration-300 hover:-translate-y-1"
                      >
                        <Eye size={17} />
                        Abrir PDF
                        <ArrowUpRight size={17} />
                      </a>

                      <a
                        href={doc.url}
                        download
                        className="inline-flex items-center gap-2 rounded-full border border-[#cfe0ff] bg-[#f4f8ff] px-5 py-3 text-sm font-black text-[#21409A] transition-all duration-300 hover:-translate-y-1 hover:bg-white"
                      >
                        <Download size={17} />
                        Descargar
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
