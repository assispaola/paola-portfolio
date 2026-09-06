import { TRANSLATIONS } from '../data/portfolio.data.js';

const STORAGE_KEY = 'paola-locale';
let currentLocale = localStorage.getItem(STORAGE_KEY) || 'pt';

function get(obj, path) {
  return path.split('.').reduce((acc, key) => (acc == null ? acc : acc[key]), obj);
}

function applyTranslations() {
  const t = TRANSLATIONS[currentLocale];
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const value = get(t, el.getAttribute('data-i18n'));
    if (value == null) return;
    el.textContent = value;
  });
  document.querySelectorAll('[data-i18n-html]').forEach((el) => {
    const value = get(t, el.getAttribute('data-i18n-html'));
    if (value == null) return;
    el.innerHTML = value;
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    const value = get(t, el.getAttribute('data-i18n-placeholder'));
    if (value == null) return;
    el.setAttribute('placeholder', value);
  });
  document.querySelectorAll('[data-i18n-aria-label]').forEach((el) => {
    const value = get(t, el.getAttribute('data-i18n-aria-label'));
    if (value == null) return;
    el.setAttribute('aria-label', value);
  });
}

export function t() {
  return TRANSLATIONS[currentLocale];
}

export function getLocale() {
  return currentLocale;
}

export function setLocale(locale) {
  if (!TRANSLATIONS[locale] || locale === currentLocale) {
    if (TRANSLATIONS[locale]) applyTranslations();
    return;
  }
  currentLocale = locale;
  localStorage.setItem(STORAGE_KEY, locale);
  document.documentElement.setAttribute('lang', locale === 'pt' ? 'pt-BR' : 'en');
  applyTranslations();
  document.dispatchEvent(new CustomEvent('localechange', { detail: { locale } }));
}

export function initI18n() {
  document.documentElement.setAttribute('lang', currentLocale === 'pt' ? 'pt-BR' : 'en');
  applyTranslations();
  document.querySelectorAll('[data-lang-btn]').forEach((btn) => {
    btn.addEventListener('click', () => setLocale(btn.getAttribute('data-lang-btn')));
  });
}
