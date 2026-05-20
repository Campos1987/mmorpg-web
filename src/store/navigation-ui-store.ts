import { create } from "zustand";

type NavigationUiState = {
  isNavigationDrawerOpen: boolean;
  activeDropdownId: string | null;
  hamburgerButtonElement: HTMLButtonElement | null;
  openNavigationDrawer: () => void;
  closeNavigationDrawer: () => void;
  toggleNavigationDrawer: () => void;
  setActiveDropdownId: (dropdownId: string | null) => void;
  registerHamburgerButtonElement: (element: HTMLButtonElement | null) => void;
};

export const selectIsNavigationDrawerOpen = (state: NavigationUiState) =>
  state.isNavigationDrawerOpen;

export const selectActiveDropdownId = (state: NavigationUiState) =>
  state.activeDropdownId;

export const useNavigationUiStore = create<NavigationUiState>((set, get) => ({
  isNavigationDrawerOpen: false,
  activeDropdownId: null,
  hamburgerButtonElement: null,

  openNavigationDrawer: () => set({ isNavigationDrawerOpen: true }),

  closeNavigationDrawer: () => {
    set({ isNavigationDrawerOpen: false, activeDropdownId: null });
    get().hamburgerButtonElement?.focus();
  },

  toggleNavigationDrawer: () =>
    set((state) => ({
      isNavigationDrawerOpen: !state.isNavigationDrawerOpen,
      activeDropdownId: state.isNavigationDrawerOpen
        ? null
        : state.activeDropdownId,
    })),

  setActiveDropdownId: (dropdownId) => set({ activeDropdownId: dropdownId }),

  registerHamburgerButtonElement: (element) =>
    set({ hamburgerButtonElement: element }),
}));
