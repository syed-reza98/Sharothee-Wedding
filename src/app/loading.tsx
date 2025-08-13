export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-wedding flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
        <h2 className="text-xl font-serif text-secondary mb-2">Loading...</h2>
        <p className="text-muted">Please wait while we prepare your experience</p>
      </div>
    </div>
  );
}
