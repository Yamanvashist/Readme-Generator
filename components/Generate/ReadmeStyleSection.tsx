import type { ReactNode } from "react";
import type { IconType } from "react-icons";
import {
  RiAlignLeft,
  RiBriefcaseLine,
  RiCheckLine,
  RiPaletteLine,
  RiSettings4Line,
  RiTerminalBoxLine,
} from "react-icons/ri";
import type { ReadmeStyleValue } from "./types";

type ReadmeStyleOption = {
  title: string;
  icon: IconType;
  desc: string;
  value: ReadmeStyleValue;
  preview: ReactNode;
};

const readmeStyles: ReadmeStyleOption[] = [
  {
    title: "Professional",
    icon: RiBriefcaseLine,
    desc: "Clean and polished, great for teams and clients",
    value: "professional",
    preview: (
      <div className="mt-3 flex h-14 flex-col justify-center gap-1.5 rounded-md border border-border-light bg-surface-secondary px-2.5">
        <div className="h-1.5 w-1/2 rounded-full bg-success/30" />
        <div className="h-1 w-full rounded-full bg-border" />
        <div className="h-1 w-5/6 rounded-full bg-border" />
      </div>
    ),
  },
  {
    title: "Developer",
    icon: RiTerminalBoxLine,
    desc: "Technical depth with setup, API and code details",
    value: "developer",
    preview: (
      <div className="mt-3 flex h-14 flex-col justify-center gap-1.5 rounded-md border border-border-light bg-surface-secondary px-2.5">
        <div className="h-1.5 w-1/3 rounded-full bg-success/30" />
        <div className="h-3 w-full rounded-sm bg-code-background" />
        <div className="h-1 w-3/4 rounded-full bg-border" />
      </div>
    ),
  },
  {
    title: "Minimal",
    icon: RiAlignLeft,
    desc: "Short and simple, just the essentials",
    value: "minimal",
    preview: (
      <div className="mt-3 flex h-14 flex-col justify-center gap-1.5 rounded-md border border-border-light bg-surface-secondary px-2.5">
        <div className="h-1.5 w-2/5 rounded-full bg-border" />
        <div className="h-1 w-3/4 rounded-full bg-border" />
      </div>
    ),
  },
  {
    title: "Custom",
    icon: RiSettings4Line,
    desc: "Describe your own structure and tone",
    value: "custom",
    preview: (
      <div className="mt-3 flex h-14 flex-col justify-center gap-1.5 rounded-md border border-dashed border-border bg-surface-secondary px-2.5">
        <div className="h-1.5 w-1/2 rounded-full border border-dashed border-border" />
        <div className="h-1 w-full rounded-full border border-dashed border-border" />
        <div className="h-1 w-2/3 rounded-full border border-dashed border-border" />
      </div>
    ),
  },
];

type ReadmeStyleSectionProps = {
  readmeStyle: ReadmeStyleValue;
  setReadmeStyle: (value: ReadmeStyleValue) => void;
};

export default function ReadmeStyleSection({
  readmeStyle,
  setReadmeStyle,
}: ReadmeStyleSectionProps) {
  return (
    <section className="overflow-hidden rounded-xl border border-border bg-surface shadow-md">
      <div className="flex items-center gap-3 border-b border-border-light px-5 py-4">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border bg-surface-secondary text-text-primary">
          <RiPaletteLine size={18} />
        </div>
        <div>
          <h2 className="text-sm font-semibold text-text-primary">README Style</h2>
          <p className="text-xs text-text-muted">
            Choose the tone and structure of your README
          </p>
        </div>
      </div>

      <div className="space-y-4 p-5">
        <p className="max-w-2xl text-xs leading-5 text-text-muted">
          Pick the style that fits your audience. Not sure? Professional works
          for most projects, and you can always regenerate with a different one.
        </p>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {readmeStyles.map((style) => {
            const Icon = style.icon;
            const isActive = readmeStyle === style.value;

            return (
              <div
                key={style.value}
                onClick={() => setReadmeStyle(style.value)}
                className={`group/style relative flex cursor-pointer flex-col rounded-xl border p-3.5 transition-all duration-200 ${
                  isActive
                    ? "border-success bg-success/3 shadow-sm ring-4 ring-success/10"
                    : "border-border bg-surface hover:border-foreground/25 hover:shadow-sm"
                }`}
              >
                {isActive ? (
                  <div className="absolute right-3 top-3 flex size-4 items-center justify-center rounded-full bg-success text-white">
                    <RiCheckLine size={11} />
                  </div>
                ) : (
                  <div className="absolute right-3 top-3 size-4 rounded-full border border-border bg-surface transition-colors group-hover/style:border-foreground/30" />
                )}

                <div
                  className={`flex size-9 items-center justify-center rounded-lg border transition-colors duration-200 ${
                    isActive
                      ? "border-success/25 bg-success/10 text-success"
                      : "border-border bg-surface-secondary text-text-primary"
                  }`}
                >
                  <Icon size={18} />
                </div>

                <div className="mt-3 flex-1 space-y-0.5">
                  <h3 className="text-sm font-semibold text-text-primary">
                    {style.title}
                  </h3>
                  <p className="text-[11px] leading-4 text-text-muted">
                    {style.desc}
                  </p>
                </div>

                {style.preview}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
