import { useEffect } from 'react';

import Product from '../Product/Product';
import { useProductStore } from 'entities/product/model/productStore';

import styles from './ProductList.styles';

const ProductList = () => {
  const { products, loadProducts } = useProductStore();
  useEffect(() => {
    loadProducts();
  }, []);
  return (
    <styles.list>
      {products.map((product) => (
        <Product key={product.id} {...product} />
      ))}
    </styles.list>
  );
};

export default ProductList;
