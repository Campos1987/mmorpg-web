import type { LoginFieldErrors, LoginPayload } from "@/types/login";
import type { RegisterFieldErrors, RegisterPayload } from "@/types/register";

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

function isRegisterFieldKey(key: string): key is keyof RegisterPayload {
  return (
    key === "user" ||
    key === "name" ||
    key === "lastname" ||
    key === "birthday" ||
    key === "email" ||
    key === "password" ||
    key === "recaptchaToken"
  );
}

/**
 * A API Spring retorna validação 400 de registro com `message` no formato "campo: descrição"
 * via GlobalExceptionHandler.
 */
export function parseRegisterFieldErrorsFromApiMessage(
  message: string | null | undefined,
): RegisterFieldErrors {
  if (!message) {
    return {};
  }

  const match = message.match(/^(\w+):\s*(.+)$/);
  if (!match || !isRegisterFieldKey(match[1])) {
    return {};
  }

  return { [match[1]]: match[2] };
}

