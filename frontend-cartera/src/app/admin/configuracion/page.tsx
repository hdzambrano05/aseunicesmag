"use client";

import { useEffect, useState } from "react";
import { CircleDollarSign, Pencil, Plus, RefreshCw, Save } from "lucide-react";

import {
  listarSmmlvHistorico,
  crearSmmlvHistorico,
  actualizarSmmlvHistorico,
} from "@/services/configuracionAdminService";

function extraerLista(res: any) {
  if (Array.isArray(res)) return res;
  if (Array.isArray(res?.data?.data)) return res.data.data;
  if (Array.isArray(res?.data)) return res.data;
  return [];
}

export default function ConfiguracionSMMLVPage() {
  const [cargando, setCargando] = useState(false);
  const [smmlv, setSmmlv] = useState<any[]>([]);

  const [form, setForm] = useState<any>({
    activo: 1,
  });

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      setCargando(true);

      const res = await listarSmmlvHistorico();
      setSmmlv(extraerLista(res));
    } catch (error) {
      console.error(error);
    } finally {
      setCargando(false);
    }
  };

  const limpiar = () => {
    setForm({
      activo: 1,
    });
  };

  const soloNumeros = (valor: string) => {
    return valor.replace(/[^\d]/g, "");
  };

  const guardar = async () => {
    try {
      setCargando(true);

      const payload = {
        ...form,
        activo: Number(form.activo),
      };

      if (form.id) {
        await actualizarSmmlvHistorico(form.id, payload);
      } else {
        await crearSmmlvHistorico(payload);
      }

      limpiar();
      await cargarDatos();
    } catch (error) {
      console.error(error);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F7FA] p-4 md:p-6">
      <div className="mx-auto max-w-6xl space-y-5">
        {/* HEADER */}
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#21409A]/10 text-[#21409A]">
                <CircleDollarSign size={30} />
              </div>

              <div>
                <h1 className="text-2xl font-black text-slate-900">
                  Configuración SMMLV
                </h1>

                <p className="text-sm text-slate-500">
                  Gestión del salario mínimo legal vigente.
                </p>
              </div>
            </div>

            <button
              onClick={cargarDatos}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
            >
              <RefreshCw size={16} />
              Actualizar
            </button>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-[340px_1fr]">
          {/* FORM */}
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-black text-slate-900">
                  {form.id ? "Editar" : "Nuevo"}
                </h2>

                <p className="text-xs text-slate-500">
                  Registro salario mínimo
                </p>
              </div>

              <button
                onClick={limpiar}
                className="inline-flex h-10 items-center gap-2 rounded-xl bg-slate-100 px-4 text-sm font-bold text-slate-700 transition hover:bg-slate-200"
              >
                <Plus size={15} />
                Nuevo
              </button>
            </div>

            <div className="space-y-4">
              <Campo label="Año">
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="2026"
                  className={inputClass}
                  value={form.anio ?? ""}
                  onChange={(e) => {
                    const value = soloNumeros(e.target.value);

                    setForm((prev: any) => ({
                      ...prev,
                      anio: value,
                    }));
                  }}
                />
              </Campo>

              <Campo label="Valor">
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="1300000"
                  className={inputClass}
                  value={form.valor ?? ""}
                  onChange={(e) => {
                    const value = soloNumeros(e.target.value);

                    setForm((prev: any) => ({
                      ...prev,
                      valor: value,
                    }));
                  }}
                />
              </Campo>

              <Campo label="Fecha inicio">
                <input
                  type="date"
                  className={inputClass}
                  value={form.fecha_inicio_vigencia ?? ""}
                  onChange={(e) =>
                    setForm((prev: any) => ({
                      ...prev,
                      fecha_inicio_vigencia: e.target.value,
                    }))
                  }
                />
              </Campo>

              <Campo label="Fecha fin">
                <input
                  type="date"
                  className={inputClass}
                  value={form.fecha_fin_vigencia ?? ""}
                  onChange={(e) =>
                    setForm((prev: any) => ({
                      ...prev,
                      fecha_fin_vigencia: e.target.value,
                    }))
                  }
                />
              </Campo>

              <Campo label="Estado">
                <select
                  className={inputClass}
                  value={form.activo ?? 1}
                  onChange={(e) =>
                    setForm((prev: any) => ({
                      ...prev,
                      activo: Number(e.target.value),
                    }))
                  }
                >
                  <option value={1}>Activo</option>
                  <option value={0}>Inactivo</option>
                </select>
              </Campo>
            </div>

            <button
              onClick={guardar}
              disabled={cargando}
              className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#21409A] text-sm font-black text-white transition hover:bg-[#183483] disabled:opacity-60"
            >
              <Save size={17} />
              {cargando ? "Guardando..." : "Guardar"}
            </button>
          </div>

          {/* TABLA */}
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 px-5 py-4">
              <h2 className="text-lg font-black text-slate-900">
                Histórico SMMLV
              </h2>

              <p className="text-xs text-slate-500">
                Total registros: {smmlv.length}
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px]">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50">
                    <th className="px-5 py-4 text-left text-xs font-black uppercase tracking-wide text-slate-500">
                      Año
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-black uppercase tracking-wide text-slate-500">
                      Valor
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-black uppercase tracking-wide text-slate-500">
                      Inicio
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-black uppercase tracking-wide text-slate-500">
                      Fin
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-black uppercase tracking-wide text-slate-500">
                      Estado
                    </th>

                    <th className="px-5 py-4 text-right text-xs font-black uppercase tracking-wide text-slate-500">
                      Acción
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {smmlv.map((item) => {
                    const activo = Number(item.activo) === 1;

                    return (
                      <tr
                        key={item.id}
                        className="border-b border-slate-100 transition hover:bg-slate-50"
                      >
                        <td className="px-5 py-4 text-sm font-black text-slate-900">
                          {item.anio}
                        </td>

                        <td className="px-5 py-4 text-sm font-bold text-[#21409A]">
                          ${Number(item.valor).toLocaleString("es-CO")}
                        </td>

                        <td className="px-5 py-4 text-sm text-slate-600">
                          {item.fecha_inicio_vigencia?.split("T")[0]}
                        </td>

                        <td className="px-5 py-4 text-sm text-slate-600">
                          {item.fecha_fin_vigencia?.split("T")[0]}
                        </td>

                        <td className="px-5 py-4">
                          <span
                            className={`inline-flex rounded-full px-3 py-1 text-xs font-black ${
                              activo
                                ? "bg-emerald-50 text-emerald-700"
                                : "bg-red-50 text-red-700"
                            }`}
                          >
                            {activo ? "Activo" : "Inactivo"}
                          </span>
                        </td>

                        <td className="px-5 py-4 text-right">
                          <button
                            onClick={() =>
                              setForm({
                                id: item.id,
                                anio: item.anio,
                                valor: item.valor,
                                fecha_inicio_vigencia:
                                  item.fecha_inicio_vigencia?.split("T")[0],
                                fecha_fin_vigencia:
                                  item.fecha_fin_vigencia?.split("T")[0],
                                activo: Number(item.activo),
                              })
                            }
                            className="inline-flex h-9 items-center gap-2 rounded-xl bg-slate-900 px-4 text-xs font-black text-white transition hover:bg-[#21409A]"
                          >
                            <Pencil size={13} />
                            Editar
                          </button>
                        </td>
                      </tr>
                    );
                  })}

                  {smmlv.length === 0 && (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-5 py-16 text-center text-sm font-bold text-slate-500"
                      >
                        No hay registros disponibles.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const inputClass =
  "h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-semibold text-slate-800 outline-none transition focus:border-[#21409A] focus:bg-white focus:ring-4 focus:ring-blue-100";

function Campo({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-black uppercase tracking-wide text-slate-500">
        {label}
      </span>

      {children}
    </label>
  );
}
