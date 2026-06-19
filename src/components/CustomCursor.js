'use client';

import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const posRef = useRef({ x: -200, y: -200 });

  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 991px)').matches;
    if (isMobile) return;

    // Hide the native OS cursor globally
    document.documentElement.style.cursor = 'none';
    setIsVisible(true);

    const handleMouseMove = (e) => {
      posRef.current.x = e.clientX;
      posRef.current.y = e.clientY;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    const handleMouseOver = (e) => {
      const target = e.target.closest(
        'a, button, .service-card, .portfolio-item, .filter-btn, .pricing-btn, .social-links a, .upload-action-btn, .file-select-trigger'
      );
      setIsHovered(!!target);
    };

    const handleMouseLeave = () => {
      if (cursorRef.current) cursorRef.current.style.opacity = '0';
    };

    const handleMouseEnter = () => {
      if (cursorRef.current) cursorRef.current.style.opacity = '1';
    };

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

  if (!isVisible) return null;

  return (
    <div
      ref={cursorRef}
      className={`custom-cursor-img ${isHovered ? 'is-hovered' : ''}`}
      aria-hidden="true"
    >
      {/* Normal state: pointing hand */}
      <img
        src="/cursor-hand.png"
        alt=""
        className="cursor-img cursor-img-hand"
        draggable={false}
      />
      {/* Hover state: Among Us crewmate */}
      <img
        src="/cursor-crewmate.png"
        alt=""
        className="cursor-img cursor-img-crewmate"
        draggable={false}
      />
    </div>
  );
}
