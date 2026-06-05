# پچ پراکسی آنتی‌گرَویتی

> **رفع مشکل احراز هویت گوگل در Google Antigravity برای کاربران پشت پراکسی، VPN و شبکه‌های محدود.**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-1.9-green.svg)](antigravity-proxy-patch/README.txt)
[![Platform](https://img.shields.io/badge/platform-Windows-lightgrey.svg)](#پیشنیازها)
[![Stars](https://img.shields.io/github/stars/kakajan/antigravity-patch?style=social)](https://github.com/kakajan/antigravity-patch)

[English](README.md) | **فارسی**

---

## فهرست مطالب

- [مشکل چیست؟](#مشکل-چیست)
- [راه‌حل](#راهحل)
- [نحوه عملکرد](#نحوه-عملکرد)
- [پیشنیازها](#پیشنیازها)
- [شروع سریع](#شروع-سریع)
- [نصب و راه‌اندازی](#نصب-و-راهاندازی)
- [پیکربندی](#پیکربندی)
- [نحوه استفاده](#نحوه-استفاده)
- [بعد از آپدیت آنتی‌گرَویتی](#بعد-از-آپدیت-آنتیگرَویتی)
- [حذف پچ](#حذف-پچ)
- [عیب‌یابی](#عیبیابی)
- [سوالات متداول](#سوالات-متداول)
- [امنیت و شفافیت](#امنیت-و-شفافیت)
- [مشارکت در پروژه](#مشارکت-در-پروژه)
- [حمایت از پروژه](#حمایت-از-پروژه)
- [تماس با ما](#تماس-با-ما)
- [لایسنس](#لایسنس)

---

## مشکل چیست؟

[Google Antigravity](https://antigravity.google/) (IDE هوش مصنوعی گوگل بر پایه VS Code) برای ورود به حساب گوگل و استفاده از قابلیت‌های هوش مصنوعی، نیاز به دسترسی مستقیم به سرورهای احراز هویت گوگل (`*.googleapis.com`، `accounts.google.com` و غیره) دارد.

**این اتصال برای کاربران زیر قطع می‌شود:**

- کسانی که پشت **پراکسی سازمانی** کار می‌کنند (محیط‌های شرکتی)
- کسانی که به دلیل **محدودیت‌های منطقه‌ای** (تحریم، فیلترینگ) از **VPN یا پراکسی** استفاده می‌کنند
- کاربران ساکن در کشورهایی با **دسترسی محدود** به سرویس‌های گوگل (ایران، سوریه و غیره)
- کسانی که در شبکه‌شان `language_server.exe` **تنظیمات پراکسی سیستم را نادیده می‌گیرد**

**پیغام‌های خطای رایج:**

```
failed to make code assist backend request
Authentication failed: unable to reach accounts.google.com
language_server.exe: connection refused
```

## راه‌حل

**پچ پراکسی آنتی‌گرَویتی** یک ابزار سبک و متن‌باز است که تمام ترافیک پردازش‌های آنتی‌گرَویتی — شامل `language_server.exe`، `node.exe` و خود IDE — را از طریق پراکسی تنظیم‌شده هدایت می‌کند.

**ویژگی‌های کلیدی:**

- **تزریق DLL** از طریق `version.dll` — رهگیری درخواست‌های شبکه در سطح پردازش
- **پیکربندی خودکار** — تنظیم متغیرهای محیطی، تنظیمات VS Code و پیکربندی GUI
- **نصب با یک کلیک** — اسکریپت ساده، معمولاً بدون نیاز به دسترسی ادمین
- **غیرمخرب** — قابل حذف آسان، تنظیمات شما حفظ می‌شود
- **شفاف** — متن‌باز، بدون تله‌متری، بدون جمع‌آوری داده

## نحوه عملکرد

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────┐
│   آنتی‌گرَویتی    │────▶│  version.dll     │────▶│  پراکسی شما  │
│   (language_     │     │  (رهگیری         │     │  (VPN/سازمانی)│
│    server.exe)   │     │   درخواست‌ها)    │     │              │
└─────────────────┘     └──────────────────┘     └──────┬───────┘
                                                         │
                                                         ▼
                                                  ┌─────────────┐
                                                  │   سرورهای    │
                                                  │   گوگل       │
                                                  └─────────────┘
```

1. `version.dll` کنار `Antigravity.exe` قرار می‌گیرد (ویندوز آن را خودکار بارگذاری می‌کند)
2. هنگام اجرا، تنظیمات پراکسی از `config.proxy.json` خوانده می‌شود
3. اتصالات HTTP/HTTPS پردازش‌های هدف رهگیری می‌شوند
4. تمام ترافیک از طریق پراکسی بالادستی هدایت می‌شود
5. احراز هویت و قابلیت‌های هوش مصنوعی به‌درستی کار می‌کنند

## ساختار ریپازیتوری و نسخه‌های پشتیبانی‌شده

این ریپازیتوری بسته به نوع نصب Google Antigravity شما، به دو پچ مجزا تقسیم شده است:

*   **[Antigravity 2](./Antigravity%202)**: مخصوص **Google Antigravity 2.x** (که معمولاً در مسیر `%LOCALAPPDATA%\Programs\Antigravity` نصب می‌شود).
*   **[Antigravity IDE](./Antigravity%20IDE)**: مخصوص **Google Antigravity IDE** (که معمولاً در مسیر `%LOCALAPPDATA%\Programs\Antigravity IDE` نصب می‌شود).

پوشه متناسب با نسخه نصب‌شده خود را انتخاب کرده و مراحل زیر را با استفاده از اسکریپت‌های درون آن پوشه دنبال کنید.

---

## پیشنیازها

| پیشنیاز | جزئیات |
|---------|--------|
| **سیستم‌عامل** | ویندوز ۱۰/۱۱ (۶۴ بیتی) |
| **آنتی‌گرَویتی** | Google Antigravity 2.x یا Google Antigravity IDE نصب شده باشد |
| **پراکسی** | دسترسی به پراکسی HTTP (سازمانی، VPN، یا محلی مثل Clash/V2Ray) |
| **PowerShell** | نسخه ۵.۱+ (در ویندوز ۱۰/۱۱ موجود است) |
| **دسترسی ادمین** | برای نصب در سطح کاربر لازم نیست (در سیستم‌های محدود ممکن است لازم شود) |

## شروع سریع

**۳ مرحله برای رفع مشکل احراز هویت آنتی‌گرَویتی:**

```powershell
# ۱. کلون یا دانلود ریپازیتوری
git clone https://github.com/kakajan/antigravity-patch.git

# ۲. باز کردن پوشه مربوطه (Antigravity 2 یا Antigravity IDE) و ویرایش تنظیمات پراکسی:
# باز کنید: <Folder>/antigravity-proxy-patch/proxy.settings.txt
# HOST و PORT پراکسی خود را وارد کنید

# ۳. اجرای نصب‌کننده
# دابل‌کلیک: <Folder>/antigravity-proxy-patch/Install-Patch.bat
```

سپس آنتی‌گرَویتی را با میانبر پراکسی‌دار درون پوشه نصب خود اجرا کنید:

*   **برای Antigravity 2:**
    ```
    %LOCALAPPDATA%\Programs\Antigravity\Antigravity-with-proxy.bat
    ```
*   **برای Antigravity IDE:**
    ```
    %LOCALAPPDATA%\Programs\Antigravity IDE\Antigravity-with-proxy.bat
    ```

> **مهم:** از شورتکات معمولی Start Menu استفاده نکنید — `version.dll` بارگذاری نمی‌شود.


## نصب و راه‌اندازی

ابتدا به پوشه متناسب با نسخه خود (**`Antigravity 2`** یا **`Antigravity IDE`**) مراجعه کنید. تمام فایل‌ها و اسکریپت‌های بعدی در این پوشه (که با نام `<Folder>` به آن اشاره می‌شود) قرار دارند.

### مرحله ۱: پیکربندی پراکسی

فایل `<Folder>/antigravity-proxy-patch/proxy.settings.txt` را در یک ویرایشگر متن باز کنید:

```ini
# این مقادیر را قبل از اجرای Install-Patch.bat ویرایش کنید
HOST=127.0.0.1
PORT=12334
TYPE=http
```

**تنظیمات رایج پراکسی:**

| ابزار پراکسی | HOST | PORT | توضیحات |
|--------------|------|------|---------|
| Clash | `127.0.0.1` | `7890` | پورت پیش‌فرض HTTP Proxy |
| V2RayN | `127.0.0.1` | `10809` | پراکسی HTTP (نه SOCKS) |
| Shadowsocks | `127.0.0.1` | `1080` | با پلاگین HTTP Proxy |
| پراکسی سازمانی | آی‌پی سازمان | پورت مربوطه | از واحد IT بپرسید |
| Squid | `127.0.0.1` | `3128` | پورت پیش‌فرض Squid |

### مرحله ۲: اجرای نصب‌کننده

**گزینه الف — دابل‌کلیک (توصیه شده):**

```
دابل‌کلیک روی: <Folder>/antigravity-proxy-patch/Install-Patch.bat
```

**گزینه ب — PowerShell (پیشرفته):**

پاورشل را در پوشه `<Folder>/antigravity-proxy-patch` باز کرده و اجرا کنید:

```powershell
# مسیر نصب سفارشی (مسیر محل نصب آنتی‌گرَویتی خود را مشخص کنید)
.\Install-Patch.ps1 -AntigravityDir "C:\Program Files\<Edition>"

# بدون تغییر متغیرهای محیطی
.\Install-Patch.ps1 -SkipEnv

# بدون تغییر تنظیمات VS Code
.\Install-Patch.ps1 -SkipUserSettings

# حالت بی‌صدا (بدون سوال)
.\Install-Patch.ps1 -Quiet
```

### مرحله ۳: اجرای آنتی‌گرَویتی

همیشه آنتی‌گرَویتی را با استفاده از فایل لانچر جدید ساخته شده در مسیر نصب اجرا کنید:

*   **برای Antigravity 2:**
    ```
    %LOCALAPPDATA%\Programs\Antigravity\Antigravity-with-proxy.bat
    ```
*   **برای Antigravity IDE:**
    ```
    %LOCALAPPDATA%\Programs\Antigravity IDE\Antigravity-with-proxy.bat
    ```

می‌توانید یک میانبر دسکتاپ از این فایل `.bat` بسازید.

## پیکربندی

### نصب‌کننده چه کاری انجام می‌دهد

اسکریپت `Install-Patch.ps1` این عملیات را انجام می‌دهد:

| عملیات | محل | هدف |
|--------|-----|-----|
| کپی `version.dll` | `Antigravity\` یا `Antigravity IDE\` | تزریق DLL برای رهگیری پراکسی |
| تولید `config.json` | `Antigravity\` یا `Antigravity IDE\` | پیکربندی پراکسی برای DLL |
| ساخت `Antigravity-with-proxy.bat` | `Antigravity\` یا `Antigravity IDE\` | لانچری که متغیرهای محیطی را تنظیم می‌کند |
| تنظیم متغیرهای کاربر | `HTTP_PROXY`، `HTTPS_PROXY`، `NO_PROXY` | پراکسی سیستمی برای پردازش‌های فرزند |
| بروزرسانی تنظیمات VS Code | `%APPDATA%\Antigravity\User\settings.json` | `http.proxy`، `http.proxySupport` |
| بروزرسانی پیکربندی GUI | `%APPDATA%\Antigravity\gui_config.json` | تنظیمات `upstream_proxy` |

### فایل تنظیمات پراکسی

فرمت `proxy.settings.txt`:

```ini
# خطوط با # کامنت هستند
HOST=127.0.0.1    # نام میزبان یا آدرس IP پراکسی
PORT=12334        # شماره پورت پراکسی
TYPE=http         # نوع پراکسی: http (فقط http پشتیبانی می‌شود)
```

### پیکربندی پیشرفته

فایل `config.proxy.json` تولیدشده از گزینه‌های اضافی پشتیبانی می‌کند:

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
    "Antigravity IDE.exe",
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

## نحوه استفاده

### استفاده روزانه

1. ابزار پراکسی/VPN خود را اجرا کنید (Clash، V2Ray و غیره)
2. آنتی‌گرَویتی را با فایل لانچر پراکسی‌دار (`Antigravity-with-proxy.bat`) در مسیر نصب اجرا کنید.
3. وارد حساب گوگل شوید — احراز هویت باید کار کند
4. از قابلیت‌های هوش مصنوعی به‌راحتی استفاده کنید

### بررسی عملکرد

بعد از اولین اجرا، لاگ پراکسی را بررسی کنید:

*   **برای Antigravity 2:**
    ```
    %LOCALAPPDATA%\Programs\Antigravity\logs\proxy-YYYYMMDD.log
    ```
*   **برای Antigravity IDE:**
    ```
    %LOCALAPPDATA%\Programs\Antigravity IDE\logs\proxy-YYYYMMDD.log
    ```

به دنبال این خطوط بگردید:

```
proxy=127.0.0.1:12334
HTTP CONNECT: tunnel established for *.googleapis.com
```

### استفاده روی کامپیوتر دیگر

1. پوشه پچ مربوط به نسخه خود را (مثلاً `Antigravity IDE`) روی فلش یا شبکه کپی کنید.
2. Google Antigravity را روی سیستم مقصد نصب کنید.
3. فایل `proxy.settings.txt` را درون آن پوشه برای پراکسی آن شبکه ویرایش کنید.
4. `Install-Patch.bat` را اجرا کنید.
5. با `Antigravity-with-proxy.bat` اجرا کنید.

## بعد از آپدیت آنتی‌گرَویتی

آپدیت‌های آنتی‌گرَویتی فایل‌های `version.dll` و `config.json` را بازنویسی می‌کنند. بعد از هر آپدیت:

**گزینه الف — اسکریپت نصب مجدد:**

```
دابل‌کلیک روی: <Folder>/Reinstall-Proxy-Patch.bat
```

**گزینه ب — اجرای دستی نصب‌کننده:**

```
دابل‌کلیک روی: <Folder>/antigravity-proxy-patch/Install-Patch.bat
```

## حذف پچ

حذف‌کننده را درون پوشه پچ خود اجرا کنید:

```
دابل‌کلیک روی: <Folder>/antigravity-proxy-patch/Uninstall-Patch.bat
```

این موارد حذف می‌شوند:
- `version.dll` از پوشه آنتی‌گرَویتی
- `config.json` و `config.proxy.json`

این موارد حذف **نمی‌شوند**:
- `Antigravity-with-proxy.bat` (در صورت نیاز دستی حذف کنید)
- متغیرهای محیطی (از طریق System Properties دستی حذف کنید)
- تنظیمات پراکسی VS Code (فایل `%APPDATA%\Antigravity\User\settings.json` را ویرایش کنید)

## عیب‌یابی

### خطای "version.dll missing"

فایل DLL توسط آپدیت آنتی‌گرَویتی حذف شده. `Install-Patch.bat` را دوباره اجرا کنید.

### احراز هویت هنوز کار نمی‌کند

1. مطمئن شوید پراکسی شما در حال اجرا و قابل دسترسی است
2. بررسی کنید `proxy.settings.txt` دارای HOST و PORT صحیح باشد
3. لاگ را بررسی کنید: `%LOCALAPPDATA%\Programs\Antigravity\logs\proxy-YYYYMMDD.log`
4. مطمئن شوید با `Antigravity-with-proxy.bat` اجرا می‌کنید، نه شورتکات Start Menu

### خطای "Cannot copy version.dll"

آنتی‌گرَویتی یا `language_server.exe` هنوز در حال اجراست. تمام پنجره‌ها و پردازش‌های آنتی‌گرَویتی را ببندید و دوباره نصب کنید.

### پراکسی در IDE کار می‌کند ولی در language_server نه

این دقیقاً همان مشکلی است که این پچ رفع می‌کند. اگر هنوز وجود دارد:
1. بررسی کنید `version.dll` هم در `Antigravity\` و هم در `Antigravity\resources\bin\` وجود دارد
2. بررسی کنید `config.json` تنظیمات پراکسی صحیح دارد
3. آنتی‌گرَویتی را با `Antigravity-with-proxy.bat` ری‌استارت کنید

### پراکسی سازمانی با احراز هویت

نسخه فعلی فقط از پراکسی‌های HTTP بدون احراز هویت پشتیبانی می‌کند. برای پراکسی‌های دارای رمز، ابزار پراکسی محلی خود (Clash، V2Ray) را برای مدیریت احراز هویت بالادستی تنظیم کنید و پچ را به پراکسی محلی خود متصل کنید.

## سوالات متداول

**س: آیا این پچ امن است؟ بدافزار ندارد؟**
ج: پچ کاملاً متن‌باز است. `version.dll` یک DLL تزریق پراکسی از پروژه [antigravity-proxy](https://github.com/nicedoc/antigravity-proxy) است. تمام کد منبع قابل بررسی است. هیچ داده‌ای جمع‌آوری نمی‌شود و هیچ تله‌متری ارسال نمی‌شود.

**س: آیا گوگل حساب من را مسدود می‌کند؟**
ج: خیر. این پچ فقط ترافیک را از طریق پراکسی هدایت می‌کند — توکن‌های احراز هویت، درخواست‌های API یا رفتار سرویس‌های گوگل را تغییر نمی‌دهد. از نظر عملکردی معادل استفاده از پراکسی سیستمی است.

**س: آیا با پراکسی SOCKS کار می‌کند؟**
ج: مستقیماً خیر. از پراکسی HTTP استفاده کنید. اکثر ابزارهای پراکسی (Clash، V2Ray، Shadowsocks) در کنار SOCKS یک رابط HTTP Proxy هم ارائه می‌دهند.

**س: آیا روی مک یا لینوکس کار می‌کند؟**
ج: این پچ فقط برای ویندوز است. تکنیک تزریق DLL مخصوص ویندوز است. کاربران مک/لینوکس باید پراکسی سیستمی تنظیم کنند یا از `proxychains` استفاده کنند.

**س: پورت پراکسی من هر بار VPN را ری‌استارت می‌کنم عوض می‌شود. چه کنم؟**
ج: هر بار `proxy.settings.txt` را ویرایش و `Install-Patch.bat` را اجرا کنید. یا VPN خود را روی پورت ثابت تنظیم کنید.

**س: آیا روی برنامه‌های دیگر کامپیوترم تأثیر می‌گذارد؟**
ج: نصب‌کننده متغیرهای محیطی `HTTP_PROXY` / `HTTPS_PROXY` در سطح کاربر تنظیم می‌کند که برخی برنامه‌ها ممکن است استفاده کنند. برای اجتناب، با `-SkipEnv` اجرا کنید و فقط به لانچر `.bat` اکتفا کنید.

## امنیت و شفافیت

**اعتماد شما برای ما مهم است.** آنچه باید بدانید:

- **متن‌باز:** تمام فایل‌های این ریپازیتوری قابل بررسی هستند. نصب‌کننده یک اسکریپت PowerShell خوانا است.
- **بدون جمع‌آوری داده:** صفر تله‌متری، صفر آنالیتیکس، صفر ردیابی.
- **بدون تغییر سرویس‌های گوگل:** ما فقط ترافیک را هدایت می‌کنیم — هیچ محتوایی را رهگیری، تغییر یا ثبت نمی‌کنیم.
- **منبع DLL:** فایل `version.dll` از پروژه متن‌باز [antigravity-proxy](https://github.com/nicedoc/antigravity-proxy) است.
- **قابل بازگشت:** `Uninstall-Patch.bat` تمام تغییرات را به‌تمیزی حذف می‌کند.

**خودتان بررسی کنید:**

```powershell
# کد منبع نصب‌کننده را بخوانید
notepad antigravity-proxy-patch\Install-Patch.ps1

# ببینید چه متغیرهای محیطی تنظیم شده
[Environment]::GetEnvironmentVariable("HTTP_PROXY", "User")
```

## مشارکت در پروژه

از مشارکت شما استقبال می‌کنیم! برای جزئیات [CONTRIBUTING.md](CONTRIBUTING.md) را ببینید.

**ایده‌هایی برای مشارکت:**
- پشتیبانی از مک/لینوکس
- پشتیبانی از پراکسی SOCKS
- پشتیبانی از پراکسی دارای احراز هویت
- ابزار پیکربندی گرافیکی
- تشخیص خودکار تنظیمات پراکسی
- ترجمه مستندات به زبان‌های دیگر

## حمایت از پروژه

اگر این پچ مشکلتان را حل کرد، این‌طوری می‌تونید کمک کنید:

- **ستاره بدهید** — به دیگران کمک می‌کنه پروژه رو پیدا کنن
- **به اشتراک بگذارید** — به همکاران، انجمن‌ها و گروه‌ها معرفی کنید
- **باگ گزارش کنید** — یک [Issue](https://github.com/kakajan/antigravity-patch/issues) باز کنید
- **مشارکت کنید** — یک [Pull Request](https://github.com/kakajan/antigravity-patch/pulls) بفرستید

## تماس با ما

| | |
|---|---|
| **سازنده** | **kakajan** (برنامه‌نویس ارشد فول‌استک، کوچ و مدرس هوش مصنوعی) |
| **شرکت** | **AYTRONIC** \| آیترونیک |
| **ایمیل** | [faslolkhitab@gmail.com](mailto:faslolkhitab@gmail.com) |
| **گیت‌هاب** | [github.com/kakajan](https://github.com/kakajan) |
| **مشکلات** | [github.com/kakajan/antigravity-patch/issues](https://github.com/kakajan/antigravity-patch/issues) |

> بیش از ۱۸ سال سابقه برنامه‌نویسی فول‌استک. آماده مشاوره، کوچینگ و آموزش AI/ML.

## لایسنس

این پروژه تحت [لایسنس MIT](LICENSE) منتشر شده است.

---

**ساخته‌شده با دقت برای جامعه برنامه‌نویسان.** اگر پشت پراکسی هستید و با آنتی‌گرَویتی مشکل دارید، این پچ برای شماست.
