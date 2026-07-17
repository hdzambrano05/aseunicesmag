"use client";

import { useState } from "react";
import BeneficiariosForm from "./BeneficiariosForm";
import FirmaForm from "./FirmaForm";
import ModalResultado from "../../components/ModalResultado";

const pasos = [
  "Solicitud",
  "Información Personal",
  "Beneficiarios",
  "Afiliación",
  "Autorizaciones",
  "Soportes",
];

const programasAcademicos = [
  "Arquitectura",
  "Diseño Gráfico",
  "Administración de Empresas",
  "Contaduría Pública",
  "Tecnología en Marketing Digital",
  "Derecho",
  "Psicología",
  "Licenciatura en Educación Infantil",
  "Licenciatura en Educación Física",
  "Ingeniería Electrónica",
  "Ingeniería Financiera",
  "Ingeniería Industrial",
  "Ingeniería de Sistemas"
];


type Beneficiario = {
  identificacion: string;
  nombres: string;
  parentesco: string;
};

export default function FormularioAfiliacion() {
  const [pasoActual, setPasoActual] = useState(0);
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const [firmaBase64, setFirmaBase64] = useState("");
  const [modalResultado, setModalResultado] = useState({
    abierto: false,
    tipo: "success" as "success" | "error",
    titulo: "",
    mensaje: "",
  });

  const [beneficiarios, setBeneficiarios] = useState<Beneficiario[]>([
    { identificacion: "", nombres: "", parentesco: "" },
  ]);

  const [nombresArchivos, setNombresArchivos] = useState<
    Record<string, string>
  >({});

  const MAX_BENEFICIARIOS = 3;

  const inputClass =
    "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-700 focus:ring-2 focus:ring-blue-100";

  const labelClass = "mb-1 block text-xs font-semibold text-slate-700";

  const sectionClass =
    "rounded-xl border border-slate-200 bg-white p-4 shadow-sm";

  const titleClass = "mb-4 text-lg font-bold text-slate-900";

  const agregarBeneficiario = () => {
    if (beneficiarios.length >= MAX_BENEFICIARIOS) return;

    setBeneficiarios((prev) => [
      ...prev,
      { identificacion: "", nombres: "", parentesco: "" },
    ]);
  };

  const eliminarBeneficiario = (index: number) => {
    if (beneficiarios.length === 1) return;
    setBeneficiarios((prev) => prev.filter((_, i) => i !== index));
  };

  const siguiente = () => {
    setError("");
    setPasoActual((prev) => Math.min(prev + 1, pasos.length - 1));
  };

  const anterior = () => {
    setError("");
    setPasoActual((prev) => Math.max(prev - 1, 0));
  };

  const convertirErroresLaravel = (errors: unknown) => {
    if (!errors || typeof errors !== "object") return "";

    return Object.values(errors)
      .flat()
      .map((item) => String(item))
      .join(" | ");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setMensaje("");
    setError("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    if (!firmaBase64) {
      setError("Debe registrar la firma digital del solicitante.");
      setPasoActual(4);
      setLoading(false);
      return;
    }

    formData.set("firma_solicitante", firmaBase64);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;

      if (!apiUrl) {
        throw new Error("No está configurada la variable NEXT_PUBLIC_API_URL.");
      }

      const res = await fetch(`${apiUrl}/afiliacion`, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      const text = await res.text();

      let data: any = null;

      try {
        data = JSON.parse(text);
      } catch {
        data = null;
      }

      if (!res.ok) {
        const erroresLaravel = convertirErroresLaravel(data?.errors);

        throw new Error(
          erroresLaravel ||
          data?.message ||
          data?.mensaje ||
          data?.error ||
          text ||
          "No se pudo enviar la solicitud.",
        );
      }

      setModalResultado({
        abierto: true,
        tipo: "success",
        titulo: "Solicitud enviada correctamente",
        mensaje:
          "Tu solicitud de afiliación fue registrada con éxito. Por favor, estar pendiente del correo de aceptación o rechazo, el cual puede llegar a la bandeja principal o a la carpeta de spam.",
      });

      form.reset();
      setFirmaBase64("");
      setNombresArchivos({});
      setPasoActual(0);
      setBeneficiarios([{ identificacion: "", nombres: "", parentesco: "" }]);
    } catch (err) {
      const mensajeError =
        err instanceof Error ? err.message : "Error al enviar la solicitud.";

      setError(mensajeError);

      setModalResultado({
        abierto: true,
        tipo: "error",
        titulo: "No se pudo enviar la solicitud",
        mensaje: mensajeError,
      });
    } finally {
      setLoading(false);
    }


  };

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-6">
      <section className="mx-auto max-w-6xl rounded-2xl border border-slate-200 bg-white p-5 shadow-lg md:p-6">
        <header className="mb-5 border-b border-slate-200 pb-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <span className="inline-flex rounded-md bg-blue-700 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
                ASEUNICESMAG
              </span>

              <h1 className="mt-2 text-2xl font-bold text-slate-900">
                Formulario de Afiliación
              </h1>

              <p className="text-sm text-slate-500">
                Asociación de Egresados Universidad CESMAG
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-right">
              <p className="text-xs font-semibold uppercase text-slate-500">
                Paso {pasoActual + 1} de {pasos.length}
              </p>
              <p className="text-sm font-bold text-blue-700">
                {pasos[pasoActual]}
              </p>
            </div>
          </div>
        </header>

        <div className="mb-5 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
          {pasos.map((paso, index) => (
            <div
              key={paso}
              className={`rounded-lg border px-2 py-2 text-center text-xs font-bold transition ${index <= pasoActual
                ? "border-blue-700 bg-blue-700 text-white"
                : "border-slate-200 bg-slate-50 text-slate-500"
                }`}
            >
              <span
                className={`mx-auto mb-1 flex h-6 w-6 items-center justify-center rounded-full text-[11px] ${index <= pasoActual
                  ? "bg-white text-blue-700"
                  : "bg-white text-slate-500"
                  }`}
              >
                {index + 1}
              </span>
              {paso}
            </div>
          ))}
        </div>

        {mensaje && (
          <div className="mb-4 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
            {mensaje}
          </div>
        )}

        {error && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
          encType="multipart/form-data"
        >
          <div className={pasoActual === 0 ? "block" : "hidden"}>
            <div className={sectionClass}>
              <h2 className={titleClass}>Solicitud</h2>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className={labelClass}>Fecha de solicitud *</label>
                  <input
                    className={inputClass}
                    type="date"
                    name="fecha_solicitud"
                    required
                  />
                </div>

                <div>
                  <label className={labelClass}>Tipo de solicitud *</label>
                  <select
                    className={inputClass}
                    name="se_afilia_por_vez"
                    required
                  >
                    <option value="">Seleccione</option>
                    <option value="Primera">
                      Primera afiliación
                    </option>
                    <option value="Segunda">Reingreso</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className={pasoActual === 1 ? "block" : "hidden"}>
            <div className={sectionClass}>
              <div className="mb-4 border-b border-slate-200 pb-3">
                <h2 className="text-lg font-bold text-slate-900">
                  Información del Solicitante
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  Complete los datos personales, académicos y laborales del
                  solicitante.
                </p>
              </div>

              <div className="grid gap-3 md:grid-cols-3">
                <div>
                  <label className={labelClass}>Nombres *</label>
                  <input
                    className={inputClass}
                    name="nombres"
                    placeholder="Ingrese nombres"
                    required
                  />
                </div>

                <div>
                  <label className={labelClass}>Apellidos *</label>
                  <input
                    className={inputClass}
                    name="apellidos"
                    placeholder="Ingrese apellidos"
                    required
                  />
                </div>

                <div>
                  <label className={labelClass}>Tipo de sangre</label>
                  <select className={inputClass} name="tipo_sangre">
                    <option value="">Seleccione</option>
                    <option>A+</option>
                    <option>A-</option>
                    <option>B+</option>
                    <option>B-</option>
                    <option>O+</option>
                    <option>O-</option>
                    <option>AB+</option>
                    <option>AB-</option>
                  </select>
                </div>

                <div>
                  <label className={labelClass}>Género *</label>
                  <select className={inputClass} name="genero" required>
                    <option value="">Seleccione</option>
                    <option value="F">Femenino</option>
                    <option value="M">Masculino</option>
                    <option value="Otro">Otro</option>
                  </select>
                </div>

                <div>
                  <label className={labelClass}>N° de identificación *</label>
                  <input
                    className={inputClass}
                    name="numero_documento"
                    placeholder="Número de documento"
                    required
                  />
                </div>

                <div>
                  <label className={labelClass}>Fecha de expedición</label>
                  <input
                    className={inputClass}
                    type="date"
                    name="fecha_expedicion"
                  />
                </div>

                <div>
                  <label className={labelClass}>Lugar de expedición</label>
                  <input
                    className={inputClass}
                    name="lugar_expedicion"
                    placeholder="Ciudad o municipio"
                  />
                </div>

                <div>
                  <label className={labelClass}>Fecha de nacimiento</label>
                  <input
                    className={inputClass}
                    type="date"
                    name="fecha_nacimiento"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className={labelClass}>
                    Dirección de residencia y barrio *
                  </label>
                  <input
                    className={inputClass}
                    name="direccion"
                    placeholder="Dirección completa"
                    required
                  />
                </div>

                <div>
                  <label className={labelClass}>N° celular *</label>
                  <input
                    className={inputClass}
                    name="telefono"
                    placeholder="Número celular"
                    required
                  />
                </div>

                <div>
                  <label className={labelClass}>Correo electrónico *</label>
                  <input
                    className={inputClass}
                    type="email"
                    name="correo"
                    placeholder="correo@ejemplo.com"
                    required
                  />
                </div>

                <div>
                  <label className={labelClass}>Nivel educativo</label>
                  <select className={inputClass} name="nivel_educativo">
                    <option value="">Seleccione</option>
                    <option value="Tecnico">Técnico</option>
                    <option value="Profesional">Profesional</option>
                    <option value="Doctorado">Doctorado</option>
                    <option value="Especializacion">Especialización</option>
                    <option value="Magister">Magíster</option>
                  </select>
                </div>

                <div>
                  <label className={labelClass}>
                    Título obtenido en la UNICESMAG
                  </label>

                  <select
                    className={inputClass}
                    name="titulo_obtenido"
                    defaultValue=""
                  >
                    <option value="">Seleccione un programa</option>

                    {programasAcademicos.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={labelClass}>Ocupación</label>
                  <select className={inputClass} name="ocupacion">
                    <option value="">Seleccione</option>
                    <option>Dependiente</option>
                    <option>Independiente</option>
                    <option>Empleado</option>
                    <option>Hogar</option>
                    <option>Pensionado</option>
                  </select>
                </div>

                <div>
                  <label className={labelClass}>Empresa donde labora</label>
                  <input
                    className={inputClass}
                    name="empresa"
                    placeholder="Nombre de la empresa"
                  />
                </div>

                <div>
                  <label className={labelClass}>Fecha de vinculación</label>
                  <input
                    className={inputClass}
                    type="date"
                    name="fecha_vinculacion"
                  />
                </div>

                <div>
                  <label className={labelClass}>Cargo que desempeña</label>
                  <input
                    className={inputClass}
                    name="cargo"
                    placeholder="Cargo actual"
                  />
                </div>

                <div>
                  <label className={labelClass}>Teléfono empresa</label>
                  <input
                    className={inputClass}
                    name="telefono_empresa"
                    placeholder="Teléfono empresarial"
                  />
                </div>

                <div>
                  <label className={labelClass}>Estado civil</label>
                  <select className={inputClass} name="estado_civil">
                    <option value="">Seleccione</option>
                    <option>Soltero(a)</option>
                    <option>Casado(a)</option>
                    <option>Unión Libre</option>
                    <option>Viudo(a)</option>
                    <option>Divorciado(a)</option>
                  </select>
                </div>

                <div>
                  <label className={labelClass}>N° personas a cargo</label>
                  <input
                    className={inputClass}
                    type="number"
                    name="personas_a_cargo"
                    min="0"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className={labelClass}>Número de hijos</label>
                  <input
                    className={inputClass}
                    type="number"
                    name="numero_hijos"
                    min="0"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className={labelClass}>Hijos edad 0-5</label>
                  <input
                    className={inputClass}
                    type="number"
                    name="hijos_0_5"
                    min="0"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className={labelClass}>Hijos edad 6-11</label>
                  <input
                    className={inputClass}
                    type="number"
                    name="hijos_6_11"
                    min="0"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className={labelClass}>Hijos edad 12-17</label>
                  <input
                    className={inputClass}
                    type="number"
                    name="hijos_12_17"
                    min="0"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className={labelClass}>Hijos edad 18-25</label>
                  <input
                    className={inputClass}
                    type="number"
                    name="hijos_18_25"
                    min="0"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className={labelClass}>Tipo de vivienda</label>
                  <select className={inputClass} name="tipo_vivienda">
                    <option value="">Seleccione</option>
                    <option>Propia</option>
                    <option>Arriendo</option>
                    <option>Familiar</option>
                  </select>
                </div>

                <div>
                  <label className={labelClass}>Zona ubicación</label>
                  <select className={inputClass} name="zona_ubicacion">
                    <option value="">Seleccione</option>
                    <option>Rural</option>
                    <option>Urbana</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className={pasoActual === 2 ? "block" : "hidden"}>
            <BeneficiariosForm
              beneficiarios={beneficiarios}
              agregarBeneficiario={agregarBeneficiario}
              eliminarBeneficiario={eliminarBeneficiario}
            />
          </div>

          <div className={pasoActual === 3 ? "block" : "hidden"}>
            <div className={sectionClass}>
              <h2 className={titleClass}>Afiliación</h2>

              <div className="space-y-4">
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <h3 className="mb-3 text-sm font-black uppercase tracking-wide text-slate-700">
                    Asociado que refiere
                  </h3>

                  <div className="grid gap-4 md:grid-cols-3">
                    <div>
                      <label className={labelClass}>Nombre completo</label>
                      <input
                        className={inputClass}
                        name="referido_por"
                        placeholder="Nombre del asociado"
                      />
                    </div>

                    <div>
                      <label className={labelClass}>Documento</label>
                      <input
                        className={inputClass}
                        name="documento_referido"
                        placeholder="Documento del asociado"
                      />
                    </div>

                    <div>
                      <label className={labelClass}>Relación</label>
                      <input
                        className={inputClass}
                        name="relacion_referido"
                        placeholder="Ej: amigo, docente, egresado"
                      />
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <h3 className="mb-3 text-sm font-black uppercase tracking-wide text-slate-700">
                    Motivación e interés
                  </h3>

                  <label className={labelClass}>
                    Motivaciones e intereses para afiliarse *
                  </label>
                  <textarea
                    className="min-h-28 w-full resize-y rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
                    name="motivacion_afiliacion"
                    placeholder="Escriba brevemente sus motivaciones..."
                    required
                  />
                </div>

                <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
                  <h3 className="mb-3 text-sm font-black uppercase tracking-wide text-blue-800">
                    Información de cuota
                  </h3>

                  <p className="text-sm text-slate-700">
                    <strong>CUOTA DE AFILIACIÓN PAGO ÚNICO: $87.000</strong>
                  </p>

                  <p className="mt-2 text-sm text-slate-700">
                    Datos para realizar el pago:
                    <strong>
                      {" "}
                      BANCOLOMBIA – Cuenta de ahorros N.° 879-228464-11
                    </strong>
                  </p>

                  <p className="mt-2 text-sm text-slate-700">
                    Una vez aceptada su afiliación se debe pagar la cuota de
                    sostenimiento de <strong>$17.000 mensuales</strong> tarifa
                    año 2026, pagaderos semestral o anual.
                  </p>

                  <input type="hidden" name="cuota_afiliacion" value="87000" />
                  <input
                    type="hidden"
                    name="cuota_sostenimiento"
                    value="17000"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className={pasoActual === 4 ? "block" : "hidden"}>
            <div className={sectionClass}>
              <h2 className={titleClass}>Autorizaciones</h2>

              <div className="space-y-4">
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <h3 className="mb-2 text-sm font-black uppercase tracking-wide text-slate-700">
                    Declaración
                  </h3>

                  <p className="text-sm leading-6 text-slate-700">
                    Declaro mi voluntad de afiliarme a la Asociación de
                    Egresados de la Universidad CESMAG – ASEUNICESMAG,
                    comprometiéndome a cumplir sus estatutos, reglamentos y
                    decisiones, y certifico que la información aquí registrada
                    es veraz.
                  </p>

                  <label className="mt-3 flex cursor-pointer items-start gap-3 rounded-lg bg-white p-3 text-sm text-slate-700 ring-1 ring-slate-200">
                    <input
                      type="checkbox"
                      name="acepta_terminos"
                      required
                      className="mt-0.5 h-4 w-4 rounded border-slate-300 text-blue-700 focus:ring-blue-600"
                    />
                    <span>
                      Acepto la declaración de voluntad de afiliación.
                    </span>
                  </label>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <h3 className="mb-2 text-sm font-black uppercase tracking-wide text-slate-700">
                    Autorización de tratamiento de datos personales
                  </h3>

                  <p className="text-sm leading-6 text-slate-700">
                    De acuerdo con la Política de Tratamiento de Datos
                    Personales de la ASOCIACIÓN DE EGRESADOS DE LA UNIVERSIDAD
                    CESMAG – ASEUNICESMAG, y en cumplimiento de la Ley 1581 de
                    2012 y el Decreto 1377 de 2013, autorizo de manera libre,
                    previa, expresa e informada el tratamiento de mis datos
                    personales para fines relacionados con mi afiliación, la
                    gestión administrativa, el cumplimiento de obligaciones
                    legales y la comunicación de actividades y beneficios de la
                    asociación. Podré ejercer en cualquier momento mis derechos
                    de acceso, rectificación, supresión o revocatoria de la
                    autorización a través del correo: aseunicesmag@gmail.com.
                  </p>

                  <label className="mt-3 flex cursor-pointer items-start gap-3 rounded-lg bg-white p-3 text-sm text-slate-700 ring-1 ring-slate-200">
                    <input
                      type="checkbox"
                      name="acepta_habeas_data"
                      required
                      className="mt-0.5 h-4 w-4 rounded border-slate-300 text-blue-700 focus:ring-blue-600"
                    />
                    <span>
                      Autorizo el tratamiento de mis datos personales.
                    </span>
                  </label>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <h3 className="mb-3 text-sm font-black uppercase tracking-wide text-slate-700">
                    Firma digital
                  </h3>

                  <FirmaForm setFirmaBase64={setFirmaBase64} />
                </div>
              </div>
            </div>
          </div>

          <div className={pasoActual === 5 ? "block" : "hidden"}>
            <div className={sectionClass}>
              <h2 className={titleClass}>Soportes</h2>

              <div className="grid gap-4 md:grid-cols-2">
                {[
                  {
                    label: "Copia de cédula *",
                    name: "copia_cedula",
                    accept: ".pdf,.jpg,.jpeg,.png",
                    text: "PDF, JPG o PNG",
                    required: true,
                  },
                  {
                    label: "Diploma *",
                    name: "diploma",
                    accept: ".pdf,.jpg,.jpeg,.png",
                    text: "PDF, JPG o PNG",
                    required: true,
                  },
                  {
                    label: "Fotografía digital *",
                    name: "foto_digital",
                    accept: "image/*",
                    text: "Imagen JPG o PNG",
                    required: true,
                  },
                  {
                    label: "Recibo de Pago *",
                    name: "recibo_pago",
                    accept: ".pdf,.jpg,.jpeg,.png",
                    text: "PDF, JPG o PNG",
                    required: true,
                  },

                ].map((file) => (
                  <label
                    key={file.name}
                    className="group cursor-pointer rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 transition hover:border-blue-600 hover:bg-blue-50"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-blue-700 shadow-sm group-hover:bg-blue-700 group-hover:text-white">
                        📎
                      </div>

                      <div className="flex-1">
                        <p className="text-sm font-bold text-slate-800">
                          {file.label}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          Formatos permitidos: {file.text}
                        </p>

                        <div className="mt-3 inline-flex rounded-lg bg-white px-3 py-2 text-xs font-semibold text-slate-600 shadow-sm ring-1 ring-slate-200 group-hover:text-blue-700">
                          Seleccionar archivo
                        </div>

                        <input
                          className="hidden"
                          type="file"
                          name={file.name}
                          accept={file.accept}
                          required={file.required}
                          onChange={(e) => {
                            const archivo = e.target.files?.[0];

                            setNombresArchivos((prev) => ({
                              ...prev,
                              [file.name]: archivo ? archivo.name : "",
                            }));
                          }}
                        />

                        {nombresArchivos[file.name] && (
                          <p className="mt-2 text-xs font-semibold text-emerald-600">
                            Archivo seleccionado: {nombresArchivos[file.name]}
                          </p>
                        )}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:justify-between">
            {pasoActual > 0 ? (
              <button
                type="button"
                className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                onClick={anterior}
              >
                Anterior
              </button>
            ) : (
              <div />
            )}

            {pasoActual < pasos.length - 1 ? (
              <button
                type="button"
                className="rounded-lg bg-blue-700 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800"
                onClick={siguiente}
              >
                Siguiente
              </button>
            ) : (
              <button
                className="rounded-lg bg-slate-900 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                type="submit"
                disabled={loading}
              >
                {loading ? "Enviando solicitud..." : "Enviar solicitud"}
              </button>
            )}
          </div>
        </form>
      </section>

      <ModalResultado
        abierto={modalResultado.abierto}
        tipo={modalResultado.tipo}
        titulo={modalResultado.titulo}
        mensaje={modalResultado.mensaje}
        onCerrar={() =>
          setModalResultado((prev) => ({
            ...prev,
            abierto: false,
          }))
        }
      />
    </main>
  );
}
