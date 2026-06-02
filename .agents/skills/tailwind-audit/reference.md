# Tailwind Audit — Referência

## Ordem fina dentro de cada grupo

Quando dois utilitários pertencem ao mesmo grupo, preferir:

**Layout:** display → position → inset/top/right/bottom/left → z-index → flex/grid container → flex/grid item  
**Box:** width/height/min/max → padding → margin → gap/space → border-width  
**Tipografia:** font-family → font-size → font-weight → leading → tracking → text-align → text-color (se não tratado como decoração)  
**Decoração:** background → border-color/style → radius → ring → shadow → opacity  
**Interatividade:** cursor → transition → motion → pseudo-variants por último no bloco lógico

## Exemplo — ordem correta

```tsx
<button
  className={cn(
    'relative flex min-h-12 w-full items-center justify-center',
    'px-4 py-3',
    'font-sans text-sm font-medium',
    'rounded-md bg-brand-cta text-white shadow-md',
    'transition-colors hover:bg-brand-cta-hover focus:ring-2 focus:ring-brand-cta focus:outline-none',
    isDisabled && 'pointer-events-none opacity-50',
    className,
  )}
/>
```

## Exemplo — violações comuns

```tsx
// ❌ Ordem: decoração antes de layout
<div className="bg-slate-900 flex p-4" />

// ❌ Arbitrário
<div className="w-[432px] bg-[#0f172a]" />

// ❌ Condicional sem cn
<div className={`flex ${active ? 'bg-brand-cta' : 'bg-brand-card'}`} />

// ✅ Equivalente
<div className={cn('flex', active ? 'bg-brand-cta' : 'bg-brand-card')} />
```

## Detecção de arbitrários

Regex útil em buscas (`rg`):

```text
className=["'`][^"'`]*\[[^\]]+\]
```

Classes arbitrárias Tailwind v3+ usam colchetes: `*-[\*]`.

**Não flagar** (não são arbitrary values de design):

- `prose` plugins, `@apply` em CSS
- `data-[state=open]:` (variantes com colchetes de atributo — válidas; grupo segue utilitário base)

**Flagar:**

- Dimensões/cores literais: `w-[123px]`, `min-h-[48px]` → preferir escala (`min-h-12`) ou token
- Hex/rgb: `text-[#fff]`, `bg-[rgb(0,0,0)]`

## Tokens esperados (projeto MMORPG)

Conforme `system-desing.mdc` e `tailwind.config`:

| Uso | Preferir |
|-----|----------|
| Fundo página | `bg-brand-dark` / `bg-slate-950` |
| Card | `bg-brand-card` / `bg-slate-900` |
| CTA | `bg-brand-cta`, `hover:bg-brand-cta-hover` |
| Sucesso | `bg-brand-success` / `text-green-500` |
| Títulos | `font-serif` |
| Corpo | `font-sans` |

Atualizar esta tabela após mudanças em `tailwind.config`.

## Complexidade — limiares numéricos

| Métrica | Limiar | Severidade |
|---------|--------|------------|
| Linhas do arquivo `.tsx` | > 100 | 🟡 extrair componente |
| Linhas do arquivo `.tsx` | > 200 | 🔴 extrair obrigatório |
| Utilitários em um `className` | > 15 | 🟡 dividir ou `cn` com comentário de grupo |
| Condicionais de classe | > 3 | 🟡 extrair variant |
| Profundidade JSX (só tags) | > 6 níveis | 🟡 composição |

## Integração com lint

Se o projeto adicionar `eslint-plugin-tailwindcss` ou Prettier plugin de ordenação, mencionar no relatório e alinhar sugestões ao que o CI já enforce.
