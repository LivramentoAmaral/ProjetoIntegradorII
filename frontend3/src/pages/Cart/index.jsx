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
    const [isLoading, setIsLoading] = useState(true); // Novo estado para controlar o carregamento

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
                })
                .finally(() => {
                    setIsLoading(false); // Marca o carregamento como concluído após receber os dados
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
            {isLoading ? ( // Exibe o indicador de carregamento enquanto os dados são buscados
                <div className={style.loadingContainer}>
                    <div className={`${style.loading} ${style.greenLoading}`}></div>
                    <p>Carregando Produtos Do Carrinho ...</p>
                </div>
            ) : (
                <>
                    {cartItems.length > 0 && (
                        <main className={style.containerCart}>
                            <div className={style.text}>
                                <h2>Meu carrinho</h2>
                                <p>Resumo dos pedidos</p>
                            </div>
                            {cartItems.map((product, index) => (
                                <CardCart
                                    index={index}
                                    key={product._id}
                                    product={product}
                                    onDeleteProduct={handleDeleteProduct}
                                    userId={userId}
                                    cartId={cartId}
                                    user={userName}
                                />
                            ))}
                        </main>
                    )}
                    {cartItems.length === 0 && (
                        <div className={style.containerSemProducts}>
                            <p>Sem produtos no carrinho</p>
                        </div>
                    )}
                </>
            )}
            <Rodape />
        </>
    );
}

export default Cart;
