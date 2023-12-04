import React, { useState, useEffect } from "react";
import api from "../../api";
import style from "./style.module.css";

const ProductEditModal = ({ isOpen, product, onClose, user_id, Authorization, setProducts }) => {
    const [productData, setProductData] = useState({
        productName: "",
        productDescription: "",
        productPrice: "",
        productImage: null,
    });

    const [imagePreview, setImagePreview] = useState(product?.productImage || null);
    const [activeTab, setActiveTab] = useState(1);

    useEffect(() => {
        if (isOpen && product?._id) {
            setProductData({
                productName: product.productName || "",
                productDescription: product.productDescription || "",
                productPrice: product.productPrice || "",
                productImage: product.productImage || null,
            });
            setImagePreview(product?.productImage); // Reset image preview
        }
    }, [isOpen, product]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleUpdateProduct = async () => {
        try {
            const form = new FormData();
            form.append("productName", productData.productName);
            form.append("productDescription", productData.productDescription);
            form.append("productPrice", productData.productPrice);
            form.append("productImage", productData.productImage);

            const response = await api.patch(
                `/products/${user_id}/${product?._id}`,
                form,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Authorization": `Bearer ${Authorization}`,
                    },
                }
            );

            if (response.status === 200) {
                // Lógica para atualizar os produtos após a atualização bem-sucedida, se necessário
                setProducts((prevProducts) => {
                    const newProducts = [...prevProducts];
                    const index = newProducts.findIndex(
                        (product) => product._id === response.data._id
                    );
                    newProducts[index] = response.data;
                    return newProducts;
                });

                onClose();
                setProductData({
                    productName: "",
                    productDescription: "",
                    productPrice: "",
                    productImage: null,
                });
                setImagePreview("");
            }
        } catch (error) {
            console.error("Error updating product:", error.response);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setProductData((prevData) => ({ ...prevData, productImage: file }));

        if (file) {
            const imageURL = URL.createObjectURL(file);
            setImagePreview(imageURL);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Escape") {
            onClose();
        }
    };

    useEffect(() => {
        if (productData.productImage) {
            if (productData.productImage instanceof File) { // if upload por file
                const imageURL = URL.createObjectURL(productData.productImage);
                setImagePreview(imageURL);
            }else{
                setImagePreview(productData.productImage); // up
            }
        }

    }, [productData.productImage]);

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
                <h2>Atualizar Produto</h2>
                <form className={style.form}>
                    {activeTab === 1 && (
                        <div className={style.tabContent} id="content1">
                            <div>
                                <label htmlFor="productName">Nome do Produto</label>
                                <input
                                    type="text"
                                    id="productName"
                                    name="productName"
                                    value={productData.productName}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="productDescription">Descrição do Produto</label>
                                <textarea
                                    id="productDescription"
                                    name="productDescription"
                                    value={productData.productDescription}
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
                                    value={productData.productPrice}
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
                                <label htmlFor="productImage">Nova Imagem</label>
                                <input
                                    type="file"
                                    id="productImage"
                                    name="productImage"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    required
                                />
                                {imagePreview && (
                                    // <h1>teste</h1>
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        style={{ width: "100%", height: "300px" }}
                                    />
                                )}
                            </div>
                            <div className={style.buttons}>
                                <button type="button" onClick={handleUpdateProduct}>
                                    Atualizar Produto
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

export default ProductEditModal;
