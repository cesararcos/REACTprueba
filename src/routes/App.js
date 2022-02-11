//import logo from './logo.svg';
import React, {Component, useState, useEffect} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import axios from 'axios';
import Login from '../pages/Login';
import Menu from '../pages/Menu';
import IndexAdmon from '../pages/IndexAdmon';
import Test from '../pages/Test';
import RegisProdAdm from '../pages/RegisProdAdm';
import ProdShop from '../pages/ProdShop';
import Car from '../pages/Car';
import ProductStop from '../pages/ProductStop';
//import './App.css';

function App() {
  const baseUrl="https://localhost:44354/api/gestor";
  const [data, setData]=useState([]);
  var a;

  const peticionGet=async()=>{
    await axios.get(baseUrl+"/getUsuarioLog")
  .then(response=>{
  setData(response.data);
  if(response.data.id>0){
      a = response.data.rol;
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


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login /> }></Route>
        {/* <Route path="/menu" element={data.rol === "Admon" ? <Menu /> : <Test />}></Route> */}
        <Route path="/menu" element={<Menu /> }></Route>
        <Route path="/test" element={<Test /> }></Route>
        <Route path="/indexadmon" element={<IndexAdmon /> }></Route>
        <Route path="/regisprodadm" element={<RegisProdAdm /> }></Route>
        <Route path="/prodshop" element={<ProdShop /> }></Route>
        <Route path="/car" element={<Car /> }></Route>
        <Route path="/productstop" element={<ProductStop /> }></Route>
      </Routes>
    
    </BrowserRouter>
  );
}

export default App;
