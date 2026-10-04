import {
  FiCode,
  FiZap,
  FiEdit3,
  FiLayers,
  FiCopy,
  FiGithub,
} from "react-icons/fi";

const features = [
  {
    icon: FiCode,
    title: "Code-aware generation",
    description:
      "README Forge reads your actual codebase, structure, dependencies, and scripts instead of generating generic documentation.",
  },
  {
    icon: FiZap,
    title: "Generate in seconds",
    description:
      "Skip the blank README and get a complete first draft without manually documenting every part of your project.",
  },
  {
    icon: FiEdit3,
    title: "Fully editable",
    description:
      "Your README is only a starting point. Edit the generated content and make it fit your project exactly.",
  },
  {
    icon: FiLayers,
    title: "Structured documentation",
    description:
      "Get clear sections for features, installation, usage, tech stack, and more — organized automatically.",
  },
  {
    icon: FiCopy,
    title: "Ready to copy",
    description:
      "Copy the generated Markdown with one click and drop it straight into your repository.",
  },
  {
    icon: FiGithub,
    title: "Built for GitHub",
    description:
      "Designed around real GitHub repositories so your README looks right where your project lives.",
  },
];

export default function Features() {
  return (
    <section id="features" className="border-t border-border bg-background py-28">
      <div className="mx-auto max-w-360 px-6 lg:px-10">
        {/* Header */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <span
              className="
                text-xs font-semibold uppercase
                tracking-[0.18em] text-text-muted
              "
            >
              Features
            </span>

            <h2
              className="
                mt-4 text-4xl font-semibold
                leading-[1.08] tracking-[-0.04em]
                text-text-primary
                md:text-5xl
              "
            >
              Documentation that
              <br />
              <span className="text-text-secondary">
                understands your code.
              </span>
            </h2>
          </div>

          <p
            className="
              max-w-md text-sm leading-6
              text-text-secondary
              md:pb-1 md:text-base
            "
          >
            Everything you need to turn an unfamiliar codebase into clear,
            useful documentation without starting from scratch.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="
                  group
                  bg-white
                  p-7
                  transition-all duration-300 ease-out
                  hover:bg-background
                  sm:p-8
                "
              >
                {/* Icon */}
                <div
                  className="
                    flex h-11 w-11 items-center justify-center
                    rounded-lg
                    border border-border
                    bg-background
                    text-text-primary
                    shadow-sm
                    transition-all duration-300
                    group-hover:border-primary-muted
                    group-hover:bg-primary
                    group-hover:text-white
                    group-hover:shadow-md
                  "
                >
                  <Icon size={20} strokeWidth={1.8} />
                </div>

                <div className="mt-7">
                  <h3
                    className="
                      text-lg font-semibold
                      tracking-[-0.02em]
                      text-text-primary
                    "
                  >
                    {feature.title}
                  </h3>

                  <p
                    className="
                      mt-3 max-w-sm
                      text-sm leading-6
                      text-text-secondary
                    "
                  >
                    {feature.description}
                  </p>
                </div>

                <div
                  className="
                    mt-8 h-px w-8
                    bg-border
                    transition-all duration-300
                    group-hover:w-14
                    group-hover:bg-primary
                  "
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}