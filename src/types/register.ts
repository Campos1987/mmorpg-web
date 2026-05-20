import type {
  RegisterFormValues,
  RegisterPayload,
} from "@/schemas/register-schema";

export type { RegisterFormValues, RegisterPayload };

export type RegisterSuccessResponse = {
  message: string;
  userId: string;
};

export type ApiErrorResponse = {
  error: string;
  message?: string;
  details?: Partial<Record<keyof RegisterPayload, string>>;
};

export type RegisterFieldErrors = Partial<
  Record<keyof RegisterFormValues | keyof RegisterPayload, string>
>;

export type RegisterActionResult =
  | { status: "success"; userId: string; message: string }
  | { status: "validation"; fieldErrors: RegisterFieldErrors }
  | { status: "conflict"; message: string }
  | { status: "error"; message: string };
