# Fase de build
FROM node:22.18.0-alpine AS build-stage

WORKDIR /src

# Instala dependências
COPY ./backend/package.json /src
RUN npm install

# Copia o restante da aplicação
COPY ./backend /src
RUN chmod +x /src/entrypoint.sh

# Compila TypeScript
RUN npx tsc

# Fase de produção
FROM node:22.18.0-alpine AS publish-stage

WORKDIR /src

# Copia apenas o necessário da build
COPY --from=build-stage /src/dist /src/dist
COPY --from=build-stage /src/node_modules /src/node_modules
COPY --from=build-stage /src/prisma /src/prisma
COPY --from=build-stage /src/package.json /src/package.json
COPY --from=build-stage /src/entrypoint.sh /src/entrypoint.sh

RUN chmod +x /src/entrypoint.sh

# Gera Prisma Client
RUN npx prisma generate

RUN apk add --no-cache dumb-init

EXPOSE 3000

# Roda o script de entrada
ENTRYPOINT ["dumb-init", "--", "/src/entrypoint.sh"]