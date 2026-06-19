'use client';

import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX - 5}px`;
        cursorRef.current.style.top = `${e.clientY - 5}px`;
      }
    };

    const handleMouseOver = (e) => {
      const target = e.target.closest('a, button, .service-card, .portfolio-item, .filter-btn, .pricing-btn');
      if (target) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="cursor"
      style={{
        position: 'fixed',
        width: '10px',
        height: '10px',
        background: 'var(--electric-blue)',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 9999,
        mixBlendMode: 'difference',
        transform: isHovered ? 'scale(3)' : 'scale(1)',
        opacity: isHovered ? 0.3 : 1,
        transition: 'transform 0.15s ease, opacity 0.15s ease',
      }}
    />
  );
}
