import React, { lazy, Suspense } from 'react';

const LazyJoystream = lazy(() => import('./Joystream'));

const Joystream = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyJoystream {...props} />
  </Suspense>
);

export default Joystream;
