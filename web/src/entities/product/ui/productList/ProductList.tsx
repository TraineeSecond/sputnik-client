import { ProductCard } from 'entities';
import { useProductStore } from 'entities/product/model/productStore';

import { StyledList, StyledListItem } from './ProductList.styles';

const ProductList = () => {
  const { products } = useProductStore();

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
