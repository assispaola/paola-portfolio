import { PROJECTS_META } from '../data/portfolio.data.js';
import { t } from './i18n.js';

const LINK_ICONS = {
  github: '<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" stroke="none"><path d="M12 1.3a10.7 10.7 0 0 0-3.4 20.9c.5.1.7-.2.7-.5v-2c-3 .6-3.6-1.3-3.6-1.3-.5-1.2-1.2-1.5-1.2-1.5-1-.6.1-.6.1-.6 1.1.1 1.7 1.1 1.7 1.1 1 1.6 2.5 1.2 3.1 1 0-.7.4-1.2.7-1.5-2.4-.3-4.9-1.2-4.9-5.3 0-1.2.4-2.2 1.1-2.9-.1-.3-.5-1.4.1-2.9 0 0 .9-.3 3 1.1a10.4 10.4 0 0 1 5.4 0c2.1-1.4 3-1.1 3-1.1.6 1.5.2 2.6.1 2.9.7.7 1.1 1.7 1.1 2.9 0 4.1-2.5 5-4.9 5.3.4.3.7.9.7 1.8v2.7c0 .3.2.6.7.5A10.7 10.7 0 0 0 12 1.3z"/></svg>',
  figma: '<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" stroke="none"><path d="M8.5 22a3.5 3.5 0 0 1-3.5-3.5V15h3.5a3.5 3.5 0 0 1 0 7z"/><path opacity=".6" d="M5 11.5A3.5 3.5 0 0 1 8.5 8H12v7H8.5A3.5 3.5 0 0 1 5 11.5z"/><path opacity=".75" d="M5 4.5A3.5 3.5 0 0 1 8.5 1H12v7H8.5A3.5 3.5 0 0 1 5 4.5z"/><path opacity=".8" d="M12 1h3.5a3.5 3.5 0 0 1 0 7H12V1z"/><path opacity=".4" d="M19 11.5A3.5 3.5 0 1 1 15.5 8 3.5 3.5 0 0 1 19 11.5z"/></svg>',
  live: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 4h6v6M10 14 20 4M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5"/></svg>',
};

const total = String(PROJECTS_META.length).padStart(2, '0');
let activeIdx = 0;
let imgIdx = 0;

function pad(n) {
  return String(n).padStart(2, '0');
}

function renderStage(stage) {
  const proj = PROJECTS_META[activeIdx];
  const card = t().work.cards[proj.id];
  const img = proj.imgs[imgIdx];

  stage.innerHTML = `
    <div class="showcase-frame">
      <div class="project-image">
        <img src="${img}" alt="${proj.ttl}" loading="lazy" data-showcase-img/>
        <div class="project-image-placeholder" data-showcase-placeholder>
          <span class="material-symbols-outlined">image</span>
        </div>
        ${proj.imgs.length > 1 ? `
        <button type="button" class="project-image-nav prev" data-img-prev aria-label="Imagem anterior">
          <span class="material-symbols-outlined">chevron_left</span>
        </button>
        <button type="button" class="project-image-nav next" data-img-next aria-label="Próxima imagem">
          <span class="material-symbols-outlined">chevron_right</span>
        </button>
        <div class="project-image-dots">
          ${proj.imgs.map((_, i) => `<button type="button" class="${i === imgIdx ? 'on' : ''}" data-img-dot="${i}" aria-label="Imagem ${i + 1}"></button>`).join('')}
        </div>` : ''}
      </div>
    </div>
    <div class="showcase-info">
      <div class="info-top">
        <span class="info-cat">${card.badge}</span>
        <span class="info-num">${proj.num} / ${total}</span>
      </div>
      <h3 class="info-ttl">${proj.ttl}</h3>
      <p class="info-dsc">${card.dsc}</p>
      <div class="info-tags">
        ${proj.tags.map((tag) => `<span class="tag">${tag}</span>`).join('')}
      </div>
      <div class="info-links">
        ${proj.links.map((link) => `
          <a href="${link.href}" target="_blank" rel="noreferrer" class="btn btn-primary" style="padding:12px 18px;font-size:14px">
            ${LINK_ICONS[link.type] || ''}
            ${link.label}
            <span class="material-symbols-outlined" style="font-size:14px">arrow_outward</span>
          </a>`).join('')}
        <button type="button" class="btn btn-secondary" style="padding:12px 18px;font-size:14px" data-project-next>
          ${t().work.next}
          <span class="material-symbols-outlined" style="font-size:14px">arrow_forward</span>
        </button>
      </div>
    </div>
  `;

  const imgEl = stage.querySelector('[data-showcase-img]');
  const placeholder = stage.querySelector('[data-showcase-placeholder]');
  imgEl.addEventListener('load', () => { imgEl.classList.add('loaded'); placeholder.style.display = 'none'; });
  imgEl.addEventListener('error', () => { imgEl.classList.remove('loaded'); });

  stage.querySelector('[data-img-prev]')?.addEventListener('click', () => {
    const n = proj.imgs.length;
    imgIdx = (imgIdx - 1 + n) % n;
    renderStage(stage);
  });
  stage.querySelector('[data-img-next]')?.addEventListener('click', () => {
    const n = proj.imgs.length;
    imgIdx = (imgIdx + 1) % n;
    renderStage(stage);
  });
  stage.querySelectorAll('[data-img-dot]').forEach((dot) => {
    dot.addEventListener('click', () => {
      imgIdx = Number(dot.getAttribute('data-img-dot'));
      renderStage(stage);
    });
  });
  stage.querySelector('[data-project-next]')?.addEventListener('click', () => {
    activeIdx = (activeIdx + 1) % PROJECTS_META.length;
    imgIdx = 0;
    render(stage, stage.parentElement.querySelector('[data-showcase-thumbs]'));
  });
}

function renderThumbs(thumbs, stage) {
  thumbs.innerHTML = PROJECTS_META.map((p, i) => `
    <button type="button" role="tab" class="thumb ${i === activeIdx ? 'on' : ''}" data-thumb="${i}">
      <span class="thumb-num">${p.num}</span>
      <span class="thumb-ttl">${p.ttl}</span>
      <span class="thumb-cat">${t().work.cards[p.id]?.badge ?? ''}</span>
    </button>
  `).join('');

  thumbs.querySelectorAll('[data-thumb]').forEach((btn) => {
    btn.addEventListener('click', () => {
      activeIdx = Number(btn.getAttribute('data-thumb'));
      imgIdx = 0;
      render(stage, thumbs);
    });
  });
}

function render(stage, thumbs) {
  renderStage(stage);
  renderThumbs(thumbs, stage);
}

export function initProjects() {
  const stage = document.querySelector('[data-showcase-stage]');
  const thumbs = document.querySelector('[data-showcase-thumbs]');
  if (!stage || !thumbs) return;
  render(stage, thumbs);
  document.addEventListener('localechange', () => render(stage, thumbs));
}
