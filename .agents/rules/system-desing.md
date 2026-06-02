---
alwaysApply: true
---

# Design System — Portal MMORPG (Lineage II)
> Extraído do código-fonte em 2026-05-31. Referência canônica para todo desenvolvimento.

---

## 1. Design Tokens — Cores

### Marca (`globals.css @theme`)
```
brand-dark:        #020617   → background primário do site
brand-card:        #0f172a   → superfície de cards e painéis
brand-cta:         #dc2626   → ações destrutivas, erros, CTA principal
brand-cta-hover:   #b91c1c   → hover de CTA
brand-gold:        #d97706   → avisos, destaques
brand-gold-hover:  #b45309   → hover gold
brand-logo:        #d4af37   → logo, bordas douradas
brand-logo-hover:  #e5c76b   → hover logo
brand-success:     #22c55e   → sucesso/confirmação
```

### Superfície Semântica
```
background → brand-dark
foreground → #f1f5f9    (texto principal)
muted      → #94a3b8    (texto secundário, placeholders)
border     → #1e293b    (divisores)
```

### Dashboard (Cyber-Fantasy)
```
dashboard-bg-deep:           #1a0b2e
dashboard-neon-blue:         #89ffff
dashboard-neon-purple:       #c084fc
dashboard-gold:              #fbbf24
dashboard-danger:            #ef4444
dashboard-success:           #22c55e
dashboard-muted:             #94a3b8
focus-ring:                  #365314
text-h1-content:             #E87722
```

### Status de Conta
```
PENDING   → amber-600/700/950 (badge: animate-pulse)
SUSPENDED → orange-700/800/950 (badge: animate-pulse)
BANNED    → red-700/800/950   (badge: static)
```

> **REGRA DE OURO:** Nunca use cores brutas do Tailwind (blue-500, purple-400…) fora do mapeamento acima. Novas cores entram como token em `globals.css @theme`.

---

## 2. Tipografia

### Fontes
```
font-serif: ui-serif, Georgia, "Times New Roman", serif   → H1–H3, títulos de cards, logo
font-sans:  ui-sans-serif, system-ui, …Inter…            → corpo, UI, formulários
```

### Escala Fluida (Fluid Typography)
```
text-fluid-h1:   clamp(1.5rem, 1.25rem + 1vw, 2.25rem)    → <h1> páginas
text-fluid-h2:   clamp(1.25rem, 1.1rem + 0.75vw, 1.75rem)  → <h2> SectionCard
text-fluid-h3:   clamp(1.125rem, 1rem + 0.5vw, 1.375rem)   → <h3> sub-seções
text-fluid-base: clamp(1rem, 0.875rem + 0.39vw, 1.25rem)   → corpo padrão
text-sm:         0.875rem → labels, erros
text-xs:         0.75rem  → nav, badges, micro-texto
```

### Pesos e Decoração
```
H1 (página):       font-serif font-bold uppercase tracking-[1.2px]
H2 (SectionCard):  font-serif font-semibold tracking-tight text-gray-200
Nav links:         font-medium uppercase tracking-wide text-amber-100
Botões:            font-semibold tracking-wide text-sm
Corpo:             font-sans (padrão)
```

---

## 3. Layout e Espaçamento

### Containers Globais
```
container-content:
  max-w-1920px | margin: 50px auto | padding-inline: clamp(1rem,5vw,4rem)
  bg-[#111111] | border-top/bottom: brand-logo/25% | rounded-xl | shadow

container-grid:
  display:grid | max-w-1920px | grid-cols: repeat(var(--grid-columns),1fr)
  gap: var(--grid-gutter)
```

### Grid Responsivo (Mobile-First)
```
base (< 768px): 4 colunas, gutter 1rem
md (≥ 768px):   8 colunas, gutter 1.5rem
lg+ (≥ 1024px): 12 colunas, gutter 2rem
```

### TopBar Grid
```
h-16 | max-xl: grid-cols-[1fr_auto] | xl: grid-cols-[auto_1fr_auto]
```

