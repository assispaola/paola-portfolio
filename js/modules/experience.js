import { EXPERIENCES_META } from '../data/portfolio.data.js';
import { t } from './i18n.js';

function renderNow(container) {
  const exp = t().exp;
  container.innerHTML = `
    <div class="lbl">${exp.nowLbl}</div>
    <div class="val">Certsys</div>
    <div class="sub">${exp.nowSub}</div>
    <div style="display:flex;gap:8px;margin-top:8px">
      <span class="tag accent">${exp.avail}</span>
      <span class="tag">PT/EN</span>
    </div>
    <a href="/assets/Paola_Assis_CV_ATS.pdf" download class="btn btn-primary btn-block">
      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12M6 11l6 6 6-6M5 21h14"/></svg>
      ${t().nav.cv}
    </a>
  `;
}

function renderList(container) {
  const exp = t().exp;
  container.innerHTML = EXPERIENCES_META.map((x, i) => {
    const item = exp.items[i];
    const dateParts = x.date.split(' — ');
    const dateHtml = dateParts.map((part, j) => `<div>${part}${j === 1 && x.current ? `<span class="now">${exp.now}</span>` : ''}</div>`).join('');
    return `
      <article class="exp-item">
        <div class="exp-date">${dateHtml}</div>
        <div class="exp-body">
          <h3 class="exp-role">${item?.role} <span class="at">@ <span class="co">${x.company}</span></span></h3>
          <div class="exp-client">${item?.client}</div>
          <p class="exp-dsc">${item?.dsc}</p>
          ${item?.award ? `
          <div class="exp-award">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l2.5 6 6.5.5-5 4.5 1.6 6.5L12 17.3 6.4 20.5 8 14l-5-4.5L9.5 9z"/></svg>
            ${item.award}
          </div>` : ''}
          <div class="exp-tags">${x.tags.map((tag) => `<span class="tag">${tag}</span>`).join('')}</div>
        </div>
      </article>
    `;
  }).join('');
}

function renderCerts(container) {
  const exp = t().exp;
  container.innerHTML = `
    <article class="cert education">
      <div class="cert-y">${exp.eduItem.period}</div>
      <div class="cert-body">
        <div class="cert-ttl">${exp.eduItem.degree}</div>
        <div class="cert-by">${exp.eduItem.school}</div>
        <span class="cert-kind">${exp.education}</span>
      </div>
    </article>
    ${exp.certs.map((c) => `
      <article class="cert">
        <div class="cert-y">${c.y}</div>
        <div class="cert-body">
          <div class="cert-ttl">${c.ttl}</div>
          <div class="cert-by">${c.by}</div>
        </div>
      </article>
    `).join('')}
  `;
}

export function initExperience() {
  const now = document.querySelector('[data-exp-now]');
  const list = document.querySelector('[data-exp-list]');
  const certs = document.querySelector('[data-exp-certs]');
  if (!now || !list || !certs) return;

  const render = () => {
    renderNow(now);
    renderList(list);
    renderCerts(certs);
  };
  render();
  document.addEventListener('localechange', render);
}
