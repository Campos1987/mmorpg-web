"use client";

import type { NavigationDropdownItem } from "@/types/navigation";
import { NavDropdownLink } from "@/components/layout/top-bar/NavDropdownLink";
import { createNavigationDropdownId } from "@/lib/create-navigation-dropdown-id";
import { cn } from "@/lib/utils";
import { useNavigationUiStore } from "@/store/navigation-ui-store";

type NavDropdownProps = Pick<NavigationDropdownItem, "label"> & {
  items: NavigationDropdownItem["children"];
};

/**
 * Abertura do submenu: hover e focus-within (CSS) + `activeDropdownId` na store
 * para sincronizar `aria-expanded` e rotação do chevron (Fase 7).
 */
export function NavDropdown({ label, items }: NavDropdownProps) {
  const dropdownId = createNavigationDropdownId(label);
  const panelId = dropdownId;

  const isDropdownExpanded = useNavigationUiStore(
    (state) => state.activeDropdownId === dropdownId,
  );
  const setActiveDropdownId = useNavigationUiStore(
    (state) => state.setActiveDropdownId,
  );

  const handleActivateDropdown = () => setActiveDropdownId(dropdownId);
  const handleDeactivateDropdown = () => setActiveDropdownId(null);

  const handleDropdownTriggerKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setActiveDropdownId(isDropdownExpanded ? null : dropdownId);
      return;
    }

    if (event.key === "Escape") {
      event.preventDefault();
      handleDeactivateDropdown();
    }
  };

  return (
    <li
      className="group relative"
      onMouseEnter={handleActivateDropdown}
      onMouseLeave={handleDeactivateDropdown}
      onFocus={handleActivateDropdown}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          handleDeactivateDropdown();
        }
      }}
    >
      <button
        type="button"
        className={cn(
          "focus-ring inline-flex min-h-12 min-w-12 items-center gap-1 px-3 py-2",
          "text-sm font-medium uppercase tracking-wide text-foreground",
          "transition-colors hover:text-brand-gold",
          isDropdownExpanded && "text-brand-gold",
        )}
        aria-haspopup="menu"
        aria-controls={panelId}
        aria-expanded={isDropdownExpanded}
        onKeyDown={handleDropdownTriggerKeyDown}
      >
        {label}
        <span
          className={cn(
            "text-xs text-muted transition-transform duration-200",
            isDropdownExpanded && "rotate-180 text-brand-gold",
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
          isDropdownExpanded &&
            "pointer-events-auto visible translate-y-0 opacity-100",
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
