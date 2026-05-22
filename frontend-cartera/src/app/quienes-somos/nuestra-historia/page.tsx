"use client";

import Image from "next/image";
import {
  CalendarDays,
  Landmark,
  Sparkles,
  Users,
  ArrowRight,
  ImageIcon,
  Building2,
  BadgeCheck,
  HeartHandshake,
  Waves,
  GraduationCap,
} from "lucide-react";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function NuestraHistoriaPage() {
  const imagenPrincipal = "/landing/nuestra-historia/4.jpeg";
  const imagenHistorica = "/landing/nuestra-historia/1.jpg";

  const fotos = [
    {
      titulo: "Primera Asamblea",
      texto: "Fotografía histórica de la conformación de ASEUNICESMAG.",
      imagen: "/landing/nuestra-historia/2.jpg",
    },
    {
      titulo: "Comunidad de Egresados",
      texto: "Encuentros, participación e integración de asociados.",
      imagen: "/landing/nuestra-historia/3.jpg",
    },
    {
      titulo: "Nueva etapa institucional",
      texto: "Refundación, modernización y fortalecimiento institucional.",
      imagen: "/landing/nuestra-historia/6.jpeg",
    },
  ];

  const hitos = [
    {
      fecha: "Octubre de 2013",
      titulo: "Primera Asamblea",
      texto: "Se realizó la Asamblea de conformación de ASEUNICESMAG.",
    },
    {
      fecha: "Enero de 2014",
      titulo: "Constitución legal",
      texto:
        "La Asociación fue legalmente constituida como espacio de encuentro, apoyo y desarrollo profesional.",
    },
    {
      fecha: "Agosto de 2025",
      titulo: "Nueva etapa institucional",
      texto:
        "Actualización de Estatutos mediante Acta No. 012 y fortalecimiento del gobierno corporativo.",
    },
  ];

  const pilares = [
    {
      titulo: "Identidad institucional",
      icono: Building2,
    },
    {
      titulo: "Modernización tecnológica",
      icono: Sparkles,
    },
    {
      titulo: "Compromiso social",
      icono: HeartHandshake,
    },
  ];

  return (
    <>
      <Navbar />

      <main className="min-h-screen overflow-hidden bg-[#f4f8ff] text-[#07122f]">
        {/* HERO */}
        <section className="relative overflow-hidden bg-[#071f4d]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(56,189,248,0.25),transparent_30%),radial-gradient(circle_at_85%_10%,rgba(45,91,227,0.35),transparent_28%),linear-gradient(135deg,#071f4d,#21409A_55%,#0B7C95)]" />

          <div className="absolute left-0 top-0 h-full w-full opacity-20">
            <div className="absolute left-10 top-20 h-40 w-40 rounded-full border border-white/30" />
            <div className="absolute bottom-16 right-20 h-64 w-64 rounded-full border border-white/20" />
            <div className="absolute left-1/2 top-10 h-24 w-24 rounded-full border border-cyan-200/30" />
          </div>

          <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:px-10">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-5 py-2 text-sm font-black text-white backdrop-blur">
                <Sparkles size={16} />
                Quiénes somos
              </span>

              <h1 className="mt-8 text-5xl font-black leading-tight tracking-tight text-white md:text-7xl">
                Nuestra
                <span className="block text-cyan-100">Historia</span>
              </h1>

              <p className="mt-7 max-w-2xl text-lg leading-8 text-blue-50">
                ASEUNICESMAG nace como una comunidad de egresados comprometida
                con mantener vivo el vínculo con su Alma Máter, fortalecer la
                identidad institucional y proyectar su compromiso social en la
                región.
              </p>

              <div className="mt-10 flex flex-wrap gap-3">
                {["2013 Asamblea", "2014 Constitución", "2025 Refundación"].map(
                  (item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-black text-white backdrop-blur"
                    >
                      {item}
                    </span>
                  ),
                )}
              </div>
            </div>

            {/* IMAGEN PRINCIPAL */}
            <div className="relative">
              <div className="absolute -left-8 -top-8 h-32 w-32 rounded-full bg-cyan-300/25 blur-3xl" />
              <div className="absolute -bottom-8 -right-8 h-40 w-40 rounded-full bg-blue-300/25 blur-3xl" />

              <div className="relative rotate-1 rounded-[2.8rem] border border-white/25 bg-white/15 p-4 shadow-2xl backdrop-blur-xl">
                <div className="-rotate-1 overflow-hidden rounded-[2.2rem] border border-white/20 bg-white/10">
                  <div className="relative h-[390px] w-full">
                    <Image
                      src={imagenPrincipal}
                      alt="Historia de ASEUNICESMAG"
                      fill
                      priority
                      className="object-cover"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#07122f]/60 via-transparent to-transparent" />
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-7 left-8 rounded-3xl bg-white px-6 py-4 shadow-2xl">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eef5ff] text-[#21409A]">
                    <GraduationCap size={26} />
                  </div>

                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-[#8da0c6]">
                      ASEUNICESMAG
                    </p>
                    <p className="text-lg font-black text-[#21409A]">
                      Comunidad egresada
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 w-full">
            <svg
              viewBox="0 0 1440 120"
              className="h-14 w-full"
              preserveAspectRatio="none"
            >
              <path
                d="M0,70 C180,120 340,10 520,58 C700,105 850,115 1030,48 C1210,-18 1320,46 1440,20 L1440,120 L0,120 Z"
                fill="#f4f8ff"
              />
            </svg>
          </div>
        </section>

        {/* FUNDACIÓN Y REFUNDACIÓN */}
        <section className="relative mx-auto max-w-7xl px-6 py-16 lg:px-10">
          <div className="grid gap-6 lg:grid-cols-12">
            <article className="relative overflow-hidden rounded-[2.4rem] border border-[#dbe7ff] bg-white p-7 shadow-lg shadow-blue-950/5 lg:col-span-7">
              <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-[#21409A]/10 blur-3xl" />

              <div className="relative flex flex-col gap-6 md:flex-row">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[1.4rem] bg-gradient-to-br from-[#21409A] to-[#38BDF8] text-white shadow-xl shadow-blue-300/30">
                  <Landmark size={30} />
                </div>

                <div>
                  <span className="text-xs font-black uppercase tracking-[0.35em] text-[#21409A]">
                    Fundación
                  </span>

                  <h2 className="mt-3 text-3xl font-black text-[#07122f]">
                    El origen de una comunidad de egresados
                  </h2>

                  <p className="mt-4 leading-7 text-[#44506b]">
                    La Asociación de Egresados de la Universidad CESMAG –
                    ASEUNICESMAG nació como una iniciativa de un grupo de
                    profesionales comprometidos con mantener el vínculo con su
                    Alma Máter y fortalecer la identidad institucional de los
                    egresados.
                  </p>
                </div>
              </div>
            </article>

            <article className="relative overflow-hidden rounded-[2.4rem] bg-gradient-to-br from-[#21409A] via-[#2754B8] to-[#0B7C95] p-7 text-white shadow-xl shadow-blue-950/20 lg:col-span-5">
              <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-white/15 blur-3xl" />

              <Users size={38} />

              <span className="mt-6 block text-xs font-black uppercase tracking-[0.35em] text-cyan-100">
                Refundación
              </span>

              <h2 className="mt-3 text-3xl font-black">
                Una nueva etapa institucional
              </h2>

              <p className="mt-4 leading-7 text-blue-50">
                En 2025, ASEUNICESMAG emprendió un proceso de refundación y
                fortalecimiento institucional, dando paso a una etapa
                caracterizada por la actualización estatutaria, la ética
                corporativa y la modernización tecnológica.
              </p>
            </article>
          </div>

          {/* TIMELINE + IMAGEN */}
          <div className="mt-8 grid gap-6 lg:grid-cols-[0.75fr_1.25fr]">
            <div className="relative overflow-hidden rounded-[2rem] border border-[#dbe7ff] bg-white p-3 shadow-lg shadow-blue-950/5">
              <div className="relative h-[260px] overflow-hidden rounded-[1.5rem]">
                <Image
                  src={imagenHistorica}
                  alt="Imagen histórica ASEUNICESMAG"
                  fill
                  className="object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#07122f]/75 via-[#07122f]/15 to-transparent" />

                <div className="absolute bottom-0 left-0 p-5 text-white">
                  <ImageIcon className="mb-2" size={28} />
                  <p className="text-xl font-black">Imagen histórica</p>
                  <p className="mt-1 text-xs leading-5 text-blue-50">
                    Registro institucional de la historia de ASEUNICESMAG.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[2rem] border border-[#dbe7ff] bg-white p-6 shadow-lg shadow-blue-950/5">
              <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-cyan-300/10 blur-3xl" />

              <div className="relative">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#eef5ff] px-4 py-2 text-xs font-black text-[#21409A]">
                  <Waves size={15} />
                  Línea de tiempo
                </span>

                <h2 className="mt-5 text-3xl font-black leading-tight text-[#07122f]">
                  Momentos que marcaron la historia de ASEUNICESMAG
                </h2>

                <div className="mt-6 space-y-4">
                  {hitos.map((hito) => (
                    <div
                      key={hito.fecha}
                      className="relative rounded-[1.5rem] border border-[#dbe7ff] bg-[#f8fbff] p-4"
                    >
                      <div className="flex gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#eef5ff] text-[#21409A]">
                          <CalendarDays size={18} />
                        </div>

                        <div>
                          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#21409A]">
                            {hito.fecha}
                          </p>

                          <h3 className="mt-1 text-lg font-black text-[#07122f]">
                            {hito.titulo}
                          </h3>

                          <p className="mt-1 text-sm leading-6 text-[#52607c]">
                            {hito.texto}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* NUEVA ETAPA */}
        <section className="relative overflow-hidden bg-[#071f4d] py-16">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.18),transparent_32%),linear-gradient(135deg,#071f4d,#21409A_60%,#0B7C95)]" />

          <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
            <div className="grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-black text-white backdrop-blur">
                  <BadgeCheck size={15} />
                  Nueva etapa institucional
                </span>

                <h2 className="mt-6 max-w-xl text-4xl font-black leading-tight text-white md:text-5xl">
                  Modernización, ética y compromiso social
                </h2>

                <p className="mt-5 max-w-xl leading-7 text-blue-50">
                  En el marco de su fortalecimiento institucional, ASEUNICESMAG
                  actualizó sus Estatutos mediante el Acta No. 012 de agosto de
                  2025, aprobó el Código de Gobierno Corporativo y Ética, e
                  inició una estrategia de modernización tecnológica con la
                  creación de su nuevo sitio web y sistema digital de
                  afiliación.
                </p>

                <p className="mt-4 max-w-xl leading-7 text-blue-50">
                  Hoy, ASEUNICESMAG se consolida como una comunidad moderna,
                  ética e inclusiva, que integra la tradición humanista de la
                  Universidad CESMAG con los retos del presente.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {pilares.map((item) => {
                  const Icono = item.icono;

                  return (
                    <article
                      key={item.titulo}
                      className="group rounded-[1.7rem] border border-white/15 bg-white/10 p-6 text-white backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:bg-white/15"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-[#21409A] shadow-lg">
                        <Icono size={24} />
                      </div>

                      <h3 className="mt-5 text-xl font-black leading-tight">
                        {item.titulo}
                      </h3>

                      <ArrowRight
                        className="mt-4 transition group-hover:translate-x-1"
                        size={20}
                      />
                    </article>
                  );
                })}
              </div>
            </div>

            <div className="mt-14 grid gap-6 md:grid-cols-3">
              {fotos.map((foto) => (
                <article
                  key={foto.titulo}
                  className="group relative overflow-hidden rounded-[2rem] bg-white shadow-xl shadow-blue-950/10"
                >
                  <div className="relative h-[300px] w-full">
                    <Image
                      src={foto.imagen}
                      alt={foto.titulo}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#07122f]/95 via-[#07122f]/60 to-transparent" />
                  </div>

                  <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                    <h3 className="text-2xl font-black">{foto.titulo}</h3>

                    <p className="mt-2 text-sm leading-6 text-white/85">
                      {foto.texto}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}