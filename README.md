<h1 align="center" style="text-align: center;">
  <img alt="Logo do Food Explorer" src="./src/Assets/Favicon.svg" style="vertical-align: middle; margin-right: 10px;">
  Food Explorer
</h1>

> BackEnd de um cardápio digital para um restaurante fictício

<p align="center">
  <a href="#project">Projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#structure">Estrutura</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#technologies">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#usage">Utilização</a>&nbsp;&nbsp;&nbsp;
</p>

<h2 id="project">📁 Projeto</h2>

O projeto Food Exporer deste repositório refere-se ao desafio final do curso Explorer da Rocketseat, compondo um cardápio digital de um restaurante fictício.

Este repositório está composto apenas pelo BackEnd do projeto, responsável pela lógica da aplicação e armazenamento dos dados.
Fique a vontade para visualizar o projeto de FrontEnd da aplicação, responsável pela interface do usuário, clicando [aqui](https://github.com/Cesar-Rieg/FoodExplorer-Frontend).

<h2 id="structure">🎲 Estrutura do Banco de Dados</h2>

O Banco de dados foi estruturado com as seguintes tabelas:

- CategoriaDoProduto (responsável por persistir as categorias dos produtos)
- Favorito (responsável por persistir os favoritos dos usuários)
- Imagem (responsável por persistir dados das imagens - exceto arquivo físico)
- PerfilDeUsuario (responsável por persistir os perfis de usuário)
- Produto (responsável por persistir os produtos)
- ProdutoInsumo (responsável por persistir os ingredientes dos produtos)
- Usuario (responsável por persistir os usuários)
<br/>
<span>Obs.: As tabelas que possuem operações de escrita, foram implementadas com o conceito de exclusão lógica, persistindo as colunas Excluido, DataDeExclusao, e UsuarioDeExclusaoId</span>

<h2 id="technologies">💻 Tecnologias</h2>

Tecnologias utilizadas no desenvolvimento:

- Bcrypt.js
- CORS
- Date and Time
- Dotenv
- Express.js
- express-async-errors
- JSON Web Token
- Knex.js
- Node.js
- Multer
- PM2
- SQLite
- SQLite3
- UUID

<h2 id="usage">💡 Utilização</h2>

O back-end do projeto está hospedado no endereço {link do back-end hospedado}. A aplicação Food Explorer está disponível para uso [aqui](link do frond-end hospedado).

⚠️ **Importante**: Como este projeto está hospedado em um serviço gratuito, podem ocorrer atrasos no tempo de resposta do servidor.

É possível também executar na máquina local. Para isto, é necessário que você tenha instalado o ``Node.js`` e o ``npm`` antes de prosseguir com as etapas a seguir:

1. Clone o projeto:

```
$ git clone https://github.com/Cesar-Rieg/FoodExplorer-Backend
```

2. Acesse a pasta do projeto:

```
$ cd FoodExplorer-Backend
```

3. Instale as dependências:

```
$ npm install
```

4. Execute as migrações e inicie o servidor:

```
$ npm run dev
```


⚠️ **Importante**: Crie um arquivo .env de acordo com o arquivo .env.example e preencha os campos ``AUTH_SECRET`` e ``PORT`` com suas respectivas informações.

- Para gerar o valor para o campo AUTH_SECRET, você pode utilizar algum gerador MD5 ou outro gerador de criptografia aleatória.

- No campo PORT deve ser informado o número da porta que irá executar o servidor da aplicação.


---

Desenvolvido por César Rieg

<div style="display: flex;">
  <a href="https://www.linkedin.com/in/cesar-rieg/" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" style="margin-right: 2vw" target="_blank"></a>
  <a href="mailto:cesarjeanrieg97@gmail.com"><img src="https://img.shields.io/badge/-Gmail-%23333?style=for-the-badge&logo=gmail&logoColor=white" style="margin-right: 2vw" target="_blank"></a>
  <a href="http://discordapp.com/users/cesar.rieg" target="_blank"><img src="https://img.shields.io/badge/Discord-7289DA?style=for-the-badge&logo=discord&logoColor=white" style="margin-right: 2vw" target="_blank"></a>
  <a href="https://www.instagram.com/cesar.rieg/" target="_blank"><img src="https://img.shields.io/badge/-Instagram-%23E4405F?style=for-the-badge&logo=instagram&logoColor=white" target="_blank"></a>
</div>