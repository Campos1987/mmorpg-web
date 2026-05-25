import { TopBarActions } from "@/components/layout/top-bar/TopBarActions";
import { TopBarLogo } from "@/components/layout/top-bar/TopBarLogo";
import { TopBarMobileNav } from "@/components/layout/top-bar/TopBarMobileNav";
import { TopBarNav } from "@/components/layout/top-bar/TopBarNav";
import { cn } from "@/lib/utils";

export function TopBar() {
  return (
    <header
      className={`header-container cn(
        "fixed sticky top-0 z-50 w-full",
      )`}
    >
      <div
        className={cn(
          "container-content grid h-16 w-full items-center gap-x-2 sm:gap-x-3",
          "max-xl:grid-cols-[minmax(0,1fr)_auto]",
          "xl:grid-cols-[auto_minmax(0,1fr)_auto] xl:gap-x-4",
        )}
      >
        <TopBarLogo />
        <TopBarNav />
        <div className="flex shrink-0 items-center justify-end gap-1.5 sm:gap-2 xl:gap-3">
          <TopBarMobileNav />
          <TopBarActions />
        </div>
      </div>
    </header>
  );
}
