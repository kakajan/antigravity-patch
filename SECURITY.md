# Security Policy

## Supported Versions

| Version | Supported |
|---------|-----------|
| 1.9.x | Yes |
| < 1.9 | No |

## Reporting a Vulnerability

We take security seriously. If you discover a vulnerability, please report it responsibly.

### How to Report

**Option 1 — Private email (preferred for sensitive issues):**
Send details to [faslolkhitab@gmail.com](mailto:faslolkhitab@gmail.com) with subject: `[SECURITY] Antigravity Proxy Patch`

**Option 2 — GitHub Security Advisory:**
Use [GitHub's private vulnerability reporting](https://github.com/kakajan/antigravity-patch/security/advisories/new)

### What to Include

- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

### Response Timeline

| Action | Timeline |
|--------|----------|
| Acknowledgment | Within 48 hours |
| Initial assessment | Within 7 days |
| Fix or mitigation plan | Within 30 days |
| Public disclosure | After fix is released |

## Security Considerations

### What This Patch Does

- Copies a DLL (`version.dll`) into the Antigravity installation directory
- Sets user-level environment variables (`HTTP_PROXY`, `HTTPS_PROXY`)
- Modifies Antigravity configuration files (`config.json`, `settings.json`)
- Creates a launcher batch file

### What This Patch Does NOT Do

- Does NOT collect, transmit, or log any personal data
- Does NOT modify authentication tokens or credentials
- Does NOT intercept or alter the content of network traffic
- Does NOT communicate with any external server other than your configured proxy
- Does NOT require administrator privileges for standard installation

### DLL Transparency

The `version.dll` file is a pre-compiled binary from the open-source [antigravity-proxy](https://github.com/nicedoc/antigravity-proxy) project. It performs DLL proxying — intercepting Windows API calls to inject proxy settings into target processes.

**To verify the DLL:**
1. Check the file hash against the published release
2. Inspect the source code at the upstream repository
3. Use tools like [PE-bear](https://github.com/hasherezade/pe-bear) or [CFF Explorer](https://ntcore.com/?page_id=388) to inspect the binary

### Environment Variables

The installer sets these user-level environment variables:

| Variable | Value | Purpose |
|----------|-------|---------|
| `HTTP_PROXY` | `http://HOST:PORT` | HTTP proxy for applications |
| `HTTPS_PROXY` | `http://HOST:PORT` | HTTPS proxy for applications |
| `http_proxy` | `http://HOST:PORT` | Lowercase variant |
| `https_proxy` | `http://HOST:PORT` | Lowercase variant |
| `NO_PROXY` | `localhost,127.0.0.1` | Bypass proxy for local traffic |

These can be removed via **System Properties > Environment Variables** or by running:

```powershell
[Environment]::SetEnvironmentVariable("HTTP_PROXY", $null, "User")
[Environment]::SetEnvironmentVariable("HTTPS_PROXY", $null, "User")
```

## Trusted Sources

Only download this patch from the official repository:
- **Official:** `https://github.com/kakajan/antigravity-patch`

Do NOT trust mirrors, forks, or redistributed copies from unknown sources.

## Supply Chain Security

- No third-party npm/pip/nuget dependencies
- No external downloads during installation
- All scripts are self-contained
- DLL is included in the repository (not downloaded at runtime)
