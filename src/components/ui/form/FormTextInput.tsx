import { forwardRef } from "react";

import { getFormFieldAriaProps } from "@/components/ui/form/FormField";
import { cn } from "@/lib/utils";

type FormTextInputProps = React.ComponentPropsWithoutRef<"input"> & {
  hasError?: boolean;
};

export const FormTextInput = forwardRef<HTMLInputElement, FormTextInputProps>(
  function FormTextInput(
    { className, hasError, id, type = "text", ...props },
    ref,
  ) {
    return (
      <input
        ref={ref}
        id={id}
        type={type}
        className={cn(
          "focus-ring min-h-12 w-full rounded-md border bg-brand-card px-4 py-2 text-sm text-foreground",
          "placeholder:text-muted",
          hasError ? "border-brand-cta" : "border-border",
          className,
        )}
        {...props}
        {...getFormFieldAriaProps(id ?? "", Boolean(hasError))}
      />
    );
  },
);
