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
                const { userType } = decoded;

                // Definir o estado do userType com base no Typeuser do token
                setUserType(userType);
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
                        <li><Link to="/cadastro">Cadastro</Link></li>
                        <li><Link to="/login">Login</Link></li>
                        {userType === 'cliente' ? (
                            <>
                                <li><Link to="/cart"> <svg xmlns="http://www.w3.org/2000/svg" width="30" height="25" viewBox="0 0 30 25" fill="none">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M8.72684 1.21202C8.68438 0.879613 8.4864 0.571487 8.17135 0.347502C7.85631 0.123516 7.4467 -0.000337574 7.02209 6.91068e-07H1.71159C1.25765 6.91068e-07 0.8223 0.141884 0.501314 0.394438C0.180328 0.646992 0 0.989528 0 1.34669C0 1.70386 0.180328 2.04639 0.501314 2.29895C0.8223 2.5515 1.25765 2.69339 1.71159 2.69339H5.47481L6.04991 7.19313C6.04991 7.22366 6.04991 7.25598 6.05447 7.2865L7.15446 15.8964C7.26012 16.5171 7.6503 17.0862 8.25167 17.4965C8.85304 17.9068 9.62419 18.1302 10.4202 18.1247H23.7752C24.4816 18.148 25.1785 17.9902 25.7612 17.6752C26.3439 17.3601 26.781 16.9048 27.0066 16.3776V16.374L29.8365 9.68721V9.68541C29.9978 9.29953 30.0405 8.88906 29.9612 8.48766C29.8819 8.08626 29.6827 7.70539 29.3801 7.37628C29.0668 7.03017 28.6493 6.75059 28.165 6.56257C27.6807 6.37456 27.1447 6.28397 26.605 6.29893H9.37496L8.72684 1.21202ZM26.0253 22.8848C26.0358 22.602 25.9741 22.3203 25.8437 22.0566C25.7134 21.7929 25.5171 21.5524 25.2666 21.3494C25.016 21.1465 24.7162 20.9851 24.385 20.8749C24.0537 20.7647 23.6978 20.708 23.3381 20.708C22.9785 20.708 22.6225 20.7647 22.2913 20.8749C21.96 20.9851 21.6603 21.1465 21.4097 21.3494C21.1591 21.5524 20.9629 21.7929 20.8325 22.0566C20.7022 22.3203 20.6405 22.602 20.6509 22.8848C20.6509 23.4458 20.9342 23.9838 21.4383 24.3805C21.9425 24.7771 22.6263 25 23.3393 25C24.0523 25 24.7361 24.7771 25.2402 24.3805C25.7444 23.9838 26.0276 23.4458 26.0276 22.8848H26.0253ZM11.5955 20.7678C12.3085 20.7678 12.9923 20.9906 13.4964 21.3873C14.0006 21.784 14.2838 22.322 14.2838 22.883C14.2838 23.444 14.0006 23.982 13.4964 24.3787C12.9923 24.7754 12.3085 24.9982 11.5955 24.9982C10.8825 24.9982 10.1987 24.7754 9.69452 24.3787C9.19036 23.982 8.90713 23.444 8.90713 22.883C8.90713 22.322 9.19036 21.784 9.69452 21.3873C10.1987 20.9906 10.8825 20.7678 11.5955 20.7678Z" fill="#F7F7F7" />
                                    </svg></Link></li>
                                <li><button onClick={handleLogout}>Sair</button></li>
                            </>
                        ) : (
                            <>
                              
                                <li><Link to="/meusproducts">Meus Produtos</Link></li>
                                <li><Link to="/cart">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="25" viewBox="0 0 30 25" fill="none">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M8.72684 1.21202C8.68438 0.879613 8.4864 0.571487 8.17135 0.347502C7.85631 0.123516 7.4467 -0.000337574 7.02209 6.91068e-07H1.71159C1.25765 6.91068e-07 0.8223 0.141884 0.501314 0.394438C0.180328 0.646992 0 0.989528 0 1.34669C0 1.70386 0.180328 2.04639 0.501314 2.29895C0.8223 2.5515 1.25765 2.69339 1.71159 2.69339H5.47481L6.04991 7.19313C6.04991 7.22366 6.04991 7.25598 6.05447 7.2865L7.15446 15.8964C7.26012 16.5171 7.6503 17.0862 8.25167 17.4965C8.85304 17.9068 9.62419 18.1302 10.4202 18.1247H23.7752C24.4816 18.148 25.1785 17.9902 25.7612 17.6752C26.3439 17.3601 26.781 16.9048 27.0066 16.3776V16.374L29.8365 9.68721V9.68541C29.9978 9.29953 30.0405 8.88906 29.9612 8.48766C29.8819 8.08626 29.6827 7.70539 29.3801 7.37628C29.0668 7.03017 28.6493 6.75059 28.165 6.56257C27.6807 6.37456 27.1447 6.28397 26.605 6.29893H9.37496L8.72684 1.21202ZM26.0253 22.8848C26.0358 22.602 25.9741 22.3203 25.8437 22.0566C25.7134 21.7929 25.5171 21.5524 25.2666 21.3494C25.016 21.1465 24.7162 20.9851 24.385 20.8749C24.0537 20.7647 23.6978 20.708 23.3381 20.708C22.9785 20.708 22.6225 20.7647 22.2913 20.8749C21.96 20.9851 21.6603 21.1465 21.4097 21.3494C21.1591 21.5524 20.9629 21.7929 20.8325 22.0566C20.7022 22.3203 20.6405 22.602 20.6509 22.8848C20.6509 23.4458 20.9342 23.9838 21.4383 24.3805C21.9425 24.7771 22.6263 25 23.3393 25C24.0523 25 24.7361 24.7771 25.2402 24.3805C25.7444 23.9838 26.0276 23.4458 26.0276 22.8848H26.0253ZM11.5955 20.7678C12.3085 20.7678 12.9923 20.9906 13.4964 21.3873C14.0006 21.784 14.2838 22.322 14.2838 22.883C14.2838 23.444 14.0006 23.982 13.4964 24.3787C12.9923 24.7754 12.3085 24.9982 11.5955 24.9982C10.8825 24.9982 10.1987 24.7754 9.69452 24.3787C9.19036 23.982 8.90713 23.444 8.90713 22.883C8.90713 22.322 9.19036 21.784 9.69452 21.3873C10.1987 20.9906 10.8825 20.7678 11.5955 20.7678Z" fill="#F7F7F7" />
                                    </svg></Link></li> 
                                <li><button onClick={handleLogout}>Sair</button></li>
                            </>
                        )}
                        {/* Links adicionais com base no tipo de usuário */}
                    </ul>
                </div>
            </div>
        </header>
    );
}
