const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function descargarExcelCarteraAprobados(anio?: number) {
  try {
    const token = localStorage.getItem("token");

    const url = new URL(`${API_URL}/reportes/cartera/excel`);

    if (anio) {
      url.searchParams.append("anio", anio.toString());
    }

    url.searchParams.append("solo_aprobados", "1");

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
    });

    if (!response.ok) {
      throw new Error("No se pudo descargar el Excel");
    }

    const blob = await response.blob();

    const blobUrl = window.URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = blobUrl;

    const fecha = new Date().toISOString().split("T")[0];

    link.download = `reporte-cartera-aprobados-${fecha}.xlsx`;

    document.body.appendChild(link);

    link.click();

    link.remove();

    window.URL.revokeObjectURL(blobUrl);

    return true;
  } catch (error) {
    console.error("Error descargando Excel:", error);
    throw error;
  }
}
