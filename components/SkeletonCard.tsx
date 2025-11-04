'use client';

export default function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 h-full flex flex-col animate-pulse-slow">
      {/* Title Skeleton */}
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-3 skeleton" />
      
      {/* Description Skeleton */}
      <div className="space-y-2 mb-4">
        <div className="h-4 bg-gray-200 rounded w-full skeleton" />
        <div className="h-4 bg-gray-200 rounded w-5/6 skeleton" />
      </div>

      {/* Info Skeleton */}
      <div className="flex gap-4 mb-4">
        <div className="h-4 bg-gray-200 rounded w-16 skeleton" />
        <div className="h-4 bg-gray-200 rounded w-16 skeleton" />
        <div className="h-4 bg-gray-200 rounded w-20 skeleton" />
      </div>

      {/* Ingredients Skeleton */}
      <div className="flex flex-wrap gap-2 mb-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-6 bg-gray-200 rounded w-20 skeleton" />
        ))}
      </div>

      {/* Footer Skeleton */}
      <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between">
        <div className="h-4 bg-gray-200 rounded w-16 skeleton" />
        <div className="h-4 bg-gray-200 rounded w-20 skeleton" />
      </div>
    </div>
  );
}

