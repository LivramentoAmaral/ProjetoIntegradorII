import React, { useState, useEffect } from 'react';
import api from "../../api/index";
import style from "./style.module.css";

function ProductCard({ searchTerm }) {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        const getAllProducts = async () => {
            try {
                const response = await api.get('/products');

                if (response.status === 200) {
                    setProducts(response.data);
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

    useEffect(() => {
        if (searchTerm) {
            const filtered = products.filter((product) =>
                product.productName.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredProducts(filtered);
        } else {
            setFilteredProducts(products);
        }
    }, [searchTerm, products]);

    return (
        <div className={style.Container}>
            <h1>Lista de Produtos</h1>
            {error && <p>{error}</p>}

            {isLoading ? (
                <div className={style.loadingContainer}>
                    <div className={`${style.loading} ${style.greenLoading}`}></div>
                </div>
            ) : (
                <div className={style.containerGlobal}>
                    {(searchTerm ? filteredProducts : products).map((productALL) => (
                        <div key={productALL._id} className={style.containerProducts}>
                            <div className={style.cardProduct}>
                                {/* Exibir detalhes do produto aqui */}
                                <img src={productALL.productImage} alt={productALL.productName} />
                                <div className={style.descriptionFarm}>
                                    <div className={style.description}>
                                        <h2>{productALL.productName}</h2>
                                        <p>Preço: R${productALL.productPrice},00</p>
                                        <button type="submit">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="29" height="24" viewBox="0 0 29 24" fill="none">
                                                {/* Ícone do carrinho aqui */}
                                            </svg>  <span>+</span> Carrinho
                                        </button>
                                    </div>
                                    <div className={style.farm}>
                                        <h3>{productALL.username.farm}</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ProductCard;
