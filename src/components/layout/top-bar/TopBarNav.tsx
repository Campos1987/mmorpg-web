import { MAIN_NAVIGATION } from "@/config/navigation";
import { NavDropdown } from "@/components/layout/top-bar/NavDropdown";
import { NavLink } from "@/components/layout/top-bar/NavLink";
import { cn } from "@/lib/utils";
import {
  isNavigationDropdownItem,
  isNavigationLinkItem,
} from "@/types/navigation";

export function TopBarNav() {
  return (
    <nav
      className={cn(
        "hidden min-w-0 xl:block",
      )}
      aria-label="Navegação principal"
    >
      <ul className="mx-auto flex w-max max-w-full flex-nowrap items-center justify-center gap-0.5 xl:gap-1 2xl:gap-1.5">
        {MAIN_NAVIGATION.map((item) => {
          if (isNavigationLinkItem(item)) {
            return (
              <NavLink
                key={item.href}
                label={item.label}
                href={item.href}
              />
            );
          }

          if (isNavigationDropdownItem(item)) {
            return (
              <NavDropdown
                key={item.label}
                label={item.label}
                items={item.children}
              />
            );
          }

          return null;
        })}
      </ul>
    </nav>
  );
}
