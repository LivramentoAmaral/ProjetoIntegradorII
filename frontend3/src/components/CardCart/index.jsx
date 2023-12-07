import React from "react";
import style from "./style.module.css";
import api from "../../api/index";
import Swal from 'sweetalert2';


function CardCart({ index, product, user, onDeleteProduct, userId, cartId }) {
    const { productName, productDescription, productPrice, productImage, username } = product;
    const [quantity, setQuantity] = React.useState(1);



    const calculateTotal = () => {
        return (parseFloat(productPrice.replace(',', '.')) * quantity).toFixed(2);
    };

    const [totalPrice, setTotalPrice] = React.useState(calculateTotal());

    React.useEffect(() => {
        setTotalPrice(calculateTotal());
    }, [quantity, productPrice]);

    const mensagem = `Olá ${product.username.username}!%0a%0aEspero que esteja tudo bem. Me deparei com o seu produto ${productName} (${quantity} unidade(s)) e fiquei muito interessado! Gostaria bastante de adquiri-lo.%0a%0aVocê poderia me fornecer mais informações sobre disponibilidade, preço e formas de pagamento? Estou realmente ansioso para fazer essa aquisição o mais rápido possível.%0a%0aAgradeço desde já e aguardo sua resposta!%0a%0aAtenciosamente,%0a${user}`;

    console.log(mensagem)
    function openLink() {
        window.open(`https://whatsa.me/55${product.username.phoneWhatzap}/?t=${mensagem}`);
    }


    async function excluirItemCart() {
        try {
            const response = await Swal.fire({
                title: `Deseja excluir ${productName} do seu carrinho ${user}?`,
                text: "Você não poderá reverter essa ação!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'excluir'
            });

            if (response.isConfirmed) {
                const deleteResponse = await api.delete(`/cart/products/${userId}/${cartId}`, {
                    data: { product_id: product._id }
                });

                if (deleteResponse.status === 200) {
                    console.log('Produto excluído do carrinho com sucesso!');
                    onDeleteProduct(index);
                    Swal.fire({
                        title: 'Deleted!',
                        text: 'Your file has been deleted.',
                        icon: 'success'
                    });
                } else {
                    console.log('Erro ao excluir produto do carrinho');
                    Swal.fire({
                        text: 'Erro ao excluir produto do carrinho',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                }
            }
        } catch (error) {
            console.error('Erro ao excluir produto do carrinho:', error.message);
            Swal.fire({
                text: 'Erro ao excluir produto do carrinho',
                icon: 'error',
                confirmButtonText: 'OK'
            });
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
                        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35" fill="none">
                            <path d="M22.5982 19.426L22.2236 18.4988C21.5531 18.7697 20.8249 18.8193 20.3433 18.671L20.3395 18.6699C19.2122 18.3278 18.4519 17.8764 17.8857 17.389C17.3134 16.8962 16.9007 16.3342 16.4948 15.7038C16.1206 15.1191 16.233 14.1497 16.7338 13.1865L16.7353 13.1835C17.2134 12.2562 17.2864 10.8361 16.2916 9.92628L16.2912 9.92592L14.4633 8.256L14.4627 8.25547C13.3185 7.21181 11.3534 6.86325 10.0729 8.24865C8.97312 9.43588 8.05437 10.9996 7.60096 12.596C7.15191 14.1771 7.12074 15.9482 8.04705 17.3896C10.5584 21.3055 14.0109 24.593 17.8944 27.0895L17.8951 27.0899C21.383 29.3285 24.925 27.3129 26.9067 25.7099L26.9068 25.7099C28.5057 24.4161 28.361 22.1594 27.1019 20.8183L27.1016 20.8179L25.4016 19.0093C25.4016 19.0092 25.4015 19.0092 25.4015 19.0091C24.4834 18.0291 23.0909 18.1465 22.2218 18.4995L22.5982 19.426ZM22.5982 19.426C23.2876 19.1459 24.1619 19.1485 24.6718 19.6929L8.88881 16.8498C7.46505 14.6355 8.80428 11.0896 10.8065 8.92824C11.6043 8.06422 12.9197 8.20161 13.7888 8.9943L15.6167 10.6642C16.1714 11.1715 16.1925 12.054 15.8465 12.7252C15.2997 13.7768 14.9775 15.1904 15.6537 16.2447C16.5042 17.5658 17.5503 18.8685 20.0491 19.6268C20.8046 19.8593 21.774 19.7589 22.5982 19.426ZM17.4954 1.00001L17.4956 1.00001C26.4881 0.992539 34 8.52045 34 17.4998C34 26.4855 26.4896 33.9913 17.4954 33.9863H17.4943C15.6209 33.9873 13.7647 33.67 12.0039 33.0512C10.926 32.6725 9.72077 32.4861 8.50675 32.7056L1.3807 33.9944L1.37848 33.9948C1.32267 34.005 1.26516 34.0002 1.2118 33.9809C1.15843 33.9616 1.1111 33.9285 1.07468 33.8849C1.03825 33.8412 1.01403 33.7887 1.00452 33.7326C0.995012 33.6765 1.00057 33.6189 1.02061 33.5656L1.02067 33.5655L2.64576 29.2456C3.30263 27.4995 3.04897 25.632 2.36627 24.0538C1.47396 21.991 1.00771 19.7604 1.00546 17.4967C1.00832 8.51791 8.51215 1.00498 17.4954 1.00001ZM0.0847062 33.2134L0.0847622 33.2134L0.0847062 33.2134Z" fill="white" stroke="#529641" stroke-width="2" />
                        </svg> Finalizar Pedido
                    </a>
                    <button className={style.excluir} onClick={excluirItemCart}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="27" height="28" viewBox="0 0 27 28" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M11.0276 4.02262C11.4561 3.59422 11.9886 3.28442 12.5728 3.12353C13.1571 2.96264 13.7731 2.95617 14.3605 3.10476C14.948 3.25334 15.4869 3.55189 15.9244 3.97119C16.3618 4.39049 16.683 4.91618 16.8564 5.49683H10.1474C10.3139 4.93998 10.6163 4.43334 11.0276 4.02262ZM7.079 5.49683C7.31842 3.9653 8.09723 2.56973 9.27494 1.56182C10.4527 0.553906 11.9518 0 13.5019 0C15.052 0 16.5511 0.553906 17.7289 1.56182C18.9066 2.56973 19.6854 3.9653 19.9248 5.49683H25.5036C25.9015 5.49683 26.2831 5.65488 26.5644 5.93623C26.8458 6.21757 27.0038 6.59916 27.0038 6.99704C27.0038 7.39492 26.8458 7.7765 26.5644 8.05785C26.2831 8.33919 25.9015 8.49725 25.5036 8.49725H23.5033V24.9996C23.5033 25.3936 23.4257 25.7838 23.2749 26.1478C23.1241 26.5118 22.9031 26.8426 22.6245 27.1212C22.3459 27.3998 22.0151 27.6208 21.6511 27.7716C21.2871 27.9224 20.8969 28 20.5029 28H6.50092C6.1069 28 5.71673 27.9224 5.35271 27.7716C4.98868 27.6208 4.65791 27.3998 4.3793 27.1212C4.10068 26.8426 3.87967 26.5118 3.72889 26.1478C3.5781 25.7838 3.50049 25.3936 3.50049 24.9996V8.49725H1.50021C1.10233 8.49725 0.720746 8.33919 0.439402 8.05785C0.158058 7.7765 0 7.39492 0 6.99704C0 6.59916 0.158058 6.21757 0.439402 5.93623C0.720746 5.65488 1.10233 5.49683 1.50021 5.49683H7.079ZM9.50134 11.7497C10.1914 11.7497 10.7515 12.3098 10.7515 12.9999V21.005C10.7515 21.3366 10.6198 21.6546 10.3853 21.889C10.1509 22.1235 9.83291 22.2552 9.50134 22.2552C9.16977 22.2552 8.85179 22.1235 8.61733 21.889C8.38288 21.6546 8.25116 21.3366 8.25116 21.005V12.9999C8.25116 12.3098 8.81124 11.7497 9.50134 11.7497ZM18.7526 12.9999C18.7526 12.6683 18.6209 12.3503 18.3865 12.1159C18.152 11.8814 17.834 11.7497 17.5025 11.7497C17.1709 11.7497 16.8529 11.8814 16.6185 12.1159C16.384 12.3503 16.2523 12.6683 16.2523 12.9999V21.005C16.2523 21.3366 16.384 21.6546 16.6185 21.889C16.8529 22.1235 17.1709 22.2552 17.5025 22.2552C17.834 22.2552 18.152 22.1235 18.3865 21.889C18.6209 21.6546 18.7526 21.3366 18.7526 21.005V12.9999Z" fill="#FF4B4B" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CardCart;
