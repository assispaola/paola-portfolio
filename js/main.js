import { initI18n } from './modules/i18n.js';
import { initNav } from './modules/nav.js';
import { initHero } from './modules/hero.js';
import { initProjects } from './modules/projects.js';
import { initExperience } from './modules/experience.js';
import { initScrollReveal } from './modules/scroll-reveal.js';
import { initContactForm } from './modules/contact-form.js';

document.addEventListener('DOMContentLoaded', () => {
  initI18n();
  initNav();
  initHero();
  initProjects();
  initExperience();
  initContactForm();
  initScrollReveal();
});
