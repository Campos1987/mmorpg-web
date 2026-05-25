import { cn } from "@/lib/utils";

type FooterAgeRatingProps = {
  readonly rating?: "L" | "10" | "12" | "14" | "16" | "18";
  readonly className?: string;
};

const RATING_COLORS = {
  L: "bg-emerald-600",
  "10": "bg-blue-600",
  "12": "bg-amber-500",
  "14": "bg-orange-600",
  "16": "bg-red-600",
  "18": "bg-black border border-white/20",
};

export function FooterAgeRating({ rating = "14", className }: FooterAgeRatingProps) {
  const colorClass = RATING_COLORS[rating] || "bg-orange-500";

  return (
    <div
      className={cn(
        "flex h-24 w-24 shrink-0 items-center justify-center rounded-md font-sans text-5xl font-bold text-white select-none",
        colorClass,
        className,
      )}
      aria-label={`Classificação indicativa: ${rating} anos`}
      title={`Classificação indicativa: ${rating} anos`}
    >
      {rating}
    </div>
  );
}
