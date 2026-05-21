### **Plano de Implementação: Fluxo de Registro Frontend**
**Fase 1: Configuração e Preparação do Ambiente**

- **Gerenciamento de Formulários:** Adicionar react-hook-form e @hookform/resolvers ao projeto para controlar o estado dos inputs sem re-renderizações desnecessárias.
- **Validação Centralizada:** Instalar o zod para atuar como a fonte única da verdade (Single Source of Truth) das regras definidas na documentação.

**Fase 2: Construção do Schema de Validação (Zod)**

- Criar um arquivo dedicado (ex: schemas/registerSchema.ts) isolando a lógica de validação do componente visual.
- Mapear rigorosamente os requisitos do backend no schema:
  - user: Regex para caracteres alfanuméricos (^[a-zA-Z0-9]+$), sem espaços, e limites .min(5).max(12).
  - name / lastname: Regex exclusivo para letras, sem espaços, limites de 5 a 20.
  - birthday: Transformação e validação de data no passado convertendo para o formato exigido YYYY-MM-DD.
  - password: Expressão regular contemplando a obrigatoriedade de maiúscula, número e caractere especial, com limites .min(8).max(12).

**Fase 3: Componentização e Interface (UI)**

- **Inputs Reutilizáveis:** Construir um componente de input genérico com Tailwind CSS, adaptado para o tema escuro (dark theme) do projeto, que já preveja a exibição de mensagens de erro dinâmicas.
- **Página de Registro:** Criar o componente principal da tela (sinalizado com "use client" no Next.js).
- **Conexão RHF + Zod:** Inicializar o useForm passando o schema do Zod via resolver. Configurar a validação em tempo real utilizando mode: "onChange".

**Fase 4: Integração HTTP e Tratamento de Respostas**

- **Submissão Segura:** Implementar a função assíncrona de onSubmit que dispara um POST (via fetch ou Axios) para /api/auth/register. A requisição deve garantir o envio da senha em texto plano, estritamente sobre HTTPS.
- **Gestão de Sucesso (201):** Ao receber o status 201 Created, limpar os dados do react-hook-form e executar o redirecionamento (via useRouter) para a rota de login.
- **Gestão de Erros de Validação (400):** Interceptar respostas 400 Bad Request e varrer o objeto details retornado pela API. Utilizar o método setError do react-hook-form para injetar os erros do backend diretamente nos componentes de input correspondentes.
- **Gestão de Conflitos (409):** Capturar erros 409 Conflict (e-mail ou usuário já existentes) e disparar um toast/alerta global informando o problema.
- **Prevenção Visual:** Em caso de qualquer erro retornado (400 ou 409), aplicar um resetField("password") imediatamente para limpar a senha digitada da tela.

