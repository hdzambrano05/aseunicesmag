"use client";

import { useEffect, useMemo, useState } from "react";
import {
  BadgeCheck,
  ChevronDown,
  Download,
  Eye,
  FileText,
  FolderOpen,
  Search,
  User,
} from "lucide-react";
import {
  AsociadoExpediente,
  descargarArchivoExpediente,
  listarExpedientes,
} from "@/services/expedienteService";



export default function ExpedientePage() {
  const [asociados, setAsociados] = useState<AsociadoExpediente[]>([]);
  const [busqueda, setBusqueda] = useState("");
  const [abierto, setAbierto] = useState<number | null>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    cargarExpedientes();
  }, []);

  const cargarExpedientes = async () => {
    try {
      setCargando(true);
      const res = await listarExpedientes();
      setAsociados(res.data ?? []);
    } catch (error) {
      console.error("Error cargando expedientes:", error);
      setAsociados([]);
    } finally {
      setCargando(false);
    }
  };

  const verArchivo = async (url: string, nombre: string) => {
    try {
      await descargarArchivoExpediente(url, nombre, true);
    } catch (error) {
      console.error(error);
      alert("No se pudo abrir el archivo.");
    }
  };

  const descargarArchivo = async (url: string, nombre: string) => {
    try {
      await descargarArchivoExpediente(url, nombre, false);
    } catch (error) {
      console.error(error);
      alert("No se pudo descargar el archivo.");
    }
  };

  const asociadosFiltrados = useMemo(() => {
    return asociados.filter((a) => {
      const texto = `
        ${a.usuario?.nombres ?? ""}
        ${a.usuario?.apellidos ?? ""}
        ${a.usuario?.correo ?? ""}
        ${a.usuario?.numero_documento ?? ""}
        ${a.codigo_asociado ?? ""}
      `.toLowerCase();

      return texto.includes(busqueda.toLowerCase());
    });
  }, [asociados, busqueda]);

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-200">
                <FolderOpen size={24} />
              </div>

              <div>
                <h1 className="text-2xl font-black text-slate-900">
                  Expedientes
                </h1>
                <p className="text-sm font-medium text-slate-500">
                  Control documental de los asociados.
                </p>
              </div>
            </div>

            <div className="rounded-2xl bg-blue-50 px-4 py-3 text-right">
              <p className="text-xs font-bold uppercase tracking-widest text-blue-500">
                Asociados
              </p>
              <p className="text-2xl font-black text-blue-700">
                {asociados.length}
              </p>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
            <Search size={20} className="text-slate-400" />
            <input
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Buscar por nombre, documento o correo..."
              className="w-full bg-transparent text-sm font-medium text-slate-700 outline-none placeholder:text-slate-400"
            />
          </div>
        </div>

        {cargando ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <p className="font-bold text-slate-600">Cargando expedientes...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {asociadosFiltrados.map((asociado) => {
              const estaAbierto = abierto === asociado.id;
              const nombreCompleto = `${asociado.usuario?.nombres ?? ""} ${
                asociado.usuario?.apellidos ?? ""
              }`.trim();

              const totalDocumentos = asociado.archivos?.length ?? 0;

              return (
                <div
                  key={asociado.id}
                  className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
                >
                  <button
                    onClick={() => setAbierto(estaAbierto ? null : asociado.id)}
                    className="flex w-full items-center justify-between gap-4 p-5 text-left transition hover:bg-slate-50"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                        <User size={23} />
                      </div>

                      <div>
                        <h2 className="font-black text-slate-900">
                          {nombreCompleto || "Sin nombre registrado"}
                        </h2>

                        <p className="text-sm font-medium text-slate-500">
                          CC{" "}
                          {asociado.usuario?.numero_documento ??
                            "Sin documento"}{" "}
                          · {asociado.usuario?.correo ?? "Sin correo"}
                        </p>

                        <p className="mt-1 text-xs font-bold text-slate-400">
                          Código: {asociado.codigo_asociado ?? "Sin código"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">
                        {asociado.estado_membresia ?? "Sin estado"}
                      </span>

                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-600">
                        {totalDocumentos} documentos
                      </span>

                      <ChevronDown
                        size={22}
                        className={`text-slate-500 transition ${
                          estaAbierto ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                  </button>

                  {estaAbierto && (
                    <div className="border-t border-slate-100 bg-slate-50 p-5">
                      {totalDocumentos === 0 ? (
                        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-center">
                          <FileText
                            size={36}
                            className="mx-auto text-slate-300"
                          />
                          <p className="mt-2 font-bold text-slate-500">
                            Este asociado no tiene documentos cargados.
                          </p>
                        </div>
                      ) : (
                        <div className="grid gap-4 md:grid-cols-2">
                          {asociado.archivos?.map((doc) => (
                            <div
                              key={`${doc.modulo}-${doc.id}`}
                              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                            >
                              <div className="flex items-start justify-between gap-3">
                                <div className="flex items-start gap-3">
                                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                                    <FileText size={22} />
                                  </div>

                                  <div>
                                    <h3 className="font-black text-slate-800">
                                      {doc.nombre_original}
                                    </h3>

                                    <p className="mt-1 text-xs font-semibold text-slate-400">
                                      {doc.extension?.toUpperCase() ??
                                        "ARCHIVO"}{" "}
                                      · {doc.tipo_archivo ?? "Documento"}
                                    </p>

                                    <p className="mt-1 text-xs font-semibold text-slate-400">
                                      Subido el{" "}
                                      {doc.fecha_subida ?? "Sin fecha"}
                                    </p>

                                    {doc.estado && (
                                      <p className="mt-1 text-xs font-black text-blue-600">
                                        Estado: {doc.estado}
                                      </p>
                                    )}
                                  </div>
                                </div>

                                <span className="flex items-center gap-1 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-black text-blue-700">
                                  <BadgeCheck size={14} />
                                  Archivo
                                </span>
                              </div>

                              <div className="mt-4 flex gap-2">
                                <button
                                  type="button"
                                  onClick={() =>
                                    verArchivo(
                                      doc.url_descarga,
                                      doc.nombre_original,
                                    )
                                  }
                                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-3 py-2 text-sm font-bold text-white transition hover:bg-blue-700"
                                >
                                  <Eye size={17} />
                                  Ver
                                </button>

                                <button
                                  type="button"
                                  onClick={() =>
                                    descargarArchivo(
                                      doc.url_descarga,
                                      doc.nombre_original,
                                    )
                                  }
                                  className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-600 transition hover:bg-slate-100"
                                >
                                  <Download size={17} />
                                  Descargar
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}

            {asociadosFiltrados.length === 0 && (
              <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center">
                <FolderOpen className="mx-auto text-slate-300" size={48} />
                <h3 className="mt-3 font-black text-slate-700">
                  No se encontraron expedientes
                </h3>
                <p className="text-sm font-medium text-slate-400">
                  Intenta buscar con otro nombre, documento o correo.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
