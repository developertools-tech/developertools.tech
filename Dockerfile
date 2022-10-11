FROM node:18-alpine3.15 AS development
WORKDIR /app
ENV PORT=3000
ENV NODE_ENV=development
EXPOSE 3000
CMD [ "yarn", "dev" ]

FROM node:18-alpine3.15 AS dependencies
ENV NODE_ENV=production
WORKDIR /app
COPY package*.json ./
RUN yarn install --frozen-lockfile

FROM node:18-alpine3.15 AS builder
ENV NODE_ENV=development
WORKDIR /app
COPY . .
RUN yarn install --frozen-lockfile && NODE_ENV=production yarn build

FROM node:18-alpine3.15 AS production
WORKDIR /app
ENV PORT=3000
ENV NODE_ENV=production
COPY --chown=node --from=builder /app/next.config.js ./
COPY --chown=node --from=builder /app/public ./public
COPY --chown=node --from=builder /app/.next ./.next
COPY --chown=node --from=builder /app/package-lock.json /app/package.json ./
COPY --chown=node --from=dependencies /app/node_modules ./node_modules
USER node
EXPOSE 3000
CMD [ "yarn", "start" ]