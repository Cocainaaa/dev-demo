export const handleDeleteProduct = (onDelete: (id: number) => void, id: number) => {
  onDelete(id);
};

export const handleEditProduct = (onEdit: (id: number, newPrice: number) => void, id: number, currentPrice: number) => {
  const newPrice = prompt('Enter the new price:', String(currentPrice));
  if (newPrice !== null) {
    const parsedPrice = parseFloat(newPrice);
    if (!isNaN(parsedPrice)) {
      onEdit(id, parsedPrice);
    }
  }
};
