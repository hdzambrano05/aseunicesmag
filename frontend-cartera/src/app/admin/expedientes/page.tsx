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
    <div className="min-h-screen bg-[#F6F9FC] px-6 py-8 text-[#07122F]">
      <div className="mx-auto max-w-7xl space-y-6">
        <section className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-bold text-[#21409A]">
                Gestión documental
              </p>
              <h1 className="mt-2 text-3xl font-black tracking-tight">
                Expedientes
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                Consulta y administra los documentos cargados por los asociados.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 px-6 py-4">
              <p className="text-sm font-semibold text-slate-500">
                Asociados activos
              </p>
              <p className="mt-1 text-3xl font-black text-[#21409A]">
                {asociados.length}
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="relative">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />

            <input
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Buscar por nombre, documento o correo..."
              className="h-12 w-full rounded-full border border-slate-200 bg-slate-50 pl-12 pr-4 text-sm font-medium outline-none transition focus:border-[#21409A] focus:bg-white focus:ring-4 focus:ring-blue-100"
            />
          </div>
        </section>

        {cargando ? (
          <section className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
            <p className="text-sm font-semibold text-slate-500">
              Cargando expedientes...
            </p>
          </section>
        ) : (
          <section className="space-y-4">
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
                    className="flex w-full flex-col gap-4 p-5 text-left transition hover:bg-slate-50 md:flex-row md:items-center md:justify-between"
                  >
                    <div>
                      <h2 className="text-base font-black text-[#07122F]">
                        {nombreCompleto || "Sin nombre registrado"}
                      </h2>

                      <p className="mt-1 text-sm font-medium text-slate-500">
                        CC{" "}
                        {asociado.usuario?.numero_documento ?? "Sin documento"}{" "}
                        · {asociado.usuario?.correo ?? "Sin correo"}
                      </p>

                      <p className="mt-1 text-xs font-semibold text-slate-400">
                        Código: {asociado.codigo_asociado ?? "Sin código"}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-[#21409A]">
                        {asociado.estado_membresia ?? "Sin estado"}
                      </span>

                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-600">
                        {totalDocumentos} documentos
                      </span>

                      <ChevronDown
                        size={20}
                        className={`text-slate-500 transition ${
                          estaAbierto ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                  </button>

                  {estaAbierto && (
                    <div className="border-t border-slate-100 bg-slate-50 p-5">
                      {totalDocumentos === 0 ? (
                        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
                          <FileText
                            size={34}
                            className="mx-auto text-slate-300"
                          />
                          <p className="mt-2 text-sm font-semibold text-slate-500">
                            Este asociado no tiene documentos cargados.
                          </p>
                        </div>
                      ) : (
                        <div className="grid gap-4 md:grid-cols-2">
                          {asociado.archivos?.map((doc) => (
                            <div
                              key={`${doc.modulo}-${doc.id}`}
                              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                            >
                              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                                <div>
                                  <h3 className="font-black text-[#07122F]">
                                    {doc.nombre_original}
                                  </h3>

                                  <p className="mt-1 text-xs font-semibold text-slate-400">
                                    {doc.extension?.toUpperCase() ?? "ARCHIVO"}{" "}
                                    · {doc.tipo_archivo ?? "Documento"}
                                  </p>

                                  <p className="mt-1 text-xs font-semibold text-slate-400">
                                    Subido el {doc.fecha_subida ?? "Sin fecha"}
                                  </p>

                                  {doc.estado && (
                                    <p className="mt-1 text-xs font-black text-[#21409A]">
                                      Estado: {doc.estado}
                                    </p>
                                  )}
                                </div>

                                <span className="w-fit rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-[#21409A]">
                                  Archivo
                                </span>
                              </div>

                              <div className="mt-5 flex gap-2">
                                <button
                                  type="button"
                                  onClick={() =>
                                    verArchivo(
                                      doc.url_descarga,
                                      doc.nombre_original,
                                    )
                                  }
                                  className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#07122F] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#21409A]"
                                >
                                  <Eye size={16} />
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
                                  className="flex flex-1 items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
                                >
                                  <Download size={16} />
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
                <FolderOpen className="mx-auto text-slate-300" size={44} />
                <h3 className="mt-3 font-black text-slate-700">
                  No se encontraron expedientes
                </h3>
                <p className="text-sm font-medium text-slate-400">
                  Intenta buscar con otro nombre, documento o correo.
                </p>
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
}
