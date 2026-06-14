"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Building2,
  BriefcaseBusiness,
  Crown,
  Network,
  ShieldCheck,
  Sparkles,
  Users,
  X,
  GraduationCap,
  Briefcase,
} from "lucide-react";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { persons, Persona } from "../../data/persons";

export default function EstructuraGobiernoPage() {
  const [personaSeleccionada, setPersonaSeleccionada] =
    useState<Persona | null>(null);

  const juntaDirectiva = persons.filter((p) => p.area === "Junta Directiva");

  const administracion = persons.find((p) => p.id === "administracion");

  const areaAdministrativa = persons.filter(
    (p) => p.area === "Área Administrativa y Financiera",
  );

  const control = persons.filter((p) => p.area === "Control");

  const sistemas = persons.filter(
    (p) => p.area === "Sistemas y Comunicaciones",
  );

  const abrirModal = (persona: Persona) => {
    if (persona.perfil) {
      setPersonaSeleccionada(persona);
    }
  };

  const PersonaCard = ({
    persona,
    principal = false,
  }: {
    persona: Persona;
    principal?: boolean;
  }) => {
    const Icono = persona.icono || Users;
    const tienePortafolio = Boolean(persona.perfil);

    return (
      <article
        onClick={() => abrirModal(persona)}
        className={`group relative overflow-hidden rounded-[2rem] border bg-white shadow-xl shadow-blue-950/10 transition duration-300 hover:-translate-y-1 hover:shadow-2xl ${principal ? "border-[#8fb7ff] p-5" : "border-[#dbe7ff] p-4"
          } ${tienePortafolio ? "cursor-pointer" : "cursor-default opacity-95"}`}
      >
        <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#21409A]/10 blur-2xl" />

        {tienePortafolio && (
          <div className="absolute right-4 top-4 z-10 rounded-full bg-[#21409A] px-3 py-1 text-[10px] font-black uppercase tracking-wide text-white shadow-lg">
            Ver perfil
          </div>
        )}

        <div className="relative flex items-center gap-4">
          <div
            className={`relative shrink-0 overflow-hidden rounded-2xl ring-4 ring-[#eef5ff] ${principal ? "h-24 w-24" : "h-20 w-20"
              }`}
          >
            <Image
              src={persona.foto}
              alt={persona.nombre}
              fill
              className="object-cover transition duration-500 group-hover:scale-110"
            />
          </div>

          <div className="min-w-0">
            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-[#eef5ff] px-3 py-1 text-xs font-black uppercase tracking-wide text-[#21409A]">
              <Icono size={14} />
              {persona.cargo}
            </div>

            <h3
              className={`font-black leading-tight text-[#07122f] ${principal ? "text-2xl" : "text-lg"
                }`}
            >
              {persona.nombre}
            </h3>

            <p className="mt-2 text-sm font-semibold leading-6 text-[#52607c]">
              Cargo: {persona.cargo}
            </p>
          </div>
        </div>
      </article>
    );
  };

  const AreaCard = ({
    titulo,
    icono: Icono,
    personas,
  }: {
    titulo: string;
    icono: any;
    personas: Persona[];
  }) => (
    <section className="relative rounded-[2.5rem] border border-[#dbe7ff] bg-white/90 p-6 shadow-xl shadow-blue-950/5 backdrop-blur">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#21409A] to-[#38BDF8] text-white shadow-lg">
          <Icono size={24} />
        </div>

        <div>
          <p className="text-xs font-black uppercase tracking-[0.25em] text-[#21409A]">
            Área
          </p>
          <h2 className="text-2xl font-black text-[#07122f]">{titulo}</h2>
        </div>
      </div>

      <div className="grid gap-4">
        {personas.map((persona) => (
          <PersonaCard key={persona.id} persona={persona} />
        ))}
      </div>
    </section>
  );

  return (
    <>
      <Navbar />

      <main className="min-h-screen overflow-hidden bg-[#f4f8ff] text-[#07122f]">
        <section className="relative overflow-hidden bg-[#071f4d] py-24">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(56,189,248,0.22),transparent_30%),radial-gradient(circle_at_85%_10%,rgba(45,91,227,0.35),transparent_28%),linear-gradient(135deg,#071f4d,#21409A_55%,#0B7C95)]" />

          <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-5 py-2 text-sm font-black text-white backdrop-blur">
              <Network size={17} />
              Gobierno corporativo
            </span>

            <h1 className="mt-8 max-w-4xl text-5xl font-black leading-tight text-white md:text-7xl">
              Estructura de Gobierno
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-blue-50">
              Organización directiva, administrativa, financiera, de control y
              comunicaciones de ASEUNICESMAG para el periodo institucional
              2025-2027.
            </p>

            <div className="mt-10 inline-flex rounded-3xl border border-white/20 bg-white/10 px-6 py-4 text-white backdrop-blur">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.25em] text-cyan-100">
                  Nueva Junta Directiva
                </p>
                <p className="mt-1 text-3xl font-black">2025 - 2027</p>
              </div>
            </div>
          </div>
        </section>

        <section className="relative mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <div className="relative mx-auto max-w-3xl">
            <div className="mb-12 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-[#21409A] to-[#38BDF8] text-white shadow-xl shadow-blue-300/40">
                <Crown size={32} />
              </div>

              <h2 className="mt-5 text-4xl font-black text-[#07122f]">
                Junta Directiva
              </h2>

              <p className="mt-3 text-[#52607c]">
                Máximo órgano de dirección institucional.
              </p>
            </div>
          </div>

          {/* ORGANIGRAMA */}
          <div className="relative mx-auto max-w-6xl rounded-[3rem] border border-[#dbe7ff] bg-white/60 px-4 py-10 shadow-2xl shadow-blue-950/5 backdrop-blur md:px-8 lg:px-12">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(56,189,248,0.16),transparent_35%)]" />

            {/* Presidenta */}
            <div className="relative z-20 mx-auto max-w-[460px]">
              <div className="absolute -inset-2 -z-10 rounded-[2.5rem] bg-gradient-to-br from-[#21409A]/20 to-[#38BDF8]/20 blur-xl" />
              <PersonaCard persona={juntaDirectiva[0]} principal />
            </div>

            {/* Línea Presidenta -> Control */}
            <div className="mx-auto h-12 w-px bg-gradient-to-b from-[#21409A]/60 to-[#38BDF8]/60" />

            {/* Área de Control */}
            {control.length > 0 && (
              <div className="relative z-20 mx-auto max-w-[520px] rounded-[2.5rem] border border-[#b8d4ff] bg-white p-5 shadow-2xl shadow-blue-950/10">
                <div className="absolute -inset-1 -z-10 rounded-[2.7rem] bg-gradient-to-br from-[#21409A]/15 to-[#38BDF8]/20 blur-xl" />

                <div className="mb-5 flex items-center justify-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#21409A] to-[#38BDF8] text-white shadow-lg">
                    <ShieldCheck size={24} />
                  </div>

                  <div className="text-center">
                    <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#21409A]">
                      Área estratégica
                    </p>
                    <h2 className="text-2xl font-black text-[#07122f]">
                      Área de Control
                    </h2>
                  </div>
                </div>

                <div className="grid gap-4">
                  {control.map((persona) => (
                    <PersonaCard key={persona.id} persona={persona} />
                  ))}
                </div>
              </div>
            )}

            {/* Línea Control -> Junta */}
            <div className="mx-auto h-12 w-px bg-gradient-to-b from-[#21409A]/60 to-[#38BDF8]/60" />

            {/* Línea horizontal */}
            <div className="mx-auto hidden h-px max-w-5xl bg-gradient-to-r from-transparent via-[#21409A]/50 to-transparent lg:block" />

            {/* Directivos inferiores */}
            <div className="relative mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {juntaDirectiva.slice(1).map((persona) => (
                <div key={persona.id} className="relative">
                  <div className="absolute -top-8 left-1/2 hidden h-8 w-px -translate-x-1/2 bg-[#21409A]/40 lg:block" />
                  <PersonaCard persona={persona} />
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto my-14 hidden h-20 w-px bg-gradient-to-b from-[#21409A]/40 to-[#38BDF8]/40 lg:block" />

          {administracion && (
            <div className="relative mx-auto max-w-3xl rounded-[2.8rem] border border-[#c7dcff] bg-white p-6 shadow-2xl shadow-blue-950/10">
              <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-[#38BDF8]/15 blur-3xl" />
              <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-[#21409A]/15 blur-3xl" />

              <div className="relative mb-5 flex items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#21409A] to-[#38BDF8] text-white">
                  <Building2 size={28} />
                </div>

                <div>
                  <p className="text-xs font-black uppercase tracking-[0.25em] text-[#21409A]">
                    Administración
                  </p>
                  <h2 className="text-3xl font-black text-[#07122f]">
                    Dirección General
                  </h2>
                </div>
              </div>

              <PersonaCard persona={administracion} principal />
            </div>
          )}

          <div className="relative mx-auto my-14 hidden h-20 w-px bg-gradient-to-b from-[#21409A]/40 to-[#38BDF8]/40 lg:block" />

          <div className="relative grid gap-8 lg:grid-cols-2">
            <AreaCard
              titulo="Administrativa y financiera"
              icono={BriefcaseBusiness}
              personas={areaAdministrativa}
            />

            <AreaCard
              titulo="Sistemas y Comunicaciones"
              icono={Sparkles}
              personas={sistemas}
            />
          </div>
        </section>
      </main>

      {personaSeleccionada && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-[#07122f]/70 px-4 backdrop-blur-sm">
          <div className="relative max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-[2rem] bg-white shadow-2xl">
            <button
              onClick={() => setPersonaSeleccionada(null)}
              className="absolute right-5 top-5 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#21409A] shadow-lg transition hover:scale-105 hover:bg-[#eef5ff]"
            >
              <X size={22} />
            </button>

            <div className="relative overflow-hidden rounded-t-[2rem] bg-gradient-to-br from-[#071f4d] via-[#21409A] to-[#38BDF8] p-8 text-white">
              <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-white/10 blur-3xl" />

              <div className="relative flex flex-col gap-6 md:flex-row md:items-center">
                <div className="relative h-36 w-36 shrink-0 overflow-hidden rounded-[2rem] ring-4 ring-white/30">
                  <Image
                    src={personaSeleccionada.foto}
                    alt={personaSeleccionada.nombre}
                    fill
                    className="object-cover"
                  />
                </div>

                <div>
                  <p className="mb-3 inline-flex rounded-full bg-white/15 px-4 py-2 text-xs font-black uppercase tracking-[0.25em]">
                    Portafolio
                  </p>

                  <h2 className="text-4xl font-black leading-tight">
                    {personaSeleccionada.nombre}
                  </h2>

                  <p className="mt-3 text-xl font-bold text-cyan-100">
                    {personaSeleccionada.cargo}
                  </p>

                  <p className="mt-2 text-sm font-semibold text-blue-50">
                    {personaSeleccionada.area}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-6 p-8 md:grid-cols-2">
              <section className="rounded-[1.5rem] border border-[#dbe7ff] bg-[#f8fbff] p-6">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#21409A] text-white">
                    <GraduationCap size={22} />
                  </div>
                  <h3 className="text-2xl font-black text-[#07122f]">
                    Formación académica
                  </h3>
                </div>

                <ul className="space-y-3">
                  {personaSeleccionada.perfil?.formacion.map((item, index) => (
                    <li
                      key={index}
                      className="rounded-2xl bg-white px-4 py-3 text-sm font-semibold leading-6 text-[#52607c] shadow-sm"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </section>

              <section className="rounded-[1.5rem] border border-[#dbe7ff] bg-[#f8fbff] p-6">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#21409A] text-white">
                    <Briefcase size={22} />
                  </div>
                  <h3 className="text-2xl font-black text-[#07122f]">
                    Experiencia
                  </h3>
                </div>

                <ul className="space-y-3">
                  {personaSeleccionada.perfil?.experiencia.map((item, index) => (
                    <li
                      key={index}
                      className="rounded-2xl bg-white px-4 py-3 text-sm font-semibold leading-6 text-[#52607c] shadow-sm"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
