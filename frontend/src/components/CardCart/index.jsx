import React from "react";
import style from "./style.module.css";
import api from "../../api/index";

function CardCart({ product, user, onDeleteProduct }) {
    const { productName, productDescription, productPrice, productImage, username } = product;

    const mensagem = `Olá ${product.username.username}!%0a%0aEspero que esteja tudo bem. Me deparei com o seu produto ${productName} e fiquei muito interessado! Gostaria bastante de adquiri-lo.%0a%0aVocê poderia me fornecer mais informações sobre disponibilidade, preço e formas de pagamento? Estou realmente ansioso para fazer essa aquisição o mais rápido possível.%0a%0aAgradeço desde já e aguardo sua resposta!%0a%0aAtenciosamente,%0a${user}`;

    // função para abrir a tag a com o link do WhatsApp em outra página
    function openLink() {
        window.open(`https://whatsa.me/55${product.username.phoneWhatzap}/?t=${mensagem}`);
    }

    // função para excluir o produto do carrinho
    async function excluirItemCart() {
        try {
            const userId = "65651865198030b2e881aa2f"; // ID do usuário simulado
            const cartId = "656790aab5b5ea2d28b0cec1"; // ID do carrinho simulado

            const response = await api.delete(`/cart/products/${userId}/${cartId}`, {
                data: { product_id: product._id }
            });

            if (response.status === 200) {
                console.log("Produto excluído do carrinho com sucesso!");
                onDeleteProduct(product._id); // Atualiza a lista de produtos no carrinho
            } else {
                console.log("Erro ao excluir produto do carrinho");
            }
        } catch (error) {
            console.error("Erro ao excluir produto do carrinho:", error);
        }
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
                        {/*...código do ícone do WhatsApp */}
                        Finalizar Pedido
                    </a>
                    <button className={style.excluir} onClick={excluirItemCart}>
                        Excluir
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CardCart;
