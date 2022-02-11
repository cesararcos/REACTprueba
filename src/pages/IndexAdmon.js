import React, {Component, useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Nav, Navbar} from 'react-bootstrap';
import '../css/IndexAdmon.css';
import Cookies from 'universal-cookie';

function IndexAdmon(){
    const baseUrl="https://localhost:44354/api/gestor";
    const [data, setData]=useState([]);
    const cookies = new Cookies();

    console.log('jeje id' + cookies.get('id'));

    const peticionGet=async()=>{
        await axios.get(baseUrl+"/getUsuarioLog")
      .then(response=>{
      setData(response.data);
      if(response.data.id>0){
          console.log(response.data.id+" "+response.data.rol);
      }
      else{
        console.log("prueba APP");
      }
    }).catch(error=>{
      console.log(error);
    })
    }
    
    useEffect(()=>{
      peticionGet();
    },[])

    
    const cerrarSesion=()=>{
      cookies.remove('id', {path: "/"});
      cookies.remove('usuario', {path: "/"});
      cookies.remove('usuario', {path: "/"});
  }

    return (
        <div className="IndexAdmon">
            <Navbar bg="dark" variant="dark" sticky="top">
                <Navbar.Brand>
                    Tu tienda Online
                </Navbar.Brand>

                <Nav className="navt">
                    <Nav.Link href={data.rol === "Admon" ? "./regisprodadm" : "./prodshop"}>{data.rol === "Admon" ? "Crear Producto" : "Productos"}</Nav.Link>
                    <Nav.Link href={data.rol === "Admon" ? "./productstop" : "./car"}>{data.rol === "Admon" ? "Stop ventas" : "Carrito compras"}</Nav.Link>
                    <Nav.Link onClick={()=>cerrarSesion()} href={data.rol === "Admon" ? "./" : "./"}>{data.rol === "Admon" ? "Cerrar sesion" : "Cerrar sesion"}</Nav.Link>
                </Nav>
            </Navbar>
        </div>
    );

}
export default IndexAdmon;