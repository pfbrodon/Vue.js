const { createApp } = Vue

createApp({
    data() {
        return {
            productos: [],
            url: "http://127.0.0.1:5000/productos"
        }
    },
    methods: {
        fetchData(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    this.productos = data;
                })
                .catch(error => alert("Ups...se produjo un error:"))
        },
        agregarAlCarrito(producto) {
            // Obtener el carrito del localStorage (o crear uno si no existe)
            const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
            // Agregar el producto al carrito
            carrito.push(producto);
            // Guardar el carrito actualizado en el localStorage
            localStorage.setItem('carrito', JSON.stringify(carrito));
            alert('Producto agregado al carrito');
        },
    },
    created() {
        this.fetchData(this.url)
    },
}).mount('#app')