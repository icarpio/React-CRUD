import React,{useState, useRef} from 'react';
import Error from './Error';
import axios from 'axios';
import Swal from 'sweetalert2';
import {withRouter} from 'react-router-dom';


function EditarProducto(props) {

    //Destructuring props
    const {history,producto,saveReCharge} = props;

    const precioRef = useRef('');
    const nombreRef = useRef('');

    const [error,saveError] = useState(false);
    const [categoria,guardarCategoria] = useState('');

    const editarProducto= async e => {

        e.preventDefault();
        //validacion
        const nuevoNombre = nombreRef.current.value,
        nuevoPrecio = precioRef.current.value;

        if(nuevoNombre === '' || nuevoPrecio === ''){
            saveError(true);
            return;
        }

        saveError(false);


        //Revisar si cambia la categoria, si no, asigna el mismo valor
        let cate = (categoria === '') ? producto.categoria : categoria;
        //Obtener los valores del formulario
        const editarProducto = {
            nombre : nuevoNombre,
            precio : nuevoPrecio,
            categoria : cate
        }

        //Enviar el Request
        const url = `http://localhost:4000/zapateria/${producto.id}`;
        
        
        try{
            const resultado = await axios.put(url, editarProducto);
            
        if(resultado.status === 200) {
            Swal.fire(
                'Producto Editado!',
                'Producto editado correctamente!',
                'success'
              )
        }
        }catch(error){
            Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'Error! Vuelve a intentarlo.'   
              })
        }

        //redirigir al usuario, consultar api
        saveReCharge(true);
        history.push('/productos');
        
    }

    const readRadioValue = e => {
        guardarCategoria(e.target.value);
    }

    return (
        <div className="col-md-8 mx-auto">
        <div className="col-md-8 mx-auto ">
        <h1 className="text-center">Editar Producto</h1>

        {(error) ? <Error message='Todos los campos son obligatorios' /> : null }
        <form className="mt-5" onSubmit={editarProducto}>
            <div className="form-group">
                <label>Nombre</label>
                <input 
                    type="text" 
                    className="form-control" 
                    name="nombre" 
                    placeholder="Nombre"
                    ref={nombreRef}
                    defaultValue={producto.nombre}
                />
            </div>

            <div className="form-group">
                <label>Precio</label>
                <input 
                    type="number" 
                    className="form-control" 
                    name="precio"
                    placeholder="Precio"
                    ref={precioRef}
                    defaultValue={producto.precio}
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
                    defaultChecked={(producto.categoria === 'deportivas')}
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
                    defaultChecked={(producto.categoria === 'casual')}
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
                    defaultChecked={(producto.categoria === 'zapatoshombre')}
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
                    defaultChecked={(producto.categoria === 'sandalias')}
                />
                <label className="form-check-label">
                    Sandalias
                </label>
            </div>
            </div>

            <input type="submit" className="font-weight-bold text-uppercase mt-5 btn btn-success btn-block py-3" value="Editar Producto" />
        </form>
    </div>


    </div>
    )
}
export default  withRouter(EditarProducto);