import { Suspense, lazy } from 'react';

import { MainLayout } from 'widgets';

const CartView = lazy(() =>
  import('widgets').then((module) => ({ default: module.CartView })),
);

const Cart = () => {
  return (
    <MainLayout>
      <Suspense fallback={<></>}>
        <CartView />
      </Suspense>
    </MainLayout>
  );
};

export default Cart;
