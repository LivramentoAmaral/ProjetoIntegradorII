import React, { useState } from "react";
import api from "../../api/index";
import style from "./style.module.css";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';


function FormCadastroVendedor({ setCadastroRealizado }) {
    const [primeiroNome, setPrimeiroNome] = useState("");
    const [sobrenome, setSobrenome] = useState("");
    const [fazenda, setFazenda] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [telefone, setTelefone] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [endereco, setEndereco] = useState({
        city: "",
        road: "",
        number: "",
        neighborhood: "",
        complement: "",
    });
    const [sucesso, setSucesso] = useState(false);
    const navigate = useNavigate();

    const handleCadastroSubmit = async (e) => {
        e.preventDefault();

        const novoVendedor = {
            username: `${primeiroNome} ${sobrenome}`,
            farm: fazenda,
            email: email,
            password: senha,
            phoneWhatzap: telefone,
            address: endereco,
        };

        try {
            const response = await api.post("/users", novoVendedor);

            if (response.status === 201) {
                setSucesso(true);
                setCadastroRealizado(true);

                Swal.fire({
                    title: "Cadastro realizado com sucesso!",
                    icon: "success",
                    timer: 3000,
                });

                return navigate("/login");

            //     setTimeout(() => { 
            //         navigate("/login");
            //     }, 3000);
            }
        } catch (error) {
            console.error("Erro ao criar usuário:", error);
        }
    };

    return (
      <div className={style.containerForm}>
        {!sucesso ? (
          <form
            className={style.form}
            onSubmit={handleCadastroSubmit}
            method="post"
            action="/users"
          >
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

export default FormCadastroVendedor;
