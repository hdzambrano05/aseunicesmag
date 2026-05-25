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
  const MAX_BENEFICIARIOS = 3;

  const inputClass =
    "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-700 focus:ring-4 focus:ring-blue-100";

  const labelClass = "mb-2 block text-sm font-semibold text-slate-700";

  const puedeAgregar = beneficiarios.length < MAX_BENEFICIARIOS;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Información familiar y beneficiarios
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Registre hasta tres beneficiarios asociados a la solicitud.
          </p>
        </div>

        <span className="inline-flex w-fit rounded-full bg-blue-50 px-4 py-2 text-xs font-bold uppercase tracking-wide text-blue-700">
          {beneficiarios.length} / {MAX_BENEFICIARIOS} beneficiario(s)
        </span>
      </div>

      <div className="space-y-5">
        {beneficiarios.map((beneficiario, index) => (
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
                  onClick={() => eliminarBeneficiario(index)}
                  className="rounded-xl border border-red-200 bg-white px-4 py-2 text-xs font-bold text-red-700 transition hover:bg-red-50"
                >
                  Eliminar
                </button>
              )}
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              <div>
                <label className={labelClass}>Identificación</label>
                <input
                  type="text"
                  className={inputClass}
                  name={`beneficiarios[${index}][identificacion]`}
                  defaultValue={beneficiario.identificacion}
                  placeholder="Ej: 1085..."
                  required
                />
              </div>

              <div>
                <label className={labelClass}>Apellidos y nombres</label>
                <input
                  type="text"
                  className={inputClass}
                  name={`beneficiarios[${index}][nombres]`}
                  defaultValue={beneficiario.nombres}
                  placeholder="Nombre completo"
                  required
                />
              </div>

              <div>
                <label className={labelClass}>Parentesco</label>
                <input
                  type="text"
                  className={inputClass}
                  name={`beneficiarios[${index}][parentesco]`}
                  defaultValue={beneficiario.parentesco}
                  placeholder="Ej: Hijo(a), esposo(a)"
                  required
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div>
        <button
          type="button"
          onClick={agregarBeneficiario}
          disabled={!puedeAgregar}
          className={`rounded-xl px-6 py-3 text-sm font-bold transition ${
            puedeAgregar
              ? "border border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100"
              : "cursor-not-allowed border border-slate-200 bg-slate-100 text-slate-400"
          }`}
        >
          + Agregar beneficiario
        </button>

        {!puedeAgregar && (
          <p className="mt-2 text-sm font-medium text-slate-500">
            Solo se permiten máximo 3 beneficiarios.
          </p>
        )}
      </div>
    </div>
  );
}
