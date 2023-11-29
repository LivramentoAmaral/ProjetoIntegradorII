import React from "react";
import Header from "../../components/Header";
import style from "./style.module.css";
import Rodape from "../../components/Footer";
import CardCart from "../../components/CardCart";

function Cart() {

    return (
        <>
            <Header />

            <main className={style.containerCart}>
                <div className={style.text}>
                    <h2>Meu carrinho</h2>
                    <p>Resumos dos pedidos</p>
                </div>
                <CardCart />

            </main>

            <Rodape />

        </>
    );
}

export default Cart;