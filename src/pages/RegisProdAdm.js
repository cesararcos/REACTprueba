import React, {Component, useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';

function RegisProdAdm(){
    const baseUrl="https://localhost:44354/api/gestor";
    const [data, setData]=useState([]);
    const [modalEditar, setModalEditar]=useState(false);
    const [modalInsertar, setModalInsertar]=useState(false);
    const [modalEliminar, setModalEliminar]=useState(false);
    const [gestorSeleccionado, setGestorSeleccionado]=useState({
        codigo: '',
        nombre: '',
        descripcion: '',
        precio: ''
      })
    

      const cerrarSesion=()=>{
        window.location.href="./";
    }

    const volverMenu=()=>{
      window.location.href="./indexadmon";
  }

    //Metodo para mostrar productos
    const peticionGet=async()=>{
      await axios.get(baseUrl+"/getProdAll")
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
    //console.log(value);
    // if(value.length<=0){
    //   console.log("VACIO");
    //   aa = value;
    //   console.log(aa +" "+enabled);
    // }else{
    //   enabled=true;
    //   console.log(aa +" "+enabled);
    // }
    }
    
    //Metodo para guardar productos
    const peticionPost=async()=>{
      if(gestorSeleccionado.nombre.length <= 0 ||
        gestorSeleccionado.descripcion.length <= 0){
        alert('Existen campos sin llenar');
        return;
      }
        gestorSeleccionado.codigo=parseInt(gestorSeleccionado.codigo);
        gestorSeleccionado.precio=parseInt(gestorSeleccionado.precio);
        await axios.post(baseUrl+"/createProd", gestorSeleccionado)
        .then(response=>{
          setData(data.concat(response.data));
          abrirCerrarModalInsertar();
          console.log("Producto creado!");
        }).catch(error=>{
          console.log(error);
        })
      }

      //Metodo para editar productos
      const peticionPut=async()=>{
        gestorSeleccionado.codigo=parseInt(gestorSeleccionado.codigo);
        gestorSeleccionado.precio=parseInt(gestorSeleccionado.precio);
        await axios.put(baseUrl+"/editProduct/"+gestorSeleccionado.codigo, gestorSeleccionado)
        .then(response=>{
          var respuesta=response.data;
          var dataAuxiliar=data;
          dataAuxiliar.map(gestor=>{
            if(gestor.codigo==gestorSeleccionado.codigo){
              gestor.nombre=respuesta.nombre;
              gestor.descripcion=respuesta.descripcion;
              gestor.precio=respuesta.precio;
            }
          })
          abrirCerrarModalEditar();
        }).catch(error=>{
          console.log(error);
        })
      }

      //Metodo para eliminar productos
      const peticionDelete=async()=>{
        await axios.delete(baseUrl+"/deleteProduct/"+gestorSeleccionado.codigo)
        .then(response=>{
          setData(data.filter(gestor=>gestor.codigo!==response.data))
          abrirCerrarModalEliminar();
        }).catch(error=>{
          console.log(error);
        })
      }

      const seleccionarGestor=(gestor, caso)=>{
        setGestorSeleccionado(gestor);
        (caso=="Editar")?
        abrirCerrarModalEditar(): abrirCerrarModalEliminar();
      }

      const abrirCerrarModalInsertar=()=>{
        setModalInsertar(!modalInsertar);
      }
    
      const abrirCerrarModalEditar=()=>{
        setModalEditar(!modalEditar);
      }
    
      const abrirCerrarModalEliminar=()=>{
        setModalEliminar(!modalEliminar);
      }

      useEffect(()=>{
        peticionGet();
      },[])


    return(
      <div className="App">
        <br/><h1>Productos Creados</h1>
        <div className="Appp">
        <br/>
        <h3>Registro de productos creados:</h3>
        <br/>
        <button onClick={()=>abrirCerrarModalInsertar()} className="btn btn-success">Crear nuevo producto</button>
      <br/><br/>
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
                <button className="btn btn-primary" onClick={()=>seleccionarGestor(gestor, "Editar")}>Editar</button> {" "}
                <button className="btn btn-danger" onClick={()=>seleccionarGestor(gestor, "Eliminar")}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <Modal isOpen={modalInsertar}>
        <ModalHeader>Insertar producto:</ModalHeader>
        <ModalBody>
          <div className="form-group">
          <label>Codigo: </label>
            <br />
            <input type="number" className="form-control" name="codigo" onChange={handleChange} />
            <br />
            <label>Nombre: </label>
            <br />
            <input type="text" className="form-control" name="nombre" onChange={handleChange} />
            <br />
            <label>Descripcion: </label>
            <br />
            <input type="text" className="form-control" name="descripcion" onChange={handleChange} />
            <br />
            <label>Precio: </label>
            <br />
            <input type="number" className="form-control" name="precio" onChange={handleChange} />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button name='insertartBtn' className="btn btn-primary" onClick={()=>peticionPost()}>Crear Producto</button> {" "}
          <button className="btn btn-danger" disabled={!gestorSeleccionado} onClick={()=>abrirCerrarModalInsertar()}>Cancelar</button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalEditar}>
        <ModalHeader>Editar producto:</ModalHeader>
        <ModalBody>
          <div className="form-group">
          <label>Codigo: </label>
            <br />
            <input type="number" className="form-control" name="codigo" readOnly value={gestorSeleccionado && gestorSeleccionado.codigo} />
            <br />
            <label>Nombre: </label>
            <br />
            <input type="text" className="form-control" name="nombre" onChange={handleChange} value={gestorSeleccionado && gestorSeleccionado.nombre} />
            <br />
            <label>Descripcion: </label>
            <br />
            <input type="text" className="form-control" name="descripcion" onChange={handleChange} value={gestorSeleccionado && gestorSeleccionado.descripcion} />
            <br />
            <label>Precio: </label>
            <br />
            <input type="number" className="form-control" name="precio" onChange={handleChange} value={gestorSeleccionado && gestorSeleccionado.precio} />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={()=>peticionPut()}>Insertar</button> {" "}
          <button className="btn btn-danger" onClick={()=>abrirCerrarModalEditar()}>Cancelar</button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalEliminar}>
        <ModalBody>
          ¿Estás seguro que deseas eliminar el producto de Base de Datos {gestorSeleccionado && gestorSeleccionado.nombre} ?
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-danger" onClick={()=>peticionDelete()}>
            Sí
          </button>
          <button className="btn btn-secondary" onClick={()=>abrirCerrarModalEliminar()}>
            No
          </button>
        </ModalFooter>
      </Modal>

        <br /><br />
        <button className="btn btn-secondary" onClick={()=>volverMenu()}>Volver Menú</button> {" "}
        <button className="btn btn-danger" onClick={()=>cerrarSesion()}>Cerrar Sesion</button>
        </div>
      
      
      </div>
    );
}
export default RegisProdAdm;