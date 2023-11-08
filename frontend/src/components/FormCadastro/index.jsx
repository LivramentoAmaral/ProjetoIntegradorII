import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importe o useHistory
import api from "../../api/index";
import style from "./style.module.css";

function FormCadastro() {
    const [tipoUsuario, setTipoUsuario] = useState("1");
    const [primeiroNome, setPrimeiroNome] = useState("");
    const [sobrenome, setSobrenome] = useState("");
    const [fazenda, setFazenda] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [telefone, setTelefone] = useState("");
    const [endereco, setEndereco] = useState({
        city: "",
        road: "",
        number: "",
        neighborhood: "",
        complement: "",
    });
    const [sucesso, setSucesso] = useState(false); // Novo estado para o sucesso
    const navegate = useNavigate(); // Inicialize o useHistory

    const handleTipoUsuarioChange = (e) => {
        setTipoUsuario(e.target.value);
    };

    const containerClassName =
        tipoUsuario === "1" ? style.container : style.containerComprador;

    const tipoUsuarioClassName =
        tipoUsuario === "1" ? style.tipoUsuarioProdutor : style.tipoUsuarioComprador;

    const handleCadastroSubmit = async (e) => {
        e.preventDefault();

        const novoUsuario = {
            username: `${primeiroNome} ${sobrenome}`,
            farm: fazenda,
            email: email,
            password: senha,
            phoneWhatzap: telefone,
            address: endereco,
        };

        try {
            const response = await api.post('/users', novoUsuario);

            if (response.status === 201) {
                setSucesso(true); // Define o estado de sucesso como verdadeiro
                // Redireciona para outra página após o sucesso
                setTimeout(() => {
                    navegate.push("/loginvendedor");
                }, 3000); // Redireciona após 3 segundos (você pode ajustar esse valor)
            }
        } catch (error) {
            console.error('Erro ao criar usuário:', error);
        }
    };

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

            {sucesso ? ( // Renderiza a animação de sucesso quando sucesso for verdadeiro
                <div className={style.animacaoSucesso}>
                    <p>Cadastro realizado com sucesso!</p>
                </div>
            ) : tipoUsuario === "1" ? (
                <form className={style.form} onSubmit={handleCadastroSubmit} method="post" action="/users">
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
                            value={endereco.city}
                            onChange={(e) => setEndereco({ ...endereco, city: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Bairro"
                            value={endereco.neighborhood}
                            onChange={(e) => setEndereco({ ...endereco, neighborhood: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Rua"
                            value={endereco.road}
                            onChange={(e) => setEndereco({ ...endereco, road: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Número"
                            value={endereco.number}
                            onChange={(e) => setEndereco({ ...endereco, number: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Complemento (Opcional)"
                            value={endereco.complement}
                            onChange={(e) => setEndereco({ ...endereco, complement: e.target.value })}
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
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Senha"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                        />
                        <button type="submit">Cadastrar</button>
                    </div>
                </form>
            ) : null}
        </div>
    );
}

export default FormCadastro;
