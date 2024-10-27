import { useEffect } from 'react';

import { ProductList } from 'entities';
import { useProductStore } from 'entities/product/model/productStore';
import InfiniteScroll from 'react-infinite-scroll-component';

const HomeView = () => {
  const { products, setSellerId, loadNextProductPage, rezeroProductPage } =
    useProductStore();

  useEffect(() => {
    void setSellerId(null);
    void rezeroProductPage();
  }, [rezeroProductPage, setSellerId]);

  return (
    <InfiniteScroll
      dataLength={products.length}
      next={loadNextProductPage}
      hasMore={true}
      loader={null}
      endMessage={null}
    >
      <ProductList />
    </InfiniteScroll>
  );
};

export default HomeView;
