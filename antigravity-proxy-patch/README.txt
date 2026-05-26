================================================================================
  Antigravity Corporate Proxy Patch (antigravity-proxy v1.9)
================================================================================

For: Google Antigravity 2.x on Windows (behind HTTP corporate proxy)
Fixes: "failed to make code assist backend request" / language_server bypasses proxy

--------------------------------------------------------------------------------
QUICK START (this PC or after Antigravity update)
--------------------------------------------------------------------------------

1. Edit proxy.settings.txt if your proxy address is different:
     HOST=10.32.87.243
     PORT=8080
     TYPE=http

2. Double-click:  Install-Patch.bat

3. Always launch Antigravity with:
     %LOCALAPPDATA%\Programs\Antigravity\Antigravity-with-proxy.bat

   Do NOT use the normal Start Menu shortcut (version.dll will not load).

--------------------------------------------------------------------------------
USE ON ANOTHER COMPUTER
--------------------------------------------------------------------------------

1. Copy the entire folder "antigravity-proxy-patch" to a USB or network share.
   (You can also zip it: antigravity-proxy-patch.zip)

2. On the other PC, install Antigravity first.

3. Edit proxy.settings.txt for that network's proxy.

4. Run Install-Patch.bat (right-click -> Run as administrator if env vars fail).

5. Launch with Antigravity-with-proxy.bat from the Antigravity install folder.

Optional: copy antigravity-proxy-patch into the Antigravity folder so you can
re-run Install-Patch.bat after every Antigravity update.

--------------------------------------------------------------------------------
AFTER EVERY ANTIGRAVITY UPDATE
--------------------------------------------------------------------------------

Updates remove version.dll and config.json. Just run Install-Patch.bat again.

--------------------------------------------------------------------------------
FILES IN THIS PACKAGE
--------------------------------------------------------------------------------

  proxy\version.dll          - antigravity-proxy DLL (do not delete)
  proxy.settings.txt         - YOUR proxy host/port (edit before install)
  config.proxy.template.json - internal template
  Install-Patch.bat          - main installer (double-click)
  Install-Patch.ps1          - PowerShell installer logic
  Uninstall-Patch.bat        - removes DLL/config from Antigravity folder
  README.txt                 - this file

--------------------------------------------------------------------------------
ADVANCED (PowerShell)
--------------------------------------------------------------------------------

  Install-Patch.ps1 -AntigravityDir "D:\Apps\Antigravity"
  Install-Patch.ps1 -SkipEnv -SkipUserSettings

--------------------------------------------------------------------------------
VERIFY
--------------------------------------------------------------------------------

After install, check log (after launching once):
  %LOCALAPPDATA%\Programs\Antigravity\logs\proxy-YYYYMMDD.log

Look for:
  proxy=YOUR_HOST:PORT
  HTTP CONNECT: tunnel established for *.googleapis.com

--------------------------------------------------------------------------------
UNINSTALL
--------------------------------------------------------------------------------

Run Uninstall-Patch.bat (removes version.dll only; keeps your settings.json proxy)

================================================================================
