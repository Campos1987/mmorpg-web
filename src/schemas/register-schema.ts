import { z } from "zod";

const ALPHANUMERIC_REGEX = /^[a-zA-Z0-9]+$/;
const LETTERS_ONLY_REGEX = /^[a-zA-Z]+$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,12}$/;
const ISO_DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

const noWhitespace = (value: string) => !/\s/.test(value);

const isPastDate = (value: string) => {
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) {
    return false;
  }
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
};

const userField = z
  .string()
  .min(1, "O usuário é obrigatório.")
  .max(12, "Máximo 12 caracteres.")
  .min(5, "Mínimo 5 caracteres.")
  .refine(noWhitespace, "Não pode conter espaços.")
  .refine(
    (value) => ALPHANUMERIC_REGEX.test(value),
    "Use apenas letras e números.",
  );

const nameField = z
  .string()
  .min(1, "O nome é obrigatório.")
  .refine(noWhitespace, "O nome não pode conter espaços.")
  .refine(
    (value) => LETTERS_ONLY_REGEX.test(value),
    "Use apenas letras.",
  );

const lastnameField = z
  .string()
  .min(1, "O sobrenome é obrigatório.")
  .refine(noWhitespace, "O sobrenome não pode conter espaços.")
  .refine(
    (value) => LETTERS_ONLY_REGEX.test(value),
    "Use apenas letras.",
  );

const emailField = z
  .string()
  .min(1, "O e-mail é obrigatório.")
  .regex(EMAIL_REGEX, "Insira um e-mail válido.");

const passwordField = z
  .string()
  .min(1, "A senha é obrigatória.")
  .max(12, "Máximo 12 caracteres.")
  .min(8, "Mínimo 8 caracteres.")
  .regex(
    PASSWORD_REGEX,
    "Obrigatorio 1 letra maiúscula, 1 número e 1 símbolo.",
  );

/** Payload enviado à API — contrato do backend. */
export const registerPayloadSchema = z.object({
  user: userField,
  name: nameField,
  lastname: lastnameField,
  email: emailField,
  password: passwordField,
});

export type RegisterPayload = z.infer<typeof registerPayloadSchema>;

/** Valores do formulário (layout da UI — inclui confirmação de senha). */
export const registerFormSchema = z
  .object({
    name: nameField,
    lastname: lastnameField,
    email: emailField,
    user: userField,
    password: passwordField,
    confirmPassword: z.string().min(1, "Confirme sua senha."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem.",
    path: ["confirmPassword"],
  });

export type RegisterFormValues = z.infer<typeof registerFormSchema>;

export const REGISTER_FORM_FIELDS = [
  "name",
  "lastname",
  "email",
  "user",
  "password",
  "confirmPassword",
] as const satisfies readonly (keyof RegisterFormValues)[];

export function buildBirthdayIso(
  day: string,
  month: string,
  year: string,
): string {
  return `${year}-${month}-${day}`;
}

export function mapFormValuesToPayload(
  values: RegisterFormValues,
): RegisterPayload {
  return {
    user: values.user,
    name: values.name,
    lastname: values.lastname,
    email: values.email,
    password: values.password,
  };
}

export const REGISTER_PAYLOAD_FIELDS = [
  "user",
  "name",
  "lastname",
  "email",
  "password",
] as const satisfies readonly (keyof RegisterPayload)[];

export function mapZodErrorsToFieldErrors(
  error: z.ZodError<RegisterFormValues>,
): Partial<Record<keyof RegisterFormValues, string>> {
  const fieldErrors: Partial<Record<keyof RegisterFormValues, string>> = {};

  for (const issue of error.issues) {
    const field = issue.path[0];
    if (
      typeof field === "string" &&
      (REGISTER_FORM_FIELDS as readonly string[]).includes(field) &&
      !fieldErrors[field as keyof RegisterFormValues]
    ) {
      fieldErrors[field as keyof RegisterFormValues] = issue.message;
    }
  }

  return fieldErrors;
}

export function mapPayloadZodErrorsToFieldErrors(
  error: z.ZodError<RegisterPayload>,
): Partial<Record<keyof RegisterPayload, string>> {
  const fieldErrors: Partial<Record<keyof RegisterPayload, string>> = {};

  for (const issue of error.issues) {
    const field = issue.path[0];
    if (
      typeof field === "string" &&
      (REGISTER_PAYLOAD_FIELDS as readonly string[]).includes(field) &&
      !fieldErrors[field as keyof RegisterPayload]
    ) {
      fieldErrors[field as keyof RegisterPayload] = issue.message;
    }
  }

  return fieldErrors;
}

/** Alias usado pela Server Action. */
export const registerSchema = registerPayloadSchema;
