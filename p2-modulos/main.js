
import Pedido, { calcularTotal, agregarPedido, entregarPedido, eliminarPedido } from "./pedidos.js";
import { mostrarMensaje, renderLista, renderTotal } from "./ui.js";

let pedidos = [];
const form = document.getElementById("form-pedido");
const mensaje = document.getElementById("mensaje");
const filtro = document.getElementById("filtro");
const lista = document.getElementById("lista-pedidos");
const total = document.getElementById("total");

const render = () => {
  renderLista(lista, pedidos, filtro.value);
  renderTotal(total, calcularTotal(pedidos.filter((p) => p.estado === "pendiente")));
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const producto = document.getElementById("producto").value.trim();
  const precio = parseFloat(document.getElementById("precio").value);
  const cantidad = parseInt(document.getElementById("cantidad").value, 10);
  if (producto === "") return mostrarMensaje(mensaje, "Error: producto vacío.");
  if (isNaN(precio) || precio <= 0) return mostrarMensaje(mensaje, "Error: precio debe ser mayor a 0.");
  if (isNaN(cantidad) || cantidad < 0) return mostrarMensaje(mensaje, "Error: cantidad negativa.");
  pedidos = agregarPedido(pedidos, new Pedido({ producto, precio, cantidad }));
  mostrarMensaje(mensaje, "Pedido agregado.");
  form.reset();
  render();
});

filtro.addEventListener("change", render);

lista.addEventListener("click", (e) => {
  const boton = e.target.closest("button");
  if (!boton) return;
  const id = Number(boton.dataset.id);
  pedidos = boton.dataset.accion === "entregar" ? entregarPedido(pedidos, id) : eliminarPedido(pedidos, id);
  render();
});

render();