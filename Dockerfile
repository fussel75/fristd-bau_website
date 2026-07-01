# Stage 1 — Dependencies
FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
# Payload 3 + React 19 erfordert legacy-peer-deps Resolution.
# @libsql/linux-x64-musl explizit fuer Alpine (musl libc) - waere sonst
# von npm ci uebersprungen weil das package-lock.json auf Windows gebaut wurde.
RUN npm ci --legacy-peer-deps && \
    npm install --no-save --legacy-peer-deps @libsql/linux-x64-musl

# Stage 2 — Build
FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
ARG PAYLOAD_SECRET=build-placeholder
ARG DATABASE_URI=file:./data/payload.db
ENV PAYLOAD_SECRET=$PAYLOAD_SECRET
ENV DATABASE_URI=$DATABASE_URI
RUN npm run build

# Stage 3 — Runtime
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN apk add --no-cache wget && \
    addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Kein Standalone-Output mehr: wir kopieren .next, node_modules und den Source-
# Code, damit Payload zur Runtime volle drizzle-kit/CLI-Werkzeuge hat (fuer
# push:true Schema-Sync und Payload-CLI).
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./package.json
COPY --from=builder --chown=nextjs:nodejs /app/next.config.mjs ./next.config.mjs
COPY --from=builder --chown=nextjs:nodejs /app/src ./src
COPY --from=builder --chown=nextjs:nodejs /app/tsconfig.json ./tsconfig.json

# Persistenz-Verzeichnisse fuer DB und Bilder-Uploads (via Volumes)
RUN mkdir -p /app/data /app/media && chown -R nextjs:nodejs /app/data /app/media

USER nextjs
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD wget -qO- http://127.0.0.1:3000/api/health >/dev/null 2>&1 || exit 1

CMD ["npm", "run", "start"]
