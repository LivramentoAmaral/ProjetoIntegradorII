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
                Swal.fire({
                    text: 'Você precisa estar logado para adicionar produtos ao carrinho!',
                    icon: 'warning',
                    confirmButtonText: 'OK'
                });
                navigate('/login');
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
                            text: 'Erro ao adicionar produto ao carrinho\n tente novamente email ou senha incorreto!',
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
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="23" height="24" viewBox="0 0 23 24" fill="none">
                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M5.27657 0.00171429C5.59523 0.00181651 5.9025 0.120253 6.1388 0.334056C6.37509 0.547859 6.52356 0.841792 6.55543 1.15886L7.044 6.01543H19.9851C20.3908 6.00086 20.7938 6.0872 21.1579 6.26672C21.5221 6.44624 21.8359 6.71331 22.0714 7.044C22.2984 7.35841 22.4476 7.72211 22.5069 8.1053C22.5662 8.48849 22.5339 8.88028 22.4126 9.24857L20.2886 15.6343V15.6377C20.119 16.1413 19.7904 16.5763 19.3523 16.8771C18.9143 17.1779 18.3904 17.3283 17.8594 17.3057H7.82914C7.23148 17.3111 6.65242 17.098 6.20072 16.7066C5.74902 16.3152 5.45575 15.7723 5.376 15.18L4.548 6.95657C4.54531 6.92694 4.54417 6.89718 4.54457 6.86743L4.11257 2.57143H1.28571C0.944722 2.57143 0.617695 2.43597 0.376577 2.19485C0.135459 1.95373 0 1.62671 0 1.28571C0 0.944722 0.135459 0.617695 0.376577 0.376577C0.617695 0.135459 0.944722 0 1.28571 0H5.27657V0.00171429ZM17.5337 19.8291C18.0693 19.8291 18.583 20.0419 18.9617 20.4206C19.3404 20.7993 19.5531 21.313 19.5531 21.8486C19.5531 22.3842 19.3404 22.8978 18.9617 23.2765C18.583 23.6552 18.0693 23.868 17.5337 23.868C16.9981 23.868 16.4845 23.6552 16.1058 23.2765C15.727 22.8978 15.5143 22.3842 15.5143 21.8486C15.5143 21.313 15.727 20.7993 16.1058 20.4206C16.4845 20.0419 16.9981 19.8291 17.5337 19.8291ZM10.7297 21.8486C10.7376 21.5785 10.6912 21.3097 10.5933 21.0579C10.4954 20.8061 10.348 20.5765 10.1597 20.3827C9.97153 20.189 9.74634 20.0349 9.49751 19.9297C9.24869 19.8245 8.98129 19.7703 8.71114 19.7703C8.441 19.7703 8.1736 19.8245 7.92477 19.9297C7.67595 20.0349 7.45076 20.189 7.26254 20.3827C7.07432 20.5765 6.9269 20.8061 6.82899 21.0579C6.73109 21.3097 6.6847 21.5785 6.69257 21.8486C6.70788 22.3737 6.92726 22.8723 7.30415 23.2383C7.68103 23.6044 8.18574 23.8092 8.71114 23.8092C9.23654 23.8092 9.74125 23.6044 10.1181 23.2383C10.495 22.8723 10.7144 22.3737 10.7297 21.8486ZM13.5171 8.54743C13.233 8.54743 12.9605 8.66031 12.7595 8.86124C12.5586 9.06217 12.4457 9.3347 12.4457 9.61886V10.7966H11.268C11.1273 10.7966 10.988 10.8243 10.858 10.8781C10.728 10.932 10.6099 11.0109 10.5104 11.1104C10.4109 11.2099 10.332 11.328 10.2781 11.458C10.2243 11.588 10.1966 11.7273 10.1966 11.868C10.1966 12.0087 10.2243 12.148 10.2781 12.278C10.332 12.408 10.4109 12.5261 10.5104 12.6256C10.6099 12.7251 10.728 12.804 10.858 12.8579C10.988 12.9117 11.1273 12.9394 11.268 12.9394H12.4457V14.1171C12.4457 14.4013 12.5586 14.6738 12.7595 14.8748C12.9605 15.0757 13.233 15.1886 13.5171 15.1886C13.8013 15.1886 14.0738 15.0757 14.2748 14.8748C14.4757 14.6738 14.5886 14.4013 14.5886 14.1171V12.9394H15.7663C15.907 12.9394 16.0463 12.9117 16.1763 12.8579C16.3063 12.804 16.4244 12.7251 16.5239 12.6256C16.6234 12.5261 16.7023 12.408 16.7562 12.278C16.81 12.148 16.8377 12.0087 16.8377 11.868C16.8377 11.7273 16.81 11.588 16.7562 11.458C16.7023 11.328 16.6234 11.2099 16.5239 11.1104C16.4244 11.0109 16.3063 10.932 16.1763 10.8781C16.0463 10.8243 15.907 10.7966 15.7663 10.7966H14.5886V9.61886C14.5886 9.3347 14.4757 9.06217 14.2748 8.86124C14.0738 8.66031 13.8013 8.54743 13.5171 8.54743Z" fill="#3D3D3D" />
                                                    </svg>
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
