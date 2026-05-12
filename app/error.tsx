'use client';

import { useEffect } from "react";
import Link from "next/link";

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
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-display font-bold text-foreground">Terjadi Kesalahan</h1>
        <p className="mb-6 text-muted-foreground font-body">Sesuatu tidak berjalan sebagaimana mestinya.</p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={reset}
            className="text-primary font-body underline hover:text-primary/90"
          >
            Coba Lagi
          </button>
          <Link href="/" className="text-primary font-body underline hover:text-primary/90">
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
}
