
import style from './style.module.css';
import React from 'react';
import { Link } from 'react-router-dom';

function HeaderVendedor(){

    return (
        <header className={style.header}>
            <div className={style.sombragradiente}>
                <div className={style.logo}>
                    <h1>Feira</h1>
                </div>

                <div className={style.menu}>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/">Sair</Link></li>
                        <li><Link to="/login">Login</Link></li>
                  
                    </ul>

                </div>

            </div>

        </header>

    )


}

export default HeaderVendedor;