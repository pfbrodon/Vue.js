const { createApp } = Vue

createApp({
    data() {
        return {
            carrito: []
        }
    },
    methods: {
        calcularSubtotal: function(item) {
            return item.cantidad * item.precioVPublico;
        },
        calcularTotal: function() {
            // Suma los subtotales utilizando reduce
            return this.carrito.reduce((total, item) => total + this.calcularSubtotal(item), 0);
        },
        borrarCarrito() {
            // Lógica para borrar el carrito del localStorage
            localStorage.removeItem('carrito');
            // Puedes también limpiar la data del carrito en tu componente si lo necesitas
            // Limpiar el carrito en el estado local
            this.carrito = [];
        }
    },
    mounted() {
        // Obtén el contenido del Local Storage y asigna a la propiedad 'productos'
        const carritoFromLocalStorage = JSON.parse(localStorage.getItem('carrito'));
        this.carrito = carritoFromLocalStorage;
        console.log(carritoFromLocalStorage)
    },


}, ).mount('#carrito')