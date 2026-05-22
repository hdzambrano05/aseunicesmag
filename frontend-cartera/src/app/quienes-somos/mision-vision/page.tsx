"use client";

import {
  Sparkles,
  Target,
  Eye,
  HeartHandshake,
  ShieldCheck,
  Scale,
  Landmark,
  Users,
  BadgeCheck,
  HandHeart,
  Brain,
  Gem,
  ClipboardCheck,
  FileCheck2,
  ImageIcon,
  ArrowUpRight,
  Waves,
  Network,
  GraduationCap,
} from "lucide-react";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function MisionVisionPage() {
  const valores = [
    { titulo: "Autonomía", icono: ShieldCheck },
    { titulo: "Ayuda Mutua", icono: HandHeart },
    { titulo: "Conciencia", icono: Brain },
    { titulo: "Honestidad", icono: BadgeCheck },
    { titulo: "Lealtad", icono: Gem },
    { titulo: "Responsabilidad", icono: ClipboardCheck },
  ];

  const principios = [
    { titulo: "Transparencia", icono: Eye },
    { titulo: "Participación", icono: Users },
    { titulo: "Legalidad", icono: Landmark },
    { titulo: "Equidad", icono: Scale },
    { titulo: "Responsabilidad Social", icono: HeartHandshake },
    { titulo: "Rendición de Cuentas", icono: FileCheck2 },
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

          <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 py-24 lg:grid-cols-[1.05fr_0.95fr] lg:px-10">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-5 py-2 text-sm font-black text-white backdrop-blur">
                <Sparkles size={16} />
                Identidad institucional
              </span>

              <h1 className="mt-8 text-5xl font-black leading-tight tracking-tight text-white md:text-7xl">
                Misión, Visión
                <span className="block text-cyan-100">y Principios</span>
              </h1>

              <p className="mt-7 max-w-2xl text-lg leading-8 text-blue-50">
                Una guía institucional que conecta el pensamiento humanista, la
                ética, la innovación social y el compromiso de los egresados con
                la región.
              </p>

              <div className="mt-10 flex flex-wrap gap-3">
                {["Humanismo", "Ética", "Innovación", "Región"].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-black text-white backdrop-blur"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* ESPACIO IMAGEN 1 */}
            <div className="relative">
              <div className="relative">
                <div className="absolute -left-8 -top-8 h-32 w-32 rounded-full bg-cyan-300/25 blur-3xl" />
                <div className="absolute -bottom-8 -right-8 h-40 w-40 rounded-full bg-blue-300/25 blur-3xl" />

                <div className="relative rotate-1 rounded-[2.8rem] border border-white/25 bg-white/15 p-4 shadow-2xl backdrop-blur-xl">
                  <div className="-rotate-1 overflow-hidden rounded-[2.2rem] border border-white/20">
                    <div className="relative h-[420px]">
                      {/* Imagen */}
                      <img
                        src="/landing/mision/mision.jpg"
                        alt="Imagen institucional"
                        className="h-full w-full object-cover"
                      />

                      {/* Overlay oscuro */}
                      <div className="absolute inset-0 bg-black/30" />
                    </div>
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

          {/* ONDA */}
          <div className="absolute bottom-0 left-0 w-full">
            <svg
              viewBox="0 0 1440 120"
              className="h-16 w-full"
              preserveAspectRatio="none"
            >
              <path
                d="M0,70 C180,120 340,10 520,58 C700,105 850,115 1030,48 C1210,-18 1320,46 1440,20 L1440,120 L0,120 Z"
                fill="#f4f8ff"
              />
            </svg>
          </div>
        </section>

        {/* MISIÓN Y VISIÓN */}
        <section className="relative mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-12">
            <article className="relative overflow-hidden rounded-[3rem] border border-[#dbe7ff] bg-white p-8 shadow-xl shadow-blue-950/5 lg:col-span-7">
              <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-[#21409A]/10 blur-3xl" />

              <div className="relative flex flex-col gap-8 md:flex-row">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-[1.8rem] bg-gradient-to-br from-[#21409A] to-[#38BDF8] text-white shadow-xl shadow-blue-300/30">
                  <Target size={34} />
                </div>

                <div>
                  <span className="text-sm font-black uppercase tracking-[0.35em] text-[#21409A]">
                    Misión
                  </span>

                  <h2 className="mt-3 text-4xl font-black text-[#07122f]">
                    Propósito institucional
                  </h2>

                  <p className="mt-6 leading-8 text-[#44506b]">
                    La Asociación de Egresados de la Universidad CESMAG –
                    ASEUNICESMAG, inspirada en principios humanistas y éticos,
                    promueve la vinculación, el acompañamiento, la formación
                    continua y el desarrollo profesional y social de sus
                    asociados(as), proyectando su talento y compromiso hacia el
                    fortalecimiento institucional y el impacto social en la
                    región.
                  </p>
                </div>
              </div>
            </article>

            <article className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-[#21409A] via-[#2754B8] to-[#0B7C95] p-8 text-white shadow-2xl shadow-blue-950/20 lg:col-span-5">
              <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-white/15 blur-3xl" />

              <Eye size={44} />

              <span className="mt-8 block text-sm font-black uppercase tracking-[0.35em] text-cyan-100">
                Visión
              </span>

              <h2 className="mt-3 text-4xl font-black">
                Horizonte de crecimiento
              </h2>

              <p className="mt-6 leading-8 text-blue-50">
                ASEUNICESMAG será reconocida como una asociación referente por
                su compromiso ético, su capacidad de generar innovación social
                mediante soluciones creativas, inclusivas y sostenibles, y por
                la construcción de alianzas estratégicas que fortalezcan el
                tejido institucional y social en el suroccidente colombiano.
              </p>
            </article>
          </div>

          {/* IMAGEN 2 */}
          <div className="mt-10 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="mt-10">
              <div className="relative overflow-hidden rounded-[3rem] border border-[#dbe7ff] bg-white p-4 shadow-xl shadow-blue-950/5">
                <div className="relative h-[500px] w-full overflow-hidden rounded-[2.3rem]">
                  <img
                    src="/landing/mision/vision.jpg"
                    alt="Imagen institucional"
                    className="h-full w-full object-cover"
                  />

                  {/* Overlay opcional */}
                  <div className="absolute inset-0 bg-black/20" />
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-[3rem] border border-[#dbe7ff] bg-white p-8 shadow-xl shadow-blue-950/5">
              <div className="absolute right-0 top-0 h-52 w-52 rounded-full bg-cyan-300/10 blur-3xl" />

              <div className="relative">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#eef5ff] px-5 py-2 text-sm font-black text-[#21409A]">
                  <Waves size={17} />
                  Principios que inspiran la gestión
                </span>

                <h2 className="mt-6 text-4xl font-black leading-tight text-[#07122f]">
                  Ética, participación y compromiso con impacto social
                </h2>

                <p className="mt-5 leading-8 text-[#52607c]">
                  La misión y visión se proyectan mediante valores
                  institucionales y principios de gobierno que fortalecen una
                  comunidad organizada, transparente y orientada al servicio.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* VALORES Y PRINCIPIOS */}
        <section className="relative overflow-hidden bg-[#071f4d] py-24">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.18),transparent_32%),linear-gradient(135deg,#071f4d,#21409A_60%,#0B7C95)]" />

          <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
            <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-black text-white backdrop-blur">
                  <Network size={17} />
                  Valores institucionales
                </span>

                <h2 className="mt-7 text-5xl font-black leading-tight text-white">
                  Una identidad construida desde la ética
                </h2>

                <p className="mt-6 leading-8 text-blue-50">
                  Estos valores representan la forma en que ASEUNICESMAG orienta
                  sus acciones, su relación con los asociados y su compromiso
                  con la Universidad CESMAG.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {valores.map((valor, index) => {
                  const Icono = valor.icono;

                  return (
                    <article
                      key={valor.titulo}
                      className={`group rounded-[2rem] border border-white/15 bg-white/10 p-6 text-white backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:bg-white/15 ${
                        index === 1 || index === 4 ? "xl:translate-y-8" : ""
                      }`}
                    >
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#21409A] shadow-lg">
                        <Icono size={27} />
                      </div>

                      <h3 className="mt-5 text-xl font-black">
                        {valor.titulo}
                      </h3>

                      <div className="mt-5 h-[3px] w-12 rounded-full bg-cyan-200 transition-all group-hover:w-24" />
                    </article>
                  );
                })}
              </div>
            </div>

            <div className="my-20 h-px w-full bg-white/15" />

            <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="grid gap-5 sm:grid-cols-2">
                {principios.map((principio) => {
                  const Icono = principio.icono;

                  return (
                    <article
                      key={principio.titulo}
                      className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white p-6 shadow-xl transition duration-300 hover:-translate-y-1"
                    >
                      <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#21409A]/10 blur-2xl" />

                      <div className="relative">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eef5ff] text-[#21409A]">
                          <Icono size={26} />
                        </div>

                        <h3 className="mt-5 text-xl font-black text-[#07122f]">
                          {principio.titulo}
                        </h3>

                        <div className="mt-5 flex items-center gap-2 text-sm font-black text-[#21409A]">
                          Ver principio
                          <ArrowUpRight
                            size={16}
                            className="transition group-hover:translate-x-1 group-hover:-translate-y-1"
                          />
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>

              <div className="rounded-[3rem] border border-white/15 bg-white/10 p-8 text-white backdrop-blur-xl">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2 text-sm font-black">
                  <Landmark size={17} />
                  Principios de Gobierno
                </span>

                <h2 className="mt-7 text-4xl font-black leading-tight">
                  Gobierno institucional transparente
                </h2>

                <p className="mt-6 leading-8 text-blue-50">
                  Orientan la toma de decisiones, la participación, la
                  legalidad, la equidad, la responsabilidad social y la
                  rendición de cuentas dentro de ASEUNICESMAG.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
