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
  .max(12, "O usuário deve ter entre 5 e 12 caracteres alfanuméricos.")
  .min(5, "O usuário deve ter entre 5 e 12 caracteres alfanuméricos.")
  .refine(noWhitespace, "O usuário não pode conter espaços.")
  .refine(
    (value) => ALPHANUMERIC_REGEX.test(value),
    "O usuário deve ter entre 5 e 12 caracteres alfanuméricos.",
  );

const nameField = z
  .string()
  .min(1, "O nome é obrigatório.")
  .max(20, "Nome inválido. Use apenas letras (5-20 caracteres).")
  .min(5, "Nome inválido. Use apenas letras (5-20 caracteres).")
  .refine(noWhitespace, "O nome não pode conter espaços.")
  .refine(
    (value) => LETTERS_ONLY_REGEX.test(value),
    "Nome inválido. Use apenas letras (5-20 caracteres).",
  );

const lastnameField = z
  .string()
  .min(1, "O sobrenome é obrigatório.")
  .max(20, "Sobrenome inválido. Use apenas letras (5-20 caracteres).")
  .min(5, "Sobrenome inválido. Use apenas letras (5-20 caracteres).")
  .refine(noWhitespace, "O sobrenome não pode conter espaços.")
  .refine(
    (value) => LETTERS_ONLY_REGEX.test(value),
    "Sobrenome inválido. Use apenas letras (5-20 caracteres).",
  );

const emailField = z
  .string()
  .min(1, "O e-mail é obrigatório.")
  .regex(EMAIL_REGEX, "Insira um e-mail válido.");

const passwordField = z
  .string()
  .min(1, "A senha é obrigatória.")
  .max(12, "A senha deve ter 8-12 caracteres, incluindo maiúscula, número e símbolo.")
  .min(8, "A senha deve ter 8-12 caracteres, incluindo maiúscula, número e símbolo.")
  .regex(
    PASSWORD_REGEX,
    "A senha deve ter 8-12 caracteres, incluindo maiúscula, número e símbolo.",
  );

/** Payload enviado à API — contrato do backend. */
export const registerPayloadSchema = z.object({
  user: userField,
  name: nameField,
  lastname: lastnameField,
  birthday: z
    .string()
    .regex(ISO_DATE_REGEX, "Selecione uma data de nascimento válida no passado.")
    .refine(
      isPastDate,
      "Selecione uma data de nascimento válida no passado.",
    ),
  email: emailField,
  password: passwordField,
  recaptchaToken: z.string().min(1, "O token de segurança é obrigatório."),
});

export type RegisterPayload = z.infer<typeof registerPayloadSchema>;

/** Valores do formulário (layout da UI — inclui confirmação de senha). */
export const registerFormSchema = z
  .object({
    name: nameField,
    lastname: lastnameField,
    email: emailField,
    birthDay: z.string().min(1, "Selecione o dia."),
    birthMonth: z.string().min(1, "Selecione o mês."),
    birthYear: z.string().min(1, "Selecione o ano."),
    user: userField,
    password: passwordField,
    confirmPassword: z.string().min(1, "Confirme sua senha."),
  })
  .superRefine((data, context) => {
    if (data.password !== data.confirmPassword) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["confirmPassword"],
        message: "As senhas não coincidem.",
      });
    }

    const birthday = buildBirthdayIso(data.birthDay, data.birthMonth, data.birthYear);
    const birthdayResult = registerPayloadSchema.shape.birthday.safeParse(birthday);

    if (!birthdayResult.success) {
      const message =
        birthdayResult.error.issues[0]?.message ??
        "Selecione uma data de nascimento válida no passado.";

      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["birthYear"],
        message,
      });
    }
  });

export type RegisterFormValues = z.infer<typeof registerFormSchema>;

export const REGISTER_FORM_FIELDS = [
  "name",
  "lastname",
  "email",
  "birthDay",
  "birthMonth",
  "birthYear",
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
    birthday: buildBirthdayIso(
      values.birthDay,
      values.birthMonth,
      values.birthYear,
    ),
    email: values.email,
    password: values.password,
    recaptchaToken: "dummy_token", // Valor estático temporário exigido pela API
  };
}

export const REGISTER_PAYLOAD_FIELDS = [
  "user",
  "name",
  "lastname",
  "birthday",
  "email",
  "password",
  "recaptchaToken",
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
