#!/usr/bin/env bash
set -euo pipefail

echo "📦 Packaging Axon submission..."

# Create tar archive
echo "Creating tar archive..."
tar -cf vibequest.tar -C dist .

# Compress with brotli
echo "Compressing with brotli (quality 11)..."
brotli -f -q 11 vibequest.tar

# Check size
if [ -f vibequest.tar.br ]; then
  SIZE=$(stat -c%s vibequest.tar.br 2>/dev/null || stat -f%z vibequest.tar.br 2>/dev/null || wc -c < vibequest.tar.br)
  LIMIT=15360
  
  echo ""
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "Archive: vibequest.tar.br"
  echo "Size:    $SIZE bytes"
  echo "Limit:   $LIMIT bytes"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  
  if [ $SIZE -ge $LIMIT ]; then
    OVER=$((SIZE - LIMIT))
    echo "❌ ERROR: Archive is $OVER bytes over limit!"
    rm vibequest.tar
    exit 1
  fi
  
  REMAINING=$((LIMIT - SIZE))
  PERCENT=$(awk "BEGIN {printf \"%.1f\", ($SIZE / $LIMIT) * 100}")
  echo "✓ SUCCESS: $REMAINING bytes remaining (${PERCENT}% of limit)"
  echo ""
  
  rm vibequest.tar
else
  echo "❌ ERROR: Failed to create vibequest.tar.br"
  exit 1
fi
