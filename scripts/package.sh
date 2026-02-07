#!/usr/bin/env bash
# Package web folder into compressed archive
set -euo pipefail

OUT_NAME="vibequest-web"
FORMAT="${1:-tar.gz}"

cd "$(dirname "$0")/.."

case "$FORMAT" in
  tar.gz)
    tar -czf "${OUT_NAME}.tar.gz" -C web .
    echo "Created ${OUT_NAME}.tar.gz"
    ;;
  tar.br)
    tar -cf "${OUT_NAME}.tar" -C web .
    brotli "${OUT_NAME}.tar" -o "${OUT_NAME}.tar.br"
    rm "${OUT_NAME}.tar"
    echo "Created ${OUT_NAME}.tar.br"
    ;;
  tar.zst)
    tar -cf "${OUT_NAME}.tar" -C web .
    zstd "${OUT_NAME}.tar" -o "${OUT_NAME}.tar.zst"
    rm "${OUT_NAME}.tar"
    echo "Created ${OUT_NAME}.tar.zst"
    ;;
  *)
    echo "Usage: $0 [tar.gz|tar.br|tar.zst]"
    exit 1
    ;;
esac

ls -lh "${OUT_NAME}".*
