@echo off
title Uninstall Antigravity Proxy Patch
set AGY=
if exist "%LOCALAPPDATA%\Programs\Antigravity IDE\Antigravity IDE.exe" (
  set "AGY=%LOCALAPPDATA%\Programs\Antigravity IDE"
) else if exist "%LOCALAPPDATA%\Programs\Antigravity\Antigravity.exe" (
  set "AGY=%LOCALAPPDATA%\Programs\Antigravity"
)

if "%AGY%"=="" (
  echo Antigravity or Antigravity IDE not found in default installation paths.
  pause
  exit /b 1
)
echo Removing patch files from %AGY% ...
del /f /q "%AGY%\version.dll" 2>nul
del /f /q "%AGY%\config.json" 2>nul
del /f /q "%AGY%\config.proxy.json" 2>nul
del /f /q "%AGY%\resources\bin\version.dll" 2>nul
del /f /q "%AGY%\resources\bin\config.json" 2>nul
del /f /q "%AGY%\resources\app\extensions\antigravity\bin\version.dll" 2>nul
del /f /q "%AGY%\resources\app\extensions\antigravity\bin\config.json" 2>nul
echo Done. Antigravity-with-proxy.bat was NOT deleted (remove manually if needed).
pause
