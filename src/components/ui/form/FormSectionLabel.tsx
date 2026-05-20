type FormSectionLabelProps = {
  label: string;
  helpLabel?: string;
};

export function FormSectionLabel({
  label,
  helpLabel = "Ajuda sobre data de nascimento",
}: FormSectionLabelProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-semibold text-foreground">{label}</span>
      <button
        type="button"
        className="focus-ring flex size-5 items-center justify-center rounded-full bg-muted text-xs font-semibold text-brand-dark"
        aria-label={helpLabel}
      >
        ?
      </button>
    </div>
  );
}
