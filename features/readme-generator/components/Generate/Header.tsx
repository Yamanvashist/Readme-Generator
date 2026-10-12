import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";

export default function Header() {
  return (
    <header className="border-b border-border bg-background">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-3 md:px-0">
        <Link
          href="/"
          className="text-[21px] font-semibold tracking-[-0.02em] text-text-primary"
        >
          README <span className="font-normal">Forge</span>
        </Link>

        <Link
          href="/"
          className="group inline-flex items-center gap-2 text-sm font-medium text-text-secondary transition-colors duration-200 hover:text-text-primary"
        >
          <span className=" w-0 -translate-x-2 items-center opacity-0 transition-all duration-200 group-hover:w-4 group-hover:translate-x-0 group-hover:opacity-100">
            <FaArrowLeftLong size={13} />
          </span>

          <span>Back to website</span>
        </Link>
      </div>
    </header>
  );
}
