import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Cadastro from '../pages/Cadastro';
import Home from '../pages/Home';
import LoginCliente from '../pages/Login';
import ProductsVendedor from '../pages/ProductsVendedor';
import Sobre from '../pages/Sobre';
import Recuperar from '../pages/Recuperar';
import NovaSenha from '../pages/NovaSenha';
import Cart from '../pages/Cart';
import PrivateRoute from './ProtectRoute';
// Importe mais páginas conforme necessário

function Routers() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginCliente />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/recuperarsenha" element={<Recuperar />} />
        <Route path="/novasenha" element={<NovaSenha />} />
        <Route path="/cart" element={
          <PrivateRoute>
            <Cart />
          </PrivateRoute>} />
        <Route path="/meusproducts" element={
          <PrivateRoute children={<ProductsVendedor />} path={"/meusproducts"} />
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default Routers;