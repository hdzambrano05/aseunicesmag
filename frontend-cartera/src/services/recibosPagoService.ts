const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
}

export async function subirReciboPago(formData: FormData) {
  const token = getToken();

  const response = await fetch(`${API_URL}/recibos-pago`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  return await response.json();
}

export async function obtenerMisRecibos() {
  const token = getToken();

  const response = await fetch(`${API_URL}/recibos-pago/mis-recibos`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  return await response.json();
}