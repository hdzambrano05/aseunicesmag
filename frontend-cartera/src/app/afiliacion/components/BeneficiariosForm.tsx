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
  const inputClass =
    "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-700 focus:ring-4 focus:ring-blue-100";

  const labelClass = "mb-2 block text-sm font-semibold text-slate-700";

  return (
    <div>
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            2. Información familiar y beneficiarios
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Registre los beneficiarios asociados a la solicitud.
          </p>
        </div>

        <span className="inline-flex w-fit rounded-full bg-blue-50 px-4 py-2 text-xs font-bold uppercase tracking-wide text-blue-700">
          {beneficiarios.length} beneficiario(s)
        </span>
      </div>

      <div className="space-y-5">
        {beneficiarios.map((_, index) => (
          <div
            key={index}
            className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm"
          >
            <div className="mb-4 flex items-center justify-between gap-3">
              <h3 className="text-sm font-black uppercase tracking-wide text-slate-700">
                Beneficiario {index + 1}
              </h3>

              {beneficiarios.length > 1 && (
                <button
                  type="button"
                  className="rounded-xl border border-red-200 bg-white px-4 py-2 text-xs font-bold text-red-700 transition hover:bg-red-50"
                  onClick={() => eliminarBeneficiario(index)}
                >
                  Eliminar
                </button>
              )}
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              <div>
                <label className={labelClass}>Identificación</label>
                <input
                  className={inputClass}
                  name={`beneficiarios[${index}][identificacion]`}
                  placeholder="Ej: 1085..."
                />
              </div>

              <div>
                <label className={labelClass}>Apellidos y nombres</label>
                <input
                  className={inputClass}
                  name={`beneficiarios[${index}][nombres]`}
                  placeholder="Nombre completo"
                />
              </div>

              <div>
                <label className={labelClass}>Parentesco</label>
                <input
                  className={inputClass}
                  name={`beneficiarios[${index}][parentesco]`}
                  placeholder="Ej: Hijo(a), esposo(a)"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={agregarBeneficiario}
        className="mt-6 rounded-xl border border-blue-200 bg-blue-50 px-6 py-3 text-sm font-bold text-blue-700 transition hover:bg-blue-100"
      >
        + Agregar beneficiario
      </button>
    </div>
  );
}