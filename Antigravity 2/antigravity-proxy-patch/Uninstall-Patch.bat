@echo off
title Uninstall Antigravity Proxy Patch
set AGY=%LOCALAPPDATA%\Programs\Antigravity
if not exist "%AGY%\Antigravity.exe" (
  echo Antigravity not found at %AGY%
  pause
  exit /b 1
)
echo Removing patch files from %AGY% ...
del /f /q "%AGY%\version.dll" 2>nul
del /f /q "%AGY%\config.json" 2>nul
del /f /q "%AGY%\config.proxy.json" 2>nul
del /f /q "%AGY%\resources\bin\version.dll" 2>nul
del /f /q "%AGY%\resources\bin\config.json" 2>nul
echo Done. Antigravity-with-proxy.bat was NOT deleted (remove manually if needed).
pause
