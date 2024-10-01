import { ProductList } from 'entities';
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
