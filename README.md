# Antigravity Proxy Patch

> **Fix Google Antigravity authentication issues behind corporate proxies, VPNs, and restricted networks.**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-1.9-green.svg)](antigravity-proxy-patch/README.txt)
[![Platform](https://img.shields.io/badge/platform-Windows-lightgrey.svg)](#requirements)
[![Stars](https://img.shields.io/github/stars/kakajan/antigravity-patch?style=social)](https://github.com/kakajan/antigravity-patch)

**English** | [فارسی](README-FA.md)

---

## Table of Contents

- [The Problem](#the-problem)
- [The Solution](#the-solution)
- [How It Works](#how-it-works)
- [Requirements](#requirements)
- [Quick Start](#quick-start)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [After Antigravity Updates](#after-antigravity-updates)
- [Uninstall](#uninstall)
- [Troubleshooting](#troubleshooting)
- [FAQ](#faq)
- [Security & Transparency](#security--transparency)
- [Contributing](#contributing)
- [Support the Project](#support-the-project)
- [Contact](#contact)
- [License](#license)

---

## The Problem

[Google Antigravity](https://antigravity.google/) (Google's AI-powered IDE based on VS Code) requires direct access to Google's authentication servers (`*.googleapis.com`, `accounts.google.com`, etc.) for sign-in and AI features.

**This breaks for users who:**

- Work behind a **corporate HTTP proxy** (enterprise environments)
- Use a **VPN or proxy** due to regional restrictions (sanctions, geo-blocking)
- Are located in countries with **limited access** to Google services (Iran, Syria, etc.)
- Have network configurations where `language_server.exe` **bypasses system proxy settings**

**Common error messages:**

```
failed to make code assist backend request
Authentication failed: unable to reach accounts.google.com
language_server.exe: connection refused
```

## The Solution

**Antigravity Proxy Patch** is a lightweight, open-source proxy injection tool that forces all Antigravity processes — including `language_server.exe`, `node.exe`, and the main IDE — to route traffic through your configured HTTP proxy.

**Key features:**

- **DLL injection** via `version.dll` — intercepts network calls at the process level
- **Automatic configuration** — sets environment variables, VS Code settings, and GUI config
- **One-click install** — simple batch script, no admin rights required (usually)
- **Non-destructive** — easily removable, keeps your settings intact
- **Transparent** — open source, no telemetry, no data collection

## How It Works

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────┐
│   Antigravity    │────▶│  version.dll     │────▶│  Your Proxy  │
│   (language_     │     │  (intercepts     │     │  (VPN/Corp)  │
│    server.exe)   │     │   network calls) │     │              │
└─────────────────┘     └──────────────────┘     └──────┬───────┘
                                                         │
                                                         ▼
                                                  ┌─────────────┐
                                                  │   Google     │
                                                  │   Servers    │
                                                  └─────────────┘
```

1. `version.dll` is placed next to `Antigravity.exe` (Windows DLL search order loads it automatically)
2. On launch, it reads `config.proxy.json` for your proxy host/port
3. It intercepts HTTP/HTTPS connections from target processes
4. Routes all traffic through your configured upstream proxy
5. Authentication and AI features work normally

## Requirements

| Requirement | Details |
|-------------|---------|
| **OS** | Windows 10/11 (x64) |
| **Antigravity** | Google Antigravity 2.x installed |
| **Proxy** | Access to an HTTP proxy (corporate, VPN, or local like Clash/V2Ray) |
| **PowerShell** | 5.1+ (included in Windows 10/11) |
| **Admin rights** | Not required for user-level install (may be needed for env vars on locked-down PCs) |

## Quick Start

**3 steps to fix Antigravity authentication:**

```powershell
# 1. Clone or download this repository
git clone https://github.com/kakajan/antigravity-patch.git

# 2. Edit your proxy settings
# Open: antigravity-proxy-patch/proxy.settings.txt
# Set your proxy HOST and PORT

# 3. Run the installer
# Double-click: antigravity-proxy-patch/Install-Patch.bat
```

Then launch Antigravity using the new shortcut:

```
%LOCALAPPDATA%\Programs\Antigravity\Antigravity-with-proxy.bat
```

> **Important:** Do NOT use the regular Start Menu shortcut — `version.dll` won't load.

## Installation

### Step 1: Configure Your Proxy

Open `antigravity-proxy-patch/proxy.settings.txt` in any text editor:

```ini
# Edit these values before running Install-Patch.bat
HOST=127.0.0.1
PORT=12334
TYPE=http
```

**Common proxy configurations:**

| Proxy Tool | HOST | PORT | Notes |
|------------|------|------|-------|
| Clash | `127.0.0.1` | `7890` | Default HTTP proxy port |
| V2RayN | `127.0.0.1` | `10809` | HTTP proxy (not SOCKS) |
| Shadowsocks | `127.0.0.1` | `1080` | With HTTP proxy plugin |
| Corporate proxy | Your corp IP | Your port | Ask your IT department |
| Squid | `127.0.0.1` | `3128` | Default Squid port |

### Step 2: Run the Installer

**Option A — Double-click (recommended):**

```
Double-click: antigravity-proxy-patch/Install-Patch.bat
```

**Option B — PowerShell (advanced):**

```powershell
# Custom install directory
.\Install-Patch.ps1 -AntigravityDir "D:\Apps\Antigravity"

# Skip environment variable changes
.\Install-Patch.ps1 -SkipEnv

# Skip VS Code settings changes
.\Install-Patch.ps1 -SkipUserSettings

# Silent mode (no prompts)
.\Install-Patch.ps1 -Quiet
```

### Step 3: Launch Antigravity

Always use the proxy-aware launcher:

```
%LOCALAPPDATA%\Programs\Antigravity\Antigravity-with-proxy.bat
```

You can create a desktop shortcut to this `.bat` file for convenience.

## Configuration

### What the Installer Does

The `Install-Patch.ps1` script performs these actions:

| Action | Location | Purpose |
|--------|----------|---------|
| Copies `version.dll` | `Antigravity\` and `Antigravity\resources\bin\` | DLL injection for proxy interception |
| Generates `config.json` | `Antigravity\` and `Antigravity\resources\bin\` | Proxy configuration for the DLL |
| Creates `Antigravity-with-proxy.bat` | `Antigravity\` | Launcher that sets env vars before starting |
| Sets user env vars | `HTTP_PROXY`, `HTTPS_PROXY`, `NO_PROXY` | System-wide proxy for child processes |
| Updates VS Code settings | `%APPDATA%\Antigravity\User\settings.json` | `http.proxy`, `http.proxySupport` |
| Updates GUI config | `%APPDATA%\Antigravity\gui_config.json` | `upstream_proxy` settings |

### Proxy Settings File

`proxy.settings.txt` format:

```ini
# Lines starting with # are comments
HOST=127.0.0.1    # Proxy hostname or IP address
PORT=12334        # Proxy port number
TYPE=http         # Proxy type: http (only http is supported)
```

### Advanced Configuration

The generated `config.proxy.json` supports additional options:

```json
{
  "proxy": {
    "type": "http",
    "host": "127.0.0.1",
    "port": 12334
  },
  "target_processes": [
    "language_server.exe",
    "language_server_windows",
    "Antigravity.exe",
    "node.exe"
  ],
  "proxy_rules": {
    "allowed_ports": [80, 443, 8080, 12334],
    "default_action": "proxy",
    "dns_mode": "direct"
  },
  "timeout": {
    "connect": 60000,
    "recv": 60000,
    "send": 60000
  },
  "log_level": "info"
}
```

## Usage

### Daily Use

1. Start your proxy/VPN tool (Clash, V2Ray, etc.)
2. Launch Antigravity with: `Antigravity-with-proxy.bat`
3. Sign in to Google — authentication should work
4. Use AI features normally

### Verify It's Working

After launching once, check the proxy log:

```
%LOCALAPPDATA%\Programs\Antigravity\logs\proxy-YYYYMMDD.log
```

Look for these lines:

```
proxy=127.0.0.1:12334
HTTP CONNECT: tunnel established for *.googleapis.com
```

### Using on Another Computer

1. Copy the `antigravity-proxy-patch` folder to a USB drive or network share
2. Install Google Antigravity on the target PC
3. Edit `proxy.settings.txt` for that network's proxy
4. Run `Install-Patch.bat`
5. Launch with `Antigravity-with-proxy.bat`

> **Tip:** You can zip the `antigravity-proxy-patch` folder for easy distribution.

## After Antigravity Updates

Antigravity updates overwrite `version.dll` and `config.json`. After each update:

**Option A — Use the reinstall script (if patch folder is next to Antigravity):**

```
Double-click: Reinstall-Proxy-Patch.bat
```

**Option B — Re-run the installer manually:**

```
Double-click: antigravity-proxy-patch/Install-Patch.bat
```

> **Tip:** Keep the `antigravity-proxy-patch` folder next to your Antigravity installation for easy re-patching.

## Uninstall

Run the uninstaller:

```
Double-click: antigravity-proxy-patch/Uninstall-Patch.bat
```

This removes:
- `version.dll` from Antigravity folder
- `config.json` and `config.proxy.json`

This does **NOT** remove:
- `Antigravity-with-proxy.bat` (delete manually if desired)
- Environment variables (remove manually via System Properties)
- VS Code proxy settings (edit `%APPDATA%\Antigravity\User\settings.json`)

## Troubleshooting

### "version.dll missing" error

The DLL was removed by an Antigravity update. Re-run `Install-Patch.bat`.

### Authentication still fails

1. Verify your proxy is running and accessible
2. Check `proxy.settings.txt` has correct HOST and PORT
3. Check the log: `%LOCALAPPDATA%\Programs\Antigravity\logs\proxy-YYYYMMDD.log`
4. Make sure you're launching with `Antigravity-with-proxy.bat`, not the Start Menu shortcut

### "Cannot copy version.dll" error

Antigravity or `language_server.exe` is still running. Close all Antigravity windows and processes, then re-run the installer.

### Proxy works in IDE but not for language_server

This is exactly what this patch fixes. If it's still happening:
1. Verify `version.dll` exists in both `Antigravity\` and `Antigravity\resources\bin\`
2. Check `config.json` has correct proxy settings
3. Restart Antigravity using `Antigravity-with-proxy.bat`

### Corporate proxy with authentication

The current version supports unauthenticated HTTP proxies. For authenticated proxies, configure your local proxy tool (Clash, V2Ray) to handle upstream auth, then point the patch to your local proxy.

## FAQ

**Q: Is this safe? Is there any malware?**
A: The patch is fully open source. `version.dll` is a pre-compiled proxy injection DLL from the [antigravity-proxy](https://github.com/nicedoc/antigravity-proxy) project. You can inspect all source code. No data is collected, no telemetry is sent.

**Q: Will Google ban my account for using this?**
A: No. This patch only routes traffic through a proxy — it doesn't modify authentication tokens, API calls, or any Google service behavior. It's functionally identical to using a system-wide proxy.

**Q: Does this work with SOCKS proxies?**
A: Not directly. Use an HTTP proxy. Most proxy tools (Clash, V2Ray, Shadowsocks) provide an HTTP proxy interface alongside SOCKS.

**Q: Can I use this on macOS or Linux?**
A: This patch is Windows-only. The DLL injection technique is specific to Windows. macOS/Linux users should configure system-wide proxy or use `proxychains`.

**Q: My proxy port changes every time I restart my VPN. What do I do?**
A: Edit `proxy.settings.txt` and re-run `Install-Patch.bat` each time. Or configure your VPN to use a fixed port.

**Q: Does this affect other applications on my PC?**
A: The installer sets user-level `HTTP_PROXY` / `HTTPS_PROXY` environment variables, which some apps may use. To avoid this, run with `-SkipEnv` and rely only on the `.bat` launcher.

## Security & Transparency

**We take your trust seriously.** Here's what you need to know:

- **Open source:** Every file in this repository is inspectable. The installer is a readable PowerShell script.
- **No data collection:** Zero telemetry, zero analytics, zero tracking.
- **No modification of Google services:** We only route traffic — we don't intercept, modify, or log any content.
- **DLL source:** `version.dll` is from the open-source [antigravity-proxy](https://github.com/nicedoc/antigravity-proxy) project.
- **Reversible:** `Uninstall-Patch.bat` removes all changes cleanly.

**Verify for yourself:**

```powershell
# Read the installer source
notepad antigravity-proxy-patch\Install-Patch.ps1

# Check what env vars were set
[Environment]::GetEnvironmentVariable("HTTP_PROXY", "User")
```

## Contributing

Contributions are welcome! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

**Ideas for contribution:**
- macOS/Linux support
- SOCKS proxy support
- Authenticated proxy support
- GUI configuration tool
- Auto-detect proxy settings
- Documentation translations

## Support the Project

If this patch saved your day, here's how you can help:

- **Star this repo** — it helps others find the project
- **Share it** — tell colleagues, forums, communities
- **Report bugs** — open an [issue](https://github.com/kakajan/antigravity-patch/issues)
- **Contribute** — submit a [pull request](https://github.com/kakajan/antigravity-patch/pulls)

## Contact

| | |
|---|---|
| **Author** | **kakajan** (Senior Full-Stack Developer, AI Coach & Instructor) |
| **Company** | **AYTRONIC** \| آیترونیک |
| **Email** | [faslolkhitab@gmail.com](mailto:faslolkhitab@gmail.com) |
| **GitHub** | [github.com/kakajan](https://github.com/kakajan) |
| **Issues** | [github.com/kakajan/antigravity-patch/issues](https://github.com/kakajan/antigravity-patch/issues) |

> 18+ years of full-stack development experience. Available for consulting, coaching, and AI/ML training.

## License

This project is licensed under the [MIT License](LICENSE).

---

**Made with care for the developer community.** If you're behind a proxy and struggling with Antigravity, this patch is for you.
