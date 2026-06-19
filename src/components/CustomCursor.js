'use client';

import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 991px)').matches;
    if (isMobile) return;

    const el = cursorRef.current;
    if (!el) return;

    // Show the cursor element
    el.style.display = 'block';

    // Hide the native OS cursor
    document.documentElement.style.cursor = 'none';

    const handleMouseMove = (e) => {
      el.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
    };

    const handleMouseOver = (e) => {
      const target = e.target.closest(
        'a, button, .service-card, .portfolio-item, .filter-btn, .pricing-btn, .social-links a, .upload-action-btn, .file-select-trigger'
      );
      if (target) {
        el.classList.add('is-hovered');
      } else {
        el.classList.remove('is-hovered');
      }
    };

    const handleMouseLeave = () => { el.style.opacity = '0'; };
    const handleMouseEnter = () => { el.style.opacity = '1'; };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.documentElement.style.cursor = '';
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="custom-cursor-img"
      aria-hidden="true"
      style={{ display: 'none' }}
    >
      <img
        src="/cursor-hand.png"
        alt=""
        className="cursor-img cursor-img-hand"
        draggable={false}
      />
      <img
        src="/cursor-crewmate.png"
        alt=""
        className="cursor-img cursor-img-crewmate"
        draggable={false}
      />
    </div>
  );
}
