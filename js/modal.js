export function crearModal() {
  // seleccionamos el el id modal-imagen
  const modalImagen = document.querySelector("#modal-imagen");

  if (modalImagen) {
    // creamos un evento de tipo listener
    // show.bs.modal nos permite ver el modal
    modalImagen.addEventListener("show.bs.modal", function (e) {
      // obtener los datos de la imagen
      const enlace = e.relatedTarget;
      // obtener la ruta de la imagen indicada en data-bs-imagen
      const rutaImagen = enlace.getAttribute("data-bs-imagen");

      // construir la imagen
      // creamos una etiqueta de tipo IMG
      const imagen = document.createElement("IMG");
      imagen.src = `img/${rutaImagen}.jpg`;
      imagen.loading = "lazy";
      imagen.classList.add("img-fluid");
      imagen.alt = "imagen Galería";

      // seleccionar modal
      const modal = document.querySelector(".modal-body");
      //agregar imagen al modal
      modal.appendChild(imagen);
    });

    /* Removing the image from the modal when the modal is closed. */
    modalImagen.addEventListener("hidden.bs.modal", function () {
      // seleccionar modal
      const modal = document.querySelector(".modal-body");
      //Para que al cerrar la imagen se elimine y no se vaya apilando
      modal.textContent = "";
    });
  }

  // Example starter JavaScript for disabling form submissions if there are invalid fields
  (function () {
    "use strict";

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll(".needs-validation");

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms).forEach(function (form) {
      form.addEventListener(
        "submit",
        function (event) {
          if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
          }

          form.classList.add("was-validated");
        },
        false
      );
    });
  })();
}
