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

  const juntaDirectiva = persons.filter(
    (p) => p.area === "Junta Directiva",
  );

  const administracion = persons.find(
    (p) => p.id === "administracion",
  );

  const areaAdministrativa = persons.filter(
    (p) => p.area === "Área Administrativa y Financiera",
  );

  const control = persons.filter(
    (p) => p.area === "Control",
  );

  const sistemas = persons.filter(
    (p) => p.area === "Sistemas y Comunicaciones",
  );

  const presidenta = juntaDirectiva[0];
  const directivos = juntaDirectiva.slice(1);

  const abrirModal = (persona: Persona) => {
    if (persona.perfil) {
      setPersonaSeleccionada(persona);
    }
  };

  /*
   * CARD PRESIDENTA
   */
  const PresidentaCard = ({
    persona,
  }: {
    persona: Persona;
  }) => {
    const tienePortafolio = Boolean(persona.perfil);

    return (
      <article
        onClick={() => abrirModal(persona)}
        className={`group relative overflow-hidden rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-[0_12px_35px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_18px_45px_rgba(15,23,42,0.12)] ${
          tienePortafolio
            ? "cursor-pointer"
            : "cursor-default"
        }`}
      >
        {/* Línea superior */}
        <div className="absolute left-0 top-0 h-[4px] w-full bg-gradient-to-r from-[#173B7A] via-[#21409A] to-[#159BB5]" />

        <div className="flex flex-col items-center gap-5 sm:flex-row">
          {/* Foto */}
          <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full border-[5px] border-[#F1F5FB] bg-slate-100 shadow-sm">
            <Image
              src={persona.foto}
              alt={persona.nombre}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          {/* Información */}
          <div className="min-w-0 flex-1 text-center sm:text-left">
            <div className="mb-2 inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.16em] text-[#21409A]">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#EEF4FF] text-[#21409A]">
                <Crown size={14} strokeWidth={2.4} />
              </span>

              {persona.cargo}
            </div>

            <h3 className="text-2xl font-extrabold leading-tight text-[#0B1B3A] md:text-[28px]">
              {persona.nombre}
            </h3>
          </div>

          {tienePortafolio && (
            <div className="hidden shrink-0 lg:block">
              <span className="rounded-full border border-[#D7E4F8] bg-[#F7FAFF] px-4 py-2 text-[10px] font-extrabold uppercase tracking-wide text-[#21409A]">
                Ver perfil
              </span>
            </div>
          )}
        </div>
      </article>
    );
  };

  /*
   * CARD DIRECTIVOS
   */
  const DirectivoCard = ({
    persona,
  }: {
    persona: Persona;
  }) => {
    const Icono = persona.icono || Users;
    const tienePortafolio = Boolean(persona.perfil);

    return (
      <article
        onClick={() => abrirModal(persona)}
        className={`group relative h-full min-h-[210px] rounded-2xl border border-[#DDE5F0] bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.07)] transition-all duration-300 hover:-translate-y-1 hover:border-[#AEC9F5] hover:shadow-[0_16px_38px_rgba(15,23,42,0.11)] ${
          tienePortafolio
            ? "cursor-pointer"
            : "cursor-default"
        }`}
      >
        <div className="flex h-full flex-col items-center text-center">
          {/* Foto */}
          <div className="relative -mt-11 mb-4 h-[78px] w-[78px] overflow-hidden rounded-full border-[5px] border-white bg-slate-100 shadow-[0_5px_18px_rgba(15,23,42,0.14)] ring-1 ring-[#DDE5F0]">
            <Image
              src={persona.foto}
              alt={persona.nombre}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-[#F0F5FF] text-[#21409A]">
            <Icono size={18} strokeWidth={2} />
          </div>

          <h3 className="min-h-[48px] text-lg font-extrabold leading-6 text-[#0B1B3A]">
            {persona.nombre}
          </h3>

          <div className="my-3 h-[2px] w-7 rounded-full bg-[#21409A]" />

          <p className="text-xs font-medium text-[#66758F]">
            Cargo: {persona.cargo}
          </p>

          {tienePortafolio && (
            <span className="mt-auto pt-4 text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#21409A] opacity-0 transition-opacity group-hover:opacity-100">
              Ver perfil
            </span>
          )}
        </div>
      </article>
    );
  };

  /*
   * CARD PERSONA HORIZONTAL
   */
  const PersonaHorizontal = ({
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
        className={`group relative rounded-xl border bg-white transition-all duration-300 hover:-translate-y-[2px] ${
          principal
            ? "border-[#C9D8EF] px-5 py-4 shadow-[0_8px_25px_rgba(15,23,42,0.07)]"
            : "border-[#DDE5F0] px-4 py-3 shadow-[0_7px_20px_rgba(15,23,42,0.06)]"
        } ${
          tienePortafolio
            ? "cursor-pointer"
            : "cursor-default"
        }`}
      >
        <div className="flex items-center gap-4">
          {/* Foto */}
          <div
            className={`relative shrink-0 overflow-hidden rounded-full border-4 border-[#F3F6FA] bg-slate-100 ring-1 ring-[#D9E2EF] ${
              principal
                ? "h-[78px] w-[78px]"
                : "h-[64px] w-[64px]"
            }`}
          >
            <Image
              src={persona.foto}
              alt={persona.nombre}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          {/* Información */}
          <div className="min-w-0 flex-1">
            <div className="mb-1 inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-[0.06em] text-[#21409A]">
              <Icono size={12} />
              {persona.cargo}
            </div>

            <h3
              className={`font-extrabold leading-tight text-[#0B1B3A] ${
                principal
                  ? "text-lg md:text-xl"
                  : "text-sm md:text-base"
              }`}
            >
              {persona.nombre}
            </h3>

            <p className="mt-1 text-xs font-medium text-[#66758F]">
              Cargo: {persona.cargo}
            </p>
          </div>

          {tienePortafolio && (
            <span className="hidden shrink-0 rounded-full bg-[#173B7A] px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-wide text-white shadow-sm md:block">
              Ver perfil
            </span>
          )}
        </div>
      </article>
    );
  };

  /*
   * ÁREA INFERIOR
   */
  const AreaCard = ({
    titulo,
    icono: Icono,
    personas,
  }: {
    titulo: string;
    icono: any;
    personas: Persona[];
  }) => (
    <section className="relative h-full rounded-2xl border border-[#DCE4EF] bg-white p-5 shadow-[0_10px_35px_rgba(15,23,42,0.06)] md:p-6">
      {/* Encabezado */}
      <div className="mb-6 flex items-center gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#173B7A] to-[#159BB5] text-white shadow-[0_6px_18px_rgba(33,64,154,0.22)]">
          <Icono size={22} />
        </div>

        <div>
          <p className="mb-1 text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#2B63B8]">
            Área
          </p>

          <h2 className="text-xl font-extrabold leading-tight text-[#0B1B3A] md:text-2xl">
            {titulo}
          </h2>
        </div>
      </div>

      {/* Personas */}
      <div className="grid gap-3">
        {personas.map((persona) => (
          <PersonaHorizontal
            key={persona.id}
            persona={persona}
          />
        ))}
      </div>
    </section>
  );

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#F7F9FC] text-[#0B1B3A]">
        {/* =========================================================
            HERO
        ========================================================= */}
        <section className="relative overflow-hidden bg-[#071F4D] py-20 md:py-24">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(56,189,248,0.20),transparent_30%),radial-gradient(circle_at_85%_10%,rgba(45,91,227,0.30),transparent_28%),linear-gradient(135deg,#071F4D,#173B7A_55%,#0B7189)]" />

          <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-bold text-white backdrop-blur">
              <Network size={17} />
              Gobierno corporativo
            </span>

            <h1 className="mt-7 max-w-4xl text-4xl font-black leading-tight text-white md:text-6xl">
              Estructura de Gobierno
            </h1>

            <p className="mt-5 max-w-3xl text-base leading-7 text-blue-100 md:text-lg">
              Organización directiva, administrativa, financiera,
              de control y comunicaciones de ASEUNICESMAG para el
              periodo institucional 2025-2027.
            </p>

            <div className="mt-8 inline-flex items-center gap-4 rounded-2xl border border-white/15 bg-white/10 px-5 py-3 text-white backdrop-blur">
              <div className="h-8 w-1 rounded-full bg-cyan-300" />

              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-cyan-100">
                  Junta Directiva
                </p>

                <p className="mt-0.5 text-xl font-extrabold">
                  Periodo 2025 - 2027
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            ORGANIGRAMA
        ========================================================= */}
        <section className="relative overflow-hidden bg-[#F8FAFD] py-16 md:py-20">
          {/* Decoración fondo */}
          <div className="pointer-events-none absolute left-0 top-0 h-[500px] w-[500px] rounded-full bg-blue-100/30 blur-[130px]" />

          <div className="pointer-events-none absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-cyan-100/30 blur-[130px]" />

          <div className="relative mx-auto max-w-[1400px] px-5 md:px-8 lg:px-10">
            {/* TÍTULO */}
            <div className="mx-auto mb-16 max-w-2xl text-center">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-[#D8E5F6] bg-white text-[#21409A] shadow-sm">
                <Crown size={25} />
              </div>

              <p className="text-xs font-extrabold uppercase tracking-[0.25em] text-[#2B63B8]">
                Gobierno Corporativo
              </p>

              <h2 className="mt-2 text-3xl font-black text-[#0B1B3A] md:text-4xl">
                Junta Directiva
              </h2>

              <p className="mt-3 text-sm leading-6 text-[#718096]">
                Máximo órgano de dirección institucional
              </p>
            </div>

            {/* =====================================================
                PRESIDENTA
            ===================================================== */}
            {presidenta && (
              <div className="relative mx-auto max-w-[600px]">
                <PresidentaCard persona={presidenta} />

                {/* Conector vertical */}
                <div className="absolute -bottom-12 left-1/2 hidden h-12 w-px -translate-x-1/2 bg-[#BECBE0] lg:block" />

                <div className="absolute -bottom-[52px] left-1/2 hidden h-2 w-2 -translate-x-1/2 rounded-full bg-[#AFC0DB] lg:block" />
              </div>
            )}

            {/* =====================================================
                JUNTA DIRECTIVA - 4 PERSONAS
            ===================================================== */}
            <div className="relative mt-20 lg:mt-24">
              {/* Línea horizontal superior */}
              <div className="absolute -top-10 left-[12.5%] right-[12.5%] hidden h-px bg-[#BECBE0] lg:block" />

              {/* Línea central desde presidenta */}
              <div className="absolute -top-14 left-1/2 hidden h-4 w-px -translate-x-1/2 bg-[#BECBE0] lg:block" />

              <div className="grid gap-x-6 gap-y-16 md:grid-cols-2 lg:grid-cols-4">
                {directivos.map((persona) => (
                  <div
                    key={persona.id}
                    className="relative pt-4"
                  >
                    {/* Conector individual */}
                    <div className="absolute -top-10 left-1/2 hidden h-10 w-px -translate-x-1/2 bg-[#BECBE0] lg:block" />

                    <div className="absolute -top-[44px] left-1/2 hidden h-2 w-2 -translate-x-1/2 rounded-full bg-[#AFC0DB] lg:block" />

                    <DirectivoCard persona={persona} />
                  </div>
                ))}
              </div>
            </div>

            {/* =====================================================
                CONECTOR AL ÁREA DE CONTROL
            ===================================================== */}
            <div className="relative mx-auto mt-10 hidden h-16 w-full lg:block">
              <div className="absolute left-1/2 top-0 h-16 w-px -translate-x-1/2 bg-[#BECBE0]" />

              <div className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-[#AFC0DB]" />
            </div>

            {/* =====================================================
                ÁREA DE CONTROL
            ===================================================== */}
            {control.length > 0 && (
              <div className="relative mx-auto mt-10 max-w-[540px] lg:mt-0">
                <div className="mb-3 text-center">
                  <div className="inline-flex items-center gap-3 rounded-lg bg-gradient-to-r from-[#173B7A] to-[#21409A] px-5 py-2 text-white shadow-[0_6px_16px_rgba(23,59,122,0.18)]">
                    <ShieldCheck size={17} />

                    <span className="text-[10px] font-extrabold uppercase tracking-[0.22em]">
                      Área estratégica
                    </span>
                  </div>

                  <h2 className="mt-2 text-2xl font-black text-[#0B1B3A]">
                    Área de Control
                  </h2>
                </div>

                <div className="grid gap-3">
                  {control.map((persona) => (
                    <PersonaHorizontal
                      key={persona.id}
                      persona={persona}
                      principal
                    />
                  ))}
                </div>

                {/* Conector hacia Dirección */}
                <div className="absolute -bottom-14 left-1/2 hidden h-14 w-px -translate-x-1/2 bg-[#BECBE0] lg:block" />

                <div className="absolute -bottom-[60px] left-1/2 hidden h-2 w-2 -translate-x-1/2 rounded-full bg-[#AFC0DB] lg:block" />
              </div>
            )}

            {/* =====================================================
                DIRECCIÓN GENERAL
            ===================================================== */}
            {administracion && (
              <div className="relative mx-auto mt-20 max-w-[560px]">
                <section className="rounded-2xl border border-[#DCE4EF] bg-white p-5 shadow-[0_12px_35px_rgba(15,23,42,0.07)]">
                  <div className="mb-4 flex items-center justify-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#173B7A] to-[#159BB5] text-white shadow-sm">
                      <Building2 size={21} />
                    </div>

                    <div>
                      <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#2B63B8]">
                        Administración
                      </p>

                      <h2 className="text-2xl font-black text-[#0B1B3A]">
                        Dirección General
                      </h2>
                    </div>
                  </div>

                  <PersonaHorizontal
                    persona={administracion}
                    principal
                  />
                </section>

                {/* Línea inferior */}
                <div className="absolute -bottom-16 left-1/2 hidden h-16 w-px -translate-x-1/2 bg-[#BECBE0] lg:block" />

                <div className="absolute -bottom-[68px] left-1/2 hidden h-2 w-2 -translate-x-1/2 rounded-full bg-[#AFC0DB] lg:block" />
              </div>
            )}

            {/* =====================================================
                ÁREAS INFERIORES
            ===================================================== */}
            <div className="relative mt-24 lg:mt-28">
              {/* Rama horizontal */}
              <div className="absolute -top-12 left-1/4 right-1/4 hidden h-px bg-[#BECBE0] lg:block" />

              {/* Línea central */}
              <div className="absolute -top-16 left-1/2 hidden h-4 w-px -translate-x-1/2 bg-[#BECBE0] lg:block" />

              <div className="grid gap-8 lg:grid-cols-2">
                {/* Administrativa */}
                <div className="relative">
                  <div className="absolute -top-12 left-1/2 hidden h-12 w-px -translate-x-1/2 bg-[#BECBE0] lg:block" />

                  <div className="absolute -top-[52px] left-1/2 hidden h-2 w-2 -translate-x-1/2 rounded-full bg-[#AFC0DB] lg:block" />

                  <AreaCard
                    titulo="Administrativa y financiera"
                    icono={BriefcaseBusiness}
                    personas={areaAdministrativa}
                  />
                </div>

                {/* Sistemas */}
                <div className="relative">
                  <div className="absolute -top-12 left-1/2 hidden h-12 w-px -translate-x-1/2 bg-[#BECBE0] lg:block" />

                  <div className="absolute -top-[52px] left-1/2 hidden h-2 w-2 -translate-x-1/2 rounded-full bg-[#AFC0DB] lg:block" />

                  <AreaCard
                    titulo="Sistemas y Comunicaciones"
                    icono={Sparkles}
                    personas={sistemas}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* =========================================================
          MODAL PERFIL
      ========================================================= */}
      {personaSeleccionada && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-[#07122f]/70 px-4 backdrop-blur-sm"
          onClick={() => setPersonaSeleccionada(null)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Cerrar */}
            <button
              type="button"
              onClick={() => setPersonaSeleccionada(null)}
              className="absolute right-5 top-5 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#21409A] shadow-lg transition hover:scale-105 hover:bg-[#EEF5FF]"
            >
              <X size={22} />
            </button>

            {/* Cabecera */}
            <div className="relative overflow-hidden rounded-t-2xl bg-gradient-to-br from-[#071F4D] via-[#173B7A] to-[#159BB5] p-8 text-white">
              <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-white/10 blur-3xl" />

              <div className="relative flex flex-col gap-6 md:flex-row md:items-center">
                <div className="relative h-36 w-36 shrink-0 overflow-hidden rounded-2xl border-4 border-white/30 bg-white/10">
                  <Image
                    src={personaSeleccionada.foto}
                    alt={personaSeleccionada.nombre}
                    fill
                    className="object-cover"
                  />
                </div>

                <div>
                  <p className="mb-3 inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.2em]">
                    Portafolio
                  </p>

                  <h2 className="text-3xl font-black leading-tight md:text-4xl">
                    {personaSeleccionada.nombre}
                  </h2>

                  <p className="mt-3 text-lg font-bold text-cyan-100 md:text-xl">
                    {personaSeleccionada.cargo}
                  </p>

                  <p className="mt-2 text-sm font-medium text-blue-100">
                    {personaSeleccionada.area}
                  </p>
                </div>
              </div>
            </div>

            {/* Contenido */}
            <div className="grid gap-6 p-6 md:grid-cols-2 md:p-8">
              {/* FORMACIÓN */}
              <section className="rounded-2xl border border-[#DCE4EF] bg-[#F8FAFD] p-6">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#173B7A] text-white">
                    <GraduationCap size={22} />
                  </div>

                  <h3 className="text-xl font-black text-[#0B1B3A] md:text-2xl">
                    Formación académica
                  </h3>
                </div>

                <ul className="space-y-3">
                  {personaSeleccionada.perfil?.formacion.map(
                    (item, index) => (
                      <li
                        key={index}
                        className="rounded-xl border border-[#E8EDF4] bg-white px-4 py-3 text-sm font-medium leading-6 text-[#52607C] shadow-sm"
                      >
                        {item}
                      </li>
                    ),
                  )}
                </ul>
              </section>

              {/* EXPERIENCIA */}
              <section className="rounded-2xl border border-[#DCE4EF] bg-[#F8FAFD] p-6">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#173B7A] text-white">
                    <Briefcase size={22} />
                  </div>

                  <h3 className="text-xl font-black text-[#0B1B3A] md:text-2xl">
                    Experiencia
                  </h3>
                </div>

                <ul className="space-y-3">
                  {personaSeleccionada.perfil?.experiencia.map(
                    (item, index) => (
                      <li
                        key={index}
                        className="rounded-xl border border-[#E8EDF4] bg-white px-4 py-3 text-sm font-medium leading-6 text-[#52607C] shadow-sm"
                      >
                        {item}
                      </li>
                    ),
                  )}
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