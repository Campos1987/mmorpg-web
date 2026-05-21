# Dashboard — débitos técnicos (integração API)

- [ ] Proteger rota `/dashboard` via middleware (cookie `AUTH_TOKEN_COOKIE`)
- [ ] Substituir `dashboardMockData` por `dashboardService.getDashboardData()` em RSC
- [ ] Loading UI (`loading.tsx`) e Error Boundary (`error.tsx`) no segmento `(dashboard)`
- [ ] Revalidação por tag após mutações (sub-conta, personagem ativo)
- [ ] Rate limiting e sanitização Zod nos payloads da API
- [ ] Não expor tokens ou URLs internas no bundle do cliente
