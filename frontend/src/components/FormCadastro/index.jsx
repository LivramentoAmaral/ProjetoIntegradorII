import React, { useState } from "react";
import style from "./style.module.css";

function FormCadastro() {
    const [tipoUsuario, setTipoUsuario] = useState("1"); // Adicione um estado para o tipo de usuário selecionado
    const [primeiroNome, setPrimeiroNome] = useState("");
    const [sobrenome, setSobrenome] = useState("");
    const [fazenda, setFazenda] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [telefone, setTelefone] = useState("");
    const [endereco, setEndereco] = useState("");
    const handleTipoUsuarioChange = (e) => {
        setTipoUsuario(e.target.value);
    };

    const containerClassName =
        tipoUsuario === "1" ? style.container : style.containerComprador;

    const tipoUsuarioClassName =
        tipoUsuario === "1" ? style.tipoUsuarioProdutor : style.tipoUsuarioComprador;

    return (
        <div className={`${style.container} ${containerClassName}`}>
            <div className={style.containertipo}>
                <div className={`${style.tipoUsuario} ${tipoUsuarioClassName} `}>
                    <h1>Como deseja se cadastrar ?</h1>
                    <select value={tipoUsuario} onChange={handleTipoUsuarioChange}>
                        <option value="1">Produtor</option>
                        <option value="3">Comprador</option>
                    </select>
                </div>
            </div>

            {tipoUsuario === "1" ? (
                <form className={style.form}>
                    <div className={style.formLeft}>
                        <label htmlFor="" className={style.labelForm}>
                            Informações de Cadastro (Produtor)
                        </label>
                        <input
                            type="text"
                            placeholder="Primeiro Nome"
                            value={primeiroNome}
                            onChange={(e) => setPrimeiroNome(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Sobrenome"
                            value={sobrenome}
                            onChange={(e) => setSobrenome(e.target.value)}
                        />
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
                    </div>
                    <div className={style.formRight}>
                        <label htmlFor="" className={style.labelForm}>
                            Informações de Contato (Produtor)
                        </label>
                        <input
                            type="text"
                            placeholder="Fazenda"
                            value={fazenda}
                            onChange={(e) => setFazenda(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Telefone"
                            value={telefone}
                            onChange={(e) => setTelefone(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Cidade"
                            value={endereco}
                            onChange={(e) => setEndereco(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Bairro"
                            value={endereco}
                            onChange={(e) => setEndereco(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Rua"
                            value={endereco}
                            onChange={(e) => setEndereco(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Número"
                            value={endereco}
                            onChange={(e) => setEndereco(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Complemento"
                            value={endereco}
                            onChange={(e) => setEndereco(e.target.value)}
                        />
                        <button type="submit">Cadastrar</button>
                    </div>
                </form>
            ) : tipoUsuario === "3" ? (
                <form className={style.form}>
                    <div className={style.formLeft}>
                        <label htmlFor="" className={style.labelForm}>
                            Informações de Cadastro (Comprador)
                        </label>
                        <input
                            type="text"
                            placeholder="Primeiro Nome"
                            value={primeiroNome}
                            onChange={(e) => setPrimeiroNome(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Sobrenome"
                            value={sobrenome}
                            onChange={(e) => setSobrenome(e.target.value)}
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange = {(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Senha"
                            value={senha}
                            onChange ={(e) => setSenha(e.target.value)}
                        />
                    
                    <button type="submit">Cadastrar</button>
                    </div>
                    
                    
                
                </form>
            ) : null}
        </div>
    );
}

export default FormCadastro;
