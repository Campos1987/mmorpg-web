import type { Metadata } from "next";
import Link from "next/link";

import { ROUTES } from "@/config/routes";

export const metadata: Metadata = {
  title: "Login — Portal MMORPG",
  description: "Acesse sua conta no portal do servidor Lineage II",
};

export default function LoginPage() {
  return (
    <div className="container-content flex flex-1 flex-col items-center justify-center py-12">
      <div className="w-full max-w-md text-center">
        <h1 className="font-serif text-fluid-h1 text-foreground">Login</h1>
        <p className="mt-4 text-muted">
          Página de autenticação em construção.
        </p>
        <p className="mt-6 text-sm text-muted">
          <Link
            href={ROUTES.AUTH.REGISTER}
            className="focus-ring text-brand-logo hover:text-brand-logo-hover"
          >
            Criar nova conta
          </Link>
        </p>
      </div>
    </div>
  );
}
