'use client';

import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Position coordinates
  const mouseRef = useRef({ x: 0, y: 0 });
  const ringPosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Check if on touch device / mobile
    const isMobile = window.matchMedia('(max-width: 991px)').matches;
    if (isMobile) return;

    setIsVisible(true);

    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    const handleMouseOver = (e) => {
      const target = e.target.closest('a, button, .service-card, .portfolio-item, .filter-btn, .pricing-btn, .social-links a, .upload-action-btn, .file-select-trigger');
      if (target) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    // Smooth spring animation loop for the outer ring
    let animationFrameId;
    const updateRingPosition = () => {
      const targetX = mouseRef.current.x;
      const targetY = mouseRef.current.y;

      const currentX = ringPosRef.current.x;
      const currentY = ringPosRef.current.y;

      // Snappier ease: ring moves 30% closer to target each frame
      const nextX = currentX + (targetX - currentX) * 0.3;
      const nextY = currentY + (targetY - currentY) * 0.3;

      ringPosRef.current.x = nextX;
      ringPosRef.current.y = nextY;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${nextX}px, ${nextY}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(updateRingPosition);
    };

    animationFrameId = requestAnimationFrame(updateRingPosition);

    // Hide custom cursor when mouse leaves document window
    const handleMouseLeave = () => {
      if (dotRef.current) dotRef.current.style.opacity = '0';
      if (ringRef.current) ringRef.current.style.opacity = '0';
    };

    const handleMouseEnter = () => {
      if (dotRef.current) dotRef.current.style.opacity = '1';
      if (ringRef.current) ringRef.current.style.opacity = '1';
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Inner solid dot */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: -4,
          left: -4,
          width: '8px',
          height: '8px',
          background: 'var(--electric-blue)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 10000,
          mixBlendMode: 'difference',
          opacity: isHovered ? 0.4 : 1,
          scale: isHovered ? '0.5' : '1',
          transition: 'opacity 0.2s ease, scale 0.2s ease',
          willChange: 'transform'
        }}
      />
      {/* Outer trailing ring */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: -15,
          left: -15,
          width: '30px',
          height: '30px',
          border: isHovered ? '2px solid var(--electric-blue)' : '1px dashed rgba(0, 212, 255, 0.6)',
          background: isHovered ? 'rgba(0, 212, 255, 0.1)' : 'transparent',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          mixBlendMode: 'difference',
          transformOrigin: 'center center',
          transform: 'scale(1)',
          scale: isHovered ? '1.5' : '1',
          transition: 'scale 0.25s cubic-bezier(0.25, 1, 0.5, 1), border-color 0.25s ease, background-color 0.25s ease, border-style 0.25s ease',
          willChange: 'transform, scale'
        }}
      />
    </>
  );
}
