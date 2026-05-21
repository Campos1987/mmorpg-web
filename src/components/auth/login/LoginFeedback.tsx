type LoginFeedbackProps = {
  message: string;
};

export function LoginFeedback({ message }: LoginFeedbackProps) {
  return (
    <p
      role="alert"
      className="rounded-lg border border-brand-cta/40 bg-brand-cta/10 px-4 py-3 text-sm text-foreground"
    >
      {message}
    </p>
  );
}
