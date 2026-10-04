import { FaArrowRightLong } from "react-icons/fa6";

export default function FinalCTA() {
  return (
    <section className="border-t border-border bg-background py-24">
      <div className="mx-auto max-w-360 px-6 lg:px-10">
        <div
          className="
            relative overflow-hidden
            rounded-2xl
            border border-border
            bg-primary
            px-6 py-16
            text-center
            shadow-lg
            sm:px-10
            md:py-20
          "
        >
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/10" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-white/5" />

          <div className="relative mx-auto max-w-2xl">
            <span
              className="
                inline-flex items-center
                rounded-full
                border border-white/15
                bg-white/5
                px-3 py-1.5
                text-xs font-medium
                text-zinc-300
              "
            >
              ✦ Ready when your repo is
            </span>

            <h2
              className="
                mt-6
                text-4xl font-semibold
                leading-[1.08]
                tracking-[-0.04em]
                text-white
                md:text-5xl
              "
            >
              Your repository deserves
              <br />
              a README that explains it.
            </h2>

            <p
              className="
                mx-auto mt-5
                max-w-lg
                text-sm leading-6
                text-zinc-400
                md:text-base
              "
            >
              Stop staring at an empty README. Give README Forge your
              repository and get a solid first draft in seconds.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="/generate"
                className="
                  group
                  inline-flex items-center justify-center gap-2
                  rounded-md
                  bg-white
                  px-5 py-3
                  text-sm font-medium
                  text-primary
                  shadow-sm
                  transition-all duration-200
                  hover:bg-zinc-100
                  hover:shadow-lg
                  active:scale-[0.98]
                "
              >
                Generate your README
                <FaArrowRightLong
                  className="
                    transition-transform duration-200
                    group-hover:translate-x-1
                  "
                  size={14}
                />
              </a>

              <a
                href="#how-it-works"
                className="
                  inline-flex items-center justify-center
                  rounded-md
                  border border-white/15
                  px-5 py-3
                  text-sm font-medium
                  text-zinc-300
                  transition-all duration-200
                  hover:border-white/25
                  hover:bg-white/5
                  hover:text-white
                "
              >
                See how it works
              </a>
            </div>

            <p className="mt-5 text-xs text-zinc-500">
              No signup required · Free to try
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}