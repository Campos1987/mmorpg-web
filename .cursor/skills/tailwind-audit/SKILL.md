---
name: tailwind-audit
description: Audits Tailwind CSS utility class order, design-system tokens, cn() usage for conditional classes, and component visual complexity in JSX/TSX. Use when the user invokes a Tailwind audit, reviews className styling, asks about design system compliance, or flags arbitrary Tailwind values.
---

# Tailwind Audit

Quando invocado, o agente deve:

1. Verificar a ordem das classes utilitárias no JSX: Layout > Box Model > Tipografia > Decoração > Interatividade.
2. Validar se não existem valores arbitrários (ex: `w-[123px]`) que violem o design system.
3. Garantir o uso da função `cn()` (`clsx` + `tailwind-merge`) para classes condicionais.
4. Sugerir a extração de componentes se a complexidade visual exceder os padrões do `staffEngineer.md`.

## Pré-requisitos

1. Ler [.cursor/rules/staff-engineer.mdc](../../rules/staff-engineer.mdc) (seção Tailwind e SRP de componentes).
2. Ler `tailwind.config.ts` / `tailwind.config.js` do repositório (tokens `theme.extend`).
3. Localizar `cn()` — tipicamente `src/lib/utils.ts` ou `src/utils/cn.ts`. Se não existir, reportar como **bloqueador** e propor criação antes de refatorar condicionais.

## Escopo da auditoria

| Incluir | Excluir (salvo pedido explícito) |
|---------|----------------------------------|
| Arquivos citados pelo usuário | CSS modules / styled-components |
| `*.tsx`, `*.jsx` com `className` | `globals.css` (auditar só se pedido) |
| Componentes alterados no diff atual | node_modules |

Se o escopo não for informado, auditar os arquivos do contexto (diff, paths abertos ou `@` mencionados).

## Fluxo

```
Task Progress:
- [ ] Mapear arquivos e linhas com className
- [ ] Ordem das classes (Layout → Interatividade)
- [ ] Valores arbitrários vs tokens
- [ ] Condicionais → cn()
- [ ] Complexidade visual → extração de componentes
- [ ] Relatório + correções sugeridas
```

## 1. Ordem das classes

Para cada `className` (string literal ou argumento de `cn()`), validar grupos nesta ordem:

| Grupo | Exemplos |
|-------|----------|
| **Layout** | `flex`, `grid`, `block`, `relative`, `absolute`, `fixed`, `sticky`, `inset-*`, `top-*`, `z-*`, `col-*`, `row-*`, `order-*`, `float-*`, `clear-*`, `overflow-*`, `visible`, `hidden` |
| **Box Model** | `w-*`, `h-*`, `min-*`, `max-*`, `size-*`, `p-*`, `px-*`, `py-*`, `pt-*`, `m-*`, `mx-*`, `gap-*`, `space-*`, `border` (largura), `box-*`, `aspect-*` |
| **Tipografia** | `font-*`, `text-*` (tamanho/alinhamento), `leading-*`, `tracking-*`, `antialiased`, `truncate`, `line-clamp-*`, `whitespace-*`, `break-*`, `content-*` |
| **Decoração** | `bg-*`, `from-*`, `to-*`, `via-*`, `border-*` (cor/estilo), `rounded-*`, `ring-*`, `shadow-*`, `opacity-*`, `outline-*`, `fill-*`, `stroke-*`, `decoration-*` |
| **Interatividade** | `cursor-*`, `pointer-events-*`, `select-*`, `transition-*`, `duration-*`, `ease-*`, `animate-*`, `hover:`, `focus:`, `active:`, `disabled:`, `group-*`, `peer-*`, `motion-*` |

**Regras:**

- Variantes responsivas (`sm:`, `md:`, …) e de estado (`hover:`, `dark:`) mantêm a **mesma ordem relativa** do utilitário base; o grupo do utilitário define a posição (ex.: `md:hover:bg-brand-cta` → Decoração).
- `className` com mais de ~12 utilitários sem `cn()` merece revisão de legibilidade.
- Detalhes e exceções: [reference.md](reference.md).

## 2. Valores arbitrários e design system

**Proibido** (salvo exceção documentada):

- Colchetes com valor custom: `w-[123px]`, `bg-[#f3f3f3]`, `text-[13px]`, `p-[1.7rem]`
- Cores fora dos tokens: hex/rgb/hsl inline em classe

**Preferir:**

- Tokens do `tailwind.config` (`brand-*`, escala Tailwind `slate-*`, `red-*`, etc.)
- Variáveis CSS do design system (`var(--spacing-container)` em `globals.css` quando aplicável)

**Exceção permitida** (staff-engineer): propriedades **puramente dinâmicas** via props, ex. `style={{ width: progressPercent }}` ou `className` construído a partir de enum finito mapeado para tokens — nunca magic number solto no JSX.

Buscar padrão: `\[[^\]]+\]` em strings `className`.

## 3. Função `cn()` para condicionais

| Situação | Esperado |
|----------|----------|
| `className` estático | String literal ordenada (ok sem `cn`) |
| Ternário, `&&`, template com variável | `cn('base', condition && 'extra', className)` |
| `props.className` merge | `cn(defaults, className)` |
| Concatenação com `` `${a} ${b}` `` | **Violação** — migrar para `cn()` |

Implementação de referência do projeto (criar se ausente):

```ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

## 4. Complexidade visual e extração

Cruzar com [.cursor/rules/staff-engineer.mdc](../../rules/staff-engineer.mdc):

| Sinal | Ação sugerida |
|-------|----------------|
| Componente > **100 linhas** | Extrair subcomponentes visuais |
| `className` com > **3** ternários/`&&` encadeados | Extrair variantes ou subcomponente + `cn()` |
| Mesmo bloco de classes repetido em 2+ lugares | Extrair componente UI ou variant com `cva` |
| Lógica de negócio + markup denso no mesmo arquivo | Hook/service + componente apresentacional |
| Árvore JSX profunda só por estilo | Composição (`Card`, `CardHeader`, …) |

Sugestões devem nomear arquivos-alvo (`components/ui/...`) e responsabilidade (SRP).

## Formato de resposta (obrigatório)

Responder em **português**, nesta ordem:

### 1. Resumo

- Arquivos auditados
- Contagem: 🔴 crítico | 🟡 aviso | 🟢 ok

### 2. Achados

Por arquivo, tabela ou lista:

| Severidade | Linha | Regra | Atual | Sugestão |
|------------|-------|-------|-------|----------|
| 🔴 / 🟡 / 🟢 | … | ordem / arbitrário / cn / complexidade | trecho | correção |

### 3. Correções (se solicitado ou óbvias)

Patches mínimos: reordenar classes, substituir arbitrário por token, introduzir `cn()`, esboço de extração.

### 4. Verificação

- [ ] Nenhum `\[[^\]]+\]` indevido nas classes auditadas
- [ ] Condicionais passam por `cn()`
- [ ] Ordem Layout → Interatividade nos `className` tocados
- [ ] `npm run lint` / build se existir no projeto

## Recursos

- Ordem detalhada e regex: [reference.md](reference.md)
- Regras Staff Engineer: [staff-engineer.mdc](../../rules/staff-engineer.mdc)
- Tokens e breakpoints: [system-desing.mdc](../../rules/system-desing.mdc)
