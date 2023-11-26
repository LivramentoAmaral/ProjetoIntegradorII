import style from "./style.module.css"
import React from "react";
import { useState } from "react";
import imgform from "../../assets/imglogin.png"
import { Link } from "react-router-dom";


function FormLoginCliente() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    return (

        <div className={style.container}>


            <form className={style.form}>

                <div className={style.formLeft}>
                    <label htmlFor="">Login</label>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Senha"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                    />

                    <button type="submit">Login</button>

                    <div className={style.cadastro}>
                    <Link to="/recuperarsenha">Esqueceu sua senha? </Link>
                     <p>ou</p>
                    <Link to="/cadastro">Deseja-se Cadastrar</Link>
                    </div>

                </div>
            </form>

            <div className={style.formRight}>
                <h2>Entre para desvendar oportunidades: vender, comprar e se encantar na nossa feira online! </h2>
                <br />
                <p> Seja bem-vindo! <br /> <br />
                    Faça o login para acessar sua conta de vendedor ou de cliente e começar a vender ou negociar produtos.
                </p>
                <div className={style.imgbtn}>
                    <div className={style.imgdiv}>
                        <img src={imgform} alt="" srcset="" />
                    </div>
                </div>

            </div>


        </div>


    )
}

export default FormLoginCliente;