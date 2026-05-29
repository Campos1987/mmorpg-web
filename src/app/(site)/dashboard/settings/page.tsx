import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { getUserProfile } from "@/services/user-profile";
import { UserProfileForm } from "@/components/dashboard/settings/UserProfileForm";
import type { UserProfileData } from "@/types/user-profile";

export const metadata: Metadata = {
  title: "Configurações da Conta | Portal MMORPG",
  description:
    "Gerencie seus dados cadastrais, data de nascimento e altere sua senha de acesso ao portal.",
};

/**
 * Página de Configurações do Usuário — Server Component (RSC)
 *
 * Estratégia de renderização: SSR (Server-Side Rendering) com cache: "no-store"
 * para garantir que dados de perfil estejam sempre atualizados.
 *
 * O RSC busca o perfil via getUserProfile() (server-only), hidrata o Client
 * Component <UserProfileForm /> com os dados e garante 0 kb de JS extra para
 * a parte read-only da página — apenas o formulário é Client Component.
 */
export default async function SettingsPage() {
  // Busca o perfil autenticado (server-only, usa cookie HttpOnly)
  const profile = await getUserProfile();

  // Garante proteção da rota: usuário sem sessão é redirecionado para o login
  if (!profile) {
    redirect("/login");
  }

  // Mapeia UserProfileResponse → UserProfileData (tipagem do domínio da UI)
  const profileData: UserProfileData = {
    login: profile.login,
    fullName: profile.fullName,
    email: profile.email,
    birthDate: profile.birthDate ?? null,
    createdTime: profile.createdTime,
    status: profile.status,
  };

  return (
    <main
      aria-label="Configurações da conta"
    >
      {/* Cabeçalho da página */}
      <header className="mb-8">
        <h1 className="font-serif text-fluid-h2 font-bold text-foreground">
          Dados Cadastrais
        </h1>
        <p className="mt-1  text-sm text-gray-300">
          Gerencie as informações da sua conta no portal.
        </p>
      </header>

      {/* Formulário Client Component hidratado com os dados do servidor */}
      <UserProfileForm profile={profileData} />
    </main>
  );
}
