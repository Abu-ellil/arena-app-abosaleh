"use client";

interface EventCardSkeletonProps {
  className?: string;
}

export default function EventCardSkeleton({
  className = "",
}: EventCardSkeletonProps) {
  return (
    <div className={`arena-event-card-loading ${className}`}>
      {/* Image Skeleton */}
      <div className="arena-event-card-image-container">
        {/* Category Badge Skeleton */}
        <div className="absolute top-3 right-3 z-3">
          <div className="w-16 h-6 bg-gray-700 rounded-full"></div>
        </div>

        {/* Date Badge Skeleton */}
        <div className="absolute top-3 left-3 z-3">
          <div className="w-12 h-16 bg-gray-600 rounded-lg"></div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="p-5">
        {/* Title Skeleton */}
        <div className="mb-3">
          <div className="h-5 bg-gray-700 rounded mb-2"></div>
          <div className="h-5 bg-gray-700 rounded w-3/4"></div>
        </div>

        {/* Venue Skeleton */}
        <div className="h-4 bg-gray-600 rounded mb-3 w-1/2"></div>

        {/* Meta Skeleton */}
        <div className="flex justify-between">
          <div className="h-3 bg-gray-600 rounded w-16"></div>
          <div className="h-3 bg-gray-600 rounded w-12"></div>
        </div>
      </div>
    </div>
  );
}
