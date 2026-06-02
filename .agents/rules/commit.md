---
alwaysApply: true
---

# 📌 Instruções de Commit para a IA (Mensagens em Inglês)

Você deve atuar como um assistente de desenvolvimento especialista e documentar o progresso deste projeto gerando mensagens de commit que sigam **estritamente** a convenção do **Conventional Commits**.

---

## 📐 Estrutura do Commit

Cada mensagem de commit deve seguir o seguinte formato:

* **Tipo:** Indica a intenção da mudança (veja a tabela abaixo).
* **Escopo (Opcional):** O contexto ou módulo que foi alterado (ex: `auth`, `database`, `ui`, `api`). Deve ser escrito em minúsculas.
* **Descrição:** Um resumo conciso no tempo presente imperativo (ex: "add", e NÃO "added" ou "adds"). Sem ponto final.

---

## 🗂️ Tipos Permitidos

Use **apenas** os tipos listados abaixo:

| Tipo | Quando usar | Exemplo |
| :--- | :--- | :--- |
| `feat` | Uma nova funcionalidade/recurso no código | `feat(api): add user registration endpoint` |
| `fix` | Correção de um bug ou erro em produção/desenvolvimento | `fix(auth): fix expired token validation` |
| `docs` | Alterações apenas na documentação (README, comentários, markdown) | `docs: update installation instructions` |
| `style` | Mudanças que não afetam o significado do código (espaços, formatação, ponto e vírgula) | `style: format files with prettier` |
| `refactor`| Uma alteração de código que não corrige um bug nem adiciona um recurso | `refactor(db): optimize user query performance` |
| `test` | Adição ou modificação de testes existentes | `test(user): add unit test for profile creation` |
| `chore` | Mudanças no processo de build, ferramentas auxiliares, bibliotecas ou dependências | `chore: update dependency versions in package.json` |

---

## 🚫 Regras Cruciais para a IA

1.  **Idioma:** Escreva todas as mensagens de commit obrigatoriamente em **inglês**.
2.  **Frequência:** Sugira ou faça um commit a cada unidade lógica de trabalho concluída (ex: criou a interface? Commit. Implementou a lógica? Commit. Tratou o erro? Commit). Não acumule modificações gigantescas em um único commit.
3.  **Caixa Baixa:** O tipo, o escopo e o início da descrição devem ser sempre em **letras minúsculas**.
4.  **Imperativo/Presente (Inglês):** Use verbos no imperativo em inglês (ex: use `add` em vez de `added`/`adds`; `fix` em vez de `fixed`/`fixes`; `remove` em vez de `removed`).
5.  **Sem Ponto Final:** A linha de assunto (primeira linha do commit) não deve terminar com ponto final `.`.

---

## 💡 Exemplos de Bons Commits

* `feat(ui): render feedback button on home screen`
* `fix(db): resolve timeout error on database connection`
* `docs(readme): add environment variables section`
* `chore(deps): add snyk for vulnerability monitoring`
* `refactor(auth): simplify password hashing logic`
