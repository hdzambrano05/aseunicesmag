"use client";

import { useEffect, useState } from "react";
import {
  FileBadge,
  Search,
  Download,
  Loader2,
  FileSpreadsheet,
  Users,
  CheckCircle2,
  RefreshCw,
} from "lucide-react";

import {
  AsociadoCertificado,
  buscarAsociadosCertificado,
  generarEstadoCuentaPdf,
} from "@/services/certificadoService";

import { descargarExcelCarteraAprobados } from "@/services/reporteCarteraService";

export default function CertificadosPage() {
  const [busqueda, setBusqueda] = useState("");
  const [asociados, setAsociados] = useState<AsociadoCertificado[]>([]);
  const [cargando, setCargando] = useState(false);
  const [generandoId, setGenerandoId] = useState<number | null>(null);
  const [descargandoExcel, setDescargandoExcel] = useState(false);

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

  const descargarExcel = async () => {
    try {
      setDescargandoExcel(true);
      await descargarExcelCarteraAprobados(2026);
    } catch (error) {
      console.error("Error descargando Excel:", error);
      alert("No se pudo descargar el Excel.");
    } finally {
      setDescargandoExcel(false);
    }
  };

  useEffect(() => {
    buscarAsociados();
  }, []);

return (
  <div className="min-h-screen bg-[#F6F9FC] px-6 py-8 text-[#07122F]">
    <div className="mx-auto max-w-7xl space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-bold text-[#21409A]">
              Gestión documental
            </p>
            <h1 className="mt-2 text-3xl font-black tracking-tight md:text-4xl">
              Certificados de asociados
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Consulta asociados activos, genera estados de cuenta en PDF y
              descarga la base de cartera.
            </p>
          </div>

          <button
            onClick={descargarExcel}
            disabled={descargandoExcel}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#21409A] px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#183483] disabled:opacity-60"
          >
            {descargandoExcel ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <FileSpreadsheet size={18} />
            )}
            {descargandoExcel ? "Descargando..." : "Descargar Excel"}
          </button>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-semibold text-slate-500">
            Asociados activos
          </p>
          <h2 className="mt-2 text-3xl font-black text-[#21409A]">
            {asociados.length}
          </h2>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-semibold text-slate-500">Estado</p>
          <h2 className="mt-2 text-2xl font-black text-emerald-600">
            ACTIVO
          </h2>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-semibold text-slate-500">Documento</p>
          <h2 className="mt-2 text-2xl font-black text-[#07122F]">PDF</h2>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row">
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
              className="h-12 w-full rounded-full border border-slate-200 bg-slate-50 pl-12 pr-4 text-sm font-medium outline-none transition focus:border-[#21409A] focus:bg-white focus:ring-4 focus:ring-blue-100"
            />
          </div>

          <button
            onClick={buscarAsociados}
            disabled={cargando}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#07122F] px-7 text-sm font-bold text-white transition hover:bg-[#21409A] disabled:opacity-60"
          >
            {cargando ? <Loader2 size={18} className="animate-spin" /> : null}
            Buscar
          </button>
        </div>
      </section>

      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <div>
            <h2 className="text-lg font-black">Resultados</h2>
            <p className="text-sm text-slate-500">
              Solo se muestran asociados activos.
            </p>
          </div>
        </div>

        {cargando ? (
          <div className="flex items-center justify-center gap-3 p-10 text-sm font-semibold text-slate-500">
            <Loader2 className="animate-spin" size={22} />
            Cargando asociados...
          </div>
        ) : asociados.length === 0 ? (
          <div className="p-10 text-center">
            <p className="text-sm font-semibold text-slate-500">
              No se encontraron asociados.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-sm">
              <thead>
                <tr className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
                  <th className="px-6 py-4 font-black">Asociado</th>
                  <th className="px-6 py-4 font-black">Documento</th>
                  <th className="px-6 py-4 font-black">Correo</th>
                  <th className="px-6 py-4 font-black">Estado</th>
                  <th className="px-6 py-4 text-right font-black">Acción</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {asociados.map((item) => (
                  <tr key={item.id} className="transition hover:bg-slate-50">
                    <td className="px-6 py-4">
                      <p className="font-black text-[#07122F]">
                        {item.usuario?.nombres} {item.usuario?.apellidos}
                      </p>
                      <p className="text-xs font-semibold text-slate-400">
                        Código: {item.codigo_asociado ?? "Sin código"}
                      </p>
                    </td>

                    <td className="px-6 py-4 font-semibold text-slate-600">
                      {item.usuario?.numero_documento ?? "Sin documento"}
                    </td>

                    <td className="px-6 py-4 text-slate-600">
                      {item.usuario?.correo ?? "Sin correo"}
                    </td>

                    <td className="px-6 py-4">
                      <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-[#21409A]">
                        {item.estado_membresia ?? "Sin estado"}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => generarCertificado(item.id)}
                        disabled={generandoId === item.id}
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-[#07122F] px-5 py-2.5 text-xs font-bold text-white transition hover:bg-[#21409A] disabled:opacity-60"
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
      </section>
    </div>
  </div>
);
}
