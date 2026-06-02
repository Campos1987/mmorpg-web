---
name: analyze-error
description: Analyzes logs and stack traces for Next.js App Router apps, classifies server (RSC) vs client errors, validates fixes against staff-engineer rules, and proposes secure performant corrections without band-aids. Use when the user shares an error, stack trace, build failure, runtime exception, hydration mismatch, or asks to debug or fix a crash.
---

# Analyze Error

Quando invocado, o agente deve:

1. Analisar o log ou stack trace fornecido.
2. Identificar se o erro ocorreu no servidor (RSC) ou no cliente (Client Component).
3. Verificar se a solução proposta respeita as diretrizes do `staffEngineer.md` (Next.js App Router).
4. Fornecer a correção focada em performance e segurança, evitando soluções paliativas.

## Pré-requisitos

1. Ler [.cursor/rules/staff-engineer.mdc](../../rules/staff-engineer.mdc) antes de propor correção.
2. Se o stack trace citar arquivos do repositório, abrir esses arquivos e confirmar `'use client'`, imports e boundary de renderização.

## Fluxo de análise

```
Task Progress:
- [ ] Extrair mensagem, código/cause e frames relevantes do log
- [ ] Classificar: servidor (RSC) | cliente | build | edge
- [ ] Identificar causa raiz (não só sintoma)
- [ ] Validar correção contra staff-engineer
- [ ] Entregar fix estrutural + verificação
```

### Passo 1 — Parse do log

Extrair e citar:

| Campo | O que buscar |
|-------|----------------|
| Tipo | `Error`, `TypeError`, `Hydration failed`, `ECONNREFUSED`, `ZodError`, etc. |
| Mensagem | Texto após `Error:` ou bloco `message` |
| Local | Primeiro frame **do projeto** (não `node_modules`/`next/dist`) |
| Contexto | Rota (`app/...`), Server Action, `fetch`, middleware, build |

Se o log estiver incompleto, pedir apenas o mínimo: stack completo, rota/ação, e se ocorreu em dev ou produção.

### Passo 2 — Servidor (RSC) vs cliente

| Indício | Provável ambiente |
|---------|-------------------|
| Stack em `next/dist/server`, `react-server-dom`, build/compile | **Servidor / RSC** |
| Arquivo sem `'use client'` em `app/` ou importado só por Server Components | **Servidor / RSC** |
| `Hydration failed`, `Text content does not match`, erro no browser console | **Cliente** |
| Stack em arquivo com `'use client'` ou hooks (`useState`, `useEffect`) | **Cliente** |
| `window is not defined` / `document is not defined` em Server Component | **Erro de boundary** — código de cliente no servidor |
| Import de `server-only`, DB, `fs`, env secreta em Client Component | **Violação de boundary** |

**Regra:** boundary errada quase sempre exige mover lógica (não `typeof window` guards espalhados).

### Passo 3 — Causa raiz e anti-paliativo

Rejeitar correções que apenas mascaram o problema:

| Paliativo (evitar) | Correção estrutural |
|--------------------|---------------------|
| `any`, `@ts-ignore`, `as unknown as T` | Tipos corretos, Zod, type guards |
| `suppressHydrationWarning` sem corrigir divergência | Mesma marcação servidor/cliente; evitar `Date.now()`/random no SSR |
| `'use client'` no topo de árvore grande | `'use client'` na folha mínima interativa |
| `useEffect` + fetch para dado que pode ser RSC | `fetch` no servidor + cache/`revalidateTag` |
| API route só para contornar Server Action | Server Action + Zod no servidor |
| `dangerouslySetInnerHTML` para “consertar” markup | Sanitizar origem; corrigir serialização |
| try/catch vazio ou log ignorado | Tratar erro, fallback UI, `ErrorBoundary` granular |
| `useMemo`/`memo` sem evidência de gargalo | Composição, menos client JS, dados no servidor |

### Passo 4 — Checklist staff-engineer

Antes de fechar a correção, confirmar:

- [ ] **Server-first:** RSC por padrão; `'use client'` só na folha necessária
- [ ] **Dados/mutações:** `fetch` com cache adequado; mutações via Server Actions + **Zod**
- [ ] **Segurança:** sem segredos no cliente; `server-only` onde aplicável; inputs validados
- [ ] **TypeScript:** sem `any`; assertions só com justificativa explícita
- [ ] **Resiliência:** `error.tsx` / `ErrorBoundary` quando falha de renderização for esperada
- [ ] **Performance:** não inflar bundle cliente; `next/image`, `next/font`, `dynamic` quando couber
- [ ] **Domínio:** lógica de negócio em services/hooks, não em componentes inchados

Se a correção violar o checklist, documentar o risco e propor a alternativa alinhada.

## Formato de resposta (obrigatório)

Responder em português, nesta ordem:

### 1. Diagnóstico

- **Ambiente:** Servidor (RSC) | Cliente | Build | Boundary
- **Causa raiz:** uma frase clara
- **Evidência:** trecho do log/stack (citar frames do projeto)

### 2. Análise de riscos (se aplicável)

Impacto em segurança, performance ou manutenção se o erro não for corrigido estruturalmente.

### 3. Correção

- Arquivos e mudanças concretas (código completo quando for patch pequeno)
- Por que **não** é paliativo

### 4. Verificação

Passos objetivos: comando (`npm run build`, teste manual), rota, caso de borda.

### 5. Justificativa (Staff Engineer)

Uma linha ligando a fix a RSC vs client, segurança e performance.

## Padrões frequentes (Next.js App Router)

| Sintoma | Causa comum | Direção de fix |
|---------|-------------|----------------|
| Hydration mismatch | HTML diferente SSR vs cliente | Alinhar render; `suppressHydrationWarning` só se inevitável e documentado |
| `Event handlers cannot be passed to Client Component props` | Função criada em Server Component passada a Client | Server Action ou wrapper client na folha |
| `You're importing a component that needs X. It only works in a Client Component` | Hook/API de browser em RSC | Extrair subcomponente `'use client'` mínimo |
| `Module not found: Can't resolve 'fs'` | Import server em client | `server-only` + mover para camada servidor |
| Serialização de props falha | Objeto não serializável (Date, Map, função) | DTO plain + Zod parse no boundary |

## Recursos

- Regras completas: [staff-engineer.mdc](../../rules/staff-engineer.mdc)
- Padrões de stack e mensagens Next: [reference.md](reference.md)
