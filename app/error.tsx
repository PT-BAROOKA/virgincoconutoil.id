'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">Something went wrong</h1>
        <p className="mb-4 text-muted-foreground">{error.message}</p>
        <button
          onClick={reset}
          className="text-primary underline hover:text-primary/90"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
