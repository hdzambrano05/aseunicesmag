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
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  HeartHandshake,
  Landmark,
  Tags,
  Users,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

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
    alt: "Comunidad de asociados",
  },
  {
    imagen: "/landing/slide-4.webp",
    alt: "Eventos institucionales",
  },
  {
    imagen: "/landing/slide-5.jpeg",
    alt: "Eventos institucionales ASEUNICESMAG",
  },
];

const aliados = [
  { nombre: "Creativida", imagen: "/landing/convenios/1.png" },
  { nombre: "Calzado Guzmán", imagen: "/landing/convenios/3.png" },
  { nombre: "Aliado tecnológico", imagen: "/landing/convenios/12.png" },
  { nombre: "Mary Tierra", imagen: "/landing/convenios/11.png" },
];

const beneficios = [
  {
    icon: GraduationCap,
    titulo: "Formación académica",
    texto:
      "Descuentos en programas UNICESMAG para asociados, egresados e hijos.",
  },
  {
    icon: Building2,
    titulo: "Convenios comerciales",
    texto: "Accede a tarifas preferenciales con aliados estratégicos.",
  },
  {
    icon: Users,
    titulo: "Desarrollo profesional",
    texto: "Participa en actividades de networking y oportunidades laborales.",
  },
  {
    icon: HeartHandshake,
    titulo: "Bienestar y proyección social",
    texto: "Eventos culturales, recreativos y espacios de integración.",
  },
  {
    icon: Tags,
    titulo: "Programa de referidos",
    texto: "Obtén beneficios especiales por cada nuevo asociado referido.",
  },
];

const pasos = [
  "Registro de información",
  "Carga documental",
  "Validación administrativa",
  "Activación del asociado",
];

