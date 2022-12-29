import { showMessage } from "./alertas.js";

export function carritoCompras() {
  const carrito = document.querySelector("#carrito");
  const contenedorCarrito = document.querySelector("#lista-carrito tbody");
  const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");

  const FinalizarCompraBtn = document.querySelector("#pagar-compra");

  const listaProductos = document.querySelector("#lista-productos");
  const pTotalProductosSeleccionados =
    document.querySelector(".total-productos");
  const pTotalPagarCompra = document.querySelector(".total-Compra");
  const pProductosAgregadosCarrito =
    document.querySelector(".agregados-carrito");
  let articulosCarrito = [];

  /* LLamando la función `cargarEventListener()` */
  cargarEventListener();

  function cargarEventListener() {
    // Cuando agregas un curso presionando "Agregar al carrito"
    listaProductos.addEventListener("click", agregarProducto);

    // Eliminar un curso del carrito
    carrito.addEventListener("click", eliminarProducto);

    // Vaciar carrito
    vaciarCarritoBtn.addEventListener("click", vaciarCarrito);

    //Finalizar Compra
    FinalizarCompraBtn.addEventListener("click", finalizarCompra);

    getProductosCarrito();
    // obtener productos almacenados en el local storage
    function getProductosCarrito() {
      articulosCarrito =
        JSON.parse(localStorage.getItem("ProductosCarrito")) || [];

      // Función para crear el HTML en el carrito
      carritoHtml();
    }
  }

  /*
  =================================================
  Funciones para los eventos
  =================================================
 */

  function agregarProducto(e) {
    // Prevenir que los enlaces nos lleven a la parte de arriba de la página
    e.preventDefault();

    /* Comprobando si la clase del elemento pulsado contiene la clase "agregar-carrito"*/
    if (e.target.classList.contains("agregar-carrito")) {
      // Accediendo al elemento padre (traversing)
      const productoSeleccionado = e.target.parentElement.parentElement;

      // LLamando la Función para obtener el curso seleccionado
      leerDatosCurso(productoSeleccionado);
      showMessage("Producto Agregado Exitosamente", "success");
    }
  }

  // vacias Carrito de compras
  function vaciarCarrito(e) {
    e.preventDefault();

    articulosCarrito = [];

    // Función para eliminar HTML repetidos al agregar un curso
    limpiarHtml();

    /* Restablecer los valores de los elementos HTML */
    pTotalProductosSeleccionados.textContent = "0";
    pTotalPagarCompra.textContent = "0";
    pProductosAgregadosCarrito.textContent = "Sin Productos";
  }

  // Simulando Compra
  function finalizarCompra(e) {
    if (articulosCarrito.length === 0) {
      showMessage("No hay productos a cancelar", "error");
    } else {
      showMessage("Compra Exitosa", "success");
      vaciarCarrito(e);
      localStorage.clear();
    }
  }

  // Eliminar Producto del carrito
  function eliminarProducto(e) {
    if (e.target.classList.contains("borrar-producto")) {
      // Obteniendo el ID del producto
      const productoId = e.target.getAttribute("data-id");

      // Eliminar del arreglo articulosCarrito por el data-id
      articulosCarrito = articulosCarrito.filter(
        /* Filtrar el array `articulosCarrito` por el `productoId` y devolver el array filtrado. */
        (producto) => producto.id !== productoId
      );

      // Función para crear el HTML en el carrito
      carritoHtml();
    }
  }

  // lee el contenido del HTML al que le dimos click y extrae la información del curso
  function leerDatosCurso(producto) {
    // console.log(curso);

    // Crea un objeto del curso actual
    const infoProducto = {
      imagen: producto.querySelector(".img-producto img").src,
      titulo: producto.querySelector("h3").textContent,
      precio: producto.querySelector(".precio span").textContent,
      id: producto.querySelector("a").getAttribute("data-id"),
      cantidad: 1,
    };

    // console.log(infoProducto);

    // Revisa si un elemento ya existe en el carrito
    const existeProducto = articulosCarrito.some(
      /* Filtrar el array `articulosCarrito` por el `productoId` y devuelve true si existe un producto ya agregado al carrito*/
      (producto) => producto.id === infoProducto.id
    );

    if (existeProducto) {
      // Actualizamos la cantidad

      // crear nuevo areglo
      const productos = articulosCarrito.map((producto) => {
        /* Comprueba si el id del producto es el mismo que el id de infoProducto. Si lo es, incrementará la cantidad del producto. Si no lo es, devolverá el producto. */
        if (producto.id === infoProducto.id) {
          producto.cantidad++; // La cantidad del producto se incrementa

          return producto; // Retorna la cantidad del objeto infoCurso actualizada
        } else {
          return producto; // Retorna los objetos que no son duplicados
        }
      });

      // Copiamos el array "producto" a nuestro array "articulosCarrito"
      articulosCarrito = [...productos];
    } else {
      // Agregamos el curso al carrito
      // Agregando los cursos seleccionados al areglo articulosCarrito
      articulosCarrito = [...articulosCarrito, infoProducto];
    }

    // console.log(articulosCarrito);

    // Genera el HTML para agregar los producto al carrito
    carritoHtml();
  }

  /*
    Crea una fila de tabla para cada artículo del carrito y, a continuación, añade el número total de artículos y el precio total de los artículos al carrito.
   */
  function carritoHtml() {
    let totalCursosSeleccionados = 0;
    let totalPagarCompra = 0;
    let calTotalPagar = 0;

    // limpiar el HTML
    limpiarHtml();

    // Recorre el areglo y genera HTML
    articulosCarrito.forEach((producto) => {
      const row = document.createElement("tr");
      // Destructuring
      const { imagen, titulo, precio, cantidad, id } = producto;

      row.innerHTML = `
      <td>
        <img src = '${imagen}' class ="img-fluid imagen-producto" alt = "Imagen Curso"> 
      </td>
      <td>
        ${titulo}
      </td>
      <td>
        ${precio}
      </td>
      <td>
        ${cantidad}
      </td>
      <td>
        <a href="#" class="borrar-producto btn btn-danger" data-id="${id}">x</a>
      </td>
    `;

      /* Calcular el total de los productos seleccionados, total a pagar, cursos agregados al carrito. */
      totalCursosSeleccionados += cantidad;
      calTotalPagar = Number.parseFloat(precio) * cantidad;
      totalPagarCompra += calTotalPagar;

      // Agrega el HTML creado al tbody
      contenedorCarrito.appendChild(row);
    });

    // Agregando al HTML
    pTotalProductosSeleccionados.textContent = `${totalCursosSeleccionados}`;
    pTotalPagarCompra.textContent = `${totalPagarCompra}`;
    pProductosAgregadosCarrito.textContent = `${totalCursosSeleccionados}`;

     //almacenar productos en el local storage
    setProductosCarrito();
  }

  function setProductosCarrito() {
    //almacenar productos en el local storage
    localStorage.setItem("ProductosCarrito", JSON.stringify(articulosCarrito));
  }

  /*
    Eliminar el primer hijo del elemento con el id "lista-carrito" y luego eliminar el siguiente hijo hasta que no haya más hijos.
   */
  function limpiarHtml() {
    // forma lenta
    // contenedorCarrito.innerHTML = '';

    // Forma más rápida y con mejor performance
    while (contenedorCarrito.firstChild) {
      contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
  }
}
