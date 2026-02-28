FROM node:22-alpine AS test-npm
ENTRYPOINT ["npx", "--yes", "cf-speedtest"]

FROM node:22-alpine AS test-pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate
ENTRYPOINT ["pnpm", "dlx", "cf-speedtest"]

FROM node:22-alpine AS test-yarn
RUN corepack enable
ENTRYPOINT ["yarn", "dlx", "cf-speedtest"]

FROM oven/bun:alpine AS test-bun
ENTRYPOINT ["bunx", "cf-speedtest"]
