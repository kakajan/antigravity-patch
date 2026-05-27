/* -------------------------------------------------------------
   Antigravity Proxy Patch Landing Page Logic
   Handles i18n, accordion, command copying, and page actions
   ------------------------------------------------------------- */

// Translation Dictionary
const translations = {
  en: {
    "logo-text": "Antigravity Proxy Patch",
    "lang-text": "فارسی",
    "hero-badge": "v1.9 Stable",
    "hero-title": "Bypass Restricted Networks in Google Antigravity",
    "hero-subtitle": "Fix Google Antigravity authentication and AI feature issues behind corporate proxies, VPNs, and restricted networks with a lightweight DLL injection patch.",
    "btn-download": "Download ZIP",
    "btn-fork": "Fork on GitHub",
    "btn-star": "Star Repo",
    "diagram-title": "How it Works",
    "diagram-desc": "How traffic is intercepted at the process level and routed through your proxy",
    "node-ide-title": "Antigravity IDE",
    "node-ide-desc": "Requests blocked directly",
    "node-dll-title": "version.dll",
    "node-dll-desc": "Intercepts socket calls",
    "node-proxy-title": "Your Proxy",
    "node-proxy-desc": "Clash, V2Ray, Corp Proxy",
    "node-google-title": "Google Servers",
    "node-google-desc": "Auth & AI features active",
    
    "section-problem-title": "The Problem vs The Solution",
    "section-problem-desc": "Understanding why Google Antigravity fails to connect and how this patch resolves it.",
    "problem-badge": "The Problem",
    "problem-title": "Connection Failures",
    "problem-li-1": "Antigravity requires direct access to Google servers for sign-in and AI features.",
    "problem-li-2": "Fails completely behind corporate HTTP proxies or restricted/sanctioned networks.",
    "problem-li-3": "Child processes like language_server.exe bypass system-wide proxy settings.",
    "problem-li-4": "Common error: 'failed to make code assist backend request'.",
    
    "solution-badge": "The Solution",
    "solution-title": "Process Interception",
    "solution-li-1": "DLL injection intercepts network calls at the operating system socket level.",
    "solution-li-2": "Forces all child processes (language_server.exe, node.exe) through your proxy.",
    "solution-li-3": "Automated config script sets env variables, VS Code, and GUI settings.",
    "solution-li-4": "Fully open source, transparent, telemetry-free, and easily reversible.",
    
    "section-features-title": "Key Features",
    "section-features-desc": "Designed specifically for developers in restricted environments, focusing on simplicity and security.",
    "feature-1-title": "One-Click Installer",
    "feature-1-desc": "Run the simple batch script. No administrator privileges required for user-level installation.",
    "feature-2-title": "DLL Injection Technique",
    "feature-2-desc": "Intercepts traffic directly via version.dll placed next to the executable. Highly stable and non-destructive.",
    "feature-3-title": "Zero Telemetry & Tracking",
    "feature-3-desc": "The patch is open source. It collects no data, has no telemetry, and doesn't inspect network contents.",
    
    "section-steps-title": "Installation Guide",
    "section-steps-desc": "Follow these three simple steps to patch your Google Antigravity installation.",
    "step-1-title": "Configure Your Proxy",
    "step-1-desc": "Open antigravity-proxy-patch/proxy.settings.txt in any text editor and configure your HTTP proxy host and port.",
    "table-tool": "Proxy Tool",
    "table-notes": "Notes",
    "table-clash-notes": "Default HTTP proxy port",
    "table-v2ray-notes": "HTTP proxy (not SOCKS)",
    "table-ss-notes": "With HTTP proxy plugin",
    "table-corp-notes": "Ask your IT department",
    "table-squid-notes": "Default Squid port",
    "step-2-title": "Run the Installer",
    "step-2-desc": "Double-click Install-Patch.bat to automatically apply all patches, edit VS Code user settings, and set env variables.",
    "step-2-note": "Advanced Users: You can run Install-Patch.ps1 in PowerShell with custom flags like -SkipEnv or -SkipUserSettings.",
    "step-3-title": "Launch Antigravity",
    "step-3-desc": "Always start Antigravity using the newly created batch file in the install folder.",
    "step-3-note": "Do NOT use the regular Start Menu shortcut, as it won't load the proxy injector DLL.",
    
    "section-faq-title": "Frequently Asked Questions",
    "section-faq-desc": "Find answers to common questions and troubleshooting solutions.",
    "faq-1-q": "Will Google ban my account for using this?",
    "faq-1-a": "No. This patch only routes network traffic through a proxy — it doesn't modify authentication tokens, API calls, or any Google service behavior. It is functionally identical to using a system-wide proxy.",
    "faq-2-q": "Can I use this on macOS or Linux?",
    "faq-2-a": "This patch is Windows-only. The DLL injection technique is specific to Windows. macOS/Linux users should configure a system-wide proxy or use tools like `proxychains`.",
    "faq-3-q": "What should I do after Antigravity updates?",
    "faq-3-a": "Antigravity updates overwrite `version.dll` and `config.json`. You can easily re-patch by double-clicking `Reinstall-Proxy-Patch.bat` (if the patch folder is next to Antigravity) or re-running the installer.",
    "faq-4-q": "How do I completely uninstall the patch?",
    "faq-4-a": "Run `Uninstall-Patch.bat` to clean up the injected DLL and configuration files. Environment variables and VS Code settings can be manually restored if needed.",
    
    "section-security-title": "Security & Transparency",
    "section-security-desc": "We value developer trust. Here's why this patch is safe and reliable.",
    "security-sub-desc": "Every file in this repository is inspectable. You can verify everything yourself.",
    "security-item-1-title": "Fully Open Source",
    "security-item-1-desc": "Inspect all batch, PowerShell, and DLL source code.",
    "security-item-2-title": "Zero Telemetry",
    "security-item-2-desc": "No data collection, no analytics, no external tracking.",
    "security-item-3-title": "100% Reversible",
    "security-item-3-desc": "The uninstaller script cleanly removes all changes.",
    
    "footer-desc": "A lightweight, open-source utility to bypass restricted networks in Google Antigravity. Built with care for the developer community.",
    "footer-col-links": "Project Links",
    "footer-col-author": "Author",
    "author-name": "kakajan",
    "author-title": "Senior Full-Stack Developer & AI Coach",
    "author-company": "AYTRONIC",
    "license-text": "Licensed under the MIT License",
    "copyright": "All rights reserved.",
    "copy-success": "Copied!",
    "copy-code": "Copy"
  },
  fa: {
    "logo-text": "پچ پراکسی آنتی‌گرَویتی",
    "lang-text": "English",
    "hero-badge": "نسخه ۱.۹ پایدار",
    "hero-title": "رفع تحریم و مشکل اتصال گوگل آنتی‌گرَویتی",
    "hero-subtitle": "ورود آسان به حساب گوگل و اجرای سریع قابلیت‌های هوش مصنوعی آنتی‌گرَویتی در شبکه‌های محدود، تحریم‌شده یا متصل به پراکسی‌های سازمانی و شخصی با پچ سبک تزریق DLL.",
    "btn-download": "دانلود فایل ZIP",
    "btn-fork": "فورک در گیت‌هاب",
    "btn-star": "ستاره به پروژه",
    "diagram-title": "نحوه عملکرد پچ",
    "diagram-desc": "رهگیری ترافیک پردازش‌ها در سطح سیستم‌عامل و هدایت آن از پراکسی شما",
    "node-ide-title": "آنتی‌گرَویتی IDE",
    "node-ide-desc": "درخواست‌های مسدود شده",
    "node-dll-title": "فایل پچ (version.dll)",
    "node-dll-desc": "رهگیری اتصالات سوکت",
    "node-proxy-title": "پراکسی شما",
    "node-proxy-desc": "Clash، V2Ray، پراکسی سازمانی",
    "node-google-title": "سرورهای گوگل",
    "node-google-desc": "اتصال موفق و فعال",
    
    "section-problem-title": "بررسی مشکل و راه‌حل",
    "section-problem-desc": "چرا گوگل آنتی‌گرَویتی متصل نمی‌شود و پچ پراکسی چطور این مشکل را حل می‌کند؟",
    "problem-badge": "مشکل چیست؟",
    "problem-title": "خطاهای رایج اتصال",
    "problem-li-1": "آنتی‌گرَویتی برای ورود و استفاده از هوش مصنوعی نیاز به اتصال مستقیم به سرورهای گوگل دارد.",
    "problem-li-2": "پراکسی‌های سازمانی یا فیلترینگ و تحریم‌ها مانع دسترسی مستقیم می‌شوند.",
    "problem-li-3": "پردازش‌های داخلی مانند language_server.exe تنظیمات پراکسی سیستم را نادیده می‌گیرند.",
    "problem-li-4": "خطای رایج: 'failed to make code assist backend request'.",
    
    "solution-badge": "راه‌حل پچ",
    "solution-title": "رهگیری هوشمند ترافیک",
    "solution-li-1": "تزریق DLL به پردازش‌ها جهت رهگیری اتصالات در سطح سوکت‌های سیستم‌عامل.",
    "solution-li-2": "هدایت اجباری تمام پردازش‌های برنامه (شامل node و سرور زبان) از پراکسی بالادستی.",
    "solution-li-3": "اسکریپت خودکار متغیرهای محیطی، تنظیمات VS Code و GUI را پیکربندی می‌کند.",
    "solution-li-4": "کاملاً متن‌باز، بدون تله‌متری و دارای قابلیت حذف تمیز با یک کلیک.",
    
    "section-features-title": "ویژگی‌های اصلی پچ",
    "section-features-desc": "طراحی شده با در نظر گرفتن دغدغه‌های امنیتی و راحتی برنامه‌نویسان در شبکه‌های محدود.",
    "feature-1-title": "نصب سریع با یک کلیک",
    "feature-1-desc": "کافیست فایل Install-Patch.bat را اجرا کنید. نیازی به دسترسی ادمین (Admin) برای نصب در سطح کاربر نیست.",
    "feature-2-title": "تکنیک تزریق DLL",
    "feature-2-desc": "رهگیری اتصالات با قرار گرفتن فایل کم‌حجم version.dll کنار فایل اجرایی برنامه. پایدار و ایمن.",
    "feature-3-title": "امنیت کامل و بدون ردیابی",
    "feature-3-desc": "پروژه کاملاً متن‌باز است. هیچ‌گونه متغیر رهگیری، تله‌متری یا ارسال اطلاعات به خارج وجود ندارد.",
    
    "section-steps-title": "راهنمای نصب و راه‌اندازی",
    "section-steps-desc": "فقط با طی کردن این ۳ مرحله، مشکل اتصال گوگل آنتی‌گرَویتی را برطرف کنید.",
    "step-1-title": "تنظیم مشخصات پراکسی",
    "step-1-desc": "فایل proxy.settings.txt را در پوشه پچ باز کرده و HOST و PORT پراکسی خود را وارد کنید.",
    "table-tool": "ابزار پراکسی",
    "table-notes": "توضیحات",
    "table-clash-notes": "پورت پیش‌فرض HTTP Proxy",
    "table-v2ray-notes": "پراکسی HTTP (نه SOCKS)",
    "table-ss-notes": "به همراه پلاگین HTTP Proxy",
    "table-corp-notes": "از واحد فناوری اطلاعات بپرسید",
    "table-squid-notes": "پورت پیش‌فرض Squid",
    "step-2-title": "اجرای اسکریپت نصب",
    "step-2-desc": "روی فایل Install-Patch.bat دابل‌کلیک کنید تا تنظیمات VS Code، متغیرهای محیطی و DLL به‌صورت خودکار اعمال شوند.",
    "step-2-note": "کاربران پیشرفته: می‌توانید اسکریپت Install-Patch.ps1 را در پاورشل با پارامترهای سفارشی مثل SkipEnv- یا Quiet- اجرا کنید.",
    "step-3-title": "اجرای آنتی‌گرَویتی",
    "step-3-desc": "همیشه برنامه را با استفاده از فایل لانچر جدید ساخته شده در مسیر نصب اجرا کنید:",
    "step-3-note": "مهم: از شورتکات معمولی منوی استارت استفاده نکنید، چون در آن حالت پچ لود نخواهد شد.",
    
    "section-faq-title": "سوالات متداول و عیب‌یابی",
    "section-faq-desc": "پاسخ به سوالات پرتکرار و راه‌حل‌های سریع برای عیب‌یابی پچ.",
    "faq-1-q": "آیا گوگل به خاطر استفاده از این پچ حساب من را مسدود می‌کند؟",
    "faq-1-a": "خیر. این پچ فقط ترافیک شبکه را هدایت می‌کند و هیچ تغییری در توکن‌های احراز هویت، ریکوئست‌ها یا رفتار هوش مصنوعی گوگل نمی‌دهد. رفتار آن دقیقاً مشابه استفاده از پراکسی سیستمی است.",
    "faq-2-q": "آیا این پچ روی سیستم‌عامل مک یا لینوکس کار می‌کند؟",
    "faq-2-a": "خیر، این پچ به دلیل استفاده از تکنیک تزریق DLL مختص ویندوز است. کاربران مک و لینوکس باید پراکسی سیستمی را تنظیم کرده یا از ابزارهایی مثل proxychains استفاده کنند.",
    "faq-3-q": "بعد از آپدیت شدن خودکار آنتی‌گرَویتی چه باید کرد؟",
    "faq-3-a": "آپدیت‌های آنتی‌گرَویتی فایل‌های DLL را بازنویسی می‌کنند. بعد از آپدیت، کافیست روی Reinstall-Proxy-Patch.bat دابل‌کلیک کنید تا پچ مجدداً فعال شود.",
    "faq-4-q": "چگونه پچ را به‌طور کامل حذف کنم؟",
    "faq-4-a": "کافیست فایل Uninstall-Patch.bat را اجرا کنید تا تمام فایل‌های تزریق شده به‌تمیزی پاک شوند. متغیرهای محیطی یا تنظیمات VS Code را نیز می‌توانید به‌طور دستی بازگردانید.",
    
    "section-security-title": "امنیت و شفافیت",
    "section-security-desc": "ما به امنیت شما اهمیت می‌دهیم. در ادامه دلایل امن بودن پچ را بررسی می‌کنیم.",
    "security-sub-desc": "تمام فایل‌ها و کدهای این پروژه به‌صورت عمومی قابل بازبینی و کنترل هستند.",
    "security-item-1-title": "کاملاً متن‌باز",
    "security-item-1-desc": "کدهای اسکریپت‌های نصب و فایل DLL در گیت‌هاب قابل بررسی هستند.",
    "security-item-2-title": "بدون جمع‌آوری داده",
    "security-item-2-desc": "فاقد هرگونه متغیر رهگیری، تله‌متری یا ارسال اطلاعات.",
    "security-item-3-title": "قابل حذف کامل",
    "security-item-3-desc": "حذف کامل و بدون دردسر تمام تغییرات با اسکریپت Uninstall.",
    
    "footer-desc": "یک ابزار سبک و متن‌باز برای رفع محدودیت‌های اتصال در گوگل آنتی‌گرَویتی. ساخته شده با عشق برای جامعه برنامه‌نویسان.",
    "footer-col-links": "لینک‌های پروژه",
    "footer-col-author": "توسعه‌دهنده",
    "author-name": "کاکاجان",
    "author-title": "برنامه‌نویس ارشد فول‌استک و مدرس هوش مصنوعی",
    "author-company": "آیترونیک",
    "license-text": "تحت لایسنس MIT منتشر شده است",
    "copyright": "تمامی حقوق محفوظ است.",
    "copy-success": "کپی شد!",
    "copy-code": "کپی کد"
  }
};

