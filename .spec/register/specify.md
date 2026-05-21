## **Especificação Técnica Frontend: Integração de Registro**
### **1. Visão Geral e Responsabilidades**
O frontend é responsável por capturar os dados do usuário, garantir a integridade dessas informações via validação *client-side* rigorosa e realizar a chamada HTTP segura para o endpoint da API REST fornecida pelo time de backend.

- **Endpoint Alvo:** /api/auth/register
- **Método:** POST
- **Protocolo Exigido:** HTTPS (crucial, pois a senha trafegará em texto plano).
### **2. Contrato de Dados (Tipagem)**
Para garantir a consistência dos dados enviados, a estrutura do payload deve ser mapeada em sua aplicação. Abaixo está a interface TypeScript que reflete exatamente o que o backend espera:

TypeScript

interface RegisterPayload {

`  `user: string;

`  `name: string;

`  `lastname: string;

`  `birthday: string; // Formato: YYYY-MM-DD

`  `email: string;

`  `password: string;

}

interface ApiErrorResponse {

`  `error: string;

`  `message?: string; // Para erro 409

`  `details?: Record<string, string>; // Para erro 400

}
### **3. Validação Client-Side**
Antes de disparar a requisição fetch ou axios, o formulário deve validar os dados para evitar acessos desnecessários à rede e prevenir o retorno de erros 400 Bad Request. Caso utilize bibliotecas como Zod ou Yup, as regras devem refletir as seguintes restrições:

|**Campo**|**Regras de Validação no Formulário**|**Mensagem de Erro Sugerida (UX)**|
| :- | :- | :- |
|user|Required. Sem espaços. Regex: ^[a-zA-Z0-9]+$. Min: 5, Max: 12.|"O usuário deve ter entre 5 e 12 caracteres alfanuméricos."|
|name|Required. Sem espaços. Regex de apenas letras. Min: 5, Max: 20.|"Nome inválido. Use apenas letras (5-20 caracteres)."|
|lastname|Required. Sem espaços. Regex de apenas letras. Min: 5, Max: 20.|"Sobrenome inválido. Use apenas letras (5-20 caracteres)."|
|birthday|Required. Data válida no passado. Transformar para YYYY-MM-DD.|"Selecione uma data de nascimento válida no passado."|
|email|Required. Regex padrão de e-mail.|"Insira um e-mail válido."|
|password|Required. Min: 8, Max: 12. Regex p/ 1 maiúscula, 1 número, 1 especial.|"A senha deve ter 8-12 caracteres, incluindo maiúscula, número e símbolo."|
### **4. Fluxo de Requisição e Tratamento de Respostas**
O componente de formulário deve gerenciar estados de carregamento (isLoading) para desabilitar o botão de envio durante a requisição, além de tratar os diferentes códigos HTTP retornados pela API REST:

- 🟢 **Sucesso (201 Created):**
  - **Ação:** Limpar o formulário e redirecionar o usuário para a tela de login ou acionar um fluxo de auto-login usando o userId retornado, se aplicável.
  - **Feedback:** Exibir um toast de sucesso: *"Conta criada com sucesso!"*
- 🟡 **Erro de Validação (400 Bad Request):**
  - **Ação:** Interceptar o objeto de erro. O backend enviará um nó details contendo os campos específicos que falharam.
  - **Feedback:** Mapear as chaves do objeto details e injetar as mensagens de erro diretamente abaixo dos respectivos inputs no formulário (ex: erro no e-mail reflete apenas no campo de e-mail).
- 🟠 **Conflito de Dados (409 Conflict):**
  - **Ação:** Interceptar a propriedade message do JSON de erro retornado.
  - **Feedback:** Exibir um alerta global ou um toast indicando que o nome de usuário ou e-mail já estão em uso, orientando o usuário a tentar outros dados ou ir para a tela de recuperação de senha.
### **5. Boas Práticas de Segurança no Frontend**
- **Envio da Senha:** A senha **não** deve sofrer nenhum tipo de hash no frontend (como SHA-256 ou MD5). Ela deve ser enviada em texto plano no payload JSON. O backend lidará com a criptografia usando Argon2.
- **Isolamento de Dados:** Em caso de erro na requisição, limpe o campo de password no formulário para obrigar o usuário a digitá-la novamente, aumentando a segurança visual de quem possa estar perto da tela.

