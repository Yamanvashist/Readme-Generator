import {
  RiCheckLine,
  RiInformationLine,
} from "react-icons/ri";

export default function RepositoryUrlGuide() {
  return (
    <div className="mt-auto rounded-lg border border-border bg-surface p-3">
      <div className="mb-3 flex items-center gap-2">
        <div className="flex size-7 shrink-0 items-center justify-center rounded-md bg-surface-secondary text-text-secondary">
          <RiInformationLine size={15} />
        </div>

        <div>
          <p className="text-xs font-semibold text-text-primary">
            Repository URL Guide
          </p>

          <p className="text-[10px] text-text-muted">
            A couple of things to check
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-start gap-2.5">
          <RiCheckLine
            size={14}
            className="mt-0.5 shrink-0 text-success"
          />

          <div>
            <p className="text-xs font-medium text-text-primary">
              Use the main repository link
            </p>

            <p className="mt-0.5 text-[11px] leading-relaxed text-text-muted">
              Paste the repository page URL, not an individual file or commit
              link.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-2.5">
          <RiCheckLine
            size={14}
            className="mt-0.5 shrink-0 text-success"
          />

          <div>
            <p className="text-xs font-medium text-text-primary">
              Check repository access
            </p>

            <p className="mt-0.5 text-[11px] leading-relaxed text-text-muted">
              Ensure the service has permission to read the project files.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}