const { createApp } = Vue

createApp({
    data() {
        return {
            productos: [],
            carrito:[],
            prods: [],
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
                    const nuevoProductoEnCarrito = { ...producto, cantidad: 1 };
                    this.carrito.push(nuevoProductoEnCarrito);
                }
                console.log(this.carrito);
                console.log(`Producto ${producto.descripcion} agregado al carrito.`);
                
                // Guarda el carrito y la lista completa de productos en el almacenamiento local
                localStorage.setItem('carrito', JSON.stringify(this.carrito));
                localStorage.setItem('prods', JSON.stringify(this.prods));
                producto.cantidad--;
                console.log("Contenido del Local Storage - carrito:", localStorage.getItem('carrito'));            
                // Aquí puedes realizar alguna acción adicional después de restar en 1,
                // como guardar el cambio en el backend mediante una llamada a la API.
                // Puedes agregar la lógica aquí según tus necesidades.
                // Por ejemplo:
                //this.actualizarCantidadEnBackend(id, producto.cantidad);
            } else {
                alert('La cantidad no puede ser menor que 0.');
            }
        },
        //////////////////////////////////////////////////
        agregarProducto(producto) {
            // Buscar el producto en el carrito
            const productoEnCarrito = this.carrito.find(p => p.id === producto.id);
        
            if (productoEnCarrito) {
                // Si ya está en el carrito, aumenta la cantidad
                productoEnCarrito.cantidad++;
            } else {
                // Si no está, agregalo con cantidad 1
                const nuevoProductoEnCarrito = { ...producto, cantidad: 1 };
                this.carrito.push(nuevoProductoEnCarrito);
            }
        
            // Resta el stock del producto
            producto.cantidad--;
        
            // Actualiza la instancia de Vue para ver el cambio en el carrito
            this.$forceUpdate(); 
        
            console.log(`Producto ${producto.descripcion} agregado al carrito.`);
        
            // Guarda el carrito y la lista completa de productos en el almacenamiento local
            localStorage.setItem('carrito', JSON.stringify(this.carrito));
            localStorage.setItem('prods', JSON.stringify(this.prods));
        
            this.productoAgregado = true;
        },
        //////////////////////////////////////////////////
    },
    created() {
        this.fetchData(this.url)

    }
    },
).mount('#app')