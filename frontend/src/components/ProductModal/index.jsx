import React from 'react';

const ProductModal = ({ isOpen, onClose, onSubmit, onChange, formData }) => {
  return (
    isOpen && (
      <div className="modal">
        <div className="modal-content">
          <h2>Adicionar Produto</h2>
          <form>
            <label>
              Nome:
              <input
                type="text"
                name="productName"
                value={formData.productName}
                onChange={onChange}
              />
            </label>
            <label>
              Descrição:
              <input
                type="text"
                name="productDescription"
                value={formData.productDescription}
                onChange={onChange}
              />
            </label>
            <label>
              Preço:
              <input
                type="number"
                name="productPrice"
                value={formData.productPrice}
                onChange={onChange}
              />
            </label>
            <label>
              Quantidade:
              <input
                type="number"
                name="productQuantity"
                value={formData.productQuantity}
                onChange={onChange}
              />
            </label>
            <button type="button" onClick={onSubmit}>
              Próximo
            </button>
            <button type="button" onClick={onClose}>
              Fechar
            </button>
          </form>
        </div>
      </div>
    )
  );
};

export default ProductModal;
