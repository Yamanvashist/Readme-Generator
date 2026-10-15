"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative flex min-h-[85vh] items-center justify-center overflow-hidden bg-background px-6 py-16 text-foreground">
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
              <circle cx="11" cy="11" r="7" />
              <path d="m16 16 4 4" />
              <path d="M8.5 9a2.5 2.5 0 0 1 5 0c0 1.5-2.5 2-2.5 4" />
              <path d="M11 16h.01" />
            </svg>
          </div>

          <span className="mb-3 rounded-full border border-border px-3 py-1 text-xs font-medium tracking-wide text-muted-foreground">
            ERROR 404
          </span>

        
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Lost in the repo?
          </h1>

          <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground sm:text-base">
            Looks like this page doesn't exist or may have been moved.
            Let's get you back to somewhere useful.
          </p>

          <div className="mt-8 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
            <Link
              href="/"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-foreground px-5 text-sm font-medium text-background transition-opacity hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
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
                <path d="m3 10 9-7 9 7" />
                <path d="M5 9v11h14V9" />
                <path d="M9 20v-7h6v7" />
              </svg>
              Back to home
            </Link>

            <button
              onClick={() => window.history.back()}
              className="inline-flex h-11 items-center justify-center rounded-lg border border-border bg-background px-5 text-sm font-medium transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Go back
            </button>
          </div>
        </div>

        <div className="mt-16 border-t border-border pt-5">
          <p className="text-center text-xs text-muted-foreground">
            Wrong turn. Right tools. Let's get you back on track.
          </p>
        </div>
      </div>
    </main>
  );
}
