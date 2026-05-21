import { z } from "zod";

const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,12}$/;

/** Mensagem genérica para 401 — evita enumeração de usuários (specify §3.1). */
export const LOGIN_UNAUTHORIZED_MESSAGE = "Credenciais inválidas.";

const loginUserField = z
  .string()
  .min(1, "O usuário é obrigatório.")
  .max(100, "O usuário deve ter entre 5 e 100 caracteres.")
  .min(5, "O usuário deve ter entre 5 e 100 caracteres.");

const loginPasswordField = z
  .string()
  .min(1, "A senha é obrigatória.")
  .max(12, "A senha deve ter 8-12 caracteres, incluindo maiúscula, número e símbolo.")
  .min(8, "A senha deve ter 8-12 caracteres, incluindo maiúscula, número e símbolo.")
  .regex(
    PASSWORD_REGEX,
    "A senha deve ter 8-12 caracteres, incluindo maiúscula, número e símbolo.",
  );

/** Payload e valores do formulário — mesmo contrato da API de login. */
export const loginSchema = z.object({
  user: loginUserField,
  password: loginPasswordField,
});

export const loginPayloadSchema = loginSchema;

export type LoginFormValues = z.infer<typeof loginSchema>;
export type LoginPayload = z.infer<typeof loginPayloadSchema>;

export const LOGIN_FORM_FIELDS = [
  "user",
  "password",
] as const satisfies readonly (keyof LoginFormValues)[];

export function mapZodErrorsToFieldErrors(
  error: z.ZodError<LoginFormValues>,
): Partial<Record<keyof LoginFormValues, string>> {
  const fieldErrors: Partial<Record<keyof LoginFormValues, string>> = {};

  for (const issue of error.issues) {
    const field = issue.path[0];
    if (
      typeof field === "string" &&
      (LOGIN_FORM_FIELDS as readonly string[]).includes(field) &&
      !fieldErrors[field as keyof LoginFormValues]
    ) {
      fieldErrors[field as keyof LoginFormValues] = issue.message;
    }
  }

  return fieldErrors;
}
