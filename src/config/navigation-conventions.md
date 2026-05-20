# Convenções de nomenclatura — Top Bar (UI)

Padrão semântico para estados e handlers nas fases 6–7. Evitar nomes genéricos (`open`, `toggle`, `loading`).

## Estados booleanos

| Padrão | Exemplo |
| :--- | :--- |
| `is` + substantivo descritivo | `isNavigationDrawerOpen` |
| `is` + substantivo + `Expanded` (submenu) | `isNavSubmenuExpanded` |
| `active` + identificador (dropdown ativo) | `activeDropdownId` |

## Handlers de evento

| Padrão | Exemplo |
| :--- | :--- |
| `handle` + ação + alvo | `handleToggleNavigationDrawer` |
| `handle` + ação + contexto | `handleCloseNavigationDrawerOnEscape` |
| `handle` + seleção de link | `handleNavigationLinkSelect` |

## Store Zustand (Fase 7)

- Ações: verbos imperativos — `openNavigationDrawer`, `closeNavigationDrawer`, `setActiveDropdownId`
- Seletores: substantivos — `selectIsNavigationDrawerOpen`, `selectActiveDropdownId`
- Evitar selecionar o objeto inteiro da store em componentes que só precisam de um campo

## Acessibilidade (ARIA)

- `aria-expanded` deve refletir o mesmo booleano exposto na UI (`isNavigationDrawerOpen`, estado do submenu)
- `aria-controls` aponta para o `id` estável do painel controlado (ex.: `navigation-drawer-panel`)
