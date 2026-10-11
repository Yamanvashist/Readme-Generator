import { FaGithub } from "react-icons/fa";
import {
  RiArrowRightLine,
  RiCheckLine,
  RiCloseLine,
  RiComputerLine,
  RiGitRepositoryCommitsFill,
  RiGitRepositoryLine,
  RiLinkM,
  RiUploadCloud2Line,
} from "react-icons/ri";
import type { IconType } from "react-icons";
import type { RepositorySourceValue } from "./types";

type RepoSourceItem = {
  title: string;
  icon: IconType;
  desc: string;
  value: RepositorySourceValue;
};

const repoSources: RepoSourceItem[] = [
  {
    title: "GitHub Repository",
    icon: FaGithub,
    desc: "Paste the URL of your GitHub repository",
    value: "github",
  },
  {
    title: "Upload from your computer",
    icon: RiComputerLine,
    desc: "Drag and drop or select a ZIP file.",
    value: "local",
  },
];

type RepositorySourceSectionProps = {
  selected: RepositorySourceValue;
  setSelected: (value: RepositorySourceValue) => void;
  repoUrl: string;
  setRepoUrl: (value: string) => void;
};

export default function RepositorySourceSection({
  selected,
  setSelected,
  repoUrl,
  setRepoUrl,
}: RepositorySourceSectionProps) {
  return (
    <section className="overflow-hidden rounded-xl border border-border bg-surface shadow-md">
      <div className="flex items-center gap-3 border-b border-border-light px-5 py-4">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border bg-surface-secondary text-text-primary">
          <RiGitRepositoryLine size={18} />
        </div>
        <div>
          <h2 className="text-sm font-semibold text-text-primary">
            Repository Source
          </h2>
          <p className="text-xs text-text-muted">
            Choose how you want to provide your project
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 p-5 md:grid-cols-2">
        {repoSources.map((source) => {
          const Icon = source.icon;
          const isSelected = selected === source.value;
          const dimmed = isSelected
            ? ""
            : "opacity-60 focus-within:opacity-100 group-hover/card:opacity-100";

          return (
            <div
              key={source.value}
              onClick={() => setSelected(source.value)}
              className={`group/card flex cursor-pointer flex-col rounded-xl border p-4 transition-all duration-200 ${
                isSelected
                  ? "border-success bg-success/3 shadow-sm ring-4 ring-success/10"
                  : "border-border bg-surface hover:border-foreground/25 hover:shadow-sm"
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`flex size-10 shrink-0 items-center justify-center rounded-lg border transition-colors duration-200 ${
                    isSelected
                      ? "border-success/25 bg-success/10 text-success"
                      : "border-border bg-surface-secondary text-text-primary"
                  }`}
                >
                  <Icon size={20} />
                </div>

                <div className="min-w-0 flex-1 space-y-0.5 pt-0.5">
                  <h3 className="text-sm font-semibold text-text-primary">
                    {source.title}
                  </h3>
                  <p className="text-xs leading-5 text-text-muted">
                    {source.desc}
                  </p>
                </div>

                {isSelected ? (
                  <div className="flex size-5 shrink-0 items-center justify-center rounded-full bg-success text-white shadow-sm">
                    <RiCheckLine size={13} />
                  </div>
                ) : (
                  <div className="size-5 shrink-0 rounded-full border border-border bg-surface transition-colors group-hover/card:border-foreground/30" />
                )}
              </div>

              {source.value === "github" ? (
                <div
                  className={`mt-4 flex flex-1 flex-col justify-center gap-3 rounded-lg border border-border-light bg-surface-secondary p-3 transition-opacity duration-200 ${dimmed}`}
                  onClick={(event) => event.stopPropagation()}
                >
                  <div className="flex h-11 items-center gap-2 rounded-lg border border-border bg-surface pl-3 pr-1.5 shadow-xs transition-all focus-within:border-success focus-within:ring-4 focus-within:ring-success/10">
                    <RiLinkM
                      size={16}
                      className="shrink-0 text-text-muted"
                    />
                    <input
                      type="url"
                      value={repoUrl}
                      onChange={(event) => setRepoUrl(event.target.value)}
                      placeholder="https://github.com/username/repository"
                      className="h-full min-w-0 flex-1 truncate bg-transparent text-sm text-foreground outline-none placeholder:text-xs placeholder:text-text-subtle selection:bg-success/20"
                    />
                    <div className="flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-md text-text-subtle transition-colors hover:bg-surface-muted hover:text-text-primary">
                      <RiCloseLine size={15} />
                    </div>
                    <div className="flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-md bg-success text-white shadow-sm transition hover:brightness-110 active:scale-95">
                      <RiArrowRightLine size={16} />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 rounded-lg border border-success/15 bg-success/5 px-3 py-2 text-[11px] font-medium text-success">
                    <RiGitRepositoryCommitsFill size={14} className="shrink-0" />
                    <span>Provide repository URL</span>
                  </div>
                </div>
              ) : (
                <div className={`mt-4 flex flex-1 transition-opacity duration-200 ${dimmed}`}>
                  <div className="group/drop flex min-h-40 w-full flex-col items-center justify-center rounded-lg border border-dashed border-border bg-surface-secondary px-4 py-6 text-center transition-all duration-200 hover:border-success/50 hover:bg-success/5">
                    <div className="flex size-11 items-center justify-center rounded-full border border-border bg-surface text-text-muted shadow-xs transition-all duration-200 group-hover/drop:-translate-y-0.5 group-hover/drop:border-success/30 group-hover/drop:text-success">
                      <RiUploadCloud2Line size={22} />
                    </div>
                    <p className="mt-3 text-sm font-semibold text-text-primary">
                      Choose a folder or ZIP file
                    </p>
                    <p className="mt-1 text-xs text-text-muted">
                      Drag and drop your project to browse
                    </p>
                    <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5">
                      <span className="rounded-md border border-border bg-surface px-1.5 py-0.5 font-mono text-[10px] text-text-muted">
                        .zip
                      </span>
                      <span className="rounded-md border border-border bg-surface px-1.5 py-0.5 font-mono text-[10px] text-text-muted">
                        .tar.gz
                      </span>
                      <span className="rounded-md border border-border bg-surface px-1.5 py-0.5 font-mono text-[10px] text-text-muted">
                        folder
                      </span>
                      <span className="px-1 text-[10px] text-text-subtle">
                        max 100MB
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
