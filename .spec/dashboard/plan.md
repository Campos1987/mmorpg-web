### **Fase 1: Setup e Configuração Base (Dias 1-2)**
O objetivo aqui é preparar o terreno, garantindo que o ambiente de desenvolvimento esteja pronto e os recursos visuais mapeados.

1. **Inicialização do Projeto:**
   1. Criar o projeto base com Next.js (utilizando o App Router e Turbopack para otimizar o build local).
   1. Configurar TypeScript para garantir a tipagem rigorosa, especialmente para os mocks de dados que virão do back-end.
   1. Instalar e inicializar o Tailwind CSS.
1. **Configuração do Design System (Tailwind):**
   1. Mapear as variáveis globais no tailwind.config.ts.
   1. Adicionar as paletas de cores customizadas (Neon Bleu, Neon Purple, tons de Background).
   1. Criar classes utilitárias personalizadas no global.css para os efeitos de *glassmorphism* (fundo translúcido com blur) e os brilhos de neon (box-shadow).
1. **Gestão de Assets:**
   1. Exportar ou separar os SVGs necessários (Logo GamerHub, ícones de moedas, ícones de missões).
   1. Organizar a pasta public/assets para as imagens de avatar e os backgrounds dos personagens.
### **Fase 2: Componentização Core (Dias 3-4)**
Antes de montar a página inteira, é melhor criar os blocos de montar (componentes "burros" ou de apresentação).

1. **Elementos Base de UI:**
   1. Desenvolver o componente <Badge /> (para nível e notificações).
   1. Desenvolver o componente de <ProgressBar /> customizado, com suporte a cores dinâmicas (vermelho para PV, azul para PM, roxo/azul para XP).
   1. Criar a estrutura base de um <Card /> translúcido, que servirá de container para quase todos os widgets do painel.
1. **Componentes de Navegação e Header:**
   1. Criar a <Navbar /> superior, implementando o estado de hover e a sinalização de link ativo com o acento em Azul Neon.
   1. Construir o componente <CurrencyDisplay /> para as moedas da conta.
   1. Desenvolver o <CustomDropdown /> para a seleção de sub-contas (evitando o select nativo do navegador para manter o estilo visual "Cyber-Fantasy").
### **Fase 3: Construção dos Cards Complexos (Dias 5-6)**
Foco nos elementos que exigem mais atenção aos detalhes visuais e de posicionamento.

1. **Card de Personagem (<CharacterCard />):**
   1. Implementar a imagem de fundo com object-fit e aplicar a máscara de gradiente linear para escurecer a base.
   1. Adicionar a propriedade condicional isActive para alternar a borda brilhante entre azul (inativo) e roxo (ativo).
   1. Posicionar os status numéricos, as barras de PV/PM e o resumo de equipamentos.
1. **Widgets de Atividades:**
   1. Criar o <DailyQuestItem /> (com o visual de caixa e o checkmark de conclusão).
   1. Montar o <EventCalendarCard /> com sua própria imagem de fundo esmaecida.
   1. Estruturar as linhas de <AchievementItem />.
### **Fase 4: Integração de Layout e Mocks (Dia 7)**
Unir todos os componentes criados em uma única view.

1. **Estrutura da Página Principal (/dashboard):**
   1. Utilizar CSS Grid ou Flexbox do Tailwind para posicionar a Navbar, o Header da Conta, a Seção de Personagens e o Grid de Atividades inferior (2x2 ou adaptável).
1. **Mocking de Dados:**
   1. Criar um arquivo mockData.ts contendo arrays de objetos para simular a resposta futura da API.
   1. *Exemplo:* Mockar a lista de personagens, os desafios semanais e os valores das moedas, para que a interface não fique estática durante o desenvolvimento.
### **Fase 5: Interatividade e Estado (Dia 8)**
Fazer a tela "ganhar vida" sem depender do back-end.

1. **Gerenciamento de Estado (React Hooks):**
   1. Implementar o useState na página principal para controlar qual sub-conta está selecionada no dropdown.
   1. Garantir que a seleção no dropdown reflita visualmente nos Cards de Personagens (passando o estado ativo para o card correspondente).
1. **Carrossel de Personagens:**
   1. Implementar a lógica de rolagem horizontal (podendo usar CSS overflow-x-auto com snap-mandatory ou uma biblioteca leve de carrossel se precisar das setas < e > controlando o scroll via JavaScript).
### **Fase 6: Polimento e Responsividade (Dias 9-10)**
A revisão final para garantir a melhor experiência do usuário.

1. **Adaptação Mobile/Tablet:**
   1. Ajustar as classes do Tailwind (ex: md:grid-cols-2, lg:grid-cols-4) para garantir que o layout quebre de forma elegante em telas menores.
   1. Esconder itens de menu complexos na Navbar mobile, substituindo por um menu hambúrguer, se necessário.
1. **Animações e Transições:**
   1. Revisar todas as transições de hover (ex: transition-all duration-300).
   1. Garantir que o *glassmorphism* e as sombras de neon estejam performáticas e não causem lentidão no render.

