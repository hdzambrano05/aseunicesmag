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
  { tipo: "DIPLOMA", label: "Ver Diploma", icon: Eye },
  { tipo: "RECIBO_PAGO", label: "Ver Recibo", icon: FileText },
  { tipo: "CEDULA", label: "Ver Cédula", icon: FileText },
  { tipo: "FOTO", label: "Ver Foto", icon: Eye },
  { tipo: "FORMATO_AFILIACION", label: "Ver Formato", icon: FileText },
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
        throw new Error(data.message || "No se pudieron cargar las solicitudes.");
      }

      setSolicitudes(data.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al cargar solicitudes.");
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
      setError(err instanceof Error ? err.message : "Error al aprobar la solicitud.");
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
      setError(err instanceof Error ? err.message : "Error al rechazar la solicitud.");
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
    <main className="min-h-screen bg-slate-50 px-6 py-8">
      <section className="mx-auto max-w-7xl">
        <div className="mb-7 flex flex-col justify-between gap-4 rounded-3xl border border-slate-200 bg-white px-6 py-6 shadow-sm md:flex-row md:items-center">
          <div>
            <span className="mb-2 inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-blue-700">
              Panel administrativo
            </span>

            <h1 className="text-2xl font-black tracking-tight text-slate-900 md:text-3xl">
              Verificación de Nuevos Afiliados
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Revisa los documentos, aprueba solicitudes o solicita correcciones
              a cada afiliado.
            </p>
          </div>

          <button
            type="button"
            onClick={cargarSolicitudes}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4" />
            )}
            Actualizar
          </button>
        </div>

        {mensaje && (
          <div className="mb-5 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm font-semibold text-emerald-700">
            {mensaje}
          </div>
        )}

        {error && (
          <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-semibold text-red-700">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex min-h-[280px] items-center justify-center rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="flex flex-col items-center gap-3 text-slate-500">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
              <p className="text-sm font-bold">Cargando solicitudes...</p>
            </div>
          </div>
        ) : solicitudes.length === 0 ? (
          <div className="flex min-h-[280px] items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white shadow-sm">
            <div className="flex flex-col items-center gap-3 text-center">
              <div className="rounded-full bg-slate-100 p-4">
                <Inbox className="h-8 w-8 text-slate-400" />
              </div>
              <h2 className="text-lg font-black text-slate-800">
                No hay solicitudes pendientes
              </h2>
              <p className="max-w-md text-sm text-slate-500">
                Cuando un usuario complete su proceso de afiliación aparecerá en
                esta sección.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {solicitudes.map((solicitud) => (
              <article
                key={solicitud.id}
                className="group rounded-3xl border border-blue-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-xl"
              >
                <div className="grid gap-5 lg:grid-cols-[1fr_auto_auto] lg:items-center">
                  <div>
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <h3 className="text-base font-black text-blue-700">
                        {solicitud.usuario?.nombres}{" "}
                        {solicitud.usuario?.apellidos}
                      </h3>

                      <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-black text-amber-700 ring-1 ring-amber-200">
                        {solicitud.estado}
                      </span>
                    </div>

                    <p className="text-sm font-semibold text-slate-500">
                      CC {solicitud.usuario?.numero_documento} ·{" "}
                      {solicitud.usuario?.correo}
                    </p>

                    <p className="mt-1 text-xs font-medium text-slate-400">
                      Fecha de solicitud:{" "}
                      {formatearFecha(solicitud.fecha_solicitud)}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {TIPOS_DOCUMENTOS.map((doc) => {
                      const archivo = obtenerArchivo(
                        solicitud.archivos,
                        doc.tipo,
                      );

                      if (!archivo) return null;

                      const Icon = doc.icon;

                      return (
                        <a
                          key={doc.tipo}
                          href={archivo.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-xl border border-blue-200 bg-white px-3 py-2 text-xs font-bold text-blue-700 transition hover:border-blue-600 hover:bg-blue-50"
                        >
                          <Icon className="h-4 w-4" />
                          {doc.label}
                        </a>
                      );
                    })}
                  </div>

                  <div className="flex flex-wrap gap-2 lg:justify-end">
                    <button
                      type="button"
                      onClick={() => aprobar(solicitud.id)}
                      disabled={procesandoId === solicitud.id}
                      className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-black text-white shadow-md shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {procesandoId === solicitud.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Check className="h-4 w-4" />
                      )}
                      Aceptar
                    </button>

                    <button
                      type="button"
                      onClick={() => rechazar(solicitud.id)}
                      disabled={procesandoId === solicitud.id}
                      className="inline-flex items-center gap-2 rounded-xl border border-blue-200 bg-white px-4 py-2.5 text-sm font-black text-blue-700 transition hover:border-red-300 hover:bg-red-50 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <X className="h-4 w-4" />
                      Rechazar
                    </button>
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