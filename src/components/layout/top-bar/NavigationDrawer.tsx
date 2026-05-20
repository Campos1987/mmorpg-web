"use client";

import { useCallback, useEffect, useRef } from "react";

import {
  NAVIGATION_DRAWER_PANEL_ID,
  NAVIGATION_DRAWER_TITLE_ID,
} from "@/components/layout/top-bar/constants";
import { NavigationDrawerContent } from "@/components/layout/top-bar/NavigationDrawerContent";
import { useBodyScrollLock } from "@/hooks/use-body-scroll-lock";
import { useFocusTrap } from "@/hooks/use-focus-trap";
import { cn } from "@/lib/utils";

type NavigationDrawerProps = {
  isNavigationDrawerOpen: boolean;
  onCloseNavigationDrawer: () => void;
  onNavigationLinkSelect: () => void;
};

export function NavigationDrawer({
  isNavigationDrawerOpen,
  onCloseNavigationDrawer,
  onNavigationLinkSelect,
}: NavigationDrawerProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useBodyScrollLock(isNavigationDrawerOpen);
  useFocusTrap(panelRef, isNavigationDrawerOpen);

  const handleCloseNavigationDrawerOnEscape = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onCloseNavigationDrawer();
      }
    },
    [onCloseNavigationDrawer],
  );

  useEffect(() => {
    if (!isNavigationDrawerOpen) {
      return;
    }

    document.addEventListener("keydown", handleCloseNavigationDrawerOnEscape);

    return () => {
      document.removeEventListener(
        "keydown",
        handleCloseNavigationDrawerOnEscape,
      );
    };
  }, [isNavigationDrawerOpen, handleCloseNavigationDrawerOnEscape]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 lg:hidden",
        isNavigationDrawerOpen
          ? "visible"
          : "invisible pointer-events-none",
      )}
      aria-hidden={!isNavigationDrawerOpen}
    >
      <button
        type="button"
        className={cn(
          "focus-ring absolute inset-0 bg-brand-dark/80 transition-opacity duration-300",
          isNavigationDrawerOpen ? "opacity-100" : "opacity-0",
        )}
        aria-label="Fechar menu de navegação"
        tabIndex={isNavigationDrawerOpen ? 0 : -1}
        onClick={onCloseNavigationDrawer}
      />

      <div
        ref={panelRef}
        id={NAVIGATION_DRAWER_PANEL_ID}
        role="dialog"
        aria-modal="true"
        aria-labelledby={NAVIGATION_DRAWER_TITLE_ID}
        className={cn(
          "absolute right-0 top-0 flex h-full w-full max-w-sm flex-col",
          "border-l border-border bg-brand-card shadow-xl",
          "transition-transform duration-300 ease-out",
          isNavigationDrawerOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex min-h-16 items-center border-b border-border px-4">
          <p
            id={NAVIGATION_DRAWER_TITLE_ID}
            className="font-serif text-lg font-bold text-foreground"
          >
            Menu
          </p>
        </div>

        <div className="flex-1 overflow-y-auto">
          <NavigationDrawerContent
            onNavigationLinkSelect={onNavigationLinkSelect}
          />
        </div>
      </div>
    </div>
  );
}
