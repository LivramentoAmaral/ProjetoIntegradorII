import React, { useState } from "react";
import style from "./style.module.css";
import imgform from "../../assets/imglogin.png";
import { useNavigate } from "react-router-dom";
import api from "../../api";

function FormLoginCliente() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const history = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post("/session", {
                email: email,
                password: senha,
            });

            if (response.status === 200) {
                const { accessToken } = response.data;
                localStorage.setItem("token", accessToken);
                console.log("token");

                const userResponse = await api.get("/users");

                const userClientResponse = await api.get("/usersclient");

                const userType = (userResponse.data.find(u => u.email === email)) ? "user" : "usercliente";

                localStorage.setItem("userType", userType);

                if (userType === "usercliente") {
                    console.log("Login realizado com sucesso como cliente", userType);
                    history("/");
                } else {
                    console.log("Login realizado com sucesso como usuário", userType);
                    history("/meusproducts");
                }
            } else {
                console.log("Falha no login");
            }
        } catch (error) {
            console.error("Erro de autenticação:", error.message);
        }
    };

    return (
        <div className={style.container}>
            <form className={style.form} onSubmit={handleLogin}>
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
                <h2>Entre para desvendar oportunidades: vender, comprar e se encantar na nossa feira online!</h2>
                <br />
                <p>
                    Seja bem-vindo! <br /> <br />
                    Faça o login para acessar sua conta de vendedor ou de cliente e começar a vender ou negociar produtos.
                </p>
                <div className={style.imgbtn}>
                    <div className={style.imgdiv}>
                        <img src={imgform} alt="" srcSet="" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FormLoginCliente;
