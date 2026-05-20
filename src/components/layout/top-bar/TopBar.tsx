import { TopBarActions } from "@/components/layout/top-bar/TopBarActions";
import { TopBarLogo } from "@/components/layout/top-bar/TopBarLogo";
import { TopBarNav } from "@/components/layout/top-bar/TopBarNav";
import { cn } from "@/lib/utils";

export function TopBar() {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b border-border bg-brand-dark",
      )}
    >
      <div className="container-content flex h-16 items-center gap-4 lg:gap-8">
        <TopBarLogo />
        <TopBarNav />
        <TopBarActions />
      </div>
    </header>
  );
}
