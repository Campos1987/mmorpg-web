# Documentação de Integração Frontend: Endpoint de Login

## Visão Geral
Este documento detalha o payload necessário para realizar a autenticação (login) de um usuário na plataforma. Os dados enviados pelo frontend devem seguir estritamente as regras de validação abaixo para evitar erros de requisição (`400 Bad Request`) e falhas de autenticação (`401 Unauthorized`).

**Endpoint sugerido:** `/api/auth/login` *(Confirmar rota exata com o backend)*
**Método HTTP:** `POST`
**Content-Type:** `application/json`

---

## 📦 Estrutura do Payload Esperado (JSON)

Ao realizar a requisição de login, o frontend deve enviar um JSON com a seguinte estrutura:

```json
{
  "user": "joaosilva123",
  "password": "Password@123!"
}

## Regras de Validação dos Campos

| Campo | Tipo | Regras / Restrições |
| :--- | :--- | :--- |
| `user` | String | Obrigatório. Tamanho deve ser entre 5 e 100 caracteres. |
| `password` | String | Obrigatório. Deve atender à validação de complexidade de senha (mínimo de caracteres, contendo letra maiúscula, número e caractere especial). |

> **Nota:** A validação do campo `password` no login garante que requisições com senhas que não seguem o padrão mínimo sequer cheguem a sobrecarregar o banco de dados na tentativa de comparação de hashes.

---

## 🔄 Respostas da API

### ✅ Sucesso (`200 OK`)
O usuário foi autenticado com sucesso. A API retorna o token de acesso (JWT) necessário para requisições autenticadas.

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "type": "Bearer"
}

❌ Erro de Validação (400 Bad Request)

Enviado quando o payload não respeita as restrições de tamanho ou campos em branco.

{
  "error": "Validation Error",
  "details": {
    "user": "Username é obrigatório"
  }
}

❌ Não Autorizado (401 Unauthorized ou 403 Forbidden)

Enviado quando as credenciais fornecidas (usuário ou senha) estão incorretas. Por questões de segurança, a mensagem de erro deve ser genérica.

{
  "error": "Unauthorized",
  "message": "Credenciais inválidas."
}