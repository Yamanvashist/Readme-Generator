"use client";

import { useId, type ChangeEvent } from "react";
import toast from "react-hot-toast";

import {
  RiAlertLine,
  RiCheckLine,
  RiDeleteBinLine,
  RiFileZipLine,
  RiUploadCloud2Line,
} from "react-icons/ri";

type LocalZipUploadPanelProps = {
  file: File | null;
  setFile: (file: File | null) => void;
  isActive: boolean;
  dimmed: string;
};

const formatFileSize = (bytes: number) => {
  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
};

export default function LocalZipUploadPanel({
  file,
  setFile,
  isActive,
  dimmed,
}: LocalZipUploadPanelProps) {
  const fileInputId = useId();

  const handleFile = (selectedFile: File | undefined) => {
    if (!selectedFile) return;

    if (!selectedFile.name.toLowerCase().endsWith(".zip")) {
      toast.error("Please select a ZIP file.");
      return;
    }

    if (selectedFile.size > 100 * 1024 * 1024) {
      toast.error("File size must be under 100 MB.");
      return;
    }

    setFile(selectedFile);
  };

  const handleFileInputChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    handleFile(event.currentTarget.files?.[0]);
    event.currentTarget.value = "";
  };

  return (
    <div
      data-active={isActive}
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
                  <span className="mx-1.5 text-text-subtle">·</span>
                  {formatFileSize(file.size)}
                </p>

                <div className="mt-2 flex items-center gap-1.5 text-xs font-medium text-success">
                  <RiCheckLine size={14} />
                  <span>File ready to upload</span>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 border-t border-border/70 pt-3 text-xs text-text-muted">
              <RiUploadCloud2Line size={15} className="shrink-0" />
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
              Drag and drop your project here, or click to browse.
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
                  . These can make your ZIP unnecessarily large and may expose
                  sensitive credentials.
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
  );
}