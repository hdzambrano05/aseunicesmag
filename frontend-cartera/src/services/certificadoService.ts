const API_URL = process.env.NEXT_PUBLIC_API_URL;

export type UsuarioCertificado = {
  nombres?: string;
  apellidos?: string;
  numero_documento?: string;
  correo?: string;
};

export type AsociadoCertificado = {
  codigo_asociado: string;
  id: number;
  estado_membresia?: string;
  programa_academico?: string;
  usuario?: UsuarioCertificado;
};

const getToken = () => {
  return localStorage.getItem("token");
};

export const buscarAsociadosCertificado = async (
  busqueda: string,
): Promise<AsociadoCertificado[]> => {
  const token = getToken();

  const res = await fetch(
    `${API_URL}/certificados/buscar-asociados?search=${encodeURIComponent(
      busqueda,
    )}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Error buscando asociados");
  }

  return data.data ?? [];
};

export const generarEstadoCuentaPdf = async (
  asociadoId: number,
): Promise<Blob> => {
  const token = getToken();

  const res = await fetch(
    `${API_URL}/certificados/${asociadoId}/estado-cuenta`,
    {
      method: "GET",
      headers: {
        Accept: "application/pdf",
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!res.ok) {
    throw new Error("No se pudo generar el certificado");
  }

  return await res.blob();
};
