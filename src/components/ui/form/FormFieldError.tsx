type FormFieldErrorProps = {
  id: string;
  message?: string;
};

export function FormFieldError({ id, message }: FormFieldErrorProps) {
  if (!message) {
    return null;
  }

  return (
    <p id={id} role="alert" className="mt-1.5 text-sm text-brand-cta">
      {message}
    </p>
  );
}
