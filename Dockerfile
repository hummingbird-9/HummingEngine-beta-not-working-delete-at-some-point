FROM node:26-slim

WORKDIR /app

LABEL org.opencontainers.image.title="HummingEngine" \
      org.opencontainers.image.description="A service that puts hummingbirds into a scramjet" \
      org.opencontainers.image.version="8.1.0" \
      org.opencontainers.image.authors="hummingbird-9" \
      org.opencontainers.image.source="https://github.com"

# Install Tor alongside native glibc cURL/SSL routing libraries
RUN apt-get update && apt-get install -y \
    tor \
    bash \
    python3 \
    make \
    g++ \
    gcc \
    libc6-dev \
    curl \
    libcurl4 \
    libcurl4-openssl-dev \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

RUN npm install -g corepack
RUN corepack enable && corepack prepare pnpm@latest --activate

COPY . .
RUN pnpm run fresh-install
RUN pnpm run build

# Open the public port grid
EXPOSE 10000 9050 9051

COPY serve.sh /serve.sh
RUN sed -i 's/\r$//' /serve.sh && chmod +x /serve.sh
CMD ["/serve.sh"]
