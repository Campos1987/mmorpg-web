# Referência — Sinais em logs e stack traces (Next.js App Router)

## Frames que indicam servidor

- `react-server-dom-webpack`
- `next/dist/server`
- `app-route.runtime`, `app-page.runtime`
- `renderToReadableStream`, `Flight`
- Erros durante `next build` ou `Generating static pages`

## Frames que indicam cliente

- `webpack-internal://`
- `@webpack/client`
- `react-dom/client`
- Arquivos do projeto com sufixo ou diretório de componentes client
- Mensagens no DevTools: `Uncaught`, `Warning:`, hydration

## Mensagens típicas

| Mensagem (parcial) | Leitura rápida |
|--------------------|----------------|
| `Hydration failed because the initial UI does not match` | Cliente — divergência SSR/CSR |
| `There was an error while hydrating` | Cliente |
| `Server Actions must be async functions` | Servidor — Server Action mal definida |
| `A "use server" file can only export async functions` | Servidor — arquivo de action |
| `Dynamic server usage` | Servidor — rota estática vs dinâmica (`cookies`, `headers`) |
| `Failed to fetch` em RSC | Servidor/rede — URL, auth, ou fetch em build time |
| `ZodError` em action | Servidor — validar schema e mensagens ao cliente |
| `ECONNREFUSED` / timeout em `fetch` | Infra — não mascarar com retry infinito no cliente |

## Ordem de leitura do stack

1. Primeiro frame em `app/` ou `src/` do repositório
2. Verificar se esse arquivo tem `'use client'` na primeira linha
3. Subir a cadeia de imports: quem importa quem define o boundary
4. Ignorar ruído em `node_modules` exceto para identificar biblioteca culpada

## Comandos úteis de verificação

```bash
npm run build
npm run lint
```

Em dev, reproduzir na rota exata e distinguir erro no terminal (servidor) vs console do browser (cliente).
