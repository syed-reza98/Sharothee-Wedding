'use client';

export default function Loading() {
  return (
    <div className="min-h-[40vh] flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-2 border-primary border-r-transparent mx-auto mb-3" />
        <p className="text-sm text-muted">Loading...</p>
      </div>
    </div>
  );
}
