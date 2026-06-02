import { type NextRequest, NextResponse } from "next/server";

import { AUTH_TOKEN_COOKIE } from "@/lib/auth/constants";
import { ROUTES } from "@/config/routes";

/**
 * Rotas que exigem autenticação.
 * Qualquer caminho que começa com /dashboard é protegido.
 */
const PROTECTED_PREFIXES = ["/site/dashboard"];

/**
 * Proxy de autenticação — executa na Edge antes de qualquer RSC/SSR.
 *
 * Responsabilidades:
 *  1. Rotas protegidas (/dashboard/*): redireciona para /login se sem sessão.
 *  2. Página de login: redireciona para /dashboard se já autenticado.
 *
 * Nota de segurança: validamos apenas a *presença* do cookie aqui (Edge Runtime
 * não pode verificar a assinatura JWT). A validação criptográfica real ocorre
 * em cada Server Action / service server-only que consome o token.
 */
export function proxy(request: NextRequest): NextResponse {
  const { pathname } = request.nextUrl;
  const hasAuthToken = Boolean(
    request.cookies.get(AUTH_TOKEN_COOKIE)?.value?.trim(),
  );

  // Proteção das rotas do dashboard
  const isProtected = PROTECTED_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix),
  );

  if (isProtected && !hasAuthToken) {
    const loginUrl = new URL(ROUTES.AUTH.LOGIN, request.url);
    loginUrl.searchParams.set("redirectTo", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Usuário autenticado não precisa ver a tela de login novamente
  if (pathname === ROUTES.AUTH.LOGIN && hasAuthToken) {
    return NextResponse.redirect(new URL(ROUTES.DASHBOARD.ROOT, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Aplica em todas as rotas EXCETO assets estáticos e internos do Next.js,
     * para não impactar performance de arquivos públicos.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
