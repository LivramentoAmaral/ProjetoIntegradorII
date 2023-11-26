import React, { useState } from "react";
import Header from "../../components/Header";
import Rodape from "../../components/Footer";
import style from "./style.module.css";
import FormCadastroVendedor from "../../components/FormCadastroVendedor";
import FormCadastroCliente from "../../components/FormCadastroCliente";

function Cadastro() {
    const [tipoUsuario, setTipoUsuario] = useState("1");
    const [cadastroRealizado, setCadastroRealizado] = useState(false);

    const handleTipoUsuarioChange = (e) => {
        setTipoUsuario(e.target.value);
    };

    const containerClassName =
        tipoUsuario === "1" ? style.containerComprador : style.container;

    const tipoUsuarioClassName =
        tipoUsuario === "1" ? style.tipoUsuarioProdutor : style.tipoUsuarioComprador;

    return (
        <>
            <Header />
            <br />
            <br />
            <main className={`${style.container} ${containerClassName}`}>
                <div className={style.containertipo}>
                    {!cadastroRealizado && (
                        <div className={`${style.tipoUsuario} ${tipoUsuarioClassName}`}>
                            <h1>Como deseja se cadastrar?</h1>
                            <select value={tipoUsuario} onChange={handleTipoUsuarioChange}>
                                <option value="1">Cliente</option>
                                <option value="2">Produtor</option>
                            </select>
                        </div>
                    )}
                </div>
                {tipoUsuario === "1" && !cadastroRealizado && (
                    <FormCadastroCliente setCadastroRealizado={setCadastroRealizado} />
                )}
                {tipoUsuario === "2" && !cadastroRealizado && (
                    <FormCadastroVendedor setCadastroRealizado={setCadastroRealizado} />
                )}
            </main>
            <br />
            <br />
            <Rodape />
        </>
    );
}

export default Cadastro;
