# Sujeito Pizzaria

[![NPM](https://img.shields.io/npm/l/react)](https://github.com/SenhorOver/pizzaria-fullstack-application/blob/master/LICENSE)

# Sobre o projeto

Sujeito pizzaria é uma aplicação fullstack, que possui todo o funcionamento necessário para funcionar em um estabelecimento real.

Sujeito pizzaria possui um banco de dados que armazena as categorias e produtos cadastrados, além de armazenar pedidos feitos por clientes e os respectivos itens associado com os pedidos.

## App - Garçom

App serve para o garçom abrir uma mesa, adicionar produtos no pedido e enviar a mesa para o responsável na cozinha.

Login

<img src="https://i.ibb.co/k6s2zcr3/Screenshot-1756434621.png" alt="Screenshot-1756434621" border="0" width="300px" />

Novo pedido

<img src="https://i.ibb.co/JRVy1vDw/Screenshot-1756434739.png" alt="Screenshot-1756434621" border="0" width="300px" />

Adicionar produtos

<img src="https://i.ibb.co/PvRf9X3s/Screenshot-1756434760.png" alt="Screenshot-1756434744" border="0" width="300px" />

Finalizar pedido

<img src="https://i.ibb.co/7xZgMZM6/Screenshot-1756434767.png" alt="Screenshot-1756434767" border="0" width="300px" />

## WEB - Adm

Site serve para receber os pedidos dos clientes e finalizar os pedidos. Também é possível criar categorias e inserir novos produtos no sistema.

Login
![Web 1](https://i.ibb.co/0RwmfLBJ/Screenshot-from-2025-08-28-23-37-26.png)

Dashboard
![Web 2](https://i.ibb.co/wZzQvrfT/Screenshot-from-2025-08-28-23-37-42.png)

Dashboard - (Detalhes de um pedido)
![Web 3](https://i.ibb.co/SwfMbfb6/Screenshot-from-2025-08-28-23-37-48.png)

Cadastrar categorias
![Web 4](https://i.ibb.co/WWbmDjdV/Screenshot-from-2025-08-28-23-37-52.png)

Cadastrar produtos
![Web 5](https://i.ibb.co/7d9LYFf7/Screenshot-from-2025-08-28-23-38-45.png)

Entre outras páginas...

# Tecnologias utilizadas

## App

- React Native
- Expo
- AsyncStorage
- Axios

## Back end

- PostgreSQL
- NodeJS
- ExpressJS
- Multer
- PrismaORM
- JWT
- BCrypt

## Front end

- HTML / CSS / JS / TypeScript
- ReactJS
- NextJS
- SASS
- React-toastify
- Nookies
- React-modal
- Axios

# Como executar o projeto

Existem duas formas, inicializando um processo de cada vez, ou inicializar com docker.

IMPORTANTE:

- Necessário criar arquivo .env na pasta "/mobile/" com o conteúdo:

```.env
# Por padrão o backend estará rodando na porta :3333
EXPO_PUBLIC_API_URL=http://localhost:3333
```

SE VOCÊ OPTOU POR NÃO UTILIZAR DOCKER:

- Necessário criar arquivo .env na pasta "/frontend/" com o conteúdo:

```.env
# Por padrão o backend estará rodando na porta :3333
NEXT_PUBLIC_API_URL: http://localhost:3333
```

- Necessário criar arquivo .env na pasta "/backend/" com o conteúdo:

```.env
# URL padrão do banco de dados
DATABASE_URL: "postgresql://SeuUsuario:SuaSenha@db:5432/pizzaria?schema=public"

# Senha do token JWT
JWT_SECRET: senhaJWT
```

## Inicialização individual:

### 1° Terminal - Frontend

Pré-requisitos: npm / yarn / postgreSQL

```bash
# clonar repositório
git clone https://github.com/SenhorOver/pizzaria-fullstack-application.git

# entrar na pasta do projeto
cd pizzaria-fullstack-application

# entrar na pasta do frontend
cd frontend

# instalar dependências
npm install

# executar o projeto (desenvolvimento)
npm run dev
```

### 2° Terminal - Back end

```bash
# entrar na pasta do projeto
cd pizzaria-fullstack-application

# entrar na pasta do backend
cd backend

# instalar dependências
npm install

# executar o projeto (desenvolvimento)
npm run dev
```

### 3° Terminal - App

Para ver o aplicativo rodando, é necessário utilizar um emulador android (possível utilizar emulador do Android Studio).

Também é possível baixar o aplicativo "expo-go" no seu celular e escanear o QR Code que vai aparecer ao 'executar o projeto'

```bash
# entrar na pasta do projeto
cd pizzaria-fullstack-application

# entrar na pasta do app
cd mobile

# instalar dependências
npm install

# executar o projeto (desenvolvimento)
npm run start
```

## Via Docker:

Pré-requisitos: Docker engine / npm

```bash
# clonar repositório
git clone https://github.com/SenhorOver/pizzaria-fullstack-application.git

# entrar na pasta do projeto
cd pizzaria-fullstack-application

# Subir os containers com docker-compose
docker compose up --build -d
```

### 2° Terminal - App

Para ver o aplicativo rodando, é necessário utilizar um emulador android (possível utilizar emulador do Android Studio).

Também é possível baixar o aplicativo "expo-go" no seu celular e escanear o QR Code que vai aparecer ao 'executar o projeto'

```bash
# entrar na pasta do projeto
cd pizzaria-fullstack-application

# entrar na pasta do app
cd mobile

# instalar dependências
npm install

# executar o projeto (desenvolvimento)
npm run start
```

# Autor

Marcos Vinicius Silva

https://www.linkedin.com/in/marcos-v-s/
