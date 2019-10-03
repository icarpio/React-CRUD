import React, {useEffect,useState} from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Productos from './components/Productos';
import EditarProducto from './components/EditarProducto';
import AgregarProducto from './components/AgregarProducto';
import Producto from './components/Producto';
import Header from './components/Header';
import Axios from "axios";

function App() {

const [productos, guardarProductos] = useState([]);

useEffect(() => {
  const consultarApi = async () => {
    const resultado = await Axios.get('http://localhost:4000/zapateria');
    guardarProductos(resultado.data);
  }
  consultarApi();
}, []);

  return (
    <Router>
      <Header/>
      <main className="container mt-5"></main>
      <Switch>
        <Route exact path="/productos"
           render={ () => (
             <Productos productos={productos}
             />
           )}></Route>
        <Route exact path="/nuevo-producto" component ={AgregarProducto}></Route>
        <Route exact path="/productos/:id" component ={Producto}></Route>
        <Route exact path="/productos/editar/:id" component ={EditarProducto}></Route>
      </Switch>
      <p className="mt-4 p2 text-center">Icarpio Learning React</p>
    </Router>
  );
}

export default App;
