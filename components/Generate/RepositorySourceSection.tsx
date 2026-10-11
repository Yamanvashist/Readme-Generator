
import { useId } from "react";
import { FaGithub } from "react-icons/fa";
import {
  RiAlertLine,
  RiArrowRightLine,
  RiCheckLine,
  RiCloseLine,
  RiComputerLine,
  RiDeleteBinLine,
  RiFileZipLine,
  RiGitRepositoryCommitsFill,
  RiGitRepositoryLine,
  RiInformationLine,
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
    desc: "Connect your project directly using its repository URL.",
    value: "github",
  },
  {
    title: "Upload from your computer",
    icon: RiComputerLine,
    desc: "Share your project as a ZIP archive from your device.",
    value: "local",
  },
];

type RepositorySourceSectionProps = {
  selected: RepositorySourceValue;
  setSelected: (value: RepositorySourceValue) => void;
  repoUrl: string;
  setRepoUrl: (value: string) => void;
  file: File | null;
  setFile: (file: File | null) => void;
};

const formatFileSize = (bytes: number) => {
  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
};

export default function RepositorySourceSection({
  selected,
  setSelected,
  repoUrl,
  setRepoUrl,
  file,
  setFile,
}: RepositorySourceSectionProps) {
  const fileInputId = useId();

  const handleFile = (selectedFile: File | undefined) => {
    if (!selectedFile) return;

    if (!selectedFile.name.toLowerCase().endsWith(".zip")) {
      alert("Please select a ZIP file.");
      return;
    }

    if (selectedFile.size > 100 * 1024 * 1024) {
      alert("File size must be under 100 MB.");
      return;
    }

    setFile(selectedFile);
  };

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    handleFile(event.currentTarget.files?.[0]);
    event.currentTarget.value = "";
  };

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

      <div className="grid grid-cols-1 items-stretch gap-4 p-5 md:grid-cols-2">
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
              className={`group/card flex h-full cursor-pointer flex-col rounded-xl border p-4 transition-all duration-200 ${
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
                  className={`mt-4 flex flex-1 flex-col gap-3 rounded-lg border border-border-light bg-surface-secondary p-3 transition-opacity duration-200 ${dimmed}`}
                  onClick={(event) => event.stopPropagation()}
                >
                  <div>
                    <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-text-muted">
                      Repository URL
                    </p>

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
                        aria-label="GitHub repository URL"
                        className="h-full min-w-0 flex-1 truncate bg-transparent text-sm text-foreground outline-none placeholder:text-xs placeholder:text-text-subtle selection:bg-success/20"
                      />

                      <button
                        type="button"
                        aria-label="Clear repository URL"
                        onClick={() => setRepoUrl("")}
                        className="flex size-7 shrink-0 items-center justify-center rounded-md text-text-subtle transition-colors hover:bg-surface-muted hover:text-text-primary"
                      >
                        <RiCloseLine size={15} />
                      </button>

                      <button
                        type="button"
                        aria-label="Select GitHub repository source"
                        onClick={() => setSelected("github")}
                        className="flex size-8 shrink-0 items-center justify-center rounded-md bg-success text-white shadow-sm transition hover:brightness-110 active:scale-95"
                      >
                        <RiArrowRightLine size={16} />
                      </button>
                    </div>

                    <p className="mt-2 text-[11px] leading-relaxed text-text-muted">
                      Paste the main URL of the repository you want to
                      review. Make sure the repository is accessible to
                      the service.
                    </p>
                  </div>

                  <div className="flex items-center gap-2 rounded-lg border border-success/15 bg-success/5 px-3 py-2 text-[11px] font-medium text-success">
                    <RiGitRepositoryCommitsFill
                      size={14}
                      className="shrink-0"
                    />
                    <span>
                      {repoUrl.trim()
                        ? "Repository URL added"
                        : "Waiting for repository URL"}
                    </span>
                  </div>

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
                            Paste the repository page URL, not an
                            individual file or commit link.
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
                            Ensure the service has permission to read
                            the project files.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  className={`relative mt-4 flex flex-1 flex-col transition-opacity duration-200 ${dimmed}`}
                  onDragOver={(event) => event.preventDefault()}
                  onDrop={(event) => {
                    event.preventDefault();
                    handleFile(event.dataTransfer.files[0]);
                  }}
                >
                  <input
                    id={fileInputId}
                    type="file"
                    accept=".zip,application/zip,application/x-zip-compressed"
                    className="hidden"
                    onChange={handleFileInputChange}
                  />

                  <label
                    htmlFor={fileInputId}
                    className={`group/drop flex min-h-40 flex-1 flex-col rounded-lg border border-dashed px-4 py-5 transition-all duration-200 ${
                      file
                        ? "justify-center border-success/30 bg-success/5 pr-14 hover:border-success/50"
                        : "items-center justify-center border-border bg-surface-secondary text-center hover:border-success/50 hover:bg-success/5"
                    }`}
                  >
                    {file ? (
                      <>
                        <div className="flex min-w-0 items-start gap-3">
                          <div className="flex size-11 shrink-0 items-center justify-center rounded-lg border border-success/20 bg-success/10 text-success">
                            <RiFileZipLine size={23} />
                          </div>

                          <div className="min-w-0 flex-1 pt-0.5">
                            <p
                              title={file.name}
                              className="truncate text-sm font-semibold text-text-primary"
                            >
                              {file.name}
                            </p>

                            <p className="mt-1 text-xs text-text-muted">
                              ZIP archive
                              <span className="mx-1.5 text-text-subtle">
                                ·
                              </span>
                              {formatFileSize(file.size)}
                            </p>

                            <div className="mt-2 flex items-center gap-1.5 text-xs font-medium text-success">
                              <RiCheckLine size={14} />
                              <span>File ready to upload</span>
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 flex items-center gap-2 border-t border-border/70 pt-3 text-xs text-text-muted">
                          <RiUploadCloud2Line
                            size={15}
                            className="shrink-0"
                          />
                          <span>Click to replace or drop another ZIP</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex size-11 items-center justify-center rounded-full border border-border bg-surface text-text-muted shadow-xs transition-all duration-200 group-hover/drop:-translate-y-0.5 group-hover/drop:border-success/30 group-hover/drop:text-success">
                          <RiUploadCloud2Line size={22} />
                        </div>

                        <p className="mt-3 text-sm font-semibold text-text-primary">
                          Choose a ZIP file
                        </p>

                        <p className="mt-1 text-xs leading-relaxed text-text-muted">
                          Drag and drop your project here, or click to
                          browse.
                        </p>

                        <div className="mt-3 flex flex-wrap items-center justify-center gap-1.5">
                          <span className="rounded-md border border-border bg-surface px-1.5 py-0.5 font-mono text-[10px] text-text-muted">
                            .zip
                          </span>

                          <span className="px-1 text-[10px] text-text-subtle">
                            Maximum 100 MB
                          </span>
                        </div>

                        <div className="mt-4 flex w-full items-start gap-2 rounded-lg border border-amber-500/20 bg-amber-500/5 p-3 text-left">
                          <RiAlertLine
                            size={16}
                            className="mt-0.5 shrink-0 text-amber-600"
                          />

                          <div className="min-w-0">
                            <p className="text-[11px] font-semibold text-text-primary">
                              Before you upload
                            </p>
                            <p className="mt-1 text-[11px] leading-relaxed text-text-muted">
                              Remove the{" "}
                              <code className="rounded bg-surface px-1 py-0.5 font-mono text-[10px] text-text-primary">
                                node_modules
                              </code>{" "}
                              folder and environment files such as{" "}
                              <code className="rounded bg-surface px-1 py-0.5 font-mono text-[10px] text-text-primary">
                                .env
                              </code>{" "}
                              and{" "}
                              <code className="rounded bg-surface px-1 py-0.5 font-mono text-[10px] text-text-primary">
                                .env.local
                              </code>
                              . These can make your ZIP unnecessarily
                              large and may expose sensitive credentials.
                            </p>
                          </div>
                        </div>
                      </>
                    )}
                  </label>

                  {file && (
                    <button
                      type="button"
                      title="Remove selected file"
                      aria-label="Remove selected file"
                      onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        setFile(null);
                      }}
                      className="absolute right-3 top-3 z-10 flex size-8 items-center justify-center rounded-md border border-border bg-surface text-text-muted transition-colors hover:border-red-500/30 hover:bg-red-500/5 hover:text-red-500"
                    >
                      <RiDeleteBinLine size={16} />
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
