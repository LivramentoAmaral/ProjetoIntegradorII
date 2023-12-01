import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as jwt_decode from 'jwt-decode';
import api from "../../api";

function FormLoginCliente() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            email,
            senha,
        };

        api.post("/session", data, {
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((response) => {
            const { accessToken } = response.data;

            if (accessToken) {
                const decodedToken = jwt_decode(accessToken);

                if (decodedToken && decodedToken.id) {
                    // Aqui você pode verificar o tipo de usuário, por exemplo:
                    // Supondo que o token tenha um campo userType
                    const userType = decodedToken.userType;

                    if (userType === "cliente") {
                        navigate("/home"); // Redirecionar para a página do cliente
                    } else if (userType === "vendedor") {
                        navigate("/meusprodutos"); // Redirecionar para a página do vendedor
                    } else {
                        // Lógica para outros tipos de usuário, se aplicável
                    }
                }
            }
        })
        .catch((error) => {
            console.log(error);
        });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
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
            </form>
        </div>
    );
}

export default FormLoginCliente;
