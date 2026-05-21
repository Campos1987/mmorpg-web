---
name: format-commit
description: Analyzes git diff and drafts Conventional Commit messages in English (type, scope, imperative subject). Use when the user asks for a commit message, format commit, /format-commit, or help writing a commit before committing.
disable-model-invocation: true
---

# Format Commit

Quando invocado, o agente deve:

1. Analisar o `git diff` atual do projeto.
2. Classificar a mudança seguindo rigorosamente a tabela de tipos: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`.
3. Escrever a mensagem em inglês, no imperativo, sem ponto final, seguindo a estrutura: `tipo(escopo): descrição`.
4. Garantir que a mensagem seja concisa e descreva o "quê" e o "porquê" da mudança lógica.

## Workflow

1. **Coletar diff** (em paralelo quando possível):
   ```bash
   git status
   git diff
   git diff --staged
   ```
   Preferir mudanças **staged** para a mensagem; se nada estiver staged, usar o diff de working tree e avisar o usuário.

2. **Classificar** usando apenas os tipos abaixo. Em dúvida, escolher o tipo que melhor reflete a *intenção principal* do diff (não misturar vários tipos num único subject).

3. **Redigir** subject line + corpo opcional (ver formato de saída).

4. **Não commitar** a menos que o usuário peça explicitamente. Esta skill só propõe a mensagem.

## Tabela de tipos

| Tipo | Quando usar |
| :--- | :--- |
| `feat` | Nova funcionalidade/recurso no código |
| `fix` | Correção de bug ou erro |
| `docs` | Apenas documentação (README, markdown, comentários de doc) |
| `style` | Formatação/estilo sem mudança de comportamento |
| `refactor` | Código alterado sem bugfix nem feature nova |
| `test` | Adição ou alteração de testes |
| `chore` | Build, deps, tooling, configs auxiliares |

## Regras obrigatórias

- **Idioma:** inglês.
- **Caixa:** `tipo`, `escopo` e início da descrição em minúsculas.
- **Imperativo:** `add`, `fix`, `remove` — nunca `added`, `fixes`, `removed`.
- **Subject:** sem ponto final; máximo ~72 caracteres quando possível.
- **Escopo:** opcional, minúsculas, módulo afetado (`auth`, `ui`, `api`, `deps`, etc.).
- **Segredos:** se o diff incluir `.env`, credenciais ou tokens, alertar e não sugerir commit desses arquivos.

## Formato de saída

Entregar ao usuário:

```markdown
## Commit message

\`\`\`
<type>(<scope>): <subject>

<body opcional — 1-3 linhas: porquê / contexto se o diff não for óbvio>
\`\`\`

**Type:** <tipo> — <uma frase justificando a classificação>
**Scope:** <escopo ou "none">
```

- **Subject:** o "quê" (mudança visível).
- **Body (opcional):** o "porquê" quando não couber no subject ou quando várias alterações compartilham uma motivação.

## Múltiplas unidades lógicas

Se `git diff` misturar concerns independentes (ex.: `feat` + `fix` + `docs`), listar **mensagens separadas** sugeridas — uma por unidade — em vez de uma mensagem genérica.

## Exemplos

Ver [examples.md](examples.md).

## Referência do projeto

Convenção completa: [.cursor/rules/commit.mdc](../../rules/commit.mdc)
