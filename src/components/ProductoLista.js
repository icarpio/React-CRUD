import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function ProductoLista({ producto ,saveReCharge}) {
  const eliminarProducto = id => {
    console.log("Eliminado", id);
    //Eliminar los registros
    Swal.fire({
      title: "Estas Seguro?",
      text: "Los cambios no se pueden revertir!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
      cancelButtonText: "Cancelar"
    }).then(async result => {
      if (result.value) {
        try {
          //Enviar el Request
          const url = `http://localhost:4000/zapateria/${id}`;

          const resultado = await axios.delete(url);

          if (resultado.status === 200) {
            Swal.fire("Eliminado!", "El producto se ha eliminado.", "success");
          }
          //Consultar Api
          saveReCharge(true);
        } catch (error) {
          Swal.fire({
            type: "error",
            title: "Oops...",
            text: "Error! Vuelve a intentarlo."
          });
        }
      }
    });
  };

  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <p>
        {producto.nombre}{" "}
        <span className="font-weight-bold">€{producto.precio}</span>
      </p>
      <div>
        <Link
          to={`/productos/editar/${producto.id}`}
          className="btn btn-success mr-2"
        >
          Editar
        </Link>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => eliminarProducto(producto.id)}
        >
          Eliminar &times;
        </button>
      </div>
    </li>
  );
}
export default ProductoLista;
