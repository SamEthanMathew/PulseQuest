# PowerShell script to create tar.gz archive for Android
param(
    [string]$Format = "tar.gz"
)

Write-Host "📦 Creating submission artifact: pulsequest.$Format" -ForegroundColor Cyan

if (!(Test-Path "dist\index.html")) {
    Write-Host "❌ dist\index.html not found. Run npm run build first." -ForegroundColor Red
    exit 1
}

# Use tar (built-in on Windows 10+)
Write-Host "Creating tar archive..." -ForegroundColor Yellow
tar -czf "pulsequest.$Format" -C dist .

if (!(Test-Path "pulsequest.$Format")) {
    Write-Host "❌ Failed to create archive" -ForegroundColor Red
    exit 1
}

$size = (Get-Item "pulsequest.$Format").Length
$limit = 15360

Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host "Archive: pulsequest.$Format" -ForegroundColor White
Write-Host "Size:    $size bytes" -ForegroundColor White
Write-Host "Limit:   $limit bytes" -ForegroundColor White
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan

if ($size -ge $limit) {
    $over = $size - $limit
    Write-Host "❌ ERROR: $over bytes over limit!" -ForegroundColor Red
    exit 1
}

$remaining = $limit - $size
$percent = [math]::Round(($size / $limit) * 100, 1)
Write-Host "✓ SUCCESS: $remaining bytes remaining ($percent% of limit)" -ForegroundColor Green
