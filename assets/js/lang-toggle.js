/* lang-toggle.js — tiny zh/en content switcher, no reload, no deps */
(function () {
  var STORAGE_KEY = 'site-lang';
  var root = document.documentElement;

  function getStoredLang() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null;
    }
  }

  function storeLang(lang) {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {
      /* localStorage unavailable — ignore, toggle still works for this page view */
    }
  }

  function applyLang(lang) {
    root.setAttribute('data-lang', lang);
    var buttons = document.querySelectorAll('.lang-toggle');
    for (var i = 0; i < buttons.length; i++) {
      var btn = buttons[i];
      btn.textContent = lang === 'en' ? '中文' : 'EN';
      btn.setAttribute('aria-label', lang === 'en' ? 'Switch to Chinese' : 'Switch to English');
    }
  }

  function initLang() {
    var lang = getStoredLang() || root.getAttribute('data-lang') || 'en';
    applyLang(lang);
  }

  document.addEventListener('DOMContentLoaded', function () {
    initLang();
    var buttons = document.querySelectorAll('.lang-toggle');
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener('click', function () {
        var current = root.getAttribute('data-lang') === 'zh' ? 'zh' : 'en';
        var next = current === 'en' ? 'zh' : 'en';
        applyLang(next);
        storeLang(next);
      });
    }
  });
})();
