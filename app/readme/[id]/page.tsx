import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import {
  ArrowLeft,
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Code2,
  FileText,
  Sparkles,
} from "lucide-react";

interface ReadmePageProps {
  params: Promise<{ id: string }>;
}

export default async function ReadmePage({ params }: ReadmePageProps) {
  const { id } = await params;

  const readme = await prisma.generatedReadme.findUnique({
    where: { id },
  });

  if (!readme) {
    notFound();
  }

  const formattedDate = new Date(readme.createdAt).toLocaleDateString(
    "en-IN",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    },
  );

  let repoName = readme.repoUrl;

  if (readme.repoUrl) {
    try {
      const url = new URL(readme.repoUrl);
      repoName = url.pathname.split("/").filter(Boolean).slice(0, 2).join("/");
    } catch {
      // Keep the original URL if it isn't a valid URL.
    }
  }

  return (
    <main className="min-h-screen bg-[#09090b] text-zinc-100">
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-105 w-175 -translate-x-1/2 rounded-full bg-emerald-500/5.5 blur-[140px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-size-[48px_48px] mask-[linear-gradient(to_bottom,black,transparent_75%)]" />
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-20 border-b border-white/8 bg-[#09090b]/85 backdrop-blur-xl">
        <div className="mx-auto flex h-17 max-w-360 items-center justify-between px-5 sm:px-8 lg:px-12">
          <Link
            href="/"
            className="group flex items-center gap-3"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-400/8 text-emerald-400 transition-colors group-hover:bg-emerald-400/[0.14]">
              <Code2 size={19} strokeWidth={2.2} />
            </div>

            <div>
              <p className="text-sm font-semibold tracking-tight text-white">
                README<span className="text-emerald-400">.studio</span>
              </p>
              <p className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.18em] text-zinc-500">
                Documentation workspace
              </p>
            </div>
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg border border-white/9 bg-white/[0.035] px-3.5 py-2 text-xs font-medium text-zinc-300 transition-all hover:border-white/20 hover:bg-white/[0.07] hover:text-white sm:text-sm"
          >
            <ArrowLeft size={15} />
            <span>Back to generator</span>
          </Link>
        </div>
      </nav>

      <div className="relative mx-auto max-w-360 px-5 pb-16 pt-8 sm:px-8 sm:pt-12 lg:px-12">
        {/* Breadcrumb */}
        <div className="mb-8 flex flex-wrap items-center gap-2 text-xs text-zinc-500">
          <span className="transition-colors hover:text-zinc-300">
            Workspace
          </span>
          <span className="text-zinc-700">/</span>
          <span className="text-zinc-300">Generated documentation</span>
          <span className="text-zinc-700">/</span>
          <span className="max-w-55 truncate text-emerald-400">
            {repoName}
          </span>
        </div>

        {/* Repository hero */}
        <section className="relative mb-8 overflow-hidden rounded-2xl border border-white/9#111113]">
          <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-emerald-400/60 to-transparent" />

          <div className="p-6 sm:p-9 lg:p-10">
            <div className="flex flex-col gap-7 lg:flex-row lg:items-start lg:justify-between">
              <div className="min-w-0 flex-1">
                <div className="mb-5 flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/[0.07] px-2.5 py-1 text-[11px] font-medium text-emerald-400">
                    <CheckCircle2 size={12} />
                    Generated successfully
                  </span>

                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/8 bg-white/2.5 px-2.5 py-1 text-[11px] text-zinc-400">
                    <Sparkles size={12} />
                    AI-generated documentation
                  </span>
                </div>

                <div className="flex items-start gap-4">
                  <div className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/4 sm:flex">
                    <Code2 size={27} strokeWidth={1.6} />
                  </div>

                  <div className="min-w-0">
                    <h1 className="wrap-break-word text-2xl font-semibold tracking-tight text-white sm:text-3xl lg:text-[38px]">
                      {repoName}
                    </h1>

                    <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-400 sm:text-[15px]">
                      Your repository documentation is ready. Explore the
                      generated README below, or open the original repository
                      on GitHub.
                    </p>

                    <a
                      href={readme.repoUrl ?? undefined}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex max-w-full items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-emerald-400"
                    >
                      <Code2 size={15} className="shrink-0" />
                      <span className="truncate">{readme.repoUrl}</span>
                      <ArrowUpRight size={14} className="shrink-0" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex shrink-0 flex-wrap gap-2">
                <a
                  href={readme.repoUrl ?? undefined}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/4 px-4 py-2.5 text-sm font-medium text-zinc-200 transition-all hover:border-white/20 hover:bg-white/8"
                >
                  <Code2 size={16} />
                  Repository
                  <ArrowUpRight size={14} />
                </a>

                <a
                  href={`data:text/markdown;charset=utf-8,${encodeURIComponent(readme.content)}`}
                  download="README.md"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-400 px-4 py-2.5 text-sm font-semibold text-[#07110b] shadow-lg shadow-emerald-500/8 transition-all hover:bg-emerald-300"
                >
                  <FileText size={16} />
                  Download .md
                </a>
              </div>
            </div>

            {/* Metadata */}
            <div className="mt-8 grid grid-cols-1 gap-3 border-t border-white/[0.07] pt-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex items-center gap-3 rounded-xl border border-white/6 bg-black/20 p-3.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-400/9 text-blue-300">
                  <BookOpen size={17} />
                </div>
                <div>
                  <p className="text-[11px] text-zinc-500">Document type</p>
                  <p className="mt-1 text-sm font-medium text-zinc-200">
                    Markdown README
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-white/6 bg-black/20 p-3.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-400/9 text-purple-300">
                  <CalendarDays size={17} />
                </div>
                <div>
                  <p className="text-[11px] text-zinc-500">Created on</p>
                  <p className="mt-1 text-sm font-medium text-zinc-200">
                    {formattedDate}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-white/6 bg-black/20 p-3.5 sm:col-span-2 lg:col-span-1">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-400/9 text-emerald-300">
                  <Code2 size={17} />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] text-zinc-500">Document ID</p>
                  <p className="mt-1 truncate font-mono text-xs text-zinc-300">
                    {readme.id}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* README document */}
        <section className="overflow-hidden rounded-2xl border border-white/9 bg-[#0e0e10] shadow-2xl shadow-black/20">
          {/* Editor toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/8 bg-[#141416] px-5 py-4 sm:px-7">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-emerald-400/15 bg-emerald-400/[0.07] text-emerald-400">
                <FileText size={17} />
              </div>

              <div>
                <h2 className="text-sm font-semibold text-zinc-100">
                  README.md
                </h2>
                <p className="mt-0.5 text-[11px] text-zinc-500">
                  Repository documentation
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 rounded-lg border border-white/[0.07] bg-black/20 px-3 py-2 text-xs text-zinc-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Markdown preview
            </div>
          </div>

          {/* Markdown content */}
          <article className="readme-content min-w-0 px-5 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12">
            <ReactMarkdown
              components={{
                h1: ({ children }) => (
                  <h1 className="mb-7 mt-2 border-b border-white/9 pb-5 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="mb-5 mt-12 flex items-center gap-3 border-b border-white/[0.07] pb-3 text-xl font-semibold tracking-tight text-white sm:text-2xl">
                    <span className="h-5 w-1 rounded-full bg-emerald-400" />
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="mb-3 mt-8 text-lg font-semibold text-zinc-100">
                    {children}
                  </h3>
                ),
                p: ({ children }) => (
                  <p className="my-5 text-[14px] leading-7 text-zinc-400 sm:text-[15px] sm:leading-8">
                    {children}
                  </p>
                ),
                a: ({ href, children }) => (
                  <a
                    href={href}
                    target={href?.startsWith("http") ? "_blank" : undefined}
                    rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="font-medium text-emerald-400 underline decoration-emerald-400/30 underline-offset-4 transition-colors hover:text-emerald-300"
                  >
                    {children}
                  </a>
                ),
                ul: ({ children }) => (
                  <ul className="my-5 list-disc space-y-2.5 pl-6 text-[14px] leading-7 text-zinc-400 marker:text-emerald-400 sm:text-[15px]">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="my-5 list-decimal space-y-2.5 pl-6 text-[14px] leading-7 text-zinc-400 marker:font-semibold marker:text-emerald-400 sm:text-[15px]">
                    {children}
                  </ol>
                ),
                li: ({ children }) => <li className="pl-1">{children}</li>,
                blockquote: ({ children }) => (
                  <blockquote className="my-7 rounded-r-xl border-l-2 border-emerald-400 bg-emerald-400/4 px-5 py-2 text-zinc-300 [&_p]:my-3">
                    {children}
                  </blockquote>
                ),
                hr: () => <hr className="my-10 border-white/9" />,
                table: ({ children }) => (
                  <div className="my-7 overflow-x-auto rounded-xl border border-white/9">
                    <table className="w-full border-collapse text-left text-sm">
                      {children}
                    </table>
                  </div>
                ),
                thead: ({ children }) => (
                  <thead className="bg-white/4 text-zinc-200">
                    {children}
                  </thead>
                ),
                th: ({ children }) => (
                  <th className="border-b border-white/9 px-4 py-3 font-semibold">
                    {children}
                  </th>
                ),
                td: ({ children }) => (
                  <td className="border-b border-white/5 px-4 py-3 text-zinc-400">
                    {children}
                  </td>
                ),
                pre: ({ children }) => (
                  <pre className="my-6 overflow-x-auto rounded-xl border border-white/9 bg-[#080809] p-4 text-[13px] leading-6 text-zinc-300 sm:p-5">
                    {children}
                  </pre>
                ),
                code: ({ children, className }) => {
                  const isBlock = Boolean(className);

                  return isBlock ? (
                    <code className={`${className ?? ""} font-mono`}>
                      {children}
                    </code>
                  ) : (
                    <code className="rounded-md border border-white/8 bg-white/6 px-1.5 py-0.5 font-mono text-[0.88em] text-emerald-300">
                      {children}
                    </code>
                  );
                },
                img: ({ src, alt }) => {
                  if (!src) return null;

                  return (
                    <img
                      src={src}
                      alt={alt ?? ""}
                      loading="lazy"
                      className="my-7 h-auto max-w-full rounded-xl border border-white/9"
                    />
                  );
                },
              }}
            >
              {readme.content}
            </ReactMarkdown>
          </article>

          {/* Document footer */}
          <div className="flex flex-col gap-3 border-t border-white/[0.07] bg-[#111113] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-7">
            <p className="text-xs leading-5 text-zinc-500">
              Generated with{" "}
              <span className="font-medium text-zinc-300">README.studio</span>
            </p>

            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-medium text-zinc-400 transition-colors hover:text-emerald-400"
            >
              <Sparkles size={14} />
              Generate another README
              <ArrowUpRight size={13} />
            </Link>
          </div>
        </section>

        <p className="mt-6 text-center text-xs text-zinc-600">
          Documentation generated on {formattedDate} · Stored securely in your
          database
        </p>
      </div>
    </main>
  );
}