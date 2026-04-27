import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-10">
      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8">
        {/* Marca */}
        <div>
          <h2 className="text-white text-lg font-bold">ASEUNICESMAG</h2>
          <p className="mt-3 text-sm text-slate-400">
            Asociación de egresados comprometida con el desarrollo profesional,
            académico y social de sus miembros.
          </p>
        </div>

        {/* Enlaces */}
        <div>
          <h3 className="text-white font-semibold mb-3">Enlaces</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/home" className="hover:text-white">
                Inicio
              </Link>
            </li>
            <li>
              <Link href="/user/afiliacion" className="hover:text-white">
                Afiliación
              </Link>
            </li>
            <li>
              <Link href="/login" className="hover:text-white">
                Login
              </Link>
            </li>
          </ul>
        </div>

        {/* Contacto */}
        <div>
          <h3 className="text-white font-semibold mb-3">Contacto</h3>
          <p className="text-sm">📍 Pasto, Nariño</p>
          <p className="text-sm">📧 contacto@aseunicesmag.com</p>
          <p className="text-sm">📞 +57 300 000 0000</p>
        </div>
      </div>

      {/* Línea inferior */}
      <div className="border-t border-slate-700 text-center text-sm py-4 text-slate-400">
        © {new Date().getFullYear()} ASEUNICESMAG - Todos los derechos
        reservados
      </div>
    </footer>
  );
}
