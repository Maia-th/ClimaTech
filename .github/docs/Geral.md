# Estrutura Geral do Projeto

## Front-End

### Tecnologias:

<div style="text-align: center;">
  <img alt="HTML" height=28 src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" style="margin: 5px;">
  <img alt="CSS" height=28 src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" style="margin: 5px;">
  <img alt="Tailwind" height=28 src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" style="margin: 5px;">
  <img alt="JavaScript" height=28 src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" style="margin: 5px;">
</div>

### Estrutura de Pastas

#### 1. **Pasta `assets/`**
- Armazena arquivos estáticos como imagens, fontes e ícones.
- Esses arquivos são utilizados em várias partes do projeto.
- Ex: `logo.png`, `background.jpg`, `icon.svg`.

#### 2. **Pasta `pages/`**
- Organiza as páginas do aplicativo, que refletem diretamente as rotas.
- Ex: `login.html` (rota `/login`), `admin/dashboard.html` (rota `/admin/dashboard`).

#### 3. **Pasta `scripts/`**
- Contém os arquivos JavaScript do projeto.
- Esses scripts adicionam interatividade e funcionalidades ao site.

#### 4. **Pasta `styles/`**
- Armazena os arquivos CSS do projeto.
- Esses arquivos definem o estilo e layout das páginas.

#### 5. **Pasta `api/`**
- Contém o código do backend do projeto.
- Aqui você desenvolve a lógica do servidor, rotas de API e manipulação de banco de dados.

## Back-End

### Tecnologias:

<div style="text-align: center;">
  <img alt="Node.js" height=28 src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" style="margin: 5px;">
  <img alt="Express" height=28 src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" style="margin: 5px;">
  <img alt="MySQL" height=28 src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white" style="margin: 5px;">
</div>

### Estrutura de Pastas

#### 1. **Pasta `controllers/`**
- Contém a lógica dos controladores, que manipulam as requisições e respostas.
- Ex: `userController.js`, `authController.js`.

#### 2. **Pasta `models/`**
- Contém os modelos de dados, geralmente definidos com Mongoose (para MongoDB) ou Sequelize (para SQL).
- Ex: `userModel.js`, `productModel.js`.

#### 3. **Pasta `routes/`**
- Define as rotas da API e associa cada rota ao seu controlador.
- Ex: `userRoutes.js`, `authRoutes.js`.

#### 4. **Pasta `middlewares/`**
- Contém middlewares personalizados para manipulação de requisições.
- Ex: `authMiddleware.js`, `errorHandler.js`.

#### 5. **Pasta `utils/`**
- Contém funções utilitárias que podem ser reutilizadas em várias partes do projeto.
- Ex: `logger.js`, `helperFunctions.js`.

#### 6. **Pasta `config/`**
- Contém arquivos de configuração, como configuração de banco de dados e variáveis de ambiente.
- Ex: `dbConfig.js`, `appConfig.js`.

#### 7. **Arquivo `index.js`**
- Ponto de entrada do servidor Express.
- Configura o servidor e define as rotas principais.

## Banco de Dados

<div style="text-align: center;">⚠️ Diagrama ER Em Breve!</div>

- [Dicionário de Dados](.github/docs/dicionarioBD.md)