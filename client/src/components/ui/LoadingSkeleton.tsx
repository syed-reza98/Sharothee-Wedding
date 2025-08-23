import React from 'react';

interface LoadingSkeletonProps {
  type?: 'page' | 'card' | 'gallery' | 'form';
  count?: number;
  className?: string;
}

export default function LoadingSkeleton({ type = 'page', count = 1, className = '' }: LoadingSkeletonProps) {
  const renderPageSkeleton = () => (
    <div className={`animate-pulse ${className}`}>
      {/* Header skeleton */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-8">
        <div className="h-8 bg-cream-200 rounded-lg w-3/4 mx-auto mb-4"></div>
        <div className="h-1 bg-primary w-24 mx-auto mb-6"></div>
        <div className="h-6 bg-cream-200 rounded w-2/3 mx-auto mb-2"></div>
        <div className="h-6 bg-cream-200 rounded w-1/2 mx-auto"></div>
      </div>
      
      {/* Content skeleton */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg p-6 shadow">
              <div className="h-6 bg-cream-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-cream-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-cream-200 rounded w-5/6 mb-2"></div>
              <div className="h-4 bg-cream-200 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderCardSkeleton = () => (
    <div className="bg-white rounded-lg p-6 shadow animate-pulse">
      <div className="h-6 bg-cream-200 rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-cream-200 rounded w-full mb-2"></div>
      <div className="h-4 bg-cream-200 rounded w-5/6 mb-2"></div>
      <div className="h-4 bg-cream-200 rounded w-2/3"></div>
    </div>
  );

  const renderGallerySkeleton = () => (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {[...Array(count)].map((_, i) => (
        <div key={i} className="aspect-square bg-cream-200 rounded-lg animate-pulse"></div>
      ))}
    </div>
  );

  const renderFormSkeleton = () => (
    <div className="bg-white rounded-lg p-6 shadow animate-pulse">
      <div className="h-8 bg-cream-200 rounded w-1/2 mb-6"></div>
      <div className="space-y-4">
        {[...Array(count)].map((_, i) => (
          <div key={i}>
            <div className="h-4 bg-cream-200 rounded w-1/4 mb-2"></div>
            <div className="h-10 bg-cream-200 rounded w-full"></div>
          </div>
        ))}
      </div>
      <div className="h-10 bg-cream-200 rounded w-1/3 mt-6"></div>
    </div>
  );

  switch (type) {
    case 'card':
      return renderCardSkeleton();
    case 'gallery':
      return renderGallerySkeleton();
    case 'form':
      return renderFormSkeleton();
    default:
      return renderPageSkeleton();
  }
}

// Wedding-themed loading component with heart animation
export function WeddingLoader({ message = "Loading your magical moments..." }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
      <div className="relative mb-6">
        {/* Animated heart */}
        <div className="w-16 h-16 text-primary animate-pulse">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
        {/* Sparkle effects */}
        <div className="absolute -top-2 -right-2 w-4 h-4 text-secondary animate-bounce delay-100">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
            <path d="M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5L12 2z" />
          </svg>
        </div>
        <div className="absolute -bottom-2 -left-2 w-3 h-3 text-primary animate-bounce delay-300">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
            <path d="M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5L12 2z" />
          </svg>
        </div>
      </div>
      <p className="text-muted text-lg font-light" role="status" aria-live="polite">{message}</p>
      <div className="mt-4 flex space-x-1">
        <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-100"></div>
        <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-200"></div>
      </div>
    </div>
  );
}