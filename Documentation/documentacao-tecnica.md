# Documentação Técnica — Portal MMORPG (RPG II)

Documento único de referência do que foi implementado até o momento no frontend web do portal.

---

## 1. Visão geral

O projeto é um portal da comunidade do servidor RPG II, construído como aplicação **Next.js 16** com **App Router**, **TypeScript** e **Tailwind CSS v4**. O tema visual é **dark mode imersivo**, pensado para leitura de dados, rankings e conversão (registro de contas).

A primeira entrega funcional cobre:

- **Fundação do design system** (tokens, fontes, utilitários)
- **Top Bar** completa (cabeçalho global com navegação, CTAs e menu mobile)

A especificação detalhada da Top Bar vive em `.spec/top-bar/` (uso interno da equipe). Este documento descreve o que está no código, sem fragmentar por cada pasta do repositório.

---

## 2. Stack e ferramentas

| Tecnologia | Papel |
| :--- | :--- |
| Next.js 16 | Framework, RSC, roteamento, build |
| React 19 | UI |
| TypeScript | Tipagem estrita (`strict`) |
| Tailwind CSS v4 | Estilos via `@theme` em CSS |
| Zustand | Estado de UI (drawer, dropdowns) |
| clsx + tailwind-merge | Utilitário `cn()` para classes condicionais |
| ESLint | Qualidade de código |

### Scripts

```bash
npm run dev    # desenvolvimento
npm run build  # build de produção
npm run lint   # ESLint
```

---

## 3. Arquitetura do frontend

### 3.1 Princípios

- **Server-First:** preferência por React Server Components; `'use client'` só onde há eventos de browser ou estado local/global de UI.
- **Modularidade:** configuração (rotas, menus) separada da apresentação (componentes).
- **Zero Trust:** inputs e rotas tratados com tipagem; sem segredos no cliente.
- **Mobile-First:** CSS base leve, progressão por breakpoints.

### 3.2 Organização do código (`src/`)

| Área | Responsabilidade |
| :--- | :--- |
| `app/` | Layout raiz, páginas, estilos globais |
| `components/` | UI (ex.: layout da Top Bar) |
| `config/` | Rotas e dados estáticos de navegação |
| `types/` | Contratos TypeScript compartilhados |
| `hooks/` | Lógica reutilizável de UI (focus trap, scroll lock, drawer) |
| `store/` | Estado global Zustand |
| `lib/` | Utilitários puros (`cn`, helpers) |

### 3.3 Renderização

- **Layout global** (`app/layout.tsx`): fontes, tema escuro, Top Bar fixa em todas as páginas, `<main>` para o conteúdo.
- **Páginas:** por enquanto a home (`/`) serve como demo com blocos roláveis para testar o header sticky.

---

## 4. Design system

Definido em `src/app/globals.css` (Tailwind v4 com `@theme inline`) e fontes em `layout.tsx`.

### Cores principais

| Uso | Token | Valor |
| :--- | :--- | :--- |
| Fundo | `brand-dark` | `#020617` |
| Cards / painéis | `brand-card` | `#0f172a` |
| CTA primário | `brand-cta` | `#dc2626` |
| Destaque dourado | `brand-gold` | `#d97706` |
| **Logo** | `brand-logo` | `#d4af37` |
| Texto | `foreground` | `#f1f5f9` |
| Texto secundário | `muted` | `#94a3b8` |

### Tipografia

- **Cinzel** (serif): branding, logo, títulos.
- **Inter** (sans): navegação, corpo, formulários.
- Tamanhos fluidos via `clamp` (`--text-base`, `--text-h1`, `--text-h2`).

### Utilitários globais

- `cn()` — `src/lib/utils.ts`
- `focus-ring` — foco visível para acessibilidade
- `container-content` — largura máxima 1920px com padding fluido
- `scrollbar-none` — scroll horizontal sem barra visível

### Grid

4 colunas (mobile) → 8 (`md`) → 12 (`lg`), com gutters que crescem conforme a viewport.

---

## 5. Top Bar (cabeçalho)

Componente principal de navegação, integrado no layout global.

### 5.1 Comportamento

