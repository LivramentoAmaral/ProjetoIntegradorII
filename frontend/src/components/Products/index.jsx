import React, { useState, useEffect } from 'react';
import api from "../../api/index";
import style from "./style.module.css";

function ProductCard() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Estado para controlar o carregamento

    useEffect(() => {
        const getAllProducts = async () => {
            try {
                const response = await api.get('/products');

                if (response.status === 200) {
                    setProducts(response.data);
                }
                setIsLoading(false); // Quando os produtos foram carregados, definimos isLoading como false
            } catch (error) {
                console.error('Erro ao obter produtos:', error);
            }
        };

        getAllProducts();
    }, []);

    return (
        <div className={style.Container}>
            <h1>Lista de Produtos</h1>
            {isLoading ? (
                <div className={style.loadingContainer}>
                    <div className={`${style.loading} ${style.greenLoading}`}></div>
                </div>
            ) : (
                <div className={style.containerGlobal}>
                    {products.map((productALL) => (
                        <div key={productALL._id} className={style.containerProducts}>
                            <div className={style.cardProduct}>
                                <img src={productALL.productImage} alt={productALL.productName} />
                                <div className={style.descriptionFarm}>
                                    <div className={style.description}>
                                        <h2>{productALL.productName}</h2>
                                        <p>Preço: R${productALL.productPrice},00</p>
                                        <button type="submit">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="29" height="24" viewBox="0 0 29 24" fill="none">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M8.59334 1.14574C8.5532 0.83151 8.36605 0.540234 8.06823 0.328498C7.77042 0.116761 7.38321 -0.000319113 6.98182 6.53275e-07H1.96174C1.53262 6.53275e-07 1.12108 0.134125 0.817648 0.372867C0.514216 0.611609 0.34375 0.935413 0.34375 1.27305C0.34375 1.61068 0.514216 1.93448 0.817648 2.17322C1.12108 2.41197 1.53262 2.54609 1.96174 2.54609H5.51916L6.0628 6.79976C6.0628 6.82861 6.0628 6.85917 6.06712 6.88802L7.10695 15.027C7.20683 15.6138 7.57567 16.1518 8.14416 16.5397C8.71264 16.9276 9.44162 17.1387 10.1941 17.1335H22.8187C23.4865 17.1555 24.1453 17.0064 24.6962 16.7085C25.247 16.4107 25.6601 15.9803 25.8735 15.4819V15.4785L28.5485 9.15744V9.15574C28.701 8.79096 28.7415 8.40294 28.6665 8.02349C28.5915 7.64405 28.4032 7.284 28.1171 6.97289C27.8209 6.64571 27.4263 6.38142 26.9685 6.20368C26.5107 6.02595 26.004 5.94032 25.4938 5.95446H9.20602L8.59334 1.14574ZM24.9458 21.6333C24.9557 21.3659 24.8973 21.0997 24.7741 20.8504C24.6509 20.6011 24.4654 20.3738 24.2286 20.1819C23.9917 19.99 23.7083 19.8375 23.3952 19.7333C23.082 19.6292 22.7455 19.5755 22.4056 19.5755C22.0656 19.5755 21.7291 19.6292 21.416 19.7333C21.1028 19.8375 20.8195 19.99 20.5826 20.1819C20.3457 20.3738 20.1602 20.6011 20.037 20.8504C19.9138 21.0997 19.8554 21.3659 19.8653 21.6333C19.8653 22.1636 20.1331 22.6722 20.6097 23.0472C21.0863 23.4221 21.7327 23.6328 22.4067 23.6328C23.0807 23.6328 23.7271 23.4221 24.2036 23.0472C24.6802 22.6722 24.948 22.1636 24.948 21.6333H24.9458ZM11.3051 19.6321C11.9791 19.6321 12.6255 19.8427 13.1021 20.2177C13.5787 20.5927 13.8464 21.1013 13.8464 21.6316C13.8464 22.1619 13.5787 22.6705 13.1021 23.0455C12.6255 23.4205 11.9791 23.6311 11.3051 23.6311C10.6311 23.6311 9.9847 23.4205 9.50811 23.0455C9.03151 22.6705 8.76377 22.1619 8.76377 21.6316C8.76377 21.1013 9.03151 20.5927 9.50811 20.2177C9.9847 19.8427 10.6311 19.6321 11.3051 19.6321Z" fill="#F7F7F7" />
                                            </svg>  <span>+</span> Carrinho
                                        </button>
                                    </div>
                                    <div className={style.farm}>
                                        <img src="file:///home/marcos/Downloads/Ellipse%201.svg" alt="" />
                                        <h3>{productALL.username.farm}</h3>
                                    </div>
                                </div>
                            </div>
                        </div>))}
                </div>
            )
            }
        </div >
    );
}

export default ProductCard;