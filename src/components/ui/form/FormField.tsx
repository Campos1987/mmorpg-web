import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type FormFieldProps = {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
  className?: string;
};

export function FormField({
  id,
  label,
  error,
  children,
  className,
}: FormFieldProps) {
  const errorId = `${id}-error`;

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
      </label>
      {children}
      {error ? (
<<<<<<< HEAD
        <p
          id={errorId}
          role="alert"
          className="text-sm text-brand-cta"
        >
=======
        <p id={errorId} role="alert" className="text-sm text-brand-cta">
>>>>>>> main
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
