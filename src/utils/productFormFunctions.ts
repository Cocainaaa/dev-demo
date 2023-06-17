import { useState } from 'react';
import { NewProduct } from '../model/types';

export const handleInputChange = (product: NewProduct, setProduct: React.Dispatch<React.SetStateAction<NewProduct>>) => (
  event: React.ChangeEvent<HTMLInputElement>
) => {
  const { name, value } = event.target;
  setProduct((prevProduct) => ({
    ...prevProduct,
    [name]: value,
  }));
};

export const handleModalSubmit = (
  product: NewProduct,
  onSubmit: (product: NewProduct) => void,
  setProduct: React.Dispatch<React.SetStateAction<NewProduct>>,
  onClose: () => void
) => async () => {
  await onSubmit(product);
  setProduct({
    nomClient: '',
    nomProduit: '',
    prix: 0,
  });
  onClose();
};