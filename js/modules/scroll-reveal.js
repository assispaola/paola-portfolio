import gsap from 'gsap';

export function initScrollReveal() {
  const targets = document.querySelectorAll('[data-reveal]');
  if (!targets.length) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const delay = parseFloat(el.getAttribute('data-reveal-delay') || '0');
        gsap.to(el, { opacity: 1, y: 0, duration: 0.65, delay, ease: 'power3.out' });
        obs.unobserve(el);
      });
    },
    { rootMargin: '0px 0px -12% 0px', threshold: 0 }
  );

  targets.forEach((el) => {
    const y = parseFloat(el.getAttribute('data-reveal-y') || '28');
    gsap.set(el, { opacity: 0, y });
    observer.observe(el);
  });
}
