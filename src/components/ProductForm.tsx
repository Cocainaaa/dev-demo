import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { NewProduct } from '../model/types';
import { handleInputChange, handleModalSubmit } from '../utils/productFormFunctions';

interface ProductFormProps {
  show: boolean;
  onClose: () => void;
  onSubmit: (product: NewProduct) => void;
}

export const ProductForm: React.FC<ProductFormProps> = ({ show, onClose, onSubmit }) => {
  const [product, setProduct] = useState<NewProduct>({
    nomClient: '',
    nomProduit: '',
    prix: 0,
  });

  const handleInput = handleInputChange(product, setProduct);
  const handleSubmit = handleModalSubmit(product, onSubmit, setProduct, onClose);

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Ajouter un produit</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="nomClient">
            <Form.Label>Nom du client</Form.Label>
            <Form.Control
              type="text"
              name="nomClient"
              value={product.nomClient}
              onChange={handleInput}
            />
          </Form.Group>
          <Form.Group controlId="nomProduit">
            <Form.Label>Nom du produit</Form.Label>
            <Form.Control
              type="text"
              name="nomProduit"
              value={product.nomProduit}
              onChange={handleInput}
            />
          </Form.Group>
          <Form.Group controlId="prix">
            <Form.Label>Prix</Form.Label>
            <Form.Control
              type="number"
              name="prix"
              value={product.prix}
              onChange={handleInput}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Annuler
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Ajouter
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
