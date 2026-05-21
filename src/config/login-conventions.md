# Convenções de nomenclatura — Login

| Padrão | Exemplo |
| :--- | :--- |
| `is` + substantivo | `isLoginRequestPending` |
| `handle` + ação | `handleLoginFormSubmit` |
| `set` + feedback | `setLoginGlobalFeedback` |

Campos do formulário espelham `LoginFormValues` / `LoginPayload`: `user`, `password`.

Erro 401 da API: exibir sempre `LOGIN_UNAUTHORIZED_MESSAGE` (*"Credenciais inválidas."*) — nunca indicar qual campo falhou.

## Variáveis de ambiente

| Variável | Obrigatória | Descrição |
| :--- | :--- | :--- |
| `API_BASE_URL` | Não | URL base do backend (ex.: `http://localhost:4000`). Vazio = requisições para a mesma origem do Next.js. |

## Sessão JWT

- Endpoint: `POST {API_BASE_URL}/auth/login` — resposta **202** com `{ loginTime, claims }` (`claims` = JWT).
- O token é gravado em cookie **HttpOnly** (`mmorpg_auth_token`) pela Server Action; nunca vai para `localStorage`.
- Chamadas server-side autenticadas à API devem usar `getAuthorizationHeader()` de `src/lib/auth/session.ts`.

Copie `.env.example` para `.env.local` e defina `API_BASE_URL` ao integrar com o Spring Boot em desenvolvimento.

## Segurança na integração

- A senha é enviada em texto plano no JSON apenas até o backend (hash Argon2 no servidor).
- Em produção, use sempre **HTTPS** para proteger credenciais em trânsito.
- O serviço `login-user.ts` e a action `login-user-action.ts` rodam apenas no servidor (`server-only` / `"use server"`).
