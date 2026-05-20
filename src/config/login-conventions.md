# Convenções de nomenclatura — Login

| Padrão | Exemplo |
| :--- | :--- |
| `is` + substantivo | `isLoginRequestPending` |
| `handle` + ação | `handleLoginFormSubmit` |
| `set` + feedback | `setLoginGlobalFeedback` |

Campos do formulário espelham `LoginPayload`: `user`, `password`.

## Variáveis de ambiente

| Variável | Obrigatória | Descrição |
| :--- | :--- | :--- |
| `API_BASE_URL` | Não | URL base do backend (ex.: `http://localhost:8080`). Vazio = requisições para a mesma origem do Next.js. |

Copie `.env.example` para `.env.local` e defina `API_BASE_URL` ao integrar com o Spring Boot em desenvolvimento.
