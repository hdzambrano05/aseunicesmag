"use client";

import { useEffect, useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";

type Props = {
  setFirmaBase64: (firma: string) => void;
};

export default function FirmaForm({ setFirmaBase64 }: Props) {
  const firmaRef = useRef<SignatureCanvas | null>(null);
  const contenedorRef = useRef<HTMLDivElement | null>(null);

  const [modoFirma, setModoFirma] = useState<"dibujar" | "subir">("dibujar");
  const [firmaGuardada, setFirmaGuardada] = useState(false);

  const ajustarCanvas = () => {
    const canvas = firmaRef.current?.getCanvas();
    const contenedor = contenedorRef.current;

    if (!canvas || !contenedor) return;

    const ratio = Math.max(window.devicePixelRatio || 1, 1);
    const ancho = contenedor.offsetWidth;
    const alto = 170;

    canvas.width = ancho * ratio;
    canvas.height = alto * ratio;
    canvas.getContext("2d")?.scale(ratio, ratio);

    canvas.style.width = `${ancho}px`;
    canvas.style.height = `${alto}px`;

    firmaRef.current?.clear();
    setFirmaBase64("");
    setFirmaGuardada(false);
  };

  useEffect(() => {
    if (modoFirma === "dibujar") {
      setTimeout(ajustarCanvas, 80);
      window.addEventListener("resize", ajustarCanvas);
    }

    return () => window.removeEventListener("resize", ajustarCanvas);
  }, [modoFirma]);

  const limpiarFirma = () => {
    firmaRef.current?.clear();
    setFirmaBase64("");
    setFirmaGuardada(false);
  };

  const guardarFirmaDibujada = () => {
    if (!firmaRef.current || firmaRef.current.isEmpty()) {
      alert("Por favor dibuje su firma.");
      return;
    }

    const firma = firmaRef.current.getTrimmedCanvas().toDataURL("image/png");
    setFirmaBase64(firma);
    setFirmaGuardada(true);
  };

  const subirFirma = (e: React.ChangeEvent<HTMLInputElement>) => {
    const archivo = e.target.files?.[0];
    if (!archivo) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setFirmaBase64(reader.result as string);
      setFirmaGuardada(true);
    };

    reader.readAsDataURL(archivo);
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-4 flex flex-col gap-2 border-b border-slate-200 pb-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-base font-bold text-slate-900">
            Firma del solicitante
          </h2>
          <p className="text-xs text-slate-500">
            Dibuje la firma o cargue una imagen.
          </p>
        </div>

        {firmaGuardada && (
          <span className="w-fit rounded-md border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
            Firma registrada
          </span>
        )}
      </div>

      <div className="mb-4 grid grid-cols-2 rounded-lg border border-slate-200 bg-slate-50 p-1">
        <button
          type="button"
          className={`rounded-md px-3 py-2 text-xs font-semibold transition ${
            modoFirma === "dibujar"
              ? "bg-blue-700 text-white shadow-sm"
              : "text-slate-600 hover:bg-white"
          }`}
          onClick={() => {
            setModoFirma("dibujar");
            setFirmaBase64("");
            setFirmaGuardada(false);
          }}
        >
          Dibujar firma
        </button>

        <button
          type="button"
          className={`rounded-md px-3 py-2 text-xs font-semibold transition ${
            modoFirma === "subir"
              ? "bg-blue-700 text-white shadow-sm"
              : "text-slate-600 hover:bg-white"
          }`}
          onClick={() => {
            setModoFirma("subir");
            limpiarFirma();
          }}
        >
          Subir imagen
        </button>
      </div>

      {modoFirma === "dibujar" && (
        <div>
          <div
            ref={contenedorRef}
            className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-2"
          >
            <SignatureCanvas
              ref={firmaRef}
              penColor="#0f172a"
              minWidth={1}
              maxWidth={2.5}
              canvasProps={{
                className:
                  "block w-full cursor-crosshair rounded-md bg-white shadow-inner touch-none",
              }}
            />
          </div>

          <p className="mt-2 text-xs text-slate-500">
            Dibuje dentro del recuadro blanco.
          </p>

          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              onClick={guardarFirmaDibujada}
              className="rounded-lg bg-blue-700 px-5 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-blue-800"
            >
              Guardar firma
            </button>

            <button
              type="button"
              onClick={limpiarFirma}
              className="rounded-lg border border-slate-300 bg-white px-5 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Limpiar
            </button>
          </div>
        </div>
      )}

      {modoFirma === "subir" && (
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <label className="mb-2 block text-xs font-semibold text-slate-700">
            Cargar firma en imagen *
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={subirFirma}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-700 outline-none file:mr-3 file:rounded-md file:border-0 file:bg-blue-50 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-blue-700 hover:file:bg-blue-100 focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
          />

          <p className="mt-2 text-xs text-slate-500">
            Formatos permitidos: JPG o PNG.
          </p>
        </div>
      )}
    </div>
  );
}