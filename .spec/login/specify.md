# **Especificação Técnica: Módulo de Autenticação Segura**
## **1. Visão Geral**
O objetivo deste módulo é fornecer uma infraestrutura de autenticação robusta e stateless, gerenciando a entrada de usuários na plataforma. A comunicação segue os padrões de uma API RESTful, utilizando JSON Web Tokens (JWT) para o controle de acesso e assegurando a integridade dos dados no banco de dados através de criptografia avançada.
## **2. Stack Tecnológico e Arquitetura**
- **Apresentação (Frontend):** Next.js (TypeScript) com estilização via Tailwind CSS.
- **Serviços (Backend):** API RESTful desenvolvida em Java com o framework Spring Boot.
- **Segurança de Credenciais:** Algoritmo de derivação de chave Argon2.
- **Gerenciamento de Sessão:** Tokens JWT no padrão Bearer.
## **3. Especificação de Endpoints**
### **3.1. Autenticação de Usuário (Login)**
Responsável por validar credenciais e emitir os tokens de acesso para a navegação na plataforma.

- **Endpoint:** /api/auth/login
- **Método:** POST
- **Content-Type:** application/json

**Payload de Requisição:**

JSON

{

`  `"user": "joaosilva123",

`  `"password": "Password@123!"

}

**Regras de Validação Contratual:**

- user (String): Obrigatório. Deve possuir entre 5 e 100 caracteres.
- password (String): Obrigatório. Requer validação de complexidade (mínimo de caracteres, inclusão de maiúsculas, números e caracteres especiais).

**Nota de Performance:** A API deve rejeitar requisições de login (com 400 Bad Request) se a senha enviada não respeitar a complexidade mínima, evitando operações custosas de comparação do Argon2 no banco de dados.

**Respostas Esperadas:**

- **200 OK (Sucesso):** O Spring Boot gera e retorna o JWT assinado.

JSON

{

`  `"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",

`  `"type": "Bearer"

}

- **400 Bad Request (Erro de Validação):** Formato incorreto ou ausência de dados obrigatórios.
- **401 Unauthorized (Falha de Autenticação):** As credenciais não conferem. A mensagem deve permanecer genérica ("Credenciais inválidas.") para evitar a enumeração de usuários.
### **3.2. Registro de Novo Usuário**
Responsável pela captação de dados de novos usuários, aplicando o hash criptográfico antes da persistência.

- **Endpoint:** /api/auth/register
- **Método:** POST
- **Content-Type:** application/json

**Payload Sugerido:**

JSON

{

`  `"user": "joaosilva123",

`  `"email": "joao@exemplo.com",

`  `"password": "Password@123!"

}

**Comportamento do Sistema:**

1. O sistema verifica a disponibilidade do user e email para evitar duplicidade.
1. Aplica as mesmas regras de validação de força de senha estipuladas no Login.
1. O backend gera um "salt" único e processa a senha através do Argon2 antes de salvar o registro no banco de dados.
## **4. Requisitos Críticos de Segurança**
- **Proteção de Hash (Argon2):** Fica estritamente proibido o armazenamento de senhas em texto plano ou usando algoritmos obsoletos (como MD5 ou SHA-1). O Argon2 deve ser configurado com parâmetros de custo de memória e iterações que equilibrem segurança e tempo de resposta da API.
- **Mitigação de Ataques:** As validações estritas de tamanho de campos no frontend e backend garantem proteção primária contra Buffer Overflows e sobrecarga no parsing do JSON.
