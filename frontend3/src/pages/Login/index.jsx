import FormLoginCliente from "../../components/FormLogin";
import Header from "../../components/Header";
import Rodape from "../../components/Footer";
import React from "react";


function LoginCliente() {
    return (
        <>
            <Header />
            <br />
            <FormLoginCliente />
            <br />
            <Rodape/>
        </>

    )


}
export default LoginCliente;