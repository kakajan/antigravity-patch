# Contributing to Antigravity Proxy Patch

Thank you for considering contributing! This project helps developers worldwide overcome network restrictions, and every contribution makes a difference.

## How to Contribute

### Reporting Bugs

1. Check [existing issues](https://github.com/kakajan/antigravity-patch/issues) first
2. Include your OS version, Antigravity version, and proxy tool
3. Share the proxy log: `%LOCALAPPDATA%\Programs\Antigravity\logs\proxy-YYYYMMDD.log`
4. Describe steps to reproduce the issue

### Suggesting Features

Open an issue with the `enhancement` label. Describe:
- The problem you're trying to solve
- Your proposed solution
- Any alternatives you've considered

### Submitting Pull Requests

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-improvement`
3. Make your changes
4. Test on a clean Windows installation
5. Submit a PR with a clear description of changes

### Code Style

- **PowerShell:** Use `PSScriptAnalyzer` conventions
- **Batch files:** Keep commands simple and well-structured
- **JSON:** Use 2-space indentation
- **Documentation:** Keep language clear and beginner-friendly

### Documentation Contributions

We especially welcome:
- Translations (new languages welcome!)
- Improved troubleshooting guides
- Proxy tool configuration examples
- Video tutorials or screenshots

## Development Setup

```powershell
# Clone your fork
git clone https://github.com/YOUR_USERNAME/antigravity-patch.git

# Test the installer in a safe environment
.\antigravity-proxy-patch\Install-Patch.ps1 -AntigravityDir "C:\Test\Antigravity"
```

## Areas We Need Help With

| Area | Difficulty | Impact |
|------|-----------|--------|
| macOS/Linux support | High | Very High |
| SOCKS proxy support | Medium | High |
| Authenticated proxy support | Medium | High |
| GUI configuration tool | Medium | Medium |
| Auto-detect proxy settings | Low | High |
| Documentation translations | Low | Medium |
| CI/CD pipeline for releases | Medium | Medium |

## Code of Conduct

- Be respectful and inclusive
- Help others learn
- Focus on constructive feedback
- Remember: this project serves developers in restricted networks — empathy matters

## Questions?

- Open a [discussion](https://github.com/kakajan/antigravity-patch/discussions)
- Email: [faslolkhitab@gmail.com](mailto:faslolkhitab@gmail.com)

---

Thank you for making this project better for everyone.
