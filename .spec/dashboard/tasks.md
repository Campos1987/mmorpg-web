# Roteiro de Implementação — Dashboard

Documento derivado de [specify.md](./specify.md) e [plan.md](./plan.md). Ordem pensada para **tipos e tokens antes de UI**, **componentes burros antes de estado**, e **layout antes de interatividade**.

> **Contexto do repositório:** Next.js (App Router), TypeScript e Tailwind já estão configurados. A Top Bar pública (`src/components/layout/top-bar/`) é distinta da Navbar do painel autenticado descrita na spec — não reutilizar como substituto direto sem adaptação.

---

## Fase 1: Fundação e Design System (Dashboard)

Preparar tokens e utilitários do tema Cyber-Fantasy sem alterar o comportamento das páginas públicas existentes.

- [x] Definir escopo da rota autenticada (ex.: `src/app/dashboard/`) e layout dedicado (separado do layout público da home)
- [x] Mapear tokens do dashboard em `@theme` / `globals.css`: backgrounds profundos (#1a0b2e, #20005F, #25006b), neon azul (#89FFFF), neon roxo, status (verde, vermelho, ouro)
- [x] Criar utilitários reutilizáveis para *glassmorphism* (fundo translúcido + `backdrop-blur`)
- [x] Criar utilitários/classes para bordas e *glow* neon (`box-shadow` com rgba e blur)
- [x] Definir transição padrão do painel (`transition` ~300ms) para hover, dropdown e troca de borda nos cards
- [x] Registrar constantes de rota do dashboard em `src/config/routes.ts` (ex.: `ROUTES.DASHBOARD`, sub-rotas de navegação interna)
- [x] Organizar assets em `public/` (logo/ícones SVG, avatares, backgrounds de personagens e banner de evento)
- [x] Documentar convenção de nomes de pasta para o módulo (`src/components/dashboard/` ou equivalente modular)

---

## Fase 2: Domínio, Tipos e Dados Estáticos

Modelar o contrato de dados antes de montar JSX — alinhado à tipagem estrita e aos mocks futuros da API.

- [x] Criar tipos em `src/types/dashboard/` (ou domínio equivalente): `SubAccount`, `Character`, `CurrencyBalance`, `DailyQuest`, `WeeklyChallenge`, `GameEvent`, `Achievement`
- [x] Tipar estados de UI derivados: `CharacterCardState` (`isActive`), status de conexão, progresso fracionário (`current`/`total`), percentuais de barras
- [x] Criar `src/config/dashboard-navigation.ts` com itens da Navbar (Início, Perfil, Mercado, Guilda, Configurações) e metadado de rota ativa
- [x] Criar `src/mocks/dashboard-mock-data.ts` (ou `src/config/dashboard-mock-data.ts`) com arrays/objetos estáticos: sub-contas, personagens, moedas, missões diárias, desafios semanais, próximo evento, conquistas
- [x] Garantir que os mocks cubram casos de borda visuais: personagem ativo vs inativo, missão concluída vs pendente, desafio quase completo, lista vazia (fallback de UI)

---

## Fase 3: Componentes Base de UI (Apresentação)

Blocos atômicos reutilizáveis, sem lógica de negócio — apenas props tipadas.

- [x] Implementar `Badge` (nível no avatar, contador de notificações não lidas)
- [x] Implementar `ProgressBar` com variantes de cor (PV vermelho, PM azul, XP/desafio azul–roxo) e suporte a valor percentual
- [x] Implementar `GlassCard` (container translúcido com borda arredondada) como base dos widgets do painel
- [x] Implementar `StatusIndicator` (bolinha verde “Conectado” e variantes futuras)
- [x] Exportar barrel `index.ts` do módulo de UI do dashboard para imports limpos
- [x] Validar acessibilidade nos átomos: contraste WCAG, `aria-*` onde aplicável, alvo de toque mínimo 48×48px em controles clicáveis

---

## Fase 4: Navegação e Cabeçalho da Conta

Componentes de layout do topo do painel, ainda majoritariamente apresentacionais.

- [x] Implementar `DashboardNavbar`: logo à esquerda, links centrais, área de usuário à direita
- [x] Implementar estado visual de link ativo (fonte neon azul + indicador inferior opcional)
- [x] Implementar estados de hover nos links inativos
- [x] Implementar bloco de usuário: avatar circular, `Badge` de nível sobreposto, nome, `StatusIndicator`
- [x] Implementar ações rápidas: ícone de notificações com `Badge` vermelho e ícone de configurações
- [x] Implementar `CurrencyDisplay`: painel glass com Ouro (ícone G amarelo) e Diamantes (ícone azul)
- [x] Implementar `SubAccountDropdown` customizado (sem `<select>` nativo): trigger com nickname, classe e nível; lista com mesmo formato e hover por item
- [x] Compor `AccountHeader` reunindo `SubAccountDropdown` + `CurrencyDisplay`

---

## Fase 5: Cards e Widgets Complexos

Elementos com maior densidade visual e composição interna.

### 5.1 Personagem

- [x] Implementar `CharacterCard` como componente burro: recebe dados do personagem + prop `isActive`
- [x] Aplicar imagem de fundo com `object-fit: cover` e overlay em gradiente linear na base para legibilidade do texto
- [x] Alternar borda neon azul (inativo) vs roxo (ativo) via prop `isActive`
- [x] Montar cabeçalho do card: escudo de status, nome, status “Ativo”, classe/nível, pontuação de equipamento
- [x] Integrar barras PV/PM e barra fina de XP com percentual textual
- [x] Exibir bloco compacto de detalhes (HP/MP numéricos, missões ativas, guilda, resumo de equipamento)

### 5.2 Atividades (grid inferior)

- [x] Implementar `DailyQuestItem` (chip/quadrado, borda colorida, check verde no canto quando concluído)
- [x] Implementar `DailyQuestsWidget` mapeando lista de missões diárias
- [x] Implementar `ProgressBarItem` para desafios semanais (ícone, nome, fração, barra)
- [x] Implementar `WeeklyChallengesWidget` com lista de `ProgressBarItem`
- [x] Implementar `EventCalendarWidget` com card destaque (banner esmaecido, título, data/hora, ícone de calendário no cabeçalho)
- [x] Implementar `AchievementItem` (ícone, título, status “Desbloqueado”)
- [x] Implementar `AchievementsWidget` com lista vertical
- [x] Implementar `ActivityDashboard` como grid container dos quatro widgets

### 5.3 Carrossel (estrutura visual)

- [x] Implementar `CharacterCarousel`: container horizontal, setas `<` `>` e área de cards
- [x] Adicionar indicadores (dots) na base do carrossel (estrutura visual; lógica na Fase 7)

---

## Fase 6: Integração de Layout e Página

Montar a view completa com dados mockados, ainda sem estado global complexo.

- [x] Criar `src/app/dashboard/page.tsx` (ou grupo de rotas autenticado conforme decisão da Fase 1)
- [x] Definir metadata e estrutura semântica da página (`main`, landmarks, hierarquia de headings)
- [x] Compor layout vertical: `DashboardNavbar` → `AccountHeader` → `CharacterCarousel` → `ActivityDashboard`
- [x] Posicionar seções com Grid/Flex do Tailwind (grid 2×2 inferior no desktop; empilhamento no mobile)
- [x] Conectar página aos mocks via props (sem fetch real nesta etapa)
- [x] Marcar explicitamente quais blocos serão Client Components (`'use client'`) — apenas onde houver eventos/estado
- [x] Garantir que Server Components permaneçam na folha mais alta possível da árvore

---

## Fase 7: Interatividade e Estado de UI

Fazer a interface reagir às ações do usuário sem dependência do back-end.

- [x] Implementar estado de sub-conta selecionada (`useState` na página ou store leve com seletores, ex. Zustand, se o escopo crescer)
- [x] Sincronizar seleção do `SubAccountDropdown` com personagens exibidos / estado `isActive` do `CharacterCard` correspondente
- [x] Implementar seleção de personagem ativo no carrossel (clique no card atualiza borda roxo vs azul)
- [x] Implementar rolagem do carrossel: setas controlando `scroll` horizontal (ou biblioteca leve, se necessário)
- [x] Implementar `scroll-snap` e/ou offset para paginação por “página” de cards
- [x] Conectar dots indicadores ao índice/offset visível do carrossel
- [x] Implementar abertura/fechamento do dropdown com foco e teclado (Escape para fechar, trap opcional se menu complexo)
- [x] Preparar adaptador/service vazio (`src/services/dashboard/`) com interface tipada para futura integração API — sem chamadas reais ainda

---

## Fase 8: Responsividade, Acessibilidade e Polimento

Revisão final alinhada ao system-design (mobile-first, breakpoints, Core Web Vitals).

- [x] Adaptar `DashboardNavbar` para mobile/tablet: colapsar links centrais ou drawer/hambúrguer conforme spec de área autenticada (< 1024px)
- [x] Ajustar `CharacterCarousel`: grid em telas largas vs carrossel horizontal em mobile, se aplicável pela spec
- [x] Aplicar breakpoints (`md:`, `lg:`, `xl:`) no grid de atividades (1 col → 2 → 4 colunas)
- [x] Revisar tipografia fluida e espaçamentos (`clamp` / tokens existentes) no contexto do dashboard
- [x] Auditar transições de hover e troca de borda dos cards (sem jank; evitar animar propriedades custosas em massa)
- [x] Auditar performance de `box-shadow` / blur (glassmorphism) em listas longas de cards
- [x] Validar contraste de texto sobre imagens (gradiente inferior obrigatório nos cards de personagem e evento)
- [x] Testar navegação por teclado e `focus-visible` em links, dropdown, setas do carrossel e chips de missão
- [x] Testar fluxo completo com mocks em viewports: 320px, 768px, 1024px, 1280px, 1920px+
- [x] Registrar checklist de débitos técnicos para integração API (auth, loading, error boundaries, revalidação)

---

## Critérios de Conclusão (Definition of Done)

- [x] Página `/dashboard` renderiza todos os blocos da spec com dados mockados
- [x] Sub-conta e personagem ativo refletem estado visual coerente (dropdown ↔ cards)
- [x] Carrossel navegável por setas e/ou dots com feedback visual
- [x] Layout responsivo sem quebra de legibilidade em mobile
- [x] Nenhum segredo ou endpoint real exposto no cliente; tipos e mocks prontos para substituição por API
- [x] Código modular: componentes burros, estado na folha interativa mais baixa, sem acoplamento ao módulo público da Top Bar

---

## Referências

| Artefato | Caminho |
|----------|---------|
| Especificação visual e de componentes | [specify.md](./specify.md) |
| Plano temporal original | [plan.md](./plan.md) |
| Design tokens globais existentes | `src/app/globals.css` |
| Rotas da aplicação | `src/config/routes.ts` |
