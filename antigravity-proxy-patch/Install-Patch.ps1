#Requires -Version 5.1
<#
.SYNOPSIS
  Installs antigravity-proxy patch for Google Antigravity (corporate HTTP proxy).
.DESCRIPTION
  Copies version.dll, config, and launchers into Antigravity install folder.
  Reads proxy host/port from proxy.settings.txt in this patch folder.
#>
param(
    [string]$AntigravityDir = "",
    [switch]$SkipEnv,
    [switch]$SkipUserSettings,
    [switch]$Quiet
)

$ErrorActionPreference = "Stop"
$PatchRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$SettingsFile = Join-Path $PatchRoot "proxy.settings.txt"
$DllSource = Join-Path $PatchRoot "proxy\version.dll"
$Template = Join-Path $PatchRoot "config.proxy.template.json"

function Write-Info($msg) { if (-not $Quiet) { Write-Host $msg } }
function Write-Err($msg)  { Write-Host "ERROR: $msg" -ForegroundColor Red }

if (-not (Test-Path $DllSource)) {
    Write-Err "Missing proxy\version.dll. Re-download the patch package."
    exit 1
}

# Parse proxy.settings.txt
$hostName = "10.32.87.243"
$port = 8080
$proxyType = "http"
if (Test-Path $SettingsFile) {
    Get-Content $SettingsFile | ForEach-Object {
        $line = $_.Trim()
        if ($line -match '^\s*#' -or $line -eq "") { return }
        if ($line -match '^HOST\s*=\s*(.+)$') { $hostName = $Matches[1].Trim() }
        if ($line -match '^PORT\s*=\s*(\d+)$') { $port = [int]$Matches[1] }
        if ($line -match '^TYPE\s*=\s*(.+)$') { $proxyType = $Matches[1].Trim().ToLower() }
    }
}

$proxyUrl = "${proxyType}://${hostName}:${port}"
Write-Info "Proxy: $proxyUrl"

# Resolve Antigravity install directory
if ([string]::IsNullOrWhiteSpace($AntigravityDir)) {
    $candidates = @(
        (Join-Path $env:LOCALAPPDATA "Programs\Antigravity"),
        "${env:ProgramFiles}\Antigravity",
        "${env:ProgramFiles(x86)}\Antigravity"
    )
    foreach ($c in $candidates) {
        if (Test-Path (Join-Path $c "Antigravity.exe")) {
            $AntigravityDir = $c
            break
        }
    }
}

if ([string]::IsNullOrWhiteSpace($AntigravityDir) -or -not (Test-Path (Join-Path $AntigravityDir "Antigravity.exe"))) {
    Write-Err "Antigravity.exe not found. Pass -AntigravityDir 'C:\path\to\Antigravity'"
    exit 1
}

Write-Info "Install target: $AntigravityDir"

$binDir = Join-Path $AntigravityDir "resources\bin"
if (-not (Test-Path $binDir)) {
    Write-Err "resources\bin not found. Is this Antigravity 2.x?"
    exit 1
}

# Build config.proxy.json from template
$configJson = Get-Content $Template -Raw
$configJson = $configJson.Replace("PROXY_HOST", $hostName)
$configJson = $configJson.Replace("PROXY_PORT", $port)
$configJson = $configJson.Replace("PROXY_TYPE", $proxyType)

$configProxyPath = Join-Path $AntigravityDir "config.proxy.json"
$configJson | Set-Content -Path $configProxyPath -Encoding UTF8
$configJson | Set-Content -Path (Join-Path $AntigravityDir "config.json") -Encoding UTF8
$configJson | Set-Content -Path (Join-Path $binDir "config.json") -Encoding UTF8

# Copy DLL (close Antigravity first if copy fails)
$dllTargets = @(
    (Join-Path $AntigravityDir "version.dll"),
    (Join-Path $binDir "version.dll")
)
foreach ($dllTarget in $dllTargets) {
    try {
        Copy-Item -Path $DllSource -Destination $dllTarget -Force
    } catch {
        Write-Err "Cannot copy version.dll to $dllTarget. Close Antigravity and language_server.exe, then run again."
        exit 1
    }
}

# Copy settings file for reference
Copy-Item -Path $SettingsFile -Destination (Join-Path $AntigravityDir "proxy.settings.txt") -Force -ErrorAction SilentlyContinue

