let carrito = [];

function mostrarCarrito() {
    const listaCarrito = document.getElementById("lista-carrito");
    listaCarrito.innerHTML = '';

    let total = 0;

    carrito.forEach(producto => {
        total += producto.precio * producto.cantidad;

        const li = document.createElement("li");
        li.classList.add('item-carrito');
        
        const spanEliminar = document.createElement("span");
        spanEliminar.classList.add('producto-eliminar');
        const imagenEliminar = document.createElement("img");
        imagenEliminar.setAttribute('src', 'Imagenes/X eliminar.png');
        imagenEliminar.setAttribute('alt', 'Eliminar');
        imagenEliminar.classList.add('imagen-eliminar');
        imagenEliminar.onclick = function() {
            eliminarDelCarrito(producto.id);
        }
        spanEliminar.appendChild(imagenEliminar);
        
        const spanNombre = document.createElement("span");
        spanNombre.classList.add('producto-nombre');
        spanNombre.textContent = producto.nombre;

        const spanPrecio = document.createElement("span");
        spanPrecio.classList.add('producto-precio');
        spanPrecio.textContent = '$' + producto.precio;

        const spanCantidad = document.createElement("span");
        spanCantidad.classList.add('producto-cantidad');
        spanCantidad.textContent = producto.cantidad;

        li.appendChild(spanEliminar);
        li.appendChild(spanNombre);
        li.appendChild(spanPrecio);

        listaCarrito.appendChild(li);
    });

    actualizarTotal();
}

function eliminarDelCarrito(idProductoAEliminar) {
    carrito = carrito.filter(producto => producto.id !== idProductoAEliminar);
    guardarCarritoEnLocalStorage();
    mostrarCarrito();
}

function cerrarCarrito() {
    document.getElementById("carrito").style.display = "none";
}

function guardarCarritoEnLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function cargarCarritoDesdeLocalStorage() {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
    }
}

function actualizarTotal() {
    let total = carrito.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0);
    document.getElementById("precio-total").textContent = "$" + total.toFixed(2);
}

function vaciarCarrito() {
    const confirmacion = confirm("¿Estás seguro de que quieres vaciar el carrito?");
    if (confirmacion) {
        carrito.length = 0;
        localStorage.removeItem('carrito');
        mostrarCarrito();
    }
}

function redirigirAWhatsApp() {
    let numeroWhatsApp = "2657584675";
    
    let mensaje = "¡Hola! Estoy interesado en hacer una compra. Estos son los productos que quiero:\n\n";
    carrito.forEach(producto => {
        mensaje += `* ${producto.nombre} - Precio: $${producto.precio}\n`;
    });
    mensaje += "\n¿Podrías ayudarme con eso?";
    
    let url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
}

cargarCarritoDesdeLocalStorage();
