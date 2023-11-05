FROM node:20-alpine

ARG USERID=1001
ARG GROUPID=1001
ARG DATABASE_URL

# RUN addgroup --system --gid $GROUPID nodeuser
# RUN adduser --system --uid $USERID --gid $GROUPID nodeuser

WORKDIR /app
ENV PORT=8080
ENV DATABASE_URL=$DATABASE_URL

ADD package*.json ./
ADD tsconfig.json ./
ADD src src
ADD config config
ADD prisma prisma

RUN npm ci
RUN npm run prisma:gen
RUN npm run build

CMD ["node", "build/index.js"]
