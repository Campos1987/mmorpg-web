export interface ApiTraceItem {
  className: string;
  fileName: string;
  lineNumber: number;
  methodName: string;
}

/**
 * Estrutura de erro padrão retornada pela Grankain Platform API.
 *
 * ATENCAO: Em producao, apenas o campo `error` e garantido como nao-nulo.
 * Nao dependa de `message`, `trace`, `timestamp` ou `path` em logica de producao.
 */
export interface ApiError {
  /** Timestamp ISO 8601. Presente apenas em DEV. */
  timestamp: string | null;
  /** HTTP status code numerico. Presente apenas em DEV. */
  status: number | null;
  /** Nome do erro HTTP (ex: "CONFLICT", "UNAUTHORIZED"). Sempre presente. */
  error: string;
  /** Mensagem legivel. Presente apenas em DEV. Nunca exiba diretamente em producao. */
  message: string | null;
  /** Stack trace filtrado para classes do projeto. Presente apenas em DEV. */
  trace: ApiTraceItem[] | null;
  /** URL que originou o erro. Presente apenas em DEV. */
  path: string | null;
}

/** Verifica se um objeto desconhecido e um ApiError (type guard) */
export function isApiError(value: unknown): value is ApiError {
  return (
    typeof value === "object" &&
    value !== null &&
    "error" in value &&
    typeof (value as ApiError).error === "string"
  );
}
