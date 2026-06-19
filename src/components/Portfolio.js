'use client';

import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveFilter } from '@/redux/slices/portfolioSlice';

const filters = [
  { label: 'All Projects', value: 'all',      icon: 'fa-th' },
  { label: 'Websites',     value: 'website',  icon: 'fa-globe' },
  { label: 'E-Commerce',   value: 'ecommerce',icon: 'fa-shopping-bag' },
  { label: 'Branding',     value: 'branding', icon: 'fa-paint-brush' },
];

const projects = [
  {
    id: 1, category: 'website',
    title: 'NovaPulse SaaS Platform',
    desc: 'Full-stack dashboard & marketing site for a B2B analytics startup',
    stats: ['+210% Traffic', '+95% Lead Gen'],
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    color: '#00d4ff', year: '2024'
  },
  {
    id: 2, category: 'ecommerce',
    title: 'Luxe Noir Fashion Store',
    desc: 'High-end Shopify store with custom theme & AR try-on feature',
    stats: ['+320% Sales', '+74% Return Users'],
    img: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&q=80',
    color: '#a855f7', year: '2024'
  },
  {
    id: 3, category: 'branding',
    title: 'Ember & Oak Restaurant',
    desc: 'Complete brand identity — logo, menu design, signage & website',
    stats: ['+180% Bookings', '+400% Social Reach'],
    img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
    color: '#f59e0b', year: '2024'
  },
  {
    id: 4, category: 'website',
    title: 'ArchVision Studio',
    desc: 'Luxury architecture firm portfolio with 3D project viewer',
    stats: ['+260% Enquiries', '+88% Session Time'],
    img: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&q=80',
    color: '#22c55e', year: '2023'
  },
  {
    id: 5, category: 'ecommerce',
    title: 'GreenLeaf Organics',
    desc: 'Subscription-based organic grocery store with smart reorder system',
    stats: ['+145% Subscriptions', '+60% Avg Order'],
    img: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80',
    color: '#34d399', year: '2024'
  },
  {
    id: 6, category: 'branding',
    title: 'Vertex Fitness',
    desc: 'Brand overhaul, app UI design & marketing collateral for gym chain',
    stats: ['+500% Brand Recall', '+230% Memberships'],
    img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80',
    color: '#f43f5e', year: '2023'
  },
  {
    id: 7, category: 'website',
    title: 'Horizon Real Estate',
    desc: 'Property listing platform with map integration & virtual tours',
    stats: ['+190% Listing Views', '+112% Inquiries'],
    img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80',
    color: '#818cf8', year: '2024'
  },
  {
    id: 8, category: 'ecommerce',
    title: 'TechGear Pro',
    desc: 'Multi-vendor electronics marketplace with real-time inventory sync',
    stats: ['+280% Revenue', '+91% Checkout Rate'],
    img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
    color: '#fb923c', year: '2023'
  },
];

/* Ambient canvas background */
function PortfolioBg() {
  const canvasRef = useRef(null);
  const animRef   = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W = canvas.width  = canvas.offsetWidth;
    let H = canvas.height = canvas.offsetHeight;

    const onResize = () => { W = canvas.width = canvas.offsetWidth; H = canvas.height = canvas.offsetHeight; };
    window.addEventListener('resize', onResize);

    let t = 0;
    /* aurora waves */
    const waves = [
      { y: 0.3, amp: 60, freq: 0.003, speed: 0.008, hue: 260, alpha: 0.07 },
      { y: 0.5, amp: 40, freq: 0.005, speed: 0.012, hue: 200, alpha: 0.06 },
      { y: 0.7, amp: 50, freq: 0.004, speed: 0.01,  hue: 290, alpha: 0.05 },
    ];

    /* orbs */
    const orbs = [
      { x: W*0.1, y: H*0.2, r: 300, hue: 260, dx: 0.15, dy: 0.1 },
      { x: W*0.9, y: H*0.8, r: 250, hue: 200, dx:-0.12, dy:-0.08 },
      { x: W*0.5, y: H*0.5, r: 200, hue: 280, dx: 0.1,  dy:-0.12 },
    ];

    /* sparks */
    const sparks = Array.from({ length: 50 }, () => ({
      x: Math.random()*W, y: Math.random()*H,
      r: 0.5+Math.random()*1.5,
      vy: -(0.2+Math.random()*0.4),
      alpha: 0.2+Math.random()*0.5, hue: 200+Math.random()*80
    }));

    const draw = () => {
      t++;
      ctx.clearRect(0,0,W,H);

      /* orbs */
      orbs.forEach(o => {
        o.x+=o.dx; o.y+=o.dy;
        if(o.x<-o.r||o.x>W+o.r) o.dx*=-1;
        if(o.y<-o.r||o.y>H+o.r) o.dy*=-1;
        const g = ctx.createRadialGradient(o.x,o.y,0,o.x,o.y,o.r);
        g.addColorStop(0,`hsla(${o.hue},100%,60%,0.09)`);
        g.addColorStop(1,'transparent');
        ctx.beginPath(); ctx.arc(o.x,o.y,o.r,0,Math.PI*2);
        ctx.fillStyle=g; ctx.fill();
      });

      /* aurora waves */
      waves.forEach(w => {
        ctx.beginPath();
        for(let x=0; x<=W; x+=4) {
          const y = H*w.y + Math.sin(x*w.freq + t*w.speed)*w.amp;
          x===0 ? ctx.moveTo(x,y) : ctx.lineTo(x,y);
        }
        ctx.strokeStyle=`hsla(${w.hue},100%,70%,${w.alpha})`;
        ctx.lineWidth=60;
        ctx.filter='blur(20px)';
        ctx.stroke();
        ctx.filter='none';
      });

      /* sparks */
      sparks.forEach(s => {
        s.y+=s.vy;
        if(s.y<-5){ s.y=H+5; s.x=Math.random()*W; }
        const flicker = 0.3+0.7*Math.abs(Math.sin(t*0.05+s.x));
        ctx.beginPath(); ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
        ctx.fillStyle=`hsla(${s.hue},100%,75%,${s.alpha*flicker})`;
        ctx.fill();
      });

      animRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animRef.current); window.removeEventListener('resize',onResize); };
  },[]);

  return <canvas ref={canvasRef} className="pf-canvas" aria-hidden="true" />;
}

