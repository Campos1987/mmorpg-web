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
    <Component className={cn("glass-panel rounded-xl p-4 md:p-5", className)}>
      {title ? (
        <h3 className="mb-3 font-serif text-sm font-semibold uppercase tracking-wide text-dashboard-neon-blue md:text-base">
          {title}
        </h3>
      ) : null}
      {children}
    </Component>
  );
}
