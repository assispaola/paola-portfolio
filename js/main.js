import { initI18n } from './modules/i18n.js';
import { initNav } from './modules/nav.js';
import { initHero } from './modules/hero.js';
import { initHeroFlow } from './modules/hero-flow.js';
import { initServicesAccordion, initServicesTabs } from './modules/services.js';
import { initExperience } from './modules/experience.js';
import { initScrollReveal } from './modules/scroll-reveal.js';
import { initContactForm } from './modules/contact-form.js';

document.addEventListener('DOMContentLoaded', () => {
  initI18n();
  initNav();
  initHero();
  initHeroFlow();
  initServicesAccordion();
  initServicesTabs();
  initExperience();
  initContactForm();
  initScrollReveal();
});
