"use client";

import { useEffect, useState } from "react";
import {
  CalendarDays,
  CircleDollarSign,
  CreditCard,
  FileCog,
  Percent,
  Plus,
  RefreshCw,
  Save,
  Settings,
} from "lucide-react";

import {
  listarParametrosSistema,
  crearParametroSistema,
  actualizarParametroSistema,
  listarSmmlvHistorico,
  crearSmmlvHistorico,
  actualizarSmmlvHistorico,
  listarTiposObligacion,
  crearTipoObligacion,
  actualizarTipoObligacion,
  listarPeriodosCobro,
  crearPeriodoCobro,
  actualizarPeriodoCobro,
  listarDescuentos,
  crearDescuento,
  actualizarDescuento,
  listarConfiguracionDescuentosAnuales,
  crearConfiguracionDescuentoAnual,
} from "@/services/configuracionAdminService";

type Tab =
  | "parametros"
  | "smmlv"
  | "tipos"
  | "periodos"
  | "descuentos"
  | "anuales";

function extraerLista(res: any) {
  if (Array.isArray(res)) return res;
  if (Array.isArray(res?.data?.data)) return res.data.data;
  if (Array.isArray(res?.data)) return res.data;
  return [];
}

export default function ConfiguracionAdminPage() {
  const [tab, setTab] = useState<Tab>("parametros");
  const [cargando, setCargando] = useState(false);

  const [parametros, setParametros] = useState<any[]>([]);
  const [smmlv, setSmmlv] = useState<any[]>([]);
  const [tipos, setTipos] = useState<any[]>([]);
  const [periodos, setPeriodos] = useState<any[]>([]);
  const [descuentos, setDescuentos] = useState<any[]>([]);
  const [anuales, setAnuales] = useState<any[]>([]);

  const [form, setForm] = useState<any>({});

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      setCargando(true);

      const [
        resParametros,
        resSmmlv,
        resTipos,
        resPeriodos,
        resDescuentos,
        resAnuales,
      ] = await Promise.all([
        listarParametrosSistema(),
        listarSmmlvHistorico(),
        listarTiposObligacion(),
        listarPeriodosCobro(),
        listarDescuentos(),
        listarConfiguracionDescuentosAnuales(),
      ]);

      console.log("PARAMETROS:", resParametros);
      console.log("SMMLV:", resSmmlv);

      setParametros(extraerLista(resParametros));
      setSmmlv(extraerLista(resSmmlv));
      setTipos(extraerLista(resTipos));
      setPeriodos(extraerLista(resPeriodos));
      setDescuentos(extraerLista(resDescuentos));
      setAnuales(extraerLista(resAnuales));
    } catch (error) {
      console.error("Error cargando configuración:", error);
    } finally {
      setCargando(false);
    }
  };

  const limpiar = () => setForm({});

  const guardar = async () => {
    try {
      setCargando(true);

      if (tab === "parametros") {
        const dataGuardar = {
          ...form,
          editable: form.editable ?? 1,
        };

        if (form.id) {
          await actualizarParametroSistema(form.id, dataGuardar);
        } else {
          await crearParametroSistema(dataGuardar);
        }
      }

      if (tab === "smmlv") {
        const dataGuardar = {
          ...form,
          activo: form.activo ?? 1,
        };

        if (form.id) {
          await actualizarSmmlvHistorico(form.id, dataGuardar);
        } else {
          await crearSmmlvHistorico(dataGuardar);
        }
      }

      if (tab === "tipos") {
        const dataGuardar = {
          ...form,
          es_recurrente: form.es_recurrente ?? 0,
          permite_descuento: form.permite_descuento ?? 0,
          afecta_estado_membresia: form.afecta_estado_membresia ?? 1,
        };

        if (form.id) {
          await actualizarTipoObligacion(form.id, dataGuardar);
        } else {
          await crearTipoObligacion(dataGuardar);
        }
      }

      if (tab === "periodos") {
        const dataGuardar = {
          ...form,
          activo: form.activo ?? 1,
        };

        if (form.id) {
          await actualizarPeriodoCobro(form.id, dataGuardar);
        } else {
          await crearPeriodoCobro(dataGuardar);
        }
      }

      if (tab === "descuentos") {
        const dataGuardar = {
          ...form,
          activo: form.activo ?? 1,
        };

        if (form.id) {
          await actualizarDescuento(form.id, dataGuardar);
        } else {
          await crearDescuento(dataGuardar);
        }
      }

      if (tab === "anuales") {
        const dataGuardar = {
          ...form,
          activo: form.activo ?? 1,
        };

        await crearConfiguracionDescuentoAnual(dataGuardar);
      }

      limpiar();
      await cargarDatos();
    } catch (error) {
      console.error("Error guardando configuración:", error);
    } finally {
      setCargando(false);
    }
  };

  const tabs = [
    { id: "parametros", label: "Parámetros", icon: FileCog },
    { id: "smmlv", label: "SMMLV", icon: CircleDollarSign },
    { id: "tipos", label: "Tipos obligación", icon: CreditCard },
    { id: "periodos", label: "Periodos", icon: CalendarDays },
    { id: "descuentos", label: "Descuentos", icon: Percent },
    { id: "anuales", label: "Descuentos anuales", icon: Settings },
  ] as const;

  const datos =
    tab === "parametros"
      ? parametros
      : tab === "smmlv"
        ? smmlv
        : tab === "tipos"
          ? tipos
          : tab === "periodos"
            ? periodos
            : tab === "descuentos"
              ? descuentos
              : anuales;

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-blue-100 p-3 text-blue-700">
                <Settings size={26} />
              </div>

              <div>
                <h1 className="text-2xl font-black text-slate-900">
                  Configuración administrativa
                </h1>
                <p className="text-sm text-slate-500">
                  Control de descuentos, fechas, SMMLV, periodos y obligaciones.
                </p>
              </div>
            </div>

            <button
              onClick={cargarDatos}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-bold text-white transition hover:bg-slate-800"
            >
              <RefreshCw size={17} />
              Actualizar
            </button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="mb-3 px-2 text-xs font-black uppercase tracking-wider text-slate-400">
              Módulos
            </p>

            <div className="space-y-2">
              {tabs.map((item) => {
                const Icon = item.icon;
                const active = tab === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setTab(item.id);
                      limpiar();
                    }}
                    className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-bold transition ${
                      active
                        ? "bg-blue-700 text-white shadow-sm"
                        : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    <Icon size={18} />
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-6">
            <FormularioConfiguracion
              tab={tab}
              form={form}
              setForm={setForm}
              guardar={guardar}
              limpiar={limpiar}
              descuentos={descuentos}
              cargando={cargando}
            />

            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-4">
                <h2 className="text-lg font-black text-slate-900">Registros</h2>
                <p className="text-sm text-slate-500">
                  Total encontrados: {datos.length}
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[850px] border-separate border-spacing-y-2 text-sm">
                  <thead>
                    <tr className="text-left text-xs uppercase tracking-wider text-slate-400">
                      <th className="px-4 py-2">ID</th>
                      <th className="px-4 py-2">Nombre / Clave</th>
                      <th className="px-4 py-2">Valor</th>
                      <th className="px-4 py-2">Estado</th>
                      <th className="px-4 py-2">Fechas</th>
                      <th className="px-4 py-2 text-right">Acción</th>
                    </tr>
                  </thead>

                  <tbody>
                    {datos.map((item) => (
                      <tr key={item.id} className="bg-slate-50">
                        <td className="rounded-l-2xl px-4 py-3 font-bold text-slate-700">
                          #{item.id}
                        </td>

                        <td className="px-4 py-3">
                          <p className="font-bold text-slate-900">
                            {item.nombre ||
                              item.clave ||
                              item.codigo ||
                              `Registro ${item.id}`}
                          </p>
                          <p className="text-xs text-slate-500">
                            {item.descripcion || "Sin descripción"}
                          </p>
                        </td>

                        <td className="px-4 py-3 font-semibold text-slate-700">
                          {item.valor ??
                            item.valor_base ??
                            item.tipo_periodo ??
                            item.tipo_descuento ??
                            item.anio ??
                            "-"}
                        </td>

                        <td className="px-4 py-3">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-bold ${
                              item.activo === 0 || item.estado === 0
                                ? "bg-red-100 text-red-700"
                                : "bg-emerald-100 text-emerald-700"
                            }`}
                          >
                            {item.activo === 0 || item.estado === 0
                              ? "Inactivo"
                              : "Activo"}
                          </span>
                        </td>

                        <td className="px-4 py-3 text-xs text-slate-500">
                          {item.fecha_inicio ||
                            item.fecha_inicio_vigencia ||
                            item.fecha_fin ||
                            item.fecha_fin_vigencia ||
                            "-"}
                        </td>

                        <td className="rounded-r-2xl px-4 py-3 text-right">
                          <button
                            onClick={() => setForm(item)}
                            className="rounded-xl bg-blue-100 px-4 py-2 text-xs font-black text-blue-700 transition hover:bg-blue-200"
                          >
                            Editar
                          </button>
                        </td>
                      </tr>
                    ))}

                    {datos.length === 0 && (
                      <tr>
                        <td
                          colSpan={6}
                          className="rounded-2xl bg-slate-50 p-8 text-center text-slate-500"
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
    </div>
  );
  function FormularioConfiguracion({
    tab,
    form,
    setForm,
    guardar,
    limpiar,
    descuentos,
    cargando,
  }: any) {
    const input =
      "h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100";

    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-black text-slate-900">
              {form.id ? "Editar configuración" : "Nueva configuración"}
            </h2>
            <p className="text-sm text-slate-500">
              Completa los campos según el módulo seleccionado.
            </p>
          </div>

          <button
            type="button"
            onClick={limpiar}
            className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-200"
          >
            Nuevo
          </button>
        </div>

        {tab === "parametros" && (
          <div className="grid gap-4 md:grid-cols-2">
            <Campo label="Clave">
              <input
                className={input}
                value={form.clave ?? ""}
                onChange={(e) => setForm({ ...form, clave: e.target.value })}
              />
            </Campo>

            <Campo label="Valor">
              <input
                className={input}
                value={form.valor ?? ""}
                onChange={(e) => setForm({ ...form, valor: e.target.value })}
              />
            </Campo>

            <Campo label="Tipo dato">
              <select
                className={input}
                value={form.tipo_dato ?? ""}
                onChange={(e) =>
                  setForm({ ...form, tipo_dato: e.target.value })
                }
              >
                <option value="">Seleccione</option>
                <option value="NUMERO">Número</option>
                <option value="TEXTO">Texto</option>
                <option value="FECHA">Fecha</option>
                <option value="BOOLEANO">Booleano</option>
              </select>
            </Campo>

            <Campo label="Año vigencia">
              <input
                type="number"
                className={input}
                value={form.vigencia_anio ?? ""}
                onChange={(e) =>
                  setForm({ ...form, vigencia_anio: e.target.value })
                }
              />
            </Campo>

            <Campo label="Editable">
              <select
                className={input}
                value={form.editable ?? 1}
                onChange={(e) =>
                  setForm({ ...form, editable: Number(e.target.value) })
                }
              >
                <option value={1}>Sí</option>
                <option value={0}>No</option>
              </select>
            </Campo>

            <div className="md:col-span-2">
              <Campo label="Descripción">
                <textarea
                  className="min-h-24 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  value={form.descripcion ?? ""}
                  onChange={(e) =>
                    setForm({ ...form, descripcion: e.target.value })
                  }
                />
              </Campo>
            </div>
          </div>
        )}

        {tab === "smmlv" && (
          <div className="grid gap-4 md:grid-cols-2">
            <Campo label="Año">
              <input
                type="number"
                className={input}
                value={form.anio ?? ""}
                onChange={(e) => setForm({ ...form, anio: e.target.value })}
              />
            </Campo>

            <Campo label="Valor">
              <input
                type="number"
                className={input}
                value={form.valor ?? ""}
                onChange={(e) => setForm({ ...form, valor: e.target.value })}
              />
            </Campo>

            <Campo label="Fecha inicio vigencia">
              <input
                type="date"
                className={input}
                value={form.fecha_inicio_vigencia ?? ""}
                onChange={(e) =>
                  setForm({ ...form, fecha_inicio_vigencia: e.target.value })
                }
              />
            </Campo>

            <Campo label="Fecha fin vigencia">
              <input
                type="date"
                className={input}
                value={form.fecha_fin_vigencia ?? ""}
                onChange={(e) =>
                  setForm({ ...form, fecha_fin_vigencia: e.target.value })
                }
              />
            </Campo>

            <Campo label="Activo">
              <select
                className={input}
                value={form.activo ?? 1}
                onChange={(e) =>
                  setForm({ ...form, activo: Number(e.target.value) })
                }
              >
                <option value={1}>Sí</option>
                <option value={0}>No</option>
              </select>
            </Campo>
          </div>
        )}

        {tab === "tipos" && (
          <div className="grid gap-4 md:grid-cols-2">
            <Campo label="Código">
              <input
                className={input}
                value={form.codigo ?? ""}
                onChange={(e) => setForm({ ...form, codigo: e.target.value })}
              />
            </Campo>

            <Campo label="Nombre">
              <input
                className={input}
                value={form.nombre ?? ""}
                onChange={(e) => setForm({ ...form, nombre: e.target.value })}
              />
            </Campo>

            <Campo label="Recurrente">
              <select
                className={input}
                value={form.es_recurrente ?? 0}
                onChange={(e) =>
                  setForm({ ...form, es_recurrente: Number(e.target.value) })
                }
              >
                <option value={1}>Sí</option>
                <option value={0}>No</option>
              </select>
            </Campo>

            <Campo label="Permite descuento">
              <select
                className={input}
                value={form.permite_descuento ?? 0}
                onChange={(e) =>
                  setForm({
                    ...form,
                    permite_descuento: Number(e.target.value),
                  })
                }
              >
                <option value={1}>Sí</option>
                <option value={0}>No</option>
              </select>
            </Campo>

            <Campo label="Afecta membresía">
              <select
                className={input}
                value={form.afecta_estado_membresia ?? 1}
                onChange={(e) =>
                  setForm({
                    ...form,
                    afecta_estado_membresia: Number(e.target.value),
                  })
                }
              >
                <option value={1}>Sí</option>
                <option value={0}>No</option>
              </select>
            </Campo>

            <div className="md:col-span-2">
              <Campo label="Descripción">
                <textarea
                  className="min-h-24 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  value={form.descripcion ?? ""}
                  onChange={(e) =>
                    setForm({ ...form, descripcion: e.target.value })
                  }
                />
              </Campo>
            </div>
          </div>
        )}

        {tab === "periodos" && (
          <div className="grid gap-4 md:grid-cols-2">
            <Campo label="Nombre">
              <input
                className={input}
                value={form.nombre ?? ""}
                onChange={(e) => setForm({ ...form, nombre: e.target.value })}
              />
            </Campo>

            <Campo label="Tipo periodo">
              <select
                className={input}
                value={form.tipo_periodo ?? ""}
                onChange={(e) =>
                  setForm({ ...form, tipo_periodo: e.target.value })
                }
              >
                <option value="">Seleccione</option>
                <option value="MENSUAL">Mensual</option>
                <option value="SEMESTRAL">Semestral</option>
                <option value="ANUAL">Anual</option>
              </select>
            </Campo>

            <Campo label="Fecha inicio">
              <input
                type="date"
                className={input}
                value={form.fecha_inicio ?? ""}
                onChange={(e) =>
                  setForm({ ...form, fecha_inicio: e.target.value })
                }
              />
            </Campo>

            <Campo label="Fecha fin">
              <input
                type="date"
                className={input}
                value={form.fecha_fin ?? ""}
                onChange={(e) =>
                  setForm({ ...form, fecha_fin: e.target.value })
                }
              />
            </Campo>

            <Campo label="Fecha límite descuento">
              <input
                type="date"
                className={input}
                value={form.fecha_limite_descuento ?? ""}
                onChange={(e) =>
                  setForm({
                    ...form,
                    fecha_limite_descuento: e.target.value,
                  })
                }
              />
            </Campo>

            <Campo label="Año">
              <input
                type="number"
                className={input}
                value={form.anio ?? ""}
                onChange={(e) => setForm({ ...form, anio: e.target.value })}
              />
            </Campo>
          </div>
        )}

        {tab === "descuentos" && (
          <div className="grid gap-4 md:grid-cols-2">
            <Campo label="Código">
              <input
                className={input}
                value={form.codigo ?? ""}
                onChange={(e) => setForm({ ...form, codigo: e.target.value })}
              />
            </Campo>

            <Campo label="Nombre">
              <input
                className={input}
                value={form.nombre ?? ""}
                onChange={(e) => setForm({ ...form, nombre: e.target.value })}
              />
            </Campo>

            <Campo label="Tipo descuento">
              <select
                className={input}
                value={form.tipo_descuento ?? ""}
                onChange={(e) =>
                  setForm({ ...form, tipo_descuento: e.target.value })
                }
              >
                <option value="">Seleccione</option>
                <option value="PORCENTAJE">Porcentaje</option>
                <option value="VALOR">Valor fijo</option>
              </select>
            </Campo>

            <Campo label="Valor">
              <input
                type="number"
                className={input}
                value={form.valor ?? ""}
                onChange={(e) => setForm({ ...form, valor: e.target.value })}
              />
            </Campo>

            <Campo label="Aplica a periodo">
              <select
                className={input}
                value={form.aplica_a_tipo_periodo ?? ""}
                onChange={(e) =>
                  setForm({
                    ...form,
                    aplica_a_tipo_periodo: e.target.value,
                  })
                }
              >
                <option value="">Todos</option>
                <option value="MENSUAL">Mensual</option>
                <option value="SEMESTRAL">Semestral</option>
                <option value="ANUAL">Anual</option>
              </select>
            </Campo>

            <Campo label="Días límite">
              <input
                type="number"
                className={input}
                value={form.dias_limite ?? ""}
                onChange={(e) =>
                  setForm({ ...form, dias_limite: e.target.value })
                }
              />
            </Campo>

            <div className="md:col-span-2">
              <Campo label="Descripción">
                <textarea
                  className="min-h-24 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  value={form.descripcion ?? ""}
                  onChange={(e) =>
                    setForm({ ...form, descripcion: e.target.value })
                  }
                />
              </Campo>
            </div>
          </div>
        )}

        {tab === "anuales" && (
          <div className="grid gap-4 md:grid-cols-2">
            <Campo label="Año">
              <input
                type="number"
                className={input}
                value={form.anio ?? ""}
                onChange={(e) => setForm({ ...form, anio: e.target.value })}
              />
            </Campo>

            <Campo label="Descuento">
              <select
                className={input}
                value={form.descuento_id ?? ""}
                onChange={(e) =>
                  setForm({ ...form, descuento_id: e.target.value })
                }
              >
                <option value="">Seleccione</option>
                {descuentos.map((d: any) => (
                  <option key={d.id} value={d.id}>
                    {d.nombre} - {d.valor}
                  </option>
                ))}
              </select>
            </Campo>

            <Campo label="Fecha inicio">
              <input
                type="date"
                className={input}
                value={form.fecha_inicio ?? ""}
                onChange={(e) =>
                  setForm({ ...form, fecha_inicio: e.target.value })
                }
              />
            </Campo>

            <Campo label="Fecha fin">
              <input
                type="date"
                className={input}
                value={form.fecha_fin ?? ""}
                onChange={(e) =>
                  setForm({ ...form, fecha_fin: e.target.value })
                }
              />
            </Campo>
          </div>
        )}

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={limpiar}
            className="rounded-xl border border-slate-200 px-5 py-2 text-sm font-bold text-slate-600 hover:bg-slate-50"
          >
            Limpiar
          </button>

          <button
            type="button"
            onClick={guardar}
            disabled={cargando}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-700 px-5 py-2 text-sm font-black text-white hover:bg-blue-800 disabled:opacity-60"
          >
            <Save size={17} />
            {cargando ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </div>
    );
  }

  function Campo({ label, children }: any) {
    return (
      <div className="space-y-2">
        <label className="text-xs font-black uppercase tracking-wider text-slate-500">
          {label}
        </label>
        {children}
      </div>
    );
  }
}
