import { FaArrowRightLong } from "react-icons/fa6";
import {
  FiGithub,
  FiCpu,
  FiFileText,
  FiLink2,
  FiFolder,
  FiCheck,
  FiCopy,
  FiDownload,
} from "react-icons/fi";

const steps = [
  {
    number: "01",
    icon: FiGithub,
    title: "Connect your repository",
    description:
      "Paste your GitHub repository URL and let README Forge access the codebase.",
  },
  {
    number: "02",
    icon: FiCpu,
    title: "Analyze your codebase",
    description:
      "AI analyzes your project structure, dependencies, scripts, and key files.",
  },
  {
    number: "03",
    icon: FiFileText,
    title: "Generate your README",
    description:
      "Get a structured, professional README that actually reflects your project.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="border-t border-border bg-white py-28">
      <div className="mx-auto max-w-360 px-6 lg:px-10">
        
        <div className="mx-auto max-w-3xl text-center">
          <span
            className="
              inline-flex items-center rounded-full
              border border-border bg-background
              px-4 py-1.5
              text-[11px] font-semibold uppercase tracking-[0.2em]
              text-text-secondary
            "
          >
            How it works
          </span>

          <h2
            className="
              mt-5 text-4xl font-semibold
              leading-[1.08] tracking-[-0.045em]
              text-text-primary
              md:text-5xl
            "
          >
            From repository to README
            <br />
            <span className="text-text-secondary">
              in three simple steps.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-text-secondary md:text-lg">
            No complicated setup. Just give README Forge your repository and
            let it handle the documentation.
          </p>
        </div>

        {/* Steps */}
        <div className="mt-20 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-7">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div key={step.number} className="group relative">
                <div
                  className="
                    relative flex h-full min-h-130 flex-col
                    overflow-hidden rounded-2xl
                    border border-border
                    bg-background
                    p-8
                    transition-all duration-300 ease-out
                    hover:-translate-y-1
                    hover:border-primary-muted
                    hover:bg-white
                    hover:shadow-lg
                  "
                >
                  {/* Top Row */}
                  <div className="flex items-start justify-between">
                    <span
                      className="
                        inline-flex h-9 min-w-9 items-center justify-center
                        rounded-lg border border-border
                        bg-white
                        px-2.5
                        font-mono text-xs font-medium
                        text-text-secondary
                      "
                    >
                      {step.number}
                    </span>

                    {/* Icon */}
                    {index === 0 ? (
                      <div
                        className="
                          flex h-16 w-16 items-center justify-center
                          rounded-xl bg-primary
                          text-white
                          shadow-primary
                          transition-transform duration-300
                          group-hover:scale-105
                        "
                      >
                        <Icon size={30} strokeWidth={1.8} />
                      </div>
                    ) : (
                      <div
                        className="
                          flex h-16 w-16 items-center justify-center
                          rounded-xl border border-border
                          bg-white
                          text-text-primary
                          shadow-sm
                          transition-all duration-300
                          group-hover:border-primary-muted
                          group-hover:shadow-md
                          group-hover:scale-105
                        "
                      >
                        <Icon size={30} strokeWidth={1.8} />
                      </div>
                    )}
                  </div>

                  {/* Text */}
                  <div className="mt-10">
                    <h3
                      className="
                        max-w-65
                        text-2xl font-semibold
                        leading-tight tracking-[-0.03em]
                        text-text-primary
                      "
                    >
                      {step.title}
                    </h3>

                    <p className="mt-4 max-w-sm text-sm leading-6 text-text-secondary">
                      {step.description}
                    </p>
                  </div>

                  <div className="mt-auto pt-10">
                    {index === 0 && (
                      <div
                        className="
                          rounded-xl border border-border
                          bg-white p-3
                          shadow-sm
                          transition-all duration-300
                          group-hover:shadow-md
                        "
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-white">
                            <FiGithub size={19} />
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2.5">
                              <FiLink2
                                size={14}
                                className="shrink-0 text-text-muted"
                              />

                              <span className="truncate text-xs text-text-secondary">
                                github.com/username/repository
                              </span>
                            </div>
                          </div>

                          <button
                            className="
                              flex h-10 w-10 shrink-0 items-center justify-center
                              rounded-lg bg-primary text-white
                              transition-all duration-200
                              hover:bg-primary-hover
                            "
                          >
                            <FaArrowRightLong size={15} />
                          </button>
                        </div>
                      </div>
                    )}

                    {index === 1 && (
                      <div
                        className="
                          overflow-hidden rounded-xl
                          border border-border bg-white
                          shadow-sm
                          transition-all duration-300
                          group-hover:shadow-md
                        "
                      >
                        <div className="grid grid-cols-2 divide-x divide-border">
                          {/* File Tree */}
                          <div className="p-4">
                            <div className="space-y-2.5 font-mono text-[10px] text-text-secondary">
                              <div className="flex items-center gap-2">
                                <FiFolder size={13} />
                                <span>src/</span>
                              </div>

                              <div className="flex items-center gap-2">
                                <FiFolder size={13} />
                                <span>components/</span>
                              </div>

                              <div className="flex items-center gap-2">
                                <FiFolder size={13} />
                                <span>lib/</span>
                              </div>

                              <div className="flex items-center gap-2">
                                <FiFolder size={13} />
                                <span>prisma/</span>
                              </div>

                              <div className="flex items-center gap-2">
                                <FiFileText size={13} />
                                <span>package.json</span>
                              </div>

                              <div className="flex items-center gap-2">
                                <FiFileText size={13} />
                                <span>.env.example</span>
                              </div>
                            </div>
                          </div>

                          <div className="p-4">
                            <div className="space-y-3">
                              {[
                                "Analyzing files",
                                "Detecting structure",
                                "Finding dependencies",
                                "Understanding context",
                              ].map((item) => (
                                <div
                                  key={item}
                                  className="flex items-center gap-2"
                                >
                                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-success-light text-success">
                                    <FiCheck size={10} strokeWidth={3} />
                                  </span>

                                  <span className="text-[10px] font-medium text-text-secondary">
                                    {item}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {index === 2 && (
                      <div
                        className="
                          overflow-hidden rounded-xl
                          border border-border bg-white
                          shadow-sm
                          transition-all duration-300
                          group-hover:shadow-md
                        "
                      >
                        <div className="flex items-center justify-between border-b border-border px-3 py-2.5">
                          <div className="flex items-center gap-1.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-text-subtle" />
                            <span className="h-1.5 w-1.5 rounded-full bg-text-subtle" />
                            <span className="h-1.5 w-1.5 rounded-full bg-text-subtle" />
                          </div>

                          <span className="rounded-full bg-success-light px-2 py-1 text-[9px] font-medium text-success">
                            Generated
                          </span>
                        </div>

                        <div className="p-4">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-text-primary">
                              README.md
                            </span>

                            <div className="flex items-center gap-1.5">
                              <button className="flex h-7 w-7 items-center justify-center rounded-md border border-border text-text-muted">
                                <FiCopy size={12} />
                              </button>

                              <button className="flex h-7 w-7 items-center justify-center rounded-md border border-border text-text-muted">
                                <FiDownload size={12} />
                              </button>
                            </div>
                          </div>

                          <div className="mt-4 space-y-2">
                            <div className="h-2.5 w-32 rounded bg-text-primary/10" />
                            <div className="h-2 w-full rounded bg-text-primary/5" />
                            <div className="h-2 w-11/12 rounded bg-text-primary/5" />

                            <div className="pt-3">
                              <div className="mb-2 h-2.5 w-20 rounded bg-text-primary/10" />
                              <div className="space-y-1.5">
                                <div className="h-2 w-4/5 rounded bg-text-primary/5" />
                                <div className="h-2 w-3/5 rounded bg-text-primary/5" />
                                <div className="h-2 w-2/3 rounded bg-text-primary/5" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {index < steps.length - 1 && (
                  <div
                    className="
                      absolute -right-5 top-1/2 z-20
                      hidden -translate-y-1/2 md:flex
                      h-10 w-10
                      items-center justify-center
                      rounded-full
                      border border-border
                      bg-white
                      text-text-muted
                      shadow-sm
                      transition-all duration-300
                      group-hover:text-text-primary
                      group-hover:shadow-md
                    "
                  >
                    <FaArrowRightLong size={14} />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-12 flex items-center justify-center gap-2 text-xs text-text-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-success" />
          <span>No signup required to get started</span>
        </div>
      </div>
    </section>
  );
}