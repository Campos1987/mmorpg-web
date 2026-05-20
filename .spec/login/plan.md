## **🗺️ Plano de Implementação: Módulo de Autenticação**
### **Cronograma de Execução**

|**Fase**|**Etapa Principal**|**Foco Tecnológico**|**Complexidade**|
| :- | :- | :- | :- |
|**Fase 1**|Infraestrutura e Setup|Banco de Dados, Git|Baixa|
|**Fase 2**|Motor do Backend|Spring Boot, Argon2, JWT|Alta|
|**Fase 3**|Interface e Integração|Next.js, Tailwind CSS|Média|
|**Fase 4**|Validação e Segurança|Testes de Carga, Postman|Média|
### **Detalhamento das Tarefas**
#### **Fase 1: Infraestrutura e Setup**
- **Controle de Versão:** Garantir que as branches de *feature* para a autenticação estejam isoladas (utilizando suas chaves SSH configuradas para o push/pull).
- **Banco de Dados:** Modelar e criar a tabela usuarios com as colunas essenciais (id, user, email, password\_hash).
- **Esqueletos de Projeto:** Levantar os serviços do Spring Boot e do Next.js localmente para iniciar a comunicação.
#### **Fase 2: Motor do Backend (Spring Boot)**
- **Mapeamento de Dados:** Criar a entidade e o repositório JPA para a persistência dos usuários.
- **Configuração do Spring Security:** Liberar acesso público exclusivamente para as rotas /api/auth/login e /api/auth/register. Bloquear o restante da API.
- **Implementação Criptográfica:** Integrar a biblioteca do Argon2. Configurar o serviço para gerar o *salt* e o hash durante o registro, e realizar a comparação durante o login.
- **Emissão de Tokens:** Desenvolver a lógica de assinatura e expiração do JWT.
- **Controladores REST:** Codificar os endpoints recebendo exatamente o payload estruturado na especificação técnica.
#### **Fase 3: Interface e Integração (Next.js)**
- **Desenvolvimento de UI:** Criar os componentes visuais dos formulários de Login e Registro estilizados.
- **Sanitização e Validação:** Adicionar a lógica *client-side* para bloquear requisições com senhas fracas ou nomes de usuário fora do limite (5 a 100 caracteres).
- **Comunicação com a API:** Configurar o serviço de requisições (via fetch nativo ou Axios) para disparar os payloads HTTP POST para o backend.
- **Gerenciamento de Sessão:** Definir a estratégia de armazenamento do JWT retornado (ex: *Cookies HttpOnly*) e o redirecionamento automático para a área autenticada.
#### **Fase 4: Validação e Segurança**
- **Simulação de Ataques:** Testar propositalmente o envio de payloads inválidos para garantir que o backend retorne 400 Bad Request antes de acionar o Argon2.
- **Ajuste de Custo do Argon2:** Medir o tempo de resposta do endpoint de login e calibrar os parâmetros de iteração/memória do algoritmo.
- **Tratamento de Exceções visuais:** Garantir que o frontend não quebre ao receber um erro 401 Unauthorized e mostre o alerta genérico de "Credenciais inválidas".

