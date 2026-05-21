"use client";

import { useCallback, useEffect, useId, useState } from "react";

import { DASHBOARD_ACTIVE_NAV_ID, DASHBOARD_NAV_ITEMS } from "@/config/dashboard-navigation";
import { useBodyScrollLock } from "@/hooks/use-body-scroll-lock";
import { cn } from "@/lib/utils";

import { DashboardNavLink } from "./DashboardNavLink";

export function DashboardMobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const dialogId = useId();

  useBodyScrollLock(isOpen);

  const closeMenu = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeMenu]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        className="focus-ring inline-flex min-h-12 min-w-12 flex-col items-center justify-center gap-1 rounded-lg transition-dashboard hover:bg-white/5"
        aria-expanded={isOpen}
        aria-controls={dialogId}
        aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
        onClick={() => setIsOpen((open) => !open)}
      >
        <span
          className={cn(
            "block h-0.5 w-5 bg-dashboard-neon-blue transition-dashboard",
            isOpen && "translate-y-1.5 rotate-45",
          )}
        />
        <span
          className={cn(
            "block h-0.5 w-5 bg-dashboard-neon-blue transition-dashboard",
            isOpen && "opacity-0",
          )}
        />
        <span
          className={cn(
            "block h-0.5 w-5 bg-dashboard-neon-blue transition-dashboard",
            isOpen && "-translate-y-1.5 -rotate-45",
          )}
        />
      </button>

      {isOpen ? (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 bg-black/60"
            aria-label="Fechar menu"
            onClick={closeMenu}
          />
          <nav
            id={dialogId}
            className="fixed inset-x-0 top-16 z-50 border-b border-dashboard-neon-blue/20 glass-panel p-4"
            aria-label="Menu mobile do painel"
          >
            <ul className="flex flex-col">
              {DASHBOARD_NAV_ITEMS.map((item) => (
                <DashboardNavLink
                  key={item.id}
                  {...item}
                  isActive={item.id === DASHBOARD_ACTIVE_NAV_ID}
                />
              ))}
            </ul>
          </nav>
        </>
      ) : null}
    </div>
  );
}
