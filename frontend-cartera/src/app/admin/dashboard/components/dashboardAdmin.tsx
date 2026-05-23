"use client";

import { useEffect, useState } from "react";
import {
  Check,
  X,
  Eye,
  FileText,
  RefreshCw,
  Loader2,
  Inbox,
} from "lucide-react";

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

const TIPOS_DOCUMENTOS = [
  { tipo: "COPIA_CEDULA", label: "Ver Cédula", icon: FileText },
  { tipo: "DIPLOMA", label: "Ver Diploma", icon: Eye },
  { tipo: "FOTO_DIGITAL", label: "Ver Foto", icon: Eye },
  {
    tipo: "FORMULARIO_AFILIACION",
    label: "Ver Formulario",
    icon: FileText,
  },
];

export default function DashboardAdmin() {
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);
  const [loading, setLoading] = useState(true);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const [procesandoId, setProcesandoId] = useState<number | null>(null);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const getToken = () => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("token");
  };

  const redirigirLogin = () => {
    window.location.href = "/login";
  };

  const cargarSolicitudes = async () => {
    try {
      setLoading(true);
      setError("");

      const token = getToken();

      if (!token) {
        redirigirLogin();
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
      setError(
        err instanceof Error ? err.message : "Error al cargar solicitudes.",
      );
    } finally {
      setLoading(false);
    }
  };

  const aprobar = async (id: number) => {
    if (!confirm("¿Seguro que deseas aprobar esta afiliación?")) return;

    try {
      setMensaje("");
      setError("");
      setProcesandoId(id);

      const token = getToken();

      if (!token) {
        redirigirLogin();
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
      await cargarSolicitudes();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error al aprobar la solicitud.",
      );
    } finally {
      setProcesandoId(null);
    }
  };

  const rechazar = async (id: number) => {
    const motivo = prompt("Ingrese el motivo del rechazo:");
    if (!motivo?.trim()) return;

    try {
      setMensaje("");
      setError("");
      setProcesandoId(id);

      const token = getToken();

      if (!token) {
        redirigirLogin();
        return;
      }

      const formData = new FormData();
      formData.append("observacion_admin", motivo.trim());

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
      await cargarSolicitudes();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error al rechazar la solicitud.",
      );
    } finally {
      setProcesandoId(null);
    }
  };

  const obtenerArchivo = (archivos: Archivo[] = [], tipo: string) => {
    return archivos.find((archivo) => archivo.tipo_archivo === tipo);
  };

  const formatearFecha = (fecha: string) => {
    if (!fecha) return "Sin fecha";

    return new Date(fecha).toLocaleDateString("es-CO", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  useEffect(() => {
    const token = getToken();

    if (!token) {
      redirigirLogin();
      return;
    }

    cargarSolicitudes();
  }, []);

  return (
    <main className="min-h-screen bg-[#F6F9FC] px-6 py-8 text-[#07122F]">
      <section className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-bold text-[#21409A]">
                Panel administrativo
              </p>

              <h1 className="mt-2 text-3xl font-black tracking-tight">
                Verificación de afiliaciones
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                Administra las solicitudes de afiliación, revisa documentos y
                aprueba nuevos asociados.
              </p>
            </div>

            <button
              type="button"
              onClick={cargarSolicitudes}
              disabled={loading}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#21409A] px-6 text-sm font-bold text-white shadow-sm transition hover:bg-[#183483] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4" />
              )}
              Actualizar
            </button>
          </div>
        </div>

        {/* Mensajes */}
        {mensaje && (
          <div className="rounded-3xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm font-bold text-emerald-700">
            {mensaje}
          </div>
        )}

        {error && (
          <div className="rounded-3xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-bold text-red-700">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex min-h-[300px] items-center justify-center rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="h-8 w-8 animate-spin text-[#21409A]" />
              <p className="text-sm font-bold text-slate-500">
                Cargando solicitudes...
              </p>
            </div>
          </div>
        ) : solicitudes.length === 0 ? (
          <div className="flex min-h-[320px] items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white shadow-sm">
            <div className="flex max-w-md flex-col items-center text-center">
              <div className="rounded-3xl bg-slate-100 p-4">
                <Inbox className="h-8 w-8 text-slate-400" />
              </div>

              <h2 className="mt-5 text-xl font-black text-slate-800">
                No hay solicitudes pendientes
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Cuando un usuario complete el formulario de afiliación aparecerá
                automáticamente en esta sección.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {solicitudes.map((solicitud) => (
              <article
                key={solicitud.id}
                className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:border-slate-300"
              >
                {/* Encabezado solicitud */}
                <div className="border-b border-slate-100 bg-white px-5 py-5 sm:px-6">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="text-lg font-black text-[#07122F]">
                          {solicitud.usuario?.nombres}{" "}
                          {solicitud.usuario?.apellidos}
                        </h2>

                        <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-black text-amber-700">
                          {solicitud.estado}
                        </span>
                      </div>

                      <p className="mt-2 text-sm font-semibold text-slate-500">
                        Documento: {solicitud.usuario?.numero_documento}
                      </p>

                      <p className="mt-1 text-sm text-slate-500">
                        {solicitud.usuario?.correo}
                      </p>

                      {solicitud.usuario?.telefono && (
                        <p className="mt-1 text-sm text-slate-500">
                          Teléfono: {solicitud.usuario.telefono}
                        </p>
                      )}

                      <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                        Fecha solicitud:{" "}
                        {formatearFecha(solicitud.fecha_solicitud)}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => aprobar(solicitud.id)}
                        disabled={procesandoId === solicitud.id}
                        className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#21409A] px-5 text-sm font-bold text-white transition hover:bg-[#183483] disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {procesandoId === solicitud.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Check className="h-4 w-4" />
                        )}
                        Aprobar
                      </button>

                      <button
                        type="button"
                        onClick={() => rechazar(solicitud.id)}
                        disabled={procesandoId === solicitud.id}
                        className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-5 text-sm font-bold text-slate-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        <X className="h-4 w-4" />
                        Rechazar
                      </button>
                    </div>
                  </div>
                </div>

                {/* Detalle */}
                <div className="grid gap-5 p-5 sm:p-6 lg:grid-cols-[1fr_340px]">
                  <div>
                    <h3 className="text-sm font-black uppercase tracking-[0.16em] text-slate-400">
                      Información del afiliado
                    </h3>

                    <div className="mt-4 overflow-hidden rounded-3xl border border-slate-200 bg-white">
                      <div className="grid border-b border-slate-100 px-5 py-4 sm:grid-cols-2">
                        <div>
                          <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                            Nombres
                          </p>
                          <p className="mt-1 text-sm font-bold text-[#07122F]">
                            {solicitud.usuario?.nombres}
                          </p>
                        </div>

                        <div className="mt-4 sm:mt-0">
                          <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                            Apellidos
                          </p>
                          <p className="mt-1 text-sm font-bold text-[#07122F]">
                            {solicitud.usuario?.apellidos}
                          </p>
                        </div>
                      </div>

                      <div className="grid border-b border-slate-100 px-5 py-4 sm:grid-cols-2">
                        <div>
                          <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                            Documento
                          </p>
                          <p className="mt-1 text-sm font-bold text-[#07122F]">
                            {solicitud.usuario?.numero_documento}
                          </p>
                        </div>

                        <div className="mt-4 sm:mt-0">
                          <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                            Correo electrónico
                          </p>
                          <p className="mt-1 break-all text-sm font-semibold text-slate-700">
                            {solicitud.usuario?.correo}
                          </p>
                        </div>
                      </div>

                      <div className="grid px-5 py-4 sm:grid-cols-2">
                        <div>
                          <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                            Teléfono
                          </p>
                          <p className="mt-1 text-sm font-semibold text-slate-700">
                            {solicitud.usuario?.telefono || "No registra"}
                          </p>
                        </div>

                        <div className="mt-4 sm:mt-0">
                          <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                            Estado membresía
                          </p>
                          <p className="mt-1 text-sm font-bold text-[#07122F]">
                            {solicitud.asociado?.estado_membresia ||
                              "Pendiente"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-black uppercase tracking-[0.16em] text-slate-400">
                      Documentos adjuntos
                    </h3>

                    <div className="mt-4 space-y-3">
                      {TIPOS_DOCUMENTOS.map((doc) => {
                        const archivo = obtenerArchivo(
                          solicitud.archivos,
                          doc.tipo,
                        );

                        const Icon = doc.icon;

                        return (
                          <div
                            key={doc.tipo}
                            className="flex items-center justify-between rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4"
                          >
                            <div className="flex items-center gap-3">
                              <div className="rounded-2xl bg-white p-2 shadow-sm">
                                <Icon className="h-5 w-5 text-[#21409A]" />
                              </div>

                              <div>
                                <p className="text-sm font-black text-[#07122F]">
                                  {doc.label.replace("Ver ", "")}
                                </p>

                                <p className="text-xs text-slate-500">
                                  {archivo ? "Documento cargado" : "Pendiente"}
                                </p>
                              </div>
                            </div>

                            {archivo ? (
                              <a
                                href={archivo.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-full bg-[#07122F] px-4 py-2 text-xs font-bold text-white transition hover:bg-[#21409A]"
                              >
                                Ver
                              </a>
                            ) : (
                              <span className="rounded-full bg-red-50 px-3 py-2 text-xs font-bold text-red-700">
                                No cargado
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
