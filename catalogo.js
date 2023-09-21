document.addEventListener('DOMContentLoaded', (event) => {
    const sectionProductos = document.querySelector('.productos');
    if (!sectionProductos) return;

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

    productos.forEach(product => {
        const article = document.createElement('article');
        article.className = "producto";
    
        const divImagen = document.createElement('div');
        divImagen.className = "producto-imagen-contenedor";
    
        const img = document.createElement('img');
        img.src = "imagenes/" + product.img;
        img.onclick = function() { añadirAlCarrito(product); };
        divImagen.appendChild(img);
    
        const h2 = document.createElement('h2');
        h2.textContent = product.price;
        divImagen.appendChild(h2);
    
        const h1 = document.createElement('h1');
        h1.textContent = product.desc;
    
        article.appendChild(divImagen);
        article.appendChild(h1);
    
        sectionProductos.appendChild(article);
    });
});

function añadirAlCarrito(productoSeleccionado) {
    const producto = {
        id: Date.now() + Math.random().toString(16).substr(2, 8),
        nombre: productoSeleccionado.desc,
        precio: parseInt(productoSeleccionado.price.replace('$', '').replace('.', '')),  // Convertir el precio a número
        cantidad: 1
    };

    carrito.push(producto);
    guardarCarritoEnLocalStorage();

    actualizarBadge();
}

function actualizarBadge() {
    const badge = document.getElementById("carrito-badge");
    const totalProductos = carrito.reduce((total, producto) => total + producto.cantidad, 0);

    badge.textContent = totalProductos;

    if (totalProductos > 0) {
        badge.style.display = "block";
    } else {
        badge.style.display = "none";
    }
}
