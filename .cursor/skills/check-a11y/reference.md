# Check A11y — Referência por componente

Consultar apenas quando o escopo da auditoria incluir o widget listado.

## Navegação e layout

| Widget | Requisitos |
|--------|------------|
| Header / nav principal | `<nav aria-label="...">`; item ativo com `aria-current="page"` |
| Breadcrumb | `<nav aria-label="Breadcrumb">`; último item `aria-current="page"` |
| Skip link | Primeiro focoável: link para `#main` ou `<main id="main">` |
| Sidebar (desktop) | Landmark `<aside>` ou nav nomeada; links com texto ou `aria-label` |
| Drawer (mobile) | Botão abre com `aria-expanded`; painel `aria-modal` ou dialog; focus trap; Escape fecha |

## Formulários

| Campo | Requisitos |
|-------|------------|
| Input | `<label htmlFor>` ou `aria-labelledby`; `autocomplete`/`inputMode` quando aplicável |
| Erro | `aria-invalid="true"`; mensagem com `id` referenciado em `aria-describedby` |
| Senha | Botão mostrar/ocultar com `aria-label` (não só ícone) |
| Checkbox/radio | `<label>` associado; grupo com `fieldset` + `legend` se múltiplos relacionados |
| Submit | `<button type="submit">`; estado loading com `aria-busy` ou texto visível |

## Botões e links

| Tipo | Requisitos |
|------|------------|
| Botão ação | `<button type="button|submit">`; disabled com `disabled` ou `aria-disabled` + lógica |
| Link externo | `target="_blank"` → aviso em texto ou `aria-label` (“abre em nova aba”) |
| Ícone only | `aria-label` descritivo ou texto visually hidden (`sr-only`) |
| Toggle | `aria-pressed` ou `aria-checked` conforme padrão |

## Tabelas e dados

| Modo | Requisitos |
|------|------------|
| Desktop `<table>` | `<caption>` ou `aria-label`; `<th scope="col|row">` |
| Mobile cards | `data-label` + CSS ou lista com nomes acessíveis por célula |
| Sort/filter | Cabeçalho sortable: `aria-sort="ascending|descending|none"` |

## Feedback e dinâmico

| Widget | Requisitos |
|--------|------------|
| Toast/alert | `role="status"` ou `role="alert"` conforme urgência |
| Spinner loading | `aria-live="polite"` + texto “Carregando…” ou `aria-label` |
| Contador TvT/online | `aria-live="polite"` no container que muda |
| Tabs | `role="tablist"`, tabs com `aria-selected`, painéis `aria-labelledby` |

## Modais e confirmações críticas

1. Abrir: mover foco para primeiro elemento do diálogo.
2. Tab cicla dentro do modal (focus trap).
3. Escape e botão fechar com nome acessível.
4. Fechar: restaurar foco no elemento que abriu.
5. Ações irreversíveis: texto explícito do impacto (regra de negócio do portal).

## Contraste — pares comuns no dark mode

Validar combinação real usada no JSX/CSS (não só token isolado):

| Uso | Fundo | Texto mínimo |
|-----|-------|--------------|
| Corpo | `slate-950` | `slate-100` |
| Card | `slate-900` | `slate-100` / `slate-200` |
| Texto secundário | `slate-900` | preferir `slate-300`+, não `slate-600` para parágrafos longos |
| CTA | `brand.cta` | branco ou `slate-50` com contraste ≥4.5:1 |

Ferramentas aceitas na verificação: DevTools Accessibility, axe, ou cálculo manual WCAG.

## Teclado — mapa mínimo

| Tecla | Comportamento esperado |
|-------|------------------------|
| Tab / Shift+Tab | Percorre focáveis na ordem visual lógica |
| Enter | Ativa botão/link focado |
| Space | Toggle em botões/checkbox; scroll em página se não consumido |
| Escape | Fecha modal, drawer, dropdown |
| Arrow keys | Listas/menus/tabs quando padrão ARIA de composite widget |
