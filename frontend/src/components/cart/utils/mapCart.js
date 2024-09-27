export const mapCart = (product) => {
  return {
    id: product.id,
    title: product.title,
    price: product.price,
    images: product.imageUrl,
    quantity: 1,
  };
};