### Escala de Espaçamento Padrão
```
p-4, p-6, p-8          → padding de cards e páginas
gap-3, gap-4, gap-5    → gaps de formulários e grids
space-y-4, space-y-6, space-y-8  → espaço vertical entre seções
px-4 min-h-12          → inputs (padrão obrigatório)
rounded-xl             → cards
rounded-lg             → inputs, botões, alertas
rounded-full           → badges, pills, avatares
```

---

## 4. Componentes — Padrões Canônicos

### 4.1 Inputs
```
SEMPRE use formControlClassName de @/lib/form-control-styles.ts:
  min-h-12 w-full rounded-lg border bg-olive-900/30 px-4 text-sm text-foreground
  placeholder:text-muted focus-ring

  Estado default: border-lime-500/10
  Estado erro:    border-brand-cta
```

### 4.2 Botões de Formulário (`<FormButton>`)
```
SEMPRE use <FormButton variant="...">. Nunca crie <button> manuais em forms.

primary → lime gradient (login, ações de auth)
danger  → bg-brand-cta-hover → hover:bg-brand-cta (senha, destrutivo)
success → bg-green-700 → hover:bg-green-600 (salvar, confirmar)

Base de todos:
  focus-ring inline-flex w-full items-center justify-center gap-2
  rounded-lg px-5 py-2.5 text-sm font-semibold tracking-wide transition-dashboard
  disabled:cursor-not-allowed disabled:bg-olive-900/10 disabled:text-olive-500/80
```

### 4.3 Botão TopBar (`.bt-top-bar-button` / `.bt-user-menu-btn`)
```
Gradiente metálico âmbar/bronze (não replicar inline — usar as classes CSS globais)
clip-path: polygon(20% 0%, 100% 0, 100% 100%, 0% 100%)
Efeito brilho ::before no hover
Texto: Georgia serif, bold, uppercase, color:#1f1a10
min-h:42px | min-w:200px
```

### 4.4 SectionCard (Dashboard)
```
<section aria-labelledby={headingId}>
  <div: border border-olive-800 rounded-xl p-6 space-y-6>
    <header: flex items-stretch gap-3 border-b border-olive-800 pb-4>
      <div: flex w-12 items-center justify-center rounded-lg bg-brand-cta/20 ring-1 ring-brand-cta/40>
        <Icon: size-6 text-brand-cta aria-hidden>
      <div: flex-1>
        <h2: text-fluid-h2 mt-0 text-gray-200>
        <p: mt-1 text-sm text-muted>
    {children}
```

### 4.5 Páginas de Status de Conta
```
container-content flex min-h-[70vh] w-full max-w-md
  items-center justify-center rounded-xl p-8 py-16
  
  <div role="alert" aria-labelledby aria-describedby>
    Ícone: size-20 rounded-full border-{color}/50 bg-{color}-950/60
    Badge: rounded-full border px-3 py-1 text-xs uppercase tracking-widest
    H1:    font-serif text-2xl font-bold text-{color}-300
    Desc:  text-sm text-slate-300 / text-slate-400
    Div:   h-px bg-gradient via-{color}-900/50 (divisor)
    Link:  text-xs text-{color}-400/70 underline
    Btn1:  border border-{color}-700/50 bg-{color}-900/20 hover:bg-.../40
    Btn2:  text-slate-400 hover:text-slate-200 (ghost, ArrowLeft icon)
```

### 4.6 AlertNote
```
role="note" rounded-lg border px-4 py-3 text-sm space-y-1

gold:  border-dashboard-gold/50   bg-dashboard-gold/10
error: border-brand-cta/40        bg-brand-cta/10
info:  border-dashboard-neon-blue/30 bg-dashboard-neon-blue/5
```

### 4.7 FeedbackBadge (Server Actions)
```
role="alert" aria-live="polite" aria-atomic="true"
flex items-start gap-3 rounded-lg border px-4 py-3 text-sm transition-dashboard

success: border-dashboard-success/30 bg-dashboard-success/10 text-dashboard-success
error:   border-brand-cta/30        bg-brand-cta/10        text-brand-cta
```

