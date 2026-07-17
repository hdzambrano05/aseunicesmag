"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import { convenios } from "../data/convenios";
import Link from "next/link";

import {
  ArrowRight,
  Building2,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  HeartHandshake,
  ShieldCheck,
  Sparkles,
  Tags,
  Users,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

/* ================================================================
   LOGO
================================================================ */
const LOGO_ASEUNICESMAG = "/logo/logocColor.png";

/* ================================================================
   BANNERS
================================================================ */
const slides = [
  {
    imagen: "/landing/slide-1.jpg",
    alt: "Beneficio académico ASEUNICESMAG",
  },
  {
    imagen: "/landing/slide-2.webp",
    alt: "Convenios ASEUNICESMAG",
  },
  {
    imagen: "/landing/slide-3.webp",
    alt: "Comunidad de asociados ASEUNICESMAG",
  },
  {
    imagen: "/landing/slide-4.webp",
    alt: "Eventos institucionales ASEUNICESMAG",
  },
  {
    imagen: "/landing/slide-5.jpeg",
    alt: "Actividades institucionales ASEUNICESMAG",
  },
];

/* ================================================================
   BENEFICIOS
================================================================ */
const beneficios = [
  {
    icon: GraduationCap,
    numero: "01",
    titulo: "Formación académica",
    texto:
      "Descuentos en programas UNICESMAG para asociados, egresados e hijos.",
    etiqueta: "Educación",
  },
  {
    icon: Building2,
    numero: "02",
    titulo: "Convenios comerciales",
    texto:
      "Accede a tarifas preferenciales con aliados estratégicos.",
    etiqueta: "Alianzas",
  },
  {
    icon: Users,
    numero: "03",
    titulo: "Desarrollo profesional",
    texto:
      "Participa en actividades de networking y oportunidades laborales.",
    etiqueta: "Crecimiento",
  },
  {
    icon: HeartHandshake,
    numero: "04",
    titulo: "Bienestar y proyección social",
    texto:
      "Eventos culturales, recreativos y espacios de integración.",
    etiqueta: "Comunidad",
  },
  {
    icon: Tags,
    numero: "05",
    titulo: "Programa de referidos",
    texto:
      "Obtén beneficios especiales por cada nuevo asociado referido.",
    etiqueta: "Beneficios",
  },
];

/* ================================================================
   PASOS DE AFILIACIÓN
================================================================ */
const pasos = [
  {
    numero: "01",
    titulo: "Registro",
    texto: "Completa tu información personal y de contacto.",
  },
  {
    numero: "02",
    titulo: "Documentación",
    texto: "Adjunta los documentos requeridos para tu afiliación.",
  },
  {
    numero: "03",
    titulo: "Validación",
    texto: "Nuestro equipo revisará la información registrada.",
  },
  {
    numero: "04",
    titulo: "Activación",
    texto: "Tu afiliación será activada y podrás acceder a los beneficios.",
  },
];

export default function HomePage() {
  const [slideActivo, setSlideActivo] = useState(0);

  const cambiarSlide = (
    direccion: "anterior" | "siguiente",
  ) => {
    setSlideActivo((actual) => {
      if (direccion === "anterior") {
        return actual === 0
          ? slides.length - 1
          : actual - 1;
      }

      return (actual + 1) % slides.length;
    });
  };

  useEffect(() => {
    const intervalo = setInterval(() => {
      setSlideActivo(
        (actual) => (actual + 1) % slides.length,
      );
    }, 5000);

    return () => clearInterval(intervalo);
  }, []);

  return (
    <>
      <Navbar />

      <main className="min-h-screen overflow-hidden bg-white">
        {/* ============================================================
            BANNER PRINCIPAL
        ============================================================ */}
        <section className="group relative bg-white">
          <div className="relative h-[250px] w-full overflow-hidden bg-[#071f4d] sm:h-[300px] md:h-[360px] lg:h-[430px] xl:h-[500px]">
            {slides.map((slide, index) => (
              <div
                key={slide.imagen}
                className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                  index === slideActivo
                    ? "z-10 scale-100 opacity-100"
                    : "z-0 scale-[1.015] opacity-0"
                }`}
              >
                <img
                  src={slide.imagen}
                  alt={slide.alt}
                  className="h-full w-full object-cover object-center"
                />
              </div>
            ))}

            <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-r from-black/10 via-transparent to-black/5" />

            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-28 bg-gradient-to-t from-black/20 to-transparent" />

            {/* FLECHA IZQUIERDA */}
            <button
              type="button"
              onClick={() => cambiarSlide("anterior")}
              aria-label="Banner anterior"
              className="absolute left-4 top-1/2 z-40 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-[#071f4d]/30 text-white opacity-0 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-white hover:text-[#21409A] group-hover:opacity-100 md:left-7 md:h-12 md:w-12"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            {/* FLECHA DERECHA */}
            <button
              type="button"
              onClick={() => cambiarSlide("siguiente")}
              aria-label="Banner siguiente"
              className="absolute right-4 top-1/2 z-40 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-[#071f4d]/30 text-white opacity-0 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-white hover:text-[#21409A] group-hover:opacity-100 md:right-7 md:h-12 md:w-12"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* INDICADORES ESCRITORIO */}
            <div className="absolute right-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-3 md:flex lg:right-8">
              {slides.map((slide, index) => (
                <button
                  key={`${slide.imagen}-${index}`}
                  type="button"
                  onClick={() => setSlideActivo(index)}
                  aria-label={`Ver banner ${index + 1}`}
                  className={`rounded-full border-2 border-white transition-all duration-300 ${
                    index === slideActivo
                      ? "h-4 w-4 bg-white shadow-[0_0_0_4px_rgba(255,255,255,0.15)]"
                      : "h-3 w-3 bg-transparent hover:scale-125 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>

            {/* INDICADORES MÓVIL */}
            <div className="absolute bottom-5 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 md:hidden">
              {slides.map((slide, index) => (
                <button
                  key={`movil-${slide.imagen}-${index}`}
                  type="button"
                  onClick={() => setSlideActivo(index)}
                  aria-label={`Ver banner ${index + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === slideActivo
                      ? "w-8 bg-white"
                      : "w-2 bg-white/60"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* ============================================================
              IDENTIDAD INSTITUCIONAL
          ============================================================ */}
          <div className="relative z-50 mx-auto -mt-8 max-w-7xl px-5 sm:-mt-10 md:-mt-14 lg:-mt-16 lg:px-8">
            <div className="relative overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white shadow-[0_30px_80px_rgba(7,31,77,0.15)] md:rounded-[2.5rem]">
              <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-blue-100/50 blur-3xl" />

              <div className="pointer-events-none absolute -bottom-32 left-1/3 h-64 w-64 rounded-full bg-cyan-100/40 blur-3xl" />

              <div className="relative grid items-center md:grid-cols-[220px_1fr] lg:grid-cols-[260px_1fr_auto]">
                {/* LOGO */}
                <div className="relative flex items-center justify-center border-b border-slate-100 p-7 md:h-full md:border-b-0 md:border-r md:p-8">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#F8FBFF] via-white to-[#F1F7FF]" />

                  <div className="relative flex h-32 w-32 items-center justify-center overflow-hidden rounded-full border border-blue-100 bg-white shadow-[0_18px_40px_rgba(33,64,154,0.14)] md:h-36 md:w-36">
                    <img
                      src={LOGO_ASEUNICESMAG}
                      alt="Logo ASEUNICESMAG"
                      className="h-full w-full object-contain"
                    />
                  </div>
                </div>

                {/* INFORMACIÓN */}
                <div className="px-7 py-8 text-center md:px-10 md:py-10 md:text-left lg:px-12">
                  <div className="mb-4 flex items-center justify-center gap-3 md:justify-start">
                    <span className="hidden h-px w-10 bg-[#BBD0F5] sm:block" />

                    <span className="h-2 w-2 rounded-full bg-[#21409A]" />

                    <p className="text-xs font-black uppercase tracking-[0.3em] text-[#21409A]">
                      ASEUNICESMAG
                    </p>

                    <span className="h-2 w-2 rounded-full bg-[#21409A]" />

                    <span className="hidden h-px w-10 bg-[#BBD0F5] sm:block" />
                  </div>

                  <h1 className="text-3xl font-black leading-[1.05] tracking-tight text-[#07122f] sm:text-4xl md:text-5xl lg:text-[52px]">
                    Asociación de Egresados

                    <span className="mt-1 block text-[#21409A]">
                      Universidad CESMAG
                    </span>
                  </h1>

                  <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-slate-500 md:mx-0 md:text-lg md:leading-8">
                    Descubre las oportunidades, convenios y experiencias
                    que ASEUNICESMAG tiene para sus asociados.
                  </p>
                </div>

                {/* ACCIONES */}
                <div className="flex flex-col gap-3 border-t border-slate-100 px-7 pb-8 md:col-span-2 md:flex-row md:justify-center md:px-10 lg:col-span-1 lg:border-l lg:border-t-0 lg:px-9 lg:pb-0">
                  <Link
                    href="/afiliacion"
                    className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#21409A] px-7 py-4 text-sm font-black text-white shadow-[0_10px_25px_rgba(33,64,154,0.25)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#17357f]"
                  >
                    Afíliate aquí

                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>

                  <Link
                    href="/convenios"
                    className="inline-flex items-center justify-center rounded-full border border-[#D5E1F5] bg-[#F7FAFF] px-7 py-4 text-sm font-black text-[#21409A] transition-all duration-300 hover:-translate-y-1 hover:border-[#21409A] hover:bg-white"
                  >
                    Ver convenios
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            CONVENIOS Y ALIANZAS
        ============================================================ */}
        <section className="relative overflow-hidden bg-[#F7F9FC] pb-28 pt-28 md:pt-32">
          {/* DECORACIÓN */}
          <div className="pointer-events-none absolute -left-40 top-20 h-[500px] w-[500px] rounded-full bg-blue-100/50 blur-[140px]" />

          <div className="pointer-events-none absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full bg-cyan-100/40 blur-[140px]" />

          <div className="relative mx-auto max-w-7xl px-6">
            {/* CABECERA */}
            <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
              <div>
                <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-blue-100 bg-white px-4 py-2 shadow-sm">
                  <Sparkles className="h-4 w-4 text-[#21409A]" />

                  <span className="text-xs font-black uppercase tracking-[0.25em] text-[#21409A]">
                    Red de aliados
                  </span>
                </div>

                <h2 className="max-w-xl text-4xl font-black leading-[1.05] tracking-tight text-[#07122F] md:text-5xl lg:text-6xl">
                  Convenios que
                  <span className="block text-[#21409A]">
                    generan oportunidades.
                  </span>
                </h2>
              </div>

              <div className="lg:pb-2">
                <p className="max-w-2xl text-lg leading-8 text-slate-500">
                  Conectamos a nuestros asociados con empresas, marcas y
                  organizaciones que ofrecen experiencias y beneficios
                  pensados para nuestra comunidad.
                </p>

                <Link
                  href="/convenios"
                  className="group mt-6 inline-flex items-center gap-3 text-sm font-black text-[#21409A]"
                >
                  Explorar todos los convenios

                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#21409A] text-white transition-transform duration-300 group-hover:translate-x-1">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              </div>
            </div>

            {/* CARRUSEL */}
            <div className="convenios-swiper mt-16">
              <Swiper
                modules={[Autoplay, Pagination]}
                spaceBetween={24}
                loop={true}
                autoplay={{
                  delay: 2800,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                pagination={{
                  clickable: true,
                }}
                breakpoints={{
                  320: {
                    slidesPerView: 1,
                  },
                  640: {
                    slidesPerView: 2,
                  },
                  1024: {
                    slidesPerView: 3,
                  },
                  1280: {
                    slidesPerView: 4,
                  },
                }}
              >
                {convenios.map((convenio, index) => (
                  <SwiperSlide
                    key={convenio.id}
                    className="pb-16"
                  >
                    <article className="group relative overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white p-4 shadow-[0_12px_35px_rgba(15,23,42,0.06)] transition-all duration-500 hover:-translate-y-2 hover:border-[#B8CCEE] hover:shadow-[0_25px_60px_rgba(7,31,77,0.13)]">
                      <div className="absolute right-5 top-5 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-slate-100 bg-white text-[10px] font-black text-slate-400 shadow-sm">
                        {String(index + 1).padStart(2, "0")}
                      </div>

                      <div className="relative flex h-52 items-center justify-center overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-[#F8FAFD] to-[#EEF4FC] p-7">
                        <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-blue-200/30 blur-2xl" />

                        <img
                          src={convenio.imagen}
                          alt={convenio.nombre}
                          className="relative max-h-32 max-w-[85%] object-contain transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>

                      <div className="flex min-h-[95px] items-center justify-between gap-4 px-3 pb-3 pt-5">
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#21409A]">
                            Aliado
                          </p>

                          <h3 className="mt-2 text-lg font-black leading-tight text-[#07122F]">
                            {convenio.nombre}
                          </h3>
                        </div>

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-blue-100 text-[#21409A] transition-all duration-300 group-hover:bg-[#21409A] group-hover:text-white">
                          <ArrowRight className="h-4 w-4" />
                        </div>
                      </div>
                    </article>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </section>

        {/* ============================================================
            BENEFICIOS - DISEÑO BENTO CORPORATIVO
        ============================================================ */}
        <section className="relative overflow-hidden bg-[#061A3A] py-28 text-white">
          {/* FONDO */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(56,189,248,0.14),transparent_25%),radial-gradient(circle_at_90%_80%,rgba(33,64,154,0.32),transparent_28%)]" />

          <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(rgba(255,255,255,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.3)_1px,transparent_1px)] [background-size:70px_70px]" />

          <div className="relative mx-auto max-w-7xl px-6">
            {/* CABECERA */}
            <div className="grid gap-10 lg:grid-cols-[1fr_0.7fr] lg:items-end">
              <div>
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur">
                  <ShieldCheck className="h-4 w-4 text-cyan-300" />

                  <span className="text-xs font-black uppercase tracking-[0.25em] text-blue-100">
                    Comunidad ASEUNICESMAG
                  </span>
                </div>

                <h2 className="max-w-3xl text-4xl font-black leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
                  Más que una asociación,
                  <span className="block text-[#7DD3FC]">
                    una red de beneficios.
                  </span>
                </h2>
              </div>

              <p className="max-w-xl text-base leading-8 text-blue-100/80 lg:text-lg">
                Creamos conexiones que acompañan tu crecimiento académico,
                profesional y personal como parte de nuestra comunidad.
              </p>
            </div>

            {/* BENTO */}
            <div className="mt-16 grid gap-5 lg:grid-cols-12">
              {beneficios.map((beneficio, index) => {
                const Icon = beneficio.icon;

                const tamanos = [
                  "lg:col-span-7",
                  "lg:col-span-5",
                  "lg:col-span-4",
                  "lg:col-span-4",
                  "lg:col-span-4",
                ];

                return (
                  <article
                    key={beneficio.titulo}
                    className={`group relative min-h-[270px] overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.07] p-7 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.11] md:p-8 ${
                      tamanos[index]
                    }`}
                  >
                    <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-blue-400/10 blur-3xl transition-all duration-500 group-hover:bg-blue-400/20" />

                    <div className="relative flex h-full flex-col">
                      <div className="flex items-start justify-between">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-cyan-200 shadow-lg">
                          <Icon className="h-7 w-7" />
                        </div>

                        <span className="text-sm font-black tracking-[0.2em] text-white/20">
                          {beneficio.numero}
                        </span>
                      </div>

                      <div className="mt-auto pt-12">
                        <p className="mb-3 text-[10px] font-black uppercase tracking-[0.25em] text-cyan-300">
                          {beneficio.etiqueta}
                        </p>

                        <h3 className="text-2xl font-black tracking-tight text-white md:text-3xl">
                          {beneficio.titulo}
                        </h3>

                        <p className="mt-4 max-w-xl text-sm leading-7 text-blue-100/70 md:text-base">
                          {beneficio.texto}
                        </p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* CTA BENEFICIOS */}
            <div className="mt-12 flex flex-col items-center justify-between gap-6 rounded-[2rem] border border-white/10 bg-white/[0.06] p-7 backdrop-blur md:flex-row md:p-8">
              <div className="flex items-center gap-4">
                <div className="hidden h-12 w-12 items-center justify-center rounded-full bg-cyan-300 text-[#071F4D] sm:flex">
                  <CheckCircle2 className="h-6 w-6" />
                </div>

                <div>
                  <h3 className="text-xl font-black">
                    Empieza a disfrutar los beneficios
                  </h3>

                  <p className="mt-1 text-sm text-blue-100/70">
                    Forma parte de nuestra comunidad de asociados.
                  </p>
                </div>
              </div>

              <Link
                href="/afiliacion"
                className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-white px-7 py-4 text-sm font-black text-[#21409A] transition-all duration-300 hover:-translate-y-1 hover:bg-cyan-50 sm:w-auto"
              >
                Quiero afiliarme

                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </section>

        {/* ============================================================
            PROCESO DE AFILIACIÓN - TIMELINE
        ============================================================ */}
        <section className="relative overflow-hidden bg-white py-28">
          <div className="pointer-events-none absolute left-0 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-blue-50 blur-[120px]" />

          <div className="relative mx-auto max-w-7xl px-6">
            {/* CABECERA */}
            <div className="mx-auto max-w-3xl text-center">
              <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-[#F7FAFF] px-4 py-2">
                <Users className="h-4 w-4 text-[#21409A]" />

                <span className="text-xs font-black uppercase tracking-[0.25em] text-[#21409A]">
                  Tu proceso
                </span>
              </div>

              <h2 className="text-4xl font-black tracking-tight text-[#07122F] md:text-5xl lg:text-6xl">
                Afiliarte es
                <span className="text-[#21409A]"> muy sencillo.</span>
              </h2>

              <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-500">
                Hemos diseñado un proceso claro y organizado para que
                puedas formar parte de ASEUNICESMAG.
              </p>
            </div>

            {/* TIMELINE */}
            <div className="relative mt-20">
              {/* LÍNEA ESCRITORIO */}
              <div className="absolute left-[12.5%] right-[12.5%] top-10 hidden h-px bg-gradient-to-r from-transparent via-[#AFC4E7] to-transparent md:block" />

              <div className="grid gap-6 md:grid-cols-4">
                {pasos.map((paso, index) => (
                  <article
                    key={paso.numero}
                    className="group relative"
                  >
                    {/* PUNTO TIMELINE */}
                    <div className="relative z-10 mx-auto mb-7 flex h-20 w-20 items-center justify-center rounded-full border-[6px] border-white bg-[#21409A] text-lg font-black text-white shadow-[0_10px_30px_rgba(33,64,154,0.28)] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#071F4D]">
                      {paso.numero}
                    </div>

                    {/* CARD */}
                    <div className="relative min-h-[210px] overflow-hidden rounded-[1.8rem] border border-slate-200 bg-white p-6 text-center shadow-[0_10px_30px_rgba(15,23,42,0.05)] transition-all duration-400 group-hover:-translate-y-2 group-hover:border-blue-200 group-hover:shadow-[0_20px_45px_rgba(15,23,42,0.1)]">
                      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#21409A] to-[#38BDF8] opacity-0 transition-opacity group-hover:opacity-100" />

                      <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#21409A]">
                        Paso {index + 1}
                      </p>

                      <h3 className="mt-4 text-xl font-black text-[#07122F]">
                        {paso.titulo}
                      </h3>

                      <p className="mt-4 text-sm leading-7 text-slate-500">
                        {paso.texto}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* BOTÓN */}
            <div className="mt-14 text-center">
              <Link
                href="/afiliacion"
                className="group inline-flex items-center gap-3 rounded-full bg-[#21409A] px-8 py-4 text-sm font-black text-white shadow-[0_12px_30px_rgba(33,64,154,0.25)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#17357f]"
              >
                Iniciar mi afiliación

                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </section>

        {/* ============================================================
            CTA FINAL PREMIUM
        ============================================================ */}
        <section className="bg-[#F7F9FC] px-5 py-24 md:px-6">
          <div className="mx-auto max-w-7xl">
            <div className="relative overflow-hidden rounded-[2.5rem] bg-[#071F4D] shadow-[0_30px_80px_rgba(7,31,77,0.22)] md:rounded-[3rem]">
              {/* DECORACIÓN */}
              <div className="absolute -right-24 -top-40 h-[450px] w-[450px] rounded-full border-[80px] border-white/[0.03]" />

              <div className="absolute -bottom-44 right-40 h-[380px] w-[380px] rounded-full border-[70px] border-cyan-400/[0.05]" />

              <div className="absolute left-1/2 top-0 h-full w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />

              <div className="relative grid gap-10 p-8 md:p-12 lg:grid-cols-[1fr_auto] lg:items-center lg:p-16">
                <div>
                  <div className="mb-7 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-cyan-200">
                    <GraduationCap className="h-8 w-8" />
                  </div>

                  <p className="text-xs font-black uppercase tracking-[0.3em] text-cyan-300">
                    Sé parte de nuestra comunidad
                  </p>

                  <h2 className="mt-5 max-w-3xl text-4xl font-black leading-[1.05] tracking-tight text-white md:text-5xl lg:text-6xl">
                    Tu vínculo con la Universidad
                    <span className="block text-[#7DD3FC]">
                      continúa creciendo.
                    </span>
                  </h2>

                  <p className="mt-6 max-w-2xl text-base leading-8 text-blue-100/75 md:text-lg">
                    Accede a convenios, oportunidades y beneficios
                    diseñados para acompañarte en cada nueva etapa.
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  <Link
                    href="/afiliacion"
                    className="group inline-flex min-w-[220px] items-center justify-center gap-3 rounded-full bg-white px-8 py-4 text-sm font-black text-[#21409A] shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-blue-50"
                  >
                    Afiliarme ahora

                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>

                  <Link
                    href="/convenios"
                    className="inline-flex min-w-[220px] items-center justify-center rounded-full border border-white/20 bg-white/5 px-8 py-4 text-sm font-black text-white backdrop-blur transition-all duration-300 hover:bg-white/10"
                  >
                    Conocer convenios
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* ============================================================
          ESTILOS SWIPER
      ============================================================ */}
      <style jsx global>{`
        .convenios-swiper .swiper-pagination {
          bottom: 8px !important;
        }

        .convenios-swiper .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: #b8c6dd;
          opacity: 1;
          transition: all 0.3s ease;
        }

        .convenios-swiper .swiper-pagination-bullet-active {
          width: 28px;
          border-radius: 999px;
          background: #21409a;
        }
      `}</style>
    </>
  );
}