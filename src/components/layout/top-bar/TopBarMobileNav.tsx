"use client";

import { useCallback, useRef, useState } from "react";

import { HamburgerButton } from "@/components/layout/top-bar/HamburgerButton";
import { NavigationDrawer } from "@/components/layout/top-bar/NavigationDrawer";

export function TopBarMobileNav() {
  const [isNavigationDrawerOpen, setIsNavigationDrawerOpen] = useState(false);
  const hamburgerButtonRef = useRef<HTMLButtonElement>(null);

  const handleToggleNavigationDrawer = useCallback(() => {
    setIsNavigationDrawerOpen((previous) => !previous);
  }, []);

  const handleCloseNavigationDrawer = useCallback(() => {
    setIsNavigationDrawerOpen(false);
    hamburgerButtonRef.current?.focus();
  }, []);

  const handleNavigationLinkSelect = useCallback(() => {
    handleCloseNavigationDrawer();
  }, [handleCloseNavigationDrawer]);

  return (
    <div className="lg:hidden">
      <HamburgerButton
        ref={hamburgerButtonRef}
        isNavigationDrawerOpen={isNavigationDrawerOpen}
        onToggleNavigationDrawer={handleToggleNavigationDrawer}
      />
      <NavigationDrawer
        isNavigationDrawerOpen={isNavigationDrawerOpen}
        onCloseNavigationDrawer={handleCloseNavigationDrawer}
        onNavigationLinkSelect={handleNavigationLinkSelect}
      />
    </div>
  );
}