# Launcher batch
$launcher = @"
@echo off
setlocal
set PROXY=$proxyUrl
set HTTP_PROXY=%PROXY%
set HTTPS_PROXY=%PROXY%
set http_proxy=%PROXY%
set https_proxy=%PROXY%
set NO_PROXY=localhost,127.0.0.1
cd /d "%~dp0"
if exist "%~dp0config.proxy.json" (
  copy /Y "%~dp0config.proxy.json" "%~dp0config.json" >nul
  if exist "%~dp0resources\bin\" copy /Y "%~dp0config.proxy.json" "%~dp0resources\bin\config.json" >nul
)
if not exist "%~dp0version.dll" (
  echo ERROR: version.dll missing. Run antigravity-proxy-patch\Install-Patch.bat
  pause
  exit /b 1
)
start "" "%~dp0Antigravity.exe"
"@
$launcher | Set-Content -Path (Join-Path $AntigravityDir "Antigravity-with-proxy.bat") -Encoding ASCII

# Re-install helper in Antigravity folder (re-run after updates)
$reinstallBat = @"
@echo off
cd /d "%~dp0antigravity-proxy-patch"
if not exist Install-Patch.bat (
  echo Patch folder missing. Copy antigravity-proxy-patch next to Antigravity.exe
  pause
  exit /b 1
)
call Install-Patch.bat
"@
# Only if patch folder is sibling - user may keep patch elsewhere; skip auto reinstall in AGY

# User environment variables
if (-not $SkipEnv) {
    [Environment]::SetEnvironmentVariable("HTTP_PROXY", $proxyUrl, "User")
    [Environment]::SetEnvironmentVariable("HTTPS_PROXY", $proxyUrl, "User")
    [Environment]::SetEnvironmentVariable("http_proxy", $proxyUrl, "User")
    [Environment]::SetEnvironmentVariable("https_proxy", $proxyUrl, "User")
    [Environment]::SetEnvironmentVariable("NO_PROXY", "localhost,127.0.0.1", "User")
    Write-Info "User environment variables set."
}

# VS Code / Antigravity settings.json
if (-not $SkipUserSettings) {
    $settingsPath = Join-Path $env:APPDATA "Antigravity\User\settings.json"
    $settingsDir = Split-Path $settingsPath -Parent
    if (-not (Test-Path $settingsDir)) { New-Item -ItemType Directory -Path $settingsDir -Force | Out-Null }

    $settingsObj = [ordered]@{
        "http.proxy" = $proxyUrl
        "http.proxySupport" = "override"
        "http.proxyStrictSSL" = $false
        "http.useLocalProxyConfiguration" = $false
    }
    if (Test-Path $settingsPath) {
        try {
            $existing = Get-Content $settingsPath -Raw | ConvertFrom-Json
            $existing.PSObject.Properties | ForEach-Object {
                if ($settingsObj.Contains($_.Name)) { return }
                $settingsObj[$_.Name] = $_.Value
            }
        } catch {
            Write-Info "Warning: could not parse existing settings.json; writing proxy keys only."
        }
    }
    ($settingsObj | ConvertTo-Json -Depth 10) | Set-Content -Path $settingsPath -Encoding UTF8
    Write-Info "Updated: $settingsPath"
}

# gui_config upstream_proxy (optional)
$guiConfig = Join-Path $env:APPDATA "Antigravity\gui_config.json"
if (Test-Path $guiConfig) {
    try {
        $gui = Get-Content $guiConfig -Raw | ConvertFrom-Json
        if ($gui.proxy -and $gui.proxy.upstream_proxy) {
            $gui.proxy.upstream_proxy.enabled = $true
            $gui.proxy.upstream_proxy.url = $proxyUrl
            $gui | ConvertTo-Json -Depth 20 | Set-Content -Path $guiConfig -Encoding UTF8
            Write-Info "Updated: $guiConfig (upstream_proxy)"
        }
    } catch {
        Write-Info "Warning: could not update gui_config.json"
    }
}

Write-Info ""
Write-Info "Patch installed successfully."
Write-Info "Launch Antigravity with:"
Write-Info "  $AntigravityDir\Antigravity-with-proxy.bat"
Write-Info ""
exit 0
