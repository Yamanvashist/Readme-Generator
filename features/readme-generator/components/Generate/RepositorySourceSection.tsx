"use client";

import { FaGithub } from "react-icons/fa";
import {
  RiCheckLine,
  RiComputerLine,
  RiGitRepositoryLine,
} from "react-icons/ri";
import type { IconType } from "react-icons";

import type { RepositorySourceValue } from "../../types/types";
import GitHubRepositoryPanel from "./repository-source/GitHubRepositoryPanel";
import LocalZipUploadPanel from "./repository-source/LocalZipUploadPanel";

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
  isValidUrl: boolean;
  setIsValidUrl: (isValid: boolean) => void;
};

export default function RepositorySourceSection({
  selected,
  setSelected,
  repoUrl,
  setRepoUrl,
  file,
  setFile,
  isValidUrl,
  setIsValidUrl,
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
                <GitHubRepositoryPanel
                  repoUrl={repoUrl}
                  setRepoUrl={setRepoUrl}
                  isValidUrl={isValidUrl}
                  setIsValidUrl={setIsValidUrl}
                  setSelected={setSelected}
                  isActive={isSelected}
                  dimmed={dimmed}
                />
              ) : (
                <LocalZipUploadPanel
                  file={file}
                  setFile={setFile}
                  isActive={isSelected}
                  dimmed={dimmed}
                />
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}