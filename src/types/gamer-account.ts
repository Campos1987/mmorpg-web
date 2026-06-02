/**
 * DTO retornado por `GET /gamer/account`.
 * Tipagem mínima alinhada à documentação atual (v0.0.1-SNAPSHOT).
 * Expanda à medida que o contrato da API for detalhado.
 *
 * @see ../../../mmorpg-platform-api/documentation/api-integration-guide-frontend.md
 */
export interface GamerAccount {
  /** Nome de usuário do jogador no jogo */
  username?: string;
  /** Nível do personagem principal */
  level?: number;
  /** Classe do personagem (ex: Warrior, Mage, Rogue) */
  className?: string;
  /** Campos adicionais retornados pela API */
  [key: string]: unknown;
}
