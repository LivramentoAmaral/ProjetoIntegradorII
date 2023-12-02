import React, { useState, useEffect } from "react";
import api from "../../api";
import style from "./style.module.css";

const ProductAddModal = ({ isOpen, user_id, onClose, setProducts }) => {
  const [newProduct, setNewProduct] = useState({
    productName: "",
    productDescription: "",
    productPrice: "",
    
  });

  const [imagem, setImagem] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [activeTab, setActiveTab] = useState(1);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAddProduct = async () => {
    try {
      const form = new FormData();
      form.append("productName", newProduct.productName);
      form.append("productDescription", newProduct.productDescription);
      form.append("productPrice", newProduct.productPrice);
      form.append("productQuantity", newProduct.productQuantity);
      form.append("productImage", imagem);

      const response = await api.post(`/products/${user_id}`, form, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NjUxODY1MTk4MDMwYjJlODgxYWEyZiIsImlhdCI6MTcwMTQ2NjI1MywiZXhwIjoxNzAxNTUyNjUzfQ.1ZSYmy-0OBNL4X6u2AR4OAdJrX-o0yaL-pbOO2cmF7M'
        },
      });

      if (response.status === 201) {
        setProducts((prevProducts) => [...prevProducts, response.data]);

        onClose();
        setNewProduct({
          productName: "",
          productDescription: "",
          productPrice: "",
         
        });
        setImagem(null);
        setImagePreview("");
      }
    } catch (error) {
      console.error("Error adding product:", error.response);
    }
  };

  useEffect(() => {
    if (imagem) {
      const imageURL = URL.createObjectURL(imagem);
      setImagePreview(imageURL);
    }
  }, [imagem]);

  const handleKeyPress = (e) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("keydown", handleKeyPress);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [isOpen, onClose]);

  const handleNext = () => {
    if (activeTab === 1) {
      setActiveTab(2);
    }
  };

  const handlePrevious = () => {
    if (activeTab === 2) {
      setActiveTab(1);
    }
  };

  return (
    <div
      className={style.Modal}
      style={{ display: isOpen ? "block" : "none" }}
      onKeyDown={handleKeyPress}
      tabIndex={0}
    >
      <div className={style.conteudo}>
        <h2>Adicionar novo Produto</h2>
        <form className={style.form}>
          {activeTab === 1 && (
            <div className={style.tabContent} id="content1">
              <div>
                <label htmlFor="productName">Nome do Produto</label>
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
                  type="text"
                  id="productPrice"
                  name="productPrice"
                  value={newProduct.productPrice}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className={style.buttons}>
                <button type="button" onClick={handleNext}>
                  Próximo
                </button>
                <button type="button" onClick={onClose}>
                  Cancelar
                </button>
              </div>
            </div>
          )}

          {activeTab === 2 && (
            <div className={style.tabContent} id="content2">
              <div>
                <label htmlFor="productImage">Imagem</label>
                <input
                  type="file"
                  id="productImage"
                  name="productImage"
                  accept="image/*"
                  onChange={(e) => setImagem(e.target.files[0])}
                  required
                />
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    style={{ width: "100%",height: "300px" }}
                  />
                )}
              </div>
              <div className={style.buttons}>
                <button type="button" onClick={handleAddProduct}>
                  Adicionar Produto
                </button>
                <button type="button" onClick={handlePrevious}>
                  Anterior
                </button>
                <button type="button" onClick={onClose}>
                  Cancelar
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ProductAddModal;
