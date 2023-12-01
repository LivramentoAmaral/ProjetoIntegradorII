import React, { useEffect, useState } from "react";
import Header from "../../components/Header/index.jsx";
import style from "./style.module.css";
import Rodape from "../../components/Footer/index.jsx";
import CardCart from "../../components/CardCart/index.jsx";
import api from "../../api/index.jsx";

function Cart() {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const userId = "65651865198030b2e881aa2f"; // ID do usuário simulado

        api.get(`/cart/${userId}`)
            .then(response => {
                setCartItems(response.data || []);
            })
            .catch(error => {
                console.error("Erro ao buscar os itens do carrinho:", error);
            });
    }, []);

    // Função para atualizar a lista de produtos no carrinho após a exclusão
    function handleDeleteProduct(productId) {
        setCartItems(prevCartItems =>
            prevCartItems.map(cartItem => ({
                ...cartItem,
                products: cartItem.products.filter(product => product._id !== productId)
            }))
        );
    }

    return (
        <>
            <Header />
            <main className={style.containerCart}>
                <div className={style.text}>
                    <h2>Meu carrinho</h2>
                    <p>Resumo dos pedidos</p>
                </div>
                {cartItems.map(cartItem => (
                    <div key={cartItem._id}>
                        {cartItem.products.map(product => (
                            <CardCart
                                key={product._id}
                                product={product}
                                user={cartItem.username.username}
                                onDeleteProduct={handleDeleteProduct}
                            />
                        ))}
                    </div>
                ))}
            </main>
            <Rodape />
        </>
    );
}

export default Cart;
