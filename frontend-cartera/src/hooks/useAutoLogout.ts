"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

const TIEMPO_INACTIVIDAD = 1000 * 60 * 30; // 30 minutos

export function useAutoLogout() {
  const router = useRouter();
  const timer = useRef<NodeJS.Timeout | null>(null);

  const cerrarSesion = async () => {
    const token = localStorage.getItem("token");

    try {
      if (token) {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/logout`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });
      }
    } catch (error) {
      console.error("Error cerrando sesión:", error);
    }

    localStorage.removeItem("token");
    localStorage.removeItem("usuario");

    router.replace("/login");
  };

  const reiniciarTemporizador = () => {
    if (timer.current) {
      clearTimeout(timer.current);
    }

    timer.current = setTimeout(() => {
      cerrarSesion();
    }, TIEMPO_INACTIVIDAD);
  };

  useEffect(() => {
    const eventos = ["mousemove", "keydown", "click", "scroll", "touchstart"];

    eventos.forEach((evento) => {
      window.addEventListener(evento, reiniciarTemporizador);
    });

    reiniciarTemporizador();

    return () => {
      eventos.forEach((evento) => {
        window.removeEventListener(evento, reiniciarTemporizador);
      });

      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, []);
}