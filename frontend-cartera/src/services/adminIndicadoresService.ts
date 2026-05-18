const API_URL = process.env.NEXT_PUBLIC_API_URL;

function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
}

async function getJson(url: string) {
  const token = getToken();

  const response = await fetch(`${API_URL}${url}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return await response.json();
}

function obtenerTotal(response: any) {
  return response?.data?.total || response?.data?.data?.length || 0;
}

export async function contarRecibosPendientes() {
  const response = await getJson("/recibos-pago?estado=PENDIENTE");
  return obtenerTotal(response);
}

export async function contarNotificacionesNoLeidas() {
  const response = await getJson("/notificaciones?estado=NO_LEIDA");
  return obtenerTotal(response);
}