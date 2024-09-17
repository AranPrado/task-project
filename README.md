<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Descrição

Este é um projeto desenvolvido com o framework [NestJS](https://nestjs.com/) que oferece uma API para gerenciar autenticação, usuários e tarefas.

## Funcionalidades

### Autenticação (Auth)
- **Login** (`POST /auth/login`): Autentica um usuário com e-mail e senha.
- **Register** (`POST /auth/register`): Registra um novo usuário.
- **Recover Password** (`POST /auth/recover-password`): Permite a recuperação da senha, validando o e-mail e atualizando diretamente a senha.

### Usuários (User)
- **Update User** (`PATCH /users/updateUser/:idUser`): Atualiza as informações de um usuário existente.
- **Filter Unique User** (`GET /users/findUserById/:idUser`): Obtém informações detalhadas de um usuário específico.
- **Filter All Task User** (`GET /users/findTask/:idUser`): Retorna todas as tarefas de um usuário.
- **Filter Task Unique User** (`GET /users/findTaskUniqueUser/:idUser/:idTask`): Retorna uma tarefa específica associada a um usuário.
- **Delete User** (`DELETE /users/deleteUser/:idUser`): Exclui um usuário do sistema.

### Tarefas (Task)
- **Create Task** (`POST /task/createdTask/:idUser`): Cria uma nova tarefa para o usuário.
- **Update Task** (`PATCH /task/updateTaskUser/:idTask/:idUser`): Atualiza uma tarefa existente do usuário.
- **Delete Task** (`DELETE /task/deleteTaskUser/:idTask/:idUser`): Exclui uma tarefa específica do usuário.

## Configuração do Projeto

1. Clone o repositório:

```bash
$ git clone https://github.com/AranPrado/task-project.git
$ cd task-project
```
## Instale as dependências:

```bash
$ npm install
```

## Execução do Projeto

```bash
# Desenvolvimento
$ npm run start

# Modo de observação
$ npm run start:dev

# Produção
$ npm run start:prod
```

#### Projeto desenvolvidor por Aran Prado.


