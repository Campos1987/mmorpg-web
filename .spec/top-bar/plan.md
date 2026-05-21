### **Fase 1: Setup da Aplicação e Design System**
O primeiro passo é estabelecer as fundações do projeto, priorizando a performance e a escalabilidade visual.

- **Inicialização:** Configure o projeto utilizando Next.js com Turbopack e TypeScript para garantir um ambiente de desenvolvimento rápido e tipagem estática rigorosa.
- **Design Tokens (Tailwind CSS):** Implemente a arquitetura de tokens no arquivo tailwind.config.ts.
  - Configure as cores primitivas (bg-slate-950 para fundo, bg-slate-900 para cards) e semânticas (vermelho escarlate/dourado para os CTAs).
  - Defina as fontes personalizadas (ex: *Cinzel* para títulos e *Inter* para leituras técnicas).
- **Tipografia Fluida:** Utilize as funções clamp() no arquivo globals.css para que os tamanhos de texto e espaçamentos cresçam linearmente conforme a viewport, evitando quebras visuais abruptas.
- **Grid System Mobile-First:** Configure o layout base para telas de 320px com 4 colunas, escalando progressivamente para 12 colunas em desktops (a partir de 1024px).
### **Fase 2: Construção da Navegação e Core UI (Top Bar)**
O sistema de navegação será crucial para a conversão de jogadores e organização da base de dados.

- **Top Bar (Cabeçalho):** Desenvolva o componente fixado no topo (sticky), garantindo que os itens principais estejam em caixa alta para maior destaque visual.
- **Menus e Dropdowns:** Implemente a estrutura de links com indicadores visuais (uma pequena seta "V") para os submenus expansíveis:
  - **Informações:** Sistemas, Itens, Habilidades, Life Stone, Moedas.
  - **Comunidade & PvP:** Olimpíada, Siege, Clã.
  - **Rankings:** Top PvP, Top PK, Top Clan.
- **Botões de Ação:** Posicione os botões de "Login" e "Registro" à direita. O botão de Registro deve receber o destaque máximo na interface (cores contrastantes ou bordas brilhantes).
- **Comportamento Responsivo:** \* Em dispositivos móveis (< 1024px), utilize uma *Navigation Drawer* (menu lateral via hambúrguer) com *Focus Trap* e travamento de rolagem do body.
  - Em desktops (>= 1024px) na área autenticada, converta a estrutura para uma Sidebar fixa à esquerda, deixando o cabeçalho focado em métricas do jogador.
### **Fase 3: Componentização e Gerenciamento de Estado UI**
Esta fase lida com a exibição de dados complexos do jogo de forma acessível.

- **Tabelas Responsivas:** Para a listagem de rankings e personagens, crie tabelas HTML (<table>) que transmutam sua estrutura em telas menores. No mobile, altere a tabela para display: flex; flex-direction: column;, transformando as linhas em cards e utilizando data-label via pseudo-elementos para identificar os dados.
- **Gerenciamento de Estado:** Integre o **Zustand** para o controle de estados leves da interface, como o gerenciamento de abas e a abertura de menus, evitando re-renderizações desnecessárias em componentes irmãos.
- **Modularidade:** Isole os módulos da interface (ex: Painel do Jogador vs. Banco de Dados de Itens) para garantir baixo acoplamento.
### **Fase 4: Estratégias de Renderização e Acessibilidade**
Otimizações finais para garantir performance extrema e conformidade técnica.

- **Modelos de Renderização (App Router):**
  - Utilize **SSG** (Static Site Generation) para páginas institucionais (Regras, Downloads, Sobre) visando tempos de resposta mínimos.
  - Empregue **ISR** (Incremental Static Regeneration) para o painel de Notícias e Patch Notes.
  - Mantenha a maioria do projeto como **React Server Components (RSC)**, limitando o uso de "use client" estritamente a elementos interativos (ex: Contadores de Siege/TvT).
- **Imagens e Mídia:** Implemente a tag <picture> para controlar a direção de arte de banners massivos, servindo formatos otimizados (WebP/AVIF) dependendo da largura de tela do dispositivo.
- **Acessibilidade (WCAG 2.1 AA):**
  - Garanta alvos de toque mínimos de 48x48px para todos os links e botões interativos.
  - Mantenha anéis de foco (focus:ring-2) visíveis para navegação por teclado.
  - Utilize aria-live="polite" em contadores de eventos em tempo real para compatibilidade com leitores de tela.

