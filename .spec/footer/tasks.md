# Roteiro de Implementação — Rodapé (Footer)

> Baseado em [specify.md](./specify.md) e [plan.md](./plan.md).  
> Diretrizes: [.cursor/rules/staff-engineer.mdc](../../.cursor/rules/staff-engineer.mdc) e [.cursor/rules/system-desing.mdc](../../.cursor/rules/system-desing.mdc).

---

## Regra de Execução

> **Aguardar revisão do usuário ao concluir cada fase** antes de iniciar a fase seguinte.

---

## Fase 1: Fundação e Contratos ✅

Confirmar pré-requisitos do design system (já entregues na Top Bar) e preparar rotas/contratos antes de qualquer UI.

- [x] Confirmar que tokens Tailwind, `cn()`, fontes (`Cinzel`/`Inter`), breakpoints e `focus-ring` estão operacionais (reutilizar fundação da Top Bar)
- [x] Estender `ROUTES` em `src/config/routes.ts` com caminhos do rodapé ainda ausentes: Suporte, EULA, Privacidade, Termos de Uso e Preferências de Cookies (placeholders até as páginas existirem)
- [x] Definir constantes de URLs externas (Discord, Reddit) em módulo de config dedicado (ex.: `src/config/footer-links.ts` ou variáveis de ambiente documentadas), separado da camada de apresentação
- [x] Criar tipos TypeScript para itens do rodapé: link interno (`label`, `href: AppRoute`), link externo (`label`, `href`, `isExternal: true`) e item social (`label`, `href`, `icon` ou slot de ícone)
- [x] Documentar convenção de nomenclatura (ex.: `FooterSocialLink`, `FooterQuickLink`, `currentYear` para copyright)

---

## Fase 2: Modelo de Dados Estático ✅

Arrays tipados e fonte única da verdade antes do layout visual.

- [x] Montar array estático **Redes Sociais e Comunidade** conforme a spec: Discord e Reddit (URLs externas, `rel="noopener noreferrer"`, `target="_blank"` quando aplicável)
- [x] Montar array estático **Atalhos Rápidos**: Downloads, Regras e Suporte (reutilizando `ROUTES` existentes onde couber)
- [x] Montar array estático **Área Legal**: EULA, Aviso de Privacidade, Termos de Uso e Preferências de Cookies
- [x] Definir metadados de seção (título/heading por coluna) para reutilização em desktop e mobile
- [x] Garantir que nenhum dado sensível ou segredo de API apareça nos arrays estáticos exportados ao cliente

---

## Fase 3: Estrutura do Componente (Server-First) ✅

Shell do rodapé como RSC, sem interatividade de cliente desnecessária.

- [x] Definir estrutura de pastas modular (ex.: `src/components/layout/footer/`) respeitando SRP
- [x] Criar componente raiz `Footer` como Server Component (sem `'use client'`)
- [x] Envolver o rodapé em `<footer>` semântico com `role="contentinfo"` implícito
- [x] Implementar container com fundo escuro coerente com tokens (`bg-background` / `bg-slate-950` ou equivalente semântico do tema)
- [x] Criar subcomponente `FooterSection` (título + lista de links) reutilizável para as três colunas de conteúdo
- [x] Exportar barrel `index.ts` com API pública mínima (`Footer` e subcomponentes necessários ao layout)

---

## Fase 4: Seção Redes Sociais e Comunidade ✅

Primeira coluna de conteúdo conforme specify.

- [x] Criar `FooterSocialSection` que itera sobre o array estático da Fase 2
- [x] Implementar `FooterSocialLink` com `next/link` (externo) ou `<a>` nativo para URLs absolutas
- [x] Adicionar ícones acessíveis (SVG inline ou componente de ícone) com `aria-label` descritivo por rede
- [x] Garantir alvos de toque mínimos de **48×48px** nos ícones/links sociais
- [x] Aplicar `focus-ring` e transição de cor no hover alinhada ao tema (brilho/neon ou `hover:text-brand-gold`)

---

## Fase 5: Seção Atalhos Rápidos ✅

Segunda coluna — mapa secundário de páginas cruciais.

- [x] Criar `FooterQuickLinksSection` com heading visível (ex.: "Atalhos" ou rótulo da spec)
- [x] Implementar `FooterLink` para rotas internas via `next/link` e `AppRoute`
- [x] Vincular Downloads → `ROUTES.DOWNLOADS`, Regras → `ROUTES.RULES`, Suporte → rota definida na Fase 1
- [x] Reutilizar padrões de tipografia e espaçamento da Top Bar (`text-sm`, uppercase opcional conforme hierarquia do rodapé)
- [x] Aplicar estados hover/focus consistentes com a Fase 4

---

## Fase 6: Seção Legal e Conformidade ✅

Terceira coluna — conformidade e políticas.

