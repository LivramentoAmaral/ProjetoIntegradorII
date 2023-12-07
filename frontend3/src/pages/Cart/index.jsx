import React, { useEffect, useState, useContext } from "react";
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
    const  user_name = getTokenPayload()?.username;
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


    function handleDeleteProduct(index) {
        const updatedProducts = [...cartItems.products];

        updatedProducts.splice(index, 1);

        setCartItems({
            ...cartItems,
            products: updatedProducts
        });
    }

    console.log()

    return (
        <>
            <Header
                cartItems={cartItems.products}
            />
            <main className={style.containerCart}>
                <div className={style.text}>
                    <h2>Meu carrinho</h2>
                    <p>Resumo dos pedidos</p>
                </div>
                {cartItems.products && Array.isArray(cartItems.products) && cartItems.products.length > 0 ? (

                    cartItems.products.map((product, index) => (
                        <CardCart
                            index={index}
                            key={product._id}
                            product={product}
                            onDeleteProduct={handleDeleteProduct}
                            userId={userId}
                            cartId={cartId}
                            user={user_name}
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
