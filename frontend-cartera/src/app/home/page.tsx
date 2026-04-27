import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  CreditCard,
  FileText,
  GraduationCap,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const beneficios = [
  {
    icon: Users,
    titulo: "Comunidad profesional",
    texto:
      "Conecta con egresados, participa en espacios institucionales y fortalece tu red profesional.",
  },
  {
    icon: FileText,
    titulo: "Certificados y servicios",
    texto:
      "Accede de forma organizada a documentos, solicitudes y servicios digitales para asociados.",
  },
  {
    icon: CreditCard,
    titulo: "Gestión de pagos",
    texto:
      "Consulta recibos, estados de membresía y obligaciones asociadas a tu proceso.",
  },
];

const pasos = [
  "Diligencia el formulario",
  "Carga los documentos",
  "El administrador revisa",
  "Recibes tus credenciales",
];

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen overflow-hidden bg-slate-50">
        <section className="relative bg-slate-950 text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#2563eb55,transparent_35%),radial-gradient(circle_at_bottom_right,#38bdf855,transparent_35%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0d_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0d_1px,transparent_1px)] bg-[size:44px_44px]" />

          <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:py-28">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-blue-100 backdrop-blur">
                <Sparkles className="h-4 w-4" />
                Comunidad profesional de egresados
              </span>

              <h1 className="mt-7 max-w-4xl text-4xl font-black leading-tight tracking-tight md:text-6xl">
                Conectamos egresados, oportunidades y crecimiento profesional
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
                ASEUNICESMAG fortalece la integración de sus asociados mediante
                afiliación en línea, gestión documental, pagos y acceso seguro a
                servicios digitales.
              </p>

              <div className="mt-9 flex flex-wrap gap-4">
                <Link
                  href="/user/afiliacion"
                  className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-6 py-3 text-sm font-black text-white shadow-xl shadow-blue-600/25 transition hover:-translate-y-0.5 hover:bg-blue-500"
                >
                  Afiliarme ahora
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-6 py-3 text-sm font-black text-white backdrop-blur transition hover:bg-white/20"
                >
                  Iniciar sesión
                </Link>
              </div>

              <div className="mt-10 grid max-w-xl grid-cols-3 gap-4">
                <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                  <p className="text-2xl font-black">100%</p>
                  <p className="mt-1 text-xs text-slate-300">Proceso digital</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                  <p className="text-2xl font-black">24/7</p>
                  <p className="mt-1 text-xs text-slate-300">Acceso seguro</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                  <p className="text-2xl font-black">Rol</p>
                  <p className="mt-1 text-xs text-slate-300">Controlado</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 rounded-[2.5rem] bg-blue-500/20 blur-2xl" />

              <div className="relative rounded-[2rem] border border-white/10 bg-white/10 p-4 shadow-2xl backdrop-blur-xl">
                <div className="rounded-[1.5rem] bg-white p-6 text-slate-900">
                  <div className="mb-6 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-black text-blue-600">
                        Panel digital ASEUNICESMAG
                      </p>
                      <h2 className="mt-1 text-2xl font-black">
                        Gestión rápida y segura
                      </h2>
                    </div>

                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white">
                      <GraduationCap className="h-6 w-6" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    {[
                      {
                        icon: BadgeCheck,
                        title: "Afiliación en línea",
                        text: "Registro digital y revisión administrativa.",
                      },
                      {
                        icon: ShieldCheck,
                        title: "Dashboard de asociado",
                        text: "Consulta tu estado, código y beneficios.",
                      },
                      {
                        icon: LockKeyhole,
                        title: "Seguridad y control",
                        text: "Acceso protegido según rol y membresía.",
                      },
                    ].map((item) => {
                      const Icon = item.icon;

                      return (
                        <div
                          key={item.title}
                          className="flex gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4"
                        >
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                            <Icon className="h-5 w-5" />
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
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-20">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-widest text-blue-600">
                Beneficios
              </p>
              <h2 className="mt-3 max-w-2xl text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
                Una plataforma pensada para asociados activos
              </h2>
            </div>

            <p className="max-w-md text-sm leading-7 text-slate-500">
              Centraliza información, documentos y procesos para brindar una
              experiencia moderna y organizada.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {beneficios.map((beneficio) => {
              const Icon = beneficio.icon;

              return (
                <article
                  key={beneficio.titulo}
                  className="group rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-950/10"
                >
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-700 transition group-hover:bg-blue-600 group-hover:text-white">
                    <Icon className="h-7 w-7" />
                  </div>

                  <h3 className="text-xl font-black text-slate-900">
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
              <p className="text-sm font-black uppercase tracking-widest text-blue-600">
                Proceso
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
                Afiliarte es simple
              </h2>
              <p className="mt-4 text-slate-500">
                Un flujo claro para registrar, validar y activar nuevos
                asociados.
              </p>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-4">
              {pasos.map((texto, index) => (
                <div
                  key={texto}
                  className="relative rounded-[2rem] border border-slate-200 bg-slate-50 p-6 text-center"
                >
                  <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 text-lg font-black text-white shadow-lg">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <p className="font-black text-slate-800">{texto}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-20">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-blue-700 via-blue-800 to-slate-950 p-8 text-white shadow-2xl md:p-14">
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />

            <div className="relative grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <h2 className="text-3xl font-black tracking-tight md:text-4xl">
                  Forma parte de ASEUNICESMAG
                </h2>
                <p className="mt-4 max-w-2xl leading-7 text-blue-100">
                  Inicia tu proceso de afiliación y accede a una experiencia
                  digital más ágil, segura y organizada.
                </p>
              </div>

              <Link
                href="/user/afiliacion"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-7 py-3 text-sm font-black text-blue-700 shadow-xl transition hover:-translate-y-0.5 hover:bg-blue-50"
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
