FROM node:22-alpine AS test-npm
USER node
ENTRYPOINT ["npx", "--yes", "cf-speedtest"]

FROM node:22-alpine AS test-pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate
USER node
ENTRYPOINT ["pnpm", "dlx", "cf-speedtest"]

FROM node:22-alpine AS test-yarn
RUN corepack enable
USER node
ENTRYPOINT ["yarn", "dlx", "cf-speedtest"]

FROM oven/bun:alpine AS test-bun
USER bun
ENTRYPOINT ["bunx", "cf-speedtest"]
