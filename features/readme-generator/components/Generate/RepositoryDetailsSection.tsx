import { RiFileTextLine } from "react-icons/ri";

type RepositoryDetailsSectionProps = {
  repoDetails: string;
  setRepoDetails: (value: string) => void;
};

export default function RepositoryDetailsSection({
  repoDetails,
  setRepoDetails,
}: RepositoryDetailsSectionProps) {
  return (
    <section className="overflow-hidden rounded-xl border border-border bg-surface shadow-md">
      <div className="flex items-center gap-3 border-b border-border-light px-5 py-4">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border bg-surface-secondary text-text-primary">
          <RiFileTextLine size={18} />
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="text-sm font-semibold text-text-primary">
            Repository Details
          </h2>
          <p className="text-xs text-text-muted">
            Give us a little extra context about your project
          </p>
        </div>
        <span className="shrink-0 rounded-full border border-border bg-surface-secondary px-2.5 py-0.5 text-[11px] font-medium text-text-muted">
          Optional
        </span>
      </div>

      <div className="space-y-4 p-5">
        <p className="max-w-2xl text-xs leading-5 text-text-muted">
          We read your code, but we can&apos;t know your intent. Tell us what the
          project does, who it&apos;s for, or any sections you&apos;d like in the README.
          You can skip this and still get a great result.
        </p>

        <div className="space-y-2">
          <label
            htmlFor="repo-details"
            className="block text-xs font-medium text-text-primary"
          >
            About your project
          </label>
          <textarea
            id="repo-details"
            rows={5}
            value={repoDetails}
            onChange={(event) => setRepoDetails(event.target.value)}
            placeholder="e.g. A full-stack task manager with real-time sync, built with Next.js, Prisma and MongoDB. Users can create projects, invite teammates and track progress. Run it locally with npm run dev."
            className="block w-full resize-none rounded-lg border border-border bg-surface px-3.5 py-3 text-sm leading-relaxed text-foreground shadow-xs outline-none transition-all placeholder:text-sm placeholder:leading-relaxed placeholder:text-text-subtle selection:bg-success/20 focus:border-success focus:ring-4 focus:ring-success/10"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] text-text-subtle">Worth mentioning:</span>
          <span className="rounded-full border border-border bg-surface-secondary px-2.5 py-1 text-[11px] text-text-secondary">
            What it does
          </span>
          <span className="rounded-full border border-border bg-surface-secondary px-2.5 py-1 text-[11px] text-text-secondary">
            Tech stack
          </span>
          <span className="rounded-full border border-border bg-surface-secondary px-2.5 py-1 text-[11px] text-text-secondary">
            Key features
          </span>
          <span className="rounded-full border border-border bg-surface-secondary px-2.5 py-1 text-[11px] text-text-secondary">
            How to run it
          </span>
        </div>
      </div>
    </section>
  );
}
