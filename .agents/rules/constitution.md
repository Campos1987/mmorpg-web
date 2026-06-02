---
alwaysApply: true
---

# **📜 Constituição do Projeto: Portal MMORPG / Lineage II**
## **1. Visão e Propósito Fundamental**
O sistema será o epicentro da comunidade do servidor, atuando não apenas como uma vitrine, mas como uma extensão direta do jogo. Seu objetivo principal é fornecer um ecossistema seguro, transparente e de alta performance onde os jogadores possam gerenciar suas contas de forma autônoma, consultar bases de dados complexas do jogo e acompanhar a política e economia do servidor em tempo real, construindo confiança e engajamento a longo prazo.
## **2. Princípios de Produto e Experiência (UX)**
- **Acessibilidade de Dados Complexos:** O portal lidará com bancos de dados massivos (itens, drops, calculadoras, NPCs). A interface deve permitir que o usuário filtre e encontre informações cruciais com o mínimo de cliques e máximo de precisão, utilizando paginação eficiente e buscas dinâmicas.
- **Feedback em Ações Críticas e Irreversíveis:** Como o painel lidará com o "patrimônio" virtual do jogador, qualquer ação que envolva transferência de moedas virtuais, doações, deleção de personagens ou trocas de classe deve exigir confirmações explícitas, garantindo que o jogador saiba exatamente o impacto de sua ação.
- **Imersão Funcional:** O design deve refletir a temática épica e sombria do universo do jogo (Dark Theme), porém sem sacrificar o contraste, a legibilidade das tabelas de dados e o tempo de carregamento.
- **Mobile-Ready para Informação:** Enquanto ações complexas podem ser feitas no desktop, o portal deve garantir que recursos de leitura — como status do servidor, contagem de jogadores online, horários de *Bosses*, *Sieges* e rankings PvP/PK — sejam fluidos e otimizados para smartphones.
## **3. Regras de Negócio Globais**
- **Integridade Transacional (Princípio de Ouro):** Qualquer operação de economia, doação ou entrega de itens no painel web deve ser atômica. Se um processo de compra ou transferência falhar em qualquer etapa, a operação inteira deve ser revertida, garantindo que não haja duplicação de itens ou perda de valores do jogador.
- **Espelho da Realidade (Sincronicidade):** Os dados exibidos no site (estatísticas de Castelos, Heróis, rankings de clãs, status do servidor) devem ser um reflexo fiel e rápido do banco de dados do jogo. A disparidade de informações gera desconfiança na comunidade.
- **Segurança e Privacidade de Identidade:** Nenhuma informação sensível do jogador (IP, e-mail de registro, logs de acesso, histórico de doações) pode ser exposta a terceiros. Apenas rankings de jogo (PvP, PK, Nível) são de domínio público.
- **Neutralidade de Sistema:** O portal não favorece e não destaca clãs, alianças ou jogadores de forma manual. Todos os holofotes e rankings (Hero, Lordes de Castelos) devem ser conquistados in-game e refletidos automaticamente no portal através de puro mérito mecânico.
## **4. Diretrizes de Desenvolvimento para a IA**
- **Arquitetura para Alta Concorrência:** O agente deve projetar o sistema presumindo picos severos de acesso simultâneo (ex: inauguração de servidor, períodos de *Castle Sieges* ou grandes anúncios). O uso de cache agressivo para páginas públicas (rankings, status) é obrigatório para não sobrecarregar as consultas ao banco principal.
- **Zero Trust (Segurança Ofensiva):** O ambiente de um MMO é alvo constante de ataques. A IA deve assumir que todo *input* em formulários (buscas de itens, login, resgate de códigos) é potencialmente malicioso. Sanitização rigorosa contra injeções, *rate limiting* e proteções contra *brute-force* são inegociáveis.
- **Modularidade e Baixo Acoplamento:** O código deve ser estruturado em módulos independentes. O módulo do "Painel do Jogador" não deve estar rigidamente acoplado ao módulo de "Database de Drops/Itens" ou ao "Sistema de Notícias/Fórum". Isso permite atualizações em uma área sem risco de quebrar o ecossistema inteiro.
- **Design Orientado a Leitura Eficiente:** Ao lidar com tabelas que contêm centenas de milhares de linhas (ex: logs de drops, chat global, inventário de jogadores), as lógicas construídas pela IA devem priorizar a eficiência na leitura (*query optimization*) em detrimento de lógicas de código complexas e lentas.
