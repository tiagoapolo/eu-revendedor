# Eu revendedor App

O app consiste em um um sistema para seus revendedores(as) cadastrarem suas compras e acompanhar o retorno de cashback de cada um.

Contato: tiagoapolo@gmail.com

![App Screenshot](./app-image.png)

#### Pré-requisitos

- Node.JS (12.x) => [**Instalação**](https://nodejs.org/en/download/)
- NPM (6.x)

Obs.: O app não utiliza frameworks de estilo (e.g. Material, Boostrap, Bulma)


## Passos para rodar localmente

Instale os pacotes necessários:

`$ npm i`

Rode o servidor de backend (PORTA 8888):

`$ npm run server`


Rode o App (PORTA 3000):

`$ npm start`


Credenciais usuário teste:

- tiagoapolo@gmail.com
- teste


## Backend

Porta em uso: 8888

Rotas

**Retorna o saldo do cashback**

Criado como forma de proxy devido ao servidor não estar com o Access-Control-Allow-Origin em *

- GET /api/cashback:
  
  - query: cpf

