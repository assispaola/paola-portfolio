import { getLocale } from './i18n.js';

export function initNav() {
  const nav = document.querySelector('.nav');
  const hamburger = document.querySelector('[data-menu-open]');
  const closeBtn = document.querySelector('[data-menu-close]');
  const drawer = document.querySelector('.nav-drawer');
  const scrim = drawer?.querySelector('.scrim');
  const drawerLinks = drawer?.querySelectorAll('a');
  const langToggle = document.querySelector('.lang-toggle');

  const onScroll = () => nav?.classList.toggle('scrolled', window.scrollY > 12);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  const setMenu = (open) => {
    drawer?.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  };
  hamburger?.addEventListener('click', () => setMenu(true));
  closeBtn?.addEventListener('click', () => setMenu(false));
  scrim?.addEventListener('click', () => setMenu(false));
  drawerLinks?.forEach((a) => a.addEventListener('click', () => setMenu(false)));

  const syncLangUI = () => {
    const locale = getLocale();
    langToggle?.setAttribute('data-active', locale);
    langToggle?.querySelectorAll('[data-lang-btn]').forEach((btn) => {
      btn.classList.toggle('on', btn.getAttribute('data-lang-btn') === locale);
    });
  };
  syncLangUI();
  document.addEventListener('localechange', syncLangUI);
}
