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

                </div>
            </form>

            <div className={style.formRight}>
                <h2>Ou faça Login como vendedor</h2>
                <p>Bem-vindo, Vendedor! <br /> <br />
                    Faça o login para acessar sua conta de vendedor e começar a vender seus produtos.
                </p>
                <div className={style.imgbtn}>
                    <div className={style.imgdiv}>
                        <img src={imgform} alt="" srcset="" />
                    </div>
                    <Link to="/loginvendedor" className={style.btn}>Login vendedor</Link>
                </div>

            </div>


        </div>


    )
}

export default FormLoginCliente;