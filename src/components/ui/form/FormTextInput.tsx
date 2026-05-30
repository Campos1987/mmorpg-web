import { forwardRef } from "react";

import { getFormFieldAriaProps } from "@/components/ui/form/FormField";
import {
  formControlClassName,
  formControlDefaultClassName,
  formControlErrorClassName,
} from "@/lib/form-control-styles";
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
          formControlClassName,
          hasError ? formControlErrorClassName : formControlDefaultClassName,
          className,
        )}
        {...props}
        {...getFormFieldAriaProps(id ?? "", Boolean(hasError))}
      />
    );
  },
);

