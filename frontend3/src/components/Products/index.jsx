import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from "../../api/index";
import style from "./style.module.css";
import { jwtDecode } from "jwt-decode";
import ProductDetails from '../DetalhesProducts';
import Swal from 'sweetalert2';

function ProductCard({ searchTerm }) {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [hasProducts, setHasProducts] = useState(true);
    const navigate = useNavigate();
    const [cartId, setCartId] = useState(null);

    const getTokenPayload = () => {
        const token = localStorage.getItem('token');
        if (token) {
            return jwtDecode(token);
        }
        return null;
    };

    const userId = getTokenPayload()?.id;


    useEffect(() => {
        const getAllProducts = async () => {
            try {
                const response = await api.get('/products');

                if (response.status === 200) {
                    setProducts(response.data);
                    setHasProducts(!!response.data.length);
                } else {
                    setError(`Erro ao obter produtos: ${response.statusText}`);
                }
                setIsLoading(false);
            } catch (error) {
                setError(`Erro ao obter produtos: ${error.message}`);
                setIsLoading(false);
            }
        };

        getAllProducts();
    }, []);


    const addToCart = async (productId) => {
        try {
            const token = localStorage.getItem('token');
            const userId = token ? jwtDecode(token)?.id : null;
            const cartId = localStorage.getItem('cartId');

            if (!userId) {
                console.log('Usuário não está logado ou cadastrado');
                navigate('/cadastro');
                return;
            }

            if (userId && cartId) {
                const cartResponse = await api.get(`/cart/${userId}/${cartId}`);
                const cartItems = cartResponse.data.products;

                const existingProduct = cartItems.find(item => item._id === productId);

                if (existingProduct) {
                    // Mostrar uma mensagem ao usuário informando que o produto já está no carrinho
                    Swal.fire({
                        text: 'Este produto já está no carrinho!',
                        icon: 'warning',
                        confirmButtonText: 'OK'
                    });
                    return navigate('/cart');
                } else {
                    const response = await api.post(`/cart/${userId}/${cartId}`, {
                        product_id: productId
                    });

                    if (response.status === 200) {
                        setCartId(response.data._id);
                        localStorage.setItem('cartId', response.data._id);
                        console.log('Produto adicionado ao carrinho com sucesso!');

                        // Mostrar uma mensagem ao usuário informando que o produto foi adicionado ao carrinho
                        Swal.fire({
                            text: 'Produto adicionado ao carrinho com sucesso!',
                            icon: 'success',
                            confirmButtonText: 'OK'
                        });
                        return navigate('/cart');
                    } else {
                        setError(`Erro ao adicionar produto ao carrinho: ${response.statusText}`);

                        // Mostrar uma mensagem ao usuário informando que houve um erro ao adicionar o produto ao carrinho
                        Swal.fire({
                            text: 'Erro ao adicionar produto ao carrinho!',
                            icon: 'error',
                            confirmButtonText: 'OK'
                        });
                    }
                }
            }

            // Se o produto não estiver no carrinho, adicione-o

        } catch (error) {
            setError(`Erro ao adicionar produto ao carrinho: ${error.message}`);
        }
    };

    const [selectedProduct, setSelectedProduct] = useState(null);

    const showProductDetails = (productId) => {
        const selected = products.find(product => product._id === productId);
        setSelectedProduct(selected);
    };

    const hideProductDetails = () => {
        setSelectedProduct(null);
    };



    return (
        <div className={style.Container}>
            <h1 className={style.listaProdutos}>Lista de Produtos</h1>
            {error && <div className={style.error}><p>{error}</p></div>}

            <div className={hasProducts ? style.containerGlobal : style.noProducts}>
                {isLoading ? (
                    <div className={style.loadingContainer}>
                        <div className={`${style.loading} ${style.greenLoading}`}></div>
                    </div>
                ) : (
                    <>
                        {hasProducts ? (
                            (searchTerm ? products.filter(product => product.productName.toLowerCase().includes(searchTerm.toLowerCase())) : products).map((productALL) => (
                                <div key={productALL._id} className={style.containerProducts}>
                                    <div className={style.cardProduct}>
                                        <img src={productALL.productImage} alt={productALL.productName} />
                                        <div className={style.descriptionFarm}>
                                            <div className={style.description}>
                                                <h2>{productALL.productName}</h2>
                                                <p className={style.descricaoText}>{productALL.productDescription}</p>
                                                <p>R$ {productALL.productPrice}</p>

                                                <button type="button" onClick={() => addToCart(productALL._id)}>
                                                    Adicionar ao carrinho
                                                </button>
                                                <button type="button" onClick={() => showProductDetails(productALL._id)}>
                                                    Ver Detalhes
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className={style.noProductsMessage}>
                                {searchTerm ? `Nenhum produto encontrado com o termo "${searchTerm}".` : 'Nenhum produto cadastrado no sistema.'}
                            </p>
                        )}
                    </>
                )}
            </div>

            {/* Exibindo os detalhes do produto selecionado */}
            {selectedProduct && (
                <ProductDetails
                    product={selectedProduct}
                    addToCart={addToCart}
                    hideDetails={hideProductDetails}
                />
            )}
        </div>
    );
}


export default ProductCard;
