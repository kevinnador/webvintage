// Obtener elementos del DOM
const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
const detalle = document.getElementById('detalle');
const carritoData = document.getElementById('carritoData');
const totalData = document.getElementById('totalCarrito');

let resumen = '';
let total = 0;

carrito.forEach(producto => {
  const subtotal = producto.precio * producto.cantidad;
  total += subtotal;

  // Mostrar en pantalla
  const item = document.createElement('p');
  item.textContent = `${producto.nombre} - $${producto.precio} x ${producto.cantidad} = $${subtotal}`;
  detalle.appendChild(item);

  // Armar texto para enviar por Formspree
  resumen += `${producto.nombre} - $${producto.precio} x ${producto.cantidad} = $${subtotal}\n`;
});

// Mostrar total
const totalTexto = document.createElement('p');
totalTexto.innerHTML = `<strong>Total: $${total}</strong>`;
detalle.appendChild(totalTexto);

// Enviar en campos ocultos
resumen += `\nTotal: $${total}`;
carritoData.value = resumen;
totalData.value = `$${total}`;

// Vaciar carrito al enviar el formulario
document.getElementById('formulario').addEventListener('submit', () => {
  localStorage.removeItem('carrito');
});
