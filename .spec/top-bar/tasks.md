# Roteiro de Implementação — Top Bar

> Baseado em [specify.md](./specify.md) e [plan.md](./plan.md).  
> Diretrizes: [.cursor/rules/staffEngineer.md](../../.cursor/rules/staffEngineer.md) e [.cursor/rules/system-design.md](../../.cursor/rules/system-design.md).

---

## Fase 1: Fundação e Design System ✅

Pré-requisitos visuais e de arquitetura antes de montar o cabeçalho.

- [x] Confirmar que o projeto Next.js (App Router) + TypeScript está operacional (`dev`, `build`, `lint`)
- [x] Instalar dependências de suporte à UI: `clsx`, `tailwind-merge` (função utilitária `cn`) e, se aplicável ao escopo do drawer/menus, `zustand`
- [x] Configurar tokens de design no Tailwind (cores primitivas `slate-950`/`slate-900`, cores semânticas de CTA escarlate/dourado) conforme system-design
- [x] Definir fontes do design system (ex.: Cinzel para branding, Inter para navegação) via `next/font` e expor variáveis CSS no tema
- [x] Adicionar variáveis de tipografia e espaçamento fluidos (`clamp`) em `globals.css` alinhadas ao system-design
- [x] Configurar breakpoints mobile-first (`sm`, `md`, `lg`, `xl`, etc.) e grid base (4 → 12 colunas a partir de `lg`)
- [x] Criar utilitário `cn(...)` em módulo compartilhado (ex.: `src/lib/utils.ts`) para classes condicionais sem conflito

---

## Fase 2: Modelo de Dados e Contratos ✅

Estrutura estática e tipagem antes do layout visual.

- [x] Definir tipos TypeScript para navegação: item simples (`label`, `href`) vs item com dropdown (`label`, `children[]`)
- [x] Criar tipo discriminado ou union que impeça dropdowns aninhados indevidamente e garanta `href` válido em folhas
- [x] Montar array estático de navegação conforme a spec:
  - [x] Home (link direto)
  - [x] Downloads (link direto)
  - [x] Informações → Sistemas, Itens, Habilidades, Life Stone, Moedas
  - [x] Comunidade & PvP → Olimpíada, Siege, Clã
  - [x] Rankings → Top PvP, Top PK, Top Clan
  - [x] Regras (link direto)
  - [x] Doações (link direto)
- [x] Definir constantes de rotas/URLs (placeholders ou paths reais) em módulo dedicado, separado da camada de apresentação
- [x] Documentar convenção de nomenclatura semântica para handlers e estados (ex.: `isNavigationDrawerOpen`, `handleToggleNavigationDrawer`)

---

## Fase 3: Estrutura do Componente (Server-First) ✅

Shell do cabeçalho como RSC, sem interatividade de cliente ainda.

- [x] Definir estrutura de pastas modular (ex.: `src/components/layout/top-bar/`) respeitando SRP
- [x] Criar componente raiz `TopBar` como Server Component (sem `'use client'`)
- [x] Implementar container `sticky` no topo com z-index adequado e fundo coerente com tokens (`bg-slate-950` ou equivalente semântico)
- [x] Montar layout horizontal em três zonas: **Logo (esquerda)** | **Navegação (centro)** | **Ações (direita)**
- [x] Implementar `TopBarLogo`: link clicável para Home usando `next/link`, com texto ou imagem de branding acessível (`alt` / `aria-label`)
- [x] Integrar `TopBar` no `RootLayout` (`layout.tsx`) para persistir em todas as páginas públicas
- [x] Garantir que o conteúdo principal (`children`) não fique oculto sob o header sticky (padding-top ou estratégia equivalente)

---

## Fase 4: Navegação Desktop e Dropdowns ✅

Itens visíveis em viewports `lg` e superiores (≥ 1024px).

- [x] Criar `TopBarNav` (Server ou composição) que itera sobre o array estático de navegação
- [x] Aplicar tipografia em **uppercase** nos itens principais de menu
- [x] Criar `NavLink` para itens sem submenu, com estado de `hover` visível e tokens do design system
- [x] Criar `NavDropdown` com indicador visual de chevron (˅) apenas quando houver filhos
- [x] Implementar painel de submenu (dropdown) com abertura suave (transição CSS) e lista de links filhos tipados
- [x] Definir comportamento de abertura do dropdown (hover e/ou clique) e documentar a escolha na implementação
- [x] Ocultar `TopBarNav` horizontal abaixo do breakpoint `lg` (`hidden lg:flex` ou equivalente semântico)

---

## Fase 5: Botões de Ação (CTA) ✅

Conversão alinhada à extrema direita do cabeçalho.

