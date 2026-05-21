# Footer — Critérios de aceite

Verificação cruzada com [.spec/footer/specify.md](../../../../.spec/footer/specify.md) em `feat/footer`.

## Fase 10 — Acessibilidade, performance e qualidade

| Critério | Status | Evidência |
| :--- | :---: | :--- |
| HTML semântico (`footer`, `nav`, `ul`/`li`) | ✅ | `Footer.tsx`, `FooterSection.tsx`, seções `*Section.tsx` |
| Headings de seção (`h2` + `aria-labelledby`) | ✅ | `FooterSection.tsx` |
| Links externos acessíveis (ícone só) | ✅ | `FooterSocialLink.tsx` — `aria-label` + nova aba |
| Teclado e foco visível | ✅ | `focus-ring`; alvos ≥ 48×48px |
| Tokens Tailwind (sem magic values) | ✅ | `brand-*`, `muted`, `var(--spacing-container)` |
| 100% RSC (zero `'use client'`) | ✅ | Nenhum arquivo em `footer/` com diretiva client |
| `npm run lint` / `npm run build` | ✅ | Pipeline local sem erros do módulo footer |

## Fase 11 — Verificação contra a spec

| Critério spec | Status | Evidência |
| :--- | :---: | :--- |
| Três categorias: Comunidade, Atalhos, Legal | ✅ | `FOOTER_SECTIONS` + `FooterSocialSection`, `FooterQuickLinksSection`, `FooterLegalSection` |
| Discord / Reddit — nova aba + `noopener` | ✅ | `FooterSocialLink` — `target="_blank"`, `rel="noopener noreferrer"` |
| Downloads, Regras, Suporte — rotas internas | ✅ | `footer-data.ts` → `ROUTES.DOWNLOADS`, `RULES`, `SUPPORT` |
| EULA, Privacidade, Termos, Cookies | ✅ | `FOOTER_LEGAL_LINKS` (4 itens) → `ROUTES.LEGAL.*` |
| Copyright com ano dinâmico e marcas | ✅ | `FooterCopyright` — `getFullYear()`, `FOOTER_COPYRIGHT_NOTICE` |
| Desktop: colunas lado a lado; Mobile: empilhado | ✅ | `Footer.tsx` — `grid-cols-1` / `lg:grid-cols-3` |
| Hover perceptível (links e ícones) | ✅ | `hover:text-brand-gold` em `FooterLink` e `FooterSocialLink` |
| Contraste tema escuro | ✅ | `text-foreground` / `text-muted` sobre `bg-brand-dark` |
| Rodapé em todas as rotas do `RootLayout` | ✅ | `layout.tsx` — `<Footer />` após `<main>` |

### Mapa de links (dados estáticos)

| Seção | Rótulo | Destino |
| :--- | :--- | :--- |
| Comunidade | Discord | `FOOTER_EXTERNAL_LINKS.DISCORD` |
| Comunidade | Reddit | `FOOTER_EXTERNAL_LINKS.REDDIT` |
| Atalhos | Downloads | `/downloads` |
| Atalhos | Regras | `/regras` |
| Atalhos | Suporte | `/suporte` |
| Legal | EULA | `/legal/eula` |
| Legal | Aviso de Privacidade | `/legal/privacidade` |
| Legal | Termos de Uso | `/legal/termos` |
| Legal | Preferências de Cookies | `/legal/cookies` |

> Páginas de destino institucionais ainda são placeholders; links do rodapé estão corretos para integração futura.

## Teste manual recomendado

1. `npm run dev` — abrir `/` e `/login` (e `/registro` quando a rota existir)
2. **Desktop (≥1024px):** três colunas; hover dourado nos links; ícones sociais clicáveis
3. **Mobile (&lt;1024px):** colunas empilhadas; copyright legível
4. Tab: conteúdo do `main` → links do rodapé (ordem natural do DOM)
5. Discord/Reddit: abrem em nova aba; inspecionar `rel` e `target` no DevTools

## Performance

- Rodapé 100% RSC — sem JS de hidratação do módulo footer.
- Dados em `footer-data.ts` / `footer-links.ts` — sem fetch em runtime.
