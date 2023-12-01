import React from "react";
import Header from "../../components/Header";
import style from "./style.module.css";
import { Form } from "react-router-dom";

function Recuperar() {
    return (
        <>
        <Header/>
        <div className={style.container}>
            <h1>Recuperar senha</h1>
            <form className={style.form}>
                <div className={style.formLeft}>
                    <input type="email" placeholder="Email" />
                    <button type="submit">Enviar</button>
                </div>
            </form>
        </div>
        
        </>
    )
}

export default Recuperar;
