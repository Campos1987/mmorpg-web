import { AuthLoginLink } from "@/components/layout/top-bar/AuthLoginLink";
import { TopBarMobileNav } from "@/components/layout/top-bar/TopBarMobileNav";
import { UserMenuDropdown } from "@/components/layout/top-bar/UserMenuDropdown";
import { getUserProfile } from "@/services/user-profile";

export async function TopBarActions() {
  const profile = await getUserProfile();

  return (
    <nav
      className="flex shrink-0 items-center gap-1.5 sm:gap-2 lg:gap-3 absolute right-0"
      aria-label="Ações de conta"
    >
      <TopBarMobileNav />
      {profile ? (
        <UserMenuDropdown
          firstName={
            profile.fullName?.trim()
              ? profile.fullName.trim().split(/\s+/)[0]
              : profile.login
          }
        />
      ) : (
        <AuthLoginLink />
      )}
    </nav>
  );
}
