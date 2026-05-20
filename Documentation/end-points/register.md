# Documentação de Integração Frontend: Endpoint de Registro

## Visão Geral
Este documento detalha o payload necessário para realizar o registro de um novo usuário na plataforma. Os dados enviados pelo frontend devem seguir estritamente as regras de validação abaixo para evitar erros de requisição (`400 Bad Request`).

**Endpoint sugerido:** `/api/auth/register` (Confirmar rota exata com o backend)
**Método HTTP:** `POST`
**Content-Type:** `application/json`

---

## 📦 Estrutura do Payload Esperado (JSON)

Ao realizar a requisição de registro, o frontend deve enviar um JSON com a seguinte estrutura:

{
  "user": "joaosilva123",
  "name": "João",
  "lastname": "Silva",
  "birthday": "1990-05-15",
  "email": "joao.silva@email.com",
  "password": "Password@123!",
}

## Regras de Validação dos Campos

| Campo | Tipo | Regras / Restrições |
| :--- | :--- | :--- |
| `user` | String | Obrigatório. Sem espaços. Apenas letras e numeros. Mínimo de 5 caracteres. Maximo 12 caracteres. |
| `name` | String | Obrigatório. Sem espaços. Apenas letras. Mínimo de 5 caracteres. Maximo 20 caracteres. |
| `lastname` | String | Obrigatório. Sem espaços. Apenas letras. Mínimo de 5 caracteres. Maximo 20 caracteres. |
| `birthday` | String | Obrigatório. Formato ISO 8601 formato aceito pelo backend (`YYYY-MM-DD`). Deve ser uma data válida no passado. |
| `email` | String | Obrigatório. Formato válido de e-mail (ex: `nome@dominio.com`). |
| `password` | String | Obrigatório. Mínimo de 8 caracteres, Maximo 12 caracteres. contendo ao menos uma letra maiúscula, um número e um caractere especial. 

Nota de Segurança: O frontend deve enviar a senha em texto plano. A comunicação deve ocorrer estritamente via HTTPS. O backend se encarregará de realizar o hash seguro utilizando Argon2 antes de salvar no banco de dados.🔄 Respostas da API✅ Sucesso (201 Created)O usuário foi registrado com sucesso.JSON{
  "message": "Usuário registrado com sucesso.",
  "userId": "uuid-gerado-pelo-banco"
}
❌ Erro de Validação (400 Bad Request)Enviado quando um ou mais campos não respeitam as regras de validação.JSON{
  "error": "Validation Error",
  "details": {
    "email": "Formato de e-mail inválido.",
    "password": "A senha deve conter ao menos um caractere especial."
  }
}
❌ Conflito (409 Conflict)Enviado quando o user ou email já estão cadastrados no sistema.JSON{
  "error": "Conflict",
  "message": "E-mail já cadastrado no sistema."
}
