import React, { useState } from "react";
import style from "./style.module.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function NovaSenha() {
    const [passwordShown, setPasswordShown] = useState(false);
    const [password, setPassword] = useState("");

    const togglePasswordVisiblity = () => {
        setPasswordShown(!passwordShown);
    };

    return (
        <div className={style.container}>
            <h1>Nova senha</h1>
            <form className={style.form}>
                <div className={style.formLeft}>
                    <div className={style.inputWithIcon}>
                        <input
                            type={passwordShown ? "text" : "password"}
                            placeholder="Nova senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <span onClick={togglePasswordVisiblity}>
                            {passwordShown ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>
                    <button type="submit">Enviar</button>
                </div>
            </form>
        </div>
    );
}

export default NovaSenha;
