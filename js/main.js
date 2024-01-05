const { createApp } = Vue

createApp({
    data() {
        return {
            productos: [],
            carrito: [],
            prods: [],
            cantidadProductosAgregados: 0,
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
        sumarEnUno(id) {
            const producto = this.productos.find(item => item.id === id);
            const productoEnCarrito = this.carrito.find(p => p.id === id);
            if (producto.cantidad > 0) {
                console.log(producto);
                console.log(productoEnCarrito)
                if (productoEnCarrito) {
                    // Si ya está en el carrito, aumenta la cantidad
                    productoEnCarrito.cantidad++;
                } else {
                    // Si no está, agregalo con cantidad 1
                    const nuevoProductoEnCarrito = {...producto, cantidad: 1 };
                    this.carrito.push(nuevoProductoEnCarrito);
                }
                console.log(this.carrito);
                console.log(`Producto ${producto.descripcion} agregado al carrito.`);
                // Guarda el carrito y la lista completa de productos en el almacenamiento local
                localStorage.setItem('carrito', JSON.stringify(this.carrito));
                localStorage.setItem('prods', JSON.stringify(this.prods));
                producto.cantidad--;
                // Calcula el total de la compra y muestra en algún lugar (por ejemplo, en un div con id="totalCompra")
                const totalCompra = this.calcularTotalCompra();
                document.getElementById('totalCompra').innerText = `Total de la compra: $${totalCompra.toFixed(2)}`;
                // Actualiza la cantidad de productos agregados
                this.cantidadProductosAgregados = this.carrito.reduce((total, p) => total + p.cantidad, 0);
                // Luego, realiza una solicitud PUT al backend Flask para restar el producto del carrito
                fetch(`http://localhost:5000/productos/resta/${id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json' // Asegúrate de configurar el tipo de medio correctamente
                        },
                        body: JSON.stringify({ cantidad: producto.cantidad }) // Asegúrate de enviar un cuerpo JSON válido
                    })
                    .then(response => response.json())
                    .then(data => console.log(data))
                    .catch(error => console.error('Error:', error));
                /////////////////////////
                console.log("Contenido del Local Storage - carrito:", localStorage.getItem('carrito'));
            } else {
                alert('La cantidad no puede ser menor que 0.');
            }
        },
        calcularTotalCompra() {
            // Calcula el total de la compra multiplicando la cantidad de cada ítem por su precio y sumando todo
            return this.carrito.reduce((total, producto) => total + (producto.cantidad * producto.precioVPublico), 0);
        },
        cargarCarritoDesdeLocalStorage() {
            // Cargar el carrito almacenado en el localStorage al iniciar la aplicación
            const carritoGuardado = localStorage.getItem('carrito');
            if (carritoGuardado) {
                this.carrito = JSON.parse(carritoGuardado);
                // Actualiza la cantidad de productos agregados
                this.cantidadProductosAgregados = this.carrito.reduce((total, p) => total + p.cantidad, 0);
                // Actualiza el total de la compra
                this.actualizarTotalCompra();
            }
        },
        actualizarTotalCompra() {
            const totalCompra = this.calcularTotalCompra();
            const totalCompraElement = document.getElementById('totalCompra');
            if (totalCompraElement) {
                totalCompraElement.innerText = `Total de la compra: $${totalCompra.toFixed(2)}`;
            }
        },

    },
    created() {
        this.fetchData(this.url)
            // Llama a la función para cargar el carrito desde el localStorage
        this.cargarCarritoDesdeLocalStorage();
        // Llama a la función para actualizar el total de la compra al cargar la página
        //this.actualizarTotalCompra();
    },
    mounted() {
        // Llama a la función para actualizar el total de la compra después de que la instancia de Vue se haya montado en el DOM
        this.actualizarTotalCompra();
    }
}, ).mount('#app')