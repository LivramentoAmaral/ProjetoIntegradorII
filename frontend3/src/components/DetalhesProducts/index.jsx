// ProductDetails.js
import React from 'react';
import styles from './style.module.css';

const ProductDetails = ({ product, addToCart, hideDetails }) => {
  if (!product) {
    return null;
  }
  console.log(product.username.username);

  return (
    <div className={styles.modalBackdrop} onClick={hideDetails}>
      <div className={styles.productDetails}>
        <img src={product.productImage} alt={product.productName} />
        <div className={styles.productDescription}>
          <h2>{product.productName}</h2>
          <p className={styles.descricaoText}>{product.productDescription}</p>
          <p>Fazenda: {product.username.farm}</p>
          <p>Produtor: {product.username.username}</p>
          <p>Preço: R$ {product.productPrice}</p>
          <button type="button" onClick={() => addToCart(product._id)}>
            Adicionar ao carrinho
          </button>
          <button type="button" onClick={hideDetails}>
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
