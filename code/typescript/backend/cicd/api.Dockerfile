FROM node:18-alpine as install

WORKDIR /usr/src/app

COPY package.json ./
COPY pnpm-lock.yaml ./
COPY prisma/ ./prisma
COPY scripts/ ./scripts

RUN npm i pnpm -g &&\
    pnpm i &&\
    pnpm gen:prisma &&\
    pnpm i --prod

FROM node:18-alpine

WORKDIR /app

COPY --from=install /usr/src/app /app

# copy built files
COPY dist/ . 

ENV TZ='Asia/Kuala_Lumpur'

# production port
EXPOSE 3000

CMD [ "node", "apps/api/main" ]