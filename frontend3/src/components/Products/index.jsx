import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from "../../api/index";
import style from "./style.module.css";

function ProductCard({ searchTerm }) {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [hasProducts, setHasProducts] = useState(true);
    const navigate = useNavigate();
    const [cartId, setCartId] = useState(null);


    const getTokenPayload = () => {
        const token = localStorage.getItem('token');
        if (token) {
            return jwtDecode(token); // Decodifica o token JWT
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



    x


    useEffect(() => {
        if (searchTerm) {
            const filtered = products.filter((product) =>
                product.productName.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredProducts(filtered);
            setHasProducts(!!filtered.length);
        } else {
            setFilteredProducts(products);
            setHasProducts(!!products.length);
        }
    }, [searchTerm, products]);

    return (
        <div className={style.Container}>
            <h1 className={style.listaProdutos}>Lista de Produtos</h1>
            {error && <p>{error}</p>}

            {isLoading ? (
                <div className={style.loadingContainer}>
                    <div className={`${style.loading} ${style.greenLoading}`}></div>
                </div>
            ) : (
                <div className={hasProducts ? style.containerGlobal : style.noProducts}>
                    {hasProducts ? (
                        (searchTerm ? filteredProducts : products).map((productALL) => (
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
                                                    {/* ... SVG path */}
                                                </svg> Adicionar ao carrinho

                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        searchTerm ? (
                            <p className={style.noProductsMessage}>Nenhum produto encontrado com o termo "{searchTerm}".</p>
                        ) : (
                            <p className={style.noProductsMessage}>Nenhum produto cadastrado no sistema.</p>
                        )
                    )}
                </div>
            )}
        </div>
    );
}

export default ProductCard;
