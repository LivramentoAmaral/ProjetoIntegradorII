import React, { useState } from "react";
import api from "../../api";
import style from "./style.module.css";

const ProductAddModal = ({ isOpen, user_id, onClose, setProducts }) => {
  const [newProduct, setNewProduct] = useState({
    productName: "",
    productDescription: "",
    productPrice: 0,
    productQuantity: 0,
    productImage: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAddProduct = async () => {
    try {
      const response = await api.post(`/products/${user_id}`, newProduct);
      if (response.status === 201) {
        setProducts((prevProducts) => [...prevProducts, response.data]);
        onClose();
        setNewProduct({
          productName: "",
          productDescription: "",
          productPrice: 0,
          productQuantity: 0,
          productImage: "",
        })
      }
    } catch (error) {
      console.error("Error adding product:", error.response);
    }
  };

  return (
    <div className={style.Modal} style={{ display: isOpen ? "block" : "none" }}>
      <div className={style.conteudo}>
        <h2>Adicionar novo Produto</h2>
        <form className={style.form}>
          <div>
            <label htmlFor="productName">Nome do Produto </label>
            <input
              type="text"
              id="productName"
              name="productName"
              value={newProduct.productName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="productDescription">Descrição do Produto</label>
            <textarea
              id="productDescription"
              name="productDescription"
              value={newProduct.productDescription}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="productPrice">Preço</label>
            <input
              type="number"
              id="productPrice"
              name="productPrice"
              value={newProduct.productPrice}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="productQuantity">Quantidade</label>
            <input
              type="number"
              id="productQuantity"
              name="productQuantity"
              value={newProduct.productQuantity}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="productImage">Image URL</label>
            <input
              type="text"
              id="productImage"
              name="productImage"
              value={newProduct.productImage}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="button" onClick={handleAddProduct}>
            Add Product
          </button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductAddModal;
