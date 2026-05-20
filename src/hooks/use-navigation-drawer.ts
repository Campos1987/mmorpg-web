"use client";

import { useCallback } from "react";

import {
  selectIsNavigationDrawerOpen,
  useNavigationUiStore,
} from "@/store/navigation-ui-store";

/**
 * Hook de UI do drawer mobile — encapsula a store Zustand e handlers semânticos.
 * Componentes devem preferir seletores granulares quando não precisarem do API completo.
 */
export function useNavigationDrawer() {
  const isNavigationDrawerOpen = useNavigationUiStore(
    selectIsNavigationDrawerOpen,
  );
  const toggleNavigationDrawer = useNavigationUiStore(
    (state) => state.toggleNavigationDrawer,
  );
  const closeNavigationDrawer = useNavigationUiStore(
    (state) => state.closeNavigationDrawer,
  );
  const registerHamburgerButtonElement = useNavigationUiStore(
    (state) => state.registerHamburgerButtonElement,
  );

  const hamburgerButtonRef = useCallback(
    (node: HTMLButtonElement | null) => {
      registerHamburgerButtonElement(node);
    },
    [registerHamburgerButtonElement],
  );

  const handleToggleNavigationDrawer = useCallback(() => {
    toggleNavigationDrawer();
  }, [toggleNavigationDrawer]);

  const handleCloseNavigationDrawer = useCallback(() => {
    closeNavigationDrawer();
  }, [closeNavigationDrawer]);

  const handleNavigationLinkSelect = useCallback(() => {
    closeNavigationDrawer();
  }, [closeNavigationDrawer]);

  return {
    hamburgerButtonRef,
    isNavigationDrawerOpen,
    handleToggleNavigationDrawer,
    handleCloseNavigationDrawer,
    handleNavigationLinkSelect,
  };
}
