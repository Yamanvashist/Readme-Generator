"use client";
import { useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";

import { useRouter } from "next/navigation";

export default function Hero() {
  const [githubUrl, setGithubUrl] = useState("");

  const router = useRouter();

  const generate = () => {
    const url = githubUrl.trim();

    if (!url) return;

    const isValidGitHubUrl =
      /^https?:\/\/(www\.)?github\.com\/[\w.-]+\/[\w.-]+\/?$/.test(url) ||
      /^(www\.)?github\.com\/[\w.-]+\/[\w.-]+\/?$/.test(url);

    if (!isValidGitHubUrl) {
      alert("Please enter a valid GitHub repository URL.");
      return;
    }

    const formattedUrl = url.startsWith("https") ? url : `https://${url}`;
    localStorage.setItem("repoUrl", formattedUrl);

    router.push("/generate");
  };

  return (
    <section
      className="
        min-h-[calc(100svh-72px)]
        overflow-hidden
        bg-background
        md:h-[calc(100svh-72px)]
      "
    >
      <div
        className="
          mx-auto grid
          min-h-[calc(100svh-72px)]
          max-w-360
          grid-cols-1
          items-center
          gap-14
          px-5 py-12
          sm:px-6
          md:grid-cols-2
          md:gap-10
          md:px-8
          md:py-0
          lg:gap-16
          lg:px-10
        "
      >
        {/* Left — Hero Content */}
        <div className="w-full max-w-2xl">
          <span
            className="
              mb-5 inline-flex max-w-full
              cursor-default items-center
              rounded-full border border-border bg-white
              px-3 py-1.5
              text-xs font-medium
              text-text-secondary
              shadow-sm
              transition-all duration-300 ease-out
              hover:-translate-y-0.5
              hover:border-primary-muted
              hover:shadow-md
              sm:mb-6 sm:text-sm
            "
          >
            <span className="mr-1.5 shrink-0">✦</span>

            <span className="truncate">
              README FORGE — Give Your Repo a Voice.
            </span>
          </span>

          <h1
            className="
              cursor-default
              text-[2.65rem]
              font-semibold
              leading-[1.04]
              tracking-[-0.045em]
              text-text-primary
              sm:text-5xl
              md:text-[3.15rem]
              lg:text-6xl
            "
          >
            Your code already
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            tells the story.
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            <span
              className="
                text-text-secondary
                transition-all duration-300
                hover:text-text-primary
                hover:tracking-tight
              "
            >
              Let AI write it down.
            </span>
          </h1>

          <p
            className="
              mt-5 max-w-xl
              text-sm leading-6
              text-text-secondary
              sm:mt-6 sm:text-base sm:leading-7
              lg:text-lg lg:leading-8
            "
          >
            Generate a professional README from your GitHub repository. README
            Forge analyzes your actual codebase, structure, and dependencies to
            create documentation that makes sense.
          </p>

          <div
            className="
              group mt-7 flex w-full max-w-xl
              items-center
              rounded-lg border border-border bg-white
              p-1.5
              shadow-md
              transition-all duration-300 ease-out
              hover:border-primary-muted
              hover:shadow-lg
              focus-within:border-border-focus
              focus-within:shadow-lg
              sm:mt-9
            "
          >
            <div className="flex min-w-0 flex-1 items-center gap-2 px-2 sm:gap-3 sm:px-3">
              <span
                className="
                  shrink-0 text-sm text-text-muted
                  transition-all duration-300
                  group-focus-within:scale-105
                  group-focus-within:text-text-primary
                  sm:text-base
                "
              >
                ⌘
              </span>

              <input
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                type="text"
                aria-label="GitHub repository URL"
                placeholder="github.com/username/repository"
                className="
                  min-w-0 w-full
                  bg-transparent
                  py-2.5  
                  text-xs text-text-primary
                  outline-none
                  placeholder:text-text-subtle
                  sm:text-sm
                "
              />
            </div>

            <button
              type="button"
              onClick={generate}
              className="
                group/button
                flex shrink-0 items-center
                gap-0
                rounded-sm
                bg-primary
                px-3.5 py-2.5
                text-xs font-medium
                text-white
                shadow-sm
                transition-all duration-200 ease-out
                hover:bg-primary-hover
                hover:shadow-primary
                active:scale-[0.98]
                sm:px-5 sm:text-sm
              "
            >
              Generate
              <FaArrowRightLong
                className="
                  ml-0 w-0 overflow-hidden
                  opacity-0
                  transition-all duration-300 ease-out
                  group-hover/button:ml-2
                  group-hover/button:w-4
                  group-hover/button:translate-x-0.5
                  group-hover/button:opacity-100
                "
              />
            </button>
          </div>

          <p className="mt-3 text-[11px] text-text-muted sm:text-xs">
            No signup required · Free to try
          </p>
        </div>

        <div
          className="
            relative
            mx-auto
            h-85
            w-full
            max-w-105
            sm:h-100
            md:h-110
            md:max-w-none
            lg:h-125
          "
        >
          <div
            className="
              group
              absolute
              left-0
              top-2
              z-10
              w-[64%]
              max-w-64
              rounded-xl
              border border-border
              bg-white
              p-4
              shadow-lg
              transition-all duration-500 ease-out
              hover:-translate-y-2
              hover:-rotate-1
              hover:border-primary-muted
              hover:shadow-xl
              sm:p-5
              md:left-0
              md:top-8
              md:w-64
            "
          >
            <div className="mb-4 flex items-center gap-2">
              <div
                className="
                  flex h-8 w-8 shrink-0
                  items-center justify-center
                  rounded-md bg-primary-light
                  text-sm
                  transition-all duration-300
                  group-hover:scale-110
                  group-hover:rotate-[-4deg]
                "
              >
                📁
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-text-primary">
                  my-project
                </p>

                <p className="text-xs text-text-muted">Repository</p>
              </div>
            </div>

            <div className="space-y-2 font-mono text-[10px] text-text-secondary sm:text-xs">
              {[
                "├── src/",
                "├── components/",
                "├── lib/",
                "├── prisma/",
                "├── package.json",
                "└── .env.example",
              ].map((item) => (
                <p
                  key={item}
                  className="
                    truncate
                    transition-transform duration-200
                    group-hover:translate-x-1
                  "
                >
                  {item}
                </p>
              ))}
            </div>
          </div>

          <div
            className="
              group
              absolute
              left-1/2
              top-1/2
              z-30
              flex
              h-24 w-24
              -translate-x-1/2
              -translate-y-1/2
              flex-col
              items-center
              justify-center
              rounded-2xl
              border border-border
              bg-primary
              text-white
              shadow-primary
              transition-all duration-500 ease-out
              hover:scale-110
              hover:shadow-[0_12px_40px_rgba(0,0,0,0.2)]
              sm:h-28 sm:w-28
            "
          >
            <span
              className="
                text-xl
                transition-transform duration-500
                group-hover:rotate-90
                sm:text-2xl
              "
            >
              ✦
            </span>

            <span className="mt-1 text-[10px] font-medium sm:text-xs">
              AI Analysis
            </span>
          </div>

          <div
            className="
              group
              absolute
              bottom-0
              right-0
              z-20
              w-[72%]
              max-w-72
              rounded-xl
              border border-border
              bg-white
              p-4
              shadow-lg
              transition-all duration-500 ease-out
              hover:-translate-y-2
              hover:rotate-1
              hover:border-primary-muted
              hover:shadow-xl
              sm:p-5
              md:bottom-4
              md:w-72
            "
          >
            <div className="mb-4 flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-text-primary">
                README.md
              </p>

              <span
                className="
                  shrink-0
                  rounded
                  bg-success-light
                  px-2 py-1
                  text-[9px] font-medium
                  text-success
                  transition-transform duration-300
                  group-hover:scale-105
                  sm:text-[10px]
                "
              >
                Generated
              </span>
            </div>

            <div className="space-y-3">
              <div
                className="
                  h-2.5 w-28 rounded
                  bg-text-primary/10
                  transition-all duration-300
                  group-hover:w-36
                  sm:h-3 sm:w-32
                "
              />

              <div className="h-1.5 w-full rounded bg-text-primary/5 sm:h-2" />

              <div className="h-1.5 w-5/6 rounded bg-text-primary/5 sm:h-2" />

              <div className="pt-2">
                <div className="mb-2 h-2.5 w-20 rounded bg-text-primary/10 sm:h-3 sm:w-24" />

                <div className="h-1.5 w-full rounded bg-text-primary/5 sm:h-2" />

                <div className="mt-1 h-1.5 w-4/5 rounded bg-text-primary/5 sm:h-2" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
