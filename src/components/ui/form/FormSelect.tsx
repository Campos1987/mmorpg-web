import { forwardRef } from "react";

import { FormFieldError } from "@/components/ui/form/FormFieldError";
import { getFormFieldAriaProps } from "@/components/ui/form/FormField";
import {
  formControlClassName,
  formControlDefaultClassName,
  formControlErrorClassName,
} from "@/lib/form-control-styles";
import { cn } from "@/lib/utils";

type FormSelectOption = {
  value: string;
  label: string;
};

type FormSelectProps = React.ComponentPropsWithoutRef<"select"> & {
  hasError?: boolean;
  error?: string;
  options: readonly FormSelectOption[];
  placeholder?: string;
};

export const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(
  function FormSelect(
    {
      className,
      hasError,
      error,
      id,
      options,
      placeholder,
      defaultValue = "",
      ...props
    },
    ref,
  ) {
    const errorId = id ? `${id}-error` : undefined;

    return (
      <div className="relative">
        <select
          ref={ref}
          id={id}
          defaultValue={defaultValue}
          className={cn(
            formControlClassName,
            "appearance-none pr-10",
            hasError ? formControlErrorClassName : formControlDefaultClassName,
            className,
          )}
          {...props}
          {...getFormFieldAriaProps(id ?? "", Boolean(hasError))}
          {...(errorId && hasError ? { "aria-describedby": errorId } : {})}
        >
          {placeholder ? (
            <option value="" disabled>
              {placeholder}
            </option>
          ) : null}
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
        <FormFieldError id={errorId ?? ""} message={error} />
      </div>
    );
  },
);
