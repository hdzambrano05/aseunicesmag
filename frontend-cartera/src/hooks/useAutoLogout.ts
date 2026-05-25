"use client";

import { useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

const TIEMPO_INACTIVIDAD = 1000 * 60 * 30; // 30 minutos

export function useAutoLogout() {
  const router = useRouter();
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cerrarSesion = useCallback(async () => {
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
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("usuario");

      router.replace("/login");
    }
  }, [router]);

  const reiniciarTemporizador = useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current);
    }

    timer.current = setTimeout(() => {
      cerrarSesion();
    }, TIEMPO_INACTIVIDAD);
  }, [cerrarSesion]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      return;
    }

    const eventos = [
      "mousemove",
      "mousedown",
      "keydown",
      "click",
      "scroll",
      "touchstart",
    ];

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
  }, [reiniciarTemporizador]);
}