import style from './style.module.css';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { jwtDecode } from 'jwt-decode';

export default function Header({ cartItems }) {
    const navigate = useNavigate();
    const [userType, setUserType] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            try {
                const decoded = jwtDecode(token);
                const { Typeuser } = decoded;

                // Definir o estado do userType com base no Typeuser do token
                setUserType(Typeuser);
            } catch (error) {
                console.error('Erro ao decodificar o token:', error);
                // Se houver um erro ao decodificar o token, redirecionar para a página de login
                localStorage.removeItem('token');
                navigate('/login');
            }
        } else {
            // Se não houver token, redirecionar para a página de login
            console.log('Não há token');
        }
    }, [navigate]);

    const handleLogout = () => {
        Swal.fire({
            title: 'Deseja realmente sair da conta?',
            text: 'Você será redirecionado para a página de login',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Desejo sair!'
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem('token');
                localStorage.removeItem('cartId')
                Swal.fire('Logged Out!', 'Muito obrigado até breve', 'success');
                return navigate('/login');
            }
        });
    };

    return (
        <header className={style.header}>
            <div className={style.sombragradiente}>
                <div className={style.logo}>
                    <h1>Feira</h1>
                </div>

                <div className={style.menu}>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/sobre">Sobre</Link></li>
                        {userType === 'cliente' ? (
                            <>
                                <li><Link to="/cart">Carrinho</Link></li>
                                <li><button onClick={handleLogout}>Sair</button></li>
                            </>
                        ) : (
                            <>
                                <li><Link to="/cart">Carrinho</Link></li>
                                <li><button onClick={handleLogout}>Sair</button></li>
                                <li><Link to="/meusproducts">Meus Produtos</Link></li>
                            </>
                        )}
                        {/* Links adicionais com base no tipo de usuário */}
                    </ul>
                </div>
            </div>
        </header>
    );
}
