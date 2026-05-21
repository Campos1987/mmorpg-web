import type { Metadata } from "next";
import Link from "next/link";

<<<<<<< HEAD
=======
import { LoginForm } from "@/components/auth/login/LoginForm";
>>>>>>> main
import { ROUTES } from "@/config/routes";

export const metadata: Metadata = {
  title: "Login — Portal MMORPG",
<<<<<<< HEAD
  description: "Acesse sua conta no portal do servidor Lineage II",
=======
  description: "Entre na sua conta do portal do servidor Lineage II",
>>>>>>> main
};

export default function LoginPage() {
  return (
<<<<<<< HEAD
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
=======
    <div className="container-content flex flex-1 flex-col items-center py-12">
      <div className="w-full max-w-lg">
        <header className="mb-8 text-center">
          <h1 className="font-serif text-fluid-h1 text-foreground">Entrar</h1>
          <p className="mt-2 text-sm text-muted">
            Informe suas credenciais para acessar o painel do servidor.
          </p>
        </header>

        <LoginForm />

        <p className="mt-6 text-center text-sm text-muted">
          <Link
            href={ROUTES.HOME}
            className="focus-ring text-brand-gold hover:text-brand-gold-hover"
          >
            Voltar para a página inicial
>>>>>>> main
          </Link>
        </p>
      </div>
    </div>
  );
}
