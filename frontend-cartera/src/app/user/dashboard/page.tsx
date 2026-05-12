"use client";

import { useEffect, useState } from "react";
import { obtenerEstadoPagoAsociado } from "@/services/obligacionesService";

export default function DashboardAsociado() {
  const [estadoPago, setEstadoPago] = useState<any>(null);

  useEffect(() => {
    const usuarioStorage = localStorage.getItem("usuario");

    if (!usuarioStorage) return;

    const usuario = JSON.parse(usuarioStorage);

    const asociadoId = usuario?.asociado?.id;

    if (!asociadoId) return;

    obtenerEstadoPagoAsociado(asociadoId)
      .then((data) => {
        setEstadoPago(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="p-6">
      {estadoPago?.tiene_deuda && (
        <div className="mb-6 rounded-2xl border border-red-300 bg-red-50 p-5 shadow-sm">
          <h2 className="text-lg font-bold text-red-700">
            Tienes cuotas pendientes por pagar
          </h2>

          <p className="mt-2 text-sm text-red-600">
            Debes realizar el pago de tu cuota de sostenimiento para mantener tu
            membresía activa.
          </p>

          <p className="mt-4 text-xl font-extrabold text-red-700">
            ${Number(estadoPago.total_pendiente).toLocaleString("es-CO")}
          </p>
        </div>
      )}

      <h1 className="text-2xl font-bold">Dashboard Asociado</h1>
    </div>
  );
}