/* Single project card */
function ProjectCard({ project, index }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const onMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 14;
    const y = ((e.clientY - rect.top)  / rect.height - 0.5) * -14;
    setTilt({ x, y });
  };
  const onMouseLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <div
      ref={cardRef}
      className="pf-card"
      style={{
        '--pf-color': project.color,
        '--pf-delay': `${index * 70}ms`,
        transform: `perspective(800px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg) translateZ(0)`,
        transition: tilt.x === 0 ? 'transform 0.6s ease' : 'transform 0.1s ease'
      }}
      data-aos="fade-up"
      data-aos-delay={index * 70}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {/* Image */}
      <div className="pf-img-wrap">
        <img src={project.img} alt={project.title} className="pf-img" loading="lazy" />
        <div className="pf-img-overlay" />

        {/* Hover reveal panel */}
        <div className="pf-hover-panel">
          <span className="pf-year">{project.year}</span>
          <p className="pf-hover-desc">{project.desc}</p>
          <div className="pf-stats-row">
            {project.stats.map((s, i) => (
              <span key={i} className="pf-stat-pill">{s}</span>
            ))}
          </div>
          <a href="#contact" className="pf-hover-btn">
            <i className="fas fa-arrow-right" /> Start Similar Project
          </a>
        </div>
      </div>

      {/* Card footer */}
      <div className="pf-footer">
        <div className="pf-footer-left">
          <span className="pf-cat-tag">{project.category}</span>
          <h3 className="pf-title">{project.title}</h3>
        </div>
        <div className="pf-footer-icon">
          <i className="fas fa-external-link-alt" />
        </div>
      </div>

      {/* Glow border */}
      <div className="pf-glow-border" aria-hidden="true" />
    </div>
  );
}

export default function Portfolio() {
  const dispatch     = useDispatch();
  const activeFilter = useSelector((state) => state.portfolio.activeFilter);
  const [animKey, setAnimKey] = useState(0);

  const handleFilter = (val) => {
    dispatch(setActiveFilter(val));
    setAnimKey(k => k + 1);
  };

  const filtered = projects.filter(p => activeFilter === 'all' || p.category === activeFilter);

  return (
    <section id="portfolio" className="pf-section">
      <PortfolioBg />
      <div className="pf-overlay" aria-hidden="true" />
      <div className="pf-edge pf-edge-top"    aria-hidden="true" />
      <div className="pf-edge pf-edge-bottom" aria-hidden="true" />

      <div className="container pf-container">

        {/* Header */}
        <div className="pf-header" data-aos="fade-up">
          <span className="pf-eyebrow">OUR WORK</span>
          <h2>Projects That <span className="pf-gradient-text">Speak for Themselves</span></h2>
          <p>Every project is a partnership. Here's what happens when great strategy meets great design.</p>
        </div>

        {/* Filter bar */}
        <div className="pf-filters" data-aos="fade-up" data-aos-delay="100">
          {filters.map(f => (
            <button
              key={f.value}
              className={`pf-filter-btn ${activeFilter === f.value ? 'active' : ''}`}
              onClick={() => handleFilter(f.value)}
            >
              <i className={`fas ${f.icon}`} />
              {f.label}
              {activeFilter === f.value && <span className="pf-filter-dot" />}
            </button>
          ))}
        </div>

        {/* Count line */}
        <div className="pf-count-line" data-aos="fade-up" data-aos-delay="120">
          Showing <strong>{filtered.length}</strong> project{filtered.length !== 1 ? 's' : ''}
          {activeFilter !== 'all' && <> in <em>{activeFilter}</em></>}
        </div>

        {/* Grid */}
        <div className="pf-grid" key={animKey}>
          {filtered.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
        </div>

        {/* Bottom CTA */}
        <div className="pf-bottom-cta" data-aos="zoom-in" data-aos-delay="200">
          <div className="pf-cta-inner">
            <div className="pf-cta-avatars">
              {[1,5,9,12,16].map(n => (
                <img key={n} src={`https://i.pravatar.cc/40?img=${n}`} alt="client" className="pf-cta-avatar" />
              ))}
            </div>
            <div className="pf-cta-text">
              <strong>50+ happy clients</strong> trust HMW WebWorks
              <span> — ready to be next?</span>
            </div>
            <a href="#contact" className="pf-cta-btn">
              <i className="fas fa-rocket" /> Start Your Project
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
