const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
}

async function request(url: string, options: RequestInit = {}) {
  const token = getToken();

  const response = await fetch(`${API_URL}${url}`, {
    ...options,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(options.headers || {}),
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || "Error en la petición");
  }

  return data;
}

export async function listarRecibosPago(estado = "") {
  const query = estado ? `?estado=${estado}` : "";

  return await request(`/recibos-pago${query}`);
}

export async function aprobarReciboPago(id: number, observacion_admin = "") {
  return await request(`/recibos-pago/${id}/aprobar`, {
    method: "POST",
    body: JSON.stringify({
      observacion_admin,
    }),
  });
}

export async function rechazarReciboPago(
  id: number,
  observacion_admin: string,
) {
  return await request(`/recibos-pago/${id}/rechazar`, {
    method: "POST",
    body: JSON.stringify({
      observacion_admin,
    }),
  });
}

export async function descargarArchivoRecibo(id: number) {
  try {
    const token = getToken();

    const response = await fetch(`${API_URL}/recibos-pago/${id}/archivo`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "*/*",
      },
    });

    if (!response.ok) {
      throw new Error("No se pudo descargar el archivo");
    }

    const blob = await response.blob();

    const url = window.URL.createObjectURL(blob);

    window.open(url, "_blank");

    setTimeout(() => {
      window.URL.revokeObjectURL(url);
    }, 10000);
  } catch (error) {
    console.error(error);
    alert("Error al abrir el archivo");
  }
}
