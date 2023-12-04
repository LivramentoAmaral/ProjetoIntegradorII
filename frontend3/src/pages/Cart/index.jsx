import React, { useEffect, useState } from "react";
import Header from "../../components/Header/index.jsx";
import style from "./style.module.css";
import Rodape from "../../components/Footer/index.jsx";
import CardCart from "../../components/CardCart/index.jsx";
import api from "../../api/index.jsx";
import { jwtDecode } from "jwt-decode";

function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const getTokenPayload = () => {
        const token = localStorage.getItem('token');
        if (token) {
            return jwtDecode(token); // Decodifica o token JWT
        }
        return null;
    };

    const userId = getTokenPayload()?.id;
    const cartId = localStorage.getItem('cartId');

    console.log("card",cartId);
    console.log("user",userId);

    


    useEffect(() => {
        // ID do usuário simulado

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
            {cartItems.length > 0 ? (
                <>
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
                                cartId={cartId}
                                userId={userId}
                            />
                        ))}
                    </div>
                ))}
            </>
            ) : (
                
            <div className={style.containerSemProducts}>
                <p>Sem produtos no carrinho</p>
            </div>

                
            )}
        </main>
        <Rodape />
    </>
    );
}

export default Cart;
