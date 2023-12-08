import React, { useEffect, useState } from "react";
import Header from "../../components/Header/index.jsx";
import style from "./style.module.css";
import Rodape from "../../components/Footer/index.jsx";
import CardCart from "../../components/CardCart/index.jsx";
import api from "../../api/index.jsx";
import { jwtDecode } from "jwt-decode";

function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [cartId, setCartId] = useState(null);
    const [userId, setUserId] = useState(null);
    const [userName, setUserName] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            setUserId(decodedToken?.id);
            setUserName(decodedToken?.username);
        }
    }, []);

    useEffect(() => {
        if (userId) {
            const getCartIdByUserId = async () => {
                try {
                    const cartResponse = await api.get(`/cart/getCartIdByUserId/${userId}`);
                    if (cartResponse.status === 200) {
                        const cartId = cartResponse.data._id;
                        console.log('ID do carrinho:', cartId);
                        setCartId(cartId);
                    } else {
                        throw new Error('Erro ao obter o ID do carrinho do usuário');
                    }
                } catch (error) {
                    console.error('Erro ao obter o ID do carrinho:', error.message);
                }
            };
            getCartIdByUserId();
        }
    }, [userId]);

    useEffect(() => {
        if (userId && cartId) {
            api.get(`/cart/${userId}/${cartId}`)
                .then(response => {
                    const resposta = response.data;
                    console.log('Produtos recebidos:', response.data); // Verifique os produtos recebidos
                    setCartItems(resposta.products || []);
                })
                .catch(error => {
                    console.error("Erro ao buscar os itens do carrinho:", error);
                });
        }
    }, [userId, cartId]);

    function handleDeleteProduct(index) {
        const updatedProducts = [...cartItems];

        updatedProducts.splice(index, 1);

        setCartItems(updatedProducts);
    }

    return (
        <>
            <Header cartItems={cartItems} />
            <main className={style.containerCart}>
                <div className={style.text}>
                    <h2>Meu carrinho</h2>
                    <p>Resumo dos pedidos</p>
                </div>
                {cartItems.length > 0 ? (
                    cartItems.map((product, index) => (
                        <CardCart
                            index={index}
                            key={product._id}
                            product={product}
                            onDeleteProduct={handleDeleteProduct}
                            userId={userId}
                            cartId={cartId}
                            user={userName}
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