- [x] Criar `FooterLegalSection` com heading acessível (ex.: "Legal" ou "Informações legais")
- [x] Listar EULA, Aviso de Privacidade, Termos de Uso e Preferências de Cookies a partir do array estático
- [x] Definir comportamento de **Preferências de Cookies**: link para rota placeholder ou âncora documentada até existir modal/painel (sem `'use client'` nesta entrega, salvo requisito futuro explícito)
- [x] Garantir que links legais usem rotas internas tipadas; evitar URLs hardcoded espalhadas no JSX

---

## Fase 7: Copyright e Ano Dinâmico ✅

Faixa inferior de direitos autorais.

- [x] Criar `FooterCopyright` como subcomponente do `Footer`
- [x] Exibir ano dinâmico via `new Date().getFullYear()` no servidor (RSC), sem hidratação client-side
- [x] Incluir mensagem padrão de reserva de direitos e menção às marcas registradas do servidor/jogo (texto configurável em constante)
- [x] Separar visualmente a faixa de copyright das colunas de links (borda superior sutil ou espaçamento com tokens do tema)

---

## Fase 8: Layout Responsivo ✅

Comportamento mobile-first conforme specify e system-design.

- [x] Implementar grid/flex das três seções: **colunas lado a lado no desktop** (`lg:` ou breakpoint definido no projeto)
- [x] Empilhar seções **verticalmente no mobile** (`flex-col` / `grid-cols-1`) com espaçamento fluido (`clamp` ou tokens de spacing)
- [x] Limitar largura do conteúdo em viewports ultrawide (container central, alinhado ao padrão da Top Bar)
- [x] Garantir que o rodapé não comprima o `<main>` — posicionar após `children` no fluxo do layout (`flex-1` no main já existente)
- [x] Validar legibilidade e contraste das colunas empilhadas em viewports &lt; 640px

---

## Fase 9: Integração no RootLayout ✅

Persistência global do rodapé em todas as páginas públicas.

- [x] Importar e renderizar `<Footer />` em `src/app/layout.tsx`, abaixo de `<main id="main-content">`
- [x] Manter `TopBar` + `main` + `Footer` na hierarquia `flex min-h-full flex-col` do `body`
- [x] Confirmar que nenhuma página filha duplica o rodapé
- [x] Revisar ordem de tabulação: conteúdo principal → rodapé (links navegáveis após o main)

---

## Fase 10: Acessibilidade, Performance e Qualidade ✅

Conformidade WCAG e padrões Staff Engineer.

- [x] Usar HTML semântico: `<footer>`, `<nav>` por seção de links, listas `<ul>/<li>`
- [x] Associar headings de seção com hierarquia correta (`h2` ou `h3` conforme outline da página)
- [x] Marcar links externos com indicação acessível (texto visível ou `aria-label` quando só ícone)
- [x] Garantir navegação completa por teclado e anéis de foco visíveis em todos os links e ícones
- [x] Proibir valores arbitrários no Tailwind; usar apenas tokens do tema e utilitário `cn()`
- [x] Confirmar zero JavaScript de cliente no rodapé nesta entrega (permanecer 100% RSC)
- [x] Executar `npm run lint` e `npm run build` sem erros após integração

---

## Fase 11: Verificação Manual e Critérios de Aceite

Checklist final contra a spec.

- [ ] Três categorias visíveis: Redes Sociais, Atalhos Rápidos e Legal
- [ ] Discord e Reddit abrem destino correto em nova aba (externo) com segurança (`noopener`)
- [ ] Downloads, Regras e Suporte navegam para rotas internas corretas
- [ ] Todos os quatro itens legais estão presentes e clicáveis
- [ ] Copyright exibe ano atual e texto de marcas registradas
- [ ] Desktop: colunas distribuídas horizontalmente; Mobile: colunas empilhadas
- [ ] Hover perceptível em links e ícones (efeito neon/brilho ou cor de destaque do tema)
- [ ] Contraste e legibilidade adequados no tema escuro
- [ ] Rodapé presente em todas as rotas que usam `RootLayout` (home, login, registro, etc.)

---

## Escopo Futuro (fora desta entrega inicial)

Itens do [plan.md](./plan.md) não exigidos pela [specify.md](./specify.md) imediata:

- [ ] Dropdowns flutuantes no rodapé para Rankings e Comunidade (spec da Top Bar já cobre navegação principal)
- [ ] Modal ou painel client-side de preferências de cookies (CMP) com `'use client'` isolado
- [ ] Internacionalização (i18n) dos rótulos e textos legais
- [ ] Testes automatizados (snapshot do Footer, links externos com `rel` correto)
- [ ] Variante de rodapé reduzido para área autenticada (se produto exigir layout diferente do portal público)

---

## Ordem de Execução Recomendada

```text
Fase 1 → Fase 2 → Fase 3 → Fase 4 → Fase 5 → Fase 6 → Fase 7 → Fase 8 → Fase 9 → Fase 10 → Fase 11
```

> **Regra:** não montar seções visuais (Fases 4–7) antes de concluir arrays estáticos tipados (Fase 2) e contratos de rotas (Fase 1). Não integrar no `RootLayout` (Fase 9) antes do layout responsivo (Fase 8). Evitar `'use client'` no rodapé nesta entrega — o componente deve permanecer Server Component de ponta a ponta.
