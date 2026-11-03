
export const IGV = 0.18;

export class Pedido {
  static contador = 1;

  constructor({ producto, precio, cantidad = 1, estado = "pendiente", id = Pedido.contador++ }) {
    this.id = id;
    this.producto = producto;
    this.precio = precio;
    this.cantidad = cantidad;
    this.estado = estado;
  }

  subtotal() {
    return this.precio * this.cantidad;
  }

  
  marcarEntregado() {
    return new Pedido({ ...this, estado: "entregado" });
  }
}


export const calcularTotal = (pedidos) => {
  const subtotal = pedidos.reduce(
    (acumulado, { precio, cantidad }) => acumulado + precio * (cantidad ?? 1),
    0
  );
  return subtotal + subtotal * IGV;
};

export const resumen = ({ producto, cantidad, cliente }) => {
  const nombre = cliente?.nombre ?? "Anónimo";
  return `Pedido de ${nombre}: ${producto} x${cantidad ?? 1}`;
};


export const entregarPedido = (pedidos, id) =>
  pedidos.map((p) => (p.id === id ? p.marcarEntregado() : p));

export const eliminarPedido = (pedidos, id) => pedidos.filter((p) => p.id !== id);

export const agregarPedido = (pedidos, nuevo) => [...pedidos, nuevo];

export default Pedido;