import type { NavigationDropdownItem } from "@/types/navigation";
import { NavigationDrawerLink } from "@/components/layout/top-bar/NavigationDrawerLink";
import { cn } from "@/lib/utils";

type NavigationDrawerGroupProps = Pick<NavigationDropdownItem, "label"> & {
  items: NavigationDropdownItem["children"];
  onNavigationLinkSelect: () => void;
};

export function NavigationDrawerGroup({
  label,
  items,
  onNavigationLinkSelect,
}: NavigationDrawerGroupProps) {
  return (
    <li className="border-b border-border">
      <details className="group">
        <summary
          className={cn(
            "focus-ring flex min-h-12 cursor-pointer list-none items-center justify-between",
            "px-4 py-3 text-sm font-medium uppercase tracking-wide text-foreground",
            "transition-colors hover:text-brand-gold",
            "[&::-webkit-details-marker]:hidden",
          )}
        >
          {label}
          <span
            className="text-xs text-muted transition-transform duration-200 group-open:rotate-180"
            aria-hidden
          >
            ˅
          </span>
        </summary>
        <ul className="border-t border-border bg-brand-dark pb-2">
          {items.map((child) => (
            <NavigationDrawerLink
              key={child.href}
              {...child}
              isNested
              onNavigationLinkSelect={onNavigationLinkSelect}
            />
          ))}
        </ul>
      </details>
    </li>
  );
}
