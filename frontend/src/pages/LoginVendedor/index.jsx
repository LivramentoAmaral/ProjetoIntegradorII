import FormLoginVendedor from "../../components/FormLoginVendedor";
import Header from "../../components/Header";
import Rodape from "../../components/footer";
import React from "react";

function LoginVendedor(){
    return(
        <>
        <Header />
        <br />
        <FormLoginVendedor />
        
        <br />
        <Rodape/>
        </>
    );
}

export default LoginVendedor;