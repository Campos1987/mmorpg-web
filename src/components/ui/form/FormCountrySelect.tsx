import { forwardRef } from "react";

import { FormFieldError } from "@/components/ui/form/FormFieldError";
import { getFormFieldAriaProps } from "@/components/ui/form/FormField";
import {
  formControlClassName,
  formControlDefaultClassName,
  formControlErrorClassName,
} from "@/lib/form-control-styles";
import { cn } from "@/lib/utils";

type FormCountryOption = {
  value: string;
  label: string;
};

type FormCountrySelectProps = React.ComponentPropsWithoutRef<"select"> & {
  hasError?: boolean;
  error?: string;
  options: readonly FormCountryOption[];
  floatingLabel?: string;
};

export const FormCountrySelect = forwardRef<
  HTMLSelectElement,
  FormCountrySelectProps
>(function FormCountrySelect(
  {
    className,
    hasError,
    error,
    id,
    options,
    floatingLabel = "País/região",
    ...props
  },
  ref,
) {
  const errorId = id ? `${id}-error` : undefined;

  return (
    <div>
      <div className="relative">
        <span className="pointer-events-none absolute left-4 top-2 z-10 text-xs text-muted">
          {floatingLabel}
        </span>
        <select
          ref={ref}
          id={id}
          className={cn(
            formControlClassName,
            "appearance-none pb-2 pt-7 pr-10",
            hasError ? formControlErrorClassName : formControlDefaultClassName,
            className,
          )}
          {...props}
          {...getFormFieldAriaProps(id ?? "", Boolean(hasError))}
          {...(errorId && hasError ? { "aria-describedby": errorId } : {})}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <span
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted"
          aria-hidden
        >
          ˅
        </span>
      </div>
      <FormFieldError id={errorId ?? ""} message={error} />
    </div>
  );
});
