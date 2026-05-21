# Convenções de nomenclatura — Rodapé (Footer)

Padrão semântico alinhado à Top Bar e ao registro. Evitar nomes genéricos (`link`, `item`, `footer`).

## Fundação reutilizada (Fase 1)

O rodapé **não recria** o design system. Confirmado na base da Top Bar:

| Recurso | Local |
| :--- | :--- |
| Tokens Tailwind (`brand-*`, `background`, `foreground`) | `src/app/globals.css` (`@theme inline`) |
| Utilitário `cn()` | `src/lib/utils.ts` |
| Fontes Cinzel / Inter | `src/app/layout.tsx` (`next/font`) |
| Breakpoints mobile-first + `3xl` | `globals.css` + Tailwind defaults |
| Foco acessível | utilitário `focus-ring` em `globals.css` |
| Hover de destaque | `hover:text-brand-gold` (padrão `NavLink`) |

## Componentes (Fases 3–7)

| Padrão | Exemplo |
| :--- | :--- |
| Prefixo `Footer` + papel | `Footer`, `FooterSection`, `FooterSocialLink` |
| Seção por coluna da spec | `FooterSocialSection`, `FooterQuickLinksSection`, `FooterLegalSection` |
| Link genérico interno | `FooterLink` |
| Faixa inferior | `FooterCopyright` |

## Dados e configuração

| Padrão | Exemplo |
| :--- | :--- |
| Rotas internas | `ROUTES.SUPPORT`, `ROUTES.LEGAL.PRIVACY` em `src/config/routes.ts` |
| URLs externas | `FOOTER_EXTERNAL_LINKS.DISCORD` em `src/config/footer-links.ts` |
| Arrays estáticos (Fase 2) | `src/config/footer-data.ts` — `FOOTER_SOCIAL_LINKS`, `FOOTER_QUICK_LINKS`, `FOOTER_LEGAL_LINKS` |
| Metadados de seção | `FOOTER_SECTIONS` (`id` + `heading`); alias `FOOTER_SECTION_HEADINGS` |
| Atributos de link externo | `FOOTER_EXTERNAL_LINK_TARGET`, `FOOTER_EXTERNAL_LINK_REL` |

## Tipos (`src/types/footer.ts`)

| Tipo | Uso |
| :--- | :--- |
| `FooterInternalLink` | Downloads, Regras, páginas legais |
| `FooterExternalLink` | URLs absolutas sem ícone dedicado |
| `FooterSocialLink` | Discord, Reddit (`icon: FooterSocialIconId`) |
| `FooterLinkItem` | Union para listas mistas |

Discriminante: `kind: "internal" | "external"`; externos exigem `isExternal: true`.

## Copyright (Fase 7)

| Padrão | Exemplo |
| :--- | :--- |
| Ano dinâmico (RSC) | `currentYear` em `FooterCopyright` via `new Date().getFullYear()` |
| Texto configurável | `FOOTER_BRAND_NAME`, `FOOTER_COPYRIGHT_NOTICE` em `src/config/footer-data.ts` |

## Acessibilidade

- Links só com ícone: `aria-label` com nome da rede (ex.: "Discord")
- Externos: `rel="noopener noreferrer"` e `target="_blank"`
- Cada bloco de links dentro de `<nav>` com `aria-labelledby` apontando ao heading da seção

## Variáveis de ambiente

| Variável | Descrição |
| :--- | :--- |
| `NEXT_PUBLIC_FOOTER_DISCORD_URL` | Convite ou servidor Discord (URL pública) |
| `NEXT_PUBLIC_FOOTER_REDDIT_URL` | Comunidade ou subreddit (URL pública) |

Sem prefixo `NEXT_PUBLIC_` não use no cliente; estes links são públicos por definição.
