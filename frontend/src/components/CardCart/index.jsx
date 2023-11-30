import React from "react";
import style from "./style.module.css";

function CardCart({ product, user }) {

    const { productName, productDescription, productPrice, productImage, username } = product;

    const mensagem = `Olá ${product.username.username}!%0a%0aEspero que esteja tudo bem. Me deparei com o seu produto ${productName} e fiquei muito interessado! Gostaria bastante de adquiri-lo.%0a%0aVocê poderia me fornecer mais informações sobre disponibilidade, preço e formas de pagamento? Estou realmente ansioso para fazer essa aquisição o mais rápido possível.%0a%0aAgradeço desde já e aguardo sua resposta!%0a%0aAtenciosamente,%0a${user}`;

    
    console.log(mensagem)

    // função para abrir a teg a com o link do whatzapp em outa pagina
    function openLink() {
        window.open(`https://whatsa.me/55${product.username.phoneWhatzap}/?t=${mensagem}`)
    }



    return (

        <div className={style.card}>
            <div className={style.img}>
                <img src={productImage} alt="" />
                <div className={style.nomePrice}>
                    <p>{productName}</p>
                    <p>{productPrice}</p>
                </div>
            </div>

            <div className={style.Resumopedido}>

                <p>{product.username.username}</p>
                <p>{product.username.farm}</p>
                <div className={style.valortototal}>
                    <p>Valor total</p>
                    <p>{productPrice}</p>
                </div>

                <div className={style.btn}>
                    <a onClick={openLink} className={style.btnwhatzapp}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35" fill="none">
                            <path d="M22.5982 19.426L22.2236 18.4988C21.5531 18.7697 20.8249 18.8193 20.3433 18.671L20.3395 18.6699C19.2122 18.3278 18.4519 17.8764 17.8857 17.389C17.3134 16.8962 16.9007 16.3342 16.4948 15.7038C16.1206 15.1191 16.233 14.1497 16.7338 13.1865L16.7353 13.1835C17.2134 12.2562 17.2864 10.8361 16.2916 9.92628L16.2912 9.92592L14.4633 8.256L14.4627 8.25547C13.3185 7.21181 11.3534 6.86325 10.0729 8.24865C8.97312 9.43588 8.05437 10.9996 7.60096 12.596C7.15191 14.1771 7.12074 15.9482 8.04705 17.3896C10.5584 21.3055 14.0109 24.593 17.8944 27.0895L17.8951 27.0899C21.383 29.3285 24.925 27.3129 26.9067 25.7099L26.9068 25.7099C28.5057 24.4161 28.361 22.1594 27.1019 20.8183L27.1016 20.8179L25.4016 19.0093C25.4016 19.0092 25.4015 19.0092 25.4015 19.0091C24.4834 18.0291 23.0909 18.1465 22.2218 18.4995L22.5982 19.426ZM22.5982 19.426C23.2876 19.1459 24.1619 19.1485 24.6718 19.6929L8.88881 16.8498C7.46505 14.6355 8.80428 11.0896 10.8065 8.92824C11.6043 8.06422 12.9197 8.20161 13.7888 8.9943L15.6167 10.6642C16.1714 11.1715 16.1925 12.054 15.8465 12.7252C15.2997 13.7768 14.9775 15.1904 15.6537 16.2447C16.5042 17.5658 17.5503 18.8685 20.0491 19.6268C20.8046 19.8593 21.774 19.7589 22.5982 19.426ZM17.4954 1.00001L17.4956 1.00001C26.4881 0.992539 34 8.52045 34 17.4998C34 26.4855 26.4896 33.9913 17.4954 33.9863H17.4943C15.6209 33.9873 13.7647 33.67 12.0039 33.0512C10.926 32.6725 9.72077 32.4861 8.50675 32.7056L1.3807 33.9944L1.37848 33.9948C1.32267 34.005 1.26516 34.0002 1.2118 33.9809C1.15843 33.9616 1.1111 33.9285 1.07468 33.8849C1.03825 33.8412 1.01403 33.7887 1.00452 33.7326C0.995012 33.6765 1.00057 33.6189 1.02061 33.5656L1.02067 33.5655L2.64576 29.2456C3.30263 27.4995 3.04897 25.632 2.36627 24.0538C1.47396 21.991 1.00771 19.7604 1.00546 17.4967C1.00832 8.51791 8.51215 1.00498 17.4954 1.00001ZM0.0847062 33.2134L0.0847622 33.2134L0.0847062 33.2134Z" fill="white" stroke="#529641" stroke-width="2" />
                        </svg>Finalizar Pedido</a>
                    <button className={style.excluir}> Excluir</button>
                </div>

            </div>

        </div>

    );
}

export default CardCart;

