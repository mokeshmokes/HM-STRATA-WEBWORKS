'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

/* ─── Layered canvas background ─── */
function HeroCanvas() {
  const canvasRef = useRef(null);
  const animRef   = useRef(null);
  const mouseRef  = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W = canvas.width  = window.innerWidth;
    let H = canvas.height = window.innerHeight;

    const onResize = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    const onMouse = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('resize', onResize);
    window.addEventListener('mousemove', onMouse);

    /* ── LAYER 1: Star field ── */
    const stars = Array.from({ length: 220 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      r: 0.4 + Math.random() * 1.6,
      twinkle: Math.random() * Math.PI * 2,
      speed: 0.01 + Math.random() * 0.02,
      layer: Math.floor(Math.random() * 3)   // 0=far, 1=mid, 2=near
    }));

    /* ── LAYER 2: Nebula orbs ── */
    const orbs = [
      { x: W * 0.15, y: H * 0.3,  r: 280, hue: 200, dx: 0.12, dy: 0.08 },
      { x: W * 0.75, y: H * 0.6,  r: 350, hue: 270, dx: -0.1, dy: 0.06 },
      { x: W * 0.5,  y: H * 0.85, r: 200, hue: 185, dx: 0.07, dy: -0.09 },
      { x: W * 0.88, y: H * 0.15, r: 220, hue: 300, dx: -0.08, dy: 0.1 },
    ];

    /* ── LAYER 3: Code rain ── */
    const snippets = [
      '<html>','const x=','npm run','async ()','flexbox','grid',
      'import','export','useState','useEffect','border:','opacity',
      '100vh','z-index','rgba()','@keyframes','translate3d','fetch()',
    ];
    const cols  = Math.floor(W / 80);
    const drops = Array.from({ length: cols }, (_, i) => ({
      x: i * 80 + 10,
      y: Math.random() * -H,
      speed: 0.6 + Math.random() * 1.2,
      text: snippets[Math.floor(Math.random() * snippets.length)],
      alpha: 0.04 + Math.random() * 0.1
    }));

    /* ── LAYER 4: Floating geometric nodes ── */
    const nodes = Array.from({ length: 40 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: 1.5 + Math.random() * 2.5,
      hue: 180 + Math.random() * 100
    }));

    /* ── LAYER 5: Shooting stars ── */
    const shoots = [];
    const spawnShoot = () => {
      if (shoots.length < 4) {
        shoots.push({
          x: Math.random() * W * 0.7,
          y: Math.random() * H * 0.4,
          len: 120 + Math.random() * 100,
          speed: 8 + Math.random() * 6,
          alpha: 1,
          angle: Math.PI / 6
        });
      }
    };
    const shootTimer = setInterval(spawnShoot, 3000);

    let tick = 0;

    const draw = () => {
      tick++;
      ctx.clearRect(0, 0, W, H);

      /* Background gradient */
      const bg = ctx.createLinearGradient(0, 0, W, H);
      bg.addColorStop(0,   '#020b1a');
      bg.addColorStop(0.5, '#040d1f');
      bg.addColorStop(1,   '#020b1a');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      /* Mouse parallax factors */
      const mx = (mouseRef.current.x / W - 0.5);
      const my = (mouseRef.current.y / H - 0.5);

      /* LAYER 1 – nebula orbs */
      orbs.forEach((o, i) => {
        o.x += o.dx + mx * (i + 1) * 0.2;
        o.y += o.dy + my * (i + 1) * 0.2;
        if (o.x < -o.r) o.x = W + o.r;
        if (o.x > W + o.r) o.x = -o.r;
        if (o.y < -o.r) o.y = H + o.r;
        if (o.y > H + o.r) o.y = -o.r;
        const g = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r);
        g.addColorStop(0, `hsla(${o.hue},100%,60%,0.09)`);
        g.addColorStop(0.5, `hsla(${o.hue},100%,50%,0.04)`);
        g.addColorStop(1, 'transparent');
        ctx.beginPath();
        ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
      });

      /* LAYER 2 – stars with parallax depth */
      stars.forEach(s => {
        s.twinkle += s.speed;
        const parallax = (s.layer + 1) * 0.008;
        const px = s.x + mx * W * parallax;
        const py = s.y + my * H * parallax;
        const alpha = 0.3 + 0.7 * Math.abs(Math.sin(s.twinkle));
        ctx.beginPath();
        ctx.arc(px, py, s.r, 0, Math.PI * 2);
        const brightness = 180 + s.layer * 25;
        ctx.fillStyle = `rgba(${brightness},${brightness + 30},255,${alpha})`;
        ctx.fill();
      });

      /* LAYER 3 – node network */
      nodes.forEach(n => {
        n.x += n.vx + mx * 0.5;
        n.y += n.vy + my * 0.5;
        if (n.x < 0) n.x = W; if (n.x > W) n.x = 0;
        if (n.y < 0) n.y = H; if (n.y > H) n.y = 0;
      });
      nodes.forEach((n, i) => {
        nodes.slice(i + 1, i + 5).forEach(m => {
          const dx = n.x - m.x, dy = n.y - m.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 120) {
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(m.x, m.y);
            ctx.strokeStyle = `rgba(0,212,255,${0.06 * (1 - d / 120)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        });
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${n.hue},100%,70%,0.25)`;
        ctx.fill();
      });

      /* LAYER 4 – code rain */
      ctx.font = '10px "Space Grotesk", monospace';
      drops.forEach(d => {
        d.y += d.speed;
        if (d.y > H + 40) {
          d.y = Math.random() * -120;
          d.text = snippets[Math.floor(Math.random() * snippets.length)];
        }
        const g2 = ctx.createLinearGradient(0, d.y - 30, 0, d.y + 30);
        g2.addColorStop(0, `rgba(0,212,255,0)`);
        g2.addColorStop(0.5, `rgba(0,212,255,${d.alpha})`);
        g2.addColorStop(1, `rgba(0,212,255,0)`);
        ctx.fillStyle = g2;
        ctx.fillText(d.text, d.x, d.y);
      });

      /* LAYER 5 – shooting stars */
      for (let i = shoots.length - 1; i >= 0; i--) {
        const sh = shoots[i];
        const g3 = ctx.createLinearGradient(
          sh.x, sh.y,
          sh.x - Math.cos(sh.angle) * sh.len,
          sh.y - Math.sin(sh.angle) * sh.len
        );
        g3.addColorStop(0, `rgba(255,255,255,${sh.alpha})`);
        g3.addColorStop(0.3, `rgba(0,212,255,${sh.alpha * 0.7})`);
        g3.addColorStop(1, 'transparent');
        ctx.beginPath();
        ctx.moveTo(sh.x, sh.y);
        ctx.lineTo(
          sh.x - Math.cos(sh.angle) * sh.len,
          sh.y - Math.sin(sh.angle) * sh.len
        );
        ctx.strokeStyle = g3;
        ctx.lineWidth = 1.5;
        ctx.shadowColor = '#00d4ff';
        ctx.shadowBlur = 6;
        ctx.stroke();
        ctx.shadowBlur = 0;
        sh.x += sh.speed; sh.y += sh.speed * 0.5;
        sh.alpha -= 0.015;
        if (sh.alpha <= 0) shoots.splice(i, 1);
      }

      animRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animRef.current);
      clearInterval(shootTimer);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouse);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-canvas" aria-hidden="true" />;
}

