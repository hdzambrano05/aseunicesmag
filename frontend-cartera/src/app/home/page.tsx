"use client";

import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CreditCard,
  FileText,
  GraduationCap,
  LockKeyhole,
  ShieldCheck,
  Users,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const beneficios = [
  {
    icon: Users,
    titulo: "Red de egresados",
    texto: "Fortalece tu vínculo profesional con la comunidad universitaria.",
  },
  {
    icon: FileText,
    titulo: "Trámites digitales",
    texto:
      "Gestiona afiliación, documentos y solicitudes desde una plataforma segura.",
  },
  {
    icon: CreditCard,
    titulo: "Control de pagos",
    texto:
      "Consulta obligaciones, estados de membresía y comprobantes registrados.",
  },
];

const pasos = [
  "Registro de información",
  "Carga documental",
  "Validación administrativa",
  "Activación del asociado",
];

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#f4f7fb]">
        <section className="relative overflow-hidden bg-white">

          <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 py-20 lg:grid-cols-[1.05fr_.95fr] lg:py-24">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-bold text-blue-800">
                <Building2 className="h-4 w-4" />
                Asociación de Egresados UNICESMAG
              </div>

              <h1 className="mt-7 max-w-4xl text-4xl font-black leading-tight tracking-tight text-slate-950 md:text-6xl">
                Gestión institucional para egresados y asociados
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
                Una plataforma moderna para centralizar afiliaciones, pagos,
                documentos y servicios digitales de ASEUNICESMAG.
              </p>

              <div className="mt-9 flex flex-wrap gap-4">
                <Link
                  href="/afiliacion"
                  className="inline-flex items-center gap-2 rounded-full bg-blue-800 px-7 py-3 text-sm font-black text-white shadow-lg shadow-blue-900/20 transition hover:bg-blue-900"
                >
                  Afiliarme ahora
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-7 py-3 text-sm font-black text-slate-700 transition hover:border-blue-700 hover:text-blue-800"
                >
                  Iniciar sesión
                </Link>
              </div>

              <div className="mt-12 grid max-w-2xl grid-cols-3 gap-4">
                {[
                  ["100%", "Proceso digital"],
                  ["24/7", "Acceso disponible"],
                  ["Seguro", "Control por rol"],
                ].map(([numero, texto]) => (
                  <div
                    key={texto}
                    className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
                  >
                    <p className="text-2xl font-black text-blue-900">
                      {numero}
                    </p>
                    <p className="mt-1 text-xs font-semibold text-slate-500">
                      {texto}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-5 rounded-[3rem] bg-blue-900/10" />

              <div className="relative overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white shadow-2xl shadow-slate-900/10">
                <div className="bg-gradient-to-r from-blue-950 to-blue-700 px-7 py-6 text-white">
                  <p className="text-sm font-bold text-blue-100">
                    Panel ASEUNICESMAG
                  </p>
                  <h2 className="mt-1 text-2xl font-black">
                    Servicios digitales para asociados
                  </h2>
                </div>

                <div className="space-y-4 p-6">
                  {[
                    {
                      icon: BadgeCheck,
                      title: "Afiliación en línea",
                      text: "Registro y revisión administrativa.",
                    },
                    {
                      icon: ShieldCheck,
                      title: "Estado de membresía",
                      text: "Consulta de información y beneficios.",
                    },
                    {
                      icon: LockKeyhole,
                      title: "Acceso seguro",
                      text: "Ingreso protegido según usuario y rol.",
                    },
                  ].map((item) => {
                    const Icon = item.icon;

                    return (
                      <div
                        key={item.title}
                        className="flex gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-5"
                      >
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-blue-800">
                          <Icon className="h-6 w-6" />
                        </div>

                        <div>
                          <p className="font-black text-slate-900">
                            {item.title}
                          </p>
                          <p className="mt-1 text-sm text-slate-500">
                            {item.text}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-20">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-widest text-blue-800">
                Beneficios
              </p>
              <h2 className="mt-3 max-w-2xl text-3xl font-black tracking-tight text-slate-950 md:text-4xl">
                Soluciones pensadas para la comunidad asociada
              </h2>
            </div>

            <p className="max-w-md text-sm leading-7 text-slate-500">
              Una experiencia institucional, clara y ordenada para gestionar los
              procesos principales de cada asociado.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {beneficios.map((beneficio) => {
              const Icon = beneficio.icon;

              return (
                <article
                  key={beneficio.titulo}
                  className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-800">
                    <Icon className="h-7 w-7" />
                  </div>

                  <h3 className="text-xl font-black text-slate-950">
                    {beneficio.titulo}
                  </h3>

                  <p className="mt-3 leading-7 text-slate-500">
                    {beneficio.texto}
                  </p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-black uppercase tracking-widest text-blue-800">
                Proceso de afiliación
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">
                Un flujo claro, seguro y administrativo
              </h2>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-4">
              {pasos.map((texto, index) => (
                <div
                  key={texto}
                  className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6 text-center"
                >
                  <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-blue-900 text-lg font-black text-white">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <p className="font-black text-slate-800">{texto}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-20">
          <div className="overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-blue-950 via-blue-900 to-blue-700 p-10 text-white shadow-2xl md:p-14">
            <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
                  <GraduationCap className="h-7 w-7" />
                </div>

                <h2 className="text-3xl font-black tracking-tight md:text-4xl">
                  Forma parte de ASEUNICESMAG
                </h2>

                <p className="mt-4 max-w-2xl leading-7 text-blue-100">
                  Inicia tu proceso de afiliación y accede a una plataforma
                  diseñada para brindar orden, seguridad y eficiencia.
                </p>
              </div>

              <Link
                href="/afiliacion"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-3 text-sm font-black text-blue-900 shadow-xl transition hover:bg-blue-50"
              >
                Comenzar afiliación
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
