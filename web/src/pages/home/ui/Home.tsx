import { Suspense, lazy } from 'react';

import { MainLayout } from 'widgets';

const HomeView = lazy(() => import('widgets/HomeView/ui/HomeView'));

const Home = () => {
  return (
    <MainLayout>
      <Suspense fallback={<></>}>
        <HomeView />
      </Suspense>
    </MainLayout>
  );
};

export default Home;