- **Sticky** no topo (`z-50`), altura 64px.
- **Logo** “L2 Portal” → link para `/`, cor dourada `#d4af37`.
- **Navegação principal** com itens em **uppercase** e hover dourado.
- **Dropdowns** nos itens com submenus (chevron ˅, animação suave).
- **Login** (estilo discreto, outline) e **Registro** (CTA escarlate em destaque).
- **Mobile / tablet (&lt; 1280px):** menu hambúrguer abre **drawer** lateral com todos os links e submenus expansíveis (`<details>`).
- **Desktop (≥ 1280px):** barra horizontal completa; abaixo de 1280px o drawer evita sobreposição de textos.

### 5.2 Estrutura de menus

| Item | Subitens |
| :--- | :--- |
| Home | — |
| Downloads | — |
| Informações | Sistemas, Itens, Habilidades, Life Stone, Moedas |
| Comunidade & PvP | Olimpíada, Siege, Clã |
| Rankings | Top PvP, Top PK, Top Clan |
| Regras | — |
| Doações | — |

Fonte única de dados: `MAIN_NAVIGATION` em config. Rotas centralizadas em `ROUTES` (paths placeholder até as páginas existirem).

### 5.3 Estado e interatividade

- **Zustand** (`navigation-ui-store`): drawer aberto/fechado, dropdown ativo, registro do botão hambúrguer para devolver foco ao fechar.
- **Hook** `useNavigationDrawer`: API semântica para componentes client.
- Dropdown desktop: hover/focus CSS + sincronização ARIA via store; teclado (`Enter`, `Space`, `Escape`).
- Drawer: focus trap, bloqueio de scroll do `body`, fecha com Escape, overlay ou ao clicar em um link.

### 5.4 Acessibilidade

- HTML semântico (`header`, `nav`, listas).
- Alvos de toque mínimos 48×48px.
- `aria-expanded`, `aria-controls`, `role="dialog"` no drawer, `role="menu"` nos submenus.
- Navegação completa por teclado documentada no fluxo de QA manual.

### 5.5 Rotas de autenticação (UI)

| Ação | Path |
| :--- | :--- |
| Login | `/login` |
| Registro | `/registro` |

Contratos de API para integração futura: `Documentation/end-points/login.md` e `register.md`.

---

## 6. Rotas planejadas (portal)

Além de `/`, o menu já aponta para paths institucionais que serão implementados depois, por exemplo:

- `/downloads`, `/regras`, `/doacoes`
- `/informacoes/*`, `/comunidade/*`, `/rankings/*`

Os links da Top Bar já usam essas URLs; páginas ainda não existem no App Router.

---

## 7. Histórico de entrega (branch `feat/top-bar`)

Implementação em nove incrementos lógicos, refletidos nos commits:

1. Design system e `cn`
2. Modelo de dados e rotas de navegação
3. Shell da Top Bar no layout
4. Navegação desktop e dropdowns
5. Botões Login e Registro
6. Menu hambúrguer e drawer mobile
7. Store Zustand e hooks de UI
8. Refino de acessibilidade e teclado
9. Verificação de aceite e home de demonstração

Consulte `git log --oneline feat/top-bar` para hashes e mensagens exatas (Conventional Commits em inglês).

---

## 8. Como validar

1. `npm run dev` → abrir `http://localhost:3000`
2. Redimensionar a janela: &lt; 1280px (drawer), ≥ 1280px (nav horizontal)
3. Testar Tab, Enter e Escape nos menus
4. Rolar a página e confirmar header fixo
5. `npm run lint && npm run build` antes de merge

---

## 9. Próximos passos (fora do escopo atual)

- Páginas institucionais para cada rota do menu
- Formulários de login/registro integrados à API
- Sidebar em área autenticada (desktop)
- Cache SSG/ISR para conteúdo público
- Tabelas responsivas (cards no mobile) para rankings e databases

---

## 10. Referências internas

- Especificação UX: `.spec/top-bar/specify.md`
- Roteiro de tarefas: `.spec/top-bar/tasks.md`
- Regras de commit: `.cursor/rules/commit.mdc`
- Constituição do produto: `.cursor/rules/constitution.mdc`
