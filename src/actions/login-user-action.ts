"use server";

import {
  loginPayloadSchema,
  mapZodErrorsToFieldErrors,
} from "@/schemas/login-schema";
import { setSessionToken, setSessionUserName } from "@/lib/auth/session";
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

  const result = await loginUserRequest(parsed.data);

  if (result.status === "success") {
    await setSessionToken(result.token);
    if (result.fullName) {
      await setSessionUserName(result.fullName);
    }
    return { status: "success" };
  }

  // Repassa account_blocked, unauthorized e error diretamente ao client
  return result;
}
