"use client";

import { useState } from "react";
import axios from "axios";

import {
  RiArrowRightLine,
  RiCheckLine,
  RiCloseLine,
  RiGitRepositoryCommitsFill,
  RiLinkM,
} from "react-icons/ri";

import type { RepositorySourceValue } from "../../../types/types";
import RepositoryUrlGuide from "./RepositoryUrlGuide";

type GitHubRepositoryPanelProps = {
  repoUrl: string;
  setRepoUrl: (value: string) => void;
  isValidUrl: boolean;
  setIsValidUrl: (isValid: boolean) => void;
  setSelected: (value: RepositorySourceValue) => void;
  isActive: boolean;
  dimmed: string;
};

export default function GitHubRepositoryPanel({
  repoUrl,
  setRepoUrl,
  isValidUrl,
  setIsValidUrl,
  setSelected,
  isActive,
  dimmed,
}: GitHubRepositoryPanelProps) {
  const [hasCheckedUrl, setHasCheckedUrl] = useState(false);

  const handleValidUrl = async () => {
    setSelected("github");
    setHasCheckedUrl(true);

    const url = repoUrl.trim();

    setIsValidUrl(false);

    if (!url) return;

    try {
      const parsedUrl = new URL(url);
      const [owner, rawRepo] = parsedUrl.pathname.split("/").filter(Boolean);
      const repo = rawRepo?.replace(/\.git$/, "");

      if (
        parsedUrl.protocol !== "https:" ||
        parsedUrl.hostname !== "github.com" ||
        !owner ||
        !repo
      ) {
        return;
      }

      const response = await axios.get(
        `https://api.github.com/repos/${owner}/${repo}`,
      );

      setIsValidUrl(response.status === 200);
    } catch {
      setIsValidUrl(false);
    }
  };

  return (
    <div
      className={`mt-4 flex flex-1 flex-col gap-3 rounded-lg border border-border-light bg-surface-secondary p-3 transition-opacity duration-200 ${dimmed}`}
      onClick={(event) => event.stopPropagation()}
    >
      <div>
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-text-muted">
          Repository URL
        </p>

        <div className="flex h-11 items-center gap-2 rounded-lg border border-border bg-surface pl-3 pr-1.5 shadow-xs transition-all focus-within:border-success focus-within:ring-4 focus-within:ring-success/10">
          <RiLinkM size={16} className="shrink-0 text-text-muted" />

          <input
            type="url"
            value={repoUrl}
            onChange={(event) => {
              setRepoUrl(event.target.value);
              setIsValidUrl(false);
              setHasCheckedUrl(false);
            }}
            placeholder="https://github.com/username/repository"
            aria-label="GitHub repository URL"
            className="h-full min-w-0 flex-1 truncate bg-transparent text-sm text-foreground outline-none placeholder:text-sm placeholder:text-text-subtle selection:bg-success/20"
          />

          <button
            type="button"
            aria-label="Clear repository URL"
            onClick={() => {
              setRepoUrl("");
              setIsValidUrl(false);
              setHasCheckedUrl(false);
              localStorage.removeItem("repoUrl");
            }}
            className="flex size-7 shrink-0 items-center justify-center rounded-md text-text-subtle transition-colors hover:bg-surface-muted hover:text-text-primary"
          >
            <RiCloseLine size={15} />
          </button>

          <button
            type="button"
            aria-label="Validate GitHub repository URL"
            onClick={handleValidUrl}
            className="flex size-8 shrink-0 items-center justify-center rounded-md bg-success text-white shadow-sm transition hover:brightness-110 active:scale-95"
          >
            <RiArrowRightLine size={16} />
          </button>
        </div>

        <p className="mt-2 text-[11px] leading-relaxed text-text-muted">
          Paste the main URL of the repository you want to review. Make sure the
          repository is accessible to the service.
        </p>
      </div>

      <div
        className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-[11px] font-medium transition-colors ${
          !hasCheckedUrl
            ? "border-border bg-surface text-text-muted"
            : isValidUrl
              ? "border-success/15 bg-success/5 text-success"
              : "border-red-500/20 bg-red-500/5 text-red-500"
        }`}
        aria-live="polite"
      >
        {!hasCheckedUrl ? (
          <RiGitRepositoryCommitsFill size={14} className="shrink-0" />
        ) : isValidUrl ? (
          <RiCheckLine size={14} className="shrink-0" />
        ) : (
          <RiCloseLine size={14} className="shrink-0" />
        )}

        <span>
          {!hasCheckedUrl
            ? repoUrl.trim()
              ? "URL entered · press the arrow to validate"
              : "Waiting for repository URL"
            : isValidUrl
              ? "Valid GitHub repository URL"
              : repoUrl.trim()
                ? "Invalid GitHub repository URL"
                : "Enter a repository URL to continue"}
        </span>
      </div>

      <RepositoryUrlGuide />
    </div>
  );
}
