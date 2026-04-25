import styles from "../styles/afiliacion.module.css";

type Beneficiario = {
  identificacion: string;
  nombres: string;
  parentesco: string;
};

type Props = {
  beneficiarios: Beneficiario[];
  agregarBeneficiario: () => void;
  eliminarBeneficiario: (index: number) => void;
};

export default function BeneficiariosForm({
  beneficiarios,
  agregarBeneficiario,
  eliminarBeneficiario,
}: Props) {
  return (
    <div className={styles.section}>
      <h2>2. Información familiar y beneficiarios</h2>

      {beneficiarios.map((_, index) => (
        <div key={index} className={styles.beneficiarioBox}>
          <div className={styles.grid3}>
            <input
              className={styles.input}
              name={`beneficiarios[${index}][identificacion]`}
              placeholder="Identificación"
            />

            <input
              className={styles.input}
              name={`beneficiarios[${index}][nombres]`}
              placeholder="Apellidos y nombres"
            />

            <input
              className={styles.input}
              name={`beneficiarios[${index}][parentesco]`}
              placeholder="Parentesco"
            />
          </div>

          {beneficiarios.length > 1 && (
            <button
              type="button"
              className={styles.deleteButton}
              onClick={() => eliminarBeneficiario(index)}
            >
              Eliminar beneficiario
            </button>
          )}
        </div>
      ))}

      <button
        type="button"
        onClick={agregarBeneficiario}
        className={styles.secondary}
      >
        Agregar beneficiario
      </button>
    </div>
  );
}
