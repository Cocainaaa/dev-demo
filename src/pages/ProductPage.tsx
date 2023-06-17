import React, { useEffect, useState } from 'react';
import { ProductList } from '../components/ProductsList';
import { ProductForm } from '../components/ProductForm';
import { NewProduct, Product } from '../model/types';
import { fetchProducts, addProduct, editProduct, deleteProduct } from '../utils/productPageFunctions';
import { SearchBar } from '../components/SearchBar';
import { ToastNotification, showErrorNotification } from '../components/ToastNofitication';

export const ProductPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [searchResults, setSearchResults] = useState<Product[]>([]);

  useEffect(() => {
    fetchProductList();
  }, []);

  const fetchProductList = async () => {
    try {
      const productList = await fetchProducts();
      setProducts(productList);
    } catch (error) {
      showErrorNotification('Failed to fetch products.');
    }
  };

  const handleAddProduct = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleEditProduct = async (id: number, newPrice: number) => {
    try {
      const updatedProduct = await editProduct(id, newPrice);
      setProducts((prevProducts) =>
        prevProducts.map((product) => (product.id === id ? updatedProduct : product))
      );
    } catch (error) {
      showErrorNotification('Failed to edit the product.');
      console.error(error)
    }
  };

  const handleDeleteProduct = async (id: number) => {
    try {
      const confirmation = window.confirm('Êtes-vous sûr de vouloir supprimer ce produit ?');
      if (confirmation) {
        await deleteProduct(id);
        setProducts(products.filter((product) => product.id !== id));
      }
    } catch (error) {
      showErrorNotification('Failed to delete the product.');
    }
  };

  const handleModalSubmit = async (product: NewProduct) => {
    try {
      await addProduct(product);
      fetchProductList();
      setShowModal(false);
    } catch (error) {
      showErrorNotification('Failed to add the product.');
    }
  };

  const handleSearch = (productId: number) => {
    const results = products.filter((product) => product.id === productId);
    if (results.length === 0) {
      showErrorNotification('Product not found.');
    } else {
      setSearchResults(results);
    }
  };

  return (
    <div>
        <ToastNotification />
       <SearchBar onSearch={handleSearch} />
      <ProductList
        products={searchResults.length > 0 ? searchResults : products}
        onAddProduct={handleAddProduct}
        onDeleteProduct={handleDeleteProduct}
        onEditProduct={handleEditProduct}
      />
      <ProductForm show={showModal} onClose={handleModalClose} onSubmit={handleModalSubmit} />
    </div>
  );
};
