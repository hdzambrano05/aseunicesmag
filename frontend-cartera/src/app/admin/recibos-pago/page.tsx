"use client";

import { useEffect, useState } from "react";
import {
  listarRecibosPago,
  aprobarReciboPago,
  rechazarReciboPago,
  descargarArchivoRecibo,
} from "@/services/recibosAdminService";

import { CheckCircle, XCircle, Eye, RefreshCcw } from "lucide-react";

export default function RecibosPagoPage() {
  const [recibos, setRecibos] = useState<any[]>([]);
  const [estado, setEstado] = useState("");
  const [cargando, setCargando] = useState(false);

  const cargarRecibos = async () => {
    try {
      setCargando(true);

      const response = await listarRecibosPago(estado);

      setRecibos(response?.data?.data || response?.data || []);
    } catch (error) {
      console.error(error);
      alert("Error al cargar recibos");
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarRecibos();
  }, [estado]);

  const aprobar = async (id: number) => {
    try {
      const observacion = prompt("Observación del administrador:");

      const response = await aprobarReciboPago(id, observacion || "");

      if (!response?.success) {
        alert(response?.message || "No se pudo aprobar");
        return;
      }

      alert("Recibo aprobado correctamente");

      cargarRecibos();
    } catch (error) {
      console.error(error);
      alert("Error al aprobar recibo");
    }
  };

  const rechazar = async (id: number) => {
    try {
      const observacion = prompt("Motivo del rechazo:");

      if (!observacion) {
        alert("Debes escribir el motivo");
        return;
      }

      const response = await rechazarReciboPago(id, observacion);

      if (!response?.success) {
        alert(response?.message || "No se pudo rechazar");
        return;
      }

      alert("Recibo rechazado correctamente");

      cargarRecibos();
    } catch (error) {
      console.error(error);
      alert("Error al rechazar recibo");
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F9FC] p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <section className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-bold text-[#21409A]">
                Gestión financiera
              </p>

              <h1 className="mt-2 text-3xl font-black tracking-tight text-[#07122F]">
                Recibos de pago
              </h1>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Revisa, aprueba o rechaza los comprobantes cargados por los
                asociados.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <select
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
                className="h-12 rounded-full border border-slate-200 bg-slate-50 px-5 text-sm font-semibold text-slate-700 outline-none transition focus:border-[#21409A] focus:bg-white focus:ring-4 focus:ring-blue-100"
              >
                <option value="">Todos</option>
                <option value="PENDIENTE">Pendientes</option>
                <option value="APROBADO">Aprobados</option>
                <option value="RECHAZADO">Rechazados</option>
              </select>

              <button
                type="button"
                onClick={cargarRecibos}
                className="inline-flex h-12 items-center gap-2 rounded-full bg-[#07122F] px-6 text-sm font-bold text-white transition hover:bg-[#21409A]"
              >
                <RefreshCcw className="h-4 w-4" />
                Actualizar
              </button>
            </div>
          </div>
        </section>

        {/* Tabla */}
        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-6 py-4">
            <h2 className="text-lg font-black text-[#07122F]">
              Listado de recibos
            </h2>

            <p className="text-sm text-slate-500">
              Gestión y validación de comprobantes.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1100px] text-sm">
              <thead>
                <tr className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
                  <th className="px-6 py-4 font-black">Asociado</th>
                  <th className="px-6 py-4 font-black">Obligación</th>
                  <th className="px-6 py-4 font-black">Valor</th>
                  <th className="px-6 py-4 font-black">Fecha pago</th>
                  <th className="px-6 py-4 font-black">Banco</th>
                  <th className="px-6 py-4 font-black">Estado</th>
                  <th className="px-6 py-4 text-right font-black">Acciones</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {cargando ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-6 py-10 text-center text-sm font-semibold text-slate-500"
                    >
                      Cargando recibos...
                    </td>
                  </tr>
                ) : recibos.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-6 py-10 text-center text-sm font-semibold text-slate-500"
                    >
                      No hay recibos registrados.
                    </td>
                  </tr>
                ) : (
                  recibos.map((recibo) => (
                    <tr
                      key={recibo.id}
                      className="transition hover:bg-slate-50"
                    >
                      <td className="px-6 py-5">
                        <div>
                          <p className="font-black text-[#07122F]">
                            {recibo.asociado?.usuario?.nombres}{" "}
                            {recibo.asociado?.usuario?.apellidos}
                          </p>

                          <p className="mt-1 text-xs font-semibold text-slate-400">
                            {recibo.asociado?.usuario?.numero_documento}
                          </p>
                        </div>
                      </td>

                      <td className="px-6 py-5 text-slate-600">
                        {recibo.obligacion?.concepto || "Sin obligación"}
                      </td>

                      <td className="px-6 py-5 font-black text-[#07122F]">
                        $
                        {Number(recibo.valor_reportado || 0).toLocaleString(
                          "es-CO",
                        )}
                      </td>

                      <td className="px-6 py-5 text-slate-600">
                        {recibo.fecha_pago || "No registra"}
                      </td>

                      <td className="px-6 py-5 text-slate-600">
                        {recibo.banco || "No registra"}
                      </td>

                      <td className="px-6 py-5">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-black ${
                            recibo.estado === "APROBADO"
                              ? "bg-emerald-50 text-emerald-700"
                              : recibo.estado === "RECHAZADO"
                                ? "bg-red-50 text-red-700"
                                : "bg-yellow-50 text-yellow-700"
                          }`}
                        >
                          {recibo.estado}
                        </span>
                      </td>

                      <td className="px-6 py-5">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => descargarArchivoRecibo(recibo.id)}
                            className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-50"
                          >
                            Ver
                          </button>

                          {recibo.estado === "PENDIENTE" && (
                            <>
                              <button
                                onClick={() => aprobar(recibo.id)}
                                className="rounded-full bg-emerald-600 px-4 py-2 text-xs font-bold text-white transition hover:bg-emerald-700"
                              >
                                Aprobar
                              </button>

                              <button
                                onClick={() => rechazar(recibo.id)}
                                className="rounded-full bg-red-600 px-4 py-2 text-xs font-bold text-white transition hover:bg-red-700"
                              >
                                Rechazar
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
