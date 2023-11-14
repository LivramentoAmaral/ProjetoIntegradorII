
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import LoginCliente from "../pages/LoginCliente";
import LoginVendedor from "../pages/LoginVendedor";
import Cadastro from "../pages/Cadastro";
import ProductsVendedor from "../pages/ProductsVendedor";



function Routers() {
  return (
    <BrowserRouter>
      <Routes>
        <Route  path="/" index element={<Home/>} />
        <Route  path="/logincliente" element={<LoginCliente/>} />
        <Route  path="/loginvendedor" element={<LoginVendedor/>} />
        <Route  path="/cadastro" element={<Cadastro/>} />
        <Route path="/Productsvendedor/:id" element={<ProductsVendedor/>}/>

      </Routes>
    </BrowserRouter>
  );
}

export default Routers;