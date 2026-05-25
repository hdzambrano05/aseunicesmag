// components/ModalMensaje.tsx
"use client";

import { AlertTriangle, CheckCircle, Info, X, XCircle } from "lucide-react";

export type TipoModalMensaje =
  | "success"
  | "error"
  | "warning"
  | "info"
  | "confirm";

type Props = {
  abierto: boolean;
  tipo?: TipoModalMensaje;
  titulo: string;
  mensaje: string;
  textoConfirmar?: string;
  textoCancelar?: string;
  onCerrar: () => void;
  onConfirmar?: () => void;
};

export default function ModalMensaje({
  abierto,
  tipo = "info",
  titulo,
  mensaje,
  textoConfirmar = "Aceptar",
  textoCancelar = "Cancelar",
  onCerrar,
  onConfirmar,
}: Props) {
  if (!abierto) return null;

  const estilos = {
    success: {
      icono: <CheckCircle className="h-8 w-8" />,
      caja: "bg-emerald-100 text-emerald-700",
      boton: "bg-emerald-600 hover:bg-emerald-700",
    },
    error: {
      icono: <XCircle className="h-8 w-8" />,
      caja: "bg-red-100 text-red-700",
      boton: "bg-red-600 hover:bg-red-700",
    },
    warning: {
      icono: <AlertTriangle className="h-8 w-8" />,
      caja: "bg-amber-100 text-amber-700",
      boton: "bg-amber-600 hover:bg-amber-700",
    },
    info: {
      icono: <Info className="h-8 w-8" />,
      caja: "bg-blue-100 text-blue-700",
      boton: "bg-blue-700 hover:bg-blue-800",
    },
    confirm: {
      icono: <AlertTriangle className="h-8 w-8" />,
      caja: "bg-amber-100 text-amber-700",
      boton: "bg-blue-700 hover:bg-blue-800",
    },
  };

  const actual = estilos[tipo];

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/50 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div
            className={`flex h-14 w-14 items-center justify-center rounded-2xl ${actual.caja}`}
          >
            {actual.icono}
          </div>

          <button
            type="button"
            onClick={onCerrar}
            className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <h2 className="text-xl font-black text-slate-900">{titulo}</h2>

        <p className="mt-2 text-sm leading-6 text-slate-600">{mensaje}</p>

        <div className="mt-6 flex justify-end gap-3">
          {tipo === "confirm" && (
            <button
              type="button"
              onClick={onCerrar}
              className="rounded-2xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-100"
            >
              {textoCancelar}
            </button>
          )}

          <button
            type="button"
            onClick={onConfirmar || onCerrar}
            className={`rounded-2xl px-5 py-3 text-sm font-black text-white shadow-lg transition ${actual.boton}`}
          >
            {textoConfirmar}
          </button>
        </div>
      </div>
    </div>
  );
}