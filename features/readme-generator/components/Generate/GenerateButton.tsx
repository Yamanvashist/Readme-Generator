import { RiArrowRightLine, RiLoader4Line, RiMagicLine } from "react-icons/ri";

type GenerateButtonProps = {
  onClick?: () => void;
  isGenerating: boolean;
};

export default function GenerateButton({
  onClick,
  isGenerating,
}: GenerateButtonProps) {
  return (
    <button
      type="button"
      disabled={isGenerating}
      onClick={onClick}
      className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-success px-6 text-sm font-semibold text-white shadow-lg shadow-success/25 transition-all duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-success/30 enabled:hover:shadow-xl enabled:hover:shadow-success/30 enabled:hover:brightness-110 enabled:active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-success/60 disabled:shadow-none"
    >
      {isGenerating ? (
        <>
          <RiLoader4Line size={18} className="animate-spin" />
          <span>Generating README...</span>
        </>
      ) : (
        <>
          <RiMagicLine size={18} />
          <span>Generate README</span>
          <RiArrowRightLine
            size={18}
            className="transition-transform duration-200 group-hover:translate-x-0.5"
          />
        </>
      )}
    </button>
  );
}
