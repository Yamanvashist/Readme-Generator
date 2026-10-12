import { RiArrowRightLine, RiMagicLine } from "react-icons/ri";

type GenerateButtonProps = {
  onClick?: () => void;
};

export default function GenerateButton({ onClick }: GenerateButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-success px-6 text-sm font-semibold text-white shadow-lg shadow-success/25 transition-all duration-200 hover:shadow-xl hover:shadow-success/30 hover:brightness-110 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-success/30 active:scale-[0.99]"
    >
      <RiMagicLine size={18} />
      Generate README
      <RiArrowRightLine
        size={18}
        className="transition-transform duration-200 group-hover:translate-x-0.5"
      />
    </button>
  );
}
