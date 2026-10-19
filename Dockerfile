FROM node:26-alpine
WORKDIR /app
LABEL org.opencontainers.image.title="HummingEngine" \
      org.opencontainers.image.description="A service that puts hummingbirds into a scramjet" \
      org.opencontainers.image.version="8.1.0" \
      org.opencontainers.image.authors="hummingbird-9" \
      org.opencontainers.image.source="https://github.com/hummingbird-9/HummingEngine"
RUN apk add --no-cache tor musl bash python3 py3-pip make g++ gcc libc-dev gcompat
RUN npm install -g corepack
RUN corepack enable && corepack prepare pnpm@latest --activate

COPY . .
RUN pnpm run fresh-install
RUN pnpm run build
EXPOSE 10000 9050 9051
COPY serve.sh /serve.sh
RUN sed -i 's/\r$//' /serve.sh && chmod +x /serve.sh
CMD ["/serve.sh"]
