"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import styles from "./styles/dashboardAsociado.module.css";

export default function DashboardUsuario() {
  const router = useRouter();
  const [usuario, setUsuario] = useState<any>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const user =
      localStorage.getItem("usuario") || sessionStorage.getItem("usuario");

    if (!user) {
      router.replace("/login");
      return;
    }

    try {
      const data = JSON.parse(user);

      const rol = data.rol?.nombre?.toUpperCase();
      const estadoMembresia = data.asociado?.estado_membresia?.toUpperCase();

      if (rol !== "ASOCIADO" || estadoMembresia !== "ACTIVO") {
        localStorage.removeItem("token");
        localStorage.removeItem("usuario");
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("usuario");
        router.replace("/login");
        return;
      }

      setUsuario(data);
    } catch {
      localStorage.removeItem("token");
      localStorage.removeItem("usuario");
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("usuario");
      router.replace("/login");
    } finally {
      setCargando(false);
    }
  }, [router]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("usuario");
    router.replace("/login");
  };

  if (cargando) {
    return <p className={styles.loading}>Cargando...</p>;
  }

  if (!usuario) {
    return null;
  }

  return (
    <main className={styles.dashboardContainer}>
      <aside className={styles.sidebar}>
        <h2>ASEUNICESMAG</h2>

        <nav>
          <a href="/user/dashboard">Dashboard</a>
          <a href="#">Pagos</a>
          <a href="#">Certificados</a>
          <a href="#">Perfil</a>
        </nav>
      </aside>

      <section className={styles.content}>
        <header className={styles.header}>
          <div>
            <h1>Bienvenida, {usuario.nombres}</h1>
            <p>Panel de asociado</p>
          </div>

          <span>{usuario.correo}</span>
        </header>

        <div className={styles.cards}>
          <div className={styles.card}>
            <h3>Estado</h3>
            <p className={styles.success}>
              {usuario.asociado?.estado_membresia}
            </p>
          </div>

          <div className={styles.card}>
            <h3>Código</h3>
            <p>{usuario.asociado?.codigo_asociado}</p>
          </div>

          <div className={styles.card}>
            <h3>Correo</h3>
            <p>{usuario.correo}</p>
          </div>
        </div>

        <button onClick={logout} className={styles.logout}>
          Cerrar sesión
        </button>
      </section>
    </main>
  );
}