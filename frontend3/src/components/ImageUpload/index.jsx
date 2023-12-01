import React, { useState } from 'react';

const ImageUploadModal = ({ isOpen, onClose, onSubmit }) => {
  const [image, setImage] = useState('');

  const handleImageChange = (e) => {
    // Handle image changes and set the 'image' state
    // You can use FileReader or any other method to handle image upload
  };

  const handleSubmit = () => {
    onSubmit(image);
    onClose();
  };

  return (
    isOpen && (
      <div className="modal">
        <div className="modal-content">
          <h2>Upload de Imagem</h2>
          <form>
            <label>
              Imagem:
              <input type="file" accept="image/*" onChange={handleImageChange} />
            </label>
            <button type="button" onClick={handleSubmit}>
              salvar
            </button>
            
          </form>
        </div>
      </div>
    )
  );
};

export default ImageUploadModal;
