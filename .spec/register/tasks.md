# Roteiro de Implementação — Registro de Usuário

> Baseado em [specify.md](./specify.md) e [plan.md](./plan.md).  
> Diretrizes: [.cursor/rules/staff-engineer.mdc](../../.cursor/rules/staff-engineer.mdc) e [Documentation/end-points/register.md](../../Documentation/end-points/register.md).

---

## Fase 1: Setup, Dependências e Contratos ✅

Preparar o ambiente e isolar tipos/contratos antes de qualquer UI.

- [x] Confirmar rota da página de registro (`/registro`) alinhada a `ROUTES.AUTH.REGISTER` em `src/config/routes.ts`
- [x] Instalar dependências de formulário: `react-hook-form`, `@hookform/resolvers` e `zod`
- [x] Definir tipos TypeScript espelhando o contrato da API: `RegisterPayload`, `RegisterSuccessResponse`, `ApiErrorResponse`
- [x] Centralizar constantes do endpoint (`/api/auth/register`, método `POST`) em módulo de serviço ou config, separado da camada de apresentação
- [x] Documentar convenção de nomenclatura para handlers e estados (ex.: `isRegisterRequestPending`, `handleRegisterFormSubmit`)

---

## Fase 2: Schema de Validação (Zod) ✅

Fonte única da verdade das regras client-side, conforme specify e backend.

- [x] Criar schema Zod dedicado (ex.: `src/schemas/register-schema.ts`) isolado de componentes visuais
- [x] Mapear campo `user`: obrigatório, sem espaços, regex `^[a-zA-Z0-9]+$`, min 5, max 12
- [x] Mapear campos `name` e `lastname`: obrigatórios, apenas letras, sem espaços, min 5, max 20
- [x] Mapear campo `birthday`: data válida no passado, saída normalizada em `YYYY-MM-DD`
- [x] Mapear campo `email`: formato de e-mail válido
- [x] Mapear campo `password`: min 8, max 12, regex com maiúscula, número e caractere especial
- [x] Exportar tipo inferido do schema (`RegisterFormValues`) para uso no formulário e na submissão
- [x] Definir mensagens de erro em português alinhadas à tabela de UX da spec

---

## Fase 3: Camada de Integração (Serviço / Server Action) ✅

Lógica de negócio e comunicação HTTP fora dos componentes visuais.

- [x] Criar função de registro (Server Action ou serviço em `src/services/`) que recebe payload já validado
- [x] Revalidar payload no servidor com o mesmo schema Zod (defesa em profundidade)
- [x] Implementar `POST` para `/api/auth/register` com `Content-Type: application/json`
- [x] Garantir que a senha trafega em texto plano no JSON (sem hash no cliente); documentar dependência de HTTPS
- [x] Tipar retorno de sucesso (`201`) e erros (`400`, `409`) de forma discriminada
- [x] Mapear corpo `details` do erro 400 para estrutura consumível pelo formulário (`setError` por campo)
- [x] Mapear `message` do erro 409 para feedback global (toast/alerta)
- [x] Marcar módulo crítico com `server-only` se aplicável, evitando importação acidental no cliente

---

## Fase 4: Componentes de UI Base (Design System) ✅

Inputs e layout reutilizáveis antes do formulário completo.

- [x] Definir estrutura de pastas modular (ex.: `src/components/auth/register/`, `src/components/ui/form/`)
- [x] Criar componente de campo reutilizável (`FormField` ou equivalente) com label, input, mensagem de erro e `aria-*`
- [x] Aplicar tokens do design system (dark theme, `cn()`, `focus-ring`, alvos de toque 48px)
- [x] Suportar tipos de input necessários: texto, e-mail, data (`birthday`), senha
- [x] Criar shell da página `app/registro/page.tsx` (RSC quando possível) com título, container e link para login
- [x] Garantir layout responsivo mobile-first (coluna única, sem sobreposição de elementos)

---

## Fase 5: Formulário e Interatividade (Client) ✅

Montagem do formulário com RHF + Zod na folha client mínima.

