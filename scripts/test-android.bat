@echo off
REM Start Python HTTP server for Android testing
cd /d "%~dp0..\test-android"
echo ========================================
echo PulseQuest - Android Test Server
echo ========================================
echo.
echo Serving at: http://localhost:8080
echo.
echo Open Chrome DevTools (F12)
echo Enable Device Toolbar (Ctrl+Shift+M)
echo Select: Moto g Power or custom 360x740
echo.
echo Press Ctrl+C to stop server
echo ========================================
echo.
python -m http.server 8080
