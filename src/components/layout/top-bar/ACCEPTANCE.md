# Fase 9 — Critérios de aceite (Top Bar)

Verificação cruzada com [specify.md](../../../../.spec/top-bar/specify.md) em `feat/top-bar`.

| Critério | Status | Evidência |
| :--- | :---: | :--- |
| Top Bar `sticky` no scroll | ✅ | `TopBar.tsx` — `sticky top-0 z-50` |
| Logo → Home | ✅ | `TopBarLogo.tsx` — `href={ROUTES.HOME}` |
| Itens e subitens da spec | ✅ | `navigation.ts` — 7 raízes + 11 folhas; rotas em `routes.ts` |
| Dropdown com chevron e transição | ✅ | `NavDropdown.tsx` — `˅`, `duration-200`, hover/focus/keyboard |
| Hover perceptível (desktop) | ✅ | `NavLink` / `NavDropdown` — `hover:text-brand-gold` |
| Mobile: nav oculta, drawer completo | ✅ | `TopBarNav` `hidden lg:flex`; `TopBarMobileNav` `lg:hidden` + `NavigationDrawerContent` |
| Login sutil / Registro CTA forte | ✅ | `AuthLoginLink` outline; `AuthRegisterLink` `bg-brand-cta` + uppercase |
| Contraste e foco (dark) | ✅ | tokens `brand-dark` / `foreground`; utilitário `focus-ring` |

## Navegação vs spec

| Item spec | Implementado |
| :--- | :---: |
| Home | ✅ |
| Downloads | ✅ |
| Informações → 5 subitens | ✅ |
| Comunidade & PvP → 3 subitens | ✅ |
| Rankings → 3 subitens | ✅ |
| Regras | ✅ |
| Doações | ✅ |

## Teste manual recomendado

1. `npm run dev` — abrir `/`
2. **Desktop (≥1024px):** hover nos dropdowns; Tab/Enter/Escape; clicar todos os links
3. **Mobile (&lt;1024px):** hambúrguer → drawer → submenus `<details>`; fechar por overlay/Escape/link
4. Rolar a home de exemplo — header permanece visível (`sticky`)

## Rotas de ação

- Login: `/login`
- Registro: `/registro`

>Páginas de destino ainda não implementadas; links da Top Bar estão corretos para integração futura.
