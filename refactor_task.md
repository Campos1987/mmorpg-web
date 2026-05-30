# 🛡️ Plano de Refatoração — Acessibilidade & UX (WCAG 2.1 AA)
## Telas: Dados Cadastrais · Alterar Senha

> [!IMPORTANT]
> **Aguardando aprovação antes de qualquer modificação de código.**
> Arquivos-alvo: `UserProfileForm.tsx`, `FormField.tsx`, `FormTextInput.tsx`

---

## Análise do Estado Atual — Code Smells Identificados

| # | Problema | Arquivo | Localização | Regra WCAG / Boa Prática |
|---|----------|---------|-------------|--------------------------|
| 1 | `text-gray-300` hardcoded (não é token do design system) | `UserProfileForm.tsx` | L270, L408 | WCAG 1.4.3 — Contraste mínimo 4.5:1 |
| 2 | `ReadOnlyField` renderiza `<label>` + `<li>` mas o `id` aponta para um elemento inexistente (sem `<input>`) | `UserProfileForm.tsx` | L84–L111 | WCAG 1.3.1 — Info e Relações |
| 3 | Mensagem de "Atenção" da data de nascimento usa `focus-ring` e `cursor-not-allowed` indevidamente num `<div>` não-interativo | `UserProfileForm.tsx` | L321–L327 | WCAG 4.1.2 — Nome, Função, Valor |
| 4 | `FormField` com `label=""` para o campo de data de nascimento — label vazia renderiza sem rótulo | `UserProfileForm.tsx` | L329–L333 | WCAG 1.3.1, 2.4.6 |
| 5 | `ReadOnlyField` valores sem `<output>` ou `<dd>` semânticos; usa lista (`<ul>/<li>`) sem semântica de dados | `UserProfileForm.tsx` | L96–L111 | WCAG 1.3.1 |
| 6 | Critérios de senha: todos os ítens usam `<CheckCircle2>` fixo, nunca troca de ícone quando inválido | `UserProfileForm.tsx` | L586–L596 | UX / WCAG 1.4.1 — Uso de Cor |
| 7 | Botão de "Salvar Data" e "Alterar Senha" com `text-white/80` (opacidade 80%) sobre verde escuro: contraste < 4.5:1 | `UserProfileForm.tsx` | L370, L614 | WCAG 1.4.3 |
| 8 | `FormTextInput` sem `aria-required` nativo ao nível do `<input>` (apenas propagado por `...props`) — verificar que flui corretamente | `FormTextInput.tsx` | L28 | WCAG 4.1.2 |
| 9 | `focus-ring` definido em `globals.css` usa `var(--color-focus-ring)` = vermelho `#dc2626` — cor de erro usada para foco confunde | `globals.css` | L33, L136 | WCAG 1.4.1, 2.4.7 |
| 10 | Botão de "revelar senha" sem tamanho mínimo de 44×44px — target pequeno para mobile | `UserProfileForm.tsx` | L451–L471 | WCAG 2.5.5 — Tamanho do Alvo |

---

## Bloco 1 — Contraste e Cores (WCAG 1.4.3 / 1.4.11)

### 1.1 Substituir `text-gray-300` por token semântico
**Arquivo:** `UserProfileForm.tsx` — L270, L408

