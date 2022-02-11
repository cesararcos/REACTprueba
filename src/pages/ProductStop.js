import React, {Component, useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import '../css/Login.css';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';

function ProductStop() {
    const baseUrl="https://localhost:44354/api/gestor";
    const [data, setData]=useState([]);

    const cerrarSesion=()=>{
        window.location.href="./";
    }

    const volverMenu=()=>{
      window.location.href="./indexadmon";
    }

    //Metodo para mostrar productos
    const peticionGet=async()=>{
        await axios.get(baseUrl+"/getConfirmProd")
        .then(response=>{
          setData(response.data);
        }).catch(error=>{
          console.log(error);
        })
      }

      useEffect(()=>{
        peticionGet();
      },[])

      return(
        <div className="App">
          <br/>
          <h1>Productos Vendidos</h1>
          <br/>
          <div className="Appp"> 
          <br/>
          <h3>Top de productos mas vendidos:</h3>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th style={{ width: 200, textAlign: 'center' }}>NOMBRE</th>
              <th style={{ textAlign: 'center' }}>DESCRIPCIÓN</th>
              <th style={{ width: 150, textAlign: 'center' }}>PRECIO</th>
              <th style={{ width: 10, textAlign: 'center' }}>CANTIDAD</th>
            </tr>
          </thead>
          <tbody>
            {data.map(gestor=>(
              <tr key={gestor.codigo}>
                <td style={{ textAlign: 'center' }}>{gestor.nombre}</td>
                <td>{gestor.descripcion}</td>
                <td style={{ textAlign: 'center' }}>{gestor.precio}</td>
                <td style={{ textAlign: 'center' }}>{gestor.cantidad}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <br /><br />
        <button className="btn btn-secondary" onClick={()=>volverMenu()}>Volver Menú</button> {" "}
        <button className="btn btn-danger" onClick={()=>cerrarSesion()}>Cerrar Sesion</button>
          </div>
        
        </div>
      );
}
export default ProductStop;