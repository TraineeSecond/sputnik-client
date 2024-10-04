import { useEffect } from 'react';

import { ProductCard } from 'entities';
import { useProductStore } from 'entities/product/model/productStore';

import { StyledList, StyledListItem } from './ProductList.styles';

const ProductList = () => {
  const { products, loadProducts } = useProductStore();

  useEffect(() => {
    void loadProducts();
  }, [loadProducts]);

  return (
    <StyledList>
      {products.map((product) => (
        <StyledListItem key={product.id}>
          <ProductCard {...product} />
        </StyledListItem>
      ))}
    </StyledList>
  );
};

export default ProductList;