// State Manager
let currentLang = 'en';

// Apply translations to DOM elements
function applyTranslations(lang) {
  currentLang = lang;
  
  // Set html document attributes
  document.documentElement.setAttribute('lang', lang);
  document.documentElement.setAttribute('dir', lang === 'fa' ? 'rtl' : 'ltr');
  
  // Update document title
  document.title = lang === 'fa' 
    ? 'پچ پراکسی گوگل آنتی‌گرَویتی - رفع تحریم و مشکل اتصال'
    : 'Google Antigravity Proxy Patch - Bypass Restricted Networks';

  // Update elements with data-i18n attribute
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      element.innerHTML = translations[lang][key];
    }
  });

  // Handle placeholders or custom attributes if any
  document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
    const key = element.getAttribute('data-i18n-placeholder');
    if (translations[lang] && translations[lang][key]) {
      element.setAttribute('placeholder', translations[lang][key]);
    }
  });
}

// Toggle Language
function toggleLanguage() {
  const nextLang = currentLang === 'en' ? 'fa' : 'en';
  applyTranslations(nextLang);
  localStorage.setItem('antigravity_patch_lang', nextLang);
}

// Copy Command Function
async function copyToClipboard(button, textToCopy) {
  try {
    await navigator.clipboard.writeText(textToCopy);
    
    // Visual feedback
    const originalContent = button.innerHTML;
    const successText = translations[currentLang]["copy-success"] || "Copied!";
    
    button.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" style="width:12px;height:12px;color:var(--color-success)">
        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
      </svg>
      <span>${successText}</span>
    `;
    button.style.borderColor = 'var(--color-success)';
    
    setTimeout(() => {
      button.innerHTML = originalContent;
      button.style.borderColor = '';
    }, 2000);
  } catch (err) {
    console.error('Failed to copy text: ', err);
  }
}

// Initialize on DOM Loaded
document.addEventListener('DOMContentLoaded', () => {
  // 1. Language Initialization
  let savedLang = localStorage.getItem('antigravity_patch_lang');
  
  if (!savedLang) {
    // Detect system browser language
    const browserLang = navigator.language || navigator.userLanguage;
    savedLang = (browserLang && browserLang.startsWith('fa')) ? 'fa' : 'en';
  }
  
  applyTranslations(savedLang);

  // Bind Language Toggle Button
  const langTogglerBtn = document.getElementById('lang-btn');
  if (langTogglerBtn) {
    langTogglerBtn.addEventListener('click', toggleLanguage);
  }

  // 2. Accordions (FAQs)
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    trigger.addEventListener('click', () => {
      // Toggle current item
      const isActive = item.classList.contains('active');
      
      // Close all other items first
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
      });
      
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // 3. Command Copy Buttons binding
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const codeId = btn.getAttribute('data-code-id');
      const codeElement = document.getElementById(codeId);
      if (codeElement) {
        copyToClipboard(btn, codeElement.innerText.trim());
      }
    });
  });

  // 4. Interactive network flow animation timing modifications
  // Change node classes dynamically to match packet movement
  const nodes = document.querySelectorAll('.network-flow .node');
  let currentNodeIndex = 0;

  setInterval(() => {
    nodes.forEach(node => node.classList.remove('node-active'));
    nodes[currentNodeIndex].classList.add('node-active');
    currentNodeIndex = (currentNodeIndex + 1) % nodes.length;
  }, 2500); // sync with animation duration of CSS pulse dots
});
