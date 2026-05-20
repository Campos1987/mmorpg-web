import { cn } from "@/lib/utils";

type RegisterFeedbackVariant = "success" | "error" | "conflict";

type RegisterFeedbackProps = {
  variant: RegisterFeedbackVariant;
  message: string;
};

const variantStyles: Record<RegisterFeedbackVariant, string> = {
  success: "border-brand-success/40 bg-brand-success/10 text-brand-success",
  error: "border-brand-cta/40 bg-brand-cta/10 text-foreground",
  conflict: "border-brand-gold/40 bg-brand-gold/10 text-foreground",
};

export function RegisterFeedback({ variant, message }: RegisterFeedbackProps) {
  return (
    <div
      role={variant === "success" ? "status" : "alert"}
      aria-live="polite"
      className={cn(
        "rounded-md border px-4 py-3 text-sm",
        variantStyles[variant],
      )}
    >
      {message}
    </div>
  );
}
