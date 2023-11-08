
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import LoginCliente from "../pages/LoginCliente";
import LoginVendedor from "../pages/LoginVendedor";
import Cadastro from "../pages/Cadastro";



function Routers() {
  return (
    <BrowserRouter>
      <Routes>
        <Route  path="/" element={<Home/>} />
        <Route  path="/logincliente" element={<LoginCliente/>} />
        <Route  path="/loginvendedor" element={<LoginVendedor/>} />
        <Route  path="/cadastro" element={<Cadastro/>} />


      </Routes>
    </BrowserRouter>
  );
}

export default Routers;