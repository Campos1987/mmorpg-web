# Módulo Dashboard

Convenção de pastas para o painel autenticado (tema Cyber-Fantasy), desacoplado da Top Bar pública.

| Pasta | Responsabilidade |
|-------|------------------|
| `ui/` | Átomos reutilizáveis (`Badge`, `ProgressBar`, `GlassCard`, `StatusIndicator`) |
| `navbar/` | Barra superior do painel (`DashboardNavbar`, drawer mobile) |
| `account/` | Cabeçalho da conta (`AccountHeader`, `SubAccountDropdown`, `CurrencyDisplay`) |
| `character/` | Carrossel e cards de personagem |
| `activity/` | Widgets do grid inferior (missões, desafios, eventos, conquistas) |

- Preferir **Server Components** na página; `'use client'` apenas em folhas com eventos/estado.
- Tokens visuais: `globals.css` (`--color-dashboard-*`, utilitários `glass-panel`, `neon-border-*`).
- Dados mockados: `src/mocks/dashboard-mock-data.ts` até integração com API.
