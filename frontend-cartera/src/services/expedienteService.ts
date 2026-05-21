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

export async function listarExpedientes(): Promise<
  ApiResponse<AsociadoExpediente[]>
> {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const response = await fetch(`${API_URL}/admin/expedientes`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const json = await response.json();

  return {
    success: json.success ?? json.status ?? false,
    message: json.message ?? json.mensaje ?? "",
    data: Array.isArray(json.data)
      ? json.data
      : Array.isArray(json.data?.data)
        ? json.data.data
        : [],
  };
}

export async function descargarArchivoExpediente(
  url: string,
  nombreArchivo: string,
  abrirEnNuevaPestana: boolean = false,
): Promise<void> {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "*/*",
    },
  });

  if (!response.ok) {
    throw new Error("No se pudo obtener el archivo");
  }

  const blob = await response.blob();
  const blobUrl = window.URL.createObjectURL(blob);

  if (abrirEnNuevaPestana) {
    window.open(blobUrl, "_blank");
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
