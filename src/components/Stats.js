'use client';

import { useEffect, useRef, useState } from 'react';

/* Animated counter hook */
function useCounter(target, duration = 1800) {
  const [count, setCount]   = useState(0);
  const [started, setStart] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setStart(true); obs.disconnect(); }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setCount(Math.floor(ease * target));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setCount(target);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, target, duration]);

  return [count, ref];
}

/* Individual stat card */
function StatCard({ icon, target, suffix, label, color, delay, desc }) {
  const [count, ref] = useCounter(target);

  return (
    <div
      className="sc2-card"
      ref={ref}
      style={{ '--sc-color': color, '--sc-delay': `${delay}ms` }}
      data-aos="fade-up"
      data-aos-delay={delay}
    >
      {/* Glow ring */}
      <div className="sc2-ring" aria-hidden="true">
        <svg viewBox="0 0 100 100" className="sc2-ring-svg">
          <circle cx="50" cy="50" r="44" className="sc2-ring-track" />
          <circle cx="50" cy="50" r="44" className="sc2-ring-fill" />
        </svg>
        <div className="sc2-icon">
          <i className={`fas ${icon}`} />
        </div>
      </div>

      {/* Number */}
      <div className="sc2-number">
        {count}{suffix}
      </div>

      {/* Label */}
      <div className="sc2-label">{label}</div>

      {/* Desc */}
      <p className="sc2-desc">{desc}</p>

      {/* Bottom shine */}
      <div className="sc2-shine" aria-hidden="true" />
    </div>
  );
}

/* Main section */
export default function Stats() {
  const canvasRef = useRef(null);
  const animRef   = useRef(null);

  /* Particle canvas */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W = canvas.width  = canvas.offsetWidth;
    let H = canvas.height = canvas.offsetHeight;

    const onResize = () => {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', onResize);

    /* Hexagonal grid nodes */
    const nodes = [];
    const cols = 14, rows = 8;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const offset = r % 2 === 0 ? 0 : (W / cols) / 2;
        nodes.push({
          x: offset + c * (W / cols) + (W / cols) / 2,
          y: r * (H / rows) + (H / rows) / 2,
          pulse: Math.random() * Math.PI * 2,
          speed: 0.02 + Math.random() * 0.02
        });
      }
    }

    /* Floating particles */
    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: 0.8 + Math.random() * 2,
      vy: -(0.2 + Math.random() * 0.5),
      vx: (Math.random() - 0.5) * 0.3,
      alpha: 0.3 + Math.random() * 0.5,
      hue: 180 + Math.random() * 60
    }));

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      /* Node connections */
      nodes.forEach((n, i) => {
        n.pulse += n.speed;
        const alpha = 0.04 + 0.03 * Math.sin(n.pulse);
        nodes.slice(i + 1).forEach(m => {
          const dx = n.x - m.x, dy = n.y - m.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < W / cols * 1.8) {
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(m.x, m.y);
            ctx.strokeStyle = `rgba(0,212,255,${alpha * (1 - dist / (W / cols * 1.8))})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        });

        /* Node dot */
        ctx.beginPath();
        ctx.arc(n.x, n.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,212,255,${0.08 + 0.06 * Math.sin(n.pulse)})`;
        ctx.fill();
      });

      /* Floating particles */
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.y < -10) { p.y = H + 10; p.x = Math.random() * W; }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue},100%,70%,${p.alpha})`;
        ctx.fill();
      });

      animRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const stats = [
    {
      icon: 'fa-project-diagram',
      target: 100,
      suffix: '+',
      label: 'Projects Completed',
      color: '#00d4ff',
      delay: 0,
      desc: 'Delivered across 12+ industries worldwide'
    },
    {
      icon: 'fa-smile',
      target: 50,
      suffix: '+',
      label: 'Happy Clients',
      color: '#a855f7',
      delay: 100,
      desc: 'Long-term partnerships built on trust'
    },
    {
      icon: 'fa-star',
      target: 99,
      suffix: '%',
      label: 'Client Satisfaction',
      color: '#f59e0b',
      delay: 200,
      desc: 'Rated 4.9/5 across all reviews'
    },
    {
      icon: 'fa-rocket',
      target: 24,
      suffix: 'h',
      label: 'Rapid Delivery',
      color: '#22c55e',
      delay: 300,
      desc: 'Fastest turnaround in the industry'
    }
  ];

  return (
    <section className="stats-v2">
      {/* Canvas background */}
      <canvas ref={canvasRef} className="stats-canvas" aria-hidden="true" />

      {/* Gradient overlays */}
      <div className="stats-overlay" aria-hidden="true" />

      {/* Top & bottom fade edges */}
      <div className="stats-edge stats-edge-top"    aria-hidden="true" />
      <div className="stats-edge stats-edge-bottom" aria-hidden="true" />

      <div className="container stats-v2-container">

        {/* Header */}
        <div className="stats-v2-header" data-aos="fade-up">
          <span className="stats-eyebrow">OUR NUMBERS</span>
          <h2>Why Choose <span className="stats-gradient-text">HMW WebWorks</span></h2>
          <p>Real results from real projects — numbers that prove we deliver on every promise.</p>
        </div>

        {/* Cards grid */}
        <div className="sc2-grid">
          {stats.map((s, i) => <StatCard key={i} {...s} />)}
        </div>

        {/* Marquee trust bar */}
        <div className="stats-trust-bar" data-aos="fade-up" data-aos-delay="400">
          <div className="stats-trust-track">
            {[
              '⚡ Fast Delivery',
              '🏆 Award-Winning Design',
              '🔒 Secure & Scalable',
              '📈 SEO-Optimised',
              '🤝 Dedicated Support',
              '💡 Innovative Solutions',
              '🌍 Global Clients',
              '✅ On-Time Every Time',
              '⚡ Fast Delivery',
              '🏆 Award-Winning Design',
              '🔒 Secure & Scalable',
              '📈 SEO-Optimised',
              '🤝 Dedicated Support',
              '💡 Innovative Solutions',
              '🌍 Global Clients',
              '✅ On-Time Every Time',
            ].map((t, i) => (
              <span key={i} className="stats-trust-item">{t}</span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
