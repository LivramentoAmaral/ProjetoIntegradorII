import React from "react";
import style from "./style.module.css";
import api from "../../api/index";

function CardCart({ product, user, onDeleteProduct, userId, cartId }) {
    const { productName, productDescription, productPrice, productImage, username } = product;

    const [quantity, setQuantity] = React.useState(1 );



    const calculateTotal = () => {
        return (parseFloat(productPrice.replace(',', '.')) * quantity).toFixed(2);
    };

    const [totalPrice, setTotalPrice] = React.useState(calculateTotal());

    React.useEffect(() => {
        setTotalPrice(calculateTotal());
    }, [quantity, productPrice]);

    const mensagem = `Olá ${product.username.username}!%0a%0aEspero que esteja tudo bem. Me deparei com o seu produto ${productName} (${quantity} unidade(s)) e fiquei muito interessado! Gostaria bastante de adquiri-lo.%0a%0aVocê poderia me fornecer mais informações sobre disponibilidade, preço e formas de pagamento? Estou realmente ansioso para fazer essa aquisição o mais rápido possível.%0a%0aAgradeço desde já e aguardo sua resposta!%0a%0aAtenciosamente,%0a${user}`;

    function openLink() {
        window.open(`https://whatsa.me/55${product.username.phoneWhatzap}/?t=${mensagem}`);
    }

    async function excluirItemCart() {
        try {
            const response = await api.delete(`/cart/products/${userId}/${cartId}`, {
                data: { product_id: product._id }
            });

            if (response.status === 200) {
                console.log("Produto excluído do carrinho com sucesso!");
                onDeleteProduct(product._id);
            } else {
                console.log("Erro ao excluir produto do carrinho");
            }
        } catch (error) {
            console.error("Erro ao excluir produto do carrinho:", error.message);
        }
    }

    const handleQuantityChange = (e) => {
        if (e.target.value < 1) {
            return;
        }
        const newQuantity = parseInt(e.target.value);
        setQuantity(newQuantity);
        setTotalPrice((parseFloat(productPrice.replace(',', '.')) * newQuantity).toFixed(2));
    };

    return (
        <div className={style.card}>
            <div className={style.img}>
                <img src={productImage} alt="" />
                <div className={style.nomePrice}>
                    <p>{productName}</p>
                    <p>R$ {productPrice}</p>
                    <div className={style.quantity}>
                        <label htmlFor="quantity">Quantidade:</label>
                        <input
                            type="number"
                            id="quantity"
                            name="quantity"
                            min="1"
                            value={quantity}
                            onChange={handleQuantityChange}
                        />
                    </div>
                </div>
            </div>

            <div className={style.Resumopedido}>
                <p>{product.username.username}</p>
                <p>{product.username.farm}</p>
                <div className={style.valortototal}>
                    <p>Valor total</p>
                    <p> R$ {totalPrice}</p>
                </div>

                <div className={style.btn}>
                    <a onClick={openLink} className={style.btnwhatzapp}>
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
