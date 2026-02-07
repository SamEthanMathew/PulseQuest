#!/usr/bin/env bash
set -e

FORMAT="${1:-tar.br}"
ARCHIVE="pulsequest.$FORMAT"

echo "🧪 Verifying $ARCHIVE (mimicking Axon judging script)..."

if [ ! -f "$ARCHIVE" ]; then
  echo "❌ $ARCHIVE not found. Run npm run pack first."
  exit 1
fi

# Clean and create extraction directory
rm -rf extracted
mkdir extracted

# Extract based on format
echo "📂 Extracting archive..."
case "$FORMAT" in
  "tar.gz")
    tar -xzf "$ARCHIVE" -C extracted
    ;;
  "tar.br")
    brotli -d "$ARCHIVE" -o pulsequest.tar
    tar -xf pulsequest.tar -C extracted
    rm pulsequest.tar
    ;;
  "tar.zst")
    tar --zstd -xf "$ARCHIVE" -C extracted
    ;;
esac

# Verify index.html exists
if [ ! -f "extracted/index.html" ]; then
  echo "❌ ERROR: extracted/index.html not found!"
  exit 1
fi

echo "✓ Archive extracted successfully"
echo ""
echo "🌐 Starting local server (mimicking judging environment)..."
echo "   URL: http://localhost:8000"
echo "   Press Ctrl+C to stop"
echo ""
cd extracted
python3 -m http.server 8000
