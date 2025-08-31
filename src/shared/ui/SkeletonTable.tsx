import { SkeletonTableBody } from './SkeletonTableBody';

export function SkeletonTable() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-950 min-w-[900px] w-full">
      <div className="sticky top-0 z-30 bg-gray-900 shadow-md p-3 flex gap-2">
        <div className="flex-1 h-10 bg-gray-700 rounded animate-pulse" />
        <div className="h-10 w-24 bg-gray-700 rounded animate-pulse" />
        <div className="h-10 w-24 bg-gray-700 rounded animate-pulse" />
        <div className="h-10 w-36 bg-gray-700 rounded animate-pulse" />
      </div>

      <div className="flex-1 overflow-auto bg-gray-950">
        <SkeletonTableBody />
      </div>
    </div>
  );
}
