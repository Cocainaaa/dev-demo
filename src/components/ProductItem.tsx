import React from 'react';
import { Button } from 'react-bootstrap';
import { Product } from '../model/types';
import { handleDeleteProduct, handleEditProduct } from '../utils/productItemFunctions';

interface ProductItemProps {
  product: Product;
  onDelete: (id: number) => void;
  onEdit: (id: number, newPrice: number) => void;
}

export const ProductItem: React.FC<ProductItemProps> = ({ product, onDelete, onEdit }) => {
  const handleDelete = () => {
    handleDeleteProduct(onDelete, product.id);
  };

  const handleEdit = () => {
    handleEditProduct(onEdit, product.id, product.prix);
  };

  return (
    <tr>
      <td>{product.nomProduit}</td>
      <td>{product.nomClient}</td>
      <td>{product.prix}</td>
      <td>
        <span style={{ marginRight: '10px' }}>
          <Button variant="danger" onClick={handleDelete} className="button-margin-right">
            Supprimer
          </Button>
        </span>
        <Button variant="info" onClick={handleEdit}>
          Modifier
        </Button>
      </td>
    </tr>
  );
};
