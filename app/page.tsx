import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";

export default function Home() {
  return (
    <main>
      <header className="h-18 border-b border-border bg-white">
        <div className="mx-auto flex h-full max-w-360 items-center justify-between px-6 lg:px-0">
          <a
            href="/"
            className="text-[21px] font-semibold tracking-[-0.02em] text-text-primary"
          >
            README <span className="font-normal">Forge</span>
          </a>

          <div className="flex items-center gap-8">
            <nav className="hidden items-center gap-8 md:flex text-sm font-medium text-text-primary transition-colors hover:text-text-primary">
              <a href="#product">Product</a>

              <a href="#how-it-works">How it works</a>

              <a href="#features">Features</a>

              <Link
                href="https://github.com/yamanvashist"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex gap-2 items-center"
              >
                GitHub <FaGithub size="20"/>
              </Link>
            </nav>

            <div className="hidden h-6 w-px bg-border md:block" />

            <Link
              href="/generate"
              className="group inline-flex items-center rounded-sm bg-primary px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-primary-hover hover:shadow-primary"
            >
              Generate README
              <span className="-translate-x-2 ml-1.5 opacity-0 group-hover:opacity-100 group-hover:translate-0 transition-all duration-300">
                <FaArrowRightLong />
              </span>
            </Link>
          </div>
        </div>
      </header>
    </main>
  );
}
