import { useEffect } from 'react';

import { ProductList } from 'entities';
import { useProductStore } from 'entities/product/model/productStore';
import { MainLayout } from 'widgets';

const Home = () => {
  const { setSellerId, loadProducts } = useProductStore();

  useEffect(() => {
    void setSellerId(null);
  }, [loadProducts, setSellerId]);

  return (
    <>
      <MainLayout>
        <ProductList />
      </MainLayout>
    </>
  );
};

export default Home;
