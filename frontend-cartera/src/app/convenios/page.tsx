"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CheckCircle2,
  ExternalLink,
  Gift,
  Globe,
  IdCard,
  Mail,
  MapPin,
  Phone,
  Search,
  ShieldCheck,
  Sparkles,
  Store,
  Users,
  X,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { convenios } from "../data/convenios";

export default function ConveniosPage() {
  const [convenioSeleccionado, setConvenioSeleccionado] = useState<any>(null);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#f5f7fb]">
        <section className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-cyan-800 px-6 py-24 text-white">
          <div className="absolute left-0 top-0 h-80 w-80 rounded-full bg-cyan-400/20 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-blue-300/20 blur-3xl" />

          <div className="relative mx-auto max-w-7xl">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-black backdrop-blur">
                <Sparkles className="h-4 w-4" />
                Convenios ASEUNICESMAG
              </div>

              <h1 className="mt-8 text-5xl font-black leading-tight tracking-tight md:text-7xl">
                Beneficios exclusivos para asociados y egresados
              </h1>

              <p className="mt-6 max-w-3xl text-lg leading-8 text-blue-100">
                Conoce las empresas aliadas donde puedes activar descuentos,
                tarifas preferenciales y beneficios especiales presentando tu
                carné institucional o carné digital activo.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href="#lista-convenios"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-black text-blue-900 shadow-xl transition hover:bg-blue-50"
                >
                  Ver convenios
                  <ArrowRight className="h-4 w-4" />
                </a>

                <Link
                  href="/afiliacion"
                  className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-8 py-4 text-sm font-black text-white backdrop-blur transition hover:bg-white/20"
                >
                  Afiliarme
                </Link>
              </div>
            </div>

            <div className="mt-14 grid gap-5 md:grid-cols-3">
              {[
                {
                  icon: Store,
                  titulo: `${convenios.length} convenios activos`,
                  texto: "Aliados comerciales disponibles para la comunidad.",
                },
                {
                  icon: BadgeCheck,
                  titulo: "Beneficios verificables",
                  texto: "Activa tus descuentos con tu carné institucional.",
                },
                {
                  icon: ShieldCheck,
                  titulo: "Uso exclusivo",
                  texto: "Aplica para egresados y asociados ASEUNICESMAG.",
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <article
                    key={item.titulo}
                    className="rounded-[2rem] border border-white/15 bg-white/10 p-6 shadow-xl backdrop-blur"
                  >
                    <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-blue-900">
                      <Icon className="h-7 w-7" />
                    </div>

                    <h3 className="text-xl font-black">{item.titulo}</h3>
                    <p className="mt-2 leading-7 text-blue-100">{item.texto}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="relative z-10 mx-auto -mt-12 max-w-7xl px-6">
          <div className="grid overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white shadow-2xl md:grid-cols-[1fr_1fr]">
            <div className="p-8 md:p-10">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-800">
                <IdCard className="h-7 w-7" />
              </div>

              <h2 className="text-3xl font-black text-slate-950">
                Activa tus beneficios presentando
              </h2>

              <div className="mt-7 space-y-5">
                <div className="flex gap-4">
                  <CheckCircle2 className="mt-1 h-6 w-6 shrink-0 text-blue-700" />
                  <p className="leading-7 text-slate-600">
                    Si eres <strong>egresado UNICESMAG</strong>, presenta tu
                    carné institucional.
                  </p>
                </div>

                <div className="flex gap-4">
                  <CheckCircle2 className="mt-1 h-6 w-6 shrink-0 text-blue-700" />
                  <p className="leading-7 text-slate-600">
                    Si eres <strong>asociado(a) ASEUNICESMAG</strong>, presenta
                    tu carné digital de membresía activa.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-cyan-700 p-8 text-white md:p-10">
              <div className="absolute right-0 top-0 h-52 w-52 rounded-full bg-white/10 blur-3xl" />

              <div className="relative">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
                  <Gift className="h-7 w-7" />
                </div>

                <h3 className="text-3xl font-black">
                  Más beneficios para tu vida profesional y personal
                </h3>

                <p className="mt-4 leading-8 text-blue-100">
                  ASEUNICESMAG fortalece alianzas con empresas locales para
                  impulsar el bienestar, la formación y el crecimiento de sus
                  asociados.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="lista-convenios" className="mx-auto max-w-7xl px-6 py-24">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.3em] text-blue-800">
                Aliados
              </p>

              <h2 className="mt-4 text-4xl font-black tracking-tight text-slate-950 md:text-5xl">
                Convenios disponibles
              </h2>

              <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-500">
                Explora los aliados vinculados y conoce la información completa
                de cada convenio.
              </p>
            </div>

            <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-white px-5 py-3 shadow-sm">
              <Search className="h-5 w-5 text-blue-700" />
              <span className="text-sm font-bold text-slate-500">
                {convenios.length} convenios registrados
              </span>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {convenios.map((convenio, index) => (
              <article
                key={convenio.id}
                onClick={() => setConvenioSeleccionado(convenio)}
                className="group cursor-pointer overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="relative flex h-64 items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50 p-8">
                  <div className="absolute left-5 top-5 rounded-full bg-white px-4 py-2 text-xs font-black text-blue-800 shadow">
                    Convenio {String(index + 1).padStart(2, "0")}
                  </div>

                  <img
                    src={convenio.imagen}
                    alt={convenio.nombre}
                    className="max-h-40 max-w-full object-contain transition duration-500 group-hover:scale-110"
                  />
                </div>

                <div className="p-7">
                  <div className="mb-4 inline-flex rounded-full bg-blue-50 px-4 py-2 text-xs font-black uppercase tracking-wide text-blue-800">
                    {convenio.categoria}
                  </div>

                  <h3 className="text-2xl font-black text-slate-950">
                    {convenio.nombre}
                  </h3>

                  <p className="mt-3 line-clamp-3 leading-7 text-slate-500">
                    {convenio.descripcion}
                  </p>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setConvenioSeleccionado(convenio);
                    }}
                    className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-blue-800 px-6 py-3 text-sm font-black text-white shadow-lg shadow-blue-900/20 transition hover:bg-blue-900"
                  >
                    Visitar
                    <ExternalLink className="h-4 w-4" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-24">
          <div className="overflow-hidden rounded-[3rem] bg-gradient-to-r from-blue-950 via-blue-900 to-blue-700 p-10 text-white shadow-2xl md:p-16">
            <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-3xl bg-white/10">
                  <Users className="h-8 w-8" />
                </div>

                <h2 className="text-4xl font-black tracking-tight md:text-5xl">
                  ¿Quieres acceder a estos beneficios?
                </h2>

                <p className="mt-5 max-w-2xl text-lg leading-8 text-blue-100">
                  Afíliate a ASEUNICESMAG y activa tu membresía para disfrutar
                  de los convenios disponibles.
                </p>
              </div>

              <Link
                href="/afiliacion"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-black text-blue-900 shadow-xl transition hover:bg-blue-50"
              >
                Afiliarme ahora
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {convenioSeleccionado && (
          <div
            className="fixed inset-0 z-[999] flex items-center justify-center bg-slate-950/70 px-4 backdrop-blur-sm"
            onClick={() => setConvenioSeleccionado(null)}
          >
            <div
              className="relative max-h-[90vh] w-full max-w-6xl overflow-y-auto rounded-[2rem] bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setConvenioSeleccionado(null)}
                className="absolute right-5 top-5 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white text-slate-700 shadow-lg transition hover:bg-red-50 hover:text-red-600"
              >
                <X className="h-6 w-6" />
              </button>

              <div className="grid md:grid-cols-[0.9fr_1.1fr]">
                <div className="relative flex min-h-[360px] items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-10">
                  <div className="absolute left-0 top-0 h-56 w-56 rounded-full bg-blue-200/60 blur-3xl" />
                  <div className="absolute bottom-0 right-0 h-56 w-56 rounded-full bg-cyan-200/60 blur-3xl" />

                  <div className="relative flex h-72 w-full items-center justify-center rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl">
                    <img
                      src={convenioSeleccionado.imagen}
                      alt={convenioSeleccionado.nombre}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                </div>

                <div className="p-8 md:p-10">
                  <span className="inline-flex rounded-full bg-blue-50 px-4 py-2 text-xs font-black uppercase tracking-wide text-blue-800">
                    {convenioSeleccionado.categoria}
                  </span>

                  <h2 className="mt-5 text-4xl font-black text-slate-950">
                    {convenioSeleccionado.nombre}
                  </h2>

                  <p className="mt-4 leading-8 text-slate-600">
                    {convenioSeleccionado.descripcion}
                  </p>

                  <div className="mt-8 grid gap-4">
                    {convenioSeleccionado.direccion && (
                      <div className="flex gap-3 rounded-2xl bg-slate-50 p-4 text-slate-700">
                        <MapPin className="mt-1 h-5 w-5 shrink-0 text-blue-700" />
                        <div>
                          <p className="text-xs font-black uppercase tracking-wide text-slate-400">
                            Visítanos
                          </p>
                          <p className="mt-1 font-semibold">
                            {convenioSeleccionado.direccion}
                          </p>
                        </div>
                      </div>
                    )}

                    {convenioSeleccionado.telefono?.length > 0 && (
                      <div className="flex gap-3 rounded-2xl bg-slate-50 p-4 text-slate-700">
                        <Phone className="mt-1 h-5 w-5 shrink-0 text-blue-700" />
                        <div>
                          <p className="text-xs font-black uppercase tracking-wide text-slate-400">
                            Teléfono
                          </p>
                          <p className="mt-1 font-semibold">
                            {convenioSeleccionado.telefono.join(" / ")}
                          </p>
                        </div>
                      </div>
                    )}

                    {convenioSeleccionado.correo && (
                      <div className="flex gap-3 rounded-2xl bg-slate-50 p-4 text-slate-700">
                        <Mail className="mt-1 h-5 w-5 shrink-0 text-blue-700" />
                        <div>
                          <p className="text-xs font-black uppercase tracking-wide text-slate-400">
                            Correo
                          </p>
                          <p className="mt-1 font-semibold">
                            {convenioSeleccionado.correo}
                          </p>
                        </div>
                      </div>
                    )}

                    {convenioSeleccionado.sitio_web && (
                      <div className="flex gap-3 rounded-2xl bg-slate-50 p-4 text-slate-700">
                        <Globe className="mt-1 h-5 w-5 shrink-0 text-blue-700" />
                        <div>
                          <p className="text-xs font-black uppercase tracking-wide text-slate-400">
                            Sitio web
                          </p>
                          <a
                            href={convenioSeleccionado.sitio_web}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-1 block font-bold text-blue-800 hover:underline"
                          >
                            {convenioSeleccionado.sitio_web}
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-200 p-8 md:p-10">
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
                  <div>
                    <p className="text-sm font-black uppercase tracking-[0.3em] text-blue-800">
                      Beneficios
                    </p>
                    <h3 className="mt-2 text-3xl font-black text-slate-950">
                      Descuentos disponibles
                    </h3>
                  </div>

                  <div className="rounded-full bg-blue-50 px-5 py-3 text-sm font-black text-blue-800">
                    ASEUNICESMAG
                  </div>
                </div>

                <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
                  <table className="w-full border-collapse text-left">
                    <thead className="bg-blue-950 text-white">
                      <tr>
                        <th className="px-5 py-4 text-sm font-black">
                          Producto / Servicio
                        </th>
                        <th className="px-5 py-4 text-sm font-black">
                          Egresado UNICESMAG
                        </th>
                        <th className="px-5 py-4 text-sm font-black">
                          Asociado ASEUNICESMAG
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {convenioSeleccionado.descuentos.map(
                        (item: any, index: number) => (
                          <tr
                            key={`${item.producto}-${index}`}
                            className="border-t border-slate-200 bg-white"
                          >
                            <td className="px-5 py-4 font-bold text-slate-800">
                              {item.producto}
                            </td>
                            <td className="px-5 py-4 font-black text-blue-800">
                              {item.descuento_egresado}
                            </td>
                            <td className="px-5 py-4 font-black text-blue-800">
                              {item.descuento_asociado}
                            </td>
                          </tr>
                        ),
                      )}
                    </tbody>
                  </table>
                </div>

                {convenioSeleccionado.observacion && (
                  <p className="mt-5 rounded-2xl bg-blue-50 p-4 font-semibold text-blue-900">
                    {convenioSeleccionado.observacion}
                  </p>
                )}

                <div className="mt-8 rounded-[2rem] bg-slate-50 p-6">
                  <h4 className="font-black text-slate-950">
                    Activa tus beneficios presentando:
                  </h4>

                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    <div className="flex gap-3">
                      <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-blue-700" />
                      <p className="leading-7 text-slate-600">
                        Si eres egresado UNICESMAG, presenta tu carné
                        institucional.
                      </p>
                    </div>

                    <div className="flex gap-3">
                      <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-blue-700" />
                      <p className="leading-7 text-slate-600">
                        Si eres asociado(a) ASEUNICESMAG, presenta tu carné
                        digital de membresía activa.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
