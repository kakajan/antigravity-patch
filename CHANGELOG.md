# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2026-06-05

### Added
- Separated patch files into two distinct folders for compatibility:
  - `Antigravity 2` for Google Antigravity 2.x
  - `Antigravity IDE` for Google Antigravity IDE
- Updated the main landing page (`index.html`) with an interactive version switcher to guide users based on their IDE edition
- Updated full English (`README.md`) and Persian (`README-FA.md`) documentation with folder layout changes, updated paths, and instructions for both editions

## [1.9.0] - 2025-05-27

### Added
- Initial public release of Antigravity Proxy Patch
- DLL-based proxy injection via `version.dll`
- One-click installer (`Install-Patch.bat`) with PowerShell backend
- Uninstaller (`Uninstall-Patch.bat`)
- Reinstall helper for post-update re-patching (`Reinstall-Proxy-Patch.bat`)
- Configurable proxy settings via `proxy.settings.txt`
- Auto-generation of `config.proxy.json` from template
- User environment variable setup (`HTTP_PROXY`, `HTTPS_PROXY`, `NO_PROXY`)
- VS Code/Antigravity `settings.json` proxy configuration
- GUI config (`gui_config.json`) upstream proxy update
- Proxy-aware launcher (`Antigravity-with-proxy.bat`)
- Full English documentation (README.md)
- Full Persian documentation (README-FA.md)
- Contributing guidelines (CONTRIBUTING.md)
- Security policy (SECURITY.md)
- Support guide (SUPPORT.md)
- MIT License

### Known Limitations
- Windows only (no macOS/Linux support)
- HTTP proxy only (no SOCKS support)
- No authenticated proxy support (use local proxy tool as intermediary)
