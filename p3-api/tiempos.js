import { climaDeCiudad } from "./clima.js";
const ciudades = ["Lima", "Cusco", "Arequipa"];

export async function secuencial() {
  const ini = performance.now();
  const r1 = await climaDeCiudad(ciudades[0]);
  const r2 = await climaDeCiudad(ciudades[1]);
  const r3 = await climaDeCiudad(ciudades[2]);
  return { tiempo: performance.now() - ini, datos: [r1, r2, r3] };
}

export async function paralelo() {
  const ini = performance.now();
  const datos = await Promise.all(ciudades.map((c) => climaDeCiudad(c)));
  return { tiempo: performance.now() - ini, datos };
}

export async function conAllSettled(lista) {
  const resultados = await Promise.allSettled(lista.map((c) => climaDeCiudad(c)));
  return resultados.map((r, i) =>
    r.status === "fulfilled"
      ? { ciudad: lista[i], ok: true, dato: r.value }
      : { ciudad: lista[i], ok: false, error: r.reason.message }
  );
}

export async function medir() {
  for (let i = 1; i <= 3; i++) {
    const s = await secuencial();
    console.log(`Secuencial #${i}: ${s.tiempo.toFixed(0)} ms`);
  }
  for (let i = 1; i <= 3; i++) {
    const p = await paralelo();
    console.log(`Promise.all #${i}: ${p.tiempo.toFixed(0)} ms`);
  }
  console.log(await conAllSettled(["Lima", "Xyzabc", "Cusco"]));
}