import style from "./style.module.css"
import React from "react";
import { useState } from "react";
import imgform from "../../assets/imagemClient.png"
import { Link } from "react-router-dom";


function FormLoginVendedor() {
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

                </div>
            </form>

            <div className={style.formRight}>
                <h2>Ou faça Login como vendedor</h2>
                <p>Bem-vindo, Vendedor! <br /> <br />
                    Faça login ou cadastre-se como cliente para fazer suas compras de forma mais simples e rápida.
                </p>
                <div className={style.imgbtn}>
                    <div className={style.imgdiv}>
                        <img src={imgform} alt="" srcset="" />
                    </div>
                    <Link to='/logincliente' className={style.btn}>Login Cliente</Link>
                </div>

            </div>


        </div>


    )
}

export default FormLoginVendedor;