const URL_BASE = "http://localhost:8000/api";

export async function getAirports() {
  const response = await fetch(`${URL_BASE}/airports`);
  if (!response.ok) throw new Error("Error al obtener aeropuertos");
  return await response.json();
}

export async function getFlightsByAirport(airport, type) {
  const response = await fetch(`${URL_BASE}/flights/${airport}/${type}`, {
    headers: { Accept: "application/json" },
  });
  if (!response.ok) throw new Error("Error al obtener vuelos");
  return response.json();
}

export async function getLogo(url) {
  return `${URL_BASE}/airline?url=${encodeURIComponent(url)}`;
}
