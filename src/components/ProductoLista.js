import React from 'react';
import {Link} from 'react-router-dom';

function ProductoLista({producto}) {

    const eliminarProducto = id => {
        console.log('Eliminado', id);
        //TODO: Eliminar los registros
    }

    return (
        <li className="list-group-item d-flex justify-content-between align-items-center">
            <p>
                {producto.nombre} {' '}
                <span className="font-weight-bold">€{producto.precio}</span>
            </p>
            <div>
                <Link to={`/productos/editar/${producto.id}`} className="btn btn-success mr-2">Editar</Link>
                <button type="button" className="btn btn-danger" onClick={() => eliminarProducto(producto.id)}>
                    Eliminar &times;
                </button> 
            </div>
        </li>
    )
}
export default  ProductoLista;