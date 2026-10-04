import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";

export default function Header() {
  return (
    <header className="border-b border-border bg-white">
      <div className="mx-auto flex h-18 max-w-360 items-center justify-between px-6 lg:px-10">
        <Link
          href="/"
          className="
              text-[21px] font-semibold
              tracking-[-0.02em]
              text-text-primary
            "
        >
          README <span className="font-normal">Forge</span>
        </Link>

        <Link
          href="/"
          className="group 
          inline-flex items-center gap-1
              text-sm font-medium
              text-text-secondary
              transition-colors
              hover:text-text-primary
            "
        >
          <span className="opacity-0 w-0 translate-x-1.5 mr-1.5 group-hover:opacity-100 group-hover:translate-x-0 group-hover:w-4 transition-all duration-300 ">
            <FaArrowLeftLong />
          </span>{" "}
          Back to home
        </Link>
      </div>
    </header>
  );
}
