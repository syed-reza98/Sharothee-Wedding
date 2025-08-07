import React from 'react'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  color?: 'primary' | 'secondary' | 'white' | 'gray'
  className?: string
}

export function LoadingSpinner({ 
  size = 'md', 
  color = 'primary', 
  className = '' 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  }

  const colorClasses = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    white: 'text-white',
    gray: 'text-gray-500'
  }

  return (
    <div
  const baseSpinnerClasses =
    "inline-block animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]";
  return (
    <div
      className={`${baseSpinnerClasses} ${sizeClasses[size]} ${colorClasses[color]} ${className}`}
      role="status"
      aria-label="Loading..."
    >
      <span className="sr-only">Loading...</span>
    </div>
  )
}

interface LoadingOverlayProps {
  message?: string
  className?: string
}

export function LoadingOverlay({ 
  message = 'Loading...', 
  className = '' 
}: LoadingOverlayProps) {
  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ${className}`}>
      <div className="bg-white rounded-xl p-8 shadow-xl text-center max-w-sm mx-4">
        <LoadingSpinner size="lg" className="mx-auto mb-4" />
        <p className="text-secondary font-medium">{message}</p>
      </div>
    </div>
  )
}

interface LoadingCardProps {
  message?: string
  className?: string
}

export function LoadingCard({ 
  message = 'Loading...', 
  className = '' 
}: LoadingCardProps) {
  return (
    <div className={`flex flex-col items-center justify-center p-8 text-center ${className}`}>
      <LoadingSpinner size="lg" className="mb-4" />
      <p className="text-muted">{message}</p>
    </div>
  )
}

interface LoadingButtonProps {
  loading: boolean
  children: React.ReactNode
  className?: string
  disabled?: boolean
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
}

export function LoadingButton({ 
  loading, 
  children, 
  className = '', 
  disabled = false,
  onClick,
  type = 'button'
}: LoadingButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading || disabled}
      className={`relative inline-flex items-center justify-center ${className} ${
        loading || disabled ? 'opacity-70 cursor-not-allowed' : ''
      }`}
    >
      {loading && (
        <LoadingSpinner 
          size="sm" 
          color="white" 
          className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2" 
        />
      )}
      <span className={loading ? 'opacity-0' : 'opacity-100'}>
        {children}
      </span>
    </button>
  )
}

interface SkeletonProps {
  className?: string
  animate?: boolean
}

export function Skeleton({ className = '', animate = true }: SkeletonProps) {
  return (
    <div
      className={`bg-gray-200 rounded ${animate ? 'animate-pulse' : ''} ${className}`}
      role="status"
      aria-label="Loading content..."
    >
      <span className="sr-only">Loading...</span>
    </div>
  )
}

interface SkeletonTextProps {
  lines?: number
  className?: string
}

export function SkeletonText({ lines = 3, className = '' }: SkeletonTextProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton
          key={index}
          className={`h-4 ${
            index === lines - 1 ? 'w-3/4' : 'w-full'
          }`}
        />
      ))}
    </div>
  )
}

interface SkeletonCardProps {
  className?: string
}

export function SkeletonCard({ className = '' }: SkeletonCardProps) {
  return (
    <div className={`p-6 border rounded-xl ${className}`}>
      <Skeleton className="h-6 w-3/4 mb-4" />
      <SkeletonText lines={3} />
      <div className="flex justify-between mt-4">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-4 w-1/3" />
      </div>
    </div>
  )
}
