"use client";

import { NavigationDrawer } from "@/components/layout/top-bar/NavigationDrawer";
import {
  selectIsNavigationDrawerOpen,
  useNavigationUiStore,
} from "@/store/navigation-ui-store";

export function ConnectedNavigationDrawer() {
  const isNavigationDrawerOpen = useNavigationUiStore(
    selectIsNavigationDrawerOpen,
  );
  const closeNavigationDrawer = useNavigationUiStore(
    (state) => state.closeNavigationDrawer,
  );

  return (
    <NavigationDrawer
      isNavigationDrawerOpen={isNavigationDrawerOpen}
      onCloseNavigationDrawer={closeNavigationDrawer}
      onNavigationLinkSelect={closeNavigationDrawer}
    />
  );
}
