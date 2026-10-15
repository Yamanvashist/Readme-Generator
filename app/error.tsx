"use client";

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
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-6 py-16 text-foreground">
      <div className="w-full max-w-lg">
        <div className="flex flex-col items-center text-center">
          <div className="mb-8 flex size-16 items-center justify-center rounded-2xl border border-border bg-muted/50 shadow-sm">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="size-7"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 3 2.8 19a1.3 1.3 0 0 0 1.1 2h16.2a1.3 1.3 0 0 0 1.1-2L12 3Z" />
              <path d="M12 9v4.5" />
              <path d="M12 17h.01" />
            </svg>
          </div>

          <span className="mb-3 rounded-full border border-border px-3 py-1 text-xs font-medium tracking-wide text-muted-foreground">
            UNEXPECTED ERROR
          </span>

          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Well, this is awkward.
          </h1>

          <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground sm:text-base">
            Something went wrong while loading this page. Your work may still
            be safe. Try again, and we’ll see if things get back on track.
          </p>

          <div className="mt-8 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
            <button
              onClick={() => reset()}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-foreground px-5 text-sm font-medium text-background transition-colors hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="size-4"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M20 7v5h-5" />
                <path d="M4.9 16a8 8 0 0 0 13.6 1.4L20 12" />
                <path d="M4 12a8 8 0 0 1 13.6-5.4L20 12" />
              </svg>
              Try again
            </button>

            <Link
              href="/"
              className="inline-flex h-11 items-center justify-center rounded-lg border border-border bg-background px-5 text-sm font-medium transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Back to home
            </Link>
          </div>

          {error.digest && (
            <div className="mt-10 flex items-center gap-2 rounded-lg border border-border bg-muted/30 px-3 py-2">
              <span className="text-xs text-muted-foreground">
                Error reference
              </span>
              <code className="text-xs font-medium">{error.digest}</code>
            </div>
          )}
        </div>

        <div className="mt-16 border-t border-border pt-5">
          <p className="text-center text-xs text-muted-foreground">
            If this keeps happening, try again in a little while.
          </p>
        </div>
      </div>
    </main>
  );
}
