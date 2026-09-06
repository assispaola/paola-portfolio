import { t } from './i18n.js';

const WHATSAPP_NUMBER = '5511930499095';

function buildWhatsAppMessage(data) {
  const f = t().contact.form;
  const lines = [
    `${f.name}: ${data.get('name')}`,
    `${f.email}: ${data.get('email')}`,
    `${f.phone}: ${data.get('phone')}`,
    `${f.type}: ${data.get('type')}`,
  ];
  const msg = (data.get('msg') || '').toString().trim();
  if (msg) lines.push('', msg);
  return lines.join('\n');
}

export function initContactForm() {
  const form = document.querySelector('[data-contact-form]');
  if (!form) return;

  const submitBtn = form.querySelector('[data-submit-btn]');
  const submitLabel = form.querySelector('[data-submit-label]');
  const errorMsg = form.querySelector('[data-form-error]');
  let status = 'idle';

  const setStatus = (next) => {
    status = next;
    const f = t().contact.form;
    submitLabel.textContent = status === 'success' ? f.submitted : f.submit;
    errorMsg.hidden = status !== 'error';
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    if (data.get('_honeypot')) return;

    const message = buildWhatsAppMessage(data);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    const win = window.open(url, '_blank', 'noopener');

    if (!win) {
      setStatus('error');
      return;
    }

    setStatus('success');
    form.reset();
    setTimeout(() => setStatus('idle'), 4000);
  });

  document.addEventListener('localechange', () => setStatus(status));
}
