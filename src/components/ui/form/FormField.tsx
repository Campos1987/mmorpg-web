import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type FormFieldProps = {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
  className?: string;
  /**
   * Classes opcionais para o elemento <label>.
   * Use "sr-only" para ocultar visualmente mantendo acessibilidade (WCAG 2.4.6).
   */
  labelClassName?: string;
};

export function FormField({
  id,
  label,
  error,
  children,
  className,
  labelClassName,
}: FormFieldProps) {
  const errorId = `${id}-error`;

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label && label.trim() !== "" ? (
        <label
          htmlFor={id}
          className={cn("text-sm font-medium text-foreground", labelClassName)}
        >
          {label}
        </label>
      ) : null}
      {children}
      {error ? (
        <p
          id={errorId}
          role="alert"
          className="text-sm text-brand-cta"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}


export function getFormFieldAriaProps(
  id: string,
  hasError: boolean,
): {
  "aria-invalid": boolean;
  "aria-describedby"?: string;
} {
  return {
    "aria-invalid": hasError,
    ...(hasError ? { "aria-describedby": `${id}-error` } : {}),
  };
}
