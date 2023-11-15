// ProductItem.jsx
import React from "react";

const ProductItem = ({ product, onEdit, onDelete }) => {
    return (
        <tr>
            <td>{product.productName}</td>
            <td>{product.productDescription}</td>
            <td>{product.productPrice}</td>
            <td>{product.productQuantity}</td>
            <td>
                <img src={product.productImage} alt={product.productName} style={{ maxWidth: "50px" }} />
            </td>
            <td>
                <button onClick={() => onEdit(product)}>Edit</button>
                <button onClick={() => onDelete(product._id)}>Delete</button>
            </td>
        </tr>
    );
};

export default ProductItem;
