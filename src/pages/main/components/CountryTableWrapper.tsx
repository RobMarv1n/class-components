import { Suspense, lazy } from 'react';
import { SkeletonTable } from './SkeletonTable';

const CountryTable = lazy(() => import('./CountryTable'));

export default function CountryTableWrapper() {
  return (
    <Suspense fallback={<SkeletonTable />}>
      <CountryTable />
    </Suspense>
  );
}
