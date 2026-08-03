FROM alpine:3.21

RUN apk add --no-cache ca-certificates curl tar

ARG TARGETARCH=amd64
ARG VERSION=latest

RUN set -eux; \
  if [ "$VERSION" = "latest" ]; then \
    url="https://github.com/ruchernchong/cf-speedtest/releases/latest/download/cf-speedtest_linux_${TARGETARCH}.tar.gz"; \
  else \
    url="https://github.com/ruchernchong/cf-speedtest/releases/download/${VERSION}/cf-speedtest_linux_${TARGETARCH}.tar.gz"; \
  fi; \
  curl -fsSL "$url" | tar -xz -C /usr/local/bin; \
  chmod +x /usr/local/bin/cf-speedtest; \
  apk del curl tar

ENTRYPOINT ["cf-speedtest"]
