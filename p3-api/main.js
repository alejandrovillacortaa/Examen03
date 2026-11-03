import { climaDeCiudad } from "./clima.js";
import { medir } from "./tiempos.js";

const form = document.getElementById("form-clima");
const input = document.getElementById("ciudad");
const boton = document.getElementById("buscar");
const resultado = document.getElementById("resultado");
const botonMedir = document.getElementById("medir");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const nombre = input.value.trim();
  if (nombre === "") {
    resultado.textContent = "Escribe el nombre de una ciudad.";
    return;
  }
  resultado.textContent = "Cargando…";
  boton.disabled = true;
  try {
    const c = await climaDeCiudad(nombre);
    resultado.textContent = `${c.ciudad} (${c.region ?? "sin región"}): ${c.temperatura} °C, viento ${c.viento} km/h`;
  } catch (error) {
    if (error instanceof TypeError) {
      resultado.textContent = "Sin conexión: revisa tu internet.";
    } else {
      resultado.textContent = error.message;
    }
  } finally {
    boton.disabled = false;
  }
});

botonMedir.addEventListener("click", medir);