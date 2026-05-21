import { type NextRequest, NextResponse } from "next/server";

import { AUTH_TOKEN_COOKIE } from "@/lib/auth/constants";
import { ROUTES } from "@/config/routes";

/** Usuário autenticado não precisa ver a tela de login novamente. */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname !== ROUTES.AUTH.LOGIN) {
    return NextResponse.next();
  }

  const hasAuthToken = Boolean(request.cookies.get(AUTH_TOKEN_COOKIE)?.value);

  if (hasAuthToken) {
    return NextResponse.redirect(new URL(ROUTES.HOME, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login"],
};
