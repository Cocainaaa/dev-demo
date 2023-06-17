import React, { useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import {ProductItem} from './ProductItem';
import { Product } from '../model/types';


export interface ProductListProps {
  products: Product[];
  onAddProduct: () => void;
  onDeleteProduct: (id: number) => void;
  onEditProduct: (id: number, newPrice: number) => void;
}

export const ProductList: React.FC<ProductListProps> = ({ products, onAddProduct, onDeleteProduct, onEditProduct }) => {
  return (
    <div className="mt-4">
      <Table striped bordered hover>
        <thead className="thead-dark">
          <tr>
            <th>Nom Produit</th>
            <th>Client</th>
            <th>Prix</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              onDelete={onDeleteProduct}
              onEdit={onEditProduct}
            />
          ))}
        </tbody>
      </Table>
      <Button variant="primary" onClick={onAddProduct}>
        Ajouter un produit
      </Button>
    </div>
  );
};

