# Server de Gerenciamento de Clientes

Este é um servidor de gerenciamento de clientes criado para a loja do meu pai. O objetivo deste projeto é permitir que os pedidos dos clientes sejam adicionados a uma base de dados quando meu pai não está em casa, proporcionando a ele um controle das pessoas que vieram e o que elas pediram.

## Tecnologias Utilizadas

- Node.js
- Fastify
- Prisma IO
- PostgreSQL

## Instalação

Primeiro, clone o repositório para a sua máquina local. Em seguida, instale as dependências do projeto com o seguinte comando:

```bash
npm install

````
## Scripts Disponíveis
No diretório do projeto, você pode executar:

```bash
npm run build: Compila o projeto.
````
```bash
npm run dev: Inicia o servidor em modo de desenvolvimento.
````
```bash
npm run lint: Executa o ESLint no código.
````

## Funcionalidades

O servidor conta com as seguintes funcionalidades:

- CRUD completo para `Client` e `Order`.
- Filtrar clientes por ID e nome.
- Filtrar `Order` por ID e status.
- 
## Estrutura do Banco de Dados
O banco de dados consiste em duas entidades: Client e Order. A entidade Client tem um relacionamento um-para-muitos com a entidade Order.

## Client
- id: Identificador único do cliente (UUID).
- name: Nome do cliente.
- phone: Número de telefone do cliente (único).
- orders: Lista de pedidos feitos pelo cliente.
## Order
- id: Identificador único do pedido (UUID).
- description: Descrição do pedido.
- status: Status do pedido (RESOLVED ou PENDING).
- createdAt: Data e hora de criação do pedido.
- clientId: Identificador do cliente que fez o pedido.
- client: Cliente que fez o pedido.

## Licença
Este projeto está licenciado sob a licença ISC.