### 4.8 Nav Links (TopBar)
```
focus-ring inline-flex min-h-12 items-center justify-center px-2 xl:px-3
text-xs xl:text-sm font-medium uppercase tracking-wide
text-amber-100 hover:text-brand-gold transition-colors
```

### 4.9 Nav Dropdown Panel
```
bg-[#111111]/95 backdrop-blur-sm
border border-[#d4af37]/20
rounded-sm shadow-[0_4px_20px_rgba(0,0,0,0.8)] py-1
pointer-events-none invisible translate-y-1 opacity-0
transition-all duration-200 ease-out
group-hover: → pointer-events-auto visible translate-y-0 opacity-100
```

### 4.10 Navigation Drawer (Mobile)
```
Panel: w-full max-w-sm | bg-brand-card | border-l border-border | shadow-xl
       transition-transform duration-300 ease-out
       open: translate-x-0 | closed: translate-x-full
Header: min-h-16 border-b border-border px-4
        font-serif text-lg font-bold text-foreground → "Menu"
Overlay: bg-brand-dark/80 transition-opacity duration-300
```

---

## 5. Utilitários Globais

| Utilitário | Comportamento |
|---|---|
| `focus-ring` | outline:none + :focus-visible { outline:2px #365314, offset:2px, box-shadow } |
| `transition-dashboard` | transition: color, bg, border, shadow, opacity; 300ms ease-in-out |
| `glass-panel` | bg-slate-900/55, border-[#89ffff]/15, backdrop-blur-12px |
| `neon-border-blue` | border + box-shadow neon azul |
| `neon-border-purple` | border + box-shadow neon roxo |
| `scrollbar-none` | oculta scrollbar cross-browser |

---

## 6. Acessibilidade — Checklist Obrigatório

```
✅ min-h-12 (48px) em todos os botões e links interativos (WCAG 2.5.5)
✅ focus-ring em todo elemento focável (WCAG 2.4.7)
✅ aria-hidden="true" em ícones decorativos (WCAG 4.1.2)
✅ role="dialog" aria-modal aria-labelledby nos drawers (WCAG 4.1.2)
✅ role="alert" aria-live="polite" no FeedbackBadge (WCAG 4.1.3)
✅ role="note" no AlertNote — não é urgente (WCAG 4.1.2)
✅ <fieldset> + <legend> em grupos de formulário (WCAG 1.3.1)
✅ role="alert" aria-labelledby aria-describedby nas páginas de status (WCAG 4.1.2)
✅ Contraste mínimo 4.5:1 texto/fundo (WCAG 1.4.3) — validado em todos os componentes
```

---

## 7. Regras de Ouro (Nunca Violar)

1. **Cores**: Apenas tokens documentados acima. Nenhuma cor bruta do Tailwind fora do mapeamento.
2. **Inputs**: Sempre `formControlClassName` de `@/lib/form-control-styles.ts`.
3. **Botões de form**: Sempre `<FormButton>`. Nunca `<button>` manual em formulários.
4. **Cards**: `<SectionCard>` para dashboard. Padrão `container-content + role="alert"` para páginas de aviso.
5. **Tipografia**: `font-serif` só em headings. Corpo sempre `font-sans`.
6. **Espaçamento**: Escala definida na seção 3. Sem padding/margin ad-hoc.
7. **Transições**: `transition-dashboard` como classe utilitária. `300ms ease-in-out`.
8. **Acessibilidade**: `aria-*` obrigatório em componentes interativos. Nenhum elemento não-interativo com `cursor-not-allowed` ou `focus-ring`.
9. **Responsividade**: Mobile-First. Drawer mobile para `< xl`. Nav horizontal para `xl+`.
10. **Status de conta**: `PENDING=amber`, `SUSPENDED=orange`, `BANNED=red`. Estrutura das páginas idêntica à documentada em 4.5.
