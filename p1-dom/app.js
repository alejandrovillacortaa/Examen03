let contadorId = 1;
let pedidos = [];

function crearPedido(producto, precio, cantidad) {
  const pedido = {
    id: contadorId,
    producto: producto,
    precio: precio,
    cantidad: cantidad,
    estado: "pendiente",
    subtotal() {
      return this.precio * this.cantidad;
    },
    marcarEntregado() {
      this.estado = "entregado";
    }
  };
  contadorId = contadorId + 1;
  return pedido;
}

const formulario = document.getElementById("form-pedido");
const inputProducto = document.getElementById("producto");
const inputPrecio = document.getElementById("precio");
const inputCantidad = document.getElementById("cantidad");
const mensaje = document.getElementById("mensaje");
const filtro = document.getElementById("filtro");
const lista = document.getElementById("lista-pedidos");
const total = document.getElementById("total");

function render() {
  lista.textContent = "";
  const estadoFiltro = filtro.value;
  let suma = 0;

  for (let i = 0; i < pedidos.length; i++) {
    const p = pedidos[i];

    if (p.estado === "pendiente") {
      suma = suma + p.subtotal();
    }

    if (estadoFiltro !== "todos" && p.estado !== estadoFiltro) {
      continue;
    }

    const li = document.createElement("li");
    li.textContent = p.producto + " - S/ " + p.precio.toFixed(2) +
      " x " + p.cantidad + " = S/ " + p.subtotal().toFixed(2) +
      " [" + p.estado + "] ";

    if (p.estado === "pendiente") {
      const botonEntregar = document.createElement("button");
      botonEntregar.textContent = "Entregar";
      botonEntregar.dataset.id = p.id;
      botonEntregar.dataset.accion = "entregar";
      li.appendChild(botonEntregar);
    }

    const botonEliminar = document.createElement("button");
    botonEliminar.textContent = "Eliminar";
    botonEliminar.dataset.id = p.id;
    botonEliminar.dataset.accion = "eliminar";
    li.appendChild(botonEliminar);

    lista.appendChild(li);
  }

  total.textContent = "Total a cobrar (pendientes): S/ " + suma.toFixed(2);
}

formulario.addEventListener("submit", function (event) {
  event.preventDefault();

  const producto = inputProducto.value.trim();
  const precio = parseFloat(inputPrecio.value);
  const cantidad = parseInt(inputCantidad.value, 10);

  if (producto === "") {
    mensaje.textContent = "Error: el producto no puede estar vacío.";
    return;
  }
  if (isNaN(precio) || precio <= 0) {
    mensaje.textContent = "Error: el precio debe ser mayor a 0.";
    return;
  }
  if (isNaN(cantidad) || cantidad < 0) {
    mensaje.textContent = "Error: la cantidad no puede ser negativa.";
    return;
  }

  pedidos.push(crearPedido(producto, precio, cantidad));
  mensaje.textContent = "Pedido agregado.";
  formulario.reset();
  render();
});

filtro.addEventListener("change", render);

lista.addEventListener("click", function (event) {
  const boton = event.target.closest("button");
  if (boton === null || !lista.contains(boton)) {
    return;
  }
  const id = Number(boton.dataset.id);

  if (boton.dataset.accion === "entregar") {
    for (let i = 0; i < pedidos.length; i++) {
      if (pedidos[i].id === id) {
        pedidos[i].marcarEntregado();
      }
    }
  } else if (boton.dataset.accion === "eliminar") {
    const nuevos = [];
    for (let i = 0; i < pedidos.length; i++) {
      if (pedidos[i].id !== id) {
        nuevos.push(pedidos[i]);
      }
    }
    pedidos = nuevos;
  }
  render();
});

render();