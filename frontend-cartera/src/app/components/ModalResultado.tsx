"use client";

type ModalResultadoProps = {
  abierto: boolean;
  tipo?: "success" | "error";
  titulo: string;
  mensaje: string;
  textoBoton?: string;
  onCerrar: () => void;
};

export default function ModalResultado({
  abierto,
  tipo = "success",
  titulo,
  mensaje,
  textoBoton = "Aceptar",
  onCerrar,
}: ModalResultadoProps) {
  if (!abierto) return null;

  const esSuccess = tipo === "success";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 text-center shadow-2xl">
        <div
          className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full text-3xl ${
            esSuccess
              ? "bg-emerald-100 text-emerald-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          {esSuccess ? "✓" : "!"}
        </div>

        <h2 className="text-xl font-bold text-slate-900">{titulo}</h2>

        <p className="mt-3 text-sm leading-6 text-slate-600">{mensaje}</p>

        <button
          type="button"
          onClick={onCerrar}
          className={`mt-6 w-full rounded-xl px-5 py-3 text-sm font-semibold text-white transition ${
            esSuccess
              ? "bg-emerald-600 hover:bg-emerald-700"
              : "bg-red-600 hover:bg-red-700"
          }`}
        >
          {textoBoton}
        </button>
      </div>
    </div>
  );
}