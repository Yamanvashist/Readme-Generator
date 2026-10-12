export default function GenerateIntro() {
  return (
    <div className="space-y-4">
      <span className="inline-flex items-center gap-2 rounded-full border border-success/20 bg-success/10 px-3 py-1 text-xs font-medium text-success">
        <span className="size-1.5 rounded-full bg-success" />
        Generate README
      </span>

      <div className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl">
          Tell us about your repository
        </h1>
        <p className="max-w-xl text-sm leading-relaxed text-text-secondary sm:text-base">
          Add your GitHub repository or upload your project. We&apos;ll analyze your
          codebase and generate a clean, professional{" "}
          <span className="font-semibold text-success">README</span>.
        </p>
      </div>
    </div>
  );
}
