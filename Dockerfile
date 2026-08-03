FROM alpine:3.21

RUN apk add --no-cache ca-certificates curl tar

ARG TARGETARCH=amd64
ARG VERSION=latest

RUN set -eux; \
  tag="$VERSION"; \
  if [ "$tag" = "latest" ]; then \
    tag=$(curl -fsSL https://api.github.com/repos/ruchernchong/cf-speedtest/releases/latest \
      | sed -n 's/.*"tag_name":[[:space:]]*"\([^"]*\)".*/\1/p' | head -n1); \
    test -n "$tag"; \
  fi; \
  ver="${tag#v}"; \
  url="https://github.com/ruchernchong/cf-speedtest/releases/download/${tag}/cf-speedtest_${ver}_linux_${TARGETARCH}.tar.gz"; \
  curl -fsSL "$url" | tar -xz -C /usr/local/bin cf-speedtest; \
  chmod +x /usr/local/bin/cf-speedtest; \
  apk del curl tar

ENTRYPOINT ["cf-speedtest"]
