# Atividade09

Projeto de e-commerce com frontend em Vue e API em Express/TypeScript, usando PostgreSQL como banco de dados
## Estrutura do projeto

### Raiz

- `index.html`: arquivo HTML principal usado pelo Vite para carregar o frontend.
- `package.json`: scripts, dependencias e configuracoes basicas do projeto.
- `vite.config.ts`: configuracao do Vite.
- `tsconfig.json`: configuracao TypeScript do frontend.
- `tsconfig.server.json`: configuracao TypeScript do backend.
- `docker-compose.yml`: configuracao do container PostgreSQL.
- `banco.txt`: anotacoes com dados de conexao e comandos uteis para rodar o projeto.

### `src`

Pasta principal do codigo fonte. Ela mistura o frontend Vue e a API Express.

- `assets`: imagens usadas na loja, como notebook, smartphone e tablet.
- `Components`: componentes Vue reutilizaveis, como cards de produto e formularios.
- `composables`: funcoes reutilizaveis do Vue. O `useShop.ts` concentra estado e acoes da loja/carrinho.
- `controllers`: controladores da API. Recebem as requisicoes HTTP e chamam os services.
- `data`: contem dados dos produtos
- `database`: conexao, schema SQL e inicializacao do banco PostgreSQL.
- `dtos`: objetos de transferencia de dados usados para padronizar entrada e saida da API.
- `entities`: entidades de dominio do backend, como `Product`, `Category` e `User`.
- `enums`: enumeracoes compartilhadas, como os papeis de usuario.
- `errors`: erros customizados da aplicacao.
- `interfaces`: interfaces TypeScript compartilhadas, como itens do carrinho.
- `layouts`: layouts Vue principais, como loja do consumidor e painel admin.
- `middlewares`: middlewares Express para autenticacao, autorizacao, validacao, logs e erros.
- `models`: modelos usados pelo frontend Vue.
- `repositories`: camada de acesso ao banco de dados.
- `router`: configuracao das rotas do frontend com Vue Router.
- `routes`: definicao das rotas da API Express.
- `schemas`: schemas de validacao com Zod.
- `services`: regras de negocio da API.
- `stores`: stores Pinia, como autenticacao do usuario.
- `views`: telas principais do frontend, como Home, Checkout, Login e Admin.
