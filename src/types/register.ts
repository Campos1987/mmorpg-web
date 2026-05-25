import type {
  RegisterFormValues,
  RegisterPayload,
} from "@/schemas/register-schema";

export type { RegisterFormValues, RegisterPayload };

export type RegisterSuccessResponse = {
  username: string;
  email: string;
};

export type RegisterFieldErrors = Partial<
  Record<keyof RegisterFormValues | keyof RegisterPayload, string>
>;

export type RegisterActionResult =
  | { status: "success"; username: string; email: string }
  | { status: "validation"; fieldErrors: RegisterFieldErrors }
  | { status: "conflict"; message: string }
  | { status: "error"; message: string };
