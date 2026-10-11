const previewDots = [1, 2, 3];

const previewLines = [
  { className: "h-3 w-2/5 bg-success/25" },
  { className: "h-2 w-full bg-border" },
  { className: "h-2 w-5/6 bg-border" },
  { className: "h-2 w-2/3 bg-border" },
  { className: "h-2.5 w-1/3 bg-success/25", sectionStart: true },
  { className: "h-2 w-full bg-border" },
  { className: "h-2 w-3/4 bg-border" },
];

export default function ReadmePreview() {
  return (
    <aside className="hidden bg-surface-muted lg:block">
      <div className="sticky top-0 flex h-screen items-center justify-center bg-[radial-gradient(var(--primary-muted)_1px,transparent_1px)] bg-size-[18px_18px] p-8">
        <div className="w-full max-w-72 space-y-5 text-center">
          <div className="overflow-hidden rounded-xl border border-border bg-surface text-left shadow-md">
            <div className="flex items-center gap-1.5 border-b border-border-light px-3 py-2.5">
              {previewDots.map((dot) => (
                <span key={dot} className="size-2 rounded-full bg-border" />
              ))}

              <span className="ml-2 font-mono text-[10px] text-text-subtle">
                README.md
              </span>
            </div>

            <div className="p-4">
              {previewLines.map((line, index) => (
                <div
                  key={index}
                  className={`${index === 0 ? "" : line.sectionStart ? "mt-4" : "mt-2.5"} ${line.className} rounded-full`}
                />
              ))}
            </div>
          </div>

          <p className="text-xs text-text-muted">
            Your README preview will appear here
          </p>
        </div>
      </div>
    </aside>
  );
}
