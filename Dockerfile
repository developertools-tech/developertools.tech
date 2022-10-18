FROM node:18-alpine3.15 AS development

WORKDIR /app
COPY package*.json ./
RUN npm ci --frozen-lockfile

COPY . .

RUN npm run build

ENV PORT=3000
ENV NODE_ENV=development
EXPOSE 3000
USER node

CMD [ "npm", "start" ]