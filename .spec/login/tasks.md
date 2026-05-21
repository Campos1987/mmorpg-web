# Roteiro de Implementação — Login de Usuário

> Baseado em [specify.md](./specify.md) e [plan.md](./plan.md).  
> Diretrizes: [.cursor/rules/staff-engineer.mdc](../../.cursor/rules/staff-engineer.mdc) e [Documentation/end-points/login.md](../../Documentation/end-points/login.md).  
> **Referência visual e arquitetural:** seguir o mesmo estilo, tokens e layout da página de registro (`/registro`).

---

## Fase 1: Setup, Dependências e Contratos ✅

Preparar o ambiente e isolar tipos/contratos antes de qualquer UI.

- [x] Confirmar rota da página de login (`/login`) alinhada a `ROUTES.AUTH.LOGIN` em `src/config/routes.ts`
- [x] Reutilizar dependências já instaladas para formulários (`react-hook-form`, `@hookform/resolvers`, `zod`) ou instalá-las se ausentes na branch
- [x] Definir tipos TypeScript espelhando o contrato da API: `LoginPayload`, `LoginSuccessResponse` (`token`, `type`), `LoginApiErrorResponse`
- [x] Estender config de API de autenticação (ex.: `src/config/auth-api.ts`) com constantes do login (`/api/auth/login`, método `POST`)
- [x] Documentar convenção de nomenclatura para handlers e estados (ex.: `isLoginRequestPending`, `handleLoginFormSubmit`)
- [x] Garantir variável `API_BASE_URL` em `.env.local` documentada para apontar ao backend Spring Boot em desenvolvimento

---

## Fase 2: Schema de Validação (Zod) ✅

Fonte única da verdade das regras client-side, conforme specify e contrato do endpoint.

- [x] Criar schema Zod dedicado (ex.: `src/schemas/login-schema.ts`) isolado de componentes visuais
- [x] Mapear campo `user`: obrigatório, tamanho entre 5 e 100 caracteres (conforme specify §3.1)
- [x] Mapear campo `password`: obrigatório, mesma regra de complexidade do registro (min 8, max 12, maiúscula, número e caractere especial) para bloquear requisições inválidas antes do Argon2 no backend
- [x] Exportar tipo inferido do schema (`LoginFormValues`) para uso no formulário e na submissão
- [x] Exportar helper `mapZodErrorsToFieldErrors` (ou equivalente) para erros 400 mapeados por campo
- [x] Definir mensagens de erro em português, genéricas em falhas de autenticação (sem revelar se o usuário existe)

---

## Fase 3: Camada de Integração (Serviço / Server Action) ✅

Lógica de negócio e comunicação HTTP fora dos componentes visuais.

- [x] Criar serviço de login em `src/services/` com `server-only`, recebendo payload já validado
- [x] Criar Server Action (ex.: `src/actions/login-user-action.ts`) que revalida payload com o mesmo schema Zod (defesa em profundidade)
- [x] Implementar `POST` para `/api/auth/login` com `Content-Type: application/json`
- [x] Garantir que a senha trafega em texto plano no JSON (sem hash no cliente); documentar dependência de HTTPS em produção
- [x] Tipar retorno de sucesso (`200`) com `token` e `type: "Bearer"` de forma discriminada
- [x] Tipar erros `400` (validação com `details` por campo) e `401` (mensagem genérica *"Credenciais inválidas."*)
- [x] Mapear corpo `details` do erro 400 para estrutura consumível pelo formulário (`setError` por campo)
- [x] Tratar status inesperados ou falha de rede com mensagem genérica e segura (sem vazar detalhes internos)

---

## Fase 4: Componentes de UI Base e Shell da Página ✅

Reaproveitar design system do registro antes do formulário completo.

- [x] Reutilizar componentes de formulário existentes (`FormPlaceholderInput`, `FormFieldError`, `form-control-styles`) — mesmos tokens: borda 1px, `rounded-lg`, tema escuro, `focus-ring`, alvos de toque ≥ 48px
- [x] Criar estrutura de pastas modular (ex.: `src/components/auth/login/`)
- [x] Criar shell da página `app/login/page.tsx` (RSC quando possível) espelhando `/registro`: título, subtítulo, `container-content`, `max-w-lg`, link para voltar à home
- [x] Garantir layout responsivo mobile-first (coluna única, espaçamento `gap-4` entre campos)
- [x] Ordem visual dos campos (igual à hierarquia do registro, versão reduzida): **Usuário** → **Senha** → botão de envio

---

## Fase 5: Formulário e Interatividade (Client)

Montagem do formulário com RHF + Zod na folha client mínima.

- [ ] Criar componente `LoginForm` com `'use client'`
- [ ] Inicializar `useForm` com `zodResolver(loginSchema)` e `mode: "onChange"` para validação em tempo real
- [ ] Registrar campos: `user`, `password` com placeholders *"Usuário"* e *"Senha"*
- [ ] Configurar `autoComplete` adequado (`username`, `current-password`) para teclados virtuais em mobile
- [ ] Desabilitar botão de envio enquanto `isLoginRequestPending` ou formulário inválido
- [ ] Exibir mensagens de erro do Zod abaixo de cada input via componentes reutilizados
- [ ] Implementar estado de loading no submit (feedback visual no botão, ex.: *"Entrando…"*)

---

## Fase 6: Submissão e Tratamento de Respostas

Fluxo completo conforme specify (200, 400, 401).

