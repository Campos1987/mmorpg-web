"use client";

import { forwardRef } from "react";

import { NAVIGATION_DRAWER_PANEL_ID } from "@/components/layout/top-bar/constants";
import { cn } from "@/lib/utils";

type HamburgerButtonProps = {
  isNavigationDrawerOpen: boolean;
  onToggleNavigationDrawer: () => void;
};

export const HamburgerButton = forwardRef<
  HTMLButtonElement,
  HamburgerButtonProps
>(function HamburgerButton(
  { isNavigationDrawerOpen, onToggleNavigationDrawer },
  ref,
) {
  return (
    <button
      ref={ref}
      type="button"
      className={cn(
        "focus-ring inline-flex min-h-12 min-w-12 items-center justify-center rounded-md",
        "text-foreground transition-colors hover:text-brand-gold",
      )}
      aria-expanded={isNavigationDrawerOpen}
      aria-controls={NAVIGATION_DRAWER_PANEL_ID}
      onClick={onToggleNavigationDrawer}
    >
      <span className="sr-only">
        {isNavigationDrawerOpen
          ? "Fechar menu de navegação"
          : "Abrir menu de navegação"}
      </span>
      <svg
        className="size-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        aria-hidden
      >
        {isNavigationDrawerOpen ? (
          <>
            <path d="M6 6l12 12" />
            <path d="M18 6L6 18" />
          </>
        ) : (
          <>
            <path d="M4 7h16" />
            <path d="M4 12h16" />
            <path d="M4 17h16" />
          </>
        )}
      </svg>
    </button>
  );
});