/* ─── Parallax floating orbs (DOM-based, for CSS blur layers) ─── */
function ParallaxOrbs() {
  const orbsRef = useRef([]);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const speeds = [0.08, 0.14, 0.06, 0.18, 0.1];
      orbsRef.current.forEach((el, i) => {
        if (el) el.style.transform = `translateY(${y * speeds[i]}px)`;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const config = [
    { cls: 'hero-orb hero-orb-1' },
    { cls: 'hero-orb hero-orb-2' },
    { cls: 'hero-orb hero-orb-3' },
    { cls: 'hero-orb hero-orb-4' },
    { cls: 'hero-orb hero-orb-5' },
  ];

  return (
    <>
      {config.map((o, i) => (
        <div key={i} ref={el => orbsRef.current[i] = el} className={o.cls} aria-hidden="true" />
      ))}
    </>
  );
}

export default function Hero() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
  };

  return (
    <section id="home" className="hero-v2">

      {/* Canvas */}
      <HeroCanvas />

      {/* DOM parallax orbs */}
      <ParallaxOrbs />

      {/* Vignette */}
      <div className="hero-vignette" aria-hidden="true" />

      {/* Content */}
      <div className="hero-v2-content">

        {/* Logo */}
        <div className="hero-logo-wrap" data-aos="fade-down" data-aos-duration="800">
          <Image src="/HM.png" alt="HMW WebWorks" width={90} height={55} priority />
        </div>

        {/* Eyebrow */}
        <div className="hero-eyebrow" data-aos="fade-up" data-aos-delay="100">
          <span className="hero-eyebrow-dot" />
          Premium Web Design & Development Agency
        </div>

        {/* Headline */}
        <h1 className="hero-v2-title" data-aos="fade-up" data-aos-delay="200">
          We Build Websites That<br />
          <span className="hero-v2-gradient">Grow Your Business</span>
        </h1>

        {/* Subtext */}
        <p className="hero-v2-sub" data-aos="fade-up" data-aos-delay="350">
          Design · Development · Branding · SEO · Digital Marketing<br />
          <span>From concept to launch — we handle it all.</span>
        </p>

        {/* Buttons */}
        <div className="hero-v2-btns" data-aos="fade-up" data-aos-delay="480">
          <button className="hero-btn-primary" onClick={() => scrollTo('contact')}>
            <i className="fas fa-rocket" /> Get a Free Quote
            <span className="hero-btn-shine" />
          </button>
          <button className="hero-btn-secondary" onClick={() => scrollTo('portfolio')}>
            <i className="fas fa-eye" /> View Our Work
          </button>
        </div>

        {/* Trust row */}
        <div className="hero-trust-row" data-aos="fade-up" data-aos-delay="600">
          {[
            { val: '100+', label: 'Projects' },
            { val: '50+',  label: 'Clients' },
            { val: '99%',  label: 'Satisfaction' },
            { val: '4.9★', label: 'Rating' },
          ].map((t, i) => (
            <div key={i} className="hero-trust-item">
              <strong>{t.val}</strong>
              <span>{t.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll-indicator" onClick={() => scrollTo('services')}>
        <div className="hero-scroll-mouse">
          <div className="hero-scroll-wheel" />
        </div>
        <span>Scroll</span>
      </div>

    </section>
  );
}