export default function HomePage() {
  const [slideActivo, setSlideActivo] = useState(0);

  const cambiarSlide = (direccion: "anterior" | "siguiente") => {
    setSlideActivo((actual) => {
      if (direccion === "anterior") {
        return actual === 0 ? slides.length - 1 : actual - 1;
      }

      return (actual + 1) % slides.length;
    });
  };

  const obtenerSlide = (posicion: number) => {
    return slides[(slideActivo + posicion) % slides.length];
  };

  useEffect(() => {
    const intervalo = setInterval(() => {
      setSlideActivo((actual) => (actual + 1) % slides.length);
    }, 4000);

    return () => clearInterval(intervalo);
  }, []);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#f5f7fb]">
        {/* CARRUSEL MODERNO AUTOMÁTICO Y MANUAL */}
        <section className="relative overflow-hidden bg-white px-6 py-24">
          <div className="absolute left-0 top-20 h-72 w-72 rounded-full bg-blue-100 blur-3xl" />
          <div className="absolute right-0 bottom-10 h-72 w-72 rounded-full bg-cyan-100 blur-3xl" />

          <div className="relative mx-auto max-w-7xl">
            <div className="mb-14 text-center">
              <div className="mx-auto mb-4 flex items-center justify-center gap-4">
                <span className="h-px w-16 bg-blue-200" />
                <span className="h-2 w-2 rounded-full bg-blue-500" />

                <p className="text-sm font-black uppercase tracking-[0.35em] text-blue-700">
                  ASEUNICESMAG
                </p>

                <span className="h-2 w-2 rounded-full bg-blue-500" />
                <span className="h-px w-16 bg-blue-200" />
              </div>

              <h2 className="text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
                Asociacion de Engresados Universidad CESMAG
              </h2>

              <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-500">
                Descubre las oportunidades, convenios y experiencias que
                ASEUNICESMAG tiene para sus asociados.
              </p>
            </div>

            <div className="relative mx-auto flex min-h-[430px] max-w-6xl items-center justify-center">
              {/* TARJETA IZQUIERDA FONDO */}
              <div className="absolute left-0 hidden h-[290px] w-[260px] -rotate-6 overflow-hidden rounded-[2rem] bg-blue-900 shadow-2xl transition-all duration-700 lg:block">
                <img
                  key={`fondo-izq-${obtenerSlide(3).imagen}`}
                  src={obtenerSlide(3).imagen}
                  alt={obtenerSlide(3).alt}
                  className="h-full w-full object-cover opacity-70"
                />
                <div className="absolute inset-0 bg-blue-950/35" />
              </div>

              {/* TARJETA IZQUIERDA */}
              <div className="absolute left-[8%] hidden h-[330px] w-[300px] -rotate-3 overflow-hidden rounded-[2rem] border border-white bg-white shadow-2xl transition-all duration-700 lg:block">
                <img
                  key={`izquierda-${obtenerSlide(4).imagen}`}
                  src={obtenerSlide(4).imagen}
                  alt={obtenerSlide(4).alt}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* TARJETA CENTRAL */}
              <div className="relative z-20 h-[360px] w-full max-w-3xl overflow-hidden rounded-[2.5rem] border border-blue-100 bg-white shadow-[0_30px_80px_rgba(15,23,42,0.22)] transition-all duration-700 md:h-[430px]">
                <img
                  key={`central-${obtenerSlide(0).imagen}`}
                  src={obtenerSlide(0).imagen}
                  alt={obtenerSlide(0).alt}
                  className="h-full w-full object-cover transition-all duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-blue-950/25 via-transparent to-transparent" />
              </div>

              {/* TARJETA DERECHA */}
              <div className="absolute right-[8%] hidden h-[330px] w-[300px] rotate-3 overflow-hidden rounded-[2rem] border border-white bg-white shadow-2xl transition-all duration-700 lg:block">
                <img
                  key={`derecha-${obtenerSlide(1).imagen}`}
                  src={obtenerSlide(1).imagen}
                  alt={obtenerSlide(1).alt}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* TARJETA DERECHA FONDO */}
              <div className="absolute right-0 hidden h-[290px] w-[260px] rotate-6 overflow-hidden rounded-[2rem] bg-blue-900 shadow-2xl transition-all duration-700 lg:block">
                <img
                  key={`fondo-der-${obtenerSlide(2).imagen}`}
                  src={obtenerSlide(2).imagen}
                  alt={obtenerSlide(2).alt}
                  className="h-full w-full object-cover opacity-70"
                />
                <div className="absolute inset-0 bg-blue-950/45" />
              </div>

              {/* BOTÓN IZQUIERDO */}
              <button
                type="button"
                onClick={() => cambiarSlide("anterior")}
                className="absolute left-0 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-white text-blue-800 shadow-2xl transition hover:-translate-x-1 hover:scale-105"
                aria-label="Imagen anterior"
              >
                <ChevronLeft className="h-7 w-7" />
              </button>

              {/* BOTÓN DERECHO */}
              <button
                type="button"
                onClick={() => cambiarSlide("siguiente")}
                className="absolute right-0 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-white text-blue-800 shadow-2xl transition hover:translate-x-1 hover:scale-105"
                aria-label="Imagen siguiente"
              >
                <ChevronRight className="h-7 w-7" />
              </button>
            </div>

            {/* PUNTOS */}
            <div className="mt-10 flex items-center justify-center gap-3">
              {slides.map((slide, index) => (
                <button
                  key={`${slide.imagen}-${index}`}
                  type="button"
                  onClick={() => setSlideActivo(index)}
                  className={
                    index === slideActivo
                      ? "h-3 w-10 rounded-full bg-blue-700 transition-all"
                      : "h-3 w-3 rounded-full bg-blue-200 transition-all hover:bg-blue-400"
                  }
                  aria-label={`Ver imagen ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* EVENTOS */}
          <div className="relative mx-auto mt-20 max-w-6xl">
            <div className="absolute -inset-5 rounded-[3rem] bg-blue-900/10 blur-2xl" />

            <div className="relative overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white shadow-2xl shadow-slate-900/10">
              <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
                {/* CABECERA EVENTO */}
                <div className="bg-gradient-to-br from-blue-950 via-blue-800 to-blue-600 p-8 text-white">
                  <p className="text-sm font-bold uppercase tracking-[0.25em] text-blue-100">
                    Próximos eventos
                  </p>

                  <h2 className="mt-4 text-4xl font-black leading-tight">
                    XIII Asamblea General
                  </h2>

                  <p className="mt-5 text-sm leading-7 text-blue-100">
                    Espacio de integración, participación institucional y
                    fortalecimiento de la comunidad ASEUNICESMAG.
                  </p>
                </div>

                {/* INFORMACIÓN */}
                <div className="grid gap-5 p-8 md:grid-cols-3">
                  <div className="rounded-3xl bg-slate-50 p-5">
                    <p className="text-sm font-black uppercase tracking-widest text-slate-400">
                      Fecha
                    </p>

                    <div className="mt-4 flex items-center gap-4">
                      <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-2xl bg-blue-950 text-white">
                        <span className="text-xs font-bold">MAR</span>
                        <span className="text-2xl font-black">24</span>
                      </div>

                      <p className="font-black text-slate-900">24 Marzo 2026</p>
                    </div>
                  </div>

                  <div className="rounded-3xl bg-slate-50 p-5">
                    <p className="text-sm font-black uppercase tracking-widest text-slate-400">
                      Hora
                    </p>

                    <p className="mt-5 text-2xl font-black text-blue-950">
                      6:15 PM
                    </p>
                  </div>

                  <div className="rounded-3xl bg-slate-50 p-5">
                    <p className="text-sm font-black uppercase tracking-widest text-slate-400">
                      Lugar
                    </p>

                    <p className="mt-5 font-bold leading-7 text-slate-700">
                      Sala Bellina - Universidad CESMAG
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CONVENIOS */}
        <section className="mx-auto max-w-7xl px-6 py-20">
          <div className="text-center">
            <p className="text-sm font-black uppercase tracking-[0.3em] text-blue-800">
              Convenios
            </p>

            <h2 className="mt-4 text-4xl font-black tracking-tight text-slate-950 md:text-5xl">
              Convenios y Alianzas
            </h2>

            <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-500">
              Empresas, marcas y organizaciones aliadas que brindan beneficios
              exclusivos para los asociados.
            </p>
          </div>

          <div className="mt-14">
            <Swiper
              modules={[Autoplay, Pagination]}
              spaceBetween={30}
              loop={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
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
              {convenios.map((convenio) => (
                <SwiperSlide key={convenio.id}>
                  <article className="group h-full rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                    <div className="flex h-40 items-center justify-center overflow-hidden rounded-3xl bg-slate-50">
                      <img
                        src={convenio.imagen}
                        alt={convenio.nombre}
                        className="max-h-28 max-w-full object-contain transition duration-300 group-hover:scale-105"
                      />
                    </div>

                    <div className="mt-6 text-center">
                      <p className="text-lg font-black text-slate-900">
                        {convenio.nombre}
                      </p>
                    </div>
                  </article>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>

        {/* BENEFICIOS */}
        <section className="bg-blue-950 py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-black uppercase tracking-[0.3em] text-blue-200">
                Beneficios
              </p>

              <h2 className="mt-4 text-4xl font-black tracking-tight text-white md:text-5xl">
                Beneficios para Asociados
              </h2>
            </div>

            <div className="mt-14 space-y-6">
              {beneficios.map((beneficio) => {
                const Icon = beneficio.icon;

                return (
                  <article
                    key={beneficio.titulo}
                    className="group flex items-center gap-6 rounded-[2.5rem] bg-white p-7 shadow-2xl transition hover:-translate-y-1"
                  >
                    <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-blue-50 text-blue-800 transition group-hover:bg-blue-800 group-hover:text-white">
                      <Icon className="h-9 w-9" />
                    </div>

                    <div>
                      <h3 className="text-2xl font-black text-blue-950">
                        {beneficio.titulo}
                      </h3>

                      <p className="mt-3 text-lg leading-8 text-slate-600">
                        {beneficio.texto}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="mt-12 text-center">
              <Link
                href="/afiliacion"
                className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-black text-blue-900 shadow-xl transition hover:bg-blue-50"
              >
                Consulta cómo afiliarte aquí
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* PASOS */}
        <section className="bg-white py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-black uppercase tracking-[0.3em] text-blue-800">
                Afiliación
              </p>

              <h2 className="mt-4 text-4xl font-black tracking-tight text-slate-950">
                Proceso de afiliación
              </h2>
            </div>

            <div className="mt-14 grid gap-6 md:grid-cols-4">
              {pasos.map((texto, index) => (
                <div
                  key={texto}
                  className="rounded-[2.5rem] border border-slate-200 bg-slate-50 p-8 text-center shadow-sm transition hover:-translate-y-1 hover:bg-white hover:shadow-xl"
                >
                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-900 text-xl font-black text-white">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <p className="text-lg font-black text-slate-800">{texto}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-7xl px-6 py-20">
          <div className="overflow-hidden rounded-[3rem] bg-gradient-to-r from-blue-950 via-blue-900 to-blue-700 p-10 text-white shadow-2xl md:p-16">
            <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-3xl bg-white/10">
                  <GraduationCap className="h-8 w-8" />
                </div>

                <h2 className="text-4xl font-black tracking-tight md:text-5xl">
                  Forma parte de ASEUNICESMAG
                </h2>

                <p className="mt-5 max-w-2xl text-lg leading-8 text-blue-100">
                  Accede a beneficios, convenios y servicios diseñados
                  especialmente para la comunidad asociada.
                </p>
              </div>

              <Link
                href="/afiliacion"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-black text-blue-900 shadow-xl transition hover:bg-blue-50"
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
