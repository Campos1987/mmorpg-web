// ──────────────────────────────────────────────────────────────────────────────
// Tipos de domínio para a página de Perfil / Dados Cadastrais
// Espelha o contrato do endpoint GET /account/profile da API
// ──────────────────────────────────────────────────────────────────────────────

/** Dados do perfil do usuário recebidos do servidor (Server Component → Client). */
export interface UserProfileData {
  /** Username (login) — imutável */
  login: string;
  /** Nome completo — imutável */
  fullName: string;
  /** E-mail — imutável */
  email: string;
  /**
   * Data de nascimento no formato ISO 8601 (AAAA-MM-DD).
   * Quando `undefined`, `null` ou string vazia, o campo torna-se editável.
   */
  birthDate?: string | null;
  /** Timestamp ISO 8601 da criação da conta */
  createdTime?: string;
  /** Status da conta */
  status?: string;
}

/** Resultado genérico para Server Actions da página de settings */
export type ProfileActionResult =
  | { success: true; message: string }
  | { success: false; message: string; fieldErrors?: Partial<Record<string, string>> };
