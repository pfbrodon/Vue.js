const { createApp } = Vue

createApp({
    data() {
        return {
            carrito: []
        }
    },
    mounted() {
        // Obtén el contenido del Local Storage y asigna a la propiedad 'productos'
        const productosEnLocalStorage = JSON.parse(localStorage.getItem('carrito')) || [];
        this.carrito = productosEnLocalStorage;
    },


    created() {
        this.fetchData(this.url)

    }
}, ).mount('#carrito')