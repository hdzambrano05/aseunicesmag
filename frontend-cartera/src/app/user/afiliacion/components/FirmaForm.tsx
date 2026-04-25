"use client";

import { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import styles from "../styles/afiliacion.module.css";

type Props = {
  setFirmaBase64: (firma: string) => void;
};

export default function FirmaForm({ setFirmaBase64 }: Props) {
  const firmaRef = useRef<SignatureCanvas | null>(null);
  const [modoFirma, setModoFirma] = useState<"dibujar" | "subir">("dibujar");

  const limpiarFirma = () => {
    firmaRef.current?.clear();
    setFirmaBase64("");
  };

  const guardarFirmaDibujada = () => {
    if (!firmaRef.current || firmaRef.current.isEmpty()) {
      alert("Por favor dibuje su firma.");
      return;
    }

    const firma = firmaRef.current.getTrimmedCanvas().toDataURL("image/png");

    setFirmaBase64(firma);
    alert("Firma guardada correctamente.");
  };

  const subirFirma = (e: React.ChangeEvent<HTMLInputElement>) => {
    const archivo = e.target.files?.[0];

    if (!archivo) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setFirmaBase64(reader.result as string);
    };

    reader.readAsDataURL(archivo);
  };

  return (
    <div className={styles.section}>
      <h2>Firma del solicitante</h2>

      <div className={styles.firmaTabs}>
        <button
          type="button"
          className={modoFirma === "dibujar" ? styles.tabActivo : styles.tab}
          onClick={() => setModoFirma("dibujar")}
        >
          Dibujar firma
        </button>

        <button
          type="button"
          className={modoFirma === "subir" ? styles.tabActivo : styles.tab}
          onClick={() => setModoFirma("subir")}
        >
          Subir firma
        </button>
      </div>

      {modoFirma === "dibujar" && (
        <>
          <div className={styles.firmaBox}>
            <SignatureCanvas
              ref={firmaRef}
              penColor="black"
              canvasProps={{
                className: styles.firmaCanvas,
              }}
            />
          </div>

          <div className={styles.firmaActions}>
            <button
              type="button"
              className={styles.secondary}
              onClick={guardarFirmaDibujada}
            >
              Guardar firma
            </button>

            <button
              type="button"
              className={styles.deleteButton}
              onClick={limpiarFirma}
            >
              Limpiar
            </button>
          </div>
        </>
      )}

      {modoFirma === "subir" && (
        <div>
          <label className={styles.label}>Subir firma en imagen *</label>
          <input
            className={styles.input}
            type="file"
            accept="image/*"
            onChange={subirFirma}
          />
        </div>
      )}
    </div>
  );
}
