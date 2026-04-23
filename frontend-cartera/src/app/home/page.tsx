import Link from "next/link";
import { redirect } from "next/navigation";
export default function AseUnicesmagLandingPage() {
  const stats = [
    { value: "500+", label: "Egresados asociados" },
    { value: "16", label: "Años de comunidad" },
    { value: "30+", label: "Convenios activos" },
    { value: "100%", label: "Enfoque institucional" },
  ];

  const benefits = [
    {
      title: "Red profesional sólida",
      text: "Conecta con egresados, empresarios, docentes y aliados estratégicos en un entorno institucional confiable.",
    },
    {
      title: "Beneficios y convenios",
      text: "Accede a oportunidades exclusivas, descuentos, actividades académicas y servicios pensados para la comunidad.",
    },
    {
      title: "Acompañamiento permanente",
      text: "Mantén un vínculo activo con la asociación mediante programas, orientación y espacios de participación.",
    },
  ];

  const services = [
    "Afiliación y actualización de datos",
    "Gestión de convenios y beneficios",
    "Certificados y servicios al egresado",
    "Actividades institucionales y networking",
    "Convocatorias y oportunidades",
    "Canales de transparencia y participación",
  ];

  const navItems = [
    "Inicio",
    "Afíliate",
    "Convenios",
    "Quiénes somos",
    "Transparencia",
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-sm">
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                <path d="M12 3 1.5 8.25 12 13.5l8.46-4.23v6.06H22V8.25L12 3Zm-7.5 8.55V15c0 1.71 3.36 4.5 7.5 4.5s7.5-2.79 7.5-4.5v-3.45L12 15.3l-7.5-3.75Z" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
                ASEUNICESMAG
              </p>
              <h1 className="text-base font-semibold sm:text-lg">
                Asociación de Egresados
              </h1>
            </div>
          </div>

          <nav className="hidden items-center gap-7 text-sm font-medium lg:flex">
            {navItems.map((item) => (
              <a
                key={item}
                href="#"
                className="text-slate-600 transition hover:text-blue-600"
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button className="hidden rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 sm:inline-flex">
              Contáctanos
            </button>
            <Link
              href="/login"
              className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              Ingreso de usuario
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.12),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(15,23,42,0.08),_transparent_30%)]" />
          <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-8 lg:py-24">
            <div>
              <div className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
                Comunidad activa, beneficios reales y vínculo institucional
                permanente
              </div>

              <h2 className="mt-6 max-w-3xl text-4xl font-bold leading-tight tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                Una experiencia moderna y formal para la comunidad de egresados
              </h2>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                Fortalecemos la relación con nuestros egresados a través de
                servicios, beneficios, convenios y espacios de conexión
                profesional. Una plataforma institucional pensada para informar,
                integrar y acompañar a la comunidad con una imagen seria, actual
                y confiable.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <button className="rounded-2xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700">
                  Afíliate ahora
                </button>
                <button className="rounded-2xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700">
                  Conocer beneficios
                </button>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <p className="text-sm font-semibold text-slate-900">
                    Portal institucional
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Información clara, navegación organizada y acceso rápido a
                    servicios esenciales.
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <p className="text-sm font-semibold text-slate-900">
                    Imagen moderna y confiable
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Un diseño formal, visualmente atractivo y alineado con una
                    institución seria.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-6 -top-6 h-24 w-24 rounded-3xl bg-blue-100 blur-2xl" />
              <div className="absolute -bottom-8 -right-6 h-28 w-28 rounded-full bg-slate-200 blur-2xl" />

              <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-2xl shadow-slate-300/30">
                <div className="border-b border-slate-100 bg-slate-50 px-6 py-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                    Vista principal
                  </p>
                </div>

                <div className="grid gap-6 p-6">
                  <div className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-slate-100">
                    <img
                      src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1400&auto=format&fit=crop"
                      alt="Comunidad de egresados"
                      className="h-[320px] w-full object-cover"
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl bg-slate-900 p-5 text-white">
                      <p className="text-sm text-slate-300">
                        Afiliación institucional
                      </p>
                      <p className="mt-2 text-2xl font-bold">Proceso simple</p>
                      <p className="mt-2 text-sm leading-6 text-slate-300">
                        Acceso directo para registro, actualización de
                        información y servicios al egresado.
                      </p>
                    </div>

                    <div className="rounded-2xl bg-blue-600 p-5 text-white">
                      <p className="text-sm text-blue-100">
                        Beneficios y convenios
                      </p>
                      <p className="mt-2 text-2xl font-bold">
                        Más oportunidades
                      </p>
                      <p className="mt-2 text-sm leading-6 text-blue-100">
                        Convenios, actividades y oportunidades alineadas con el
                        crecimiento profesional.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-white">
          <div className="mx-auto grid max-w-7xl gap-6 px-6 py-10 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center"
              >
                <p className="text-4xl font-bold tracking-tight text-blue-600">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm font-medium text-slate-600">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-600">
              ¿Por qué afiliarte?
            </p>
            <h3 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Una propuesta institucional elegante, útil y centrada en la
              experiencia del egresado
            </h3>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              Esta landing page está pensada para transmitir seriedad, confianza
              y cercanía, mejorando la presentación de la asociación y
              facilitando el acceso a los servicios más importantes.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {benefits.map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                  <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
                    <path d="M12 2a10 10 0 1 0 10 10A10.01 10.01 0 0 0 12 2Zm4.3 8.7-5 5a1 1 0 0 1-1.4 0l-2.3-2.3 1.4-1.4 1.6 1.59 4.3-4.29Z" />
                  </svg>
                </div>
                <h4 className="text-xl font-semibold text-slate-900">
                  {item.title}
                </h4>
                <p className="mt-3 leading-7 text-slate-600">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-slate-900 text-white">
          <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[0.95fr_1.05fr] lg:px-8 lg:py-24">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-300">
                Servicios destacados
              </p>
              <h3 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                Un portal pensado para orientar, informar y conectar a toda la
                comunidad
              </h3>
              <p className="mt-5 max-w-xl text-lg leading-8 text-slate-300">
                El objetivo es ofrecer una página de inicio moderna, con mejor
                jerarquía visual, navegación clara, mayor confianza
                institucional y llamados a la acción más visibles.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {services.map((service) => (
                <div
                  key={service}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm"
                >
                  <p className="font-medium text-white">{service}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="rounded-[2rem] bg-gradient-to-r from-blue-600 to-blue-700 p-8 text-white shadow-2xl shadow-blue-600/20 lg:flex lg:items-center lg:justify-between lg:p-10">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-100">
                Llamado a la acción
              </p>
              <h3 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Una página de inicio más moderna, elegante y preparada para
                crecer
              </h3>
              <p className="mt-4 text-lg leading-8 text-blue-100">
                Esta propuesta mejora la presentación visual, ordena mejor los
                contenidos y proyecta una imagen institucional mucho más fuerte
                para ASEUNICESMAG.
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:mt-0">
              <button className="rounded-2xl bg-white px-6 py-3 font-semibold text-blue-700 transition hover:bg-slate-100">
                Solicitar afiliación
              </button>
              <button className="rounded-2xl border border-white/30 px-6 py-3 font-semibold text-white transition hover:bg-white/10">
                Ver convenios
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
