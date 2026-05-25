import { AuthLoginLink } from "@/components/layout/top-bar/AuthLoginLink";
import { AuthRegisterLink } from "@/components/layout/top-bar/AuthRegisterLink";

export function TopBarActions() {
  return (
    <nav
      className="flex shrink-0 items-center gap-1.5 sm:gap-2 lg:gap-3"
      aria-label="Ações de conta"
    >
      <AuthLoginLink />
    </nav>
  );
}
