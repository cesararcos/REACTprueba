import React, {Component, useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';


function ProdShop() {
    const baseUrl="https://localhost:44354/api/gestor";
    const [data, setData]=useState([]);
    const [modalEditar, setModalEditar]=useState(false);
    const [gestorSeleccionado, setGestorSeleccionado]=useState({
        codigo: '',
        nombre: '',
        descripcion: '',
        precio: '',
        cantidad: ''
      })

    const cerrarSesion=()=>{
        window.location.href="./";
    }

    const volverMenu=()=>{
        window.location.href="./indexadmon";
    }

    // const peticionGetBuscar=async()=>{
    //   await axios.get(baseUrl+"/getProductId/1")//getProdAll
    //   .then(response=>{
    //     //setData(data.filter(gestor=>gestor.codigo===response.data.codigo));
    //     setData(data.join(gestor=>gestor.codigo===response.data.codigo));
    //   }).catch(error=>{
    //     console.log(error);
    //   })
    // }

    //Metodo para mostrar productos
    const peticionGet=async()=>{
        await axios.get(baseUrl+"/getProdAll")//getProdAll
        .then(response=>{
          setData(response.data);
        }).catch(error=>{
          console.log(error);
        })
      }

      //Metodo para obtener data de input
    const handleChange=e=>{
        const {name, value}=e.target;
        setGestorSeleccionado({
          ...gestorSeleccionado,
          [name]: value
        });
        console.log(gestorSeleccionado);
    }

    //Metodo para enviar a carrito
    const peticionPost=async()=>{
        gestorSeleccionado.codigo=parseInt(gestorSeleccionado.codigo);
        gestorSeleccionado.precio=parseInt(gestorSeleccionado.precio);
        gestorSeleccionado.cantidad=parseInt(gestorSeleccionado.cantidad);
        await axios.post(baseUrl+"/sendCar", gestorSeleccionado)
        .then(response=>{
          //setData(data.concat(response.data));
          abrirCerrarModalEditar();
          console.log("Producto enviado a carrito!");
          alert('Producto enviado a carrito!');
        }).catch(error=>{
          console.log(error);
        })
      }

      const seleccionarGestor=(gestor, caso)=>{
        setGestorSeleccionado(gestor);
        abrirCerrarModalEditar();
      }

      const abrirCerrarModalEditar=()=>{
        setModalEditar(!modalEditar);
      }

      useEffect(()=>{
        peticionGet();
      },[])

    return(
        <div className="App">
          {/* <input type="text" className="form-control" name="nombre" onChange={handleChange} />
          <button onClick={()=>peticionGetBuscar()} className="btn btn-success">buscar</button> */}
          <br/><h1>Productos Disponibles</h1>
      <div className="Appp">
      <br/>
        <h3>Productos disponibles a comprar:</h3>
      <br/>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th style={{ width: 50, textAlign: 'center' }}>CODIGO</th>
            <th style={{ width: 300, textAlign: 'center' }}>NOMBRE</th>
            <th style={{ textAlign: 'center' }}>DESCRIPCIÓN</th>
            <th style={{ width: 100, textAlign: 'center' }}>PRECIO</th>
            <th style={{ width: 200, textAlign: 'center' }}>ACCIONES</th>
          </tr>
        </thead>
        <tbody>
          {data.map(gestor=>(
            <tr key={gestor.codigo}>
              <td style={{ textAlign: 'center' }}>{gestor.codigo}</td>
              <td>{gestor.nombre}</td>
              <td>{gestor.descripcion}</td>
              <td style={{ textAlign: 'center' }}>{gestor.precio}</td>
              <td style={{ textAlign: 'center' }}>
                <button className="btn btn-primary" onClick={()=>seleccionarGestor(gestor, "Editar")}>Agregar carro</button> {" "}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={modalEditar}>
        <ModalHeader>Por favor confirmar producto:</ModalHeader>
        <ModalBody>
          <div className="form-group">
          <label>Codigo: </label>
            <br />
            <input type="number" className="form-control" name="codigo" readOnly value={gestorSeleccionado && gestorSeleccionado.codigo} />
            <br />
            <label>Nombre: </label>
            <br />
            <input type="text" className="form-control" name="nombre" readOnly value={gestorSeleccionado && gestorSeleccionado.nombre} />
            <br />
            <label>Descripcion: </label>
            <br />
            <input type="text" className="form-control" name="descripcion" readOnly value={gestorSeleccionado && gestorSeleccionado.descripcion} />
            <br />
            <label>Precio: </label>
            <br />
            <input type="number" className="form-control" name="precio" readOnly value={gestorSeleccionado && gestorSeleccionado.precio} />
            <br />
            <label>Cantidad: </label>
            <br />
            <input type="number" className="form-control" name="cantidad" onChange={handleChange} />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={()=>peticionPost()}>Insertar</button> {" "}
          <button className="btn btn-danger" onClick={()=>abrirCerrarModalEditar()}>Cancelar</button>
        </ModalFooter>
      </Modal>

        <br /><br />
        <button className="btn btn-secondary" onClick={()=>volverMenu()}>Volver Menú</button> {" "}
        <button className="btn btn-danger" onClick={()=>cerrarSesion()}>Cerrar Sesion</button>
      </div>
      
      </div>
    );

}
export default ProdShop;