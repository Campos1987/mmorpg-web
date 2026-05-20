"use client";

import { ConnectedHamburgerButton } from "@/components/layout/top-bar/ConnectedHamburgerButton";
import { ConnectedNavigationDrawer } from "@/components/layout/top-bar/ConnectedNavigationDrawer";

/**
 * Orquestra folhas client do menu mobile sem estado local — Zustand na Fase 7.
 */
export function TopBarMobileNav() {
  return (
    <div className="xl:hidden">
      <ConnectedHamburgerButton />
      <ConnectedNavigationDrawer />
    </div>
  );
}