- [x] Criar componente `RegisterForm` com `'use client'`
- [x] Inicializar `useForm` com `zodResolver(registerSchema)` e `mode: "onChange"` para validação em tempo real
- [x] Registrar campos: `user`, `name`, `lastname`, `birthday`, `email`, `password`
- [x] Desabilitar botão de envio enquanto `isRegisterRequestPending` ou formulário inválido
- [x] Exibir mensagens de erro do Zod abaixo de cada input via componente de campo
- [x] Implementar estados de loading no submit (feedback visual no botão)

---

## Fase 6: Submissão e Tratamento de Respostas ✅

Fluxo completo conforme specify (201, 400, 409).

- [x] Implementar `handleRegisterFormSubmit` chamando a camada de integração (Fase 3)
- [x] **Sucesso (201):** limpar formulário, exibir toast *"Conta criada com sucesso!"* e redirecionar para `/login`
- [x] **Erro 400:** injetar erros de `details` nos campos correspondentes via `setError` do react-hook-form
- [x] **Erro 409:** exibir alerta/toast global com `message` da API (usuário ou e-mail já existente)
- [x] Em qualquer erro (400 ou 409), executar `resetField("password")` imediatamente
- [x] Tratar falhas de rede ou status inesperados com mensagem genérica e segura (sem vazar detalhes internos)

---

## Fase 7: Feedback Global, Navegação e Segurança de UX ✅

Polimento de conversão e proteções visuais.

- [x] Integrar sistema de toast/notificação (ou componente de alerta acessível) para sucesso e conflito
- [x] Adicionar link "Já tem conta? Faça login" apontando para `ROUTES.AUTH.LOGIN`
- [x] Garantir que nenhum dado sensível permaneça visível após erro (senha sempre limpa)
- [x] Revisar autocomplete nos inputs (`username`, `email`, `bday`, `new-password`) para UX em mobile
- [x] Confirmar que segredos ou URLs de API privada não estão expostos em componentes client

---

## Fase 8: Acessibilidade, Performance e Qualidade ✅

Conformidade WCAG e padrões Staff Engineer.

- [x] Associar cada input a `<label>` ou `aria-labelledby`; erros com `aria-invalid` e `aria-describedby`
- [x] Garantir navegação completa por teclado (Tab, Enter no submit, foco visível)
- [x] Usar HTML semântico: `<form>`, `<fieldset>` se agrupar seções, botão `type="submit"`
- [x] Proibir valores arbitrários no Tailwind; usar apenas tokens do tema
- [x] Executar `npm run lint` e `npm run build` sem erros após integração
- [ ] Validar fluxo manual: dados válidos, 400 simulado, 409 simulado, cancelamento durante loading

---

## Fase 9: Verificação Manual e Critérios de Aceite

Checklist final contra a spec.

- [ ] Formulário bloqueia submit com dados inválidos (validação client-side antes da rede)
- [ ] Payload enviado respeita exatamente `RegisterPayload`
- [ ] Sucesso redireciona para login com feedback positivo
- [ ] Erros 400 aparecem apenas nos campos corretos
- [ ] Erro 409 exibe mensagem global compreensível
- [ ] Campo senha é limpo após qualquer erro da API
- [ ] Página acessível via Top Bar (`/registro`) e responsiva em mobile/desktop
- [ ] Contraste e legibilidade adequados no tema escuro

---

## Escopo Futuro (fora desta entrega inicial)

- [ ] Auto-login pós-registro usando `userId` retornado (se produto exigir)
- [ ] Confirmação de e-mail ou captcha anti-bot
- [ ] Testes automatizados (unitários do schema, integração do serviço, E2E do fluxo)
- [ ] Internacionalização (i18n) das mensagens de erro

---

## Ordem de Execução Recomendada

```text
Fase 1 → Fase 2 → Fase 3 → Fase 4 → Fase 5 → Fase 6 → Fase 7 → Fase 8 → Fase 9
```

> **Regra:** não montar o formulário visual (Fase 5) antes de concluir schema Zod (Fase 2) e contrato de integração (Fase 3). Não adicionar `'use client'` antes da Fase 5, exceto em subcomponentes de UI estritamente interativos definidos na Fase 4.
