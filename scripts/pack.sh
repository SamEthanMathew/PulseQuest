#!/usr/bin/env bash
set -e

FORMAT="${1:-tar.br}"
echo "📦 Creating submission artifact: pulsequest.$FORMAT"

if [ ! -f "dist/index.html" ]; then
  echo "❌ dist/index.html not found. Run npm run build first."
  exit 1
fi

# Create tar archive from dist contents
tar -cf pulsequest.tar -C dist .

case "$FORMAT" in
  "tar.gz")
    gzip -9 -f pulsequest.tar
    mv pulsequest.tar.gz pulsequest.$FORMAT
    ;;
  "tar.br")
    brotli -f -q 11 pulsequest.tar
    rm pulsequest.tar
    ;;
  "tar.zst")
    zstd -19 -f pulsequest.tar -o pulsequest.$FORMAT
    rm pulsequest.tar
    ;;
  *)
    echo "❌ Unsupported format: $FORMAT"
    echo "   Use: tar.gz, tar.br, or tar.zst"
    exit 1
    ;;
esac

SIZE=$(wc -c < "pulsequest.$FORMAT" | tr -d ' ')
LIMIT=15360
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Archive: pulsequest.$FORMAT"
echo "Size:    $SIZE bytes"
echo "Limit:   $LIMIT bytes"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ "$SIZE" -ge "$LIMIT" ]; then
  OVER=$((SIZE - LIMIT))
  echo "❌ ERROR: $OVER bytes over limit!"
  exit 1
fi

REMAINING=$((LIMIT - SIZE))
PERCENT=$(awk "BEGIN {printf \"%.1f\", ($SIZE / $LIMIT) * 100}")
echo "✓ SUCCESS: $REMAINING bytes remaining ($PERCENT% of limit)"
