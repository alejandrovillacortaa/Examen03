export async function buscarCiudad(nombre) {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(nombre)}&count=1&language=es`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Error HTTP ${response.status} al buscar la ciudad`);
  }
  const datos = await response.json();
  if (!datos.results || datos.results.length === 0) {
    throw new Error(`No se encontró la ciudad "${nombre}"`);
  }
  return datos.results[0]; 
}

export async function obtenerClima(lat, lon) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Error HTTP ${response.status} al obtener el clima`);
  }
  const datos = await response.json();
  return datos.current; 
}

export async function climaDeCiudad(nombre) {
  const ciudad = await buscarCiudad(nombre);
  const actual = await obtenerClima(ciudad.latitude, ciudad.longitude);
  return {
    ciudad: ciudad.name,
    region: ciudad.admin1,
    temperatura: actual.temperature_2m,
    viento: actual.wind_speed_10m
  };
}