'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

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
