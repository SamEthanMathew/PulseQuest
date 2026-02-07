# PowerShell packaging script for Windows
Write-Host "📦 Packaging Axon submission..." -ForegroundColor Cyan

# Create tar archive
Write-Host "Creating tar archive..."
tar -cf vibequest.tar -C dist .

# Compress with brotli
Write-Host "Compressing with brotli (quality 11)..."
brotli -f -q 11 vibequest.tar

# Check size
if (Test-Path vibequest.tar.br) {
  $SIZE = (Get-Item vibequest.tar.br).Length
  $LIMIT = 15360
  
  Write-Host ""
  Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Yellow
  Write-Host "Archive: vibequest.tar.br" -ForegroundColor White
  Write-Host "Size:    $SIZE bytes" -ForegroundColor White
  Write-Host "Limit:   $LIMIT bytes" -ForegroundColor White
  Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Yellow
  
  if ($SIZE -ge $LIMIT) {
    $OVER = $SIZE - $LIMIT
    Write-Host "❌ ERROR: Archive is $OVER bytes over limit!" -ForegroundColor Red
    Remove-Item vibequest.tar
    exit 1
  }
  
  $REMAINING = $LIMIT - $SIZE
  $PERCENT = [math]::Round(($SIZE / $LIMIT) * 100, 1)
  Write-Host "✓ SUCCESS: $REMAINING bytes remaining (${PERCENT}% of limit)" -ForegroundColor Green
  Write-Host ""
  
  Remove-Item vibequest.tar
} else {
  Write-Host "❌ ERROR: Failed to create vibequest.tar.br" -ForegroundColor Red
  exit 1
}
