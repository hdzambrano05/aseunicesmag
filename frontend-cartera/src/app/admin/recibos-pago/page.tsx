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
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-black text-slate-900">
            Recibos de pago
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Revisa, aprueba o rechaza los comprobantes cargados por los
            asociados.
          </p>
        </div>

        <div className="flex gap-3">
          <select
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
            className="rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-700"
          >
            <option value="">Todos</option>
            <option value="PENDIENTE">Pendientes</option>
            <option value="APROBADO">Aprobados</option>
            <option value="RECHAZADO">Rechazados</option>
          </select>

          <button
            type="button"
            onClick={cargarRecibos}
            className="flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-bold text-white hover:bg-slate-800"
          >
            <RefreshCcw className="h-4 w-4" />
            Actualizar
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-100 text-left text-slate-700">
              <tr>
                <th className="p-4">Asociado</th>
                <th className="p-4">Obligación</th>
                <th className="p-4">Valor</th>
                <th className="p-4">Fecha pago</th>
                <th className="p-4">Banco</th>
                <th className="p-4">Estado</th>
                <th className="p-4 text-right">Acciones</th>
              </tr>
            </thead>

            <tbody>
              {cargando ? (
                <tr>
                  <td colSpan={7} className="p-6 text-center text-slate-500">
                    Cargando recibos...
                  </td>
                </tr>
              ) : recibos.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-6 text-center text-slate-500">
                    No hay recibos registrados.
                  </td>
                </tr>
              ) : (
                recibos.map((recibo) => (
                  <tr key={recibo.id} className="border-t border-slate-100">
                    <td className="p-4">
                      <p className="font-bold text-slate-900">
                        {recibo.asociado?.usuario?.nombres}{" "}
                        {recibo.asociado?.usuario?.apellidos}
                      </p>

                      <p className="text-xs text-slate-500">
                        {recibo.asociado?.usuario?.numero_documento}
                      </p>
                    </td>

                    <td className="p-4 text-slate-600">
                      {recibo.obligacion?.concepto || "Sin obligación"}
                    </td>

                    <td className="p-4 font-black text-slate-900">
                      $
                      {Number(recibo.valor_reportado || 0).toLocaleString(
                        "es-CO",
                      )}
                    </td>

                    <td className="p-4 text-slate-600">
                      {recibo.fecha_pago || "No registra"}
                    </td>

                    <td className="p-4 text-slate-600">
                      {recibo.banco || "No registra"}
                    </td>

                    <td className="p-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-black ${
                          recibo.estado === "APROBADO"
                            ? "bg-green-100 text-green-700"
                            : recibo.estado === "RECHAZADO"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {recibo.estado}
                      </span>
                    </td>

                    <td className="p-4">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => descargarArchivoRecibo(recibo.id)}
                          className="rounded-xl border border-slate-300 p-2 text-slate-600 hover:bg-slate-100"
                        >
                          <Eye className="h-4 w-4" />
                        </button>

                        {recibo.estado === "PENDIENTE" && (
                          <>
                            <button
                              type="button"
                              onClick={() => aprobar(recibo.id)}
                              className="rounded-xl bg-green-600 p-2 text-white hover:bg-green-700"
                            >
                              <CheckCircle className="h-4 w-4" />
                            </button>

                            <button
                              type="button"
                              onClick={() => rechazar(recibo.id)}
                              className="rounded-xl bg-red-600 p-2 text-white hover:bg-red-700"
                            >
                              <XCircle className="h-4 w-4" />
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
      </div>
    </div>
  );
}
