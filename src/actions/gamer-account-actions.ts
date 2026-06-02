"use server";

import {
  createGamerAccountSchema,
  mapZodErrorsToCreateAccountFieldErrors,
} from "@/schemas/gamer-account-schema";
import { createGamerAccountRequest } from "@/services/gamer-account";
import type { CreateGamerAccountResult } from "@/services/gamer-account";

export async function createGamerAccountAction(
  rawPayload: unknown,
): Promise<CreateGamerAccountResult> {
  const parsed = createGamerAccountSchema.safeParse(rawPayload);

  if (!parsed.success) {
    return {
      status: "validation",
      fieldErrors: mapZodErrorsToCreateAccountFieldErrors(parsed.error),
    };
  }

  return createGamerAccountRequest(parsed.data);
}
