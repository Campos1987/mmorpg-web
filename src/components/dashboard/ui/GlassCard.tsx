import { cn } from "@/lib/utils";

type GlassCardProps = {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "article";
  title?: string;
};

export function GlassCard({
  children,
  className,
  as: Component = "div",
  title,
}: GlassCardProps) {
  return (
    <Component
      className={cn(
        "rounded-xl border border-yellow-600/40 bg-black/40 p-4 backdrop-blur-md md:p-5",
        "transition-dashboard hover:border-yellow-500",
        className,
      )}
    >
      {title ? (
        <h3 className="mb-3 font-serif text-sm font-semibold uppercase tracking-wide text-brand-gold md:text-base">
          {title}
        </h3>
      ) : null}
      {children}
    </Component>
  );
}
