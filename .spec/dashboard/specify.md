
# **Especificações de Front-end: Dashboard**
## **1. Visão Geral e Tema Visual**
O painel adota um tema escuro (Dark Mode) estilo "Cyber-Fantasy", utilizando efeitos de *glassmorphism*, fundos translúcidos e bordas brilhantes (neon) para destacar elementos interativos. A interface deve ser responsiva e reativa a estados de *hover* e seleção.
### **1.1 Paleta de Cores (Referência)**
- **Background Principal:** Tons profundos de azul/roxo escuro (ex: #1a0b2e, #20005F, #25006b).
- **Acentos Neon:**
  - Azul Neon (ex: #89FFFF) - Usado para links ativos, barras de progresso e bordas padrão de cards.
  - Roxo Neon - Usado para destacar itens selecionados (ex: card de personagem ativo) e barras secundárias.
- **Cores de Status:**
  - Verde: Sucesso, Status "Conectado", Checks de conclusão.
  - Vermelho: Notificações (badges), Barra de PV (Vida).
  - Amarelo/Ouro: Ícones de moedas, Conquistas.
- **Tipografia (Texto):**
  - Principal: Branco (#FFFFFF)
  - Secundário/Mutado: Azul acinzentado claro e cinza.
## **2. Estrutura de Layout e Componentes**
### **2.1. Barra de Navegação Superior (Header/Navbar)**
- **Logo (Esquerda):** Ícone SVG do GamerHub com tipografia da marca.
- **Links de Navegação (Centro):** \* Itens: *Início, Perfil, Mercado, Guilda, Configurações*.
  - **Estado Ativo:** O link atual ("Início") deve ter a cor da fonte alterada para Azul Neon e, opcionalmente, um traço sutil abaixo.
  - **Estado de Hover:** Transição suave de opacidade ou cor para os links inativos.
- **Conta de Usuário (Direita):**
  - **Avatar:** Imagem circular.
  - **Badge de Nível:** Círculo verde posicionado em sobreposição ao avatar (ex: "92").
  - **Info:** Nome do jogador (ex: "Alex") e Status com um indicador visual (bolinha verde "Conectado").
  - **Ações Rápidas:** Ícone de sino de notificação (com badge vermelho não lido) e ícone de engrenagem de configurações.
### **2.2. Cabeçalho da Conta (Visão Geral)**
- **Sub-conta Seleção (Dropdown):**
  - Um componente de *Select* customizado.
  - **Conteúdo:** Mostra o Nickname, Classe e Nível (ex: NightCrawler (Guerreiro Nível 85)).
  - **Comportamento:** Ao clicar, abre uma lista suspensa com opções de formatação idêntica. Efeito de *hover* em cada item da lista.
- **Moedas da Conta Principal (Display de Valores):**
  - Painel translúcido com bordas arredondadas.
  - **Ouro do Jogo:** Ícone "G" (amarelo) + valor numérico em destaque + texto explicativo em tamanho menor.
  - **Diamantes:** Ícone de diamante (azul 3D) + valor numérico em destaque + texto.
### **2.3. Seção "Meus Personagens" (Carrossel de Cards)**
- **Layout:** Carrossel horizontal ou Grid (dependendo da resolução), ladeado por setas de navegação < e >.
- **Estilo do Card de Personagem:**
  - **Background:** Imagem do personagem (deve ter uma camada de gradiente escuro na parte inferior para garantir legibilidade do texto).
  - **Bordas de Estado:**
    - Card Padrão/Inativo: Borda brilhante em Azul Neon.
    - Card Ativo/Selecionado: Borda brilhante em Roxo Neon.
  - **Conteúdo Interno do Card:**
    - **Cabeçalho:** Escudo verde de status, Nome do Personagem em destaque, Status ("Ativo" em verde).
    - **Subtítulo:** Classe e Nível, Pontuação de Equipamento alinhada à direita.
    - **Barras de Status:** \* PV (Vermelho) e PM/MP (Azul). Devem ser componentes de barra de progresso (ex: <progress> ou divs aninhadas) com larguras dinâmicas (%).
    - **Progresso de XP:** Barra fina com porcentagem textual à direita.
    - **Detalhes Adicionais:** Lista compacta contendo HP/MP numéricos brutos, Missões Ativas (ex: "3/5"), Guilda e Resumo de Equipamento.
### **2.4. Seção "Progresso Diário e Atividades"**
Um grid dividindo a tela inferior em 4 quadrantes/cards principais:

1. **Missões Diárias:**
   1. Layout em formato de *chips* ou botões quadrados.
   1. Cada item possui um ícone temático envolto em uma borda colorida.
   1. **Estado "Concluído":** Ícone recebe um check (✔️) verde na quina superior direita e a opacidade do box pode ser levemente alterada para indicar conclusão.
1. **Desafios Semanais:**
   1. Lista de tarefas com barras de progresso lineares.
   1. Cada linha contém: Ícone, Nome do Desafio (ex: "Incursões", "PvP"), Fração de progresso (ex: "9/10") e a barra visual animada (cores variando entre azul e roxo).
1. **Calendário de Eventos:**
   1. Card de destaque promovendo o próximo evento.
   1. Inclui imagem de fundo esmaecida (banner do evento), título do evento, data e hora. Ícone de calendário no cabeçalho da seção.
1. **Minhas Conquistas:**
   1. Lista vertical.
   1. Cada item contém: Ícone da conquista (ex: escudo amarelo/dragão), Título e Status ("Desbloqueado").
## **3. Diretrizes de Implementação (Front-end)**
### **3.1. Componentização (Exemplo sugerido para React/Vue/Angular)**
- Navbar: Componente de layout global.
- AccountHeader: Contém os componentes SubAccountDropdown e CurrencyDisplay.
- CharacterCarousel: Gerencia o estado de qual personagem está visível/ativo.
  - CharacterCard: Componente burro (dumb component) que recebe via *props* os dados do personagem (nome, nível, status, imagem) e a *prop* isActive para alternar a cor da borda de azul para roxo.
- ActivityDashboard: Grid container inferior.
  - DailyQuestsWidget
  - WeeklyChallengesWidget (renderiza múltiplos ProgressBarItem)
  - EventCalendarWidget
  - AchievementsWidget
### **3.2. Gerenciamento de Estado de UI**
- **Seleção de Conta:** O dropdown do cabeçalho deve atualizar o estado global, o que por sua vez deve re-renderizar (ou animar a transição) dos cartões exibidos na seção "Meus Personagens".
- **Paginação do Carrossel:** As setas direcionais e os pontos indicadores (dots) na base do carrossel devem gerenciar o *offset* da lista de personagens visíveis.
### **3.3. CSS e Animações**
- **Efeitos Neon (Glow):** Utilize box-shadow combinada com cores rgba e valores de *blur* altos para criar o efeito neon nas bordas dos cartões de personagem. Exemplo: box-shadow: 0 0 10px rgba(137, 255, 255, 0.5), inset 0 0 5px rgba(137, 255, 255, 0.3);
- **Transições:** Aplique transition: all 0.3s ease-in-out para interações de *hover* nos botões, abertura do menu dropdown, e transição de bordas dos cards de personagens.
- **Recorte de Imagens:** As imagens de fundo dos cards devem usar object-fit: cover associado a máscaras de gradiente (CSS linear-gradient overlay) para que o texto inserido na parte inferior do card permaneça sempre legível.

