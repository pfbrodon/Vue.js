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
        restarEnUno(id) {
            const producto = this.productos.find(item => item.id === id);
            if (producto && producto.cantidad > 0) {
                producto.cantidad--;
                // Aquí puedes realizar alguna acción adicional después de restar en 1,
                // como guardar el cambio en el backend mediante una llamada a la API.
                // Puedes agregar la lógica aquí según tus necesidades.
                // Por ejemplo:
                //this.actualizarCantidadEnBackend(id, producto.cantidad);
            } else {
                alert('La cantidad no puede ser menor que 0.');
            }
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
                /////////////////////////
                console.log("Contenido del Local Storage - carrito:", localStorage.getItem('carrito'));
                this.mostrarLocalStorage();
                // Aquí puedes realizar alguna acción adicional después de restar en 1,
                // como guardar el cambio en el backend mediante una llamada a la API.
                // Puedes agregar la lógica aquí según tus necesidades.
                // Por ejemplo:
                //this.actualizarCantidadEnBackend(id, producto.cantidad);
            } else {
                alert('La cantidad no puede ser menor que 0.');
            }
        },
        calcularTotalCompra() {
            // Calcula el total de la compra multiplicando la cantidad de cada ítem por su precio y sumando todo
            return this.carrito.reduce((total, producto) => total + (producto.cantidad * producto.precioVPublico), 0);
        },
        //////////////////////////////////////////////////

        //////////////////////////////////////////////////
        mostrarLocalStorage() {
            // Obtén y muestra el contenido del Local Storage
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                const value = localStorage.getItem(key);
                console.log(`Key: ${key}, Value: ${value}`);
            }
            // Obtén el carrito del Local Storage y muéstralo en la lista
            const carritoFromLocalStorage = JSON.parse(localStorage.getItem('carrito'));
            if (carritoFromLocalStorage) {
                this.carrito = carritoFromLocalStorage;
            }
        },
    },
    created() {
        this.fetchData(this.url)
    }
}, ).mount('#app')