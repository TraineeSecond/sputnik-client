import { Suspense, lazy } from 'react';

import { MainLayout } from 'widgets';

const UserDetails = lazy(() =>
  import('entities').then((module) => ({ default: module.UserDetails })),
);

const Profile = () => {
  return (
    <MainLayout>
      <Suspense fallback={<></>}>
        <UserDetails />
      </Suspense>
    </MainLayout>
  );
};

export default Profile;
