# Módulo Dashboard

Convenção de pastas para o painel autenticado (tema Cyber-Fantasy), desacoplado da Top Bar pública.

| Pasta | Responsabilidade |
|-------|------------------|
| `ui/` | Átomos reutilizáveis (`Badge`, `ProgressBar`, `GlassCard`, `StatusIndicator`) |
| `account/` | Cabeçalho da conta (`AccountHeader`, `SubAccountDropdown`, `CurrencyDisplay`) |
| `character/` | Carrossel e cards de personagem |
| `activity/` | Widgets do grid inferior (missões, desafios, eventos, conquistas) |

- Navegação global: **TopBar** e **Footer** do layout `(site)` — sem navbar própria do painel.
- Preferir **Server Components** na página; `'use client'` apenas em folhas com eventos/estado.
- Tokens visuais: design system (`brand-*`, `muted`, `foreground`) + glass escuro (`bg-black/40`, bordas `yellow-600/40`).
- Dados mockados: `src/mocks/dashboard-mock-data.ts` até integração com API.
