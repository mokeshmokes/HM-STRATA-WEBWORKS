'use client';

import { useEffect, useRef, useState } from 'react';

const services = [
  {
    icon: 'fa-palette',
    title: 'Website Design',
    desc: 'Pixel-perfect, brand-aligned designs that stop the scroll. We craft visual stories that turn visitors into believers.',
    bullets: ['Custom UI/UX design', 'Brand identity integration', 'Mobile-first responsive layouts'],
    color: '#00d4ff',
    tag: 'Most Popular'
  },
  {
    icon: 'fa-code',
    title: 'Website Development',
    desc: 'Blazing-fast, secure web apps built on modern stacks. Clean code, zero bloat, maximum performance.',
    bullets: ['Next.js / React builds', 'API & CMS integration', 'Core Web Vitals optimised'],
    color: '#a855f7',
    tag: null
  },
  {
    icon: 'fa-shopping-cart',
    title: 'E-Commerce Solutions',
    desc: 'Complete stores built to sell — from product listings to checkout flows that maximise conversions.',
    bullets: ['Shopify / WooCommerce', 'Secure payment gateways', 'Inventory & order management'],
    color: '#f59e0b',
    tag: null
  },
  {
    icon: 'fa-search',
    title: 'SEO Optimisation',
    desc: 'Climb the rankings and own your niche. Data-driven strategies that bring high-intent traffic to your door.',
    bullets: ['Technical & on-page SEO', 'Keyword & competitor research', 'Monthly performance reports'],
    color: '#22c55e',
    tag: null
  },
  {
    icon: 'fa-mobile-alt',
    title: 'UI / UX Design',
    desc: 'Interfaces so intuitive users never need to think. Every click, every flow designed around real human behaviour.',
    bullets: ['User journey mapping', 'Interactive prototypes', 'Usability testing'],
    color: '#f43f5e',
    tag: null
  },
  {
    icon: 'fa-bullhorn',
    title: 'Digital Marketing',
    desc: 'Multi-channel campaigns that amplify your brand, grow your audience, and deliver measurable ROI.',
    bullets: ['Paid ads (Meta, Google)', 'Content & social strategy', 'Email automation'],
    color: '#818cf8',
    tag: null
  }
];

/* Animated canvas background */
function ServicesBg() {
  const canvasRef = useRef(null);
  const animRef   = useRef(null);

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

    /* wave lines */
    let tick = 0;
    const waves = Array.from({ length: 5 }, (_, i) => ({
      amp:    30 + i * 18,
      freq:   0.008 - i * 0.001,
      speed:  0.012 + i * 0.004,
      hue:    200 + i * 30,
      offset: (i * Math.PI * 2) / 5
    }));

    /* orbs */
    const orbs = Array.from({ length: 5 }, (_, i) => ({
      x: (W / 5) * i + W / 10,
      y: H / 2,
      r: 120 + i * 40,
      dx: (Math.random() - 0.5) * 0.5,
      dy: (Math.random() - 0.5) * 0.5,
      hue: 190 + i * 35
    }));

    /* small sparkles */
    const sparks = Array.from({ length: 80 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      r: 0.5 + Math.random() * 1.5,
      a: Math.random() * Math.PI * 2,
      speed: 0.5 + Math.random() * 0.8,
      alpha: 0.2 + Math.random() * 0.6
    }));

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      tick++;

      /* orbs */
      orbs.forEach(o => {
        o.x += o.dx; o.y += o.dy;
        if (o.x < -o.r || o.x > W + o.r) o.dx *= -1;
        if (o.y < -o.r || o.y > H + o.r) o.dy *= -1;
        const g = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r);
        g.addColorStop(0, `hsla(${o.hue},100%,65%,0.08)`);
        g.addColorStop(1, 'transparent');
        ctx.beginPath();
        ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
      });

      /* waves */
      waves.forEach(w => {
        ctx.beginPath();
        for (let x = 0; x <= W; x += 3) {
          const y = H / 2 + Math.sin(x * w.freq + tick * w.speed + w.offset) * w.amp
                           + Math.sin(x * w.freq * 0.5 + tick * w.speed * 0.7) * (w.amp * 0.4);
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `hsla(${w.hue},100%,65%,0.06)`;
        ctx.lineWidth = 1.2;
        ctx.stroke();
      });

      /* sparkles */
      sparks.forEach(s => {
        s.a += s.speed * 0.02;
        s.x += Math.cos(s.a) * 0.3;
        s.y += Math.sin(s.a) * 0.3 - 0.15;
        if (s.y < -5) { s.y = H + 5; s.x = Math.random() * W; }
        const flicker = 0.3 + 0.7 * Math.abs(Math.sin(tick * 0.04 + s.a));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(150,220,255,${s.alpha * flicker})`;
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

  return <canvas ref={canvasRef} className="srv-canvas" aria-hidden="true" />;
}

export default function Services() {
  const [hovered, setHovered] = useState(null);

  return (
    <section id="services" className="services-v2">
      <ServicesBg />
      <div className="srv-overlay" aria-hidden="true" />
      <div className="srv-edge srv-edge-top"    aria-hidden="true" />
      <div className="srv-edge srv-edge-bottom" aria-hidden="true" />

      <div className="container srv-container">

        {/* Header */}
        <div className="srv-header" data-aos="fade-up">
          <span className="srv-eyebrow">WHAT WE DO</span>
          <h2>Services That <span className="srv-gradient-text">Drive Growth</span></h2>
          <p>Every service is engineered to attract, engage, and convert — because beautiful work means nothing without results.</p>
        </div>

        {/* Grid */}
        <div className="srv-grid">
          {services.map((svc, i) => (
            <div
              key={i}
              className={`srv-card ${hovered === i ? 'srv-card-hovered' : ''}`}
              style={{ '--srv-color': svc.color, '--srv-delay': `${i * 80}ms` }}
              data-aos="fade-up"
              data-aos-delay={i * 80}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Tag */}
              {svc.tag && <span className="srv-tag">{svc.tag}</span>}

              {/* Top glow bar */}
              <div className="srv-top-bar" aria-hidden="true" />

              {/* Icon */}
              <div className="srv-icon-wrap">
                <div className="srv-icon-ring" aria-hidden="true" />
                <div className="srv-icon">
                  <i className={`fas ${svc.icon}`} />
                </div>
              </div>

              {/* Text */}
              <h3 className="srv-title">{svc.title}</h3>
              <p className="srv-desc">{svc.desc}</p>

              {/* Bullets */}
              <ul className="srv-bullets">
                {svc.bullets.map((b, bi) => (
                  <li key={bi}>
                    <i className="fas fa-check-circle" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              {/* CTA link */}
              <a href="#contact" className="srv-cta-link">
                Get Started <i className="fas fa-arrow-right" />
              </a>

              {/* Shine sweep */}
              <div className="srv-shine" aria-hidden="true" />
            </div>
          ))}
        </div>

        {/* Bottom banner */}
        <div className="srv-bottom-banner" data-aos="zoom-in" data-aos-delay="300">
          <div className="srv-banner-inner">
            <div className="srv-banner-text">
              <h3>Not sure which service you need?</h3>
              <p>Book a free 30-min strategy call — we'll figure it out together.</p>
            </div>
            <a href="#contact" className="srv-banner-btn">
              <i className="fas fa-calendar-check" /> Book Free Call
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
