import { NewProduct, Product } from '../model/types';
import { API_URL } from '../services/api';

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Failed to fetch products.');
  }
};

export const addProduct = async (product: NewProduct): Promise<void> => {
  try {
    await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
  } catch (error) {
    throw new Error('Failed to add the product.');
  }
};

export const editProduct = async (id: number, newPrice: number): Promise<Product> => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prix: newPrice }),
    });
    const updatedProduct = await response.json();
    return updatedProduct;
  } catch (error) {
    throw new Error('Failed to edit the product.');
  }
};

export const deleteProduct = async (id: number): Promise<void> => {
  try {
    await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
  } catch (error) {
    throw new Error('Failed to delete the product.');
  }
};
