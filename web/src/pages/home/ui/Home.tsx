import ProductList from 'entities/product/ui/ProductList/ProductList';
import { MainLayout } from 'widgets';

const Home = () => {
  return (
    <>
      <MainLayout>
        <ProductList />
      </MainLayout>
    </>
  );
};

export default Home;
