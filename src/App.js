import React, {useEffect,useState} from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from 'axios';

import Productos from './components/Productos';
import EditarProducto from './components/EditarProducto';
import AgregarProducto from './components/AgregarProducto';
import Producto from './components/Producto';
import Header from './components/Header';


function App() {

const [productos, guardarProductos] = useState([]);
const [recharge,saveReCharge] = useState(true);

useEffect(() => {
  if(recharge) {
    const consultarApi = async () => {
        // consultar la api de json-server
        const resultado = await axios.get('http://localhost:4000/zapateria');

        guardarProductos(resultado.data);
    }
    consultarApi();

    // Cambiar a false la recarga de los productos
    saveReCharge(false);
}
}, [recharge]);

  return (
    <Router>
      <Header/>
      <main className="container mt-5"></main>
      <Switch>
        <Route exact path="/productos" render={ () => (
             <Productos productos={productos} />
           )}/>

        <Route exact path="/nuevo-producto" render = {() => (
          <AgregarProducto saveReCharge={saveReCharge} />
        )}/>
        <Route exact path="/productos/:id" component ={Producto}></Route>

        <Route exact path="/productos/editar/:id" render={props => {
          //Tomar el ID del producto
          const idProducto = parseInt(props.match.params.id);

          //el producto que se pasa al state
          const producto = productos.filter(producto => producto.id === idProducto);

          return (
            <EditarProducto producto={producto[0]}
            saveReCharge={saveReCharge} />
          )
        }}></Route>
      </Switch>
      <p className="mt-4 p2 text-center">Icarpio Learning React</p>
    </Router>
  );
}

export default App;
