import { cn } from "@/lib/utils";

type BadgeVariant = "level" | "notification" | "default";

type BadgeProps = {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
  "aria-label"?: string;
};

const variantStyles: Record<BadgeVariant, string> = {
  level:
    "bg-brand-success text-xs font-bold text-white ring-2 ring-brand-dark",
  notification:
    "bg-brand-cta text-xs font-bold text-white min-w-5 px-1",
  default: "bg-brand-gold/20 text-brand-gold text-xs font-medium",
};

export function Badge({
  children,
  variant = "default",
  className,
  "aria-label": ariaLabel,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex min-h-5 min-w-5 items-center justify-center rounded-full",
        variantStyles[variant],
        className,
      )}
      aria-label={ariaLabel}
    >
      {children}
    </span>
  );
}
