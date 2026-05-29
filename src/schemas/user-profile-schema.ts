import { z } from "zod";

// ──────────────────────────────────────────────────────────────────────────────
// Regex compartilhado (mesmo critério já aplicado no login-schema.ts)
// ──────────────────────────────────────────────────────────────────────────────
const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,12}$/;
const PASSWORD_MESSAGE =
  "A senha deve ter 8-12 caracteres, incluindo maiúscula, número e símbolo.";

// ──────────────────────────────────────────────────────────────────────────────
// Schema: atualização de data de nascimento (somente quando está em branco)
// ──────────────────────────────────────────────────────────────────────────────
export const birthDateSchema = z.object({
  birthDate: z
    .string()
    .min(1, "A data de nascimento é obrigatória.")
    .regex(
      /^\d{4}-\d{2}-\d{2}$/,
      "Formato inválido. Use AAAA-MM-DD.",
    )
    .refine((val) => {
      const date = new Date(val);
      const now = new Date();
      const minDate = new Date("1900-01-01");
      return !isNaN(date.getTime()) && date <= now && date >= minDate;
    }, "Data de nascimento inválida."),
});

export type BirthDateFormValues = z.infer<typeof birthDateSchema>;

// ──────────────────────────────────────────────────────────────────────────────
// Schema: alteração de senha
// ──────────────────────────────────────────────────────────────────────────────
export const changePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, "A senha atual é obrigatória."),
    newPassword: z
      .string()
      .min(1, "A nova senha é obrigatória.")
      .max(12, PASSWORD_MESSAGE)
      .min(8, PASSWORD_MESSAGE)
      .regex(PASSWORD_REGEX, PASSWORD_MESSAGE),
    confirmPassword: z
      .string()
      .min(1, "A confirmação de senha é obrigatória."),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "As senhas não coincidem.",
    path: ["confirmPassword"],
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: "A nova senha deve ser diferente da senha atual.",
    path: ["newPassword"],
  });

export type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;
