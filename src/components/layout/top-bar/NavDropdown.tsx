import type { NavigationDropdownItem } from "@/types/navigation";
import { NavDropdownLink } from "@/components/layout/top-bar/NavDropdownLink";
import { cn } from "@/lib/utils";

type NavDropdownProps = Pick<NavigationDropdownItem, "label"> & {
  items: NavigationDropdownItem["children"];
};

/**
 * Abertura do submenu: hover e focus-within (CSS puro, Server Component).
 * Mantém zero JS no cliente até a Fase 7; clique/teclado avançado virá com a store.
 */
export function NavDropdown({ label, items }: NavDropdownProps) {
  const panelId = `nav-dropdown-${label.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <li className="group relative">
      <button
        type="button"
        className={cn(
          "focus-ring inline-flex min-h-12 items-center gap-1 px-3 py-2",
          "text-sm font-medium uppercase tracking-wide text-foreground",
          "transition-colors hover:text-brand-gold",
          "group-hover:text-brand-gold group-focus-within:text-brand-gold",
        )}
        aria-haspopup="true"
        aria-controls={panelId}
        aria-expanded={false}
      >
        {label}
        <span
          className={cn(
            "text-xs text-muted transition-transform duration-200",
            "group-hover:rotate-180 group-focus-within:rotate-180",
          )}
          aria-hidden
        >
          ˅
        </span>
      </button>

      <ul
        id={panelId}
        className={cn(
          "absolute left-1/2 top-full z-50 mt-1 min-w-48 -translate-x-1/2",
          "rounded-md border border-border bg-brand-card py-1 shadow-lg",
          "pointer-events-none invisible translate-y-1 opacity-0",
          "transition-all duration-200 ease-out",
          "group-hover:pointer-events-auto group-hover:visible group-hover:translate-y-0 group-hover:opacity-100",
          "group-focus-within:pointer-events-auto group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100",
        )}
        role="menu"
        aria-label={`Submenu ${label}`}
      >
        {items.map((child) => (
          <NavDropdownLink key={child.href} {...child} />
        ))}
      </ul>
    </li>
  );
}
