# Fase 10 — Acessibilidade, performance e qualidade (Footer)

Verificação cruzada com [.spec/footer/specify.md](../../../../.spec/footer/specify.md) em `feat/footer`.

| Critério | Status | Evidência |
| :--- | :---: | :--- |
| HTML semântico (`footer`, `nav`, `ul`/`li`) | ✅ | `Footer.tsx`, `FooterSection.tsx`, seções `*Section.tsx` |
| Headings de seção (`h2` + `aria-labelledby`) | ✅ | `FooterSection.tsx` — `h2` com `id` estável; `nav` com `aria-labelledby` |
| Links externos acessíveis (ícone só) | ✅ | `FooterSocialLink.tsx` — `aria-label` com indicação de nova aba |
| Teclado e foco visível | ✅ | `focus-ring` em `FooterLink`, `FooterSocialLink`; alvos ≥ 48×48px |
| Tokens Tailwind (sem magic values) | ✅ | `brand-*`, `border`, `muted`, `var(--spacing-container)` do tema |
| 100% RSC (zero `'use client'`) | ✅ | Nenhum arquivo em `footer/` com diretiva client |
| `npm run lint` | ✅ | Sem erros após integração no `RootLayout` |

## Estrutura semântica

| Elemento | Onde |
| :--- | :--- |
| `<footer>` (contentinfo implícito) | `Footer.tsx` |
| `<section>` + `<h2>` por coluna | `FooterSection.tsx` |
| `<nav>` por bloco de links | `FooterSection.tsx` |
| `<ul>` / `<li>` nas listas | `FooterSocialSection`, `FooterQuickLinksSection`, `FooterLegalSection` |

## Performance

- Rodapé inteiro renderizado no servidor — 0 KB de JS de hidratação do módulo footer.
- Dados estáticos em `footer-data.ts` / `footer-links.ts` — sem fetch em runtime.

## Build

Executar `npm run build` no ambiente com acesso a Google Fonts (`next/font` no `layout.tsx`).
Falhas de rede ao buscar Cinzel/Inter não são causadas pelo módulo footer.

## Teste manual recomendado (complementa Fase 11)

1. `npm run dev` — abrir `/`, `/login`, `/registro`
2. Confirmar rodapé após o conteúdo principal (Tab: main → links do footer)
3. **Mobile (&lt;1024px):** colunas empilhadas, texto legível
4. **Desktop (≥1024px):** três colunas; hover dourado nos links
5. Discord/Reddit: nova aba, `rel="noopener noreferrer"`
