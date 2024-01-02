const { createApp } = Vue

createApp({
    data() {
        return {
            carrito: []
        }
    },
    mounted() {
        // Obtén el contenido del Local Storage y asigna a la propiedad 'productos'
        const carritoFromLocalStorage = JSON.parse(localStorage.getItem('carrito'));
        this.carrito = carritoFromLocalStorage;
        console.log(carritoFromLocalStorage)
    },
}, ).mount('#carrito')