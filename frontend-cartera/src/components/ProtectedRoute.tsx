"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

type Props = {
  children: React.ReactNode;
  rolesPermitidos: string[];
};

export default function ProtectedRoute({ children, rolesPermitidos }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [permitido, setPermitido] = useState(false);

  const rolesNormalizados = useMemo(
    () => rolesPermitidos.map((rol) => String(rol).toUpperCase()),
    [rolesPermitidos],
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    const usuarioStorage = localStorage.getItem("usuario");

    if (!token || !usuarioStorage) {
      router.replace("/login");
      return;
    }

    try {
      const usuario = JSON.parse(usuarioStorage);

      const rol =
        typeof usuario?.rol === "object"
          ? usuario?.rol?.nombre
          : usuario?.rol || usuario?.tipo_usuario || "";

      const rolNormalizado = String(rol).toUpperCase();

      const tienePermiso = rolesNormalizados.includes(rolNormalizado);

      if (!tienePermiso) {
        if (rolNormalizado === "ADMIN" || rolNormalizado === "ADMINISTRADOR") {
          router.replace("/admin/dashboard");
        } else {
          router.replace("/usuario/dashboard");
        }

        return;
      }

      if (
        pathname.startsWith("/admin") &&
        rolNormalizado !== "ADMIN" &&
        rolNormalizado !== "ADMINISTRADOR"
      ) {
        router.replace("/usuario/dashboard");
        return;
      }

      setPermitido(true);
    } catch {
      localStorage.removeItem("token");
      localStorage.removeItem("usuario");
      router.replace("/login");
    }
  }, [router, pathname, rolesNormalizados]);

  if (!permitido) {
    return null;
  }

  return <>{children}</>;
}
