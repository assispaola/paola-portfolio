const ACCENT = '#fe96e1';
const STRAND_COUNT = 8;

function hexToRgb(hex) {
  const v = parseInt(hex.slice(1), 16);
  return [(v >> 16) & 255, (v >> 8) & 255, v & 255];
}

function createStrands() {
  return Array.from({ length: STRAND_COUNT }, (_, i) => {
    const isThick = i % 2 === 0;
    return {
      baseY: 0.18 + (i / (STRAND_COUNT - 1)) * 0.64,
      amp: 50 + Math.random() * 80,
      freq: 0.7 + Math.random() * 1.0,
      speed: 0.1 + Math.random() * 0.12,
      phase: Math.random() * Math.PI * 2,
      width: isThick ? 4.5 + Math.random() * 3.5 : 0.6 + Math.random() * 0.7,
      opacity: isThick ? 0.3 + Math.random() * 0.25 : 0.55 + Math.random() * 0.35,
      glow: isThick ? 24 : 8,
    };
  });
}

export function initHeroFlow() {
  const canvas = document.getElementById('hero-flow');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const [r, g, b] = hexToRgb(ACCENT);
  const strands = createStrands();
  const reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

  let W = 0;
  let H = 0;
  let raf = null;

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = canvas.clientWidth;
    H = canvas.clientHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (reduceMotionQuery.matches) drawFrame(0);
  }

  function drawStrand(strand, t) {
    const points = 140;
    ctx.beginPath();
    for (let p = 0; p <= points; p++) {
      const nx = p / points;
      const x = nx * W;
      const y = strand.baseY * H
        + Math.sin(nx * Math.PI * strand.freq * 2 + t * strand.speed + strand.phase) * strand.amp
        + Math.sin(nx * Math.PI * strand.freq * 0.5 - t * strand.speed * 0.6) * (strand.amp * 0.35);
      if (p === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.lineWidth = strand.width;
    ctx.strokeStyle = `rgba(${r},${g},${b},${strand.opacity})`;
    ctx.shadowColor = `rgba(${r},${g},${b},0.9)`;
    ctx.shadowBlur = strand.glow;
    ctx.stroke();

    ctx.lineWidth = strand.width * 3;
    ctx.strokeStyle = `rgba(${r},${g},${b},${strand.opacity * 0.1})`;
    ctx.shadowBlur = 0;
    ctx.stroke();
  }

  function drawFrame(t) {
    ctx.clearRect(0, 0, W, H);
    strands.forEach((s) => drawStrand(s, t));
  }

  function frame(ts) {
    drawFrame(ts / 1000);
    raf = requestAnimationFrame(frame);
  }

  function start() {
    if (raf) cancelAnimationFrame(raf);
    raf = null;
    if (reduceMotionQuery.matches) {
      drawFrame(0);
    } else {
      raf = requestAnimationFrame(frame);
    }
  }

  window.addEventListener('resize', resize);
  reduceMotionQuery.addEventListener('change', start);
  resize();
  start();
}
