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

export async function obtenerEstadoPagoAsociado(asociadoId: number) {
  return await request(`/asociado/${asociadoId}/estado-pago`);
}

export async function obtenerSmmlvActivo() {
  return await request("/smmlv-activo");
}

export async function generarSostenimiento(data: {
  asociado_id: number;
  anio: number;
  modalidad: "MENSUAL" | "SEMESTRAL" | "ANUAL";
  fecha_pago?: string;
}) {
  return await request("/obligaciones/generar-sostenimiento", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
export async function anularObligacion(id: number) {
  return await request(`/obligaciones/${id}/anular`, {
    method: "PUT",
  });
}
