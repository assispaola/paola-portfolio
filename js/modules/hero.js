import gsap from 'gsap';
import { SKILLS_MARQUEE } from '../data/portfolio.data.js';
import { t } from './i18n.js';

function renderStats() {
  const container = document.querySelector('[data-hero-stats]');
  if (!container) return;
  container.innerHTML = t().hero.stats.map((s) => {
    const plus = s.n.includes('+');
    const num = s.n.replace('+', '');
    return `<div class="stat">
      <span class="n">${num}${plus ? '<span class="sm">+</span>' : ''}</span>
      <div class="l">${s.l}</div>
    </div>`;
  }).join('');
}

export function initHero() {
  const track = document.querySelector('.marquee-track');
  if (track) {
    const skills = [...SKILLS_MARQUEE, ...SKILLS_MARQUEE];
    track.innerHTML = skills.map((s) => `<span>${s}</span>`).join('');
  }

  const timeEl = document.querySelector('[data-hero-time]');
  if (timeEl) {
    timeEl.textContent = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  }

  renderStats();
  document.addEventListener('localechange', renderStats);

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  tl.from('.hero-head', { opacity: 0, y: 20, duration: 0.7, delay: 0.1 })
    .from('.hero-content > *', { opacity: 0, y: 30, duration: 0.8, stagger: 0.12 }, '-=0.4')
    .from('.marquee', { opacity: 0, duration: 0.6 }, '-=0.3');
}
