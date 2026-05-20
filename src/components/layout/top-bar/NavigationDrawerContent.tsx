import { MAIN_NAVIGATION } from "@/config/navigation";
import { NavigationDrawerGroup } from "@/components/layout/top-bar/NavigationDrawerGroup";
import { NavigationDrawerLink } from "@/components/layout/top-bar/NavigationDrawerLink";
import {
  isNavigationDropdownItem,
  isNavigationLinkItem,
} from "@/types/navigation";

type NavigationDrawerContentProps = {
  onNavigationLinkSelect: () => void;
};

export function NavigationDrawerContent({
  onNavigationLinkSelect,
}: NavigationDrawerContentProps) {
  return (
    <nav aria-label="Navegação principal mobile">
      <ul>
        {MAIN_NAVIGATION.map((item) => {
          if (isNavigationLinkItem(item)) {
            return (
              <NavigationDrawerLink
                key={item.href}
                label={item.label}
                href={item.href}
                onNavigationLinkSelect={onNavigationLinkSelect}
              />
            );
          }

          if (isNavigationDropdownItem(item)) {
            return (
              <NavigationDrawerGroup
                key={item.label}
                label={item.label}
                items={item.children}
                onNavigationLinkSelect={onNavigationLinkSelect}
              />
            );
          }

          return null;
        })}
      </ul>
    </nav>
  );
}
