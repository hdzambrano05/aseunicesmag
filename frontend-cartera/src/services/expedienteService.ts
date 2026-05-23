export interface ArchivoExpediente {
  id: number;
  origen?: string;
  modulo: string;
  tipo_archivo: string | null;
  nombre_original: string;
  ruta_archivo: string;
  extension: string;
  mime_type: string;
  peso_bytes: number;
  fecha_subida: string;
  url_descarga: string;
  estado?: string;
  valor_reportado?: string | number;
}

export interface UsuarioExpediente {
  id: number;
  nombres: string;
  apellidos: string;
  correo: string;
  numero_documento: string;
}

export interface AsociadoExpediente {
  id: number;
  codigo_asociado?: string;
  estado_membresia: string;
  usuario: UsuarioExpediente;
  archivos: ArchivoExpediente[];
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

function getToken(): string {
  if (typeof window === "undefined") return "";
  return localStorage.getItem("token") || "";
}

function normalizarUrl(url: string): string {
  if (!url) return "";

  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  return `${API_URL}${url.startsWith("/") ? url : `/${url}`}`;
}

export async function listarExpedientes(): Promise<
  ApiResponse<AsociadoExpediente[]>
> {
  const token = getToken();

  const response = await fetch(`${API_URL}/admin/expedientes`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const json = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      json?.message || json?.mensaje || "No se pudieron cargar los expedientes",
    );
  }

  return {
    success: json?.success ?? json?.status ?? true,
    message: json?.message ?? json?.mensaje ?? "",
    data: Array.isArray(json?.data)
      ? json.data
      : Array.isArray(json?.data?.data)
        ? json.data.data
        : [],
  };
}

export async function descargarArchivoExpediente(
  url: string,
  nombreArchivo: string = "archivo",
  abrirEnNuevaPestana: boolean = false,
): Promise<void> {
  const token = getToken();
  const urlFinal = normalizarUrl(url);

  const response = await fetch(urlFinal, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "*/*",
    },
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => "");
    console.error("Error descargando archivo:", errorText);
    throw new Error("No se pudo obtener el archivo");
  }

  const blob = await response.blob();
  const blobUrl = window.URL.createObjectURL(blob);

  if (abrirEnNuevaPestana) {
    window.open(blobUrl, "_blank", "noopener,noreferrer");

    setTimeout(() => {
      window.URL.revokeObjectURL(blobUrl);
    }, 1000 * 60);

    return;
  }

  const link = document.createElement("a");
  link.href = blobUrl;
  link.download = nombreArchivo || "archivo";
  document.body.appendChild(link);
  link.click();
  link.remove();

  window.URL.revokeObjectURL(blobUrl);
}

export async function descargarExcelExpedientes(): Promise<void> {
  const token = getToken();

  const response = await fetch(`${API_URL}/admin/expedientes/excel`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    },
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => "");
    console.error("Error descargando Excel:", errorText);
    throw new Error("No se pudo descargar el Excel de expedientes");
  }

  const blob = await response.blob();
  const blobUrl = window.URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = blobUrl;
  link.download = `expedientes_asociados_${new Date()
    .toISOString()
    .slice(0, 10)}.xlsx`;

  document.body.appendChild(link);
  link.click();
  link.remove();

  window.URL.revokeObjectURL(blobUrl);
}
