"use server";

import {
  mapPayloadZodErrorsToFieldErrors,
  registerPayloadSchema,
} from "@/schemas/register-schema";
import { registerUserRequest } from "@/services/register-user";
import type { RegisterActionResult } from "@/types/register";

export async function registerUserAction(
  raw: unknown,
): Promise<RegisterActionResult> {
  const parsed = registerPayloadSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      status: "validation",
      fieldErrors: mapPayloadZodErrorsToFieldErrors(parsed.error),
    };
  }

  return registerUserRequest(parsed.data);
}