- [ ] Implementar `handleLoginFormSubmit` chamando a Server Action (Fase 3)
- [ ] **Sucesso (200):** persistir JWT conforme estratégia definida na Fase 7 e redirecionar para área autenticada
- [ ] **Erro 400:** injetar erros de `details` nos campos correspondentes via `setError` do react-hook-form
- [ ] **Erro 401:** exibir feedback global genérico (*"Credenciais inválidas."*) — nunca indicar qual campo falhou
- [ ] Em qualquer erro (400 ou 401), executar `resetField("password")` imediatamente
- [ ] Não exibir mensagens que permitam enumeração de usuários (mesmo texto para usuário inexistente ou senha errada)

---

## Fase 7: Sessão JWT, Cookies e Redirecionamento

Gerenciamento seguro do token retornado pela API.

- [ ] Definir estratégia de armazenamento do JWT em **cookie `HttpOnly`**, `Secure` (produção) e `SameSite=Strict` (ou `Lax` se cross-site exigir)
- [ ] Implementar gravação do token no servidor (Server Action ou Route Handler dedicado) — **nunca** persistir JWT em `localStorage` ou expor ao bundle client
- [ ] Definir rota de destino pós-login (ex.: dashboard ou home autenticada) em `src/config/routes.ts`
- [ ] Implementar redirecionamento automático após sucesso (`router.push` ou `redirect` server-side)
- [ ] Criar utilitário ou módulo `server-only` para leitura/remoção do token em fluxos futuros de logout
- [ ] Documentar no `Documentation/documentacao-tecnica.md` o fluxo de sessão e variáveis de ambiente relacionadas

---

## Fase 8: Feedback Global, Navegação e Segurança de UX

Polimento de conversão e proteções visuais.

- [ ] Criar componente de feedback reutilizável (ex.: `LoginFeedback`) ou reaproveitar padrão do `RegisterFeedback` para erros globais e sucesso
- [ ] Adicionar link *"Não tem conta? Registre-se"* apontando para `ROUTES.AUTH.REGISTER`
- [ ] Garantir que nenhum dado sensível permaneça visível após erro (senha sempre limpa)
- [ ] Confirmar que segredos, tokens ou URLs de API privada não estão expostos em componentes client
- [ ] Revisar contraste e legibilidade no tema escuro (WCAG 2.1 AA)

---

## Fase 9: Acessibilidade, Performance e Qualidade

Conformidade WCAG e padrões Staff Engineer.

- [ ] Associar cada input a label implícita via placeholder + `aria-invalid` e `aria-describedby` nos erros
- [ ] Garantir navegação completa por teclado (Tab, Enter no submit, foco visível com `focus-ring`)
- [ ] Usar HTML semântico: `<form>`, botão `type="submit"`, região de feedback com `role="alert"` quando aplicável
- [ ] Proibir valores arbitrários no Tailwind; usar apenas tokens do tema (`brand-*`, `foreground`, `muted`)
- [ ] Executar `npm run lint` e `npm run build` sem erros após integração
- [ ] Validar fluxo manual: credenciais válidas (200), payload inválido (400), credenciais incorretas (401), cancelamento durante loading

---

## Fase 10: Verificação Manual e Critérios de Aceite

Checklist final contra a spec e paridade com o registro.

- [ ] Formulário bloqueia submit com dados inválidos (validação client-side antes da rede)
- [ ] Payload enviado respeita exatamente `{ user, password }`
- [ ] Sucesso armazena JWT de forma segura e redireciona para área autenticada
- [ ] Erros 400 aparecem apenas nos campos corretos
- [ ] Erro 401 exibe mensagem global genérica, sem enumeração de usuário
- [ ] Campo senha é limpo após qualquer erro da API
- [ ] Página acessível via Top Bar (`/login`) e responsiva em mobile/desktop
- [ ] Layout visual consistente com `/registro` (tipografia, espaçamentos, botão CTA, inputs)

---

## Escopo Futuro (fora desta entrega inicial)

- [ ] Refresh token e renovação silenciosa de sessão
- [ ] Fluxo *"Esqueci minha senha"* e recuperação de conta
- [ ] Rate limiting visual / captcha após múltiplas tentativas falhas
- [ ] Middleware de proteção de rotas autenticadas (`middleware.ts`) consumindo o cookie JWT
- [ ] Testes automatizados (unitários do schema, integração do serviço, E2E do fluxo de login)
- [ ] Internacionalização (i18n) das mensagens de erro

---

## Escopo Backend (referência — não executar nesta branch frontend)

> As fases 1–2 e 4 do [plan.md](./plan.md) referem-se ao Spring Boot, Argon2 e emissão JWT. Devem ser tratadas no repositório da API, não neste roteiro.

- [ ] Endpoint `POST /api/auth/login` operacional com Argon2 e JWT
- [ ] Spring Security liberando rotas públicas de autenticação
- [ ] Rejeição 400 antes da comparação de hash para senhas fora do padrão

---

## Ordem de Execução Recomendada

```text
Fase 1 → Fase 2 → Fase 3 → Fase 4 → Fase 5 → Fase 6 → Fase 7 → Fase 8 → Fase 9 → Fase 10
```

> **Regra:** não montar o formulário visual (Fase 5) antes de concluir schema Zod (Fase 2) e contrato de integração (Fase 3). Não adicionar `'use client'` antes da Fase 5, exceto em subcomponentes de UI estritamente interativos definidos na Fase 4. Reutilizar ao máximo os artefatos do módulo de registro (componentes `ui/form`, tokens CSS e padrão de página).
