import { Suspense, lazy } from 'react';

import { MainLayout } from 'widgets';

const DeliveryView = lazy(() => import('widgets/deliveryView/ui/DeliveryView'));

const Delivery = () => {
  return (
    <MainLayout>
      <Suspense fallback={<></>}>
        <DeliveryView />
      </Suspense>
    </MainLayout>
  );
};

export default Delivery;