- [x] Criar `TopBarActions` alinhado à direita (`ml-auto` ou grid/flex equivalente)
- [x] Implementar botão/link **Login** com estilo sutil (ghost/outline, baixo contraste visual)
- [x] Implementar botão/link **Registro** como CTA primário (preenchimento, alto contraste ou borda destacada com tokens semânticos)
- [x] Vincular Login e Registro às rotas documentadas em `Documentation/end-points/` quando existirem
- [x] Garantir hierarquia visual clara: Registro deve dominar Login sem prejudicar legibilidade

---

## Fase 6: Responsividade — Menu Hambúrguer e Drawer ✅

Comportamento mobile/tablet conforme spec e plan.

- [x] Extrair folha de cliente mínima: botão hambúrguer com `'use client'` (ícone + `aria-expanded`, `aria-controls`)
- [x] Criar `NavigationDrawer` (painel lateral) com lista completa de navegação, incluindo submenus expansíveis/colapsáveis
- [x] Implementar abertura/fechamento do drawer com animação suave (slide/overlay)
- [x] Aplicar **focus trap** dentro do drawer enquanto aberto
- [x] Travar scroll do `body` quando o drawer estiver aberto e restaurar ao fechar
- [x] Permitir fechamento por tecla `Escape`, clique no overlay e navegação após seleção de link
- [x] Exibir hambúrguer apenas abaixo de `lg`; manter `TopBarActions` (Login/Registro) visíveis ou adaptadas conforme layout mobile definido

---

## Fase 7: Estado da UI e Interatividade Client ✅

Gerenciamento de estado sem prop drilling excessivo.

- [x] Criar store Zustand (ou equivalente leve) para: drawer aberto/fechado, dropdown ativo (se necessário), com seletores granulares
- [x] Isolar hooks de UI (ex.: `useNavigationDrawer`) na folha client, mantendo `TopBar` e filhos estáticos como Server Components quando possível
- [x] Evitar re-renderizações em componentes irmãos: atualizar apenas nós que dependem do estado aberto
- [x] Sincronizar estado visual do chevron/ícone hambúrguer com `aria-expanded`

---

## Fase 8: Acessibilidade, Performance e Qualidade ✅

Conformidade WCAG e padrões Staff Engineer.

- [x] Garantir alvos de toque mínimos de **48×48px** em links, botões e ícone hambúrguer
- [x] Aplicar anéis de foco visíveis (`focus-visible:ring-2` ou token equivalente) em todos os controles interativos
- [x] Usar HTML semântico: `<header>`, `<nav>`, listas `<ul>/<li>` para menus
- [x] Adicionar atributos ARIA corretos em dropdowns e drawer (`aria-haspopup`, `aria-expanded`, `role="dialog"` quando aplicável)
- [x] Validar navegação completa por teclado (Tab, Shift+Tab, Enter, Escape)
- [x] Proibir valores arbitrários no Tailwind salvo casos dinâmicos justificados; usar apenas tokens do tema
- [x] Revisar que nenhum segredo ou lógica de negócio vazou para componentes `'use client'`
- [x] Executar `lint` e `build` sem erros após integração

---

## Fase 9: Verificação Manual e Critérios de Aceite ✅

Checklist final contra a spec.

- [x] Top Bar permanece fixa no topo durante scroll (`sticky`)
- [x] Logo redireciona para Home
- [x] Todos os itens e subitens da spec estão presentes e clicáveis
- [x] Dropdowns exibem chevron e abrem de forma suave
- [x] Hover perceptível em itens de menu (desktop)
- [x] Em viewport &lt; 1024px, navegação horizontal some e o hambúrguer abre o drawer com todos os links
- [x] Login discreto; Registro com destaque máximo de CTA
- [x] Contraste e foco adequados em tema escuro (dark mode imersivo)

---

## Escopo Futuro (fora desta entrega inicial)

Itens do [plan.md](./plan.md) que não fazem parte da spec imediata da Top Bar, mas devem ser considerados depois:

- [ ] Sidebar fixa à esquerda em área autenticada (desktop ≥ 1024px), com cabeçalho focado em métricas do jogador
- [ ] Estratégias SSG/ISR por tipo de página institucional
- [ ] Tabelas responsivas com transmutação para cards no mobile (Rankings, etc.)

---

## Ordem de Execução Recomendada

```text
Fase 1 → Fase 2 → Fase 3 → Fase 4 → Fase 5 → Fase 6 → Fase 7 → Fase 8 → Fase 9
```

> **Regra:** não iniciar Fase 4 antes de concluir Fase 2 (dados estáticos tipados). Não adicionar `'use client'` antes da Fase 6, exceto se um subcomponente isolado for estritamente necessário.
