import React, {Component, useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import '../css/Login.css';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import Select from 'react-select';
import Cookies from 'universal-cookie';
//import './App.css';

function Login(){
    const baseUrl="https://localhost:44354/api/gestor";
    const [data, setData]=useState([]);
    const [gestorSeleccionado, setGestorSeleccionado]=useState({
        id: '',
        usuario: '',
        contrasena: '',
        rol: ''
      })
    const cookies = new Cookies();

    
    const peticionGetList=async()=>{
        await axios.get(baseUrl+"/getRoles")
    .then(response=>{
      setData(response.data);
    }).catch(error=>{
      console.log(error);
    })
    }
    

  //Metodo para capturar data de input
  const handleChange=e=>{
    const {name, value}=e.target;
    setGestorSeleccionado({
      ...gestorSeleccionado,
      [name]: value
    });
    //console.log(gestorSeleccionado);
  }

    const iniciarSesion=async()=>{
        await alert('Bienvenido');
        window.location.href="./menu";
    }

    const peticionGet=async()=>{
      if(gestorSeleccionado.usuario.length <= 0 ||
        gestorSeleccionado.contrasena.length <= 0){
        console.log("usuario vacio");
        peticionGetList();
        alert('usuario y/o contraseña vacio');
        return;
      }
        await axios.get(baseUrl+"/"+gestorSeleccionado.usuario+"/"+gestorSeleccionado.contrasena)
    .then(response=>{
      setData(response.data);
      
      if(response.data.id>0){
          if(response.data.rol == result){
            cookies.set('id', response.data.id, {path: "/"});
            cookies.set('usuario', response.data.usuario, {path: "/"});
            cookies.set('rol', response.data.rol, {path: "/"});
              if(response.data.rol == "Admon"){
                console.log("ENTRO COMO ADMON");
                peticionPost();
                console.log("Usuario existe");
                alert('Bienvenido');
                window.location.href="./indexadmon";
              }
              else{
                console.log("ENTRO COMO CLIENTE");
                peticionPost();
                console.log("Usuario existe");
                alert('Bienvenido');
                window.location.href="./indexadmon";
              }
          }
          else{
            console.log("EL ROL ESCOGIDO NO ES EL SUYO");
            alert('El rol escogido no es el asignado');
            peticionGetList();
            return;
          }
        
      }
      else{
        console.log("Usuario no existe");
        alert('Usuario no existe, intente de nuevo');
        peticionGetList();
        return;
      }
      
    })
    .catch(error=>{
      console.log(error);
    })
  }

  useEffect(()=>{
    peticionGetList();
  },[])

  
  const peticionPost=async()=>{
    delete gestorSeleccionado.id;
    delete gestorSeleccionado.contrasena;
    gestorSeleccionado.rol = result;
    await axios.post(baseUrl+"/saveUser", gestorSeleccionado)
    .then(response=>{
      console.log("Guardo usuario logueado "+ result);
    }).catch(error=>{
      console.log(error);
    })
  }

  var list=[{
      value:1,
      label:"Admon"
  },
{
    value:2,
      label:"Cliente"
}
]

const [result, listValue]=useState(list.label);
const listHandler = e =>{
    listValue(e.label);
}
    
    return (
        <div className="containerPrincipal">
            <div className="containerSecundario">
                <div className="form-group">
            <h2>Sign In</h2>
            <br />
            <label>Usuario: </label>
              <br />
              <input type="text" className="form-control" name="usuario" onChange={handleChange} />
              <br />
              <label>Contraseña: </label>
              <br />
              <input type="password" className="form-control" name="contrasena" onChange={handleChange} />
              <br />
              <Select options={data} onChange={listHandler}></Select>
              <br />
            <button className="btn btn-success" onClick={()=>peticionGet()}>Iniciar Sesion</button>
            {/* <img src={"E:\ImagenesPrueba\MetaTrader.png"} style={{width: '10px', height: '10px'}}></img> */}
                </div>
            </div>
        </div>
    );
}

export default Login;