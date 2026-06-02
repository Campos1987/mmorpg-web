---
name: check-a11y
description: Audits UI code for WCAG 2.1 AA, WAI-ARIA, semantic HTML, keyboard navigation, touch targets, and project design-system contrast. Use when the user invokes check-a11y, asks for an accessibility audit, a11y review, WCAG compliance, screen reader support, focus traps, or ARIA/keyboard issues.
disable-model-invocation: true
---

# Check A11y (Acessibilidade)

Quando invocado, o agente deve auditar o código para garantir:

1. Conformidade estrita com padrões WAI-ARIA.
2. Uso correto de elementos semânticos HTML (ex: `<nav>`, `<main>`, `<section>`).
3. Presença de atributos `aria-*` necessários em componentes interativos.
4. Contraste de cores conforme definido no `system-design.md`.
5. Navegabilidade completa via teclado.

## Pré-requisitos

1. Ler [.cursor/rules/system-desing.mdc](../../rules/system-desing.mdc) (seção 6 — Acessibilidade e tokens de cor).
2. Escopo da auditoria: arquivos indicados pelo usuário ou diff/PR em foco; se não houver escopo, priorizar `components/`, `app/` e layouts com formulários, navegação ou tabelas.
3. Abrir `tailwind.config` do projeto para validar tokens `brand.*` e classes de contraste/foco citadas nas regras.

## Fluxo de auditoria

```
Task Progress:
- [ ] Mapear superfícies interativas (botões, links, inputs, menus, modais, tabelas)
- [ ] Verificar HTML semântico e landmarks
- [ ] Verificar WAI-ARIA e nomes acessíveis
- [ ] Verificar contraste e tokens do design system
- [ ] Verificar teclado, foco e touch targets
- [ ] Entregar relatório com severidade e correções
```

### Passo 1 — HTML semântico e estrutura

| Verificar | Falha típica |
|-----------|----------------|
| Uma única `<main>` por página | Vários `<main>` ou conteúdo principal só em `<div>` |
| `<nav>` para navegação principal/secundária | Links de menu em `<div onClick>` |
| Hierarquia de headings (`h1` → `h2` …) sem saltos | `h3` após `h1` sem `h2` |
| Listas reais (`ul`/`ol`/`li`) para grupos de links/itens | Divs empilhadas simulando lista |
| `<button>` para ações; `<a href>` para navegação | `<div>`/`<span>` clicáveis sem role |
| Tabelas de dados com `<table>`, `<th scope>` | Layout de tabela só com CSS grid em divs sem equivalente acessível |

### Passo 2 — WAI-ARIA e nomes acessíveis

| Verificar | Falha típica |
|-----------|----------------|
| Todo controle tem **nome acessível** (texto visível, `aria-label`, ou `aria-labelledby`) | Ícone-only sem label |
| `aria-expanded`, `aria-controls`, `aria-haspopup` em menus/disclosure | Menu hamburger sem estado |
| `aria-current="page"` no item de nav ativo | Só classe visual `active` |
| `aria-live="polite"` em contadores dinâmicos (TvT, online, timers) | Atualização silenciosa para leitor de tela |
| `role` só quando HTML nativo não basta | `role="button"` em `<button>` redundante |
| Modais/drawers: `aria-modal="true"`, foco preso, retorno de foco ao fechar | Foco perdido ou tab escapa para fundo |
| Imagens: `alt` descritivo; decorativas `alt=""` ou `aria-hidden` | `alt` genérico ("image") ou ausente |
| Erros de formulário ligados ao campo (`aria-invalid`, `aria-describedby`) | Só cor vermelha sem texto anunciável |

Detalhes e padrões por widget: [reference.md](reference.md).

### Passo 3 — Contraste e design system

Validar contra **WCAG 2.1 AA** e tokens do projeto:

| Par texto/fundo | Mínimo |
|-----------------|--------|
| Texto normal | **4.5:1** |
| Texto grande (≥18px regular ou ≥14px bold) | **3:1** |
| Componentes UI e estados de foco | **3:1** contra adjacente |

**Combinações esperadas (dark mode):**

- Fundo primário: `bg-slate-950` / `brand.dark`
- Cards: `bg-slate-900` / `brand.card`
- Corpo: `text-slate-100`
- CTAs: `brand.cta` com texto legível (não assumir contraste sem verificar par real)
- Evitar texto em `text-slate-500`/`600` sobre `slate-900`/`950` para conteúdo essencial

Sinalizar uso de cores arbitrárias (`bg-[#...]`, `text-[#...]`) fora dos tokens. Sugerir tokens `brand.*` / escala `slate` documentados.

### Passo 4 — Teclado, foco e touch

| Verificar | Critério do projeto |
|-----------|---------------------|
| Ordem de tab lógica e visível | `focus:ring-2 focus:ring-brand-cta outline-none` em controles interativos |
| Sem `tabindex` positivo | Só `0` ou `-1` quando necessário |
| Atalhos: Enter/Space em botões; Escape fecha modal/drawer | Handler ausente em custom widgets |
| Skip link ou landmark para pular nav repetitiva | Páginas longas sem atalho |
| Touch targets mobile | `min-h-[48px] min-w-[48px]` (ou área clicável equivalente ≥48px) |
| Drawer mobile: `overflow-hidden` no body + focus trap | Scroll de fundo ou foco fora do menu |

### Passo 5 — Anti-padrões (rejeitar na auditoria)

| Anti-padrão | Por quê |
|-------------|---------|
| `outline-none` sem substituto de foco visível | Usuários de teclado ficam sem referência |
| `onClick` em não-interativo sem `onKeyDown` + role/tabindex | Inacessível por teclado e AT |
| `pointer-events-none` em controle essencial | Bloqueia interação |
| `aria-hidden="true"` em conteúdo focável | Contradiz foco e leitores de tela |
| Labels só com placeholder | Nome acessível some ao digitar |
| Título de página duplicado só visualmente | Falta `<title>` ou heading único `h1` |

## Formato de resposta (obrigatório)

Responder em **português**, nesta ordem:

### 1. Escopo

Arquivos/componentes auditados e critério (diff, rota, ou pasta).

### 2. Resumo executivo

Uma frase: **passa** / **passa com ressalvas** / **falha** para WCAG 2.1 AA no escopo analisado.

### 3. Achados

Para cada problema:

| Severidade | Significado |
|------------|-------------|
| 🔴 **Crítico** | Bloqueia uso com teclado ou leitor de tela; viola WCAG A/AA |
| 🟡 **Importante** | Degrada experiência; corrigir antes de release |
| 🟢 **Sugestão** | Melhoria alinhada ao design system |

Incluir: local (arquivo + trecho), regra violada, impacto, correção concreta (patch ou snippet).

### 4. Checklist rápido

Marcar `[x]` / `[ ]` para os 5 itens do escopo desta skill (WAI-ARIA, semântica, `aria-*`, contraste, teclado).

### 5. Verificação recomendada

Passos manuais objetivos: Tab pela página, leitor de tela (NVDA/VoiceOver), inspeção de contraste se cores novas.

## Recursos

- Regras de contraste, foco e touch: [system-desing.mdc](../../rules/system-desing.mdc)
- Checklist expandido por tipo de componente: [reference.md](reference.md)
