import { forwardRef } from "react";

import { FormFieldError } from "@/components/ui/form/FormFieldError";
import { getFormFieldAriaProps } from "@/components/ui/form/FormField";
import {
  formControlClassName,
  formControlDefaultClassName,
  formControlErrorClassName,
} from "@/lib/form-control-styles";
import { cn } from "@/lib/utils";

type FormPlaceholderInputProps = React.ComponentPropsWithoutRef<"input"> & {
  hasError?: boolean;
  error?: string;
};

export const FormPlaceholderInput = forwardRef<
  HTMLInputElement,
  FormPlaceholderInputProps
>(function FormPlaceholderInput(
  { className, hasError, error, id, placeholder, ...props },
  ref,
) {
  const errorId = id ? `${id}-error` : undefined;

  return (
    <div>
      <input
        ref={ref}
        id={id}
        placeholder={placeholder}
        className={cn(
          formControlClassName,
          hasError ? formControlErrorClassName : formControlDefaultClassName,
          className,
        )}
        {...props}
        {...getFormFieldAriaProps(id ?? "", Boolean(hasError))}
        {...(errorId && hasError ? { "aria-describedby": errorId } : {})}
      />
      <FormFieldError id={errorId ?? ""} message={error} />
    </div>
  );
});
