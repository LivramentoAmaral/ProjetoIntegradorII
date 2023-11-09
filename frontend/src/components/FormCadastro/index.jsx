import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
    const [sucesso, setSucesso] = useState(false);
    const navigate = useNavigate();

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
                setSucesso(true);

                setTimeout(() => {
                    navigate("/loginvendedor");
                }, 3000);
            }
        } catch (error) {
            console.error('Erro ao criar usuário:', error);
        }
    };

    return (
        <div>
            {!sucesso && (
                <div className={`${style.container} ${containerClassName}`}>
                    <div className={style.containertipo}>
                        <div className={`${style.tipoUsuario} ${tipoUsuarioClassName} `}>
                            <h1>Como deseja se cadastrar ?</h1>
                            <select value={tipoUsuario} onChange={handleTipoUsuarioChange}>
                                <option value="1">Produtor</option>
                                <option value="2">Comprador</option>
                            </select>
                        </div>
                    </div>
                    {tipoUsuario == "1" ? (<form className={style.form} onSubmit={handleCadastroSubmit} method="post" action="/users">
                        <div className={style.formLeft}>
                            <label htmlFor="" className={style.labelForm}>
                                Informações de Cadastro (Produtor)
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
                                required
                            />
                            <input
                                type="text"
                                placeholder="Telefone"
                                value={telefone}
                                onChange={(e) => setTelefone(e.target.value)}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Cidade"
                                value={endereco.city}
                                onChange={(e) => setEndereco({ ...endereco, city: e.target.value })}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Bairro"
                                value={endereco.neighborhood}
                                onChange={(e) => setEndereco({ ...endereco, neighborhood: e.target.value })}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Rua"
                                value={endereco.road}
                                onChange={(e) => setEndereco({ ...endereco, road: e.target.value })}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Número"
                                value={endereco.number}
                                onChange={(e) => setEndereco({ ...endereco, number: e.target.value })}
                                required
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
                    ) : (<form className={style.form} onSubmit={handleCadastroSubmit} method="post">
                        <div className={style.formLeft}>
                            <label htmlFor="" className={style.labelForm}>
                                Informações de Cadastro (Produtor)
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

                            <button type="submit">Cadastrar</button>

                        </div>
                    </form>)}
                </div>
            )}

            {sucesso ? (
                <div className={style.loadingContainer}>
                    <div className={`${style.loading} ${style.greenLoading}`}></div>
                </div>
            ) : null}
        </div>
    );
}

export default FormCadastro;
