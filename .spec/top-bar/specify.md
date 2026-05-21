## **🖥️ SPEC: Top Bar (Cabeçalho)**

A Top Bar principal da aplicação. Deve ser fixada no topo (sticky) para facilitar a navegação e manter o usuário engajado durante a rolagem da página. 

### **Requisitos Visuais e de Comportamento**
- **Logo/Branding:** Alinhada à esquerda, servindo como link clicável para a Home.
- **Tipografia:** Os itens de navegação principais devem estar em caixa alta (uppercase).
- **Responsividade:** Em dispositivos móveis e tablets, a navegação principal deve ser ocultada e substituída por um ícone de Menu Hambúrguer interativo, que abre uma gaveta (drawer) ou menu lateral com as opções.
- **Interatividade:** Itens de menu devem possuir um estado de `hover` claro.

### **Estrutura de Navegação (Menus e Submenus)**
Os itens de navegação devem conter indicadores visuais (como um ícone de chevron "˅") para sinalizar quando possuírem um menu expansível (dropdown). Os dropdowns devem abrir suavemente ao passar o mouse ou clicar.

- **Home**
- **Downloads** - **Informações** (Dropdown)
  - Sistemas
  - Itens
  - Habilidades
  - Life Stone
  - Moedas
- **Comunidade & PvP** (Dropdown)
  - Olimpíada
  - Siege
  - Clã
- **Rankings** (Dropdown) 
  - Top PvP
  - Top PK
  - Top Clan
- **Regras**
- **Doações**

### **Botões de Ação (Direita do Cabeçalho)**
Ficarão alinhados à extrema direita. Para incentivar a conversão e o acesso dos jogadores, devem ter destaque visual na interface.

- **Login:** Estilo sutil (ex: texto simples ou botão com estilo fantasma/outline).
- **Registro:** Deve ter destaque máximo (cor primária de preenchimento, alto contraste ou bordas brilhantes), agindo como o botão principal de Call to Action.