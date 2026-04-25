"use client";

import { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import styles from "../styles/afiliacion.module.css";
import BeneficiariosForm from "./BeneficiariosForm";

const pasos = [
  "Solicitud",
  "Solicitante",
  "Beneficiarios",
  "Certificación",
  "Firma",
  "Anexos",
];

export default function FormularioAfiliacion() {
  const firmaRef = useRef<SignatureCanvas | null>(null);

  const [pasoActual, setPasoActual] = useState(0);
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const [modoFirma, setModoFirma] = useState<"dibujar" | "subir">("dibujar");
  const [firmaBase64, setFirmaBase64] = useState("");

  const [beneficiarios, setBeneficiarios] = useState([
    { identificacion: "", nombres: "", parentesco: "" },
  ]);

  const agregarBeneficiario = () => {
    setBeneficiarios([
      ...beneficiarios,
      { identificacion: "", nombres: "", parentesco: "" },
    ]);
  };

  const eliminarBeneficiario = (index: number) => {
    if (beneficiarios.length === 1) return;
    setBeneficiarios(beneficiarios.filter((_, i) => i !== index));
  };

  const subirFirma = (e: React.ChangeEvent<HTMLInputElement>) => {
    const archivo = e.target.files?.[0];
    if (!archivo) return;

    const reader = new FileReader();
    reader.onloadend = () => setFirmaBase64(reader.result as string);
    reader.readAsDataURL(archivo);
  };

  const limpiarFirma = () => {
    firmaRef.current?.clear();
    setFirmaBase64("");
  };

  const siguiente = () => {
    setError("");
    setPasoActual((prev) => Math.min(prev + 1, pasos.length - 1));
  };

  const anterior = () => {
    setError("");
    setPasoActual((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setMensaje("");
    setError("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    let firmaFinal = firmaBase64;

    if (
      modoFirma === "dibujar" &&
      firmaRef.current &&
      !firmaRef.current.isEmpty()
    ) {
      firmaFinal = firmaRef.current.getTrimmedCanvas().toDataURL("image/png");
    }

    if (!firmaFinal) {
      setError("Debe registrar la firma del solicitante.");
      setPasoActual(4);
      setLoading(false);
      return;
    }

    formData.append("firma_solicitante", firmaFinal);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;

      const res = await fetch(`${apiUrl}/afiliacion`, {
        method: "POST",
        body: formData,
      });

      const text = await res.text();

      let data: any = null;

      try {
        data = JSON.parse(text);
      } catch {
        data = null;
      }

      if (!res.ok) {
        throw new Error(
          data?.errors?.detalle ||
            data?.message ||
            data?.mensaje ||
            data?.error ||
            text ||
            "No se pudo enviar la solicitud.",
        );
      }

      setMensaje(
        "Solicitud de afiliación enviada correctamente. Queda pendiente de aprobación.",
      );

      form.reset();
      limpiarFirma();
      setPasoActual(0);
      setBeneficiarios([{ identificacion: "", nombres: "", parentesco: "" }]);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error al enviar la solicitud.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <header className={styles.header}>
          <span className={styles.badge}>ASEUNICESMAG</span>
          <h1>Formulario de Afiliación</h1>
          <p>Asociación de Egresados Universidad CESMAG</p>
        </header>

        <div className={styles.progressWrapper}>
          {pasos.map((paso, index) => (
            <div
              key={paso}
              className={`${styles.step} ${
                index <= pasoActual ? styles.stepActive : ""
              }`}
            >
              <span>{index + 1}</span>
              <p>{paso}</p>
            </div>
          ))}
        </div>

        {mensaje && <div className={styles.success}>{mensaje}</div>}
        {error && <div className={styles.error}>{error}</div>}

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <div className={pasoActual === 0 ? styles.pageStep : styles.hidden}>
            <div className={styles.section}>
              <h2>Datos de solicitud</h2>

              <div className={styles.grid3}>
                <div>
                  <label className={styles.label}>Fecha de solicitud *</label>
                  <input
                    className={styles.input}
                    type="date"
                    name="fecha_solicitud"
                    required
                  />
                </div>

                <div>
                  <label className={styles.label}>Se afilia por vez *</label>
                  <select
                    className={styles.input}
                    name="se_afilia_por_vez"
                    required
                  >
                    <option value="">Seleccione</option>
                    <option value="Primera">Primera</option>
                    <option value="Segunda">Segunda</option>
                  </select>
                </div>

                <div>
                  <label className={styles.label}>
                    Radicación ASEUNICESMAG
                  </label>
                  <input
                    className={styles.input}
                    name="radicacion"
                    placeholder="Radicación"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className={pasoActual === 1 ? styles.pageStep : styles.hidden}>
            <div className={styles.section}>
              <h2>1. Información del solicitante</h2>

              <div className={styles.grid3}>
                <div>
                  <label className={styles.label}>Nombres *</label>
                  <input className={styles.input} name="nombres" required />
                </div>

                <div>
                  <label className={styles.label}>Apellidos *</label>
                  <input className={styles.input} name="apellidos" required />
                </div>

                <div>
                  <label className={styles.label}>Tipo de sangre</label>
                  <select className={styles.input} name="tipo_sangre">
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
                  <label className={styles.label}>Género *</label>
                  <select className={styles.input} name="genero" required>
                    <option value="">Seleccione</option>
                    <option value="F">Femenino</option>
                    <option value="M">Masculino</option>
                    <option value="Otro">Otro</option>
                  </select>
                </div>

                <div>
                  <label className={styles.label}>N° de identificación *</label>
                  <input
                    className={styles.input}
                    name="numero_documento"
                    required
                  />
                </div>

                <div>
                  <label className={styles.label}>Fecha de expedición</label>
                  <input
                    className={styles.input}
                    type="date"
                    name="fecha_expedicion"
                  />
                </div>

                <div>
                  <label className={styles.label}>Lugar de expedición</label>
                  <input className={styles.input} name="lugar_expedicion" />
                </div>

                <div>
                  <label className={styles.label}>Fecha de nacimiento</label>
                  <input
                    className={styles.input}
                    type="date"
                    name="fecha_nacimiento"
                  />
                </div>

                <div className={styles.col2}>
                  <label className={styles.label}>
                    Dirección de residencia y barrio *
                  </label>
                  <input className={styles.input} name="direccion" required />
                </div>

                <div>
                  <label className={styles.label}>N° celular *</label>
                  <input className={styles.input} name="telefono" required />
                </div>

                <div>
                  <label className={styles.label}>Correo electrónico *</label>
                  <input
                    className={styles.input}
                    type="email"
                    name="correo"
                    required
                  />
                </div>

                <div>
                  <label className={styles.label}>Nivel educativo</label>
                  <select className={styles.input} name="nivel_educativo">
                    <option value="">Seleccione</option>
                    <option value="Tecnico">Técnico</option>
                    <option value="Profesional">Profesional</option>
                    <option value="Doctorado">Doctorado</option>
                    <option value="Especializacion">Especialización</option>
                    <option value="Magister">Magíster</option>
                  </select>
                </div>

                <div>
                  <label className={styles.label}>
                    Título obtenido en la UNICESMAG
                  </label>
                  <input className={styles.input} name="titulo_obtenido" />
                </div>

                <div>
                  <label className={styles.label}>Ocupación</label>
                  <select className={styles.input} name="ocupacion">
                    <option value="">Seleccione</option>
                    <option>Dependiente</option>
                    <option>Independiente</option>
                    <option>Empleado</option>
                    <option>Hogar</option>
                    <option>Pensionado</option>
                  </select>
                </div>

                <div>
                  <label className={styles.label}>Empresa donde labora</label>
                  <input className={styles.input} name="empresa" />
                </div>

                <div>
                  <label className={styles.label}>Fecha de vinculación</label>
                  <input
                    className={styles.input}
                    type="date"
                    name="fecha_vinculacion"
                  />
                </div>

                <div>
                  <label className={styles.label}>Cargo que desempeña</label>
                  <input className={styles.input} name="cargo" />
                </div>

                <div>
                  <label className={styles.label}>Teléfono empresa</label>
                  <input className={styles.input} name="telefono_empresa" />
                </div>

                <div>
                  <label className={styles.label}>Estado civil</label>
                  <select className={styles.input} name="estado_civil">
                    <option value="">Seleccione</option>
                    <option>Soltero(a)</option>
                    <option>Casado(a)</option>
                    <option>Unión Libre</option>
                    <option>Viudo(a)</option>
                    <option>Divorciado(a)</option>
                  </select>
                </div>

                <div>
                  <label className={styles.label}>N° personas a cargo</label>
                  <input
                    className={styles.input}
                    type="number"
                    name="personas_a_cargo"
                    min="0"
                  />
                </div>

                <div>
                  <label className={styles.label}>Número de hijos</label>
                  <input
                    className={styles.input}
                    type="number"
                    name="numero_hijos"
                    min="0"
                  />
                </div>

                <div>
                  <label className={styles.label}>Hijos edad 0-5</label>
                  <input
                    className={styles.input}
                    type="number"
                    name="hijos_0_5"
                    min="0"
                  />
                </div>

                <div>
                  <label className={styles.label}>Hijos edad 6-11</label>
                  <input
                    className={styles.input}
                    type="number"
                    name="hijos_6_11"
                    min="0"
                  />
                </div>

                <div>
                  <label className={styles.label}>Hijos edad 12-17</label>
                  <input
                    className={styles.input}
                    type="number"
                    name="hijos_12_17"
                    min="0"
                  />
                </div>

                <div>
                  <label className={styles.label}>Hijos edad 18-25</label>
                  <input
                    className={styles.input}
                    type="number"
                    name="hijos_18_25"
                    min="0"
                  />
                </div>

                <div>
                  <label className={styles.label}>Tipo de vivienda</label>
                  <select className={styles.input} name="tipo_vivienda">
                    <option value="">Seleccione</option>
                    <option>Propia</option>
                    <option>Arriendo</option>
                    <option>Familiar</option>
                  </select>
                </div>

                <div>
                  <label className={styles.label}>Zona ubicación</label>
                  <select className={styles.input} name="zona_ubicacion">
                    <option value="">Seleccione</option>
                    <option>Rural</option>
                    <option>Urbana</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className={pasoActual === 2 ? styles.pageStep : styles.hidden}>
            <BeneficiariosForm
              beneficiarios={beneficiarios}
              agregarBeneficiario={agregarBeneficiario}
              eliminarBeneficiario={eliminarBeneficiario}
            />
          </div>

          <div className={pasoActual === 3 ? styles.pageStep : styles.hidden}>
            <div className={styles.section}>
              <h2>3. Voluntad de la afiliación y certificación</h2>

              <label className={styles.label}>
                Motivaciones e intereses para afiliarse a ASEUNICESMAG *
              </label>
              <textarea
                className={`${styles.input} ${styles.textarea}`}
                name="motivacion_afiliacion"
                required
              />

              <div className={styles.grid2}>
                <div>
                  <label className={styles.label}>
                    Nombre del asociado(a) que lo(a) refirió
                  </label>
                  <input className={styles.input} name="referido_por" />
                </div>

                <div>
                  <label className={styles.label}>Cuota de afiliación</label>
                  <input
                    className={styles.input}
                    value="$ 87.000"
                    readOnly
                    name="cuota_afiliacion"
                  />
                </div>
              </div>

              <div className={styles.checkGroup}>
                <label className={styles.check}>
                  <input type="checkbox" name="acepta_habeas_data" required />
                  Autorizo el tratamiento de mis datos personales.
                </label>

                <label className={styles.check}>
                  <input type="checkbox" name="acepta_terminos" required />
                  Declaro mi voluntad de afiliarme y certifico que la
                  información es veraz.
                </label>
              </div>
            </div>
          </div>

          <div className={pasoActual === 4 ? styles.pageStep : styles.hidden}>
            <div className={styles.section}>
              <h2>Firma del solicitante</h2>

              <div className={styles.firmaTabs}>
                <button
                  type="button"
                  className={
                    modoFirma === "dibujar" ? styles.tabActivo : styles.tab
                  }
                  onClick={() => {
                    setModoFirma("dibujar");
                    setFirmaBase64("");
                  }}
                >
                  Dibujar firma
                </button>

                <button
                  type="button"
                  className={
                    modoFirma === "subir" ? styles.tabActivo : styles.tab
                  }
                  onClick={() => {
                    setModoFirma("subir");
                    limpiarFirma();
                  }}
                >
                  Subir firma
                </button>
              </div>

              {modoFirma === "dibujar" && (
                <>
                  <div className={styles.firmaBox}>
                    <SignatureCanvas
                      ref={firmaRef}
                      penColor="black"
                      canvasProps={{ className: styles.firmaCanvas }}
                    />
                  </div>

                  <button
                    type="button"
                    className={styles.deleteButton}
                    onClick={limpiarFirma}
                  >
                    Limpiar firma
                  </button>
                </>
              )}

              {modoFirma === "subir" && (
                <input
                  className={styles.input}
                  type="file"
                  accept="image/*"
                  onChange={subirFirma}
                />
              )}
            </div>
          </div>

          <div className={pasoActual === 5 ? styles.pageStep : styles.hidden}>
            <div className={styles.section}>
              <h2>Anexos requeridos</h2>

              <div className={styles.grid2}>
                <div>
                  <label className={styles.label}>Copia de cédula *</label>
                  <input
                    className={styles.input}
                    type="file"
                    name="copia_cedula"
                    accept=".pdf,.jpg,.jpeg,.png"
                    required
                  />
                </div>

                <div>
                  <label className={styles.label}>Diploma *</label>
                  <input
                    className={styles.input}
                    type="file"
                    name="diploma"
                    accept=".pdf,.jpg,.jpeg,.png"
                    required
                  />
                </div>

                <div>
                  <label className={styles.label}>Fotografía digital *</label>
                  <input
                    className={styles.input}
                    type="file"
                    name="foto_digital"
                    accept="image/*"
                    required
                  />
                </div>

                <div>
                  <label className={styles.label}>Recibo de pago *</label>
                  <input
                    className={styles.input}
                    type="file"
                    name="recibo_pago"
                    accept=".pdf,.jpg,.jpeg,.png"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          <div className={styles.navigation}>
            {pasoActual > 0 && (
              <button
                type="button"
                className={styles.backButton}
                onClick={anterior}
              >
                Anterior
              </button>
            )}

            {pasoActual < pasos.length - 1 ? (
              <button
                type="button"
                className={styles.nextButton}
                onClick={siguiente}
              >
                Siguiente
              </button>
            ) : (
              <button
                className={styles.submit}
                type="submit"
                disabled={loading}
              >
                {loading ? "Enviando solicitud..." : "Enviar solicitud"}
              </button>
            )}
          </div>
        </form>
      </section>
    </main>
  );
}
