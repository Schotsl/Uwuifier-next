FROM node:24-bookworm-slim

WORKDIR /app

RUN apt-get update \
  && apt-get install -y --no-install-recommends ca-certificates curl python3 make g++ \
  && rm -rf /var/lib/apt/lists/*

RUN corepack enable \
  && corepack prepare pnpm@11.0.6 --activate

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm build

CMD ["pnpm", "start"]
