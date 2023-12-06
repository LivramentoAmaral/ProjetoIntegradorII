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
    useEffect(() => {
        if (userId && cartId) {
            api.get(`/cart/${userId}/${cartId}`)
                .then(response => {
                    const resposta = response.data;
                    console.log('Produtos recebidos:', response.data); // Verifique os produtos recebidos
                    setCartItems(resposta || []);
                })
                .catch(error => {
                    console.error("Erro ao buscar os itens do carrinho:", error);
                });
        }
    }, [userId, cartId]);

    // Função para atualizar a lista de produtos no carrinho após a exclusão
    function handleDeleteProduct(productId) {
        setCartItems(prevCartItems => {
            if (Array.isArray(prevCartItems)) {
                const updatedCartItems = prevCartItems.map(cartItem => {
                    if (cartItem && Array.isArray(cartItem.products)) {
                        const updatedProducts = cartItem.products.filter(product => product._id !== productId);
                        return { ...cartItem, products: updatedProducts };
                    }
                    return cartItem;
                });
                return updatedCartItems;
            } else {
                return prevCartItems;
            }
        });
    }



    console.log("cartItems", cartItems);


    return (
        <>
            <Header 
            cartItems = {cartItems.products}
            />
            <main className={style.containerCart}>
                <div className={style.text}>
                    <h2>Meu carrinho</h2>
                    <p>Resumo dos pedidos</p>
                </div>
                {cartItems.products && Array.isArray(cartItems.products) && cartItems.products.length > 0 ? (

                    cartItems.products.map(product => (
                        <CardCart
                            key={product._id}
                            product={product}
                            onDeleteProduct={handleDeleteProduct}
                            userId={userId}
                            cartId={cartId}
                        />
                    ))
                ) : (
                    <div className={style.containerSemProducts}><p>Sem produtos no carrinho</p></div>
                )}

            </main>
            <Rodape />
        </>
    );
}

export default Cart;
