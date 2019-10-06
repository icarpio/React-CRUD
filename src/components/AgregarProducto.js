import React, {useState} from 'react';
import Error from './Error';
import axios  from 'axios';
import Swal from 'sweetalert2';
import {withRouter} from 'react-router-dom';

function AgregarProducto({history, saveReCharge}) {

    const [nombre,guardarNombre] = useState('');
    const [precio,guardarPrecio] = useState('');
    const [categoria,guardarCategoria] = useState('');
    const [error,saveError] = useState(false);

    const readRadioValue = e => {
        guardarCategoria(e.target.value);
    }

    const agregarProducto = async e => {
        e.preventDefault();

        if(nombre === '' || precio === '' || categoria === '') {
            saveError(true);
            return;
        }
        saveError(false);

        try {
            const resultado = await axios.post('http://localhost:4000/zapateria', {
                nombre, precio, categoria    
            });
            
            if(resultado.status === 201) {
                Swal.fire(
                    'Producto Creado!',
                    'Producto creado correctamente!',
                    'success'
                  )
            }
        }catch(error) {
            console.log(error);
            Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'Error! Vuelve a intentarlo.'   
              })
        }
        //Redirigir al listado
        saveReCharge(true);
        history.push('/productos');
    }

    return (
        <div className="col-md-8 mx-auto">
            <div className="col-md-8 mx-auto ">
            <h1 className="text-center">Agregar Nuevo Producto</h1>

            {(error) ? <Error message='Todos los campos son obligatorios' /> : null }
            <form className="mt-5" onSubmit={agregarProducto}>
                <div className="form-group">
                    <label>Nombre</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        name="nombre" 
                        placeholder="Nombre"
                        onChange={e => guardarNombre(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label>Precio</label>
                    <input 
                        type="number" 
                        className="form-control" 
                        name="precio"
                        placeholder="Precio"
                        onChange={e => guardarPrecio(e.target.value)}
                    />
                </div>

                <legend className="text-center">Categoría:</legend>
                <div className="text-center">
                <div className="form-check form-check-inline">
                    <input 
                        className="form-check-input" 
                        type="radio" 
                        name="categoria"
                        value="deportivas"
                        onChange={readRadioValue}
                    />
                    <label className="form-check-label">
                        Deportivas
                    </label>
                </div>
                <div className="form-check form-check-inline">
                    <input 
                        className="form-check-input" 
                        type="radio" 
                        name="categoria"
                        value="casual"
                        onChange={readRadioValue}
                    />
                    <label className="form-check-label">
                        Casual
                    </label>
                </div>

                <div className="form-check form-check-inline">
                    <input 
                        className="form-check-input" 
                        type="radio" 
                        name="categoria"
                        value="zapatoshombre"
                        onChange={readRadioValue}
                    />
                    <label className="form-check-label">
                        Zapatos Hombre
                    </label>
                </div>

                <div className="form-check form-check-inline">
                    <input 
                        className="form-check-input" 
                        type="radio" 
                        name="categoria"
                        value="sandalias"
                        onChange={readRadioValue}
                    />
                    <label className="form-check-label">
                        Sandalias
                    </label>
                </div>
                </div>

                <input type="submit" className="font-weight-bold text-uppercase mt-5 btn btn-primary btn-block py-3" value="Agregar Producto" />
            </form>
        </div>


        </div>
      
    )
}
export default withRouter(AgregarProducto);