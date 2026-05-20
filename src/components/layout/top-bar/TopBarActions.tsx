import { AuthLoginLink } from "@/components/layout/top-bar/AuthLoginLink";
import { AuthRegisterLink } from "@/components/layout/top-bar/AuthRegisterLink";

export function TopBarActions() {
  return (
    <div className="flex shrink-0 items-center gap-2 sm:gap-3" aria-label="Ações de conta">
      <AuthLoginLink />
      <AuthRegisterLink />
    </div>
  );
}
