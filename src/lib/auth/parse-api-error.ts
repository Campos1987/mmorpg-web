import type { LoginFieldErrors, LoginPayload } from "@/types/login";

function isLoginFieldKey(key: string): key is keyof LoginPayload {
  return key === "user" || key === "password";
}

/**
 * A API Spring retorna validação 400 com `message` no formato "campo: descrição"
 * (GlobalExceptionHandler — primeiro erro de @Valid).
 */
export function parseLoginFieldErrorsFromApiMessage(
  message: string | null | undefined,
): LoginFieldErrors {
  if (!message) {
    return {};
  }

  const match = message.match(/^(\w+):\s*(.+)$/);
  if (!match || !isLoginFieldKey(match[1])) {
    return {};
  }

  return { [match[1]]: match[2] };
}
