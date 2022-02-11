import React, {Component, useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';

function Car() {
    const baseUrl="https://localhost:44354/api/gestor";
    const [data, setData]=useState([]);
    const [modalEliminar, setModalEliminar]=useState(false);

    const cerrarSesion=()=>{
        window.location.href="./";
    }

    const volverMenu=()=>{
        window.location.href="./indexadmon";
    }
    
    //Metodo para mostrar productos
    const peticionGet=async()=>{
        await axios.get(baseUrl+"/getProdCar")
        .then(response=>{
          setData(response.data);
        }).catch(error=>{
          console.log(error);
        })
      }

    //Metodo para guardar productos
    const peticionPost=async()=>{
        await axios.post(baseUrl+"/confirmPurchase")
        .then(response=>{
          //setData(data.concat(response.data));
          abrirCerrarModalEliminar();
          alert('Compra exitosa!');
          window.location.href="./prodshop";
          console.log("Producto confirmado!");
        }).catch(error=>{
          console.log(error);
        })
      }

      const seleccionarGestor=(gestor, caso)=>{
        //setGestorSeleccionado(gestor);
        abrirCerrarModalEliminar();
      }

      const abrirCerrarModalEliminar=()=>{
        setModalEliminar(!modalEliminar);
      }

      useEffect(()=>{
        peticionGet();
      },[])

      return(
        <div className="App">
          <br/><h1>Carrito</h1>
        <div className="Appp">
        <br/>
        <h3>Estos son los productos escogidos:</h3>
        <br/>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>descripcion</th>
              <th>precio</th>
              <th>cantidad</th>
            </tr>
          </thead>
          <tbody>
            {data.map(gestor=>(
              <tr key={gestor.codigo}>
                <td>{gestor.nombre}</td>
                <td>{gestor.descripcion}</td>
                <td>{gestor.precio}</td>
                <td>{gestor.cantidad}</td>
                
              </tr>
            ))}
          </tbody>
        </table>
        
        <Modal isOpen={modalEliminar}>
          <ModalBody>
            ¿Estás seguro de confirmar su compra ?
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-danger" onClick={()=>peticionPost()}>
              Sí
            </button>
            <button className="btn btn-secondary" onClick={()=>abrirCerrarModalEliminar()}>
              No
            </button>
          </ModalFooter>
        </Modal>
  
          <br /><br />
          <button className="btn btn-success" onClick={()=>seleccionarGestor("gestor", "Confirmar")}>Confirmar compra</button> {"    "}
          <button className="btn btn-secondary" onClick={()=>volverMenu()}>Volver Menú</button> {" "}
          <button className="btn btn-danger" onClick={()=>cerrarSesion()}>Cerrar Sesion</button>
        </div>
        
        </div>
      );

}
export default Car;