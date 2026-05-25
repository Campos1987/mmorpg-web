export interface ApiTraceItem {
  className: string;
  fileName: string;
  lineNumber: number;
  methodName: string;
}

/**
 * Estrutura de erro padrão retornada pela Grankain Platform API.
 *
 * ATENÇÃO: Em produção, apenas o campo `error` é garantido como não-nulo.
 * Não dependa de `message`, `trace`, `timestamp` ou `path` em lógica de produção.
 */
export interface ApiError {
  /** Timestamp ISO 8601. Presente apenas em DEV. */
  timestamp: string | null;
  /** HTTP status code numérico. Presente apenas em DEV. */
  status: number | null;
  /** Nome do erro HTTP (ex: "CONFLICT", "UNAUTHORIZED"). Sempre presente. */
  error: string;
  /** Mensagem legível. Presente apenas em DEV. Nunca exiba diretamente em produção. */
  message: string | null;
  /** Stack trace filtrado para classes do projeto. Presente apenas em DEV. */
  trace: ApiTraceItem[] | null;
  /** URL que originou o erro. Presente apenas em DEV. */
  path: string | null;
}

/** Verifica se um objeto desconhecido é um ApiError (type guard) */
export function isApiError(value: unknown): value is ApiError {
  return (
    typeof value === "object" &&
    value !== null &&
    "error" in value &&
    typeof (value as ApiError).error === "string"
  );
}
