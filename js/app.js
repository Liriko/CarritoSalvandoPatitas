// Variables
const listaArticulosWeb = document.querySelector('#lista-articulos'),
    listaCarritoWeb = document.querySelector('#lista-carrito tbody'),
    carrito = document.querySelector('#carrito'),
    btnVaciarCarrito = document.querySelector('#vaciar-carrito');
let listaArticulos = [];

cargarEventListeners();

function cargarEventListeners(){
    listaArticulosWeb.addEventListener('click', agregarArticulo);
    carrito.addEventListener('click', eliminarArticulo);
    btnVaciarCarrito.addEventListener('click', () => {
        listaArticulos = [];
        limpiarHTML();
    });
};

// Funciones
function eliminarArticulo(event){
    if(event.target.classList.contains('borrar-curso')){
        const idArticulo = event.target.getAttribute('data-id');
        const existe = listaArticulos.some(articulo => articulo.id === idArticulo && articulo.cantidad > 1);
        if(existe){
            // actualizar cantidad
            const articulos = listaArticulos.map( articulo => {
                if(articulo.id === idArticulo && articulo.cantidad > 1){
                    articulo.cantidad--;
                    return articulo;
                } else {
                    return articulo;
                }
            });
            listaArticulos = [...articulos];
        } else {
            // eliminar articulo al carrito
            listaArticulos = listaArticulos.filter(articulo => articulo.id !== idArticulo); 
        };
        mostrarCarrito(listaArticulos);
    };         
};

function agregarArticulo(event){
    event.preventDefault(); // Prevenir EventBubbling.
    if(event.target.classList.contains('agregar-carrito')){
        const articulo = event.target.parentElement.parentElement;
        agregarDatosArticulo(obtenerDatosArticulo(articulo));
        mostrarCarrito(listaArticulos);
    };
};

function obtenerDatosArticulo(articulo){
    const infoArticulo = {
        imagen: articulo.querySelector('img').src,
        titulo: articulo.querySelector('h4').textContent,
        precio: articulo.querySelector('.precio span').textContent,
        id: articulo.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    };
    return infoArticulo;
};

function agregarDatosArticulo(infoArticulo){
    // Revisa si un elemento ya existe en el carrito
    const existe = listaArticulos.some(articulo => articulo.id === infoArticulo.id);
    if(existe){
        // actualizar cantidad
        const articulos = listaArticulos.map( articulo => {
            if(articulo.id === infoArticulo.id){
                articulo.cantidad++;
                return articulo;
            } else {
                return articulo;
            }
        });
        listaArticulos = [...articulos];
    } else {
        // agregar articulo al carrito
        listaArticulos = [...listaArticulos, infoArticulo];
    };
};

function mostrarCarrito(listaArticulos){
    // Limpia el html del carrito
    limpiarHTML();
    // Recorre el carrito y genera el html
    listaArticulos.forEach(articulo => {
        const { id, imagen, titulo, precio, cantidad } = articulo; // destructuring
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src='${imagen}' width=100 />
            </td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
                <a href='#' class='borrar-curso' data-id='${id}'> X </a>
            </td>
        `;
        listaCarritoWeb.appendChild(row);
    });    
};

function limpiarHTML(){
    while(listaCarritoWeb.firstChild){
        listaCarritoWeb.removeChild(listaCarritoWeb.firstChild);
    };
};

