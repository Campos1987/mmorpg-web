import { MAIN_NAVIGATION } from "@/config/navigation";
import { NavDropdown } from "@/components/layout/top-bar/NavDropdown";
import { NavLink } from "@/components/layout/top-bar/NavLink";
import {
  isNavigationDropdownItem,
  isNavigationLinkItem,
} from "@/types/navigation";

export function TopBarNav() {
  return (
    <nav
      className="hidden flex-1 justify-center lg:flex"
      aria-label="Navegação principal"
    >
      <ul className="flex flex-wrap items-center justify-center gap-1">
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
