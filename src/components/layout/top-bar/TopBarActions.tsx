import { AuthLoginLink } from "@/components/layout/top-bar/AuthLoginLink";
import { TopBarMobileNav } from "@/components/layout/top-bar/TopBarMobileNav";
import { UserMenuDropdown } from "@/components/layout/top-bar/UserMenuDropdown";
import { getSessionUserName } from "@/lib/auth/session";
import { getUserProfile } from "@/services/user-profile";

export async function TopBarActions() {
  // Tenta obter o nome do cookie para evitar requisições desnecessárias ao backend
  let name = await getSessionUserName();
  let hasSessionUser = !!name;

  if (!name) {
    const profile = await getUserProfile();
    if (profile) {
      name = profile.fullName || profile.login;
      hasSessionUser = true;
    }
  }

  return (
    <nav
      className="flex shrink-0 items-center gap-1.5 sm:gap-2 lg:gap-3 absolute right-0"
      aria-label="Ações de conta"
    >
      <TopBarMobileNav />
      {hasSessionUser ? (
        <UserMenuDropdown
          firstName={
            name?.trim()
              ? name.trim().split(/\s+/)[0]
              : "Usuário"
          }
        />
      ) : (
        <AuthLoginLink />
      )}
    </nav>
  );
}
