import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

interface SearchBarProps {
  onSearch: (productId: number) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [productId, setProductId] = useState<number>(0);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProductId(Number(event.target.value));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(productId);
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-3">
      <Form.Group className="d-flex align-items-center">
        <Form.Control type="number" value={productId} onChange={handleInputChange} placeholder="Product ID" />
        <button type="submit" className="btn btn-primary ml-2">
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </Form.Group>
    </Form>
  );
};
