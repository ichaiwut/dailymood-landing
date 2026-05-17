# syntax=docker/dockerfile:1.7

# ────────────────────────────────────────────────────────────────────────────
# Stage 1: Build the Astro static site
# ────────────────────────────────────────────────────────────────────────────
FROM node:20-alpine AS build
WORKDIR /app

# Install deps from lockfile for reproducible builds.
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

# Public env vars must be present at build time — Astro inlines them into
# the static output. Pass them in via Railway service variables; Railway
# auto-promotes them to docker build args when set.
ARG PUBLIC_SITE_URL=https://dailymood.me
ARG PUBLIC_APP_URL=https://my.dailymood.me
ARG PUBLIC_GA_ID=
ENV PUBLIC_SITE_URL=$PUBLIC_SITE_URL \
    PUBLIC_APP_URL=$PUBLIC_APP_URL \
    PUBLIC_GA_ID=$PUBLIC_GA_ID

COPY . .
RUN npm run build

# ────────────────────────────────────────────────────────────────────────────
# Stage 2: Serve dist/ with Caddy
# ────────────────────────────────────────────────────────────────────────────
FROM caddy:2-alpine AS serve

COPY --from=build /app/dist /usr/share/caddy
COPY Caddyfile /etc/caddy/Caddyfile

# Railway injects PORT at runtime — Caddy reads it via {$PORT:80} in Caddyfile.
EXPOSE 8080
CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile", "--adapter", "caddyfile"]
