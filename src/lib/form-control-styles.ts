import { cn } from "@/lib/utils";

/** Estilos compartilhados — borda 1px, raio ~8px, tema escuro do design system. */
export const formControlClassName = cn(
  "focus-ring min-h-12 w-full rounded-lg border bg-brand-card px-4 text-sm text-foreground",
  "placeholder:text-muted",
);

export const formControlErrorClassName = "border-brand-cta";
export const formControlDefaultClassName = "border-border";
