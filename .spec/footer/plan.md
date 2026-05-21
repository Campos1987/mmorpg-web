### **Fase 1: Inicialização e Fundações de Design**
O primeiro passo é configurar a espinha dorsal do projeto, garantindo que o ambiente de desenvolvimento seja rápido e o sistema de design esteja alinhado com a atmosfera "Dark Mode" de Lineage II.

- Inicialize o projeto Next.js utilizando o App Router e habilite o Turbopack para otimizar o tempo de build e desenvolvimento local.
- Configure o repositório no GitHub via sua chave SSH Ed25519 para manter o versionamento seguro desde o primeiro commit.
- Configure o tailwind.config.ts com as cores primitivas (bg-slate-950, bg-slate-900) e os tokens de alerta/conversão.
- Estabeleça a estratégia de Breakpoints (de base para mobile antigo até 3xl para monitores ultrawide) diretamente no Tailwind.
- Implemente as tipografias fluidas utilizando a função clamp() no CSS global, garantindo que fontes e espaçamentos cresçam linearmente sem quebras visuais.
### **Fase 2: Arquitetura de Componentes e Estado**
A separação clara entre o que roda no servidor e o que roda no cliente é crucial para a performance e para despachar o mínimo de JavaScript possível.

- Crie uma estrutura de pastas separando de forma estrita os React Server Components (RSC) dos Client Components.
- Isole componentes interativos que exigem use client, como contadores de eventos TvT/CTF e badges de jogadores online piscando.
- Implemente o Zustand para o gerenciamento de estado global da UI, controlando abas de monetização e estados de menus sem causar re-renders desnecessários em componentes pesados como a lista de personagens.
- Construa componentes modulares e de baixo acoplamento, garantindo que falhas em um módulo de notícias não quebrem o painel do jogador.
### **Fase 3: Autenticação, Segurança e Integração de API**
Nesta fase, a comunicação com o seu backend Java começará a tomar forma. A segurança no frontend deve assumir uma postura de "Zero Trust" antes mesmo dos dados chegarem à API REST.

- Desenvolva os formulários de registro e login com layout de coluna única em mobile para evitar toques acidentais.
- Utilize atributos nativos de HTML como inputmode e autocomplete nos formulários para garantir usabilidade em teclados virtuais.
- Implemente microinterações e validações assíncronas no frontend com *debounce* (ex: checar disponibilidade de login) para não bloquear a thread principal.
- Estruture as requisições de envio de senha e dados sensíveis via HTTPS, preparando o payload da melhor forma para que a API Java/Spring Boot realize a criptografia final com Argon2.
- Aplique sanitização rigorosa em todos os inputs (buscas, login) para prevenir injeções, alinhando-se à diretriz de segurança ofensiva do projeto.
### **Fase 4: Layouts Críticos e Acessibilidade**
A navegação e a visualização de dados do MMO precisam transitar perfeitamente entre dispositivos móveis e desktops.

- Construa o sistema de navegação da área autenticada: uma Sidebar fixa para desktops e uma Navigation Drawer (com focus trap e bloqueio de scroll) para mobile.
- Desenvolva a estrutura de tabelas responsivas (como listas de personagens e drops), transmutando <table> tradicionais em cards verticais no mobile utilizando flex-direction: column e atributos data-label.
- Implemente o Rodapé completo com links para o Discord/Reddit, políticas de privacidade, EULA e submenus flutuantes (dropdowns) para áreas como Rankings e Comunidade.
- Ajuste as dimensões de botões para um mínimo de 48x48px (Touch Targets) e inclua as classes de foco do Tailwind para navegação por teclado, cumprindo diretrizes de acessibilidade.
- Configure os *focus states* e *hover states* para brilhar ou mudar de cor (efeito neon) ao interagir com links e botões.
### **Fase 5: Otimização de Performance e Estratégia de Fetching**
Por fim, garanta que o tempo de carregamento seja mínimo, especialmente para novos jogadores conhecendo o servidor.

- Configure tags <picture> com múltiplas sources de resolução (WebP/AVIF) para os banners heróis, priorizando a direção de arte e o LCP baixo.
- Implemente o carregamento dinâmico (next/dynamic) para widgets interativos pesados, evitando baixar scripts desnecessários em conexões móveis fracas.
- Defina as estratégias de renderização: aplique SSG para páginas institucionais (Regras, Downloads) para garantir respostas em milissegundos.
- Aplique ISR (Incremental Static Regeneration) no Painel de Notícias e Patch Notes para atualizar o conteúdo periodicamente sem onerar o banco de dados.

