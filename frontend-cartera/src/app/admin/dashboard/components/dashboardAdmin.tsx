"use client";

import { useEffect, useState } from "react";
import styles from "../styles/dashboardAdmin.module.css";

type Archivo = {
  id: number;
  tipo_archivo: string;
  nombre_original: string;
  url: string;
};

type Solicitud = {
  id: number;
  fecha_solicitud: string;
  estado: string;
  usuario: {
    nombres: string;
    apellidos: string;
    numero_documento: string;
    correo: string;
    telefono?: string;
  };
  asociado?: {
    estado_membresia: string;
  };
  archivos: Archivo[];
};

export default function DashboardAdmin() {
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);
  const [loading, setLoading] = useState(true);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const getToken = () => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("token");
  };

  const cargarSolicitudes = async () => {
    try {
      setLoading(true);
      setError("");

      const token = getToken();

      if (!token) {
        window.location.href = "/login";
        return;
      }

      const res = await fetch(`${apiUrl}/admin/afiliaciones?estado=PENDIENTE`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message || "No se pudieron cargar las solicitudes.",
        );
      }

      setSolicitudes(data.data || []);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Error al cargar solicitudes.");
      }
    } finally {
      setLoading(false);
    }
  };

  const aprobar = async (id: number) => {
    const confirmar = confirm("¿Seguro que deseas aprobar esta afiliación?");
    if (!confirmar) return;

    try {
      setMensaje("");
      setError("");

      const token = getToken();

      if (!token) {
        window.location.href = "/login";
        return;
      }

      const res = await fetch(`${apiUrl}/admin/afiliacion/${id}/aprobar`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "No se pudo aprobar la solicitud.");
      }

      setMensaje("Afiliación aprobada correctamente.");
      cargarSolicitudes();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Error al aprobar la solicitud.");
      }
    }
  };

  const rechazar = async (id: number) => {
    const motivo = prompt("Ingrese el motivo del rechazo:");
    if (!motivo) return;

    try {
      setMensaje("");
      setError("");

      const token = getToken();

      if (!token) {
        window.location.href = "/login";
        return;
      }

      const formData = new FormData();
      formData.append("observacion_admin", motivo);

      const res = await fetch(`${apiUrl}/admin/afiliacion/${id}/rechazar`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "No se pudo rechazar la solicitud.");
      }

      setMensaje("Afiliación rechazada correctamente.");
      cargarSolicitudes();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Error al rechazar la solicitud.");
      }
    }
  };

  const obtenerArchivo = (archivos: Archivo[] = [], tipo: string) => {
    return archivos.find((archivo) => archivo.tipo_archivo === tipo);
  };

  useEffect(() => {
    const token = getToken();

    if (!token) {
      window.location.href = "/login";
      return;
    }

    cargarSolicitudes();
  }, []);

  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <div className={styles.header}>
          <div>
            <h1>Solicitudes de afiliación</h1>
            <p>Revisión y aprobación de nuevos afiliados</p>
          </div>

          <button onClick={cargarSolicitudes} className={styles.refresh}>
            Actualizar
          </button>
        </div>

        {mensaje && <div className={styles.success}>{mensaje}</div>}
        {error && <div className={styles.error}>{error}</div>}

        {loading ? (
          <p className={styles.loading}>Cargando solicitudes...</p>
        ) : solicitudes.length === 0 ? (
          <p className={styles.empty}>No hay solicitudes pendientes.</p>
        ) : (
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Solicitante</th>
                  <th>Documento</th>
                  <th>Correo</th>
                  <th>Estado</th>
                  <th>Documentos</th>
                  <th>Acciones</th>
                </tr>
              </thead>

              <tbody>
                {solicitudes.map((solicitud) => {
                  const formato = obtenerArchivo(
                    solicitud.archivos,
                    "FORMATO_AFILIACION",
                  );
                  const diploma = obtenerArchivo(solicitud.archivos, "DIPLOMA");
                  const recibo = obtenerArchivo(
                    solicitud.archivos,
                    "RECIBO_PAGO",
                  );
                  const cedula = obtenerArchivo(solicitud.archivos, "CEDULA");
                  const foto = obtenerArchivo(solicitud.archivos, "FOTO");

                  return (
                    <tr key={solicitud.id}>
                      <td>
                        <strong>
                          {solicitud.usuario?.nombres}{" "}
                          {solicitud.usuario?.apellidos}
                        </strong>
                        <span>{solicitud.fecha_solicitud}</span>
                      </td>

                      <td>{solicitud.usuario?.numero_documento}</td>

                      <td>{solicitud.usuario?.correo}</td>

                      <td>
                        <span className={styles.badge}>{solicitud.estado}</span>
                      </td>

                      <td>
                        <div className={styles.docs}>
                          {formato && (
                            <a
                              href={formato.url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Formato firmado
                            </a>
                          )}

                          {diploma && (
                            <a
                              href={diploma.url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Diploma
                            </a>
                          )}

                          {recibo && (
                            <a
                              href={recibo.url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Recibo
                            </a>
                          )}

                          {cedula && (
                            <a
                              href={cedula.url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Cédula
                            </a>
                          )}

                          {foto && (
                            <a
                              href={foto.url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Foto
                            </a>
                          )}
                        </div>
                      </td>

                      <td>
                        <div className={styles.actions}>
                          <button
                            className={styles.approve}
                            onClick={() => aprobar(solicitud.id)}
                          >
                            Aprobar
                          </button>

                          <button
                            className={styles.reject}
                            onClick={() => rechazar(solicitud.id)}
                          >
                            Rechazar
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}
