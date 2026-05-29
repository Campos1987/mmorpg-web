import { TopBarActions } from "@/components/layout/top-bar/TopBarActions";
import { TopBarLogo } from "@/components/layout/top-bar/TopBarLogo";
import { TopBarNav } from "@/components/layout/top-bar/TopBarNav";
import { cn } from "@/lib/utils";

export function TopBar() {
  return (
    <header
      className={`header-container cn(
        "fixed sticky top-0 z-50 w-full",
      )`}
    >
      <div className="w-full max-w-[2560px] mx-auto px-4 relative">
        <div
          className={cn(
            "grid h-16 w-full items-center gap-x-2 sm:gap-x-3",
            "max-xl:grid-cols-[minmax(0,1fr)_auto]",
            "xl:grid-cols-[auto_minmax(0,1fr)_auto] xl:gap-x-4",
          )}
        >
          <TopBarLogo />
          <TopBarNav />
          <TopBarActions />
        </div>
      </div>
    </header>
  );
}
