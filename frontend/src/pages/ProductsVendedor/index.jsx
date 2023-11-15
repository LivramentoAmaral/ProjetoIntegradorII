// ProductsVendedor.jsx
import React, { useState, useEffect } from "react";
import api from "../../api";
import HeaderVendedor from "../../components/HeaderVendedor";
import Rodape from "../../components/footer";
import style from "./style.module.css";
import ProductEditModal from "../../components/ProductEditModal";
import ProductItem from "../../components/ProductIntem";
import ProductModal from "../../components/ProductModal";

const ProductsVendedor = () => {
    const [products, setProducts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const user_id = localStorage.getItem("user_id");

    useEffect(() => {
        // Fetch user products on component mount
        fetchUserProducts();
    }, []);

    const fetchUserProducts = async () => {
        try {
            const response = await api.get("/products"); // Change the endpoint if needed
            setProducts(response.data);
        } catch (error) {
            console.error("Error fetching user products:", error);
        }
    };

    const handleAddProduct = async (newProduct) => {
        try {
            const response = await api.post(`/products/${user_id}`, newProduct); // Add user_id
            setProducts([...products, response.data]);
        } catch (error) {
            console.error("Error adding product:", error);
        }
    };

    const handleEditProduct = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const handleUpdateProduct = async (updatedProduct) => {
        try {
            const response = await api.patch(
                `/products/${updatedProduct.username}/${updatedProduct._id}`,
                updatedProduct
            );
            setProducts((prevProducts) =>
                prevProducts.map((product) =>
                    product._id === updatedProduct._id ? response.data : product
                )
            );
        } catch (error) {
            console.error("Error updating product:", error);
        }
        setIsModalOpen(false);
        setSelectedProduct(null);
    };

    const handleDeleteProduct = async (productId) => {
        try {
            await api.delete(`/products/${user_id}/${productId}`);
            setProducts((prevProducts) =>
                prevProducts.filter((product) => product._id !== productId)
            );
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    return (
        <>
            <HeaderVendedor />
            <br />
            <main className={style.mainProdutor}>
                <div className={style.menuVendedor}>
                    {/* ... Search form ... */}
                    <button onClick={() => setIsModalOpen(true)}>
                        Adicionar produto
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            {/* ... SVG path for the "Add" button ... */}
                        </svg>
                    </button>
                    <div className={style.Farm}>
                        <h3>Nome da Fazenda</h3>
                    </div>
                </div>

                <div className="tabela">
                    <h2>Lista de Produtos</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Image</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {products.map((product) => (
                                <ProductItem
                                    key={product._id}
                                    product={product}
                                    onEdit={handleEditProduct}
                                    onDelete={handleDeleteProduct}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
            <br />
            <Rodape />

            {/* Add/Edit Product Modal */}
            <ProductEditModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setSelectedProduct(null);
                }}
                onUpdate={handleUpdateProduct}
                product={selectedProduct}
            />
        </>
    );
};

export default ProductsVendedor;
