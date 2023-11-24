// ProductEditModal.jsx
import React, { useEffect, useState } from "react";
import api from "../../api";

const ProductEditModal = ({ isOpen, onClose, onUpdate, product }) => {
    const [editedProduct, setEditedProduct] = useState({
        productName: "",
        productDescription: "",
        productPrice: 0,
        productQuantity: 0,
        productImage: "",
    });

    useEffect(() => {
        if (product) {
            setEditedProduct({
                productName: product.productName,
                productDescription: product.productDescription,
                productPrice: product.productPrice,
                productQuantity: product.productQuantity,
                productImage: product.productImage,
            });
        }
    }, [product]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedProduct((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleUpdate = async () => {
        try {
            const response = await api.patch(
                `/products/${product.username}/${product._id}`,
                {
                    productName: editedProduct.productName,
                    productDescription: editedProduct.productDescription,
                    productPrice: editedProduct.productPrice,
                    productQuantity: editedProduct.productQuantity,
                    productImage: editedProduct.productImage,
                }
            );
            onUpdate(response.data);
            onClose();
        } catch (error) {
            console.error("Error updating product:", error.message);
            // Handle error (e.g., show a notification)
        }
    };
    

    return (
        <div style={{ display: isOpen ? "block" : "none" }}>
            <h2>Edit Product</h2>
            <form>
                <div>
                    <label htmlFor="productName">Name:</label>
                    <input
                        type="text"
                        id="productName"
                        name="productName"
                        value={editedProduct.productName}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="productDescription">Description:</label>
                    <textarea
                        id="productDescription"
                        name="productDescription"
                        value={editedProduct.productDescription}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="productPrice">Price:</label>
                    <input
                        type="number"
                        id="productPrice"
                        name="productPrice"
                        value={editedProduct.productPrice}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="productQuantity">Quantity:</label>
                    <input
                        type="number"
                        id="productQuantity"
                        name="productQuantity"
                        value={editedProduct.productQuantity}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="productImage">Image URL:</label>
                    <input
                        type="text"
                        id="productImage"
                        name="productImage"
                        value={editedProduct.productImage}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="button" onClick={handleUpdate}>
                    Save Changes
                </button>
                <button type="button" onClick={onClose}>
                    Cancel
                </button>
            </form>
        </div>
    );
};

export default ProductEditModal;
