import { Suspense, lazy } from 'react';

import { MainLayout } from 'widgets';

const ProductListingForm = lazy(() =>
  import('features').then((module) => ({ default: module.ProductListingForm })),
);

const CreateListing = () => {
  return (
    <MainLayout>
      <Suspense fallback={<></>}>
        <ProductListingForm />
      </Suspense>
    </MainLayout>
  );
};

export default CreateListing;
