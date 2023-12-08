import React from 'react';
import { Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import Swal from 'sweetalert2';

function PrivateRoute({ children, path }) {
  const token = localStorage.getItem('token');

  if (!token || typeof token !== 'string') {
    Swal.fire({
      icon: 'error',
      title: 'Sem persissão de acesso',
      text: 'faça login para acessar essa página',
    });
    return <Navigate to="/login" />;
  }

  const type = jwtDecode(token)?.userType;

  if (path === '/meusproducts' && type === 'cliente') {
    // Se o usuário for um cliente e tentar acessar '/meusproducts', redirecione para a página de login
    Swal.fire({
      icon: 'error',
      title: 'Sem persissão de acesso',
      text: 'Você não tem permissão de Produtor',
    });
    return <Navigate to="/login" />;
  }

  return children;
}

export default PrivateRoute;