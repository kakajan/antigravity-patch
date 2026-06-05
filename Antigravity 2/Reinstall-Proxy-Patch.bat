@echo off
REM Re-apply proxy patch after Antigravity update (run with Antigravity closed)
cd /d "%~dp0antigravity-proxy-patch"
if not exist "%~dp0antigravity-proxy-patch\Install-Patch.bat" (
  echo Patch folder not found: %~dp0antigravity-proxy-patch
  echo Copy antigravity-proxy-patch next to Antigravity.exe
  pause
  exit /b 1
)
call "%~dp0antigravity-proxy-patch\Install-Patch.bat"
