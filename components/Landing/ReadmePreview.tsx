import {
  FiCheck,
  FiCopy,
  FiDownload,
  FiFileText,
} from "react-icons/fi";

export default function ReadmePreview() {
  return (
    <section id="product" className="border-t border-border bg-white py-28">
      <div className="mx-auto max-w-360 px-6 lg:px-10">
        
        <div className="mx-auto max-w-2xl text-center">
          <span
            className="
              text-xs font-semibold uppercase
              tracking-[0.18em] text-text-muted
            "
          >
            The result
          </span>

          <h2
            className="
              mt-4 text-4xl font-semibold
              leading-[1.08] tracking-[-0.04em]
              text-text-primary
              md:text-5xl
            "
          >
            From messy codebase
            <br />
            <span className="text-text-secondary">
              to README-ready.
            </span>
          </h2>

          <p
            className="
              mx-auto mt-5 max-w-xl
              text-sm leading-6
              text-text-secondary
              md:text-base
            "
          >
            README Forge turns your repository into documentation that is
            structured, readable, and ready to ship.
          </p>
        </div>

        <div
          className="
            mx-auto mt-16 max-w-6xl
            overflow-hidden rounded-2xl
            border border-border
            bg-white
            shadow-lg
          "
        >
          <div
            className="
              flex h-14 items-center justify-between
              border-b border-border
              bg-background
              px-4 sm:px-5
            "
          >
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-zinc-300" />
                <span className="h-2.5 w-2.5 rounded-full bg-zinc-300" />
                <span className="h-2.5 w-2.5 rounded-full bg-zinc-300" />
              </div>

              <div className="hidden h-5 w-px bg-border sm:block" />

              <div className="hidden items-center gap-2 text-xs text-text-secondary sm:flex">
                <FiFileText size={14} />
                README.md
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                className="
                  inline-flex items-center gap-2
                  rounded-md border border-border
                  bg-white px-3 py-1.5
                  text-xs font-medium
                  text-text-secondary
                  transition-all duration-200
                  hover:border-primary-muted
                  hover:text-text-primary
                  hover:shadow-sm
                "
              >
                <FiCopy size={13} />
                <span className="hidden sm:inline">Copy</span>
              </button>

              <button
                className="
                  inline-flex items-center gap-2
                  rounded-md bg-primary
                  px-3 py-1.5
                  text-xs font-medium
                  text-white
                  transition-all duration-200
                  hover:bg-primary-hover
                  hover:shadow-primary
                "
              >
                <FiDownload size={13} />
                <span className="hidden sm:inline">Download</span>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="grid min-h-130 grid-cols-1 lg:grid-cols-2">
            {/* Markdown */}
            <div className="border-b border-border lg:border-b-0 lg:border-r">
              <div className="flex h-11 items-center border-b border-border px-5">
                <span className="text-xs font-medium text-text-muted">
                  Markdown
                </span>
              </div>

              <div className="p-6 font-mono text-[13px] leading-7 text-text-secondary sm:p-8">
                <p className="font-semibold text-text-primary">
                  # TaskFlow
                </p>

                <p className="mt-4">
                  A modern task management application built with
                  Next.js, TypeScript, and PostgreSQL.
                </p>

                <p className="mt-6 font-semibold text-text-primary">
                  ## Features
                </p>

                <p className="mt-2">
                  - Create and organize tasks
                  <br />
                  - Track project progress
                  <br />
                  - Real-time updates
                  <br />
                  - Responsive dashboard
                </p>

                <p className="mt-6 font-semibold text-text-primary">
                  ## Tech Stack
                </p>

                <p className="mt-2">
                  - Next.js
                  <br />
                  - TypeScript
                  <br />
                  - PostgreSQL
                  <br />
                  - Prisma
                  <br />
                  - Tailwind CSS
                </p>

                <p className="mt-6 font-semibold text-text-primary">
                  ## Getting Started
                </p>

                <p className="mt-2">
                  ```bash
                  <br />
                  npm install
                  <br />
                  npm run dev
                  <br />
                  ```
                </p>
              </div>
            </div>

            <div className="bg-background">
              <div className="flex h-11 items-center justify-between border-b border-border px-5">
                <span className="text-xs font-medium text-text-muted">
                  Preview
                </span>

                <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-success">
                  <FiCheck size={13} />
                  Generated
                </span>
              </div>

              <div className="p-6 sm:p-8">
                <div className="rounded-xl border border-border bg-white p-6 shadow-sm sm:p-8">
                  <h3 className="text-2xl font-semibold tracking-[-0.03em] text-text-primary">
                    TaskFlow
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-text-secondary">
                    A modern task management application built with
                    Next.js, TypeScript, and PostgreSQL.
                  </p>

                  <div className="mt-7">
                    <h4 className="text-sm font-semibold text-text-primary">
                      Features
                    </h4>

                    <ul className="mt-3 space-y-2 text-sm text-text-secondary">
                      <li className="flex gap-2">
                        <FiCheck
                          className="mt-0.5 shrink-0 text-success"
                          size={15}
                        />
                        Create and organize tasks
                      </li>

                      <li className="flex gap-2">
                        <FiCheck
                          className="mt-0.5 shrink-0 text-success"
                          size={15}
                        />
                        Track project progress
                      </li>

                      <li className="flex gap-2">
                        <FiCheck
                          className="mt-0.5 shrink-0 text-success"
                          size={15}
                        />
                        Real-time updates
                      </li>

                      <li className="flex gap-2">
                        <FiCheck
                          className="mt-0.5 shrink-0 text-success"
                          size={15}
                        />
                        Responsive dashboard
                      </li>
                    </ul>
                  </div>

                  <div className="mt-7">
                    <h4 className="text-sm font-semibold text-text-primary">
                      Tech Stack
                    </h4>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {[
                        "Next.js",
                        "TypeScript",
                        "PostgreSQL",
                        "Prisma",
                        "Tailwind CSS",
                      ].map((tech) => (
                        <span
                          key={tech}
                          className="
                            rounded-md
                            border border-border
                            bg-background
                            px-2.5 py-1
                            text-[11px]
                            font-medium
                            text-text-secondary
                          "
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-7">
                    <h4 className="text-sm font-semibold text-text-primary">
                      Getting Started
                    </h4>

                    <div
                      className="
                        mt-3 overflow-hidden
                        rounded-lg
                        bg-code-background
                        p-4
                        font-mono text-xs
                        leading-6 text-code-text
                      "
                    >
                      <p>
                        <span className="text-zinc-500">$</span>{" "}
                        npm install
                      </p>

                      <p>
                        <span className="text-zinc-500">$</span>{" "}
                        npm run dev
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <p className="text-xs text-text-muted">
            Generated from the actual repository structure — not a generic template.
          </p>
        </div>
      </div>
    </section>
  );
}