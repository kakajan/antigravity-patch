@echo off
title Antigravity Proxy Patch Installer
cd /d "%~dp0"
echo.
echo ========================================
echo   Antigravity Corporate Proxy Patch
echo ========================================
echo.

powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0Install-Patch.ps1"
set ERR=%ERRORLEVEL%
echo.
if %ERR% neq 0 (
  echo Installation failed. See messages above.
  pause
  exit /b %ERR%
)
echo Press any key to close...
pause >nul
exit /b 0
