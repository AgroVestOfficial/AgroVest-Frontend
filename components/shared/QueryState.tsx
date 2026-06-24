export function QueryLoader({ className = "h-20 w-full" }: { className?: string }) {
  return <div className={`animate-pulse rounded bg-gray-200 ${className}`} />;
}

export function QueryError({ message, className = "" }: { message: string; className?: string }) {
  return <div className={`rounded bg-red-50 p-4 text-sm text-red-500 ${className}`}>{message}</div>;
}
