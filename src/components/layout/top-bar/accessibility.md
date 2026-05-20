# Top Bar — Acessibilidade e teclado (Fase 8)

## Estrutura semântica

- `<header>` — `TopBar` (banner da página)
- `<nav aria-label="Navegação principal">` — desktop (`TopBarNav`) e mobile (`NavigationDrawerContent`)
- `<nav aria-label="Ações de conta">` — Login / Registro (`TopBarActions`)
- Listas `<ul>` / `<li>` em todos os menus

## Alvos de toque

Controles interativos usam `min-h-12` (48px) e, quando aplicável, `min-w-12` (48px).

## Teclado

| Contexto | Teclas | Comportamento |
| :--- | :--- | :--- |
| Links de menu | `Tab` / `Shift+Tab` | Navegação entre itens |
| Links de menu | `Enter` | Ativa o link |
| Dropdown desktop | `Enter` / `Space` | Abre/fecha submenu (`activeDropdownId`) |
| Dropdown desktop | `Escape` | Fecha submenu ativo |
| Drawer mobile | `Tab` | Focus trap dentro do painel |
| Drawer mobile | `Escape` | Fecha drawer e devolve foco ao hambúrguer |
| Overlay drawer | `Enter` / clique | Fecha drawer |

## ARIA

- Dropdown: `aria-haspopup="menu"`, `aria-expanded`, `aria-controls`, `role="menu"` / `role="menuitem"`
- Drawer: `role="dialog"`, `aria-modal="true"`, `aria-labelledby`
- Hambúrguer: `aria-expanded`, `aria-controls="navigation-drawer-panel"`
