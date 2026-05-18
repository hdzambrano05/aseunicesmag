"use client";

import { useEffect, useMemo, useState } from "react";
import {
  obtenerEstadoPagoAsociado,
  obtenerSmmlvActivo,
  generarSostenimiento,
  anularObligacion,
} from "@/services/obligacionesService";
import {
  subirReciboPago,
  obtenerMisRecibos,
} from "@/services/recibosPagoService";

type Modalidad = "MENSUAL" | "SEMESTRAL" | "ANUAL";

export default function DashboardAsociado() {
  const [asociadoId, setAsociadoId] = useState<number | null>(null);
  const [estadoPago, setEstadoPago] = useState<any>(null);
  const [recibos, setRecibos] = useState<any[]>([]);
  const [smmlv, setSmmlv] = useState<any>(null);

  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [generando, setGenerando] = useState(false);

  const [modalidad, setModalidad] = useState<Modalidad>("MENSUAL");
  const [modalAbierto, setModalAbierto] = useState(false);
  const [obligacionSeleccionada, setObligacionSeleccionada] =
    useState<any>(null);

  const [form, setForm] = useState({
    referencia_pago: "",
    valor_reportado: "",
    fecha_pago: "",
    banco: "",
    observacion_usuario: "",
    archivo: null as File | null,
  });

  const tieneReciboAprobado = recibos.some(
    (recibo: any) => recibo.estado === "APROBADO",
  );

  const tieneReciboPendiente = recibos.some(
    (recibo: any) => recibo.estado === "PENDIENTE",
  );

  const obligacionesPendientes = estadoPago?.obligaciones || [];

  const tieneObligacionesPendientes = obligacionesPendientes.length > 0;

  const hoy = new Date();

  const calculoMembresia = useMemo(() => {
    const valorSmmlv = Number(smmlv?.valor || 0);
    const cuotaMensual = valorSmmlv * 0.01;

    let meses = 1;
    let porcentajeDescuento = 0;

    if (modalidad === "SEMESTRAL") {
      meses = 6;

      if (hoy.getDate() <= 8 && [0, 6].includes(hoy.getMonth())) {
        porcentajeDescuento = 5;
      }
    }

    if (modalidad === "ANUAL") {
      meses = 12;

      if (hoy.getMonth() === 0 && hoy.getDate() <= 8) {
        porcentajeDescuento = 10;
      }
    }

    const subtotal = cuotaMensual * meses;
    const descuento = subtotal * (porcentajeDescuento / 100);
    const total = subtotal - descuento;

    return {
      cuotaMensual,
      meses,
      subtotal,
      porcentajeDescuento,
      descuento,
      total,
    };
  }, [smmlv, modalidad]);

  const cargarDatos = async () => {
    try {
      setCargando(true);

      const usuarioStorage = localStorage.getItem("usuario");
      if (!usuarioStorage) return;

      const usuario = JSON.parse(usuarioStorage);
      const id = usuario?.asociado?.id;

      if (!id) return;

      setAsociadoId(id);

      const estado = await obtenerEstadoPagoAsociado(id);
      setEstadoPago(estado);

      const recibosData = await obtenerMisRecibos();
      setRecibos(recibosData?.data || []);

      const smmlvData = await obtenerSmmlvActivo();
      setSmmlv(smmlvData?.data || null);
    } catch (error) {
      console.error(error);
      alert("Error al cargar información");
    } finally {
      setCargando(false);
    }
  };

  const anular = async (id: number) => {
    if (!confirm("¿Seguro que deseas anular esta obligación?")) return;

    try {
      const response = await anularObligacion(id);

      if (!response?.success) {
        alert(response?.message || "No se pudo anular");
        return;
      }

      alert("Obligación anulada correctamente");
      await cargarDatos();
    } catch (error: any) {
      alert(error?.message || "Error al anular obligación");
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const crearObligacionMembresia = async () => {
    if (!asociadoId) {
      alert("No se encontró el asociado");
      return;
    }

    if (tieneObligacionesPendientes) {
      alert(
        "Ya tienes una obligación pendiente. Primero debes pagarla o anularla.",
      );
      return;
    }

    if (tieneReciboPendiente) {
      alert(
        "Ya tienes un recibo en revisión. Debes esperar aprobación del administrador.",
      );
      return;
    }

    try {
      setGenerando(true);

      const response = await generarSostenimiento({
        asociado_id: asociadoId,
        anio: new Date().getFullYear(),
        modalidad,
        fecha_pago: new Date().toISOString().slice(0, 10),
      });

      if (!response?.success) {
        alert(response?.message || "No se pudo generar la obligación");
        return;
      }

      alert("Obligación generada correctamente");
      await cargarDatos();
    } catch (error: any) {
      console.error(error);
      alert(error?.message || "Error al generar la obligación");
    } finally {
      setGenerando(false);
    }
  };

  const abrirModalPago = (obligacion: any) => {
    setObligacionSeleccionada(obligacion);

    setForm({
      referencia_pago: "",
      valor_reportado: obligacion?.saldo_pendiente || "",
      fecha_pago: new Date().toISOString().slice(0, 10),
      banco: "",
      observacion_usuario: "",
      archivo: null,
    });

    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setObligacionSeleccionada(null);
  };

  const guardarRecibo = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!obligacionSeleccionada) {
      alert("No hay obligación seleccionada");
      return;
    }

    if (!form.archivo) {
      alert("Debes seleccionar una imagen o PDF del recibo");
      return;
    }

    try {
      setGuardando(true);

      const formData = new FormData();
      formData.append("obligacion_id", String(obligacionSeleccionada.id));
      formData.append("referencia_pago", form.referencia_pago);
      formData.append("valor_reportado", form.valor_reportado);
      formData.append("fecha_pago", form.fecha_pago);
      formData.append("banco", form.banco);
      formData.append("observacion_usuario", form.observacion_usuario);
      formData.append("archivo", form.archivo);

      const response = await subirReciboPago(formData);

      if (!response?.success) {
        alert(response?.message || "No se pudo guardar el recibo");
        return;
      }

      alert("Recibo cargado correctamente. Queda pendiente de revisión.");
      cerrarModal();
      await cargarDatos();
    } catch (error) {
      console.error(error);
      alert("Error al cargar el recibo");
    } finally {
      setGuardando(false);
    }
  };

  if (cargando) {
    return (
      <div className="p-6">
        <p className="text-sm text-slate-500">Cargando información...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f6f8] px-3 py-4 sm:px-5 sm:py-5 lg:px-8 lg:py-6">
      <div className="mx-auto max-w-7xl space-y-5 lg:space-y-6">
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="relative border-b border-slate-200 px-5 py-5 sm:px-6 sm:py-6 lg:px-7 lg:py-7">
            <div className="absolute inset-y-0 left-0 w-1.5 bg-[#1d4ed8]" />

            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-blue-700 sm:text-[11px]">
                  Portal del asociado
                </p>

                <h1 className="mt-2 text-2xl font-black tracking-tight text-slate-800 sm:text-3xl">
                  Dashboard Asociado
                </h1>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                  Consulta tus obligaciones, selecciona tu modalidad de
                  membresía y administra tus comprobantes de pago.
                </p>
              </div>

              <div className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 sm:w-auto">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400 sm:text-[11px]">
                  Estado actual
                </p>

                <div className="mt-2 flex items-center gap-3">
                  <div
                    className={`h-3 w-3 rounded-full shrink-0 ${
                      tieneObligacionesPendientes
                        ? "bg-red-500"
                        : tieneReciboPendiente
                          ? "bg-amber-500"
                          : tieneReciboAprobado
                            ? "bg-emerald-500"
                            : "bg-slate-400"
                    }`}
                  />

                  <p className="text-lg font-black text-slate-800 sm:text-xl">
                    {tieneObligacionesPendientes
                      ? "Pendiente"
                      : tieneReciboPendiente
                        ? "En revisión"
                        : tieneReciboAprobado
                          ? "Al día"
                          : "Sin obligación"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-5 xl:grid-cols-[1.35fr_0.65fr]">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-5 py-5 sm:px-6 lg:px-7">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-blue-700 sm:text-[11px]">
                Membresía
              </p>

              <h2 className="mt-2 text-xl font-black text-slate-800 sm:text-2xl">
                Configuración de pago
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Selecciona la modalidad de sostenimiento del asociado.
              </p>
            </div>

            <div className="grid gap-6 p-5 sm:p-6 lg:grid-cols-[1fr_340px] lg:p-7">
              <div>
                <label className="text-sm font-bold text-slate-700">
                  Modalidad de membresía
                </label>

                <select
                  value={modalidad}
                  onChange={(e) => setModalidad(e.target.value as Modalidad)}
                  disabled={tieneObligacionesPendientes || tieneReciboPendiente}
                  className="mt-2 h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-700 outline-none transition focus:border-[#1d4ed8]"
                >
                  <option value="MENSUAL">Mensual</option>
                  <option value="SEMESTRAL">Semestral</option>
                  <option value="ANUAL">Anual</option>
                </select>

                {(tieneObligacionesPendientes || tieneReciboPendiente) && (
                  <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-4 text-sm font-medium text-amber-800">
                    No puedes generar otra obligación mientras tengas una
                    pendiente o un recibo en revisión.
                  </div>
                )}
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <div className="space-y-4 text-sm">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-slate-500">Cuota mensual</span>

                    <span className="text-right font-black text-slate-800">
                      ${calculoMembresia.cuotaMensual.toLocaleString("es-CO")}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <span className="text-slate-500">Meses</span>

                    <span className="font-black text-slate-800">
                      {calculoMembresia.meses}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <span className="text-slate-500">Subtotal</span>

                    <span className="text-right font-black text-slate-800">
                      ${calculoMembresia.subtotal.toLocaleString("es-CO")}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-3 border-b border-slate-200 pb-4">
                    <span className="text-slate-500">
                      Descuento {calculoMembresia.porcentajeDescuento}%
                    </span>

                    <span className="text-right font-black text-emerald-700">
                      -${calculoMembresia.descuento.toLocaleString("es-CO")}
                    </span>
                  </div>

                  <div className="flex items-end justify-between gap-3 pt-2">
                    <span className="font-bold text-slate-700">
                      Total a pagar
                    </span>

                    <span className="break-words text-right text-2xl font-black text-[#1e3a8a] sm:text-3xl">
                      ${calculoMembresia.total.toLocaleString("es-CO")}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={crearObligacionMembresia}
                  disabled={
                    generando ||
                    tieneObligacionesPendientes ||
                    tieneReciboPendiente
                  }
                  className="mt-6 h-12 w-full rounded-xl bg-[#1e3a8a] text-sm font-black text-white transition hover:bg-[#172554] disabled:cursor-not-allowed disabled:bg-slate-400"
                >
                  {generando ? "Generando..." : "Generar obligación"}
                </button>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-5 py-5 sm:px-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-blue-700 sm:text-[11px]">
                Resumen financiero
              </p>
            </div>

            <div className="p-5 sm:p-6">
              {tieneObligacionesPendientes ? (
                <>
                  <h2 className="text-xl font-black text-slate-800 sm:text-2xl">
                    Tienes cuotas pendientes
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Debes realizar el pago correspondiente para mantener tu
                    membresía activa.
                  </p>

                  <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-red-700 sm:text-[11px]">
                      Total pendiente
                    </p>

                    <p className="mt-2 break-words text-2xl font-black text-red-800 sm:text-3xl">
                      $
                      {Number(estadoPago.total_pendiente).toLocaleString(
                        "es-CO",
                      )}
                    </p>
                  </div>
                </>
              ) : tieneReciboPendiente ? (
                <>
                  <h2 className="text-xl font-black text-slate-800 sm:text-2xl">
                    Pago en revisión
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Tu comprobante fue enviado correctamente y está pendiente de
                    validación administrativa.
                  </p>

                  <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5">
                    <p className="text-sm font-bold text-amber-800">
                      Estado: revisión administrativa
                    </p>
                  </div>
                </>
              ) : tieneReciboAprobado ? (
                <>
                  <h2 className="text-xl font-black text-slate-800 sm:text-2xl">
                    Estado financiero al día
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Tus pagos se encuentran correctamente registrados en el
                    sistema.
                  </p>

                  <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
                    <p className="text-sm font-bold text-emerald-800">
                      No tienes obligaciones pendientes.
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <h2 className="text-xl font-black text-slate-800 sm:text-2xl">
                    Sin obligación activa
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Genera una nueva obligación para continuar con tu proceso de
                    membresía.
                  </p>
                </>
              )}
            </div>
          </div>
        </section>

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-5 py-5 sm:px-6">
            <h2 className="text-xl font-black text-slate-800 sm:text-2xl">
              Obligaciones pendientes
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Consulta las obligaciones activas del asociado.
            </p>
          </div>

          <div className="p-4 sm:p-6">
            {!obligacionesPendientes.length ? (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-sm font-semibold text-slate-500">
                No tienes obligaciones pendientes.
              </div>
            ) : (
              <div className="overflow-hidden rounded-2xl border border-slate-200">
                <div className="overflow-x-auto">
                  <table className="min-w-[760px] w-full text-sm">
                    <thead className="bg-slate-100 text-left text-xs uppercase tracking-wider text-slate-500">
                      <tr>
                        <th className="px-5 py-4 font-black">Concepto</th>
                        <th className="px-5 py-4 font-black">Estado</th>
                        <th className="px-5 py-4 font-black">Vencimiento</th>
                        <th className="px-5 py-4 font-black">Saldo</th>
                        <th className="px-5 py-4 text-right font-black">
                          Acciones
                        </th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-200 bg-white">
                      {obligacionesPendientes.map((obligacion: any) => (
                        <tr
                          key={obligacion.id}
                          className="transition hover:bg-slate-50"
                        >
                          <td className="px-5 py-4 font-bold text-slate-800">
                            {obligacion.concepto}
                          </td>

                          <td className="px-5 py-4">
                            <span className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700">
                              {obligacion.estado}
                            </span>
                          </td>

                          <td className="px-5 py-4 text-slate-600">
                            {obligacion.fecha_vencimiento || "Sin fecha"}
                          </td>

                          <td className="px-5 py-4 font-black text-slate-800">
                            $
                            {Number(obligacion.saldo_pendiente).toLocaleString(
                              "es-CO",
                            )}
                          </td>

                          <td className="px-5 py-4">
                            <div className="flex justify-end gap-2">
                              <button
                                onClick={() => anular(obligacion.id)}
                                className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-100"
                              >
                                Anular
                              </button>

                              <button
                                onClick={() => abrirModalPago(obligacion)}
                                className="rounded-lg bg-[#1e3a8a] px-4 py-2 text-xs font-bold text-white transition hover:bg-[#172554]"
                              >
                                Subir recibo
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </section>

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-5 py-5 sm:px-6">
            <h2 className="text-xl font-black text-slate-800 sm:text-2xl">
              Mis recibos cargados
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Historial de comprobantes enviados para revisión.
            </p>
          </div>

          <div className="p-4 sm:p-6">
            {!recibos.length ? (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-sm font-semibold text-slate-500">
                Todavía no has cargado recibos de pago.
              </div>
            ) : (
              <div className="overflow-hidden rounded-2xl border border-slate-200">
                <div className="overflow-x-auto">
                  <table className="min-w-[720px] w-full text-sm">
                    <thead className="bg-slate-100 text-left text-xs uppercase tracking-wider text-slate-500">
                      <tr>
                        <th className="px-5 py-4 font-black">Recibo</th>
                        <th className="px-5 py-4 font-black">Valor</th>
                        <th className="px-5 py-4 font-black">Fecha pago</th>
                        <th className="px-5 py-4 font-black">Banco</th>
                        <th className="px-5 py-4 font-black">Estado</th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-200 bg-white">
                      {recibos.map((recibo: any) => (
                        <tr
                          key={recibo.id}
                          className="transition hover:bg-slate-50"
                        >
                          <td className="px-5 py-4 font-bold text-slate-800">
                            {recibo.numero_recibo}
                          </td>

                          <td className="px-5 py-4 font-black text-slate-800">
                            $
                            {Number(recibo.valor_reportado).toLocaleString(
                              "es-CO",
                            )}
                          </td>

                          <td className="px-5 py-4 text-slate-600">
                            {recibo.fecha_pago}
                          </td>

                          <td className="px-5 py-4 text-slate-600">
                            {recibo.banco || "No registra"}
                          </td>

                          <td className="px-5 py-4">
                            <span
                              className={`rounded-lg border px-3 py-1 text-xs font-bold ${
                                recibo.estado === "APROBADO"
                                  ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                                  : recibo.estado === "RECHAZADO"
                                    ? "border-red-200 bg-red-50 text-red-700"
                                    : "border-amber-200 bg-amber-50 text-amber-700"
                              }`}
                            >
                              {recibo.estado}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </section>

        {modalAbierto && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-3 sm:p-4 backdrop-blur-sm">
            <div className="max-h-[95vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-2xl">
              <div className="border-b border-slate-200 bg-slate-50 px-5 py-5 sm:px-6">
                <h2 className="text-xl font-black text-slate-800 sm:text-2xl">
                  Subir recibo de pago
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {obligacionSeleccionada?.concepto}
                </p>
              </div>

              <form onSubmit={guardarRecibo} className="space-y-4 p-5 sm:p-6">
                <input
                  type="number"
                  placeholder="Valor reportado"
                  value={form.valor_reportado}
                  onChange={(e) =>
                    setForm({ ...form, valor_reportado: e.target.value })
                  }
                  className="h-12 w-full rounded-xl border border-slate-300 px-4 text-sm font-medium text-slate-700 outline-none transition focus:border-[#1d4ed8]"
                  required
                />

                <input
                  type="date"
                  value={form.fecha_pago}
                  onChange={(e) =>
                    setForm({ ...form, fecha_pago: e.target.value })
                  }
                  className="h-12 w-full rounded-xl border border-slate-300 px-4 text-sm font-medium text-slate-700 outline-none transition focus:border-[#1d4ed8]"
                  required
                />

                <input
                  type="text"
                  placeholder="Referencia de pago"
                  value={form.referencia_pago}
                  onChange={(e) =>
                    setForm({ ...form, referencia_pago: e.target.value })
                  }
                  className="h-12 w-full rounded-xl border border-slate-300 px-4 text-sm font-medium text-slate-700 outline-none transition focus:border-[#1d4ed8]"
                />

                <input
                  type="text"
                  placeholder="Banco"
                  value={form.banco}
                  onChange={(e) => setForm({ ...form, banco: e.target.value })}
                  className="h-12 w-full rounded-xl border border-slate-300 px-4 text-sm font-medium text-slate-700 outline-none transition focus:border-[#1d4ed8]"
                />

                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) =>
                    setForm({
                      ...form,
                      archivo: e.target.files?.[0] || null,
                    })
                  }
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-600 file:mr-4 file:rounded-lg file:border-0 file:bg-[#1e3a8a] file:px-4 file:py-2 file:text-xs file:font-bold file:text-white"
                  required
                />

                <textarea
                  placeholder="Observación"
                  value={form.observacion_usuario}
                  onChange={(e) =>
                    setForm({ ...form, observacion_usuario: e.target.value })
                  }
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm font-medium text-slate-700 outline-none transition focus:border-[#1d4ed8]"
                  rows={4}
                />

                <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={cerrarModal}
                    className="h-11 rounded-xl border border-slate-300 bg-white px-5 text-sm font-bold text-slate-700 transition hover:bg-slate-100"
                  >
                    Cancelar
                  </button>

                  <button
                    type="submit"
                    disabled={guardando}
                    className="h-11 rounded-xl bg-[#1e3a8a] px-5 text-sm font-black text-white transition hover:bg-[#172554] disabled:bg-slate-400"
                  >
                    {guardando ? "Guardando..." : "Guardar recibo"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
