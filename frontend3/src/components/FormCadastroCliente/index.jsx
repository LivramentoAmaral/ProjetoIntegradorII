import React, { useState } from "react";
import api from "../../api/index";
import style from "./style.module.css";
import { useNavigate } from "react-router-dom";

function FormCadastroCliente({ setCadastroRealizado }) {
    const [primeiroNome, setPrimeiroNome] = useState("");
    const [sobrenome, setSobrenome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [sucesso, setSucesso] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleCadastroSubmit = async (e) => {
        e.preventDefault();

        const novoUsuario = {
            name: `${primeiroNome} ${sobrenome}`,
            email: email,
            password: senha,
        };

        try {
            setIsLoading(true);

            const response = await api.post("/usersclient", novoUsuario);

            if (response.status === 201) {
                setSucesso(true);
                setCadastroRealizado(true);

                setTimeout(() => {
                    setIsLoading(false);
                    navigate("/logincliente");
                }, 3000);
            }
        } catch (error) {
            setIsLoading(false);
            console.error("Erro ao criar usuário:", error.message);
        }
    };

    return (
        <div className={style.container}>
            {!sucesso ? (
                <form
                    className={style.form}
                    onSubmit={handleCadastroSubmit}
                    method="post"
                    action="/usersclient"
                >
                    <div className={style.formLeft}>
                        <label htmlFor="" className={style.labelForm}>
                            Informações de Cadastro (Cliente)
                        </label>
                        <input
                            type="text"
                            placeholder="Primeiro Nome"
                            value={primeiroNome}
                            onChange={(e) => setPrimeiroNome(e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Sobrenome"
                            value={sobrenome}
                            onChange={(e) => setSobrenome(e.target.value)}
                            required
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Senha"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            required
                        />
                        <button type="submit">
                                Cadastrar
                        </button>
                    </div>
                </form>
            ) : (
                <div className={style.loadingContainer}>
                    {isLoading && (
                        <div>
                            <div className={`${style.loading} ${style.greenLoading}`}></div>
                            <p>Cadastro realizado com sucesso!</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default FormCadastroCliente;
