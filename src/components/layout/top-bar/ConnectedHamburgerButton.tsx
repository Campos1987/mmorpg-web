"use client";

import { HamburgerButton } from "@/components/layout/top-bar/HamburgerButton";
import { useNavigationDrawer } from "@/hooks/use-navigation-drawer";

export function ConnectedHamburgerButton() {
  const {
    hamburgerButtonRef,
    isNavigationDrawerOpen,
    handleToggleNavigationDrawer,
  } = useNavigationDrawer();

  return (
    <HamburgerButton
      ref={hamburgerButtonRef}
      isNavigationDrawerOpen={isNavigationDrawerOpen}
      onToggleNavigationDrawer={handleToggleNavigationDrawer}
    />
  );
}