```diff
- <p className="mt-1 text-sm text-gray-300">
+ <p className="mt-1 text-sm text-muted">
```
> **Justificativa:** `text-gray-300` (#d1d5db) sobre `bg-slate-900` (#0f172a) possui contraste ~8:1 — OK, mas mistura tokens externos com o sistema interno. `text-muted` = `#94a3b8` sobre fundo escuro resulta em ~4.6:1 (passa 4.5:1 mínimo). Padroniza o design system.

### 1.2 Cor do `focus-ring` — separar erro de foco
**Arquivo:** `globals.css` — L33

```diff
- --color-focus-ring: var(--color-brand-cta);   /* vermelho #dc2626 */
+ --color-focus-ring: var(--color-dashboard-gold); /* dourado #fbbf24 */
```
> **Justificativa (WCAG 1.4.1 + 2.4.7):** Usar vermelho para foco cria ambiguidade com estado de erro. O dourado/âmbar (`#fbbf24`) é a cor de destaque do tema dashboard e garante contraste >3:1 contra fundos escuros, além de ser semanticamente neutra.

### 1.3 Contraste dos botões de submit
**Arquivo:** `UserProfileForm.tsx` — L370, L614

```diff
- "bg-green-900/90 text-white/80",
+ "bg-green-700 text-white",
```
> **Justificativa (WCAG 1.4.3):** `text-white/80` (rgba branco 80%) sobre `bg-green-900` resulta em contraste ~3.1:1 — abaixo do mínimo 4.5:1. `text-white` puro sobre `bg-green-700` (#15803d) resulta em ~4.55:1 — aprovado.

### 1.4 Destaque visual da caixa de "Atenção"
**Arquivo:** `UserProfileForm.tsx` — L321–L327

```diff
- <div className={cn("focus-ring min-h-12 cursor-not-allowed px-4 py-3",
-   "text-sm text-foreground/80 select-none space-y-4",
-   "rounded-lg border border-dashboard-gold/30 bg-dashboard-gold/5")}>
+ <div
+   role="note"
+   className={cn(
+     "px-4 py-3 rounded-lg space-y-4",
+     "text-sm text-foreground select-none",
+     "border border-dashboard-gold/50 bg-dashboard-gold/10",
+   )}
+ >
```
> **Justificativa:** Remove `focus-ring` e `cursor-not-allowed` de um `<div>` não-interativo (violação WCAG 4.1.2). Adiciona `role="note"` para leitores de tela. Eleva opacidade do fundo de `/5` para `/10` melhorando distinção visual.

---

## Bloco 2 — Navegação por Teclado e Foco (WCAG 2.4.3 / 2.4.7)

### 2.1 Botões de revelar senha — tamanho mínimo de toque
**Arquivo:** `UserProfileForm.tsx` — L451, L504, L556

```diff
- className="focus-ring absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground transition-colors"
+ className="focus-ring absolute right-1 top-1/2 -translate-y-1/2 flex items-center justify-center min-w-[44px] min-h-[44px] text-muted hover:text-foreground transition-colors rounded"
```
> **Justificativa (WCAG 2.5.5):** Alvos de toque devem ter no mínimo 44×44px. O botão de olho era muito pequeno para uso em mobile.

### 2.2 Tabindex natural — verificar ordem dos fieldsets
- Os `<fieldset>` e `<legend>` já estão presentes ✅
- Verificar que nenhum `tabIndex` negativo bloqueia inputs interativos
- Nenhuma mudança estrutural necessária — ordem DOM já é lógica ✅

---

## Bloco 3 — Semântica e Leitores de Tela (WCAG 1.3.1 / 4.1.2)

### 3.1 Refatorar `ReadOnlyField` — remover `<label>` sem `<input>` associado
**Arquivo:** `UserProfileForm.tsx` — L84–L111

O componente atual usa `<label htmlFor={id}>` mas não existe `<input id={id}>` — isso viola WCAG 1.3.1.

**Refatoração proposta:** usar `<dl>` (definition list) com `<dt>` e `<dd>` — semântica correta para pares rótulo/valor:

```tsx
function ReadOnlyField({ id, label, value, icon: Icon }) {
  return (
    <div className="flex justify-between items-center gap-4 min-h-12 px-4">
      <dt className="flex items-center gap-1.5 text-sm font-medium text-muted shrink-0">
        <Icon className="size-3.5" aria-hidden="true" />
        {label}
      </dt>
      <dd id={id} className="text-sm text-foreground text-right truncate">
        {value}
      </dd>
    </div>
  );
}
// Container pai muda para <dl className="divide-y divide-olive-800/30">
```
> **Justificativa (WCAG 1.3.1):** `<dl>/<dt>/<dd>` é a estrutura semântica correta para listas de definição (pares nome-valor). Leitores de tela como NVDA/JAWS anunciam a relação entre o rótulo e o valor corretamente.

### 3.2 Adicionar `<label>` explícito para o campo de data de nascimento
**Arquivo:** `UserProfileForm.tsx` — L329–L333

```diff
- <FormField id="birthdate" label="" error={birthDateForm.error}>
+ <FormField id="birthdate" label="Data de Nascimento" error={birthDateForm.error}>
```
> **Justificativa (WCAG 2.4.6):** Todo input deve ter rótulo visível e associado via `htmlFor/id`. Label vazio confunde usuários de tecnologias assistivas.

### 3.3 Garantir `aria-invalid` + `aria-describedby` nos inputs
**Arquivo:** `FormTextInput.tsx` — já implementado via `getFormFieldAriaProps` ✅

**Verificar:** que `aria-required="true"` passa corretamente via `...props` para o `<input>` nativo — OK ✅

### 3.4 Adicionar `aria-live` na área de critérios de senha
**Arquivo:** `UserProfileForm.tsx` — L582–L597

```diff
- <ul aria-label="Critérios de segurança da senha" className="...">
+ <ul aria-label="Critérios de segurança da senha" aria-live="polite" aria-atomic="false" className="...">
```
> **Justificativa (WCAG 4.1.3):** Mudanças de status em tempo real nos critérios de senha devem ser anunciadas por leitores de tela. `aria-live="polite"` + `aria-atomic="false"` anuncia cada item individualmente quando muda de estado.

---

## Bloco 4 — UX e Interatividade

### 4.1 Critérios de senha — ícone condicional (XCircle/CheckCircle2)
**Arquivo:** `UserProfileForm.tsx` — L591–L595

```diff
- <CheckCircle2 className="size-3.5 shrink-0" aria-hidden="true" />
+ {ok
+   ? <CheckCircle2 className="size-3.5 shrink-0 text-dashboard-success" aria-hidden="true" />
+   : <XCircle className="size-3.5 shrink-0 text-muted" aria-hidden="true" />
+ }
```
> **Justificativa (WCAG 1.4.1 + UX):** A distinção de estado não pode depender apenas de cor. Usar ícones diferentes (✓ / ✗) garante que usuários com daltonismo percebam claramente quais critérios foram atingidos.

### 4.2 `type="date"` já implementado ✅
O campo de data de nascimento já usa `type="date"` na linha 341 — o calendário nativo do SO/browser já é invocado em dispositivos móveis. Nenhuma alteração necessária.

### 4.3 Estado `disabled` nos botões de submit — reforçar visual
**Arquivo:** `UserProfileForm.tsx` — L367–L374, L611–L618

Adicionar `aria-disabled` sincronizado com `disabled` para compatibilidade com leitores de tela mais antigos:
```diff
+ aria-disabled={isBirthDatePending || !birthDateForm.birthDate}
```

### 4.4 Adicionar `<span className="sr-only">` com status de carregamento
**Arquivo:** `UserProfileForm.tsx` — botões de submit

```diff
  {isPasswordPending ? (
+   <span className="sr-only">Processando alteração de senha...</span>
    <Loader2 className="size-4 animate-spin" aria-hidden="true" />
  ) : (
```
> **Justificativa:** `aria-busy` é suportado de forma irregular. Um `sr-only` com texto descritivo garante anúncio em todos os leitores de tela.

---

## Arquivos a Modificar

| Arquivo | Tipo de Mudança |
|---------|----------------|
| `src/app/globals.css` | Alterar cor do `--color-focus-ring` de vermelho para dourado |
| `src/components/dashboard/settings/UserProfileForm.tsx` | Principal — 8 mudanças |
| `src/components/ui/form/FormField.tsx` | Sem alterações necessárias ✅ |
| `src/components/ui/form/FormTextInput.tsx` | Sem alterações necessárias ✅ |

---

## Resumo de Impacto

```
Mudanças em globals.css      : 1 linha
Mudanças em UserProfileForm  : ~25 linhas alteradas / 5 adicionadas
Regressões esperadas         : nenhuma (mudanças aditivas e semânticas)
Testes visuais recomendados  : axe DevTools, NVDA + Chrome, navegação por Tab
```

> [!NOTE]
> Após aprovação, as alterações serão aplicadas em sequência, com comentários WCAG inline para documentar cada decisão no código.
