export default function SkeletonCard() {
  return (
    <div className="bg-gray-200 dark:bg-gray-500 animate-pulse p-4 rounded small:w-85vw large:w-300px flex flex-col items-start">
      <div className="w-full h-40 bg-gray-300 dark:bg-gray-300 rounded mb-3" />
      <div className="h-4 bg-gray-300 dark:bg-gray-300 rounded w-3/4 mb-2" />
      <div className="h-4 bg-gray-300 dark:bg-gray-300 rounded w-1/2 mb-2" />
      <div className="h-3 bg-gray-300 dark:bg-gray-300 rounded w-full" />
    </div>
  );
}
