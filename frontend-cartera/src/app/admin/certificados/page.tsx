"use client";

import { useEffect, useState } from "react";
import { FileBadge, Search, Download, Loader2 } from "lucide-react";
import {
  AsociadoCertificado,
  buscarAsociadosCertificado,
  generarEstadoCuentaPdf,
} from "@/services/certificadoService";

export default function CertificadosPage() {
  const [busqueda, setBusqueda] = useState("");
  const [asociados, setAsociados] = useState<AsociadoCertificado[]>([]);
  const [cargando, setCargando] = useState(false);
  const [generandoId, setGenerandoId] = useState<number | null>(null);

  const buscarAsociados = async () => {
    try {
      setCargando(true);

      const data = await buscarAsociadosCertificado(busqueda);
      setAsociados(data);
    } catch (error) {
      console.error("Error buscando asociados:", error);
      setAsociados([]);
    } finally {
      setCargando(false);
    }
  };

  const generarCertificado = async (asociadoId: number) => {
    try {
      setGenerandoId(asociadoId);

      const blob = await generarEstadoCuentaPdf(asociadoId);
      const url = window.URL.createObjectURL(blob);

      window.open(url, "_blank");

      setTimeout(() => {
        window.URL.revokeObjectURL(url);
      }, 10000);
    } catch (error) {
      console.error("Error generando certificado:", error);
      alert("No se pudo generar el certificado.");
    } finally {
      setGenerandoId(null);
    }
  };

  useEffect(() => {
    buscarAsociados();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg">
              <FileBadge size={28} />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Certificados
              </h1>
              <p className="text-sm text-slate-500">
                Busca un asociado y genera su estado de cuenta en PDF.
              </p>
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <div className="relative flex-1">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />

              <input
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") buscarAsociados();
                }}
                placeholder="Buscar por nombre, cédula o correo..."
                className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm outline-none focus:border-blue-500 focus:bg-white"
              />
            </div>

            <button
              onClick={buscarAsociados}
              disabled={cargando}
              className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-6 text-sm font-bold text-white shadow-md hover:bg-blue-700 disabled:opacity-60"
            >
              {cargando && <Loader2 size={16} className="animate-spin" />}
              Buscar
            </button>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          {cargando ? (
            <p className="text-sm text-slate-500">Cargando asociados...</p>
          ) : asociados.length === 0 ? (
            <p className="text-sm text-slate-500">
              No se encontraron asociados.
            </p>
          ) : (
            <div className="overflow-hidden rounded-2xl border border-slate-200">
              <table className="w-full text-sm">
                <thead className="bg-slate-100 text-slate-600">
                  <tr>
                    <th className="px-4 py-3 text-left">Asociado</th>
                    <th className="px-4 py-3 text-left">Documento</th>
                    <th className="px-4 py-3 text-left">Correo</th>
                    <th className="px-4 py-3 text-left">Estado</th>
                    <th className="px-4 py-3 text-right">Acción</th>
                  </tr>
                </thead>

                <tbody>
                  {asociados.map((item) => (
                    <tr
                      key={item.id}
                      className="border-t border-slate-200 hover:bg-slate-50"
                    >
                      <td className="px-4 py-3 font-semibold text-slate-800">
                        {item.usuario?.nombres} {item.usuario?.apellidos}
                      </td>

                      <td className="px-4 py-3 text-slate-600">
                        {item.usuario?.numero_documento ?? "Sin documento"}
                      </td>

                      <td className="px-4 py-3 text-slate-600">
                        {item.usuario?.correo ?? "Sin correo"}
                      </td>

                      <td className="px-4 py-3">
                        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                          {item.estado_membresia ?? "Sin estado"}
                        </span>
                      </td>

                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() => generarCertificado(item.id)}
                          disabled={generandoId === item.id}
                          className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-blue-700 disabled:opacity-60"
                        >
                          {generandoId === item.id ? (
                            <Loader2 size={15} className="animate-spin" />
                          ) : (
                            <Download size={15} />
                          )}
                          {generandoId === item.id
                            ? "Generando..."
                            : "Generar PDF"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
