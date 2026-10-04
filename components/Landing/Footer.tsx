import Link from "next/link";
import { FiGithub, FiArrowUpRight } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-white">
      <div className="mx-auto max-w-360 px-6 lg:px-10">
        <div
          className="
            flex flex-col gap-8
            py-10
            md:flex-row md:items-center md:justify-between
          "
        >
          <div>
            <a
              href="/"
              className="
                text-lg font-semibold
                tracking-[-0.02em]
                text-text-primary
              "
            >
              README <span className="font-normal">Forge</span>
            </a>

            <p className="mt-2 text-sm text-text-muted">
              Turn your codebase into documentation.
            </p>
          </div>

          <nav className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <a
              href="#how-it-works"
              className="
                text-sm text-text-secondary
                transition-colors duration-200
                hover:text-text-primary
              "
            >
              How it works
            </a>

            <a
              href="#features"
              className="
                text-sm text-text-secondary
                transition-colors duration-200
                hover:text-text-primary
              "
            >
              Features
            </a>

            <a
              href="/privacy"
              className="
                text-sm text-text-secondary
                transition-colors duration-200
                hover:text-text-primary
              "
            >
              Privacy
            </a>

            <a
              href="/terms"
              className="
                text-sm text-text-secondary
                transition-colors duration-200
                hover:text-text-primary
              "
            >
              Terms
            </a>

            <Link
              href="https://github.com/Yamanvashist"
              target="_blank"
              rel="noopener noreferrer"
              className="
                group
                inline-flex items-center gap-1.5
                text-sm text-text-secondary
                transition-colors duration-200
                hover:text-text-primary
              "
            >
              <FiGithub size={15} />
              GitHub
              <FiArrowUpRight
                size={13}
                className="
                  transition-transform duration-200
                  group-hover:translate-x-0.5
                  group-hover:-translate-y-0.5
                "
              />
            </Link>
          </nav>
        </div>

        <div
          className="
            flex flex-col gap-3
            border-t border-border
            py-5
            text-xs text-text-muted
            sm:flex-row sm:items-center sm:justify-between
          "
        >
          <p>
            © {new Date().getFullYear()} README Forge. All rights reserved.
          </p>

          <p>
            Built for developers who hate writing README files.
          </p>
        </div>
      </div>
    </footer>
  );
}