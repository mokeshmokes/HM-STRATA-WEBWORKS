'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

function CodeRainCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;

    // Resize handler
    const resizeCanvas = () => {
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Code snippets representing website development and creation
    const codeSnippets = [
      '<html>', '<body>', 'const app = next()', 'import React', 'redux-store',
      'flexbox', 'grid-layout', 'dispatch(setTheme)', 'npm run dev', 'HMW WebWorks',
      'const [theme, setTheme]', '<div className="hero">', 'url("/public")', 'API.fetch()',
      'styles.css', 'jsconfig.json', 'store.subscribe()', 'export default', 'await async',
      'console.log()', 'border-radius', 'mix-blend-mode', 'translate3d()', 'useSelector',
      'window.scrollTo()', 'document.getElementById', 'AOS.init()', '<ProviderStore>',
      'box-sizing', 'backdrop-filter', 'pointer-events', 'localStorage.getItem',
      'const uiSlice = createSlice', 'createRoot(container)'
    ];

    const columns = Math.floor(canvas.width / 95); // column width space
    const drops = [];

    // Initialize drops
    for (let i = 0; i < columns; i++) {
      drops[i] = {
        y: Math.random() * -canvas.height, // start randomly above screen
        speed: 1.0 + Math.random() * 2,
        snippet: codeSnippets[Math.floor(Math.random() * codeSnippets.length)],
        opacity: 0.15 + Math.random() * 0.8
      };
    }

    const draw = () => {
      // Clear with slight alpha to create trailing effect
      // Matches the layout bg dark colors
      ctx.fillStyle = 'rgba(15, 23, 42, 0.08)'; 
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = '500 11px "Space Grotesk", Courier, monospace';

      for (let i = 0; i < columns; i++) {
        const drop = drops[i];
        
        // Dynamic styling: Electric blue/cyan gradient fading to black/dark blue
        const gradient = ctx.createLinearGradient(0, drop.y, 0, drop.y + 120);
        gradient.addColorStop(0, `rgba(0, 212, 255, ${drop.opacity})`); // cyan glow head
        gradient.addColorStop(0.5, `rgba(59, 130, 246, ${drop.opacity * 0.6})`); // secondary blue
        gradient.addColorStop(1, 'rgba(30, 64, 175, 0.05)'); // dark blue tail

        ctx.fillStyle = gradient;
        
        // Position columns
        const x = i * 95 + 15;
        ctx.fillText(drop.snippet, x, drop.y);

        // Move drop
        drop.y += drop.speed;

        // Reset drop to the top when it leaves canvas
        if (drop.y > canvas.height) {
          drop.y = Math.random() * -180;
          drop.speed = 1.0 + Math.random() * 2;
          drop.snippet = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
          drop.opacity = 0.15 + Math.random() * 0.8;
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    animationFrameId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        pointerEvents: 'none',
        mixBlendMode: 'screen',
        opacity: 0.38
      }}
    />
  );
}

export default function Hero() {
  const shapesRef = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      shapesRef.current.forEach((element, index) => {
        if (element) {
          const speed = (index + 1) * 0.1;
          element.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollDown = (e) => {
    e.preventDefault();
    const targetElement = document.getElementById('services');
    if (targetElement) {
      const offsetTop = targetElement.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="home" className="hero">
      <div className="hero-background">
        <CodeRainCanvas />
        <div className="particles"></div>
        <div className="floating-shapes">
          <div ref={(el) => (shapesRef.current[0] = el)} className="shape shape-1"></div>
          <div ref={(el) => (shapesRef.current[1] = el)} className="shape shape-2"></div>
          <div ref={(el) => (shapesRef.current[2] = el)} className="shape shape-3"></div>
          <div ref={(el) => (shapesRef.current[3] = el)} className="shape shape-4"></div>
        </div>
      </div>
      <div className="hero-content">
        <div className="hero-logo" data-aos="fade-down">
          <Image src="/HM.png" alt="HMW WebWorks" width={100} height={60} priority />
        </div>
        <h1 className="hero-title" data-aos="fade-up" data-aos-delay="200">
          We Build Stunning Websites That <span className="gradient-text">Grow Businesses</span>
        </h1>
        <p className="hero-subtitle" data-aos="fade-up" data-aos-delay="400">
          Professional Website Design, Development, Branding & Digital Solutions
        </p>
        <div className="hero-buttons" data-aos="fade-up" data-aos-delay="600">
          <a
            href="#contact"
            className="btn btn-primary"
            onClick={(e) => {
              e.preventDefault();
              const target = document.getElementById('contact');
              if (target) {
                window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
              }
            }}
          >
            Get a Free Quote
          </a>
          <a
            href="#portfolio"
            className="btn btn-secondary"
            onClick={(e) => {
              e.preventDefault();
              const target = document.getElementById('portfolio');
              if (target) {
                window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
              }
            }}
          >
            View Our Work
          </a>
        </div>
      </div>
      <div className="scroll-indicator" onClick={handleScrollDown} style={{ cursor: 'pointer' }}>
        <div className="scroll-line"></div>
        <span>Scroll Down</span>
      </div>
    </section>
  );
}
