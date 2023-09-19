let carrito = [];

const productos = [
    {img: "TERMO 1L.jpeg", desc: "TERMO 1L CON MANIJA", price: "$15.000"},
    {img: "TERMO 1L SIN MANIJA.jpeg", desc: "TERMO 1L SIN MANIJA", price: "$15.500"},
    {img: "TERMO 2L.jpeg", desc: "TERMO 2L", price: "$14.500"},
    {img: "TERMO 1,2L MANIJA.jpeg", desc: "TERMO 1,2L MANIJA", price: "$16.500"},
    {img: "TERMOS PASTEL.jpeg", desc: "TERMOS PASTEL", price: "$14.850"},
    {img: "TERMO+MATE.jpeg", desc: "TERMO+MATE", price: "$20.500"},
    {img: "SET MILITAR.jpeg", desc: "SET MILITAR", price: "$32.000"},
    {img: "SET ROSA.jpeg", desc: "SET ROSA", price: "$37.000"},
    {img: "BOTELLA TERMICA.jpeg", desc: "BOTELLA TERMICA", price: "$9.200"},
];

document.addEventListener("DOMContentLoaded", function() {
    const sectionProductos = document.querySelector('.productos');

    productos.forEach(product => {
        const article = document.createElement('article');
        article.className = "producto";

        const divImagen = document.createElement('div');
        divImagen.className = "producto-imagen-contenedor";

        const img = document.createElement('img');
        img.src = "imagenes/" + product.img;

        const btn = document.createElement('button');
        btn.className = "añadir";
        btn.onclick = function() { añadirAlCarrito(product.desc); };

        const h2 = document.createElement('h2');
        h2.textContent = product.price;

        btn.appendChild(h2);
        divImagen.appendChild(img);
        divImagen.appendChild(btn);

        const h1 = document.createElement('h1');
        h1.textContent = product.desc;

        article.appendChild(divImagen);
        article.appendChild(h1);

        sectionProductos.appendChild(article);
    });
});

function añadirAlCarrito(nombreProducto) {
    const precios = {
        'TERMO 1L CON MANIJA': 15000,
        'TERMO 1L SIN MANIJA': 15500,
        'TERMO 2L': 14500,
        'TERMO 1,2L MANIJA': 16500,
        'TERMOS PASTEL': 14850,
        'TERMO+MATE': 20500,
        'SET MILITAR': 32000,
        'SET ROSA': 37000,
        'BOTELLA TERMICA': 9200
    };

    const producto = {
        id: Date.now() + Math.random().toString(16).substr(2, 8),  // genera un ID único
        nombre: nombreProducto,
        precio: precios[nombreProducto],
        cantidad: 1
    };

    carrito.push(producto);
    guardarCarritoEnLocalStorage();
}

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
        li.appendChild(spanCantidad);
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

function vaciarCarrito() {
    carrito = [];
    localStorage.removeItem('carrito');
    mostrarCarrito();
}

function actualizarTotal() {
    let total = 0;
    carrito.forEach(producto => {
        total += producto.precio * producto.cantidad;
    });
    document.getElementById("precio-total").textContent = "$" + total.toFixed(2);
}

function vaciarCarrito() {
    let confirmacion = confirm("¿Estás seguro de que quieres vaciar el carrito?");
    
    if (confirmacion) {
        carrito = [];
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
