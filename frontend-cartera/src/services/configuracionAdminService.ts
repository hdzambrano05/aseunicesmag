const API_URL = process.env.NEXT_PUBLIC_API_URL;

function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
}

async function requestJson(url: string, method = "GET", body?: any) {
  const token = getToken();

  const response = await fetch(`${API_URL}${url}`, {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  return await response.json();
}

/* PARAMETROS */
export async function listarParametrosSistema() {
  return await requestJson("/parametros-sistema");
}

export async function crearParametroSistema(data: any) {
  return await requestJson("/parametros-sistema", "POST", data);
}

export async function actualizarParametroSistema(id: number, data: any) {
  return await requestJson(`/parametros-sistema/${id}`, "PUT", data);
}

/* SMMLV */
export async function listarSmmlvHistorico() {
  return await requestJson("/smmlv");
}

export async function crearSmmlvHistorico(data: any) {
  return await requestJson("/smmlv", "POST", data);
}

export async function actualizarSmmlvHistorico(id: number, data: any) {
  return await requestJson(`/smmlv/${id}`, "PUT", data);
}

/* TIPOS OBLIGACION */
export async function listarTiposObligacion() {
  return await requestJson("/tipos-obligacion");
}

export async function crearTipoObligacion(data: any) {
  return await requestJson("/tipos-obligacion", "POST", data);
}

export async function actualizarTipoObligacion(id: number, data: any) {
  return await requestJson(`/tipos-obligacion/${id}`, "PUT", data);
}

/* PERIODOS */
export async function listarPeriodosCobro() {
  return await requestJson("/periodos-cobro");
}

export async function crearPeriodoCobro(data: any) {
  return await requestJson("/periodos-cobro", "POST", data);
}

export async function actualizarPeriodoCobro(id: number, data: any) {
  return await requestJson(`/periodos-cobro/${id}`, "PUT", data);
}

/* DESCUENTOS */
export async function listarDescuentos() {
  return await requestJson("/descuentos");
}

export async function crearDescuento(data: any) {
  return await requestJson("/descuentos", "POST", data);
}

export async function actualizarDescuento(id: number, data: any) {
  return await requestJson(`/descuentos/${id}`, "PUT", data);
}

/* CONFIGURACION DESCUENTOS ANUALES */
export async function listarConfiguracionDescuentosAnuales() {
  return await requestJson("/configuracion-descuentos-anuales");
}

export async function crearConfiguracionDescuentoAnual(data: any) {
  return await requestJson("/configuracion-descuentos-anuales", "POST", data);
}