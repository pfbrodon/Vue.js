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
methods: {
    calcularSubtotal: function (item) {
        return item.cantidad * item.precioVPublico;
    },
    calcularTotal: function () {
        // Suma los subtotales utilizando reduce
        return this.carrito.reduce((total, item) => total + this.calcularSubtotal(item), 0);
    }    
},

}, ).mount('#carrito')