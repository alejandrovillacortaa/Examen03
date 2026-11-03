
export function mostrarMensaje(elemento, texto) {
  elemento.textContent = texto;
}

export function renderLista(ul, pedidos, filtro) {
  ul.textContent = "";
  for (const p of pedidos) {
    if (filtro !== "todos" && p.estado !== filtro) continue;
    const li = document.createElement("li");
    li.textContent = `${p.producto} x${p.cantidad} = S/ ${p.subtotal().toFixed(2)} [${p.estado}] `;
    for (const accion of ["entregar", "eliminar"]) {
      if (accion === "entregar" && p.estado === "entregado") continue;
      const b = document.createElement("button");
      b.textContent = accion === "entregar" ? "Entregar" : "Eliminar";
      b.dataset.id = p.id;
      b.dataset.accion = accion;
      li.appendChild(b);
    }
    ul.appendChild(li);
  }
}

export function renderTotal(elemento, valor) {
  elemento.textContent = `Total con IGV: S/ ${valor.toFixed(2)}`;
}