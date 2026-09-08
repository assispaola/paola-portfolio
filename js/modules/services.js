export function initServicesAccordion() {
  document.querySelectorAll('[data-service-toggle]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.service');
      if (!card) return;
      const isOpen = card.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', String(isOpen));
    });
  });
}

export function initServicesTabs() {
  const tabsWrap = document.querySelector('[data-services-tabs]');
  const grid = document.querySelector('.services-grid');
  if (!tabsWrap || !grid) return;

  const tabs = Array.from(tabsWrap.querySelectorAll('[data-tab-category]'));
  const cards = Array.from(grid.querySelectorAll('[data-category]'));

  function applyFilter(category) {
    cards.forEach((card) => {
      card.classList.toggle('is-hidden', card.getAttribute('data-category') !== category);
    });
  }

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      if (tab.classList.contains('is-active')) return;
      tabs.forEach((t) => t.classList.remove('is-active'));
      tab.classList.add('is-active');
      applyFilter(tab.getAttribute('data-tab-category'));
    });
  });

  const initial = tabs.find((t) => t.classList.contains('is-active')) || tabs[0];
  if (initial) applyFilter(initial.getAttribute('data-tab-category'));
}
