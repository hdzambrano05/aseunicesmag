const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function obtenerEstadoPagoAsociado(asociadoId: number) {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API_URL}/asociado/${asociadoId}/estado-pago`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error("Error al consultar estado de pago");
  }

  return response.json();
}
