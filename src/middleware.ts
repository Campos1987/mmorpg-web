import { type NextRequest, NextResponse } from "next/server";

import { AUTH_TOKEN_COOKIE } from "@/lib/auth/constants";
import { ROUTES } from "@/config/routes";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasAuthToken = Boolean(request.cookies.get(AUTH_TOKEN_COOKIE)?.value);

  // Se rota de login/registro e já autenticado, redireciona para o dashboard
  if (pathname === ROUTES.AUTH.LOGIN || pathname === ROUTES.AUTH.REGISTER) {
    if (hasAuthToken) {
      return NextResponse.redirect(new URL(ROUTES.DASHBOARD.ROOT, request.url));
    }
    return NextResponse.next();
  }

  // Se rota protegida do dashboard e não autenticado, redireciona para login
  const isProtectedRoute = pathname.startsWith(ROUTES.DASHBOARD.ROOT);
  if (isProtectedRoute && !hasAuthToken) {
    return NextResponse.redirect(new URL(ROUTES.AUTH.LOGIN, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/registro", "/dashboard", "/dashboard/:path*"],
};
