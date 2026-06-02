import { z } from "zod";

/**
 * Schema Zod que valida a resposta de `POST /gamer/account`.
 *
 * A API retorna um objeto mapeando o login de cada conta de jogo (chave) para uma lista de nomes de personagens (valor).
 */
export const gamerAccountApiSchema = z.record(z.string(), z.array(z.string()));

export type GamerAccountApiResponse = z.infer<typeof gamerAccountApiSchema>;
