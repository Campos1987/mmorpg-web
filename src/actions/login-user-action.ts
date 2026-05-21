"use server";

import {
  loginPayloadSchema,
  mapZodErrorsToFieldErrors,
} from "@/schemas/login-schema";
import { loginUserRequest } from "@/services/login-user";
import type { LoginActionResult } from "@/types/login";

export async function loginUserAction(raw: unknown): Promise<LoginActionResult> {
  const parsed = loginPayloadSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      status: "validation",
      fieldErrors: mapZodErrorsToFieldErrors(parsed.error),
    };
  }

  return loginUserRequest(parsed.data);
}
