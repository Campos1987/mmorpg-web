import { z } from "zod";

/**
 * Schema Zod que valida a resposta de `POST /gamer/account`.
 *
 * A API retorna um array de strings contendo os logins das contas de jogo.
 */
export const gamerAccountApiSchema = z.array(z.string());

export type GamerAccountApiResponse = z.infer<typeof gamerAccountApiSchema>;
