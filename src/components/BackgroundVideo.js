'use client';

import { useEffect, useRef, useState } from 'react';

export default function BackgroundVideo({ hueRotate = '0deg', opacity = 0.12 }) {
  const canvasRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Disable on small devices for optimized battery performance
    if (window.innerWidth < 480) return;
    setIsVisible(true);

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;

    const resizeCanvas = () => {
      if (canvas && canvas.parentElement) {
        canvas.width = canvas.parentElement.offsetWidth;
        canvas.height = canvas.parentElement.offsetHeight;
      }
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Code snippets representing website design, development, and state management
    const codePhrases = [
      '<html>', '<body>', 'const app = next();', 'import React', 'redux-store',
      'flexbox', 'grid-layout', 'dispatch(setTheme)', 'npm run dev', 'HMW WebWorks',
      'const [theme, setTheme]', '<div className="hero">', 'url("/public")', 'API.fetch()',
      'styles.css', 'jsconfig.json', 'store.subscribe()', 'export default', 'await async',
      'console.log()', 'border-radius', 'mix-blend-mode', 'translate3d()', 'useSelector',
      'window.scrollTo()', 'document.getElementById', 'AOS.init()', '<ProviderStore>',
      'box-sizing', 'backdrop-filter', 'pointer-events', 'localStorage.getItem',
      'const uiSlice = createSlice', 'createRoot(container)', 'const store = configureStore',
      'margin: 0 auto;', 'display: flex;', 'justify-content: center;', 'align-items: center;',
      'transition: all 0.3s ease;', 'box-shadow: var(--shadow);'
    ];

    const columns = Math.floor(canvas.width / 100);
    const drops = [];

    // Initialize drops
    for (let i = 0; i < columns; i++) {
      drops[i] = {
        x: i * 100 + 10,
        y: Math.random() * -canvas.height,
        speed: 0.6 + Math.random() * 1.2,
        phrase: codePhrases[Math.floor(Math.random() * codePhrases.length)],
        opacity: 0.15 + Math.random() * 0.7
      };
    }

    const draw = () => {
      // Clear with alpha to create visual trail matching background
      ctx.fillStyle = 'rgba(15, 23, 42, 0.08)'; 
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = '500 11px "Space Grotesk", Courier, monospace';

      for (let i = 0; i < columns; i++) {
        const drop = drops[i];

        // Draw character code streams with fading opacity
        const gradient = ctx.createLinearGradient(0, drop.y, 0, drop.y + 120);
        gradient.addColorStop(0, `rgba(0, 212, 255, ${drop.opacity})`); // electric cyan head
        gradient.addColorStop(0.5, `rgba(59, 130, 246, ${drop.opacity * 0.5})`); // secondary blue
        gradient.addColorStop(1, 'rgba(30, 64, 175, 0.05)'); // dark tail

        ctx.fillStyle = gradient;
        ctx.fillText(drop.phrase, drop.x, drop.y);

        // Move drop downward
        drop.y += drop.speed;

        // Reset drop to the top when it leaves canvas view
        if (drop.y > canvas.height) {
          drop.y = Math.random() * -150;
          drop.speed = 0.6 + Math.random() * 1.2;
          drop.phrase = codePhrases[Math.floor(Math.random() * codePhrases.length)];
          drop.opacity = 0.15 + Math.random() * 0.7;
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
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        zIndex: 0,
        pointerEvents: 'none'
      }}
    >
      {isVisible ? (
        <canvas
          ref={canvasRef}
          style={{
            width: '100%',
            height: '100%',
            filter: `hue-rotate(${hueRotate}) brightness(0.8) contrast(1.2)`,
            mixBlendMode: 'screen',
            opacity: opacity
          }}
        />
      ) : (
        /* Static fallback for mobile/small screens */
        <div
          style={{
            width: '100%',
            height: '100%',
            background: 'radial-gradient(circle at center, rgba(30, 41, 59, 0.1) 0%, rgba(15, 23, 42, 0.5) 100%)',
            opacity: opacity
          }}
        />
      )}
      {/* Radial overlay to dim corners and highlight content readability */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'radial-gradient(circle at center, transparent 35%, var(--bg-primary) 100%)',
          pointerEvents: 'none',
          opacity: 0.9
        }}
      />
    </div>
  );
}
