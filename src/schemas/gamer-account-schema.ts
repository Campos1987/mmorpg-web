import { z } from "zod";

export const characterStatusSchema = z.object({
  charName: z.string(),
  lvl: z.number(),
  maxHp: z.number(),
  maxMp: z.number(),
  maxCp: z.number(),
  race: z.number(),
  baseClassId: z.number(),
  classId: z.number(),
  exp: z.number(),
  karma: z.number(),
});

/**
 * Schema Zod que valida a resposta de `POST /gamer/account`.
 *
 * A API retorna um objeto mapeando o login de cada conta de jogo (chave) para uma lista de CharacterStatus (valor).
 */
export const gamerAccountApiSchema = z.record(z.string(), z.array(characterStatusSchema));

export type GamerAccountApiResponse = z.infer<typeof gamerAccountApiSchema>;
export type CharacterStatusApi = z.infer<typeof characterStatusSchema>;

const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,12}$/;
const PASSWORD_MESSAGE =
  "A senha deve ter 8-12 caracteres, incluindo maiúscula, número e símbolo.";

export const createGamerAccountSchema = z
  .object({
    account: z
      .string()
      .min(5, "A conta deve ter no mínimo 5 caracteres.")
      .max(12, "A conta deve ter no máximo 12 caracteres.")
      .regex(/^[a-zA-Z0-9]+$/, "Apenas letras e números, sem espaços."),
    password: z
      .string()
      .min(8, PASSWORD_MESSAGE)
      .max(12, PASSWORD_MESSAGE)
      .regex(PASSWORD_REGEX, PASSWORD_MESSAGE),
    confirmPassword: z.string().min(1, "Confirme sua senha."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem.",
    path: ["confirmPassword"],
  });

export type CreateGamerAccountInput = z.infer<typeof createGamerAccountSchema>;

export const CREATE_GAMER_ACCOUNT_FIELDS = [
  "account",
  "password",
  "confirmPassword",
] as const satisfies readonly (keyof CreateGamerAccountInput)[];

export function mapZodErrorsToCreateAccountFieldErrors(
  error: z.ZodError<CreateGamerAccountInput>,
): Partial<Record<keyof CreateGamerAccountInput, string>> {
  const fieldErrors: Partial<Record<keyof CreateGamerAccountInput, string>> = {};

  for (const issue of error.issues) {
    const field = issue.path[0];
    if (
      typeof field === "string" &&
      (CREATE_GAMER_ACCOUNT_FIELDS as readonly string[]).includes(field) &&
      !fieldErrors[field as keyof CreateGamerAccountInput]
    ) {
      fieldErrors[field as keyof CreateGamerAccountInput] = issue.message;
    }
  }

  return fieldErrors;
}

