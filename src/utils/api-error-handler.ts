import type { ApiError } from "@/types/api";

const ERROR_MESSAGES: Record<string, string> = {
  CONFLICT: "Este usuário ou e-mail já está cadastrado.",
  UNAUTHORIZED: "Credenciais inválidas. Verifique seu usuário e senha.",
  BAD_REQUEST: "Os dados enviados são inválidos. Verifique o formulário.",
  INTERNAL_SERVER_ERROR: "Ocorreu um erro inesperado. Tente novamente mais tarde.",
};

export function getErrorMessage(apiError: ApiError): string {
  // Em DEV, usa a mensagem do backend diretamente (útil para debug)
  if (process.env.NODE_ENV === "development" && apiError.message) {
    return apiError.message;
  }
  // Em PROD, mapeia o campo 'error' para uma mensagem definida no frontend
  return ERROR_MESSAGES[apiError.error] ?? "Ocorreu um erro inesperado.";
}
