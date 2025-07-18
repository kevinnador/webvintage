// Variables globales
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Elementos del DOM
const modal = document.getElementById('modal-carrito');
const abrirModalBtn = document.getElementById('icono-carrito');
const cerrarModalBtn = document.querySelector('.cerrar-modal');
const listaCarrito = document.getElementById('lista-carrito');
const totalCarrito = document.getElementById('total-carrito');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
const pagarBtn = document.getElementById('pagar');
const contadorCarrito = document.getElementById('contador-carrito');
const botonesComprar = document.querySelectorAll('button.comprar, button[data-id]');

// Abrir modal carrito
abrirModalBtn.addEventListener('click', () => {
    actualizarModal();
    modal.style.display = 'block';
});

// Cerrar modal carrito
cerrarModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Función para actualizar modal carrito
function actualizarModal() {
    listaCarrito.innerHTML = '';
    if(carrito.length === 0) {
        listaCarrito.innerHTML = '<p>Tu carrito está vacío</p>';
        totalCarrito.textContent = 'Total: $0.00';
        contadorCarrito.textContent = '0';
        return;
    }

    let total = 0;

    carrito.forEach((producto, index) => {
        const div = document.createElement('div');
        div.classList.add('producto-en-carrito');
        div.innerHTML = `
            <p>${producto.nombre} - $${producto.precio} x ${producto.cantidad}</p>
            <button class="eliminar-producto" data-index="${index}">X</button>
        `;
        listaCarrito.appendChild(div);

        total += producto.precio * producto.cantidad;
    });

    totalCarrito.textContent = `Total: $${total.toFixed(2)}`;
    contadorCarrito.textContent = carrito.reduce((acc, prod) => acc + prod.cantidad, 0);

    // Asignar evento eliminar producto
    document.querySelectorAll('.eliminar-producto').forEach(boton => {
        boton.addEventListener('click', (e) => {
            const index = e.target.dataset.index;
            carrito.splice(index, 1);
            guardarCarrito();
            actualizarModal();
        });
    });
}

// Guardar carrito en localStorage
function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Agregar productos al carrito
botonesComprar.forEach(btn => {
    btn.addEventListener('click', () => {
        const id = btn.dataset.id || btn.getAttribute('data-id');
        const nombre = btn.dataset.nombre || btn.parentElement.querySelector('h3').textContent;
        const precio = parseFloat(btn.dataset.precio) || parseFloat(btn.parentElement.querySelector('p').textContent.replace('$',''));
        
        // Buscar si ya existe producto en carrito
        const productoExistente = carrito.find(p => p.id === id);
        if(productoExistente) {
            productoExistente.cantidad += 1;
        } else {
            carrito.push({ id, nombre, precio, cantidad: 1 });
        }
        guardarCarrito();
        actualizarModal();
    });
});

// Vaciar carrito
vaciarCarritoBtn.addEventListener('click', () => {
    carrito = [];
    guardarCarrito();
    actualizarModal();
});

// Botón pagar
pagarBtn.addEventListener('click', () => {
    if(carrito.length === 0){
        alert('El carrito está vacío');
        return;
    }
    guardarCarrito(); // guardar antes de ir a compra
    window.location.href = 'compra.html';
});

// Inicializar contador al cargar la página
actualizarModal();

