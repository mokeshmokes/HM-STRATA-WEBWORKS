'use client';

import { useEffect, useRef, useState } from 'react';

const steps = [
  {
    num: '01',
    icon: 'fa-search',
    title: 'Discovery & Strategy',
    desc: 'We deep-dive into your brand, audience, and competitors. Every great project starts with asking the right questions — and actually listening.',
    highlight: 'Goal alignment session, competitor audit, target user mapping',
    color: '#00d4ff'
  },
  {
    num: '02',
    icon: 'fa-pencil-ruler',
    title: 'Design & Wireframes',
    desc: 'From rough sketches to pixel-perfect mockups, we craft interfaces that feel intuitive and look stunning on every screen.',
    highlight: 'UI/UX wireframes, brand-aligned visual language, prototype walkthrough',
    color: '#a855f7'
  },
  {
    num: '03',
    icon: 'fa-code',
    title: 'Development',
    desc: 'Clean, performant code built on modern stacks. We build fast, accessible, and scalable — no shortcuts, no bloat.',
    highlight: 'Next.js / React, mobile-first, performance-optimised',
    color: '#f59e0b'
  },
  {
    num: '04',
    icon: 'fa-vials',
    title: 'Testing & QA',
    desc: 'Every pixel, every interaction, every edge case — tested across devices, browsers and real user scenarios before anything goes live.',
    highlight: 'Cross-browser, WCAG accessibility, speed & load testing',
    color: '#22c55e'
  },
  {
    num: '05',
    icon: 'fa-rocket',
    title: 'Launch',
    desc: 'We handle the full deployment — domain, SSL, CDN, monitoring. You get a smooth go-live with zero downtime and maximum impact.',
    highlight: 'Staged rollout, SEO setup, analytics & tracking configured',
    color: '#f43f5e'
  },
  {
    num: '06',
    icon: 'fa-headset',
    title: 'Support & Growth',
    desc: 'Launch is just the beginning. We monitor, maintain, iterate and help you grow — a true long-term partner, not a one-off vendor.',
    highlight: 'Monthly reports, ongoing updates, dedicated account manager',
    color: '#00d4ff'
  }
];

export default function Process() {
  const lineRef   = useRef(null);
  const sectionRef = useRef(null);
  const [activeStep, setActiveStep] = useState(-1);
  const stepRefs  = useRef([]);

  /* Animate the vertical line fill on scroll */
  useEffect(() => {
    const onScroll = () => {
      const section = sectionRef.current;
      if (!section) return;
      const { top, height } = section.getBoundingClientRect();
      const winH = window.innerHeight;
      const progress = Math.min(Math.max((-top) / (height - winH), 0), 1);
      if (lineRef.current) lineRef.current.style.height = `${progress * 100}%`;

      // which step is active
      stepRefs.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        if (r.top < winH * 0.65) setActiveStep(i);
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section className="process-v2" ref={sectionRef}>
      {/* Ambient blobs */}
      <div className="pv2-blob pv2-blob-1" aria-hidden="true" />
      <div className="pv2-blob pv2-blob-2" aria-hidden="true" />
      <div className="pv2-blob pv2-blob-3" aria-hidden="true" />

      {/* Grid dots overlay */}
      <div className="pv2-grid" aria-hidden="true" />

      <div className="container pv2-container">

        {/* Header */}
        <div className="pv2-header" data-aos="fade-up">
          <span className="pv2-eyebrow">HOW WE WORK</span>
          <h2>Our <span className="pv2-gradient-text">Process</span></h2>
          <p>Six focused steps that turn your idea into a high-performing digital product — on time, every time.</p>
        </div>

        {/* Timeline */}
        <div className="pv2-timeline">

          {/* Vertical line track */}
          <div className="pv2-line-track" aria-hidden="true">
            <div className="pv2-line-fill" ref={lineRef} />
          </div>

          {steps.map((step, i) => (
            <div
              key={i}
              ref={el => stepRefs.current[i] = el}
              className={`pv2-step ${i % 2 === 0 ? 'pv2-left' : 'pv2-right'} ${activeStep >= i ? 'pv2-step-active' : ''}`}
              data-aos={i % 2 === 0 ? 'fade-right' : 'fade-left'}
              data-aos-delay={i * 80}
              style={{ '--step-color': step.color }}
            >
              {/* Connector dot */}
              <div className="pv2-dot" aria-hidden="true">
                <div className="pv2-dot-inner" />
              </div>

              {/* Card */}
              <div className="pv2-card">
                <div className="pv2-card-top">
                  <div className="pv2-icon-wrap">
                    <i className={`fas ${step.icon}`} />
                  </div>
                  <div>
                    <span className="pv2-step-num">Step {step.num}</span>
                    <h3 className="pv2-step-title">{step.title}</h3>
                  </div>
                </div>
                <p className="pv2-step-desc">{step.desc}</p>
                <div className="pv2-highlight">
                  <i className="fas fa-check-circle" />
                  <span>{step.highlight}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA strip */}
        <div className="pv2-cta" data-aos="zoom-in" data-aos-delay="200">
          <div className="pv2-cta-inner">
            <div className="pv2-cta-text">
              <h3>Ready to start your project?</h3>
              <p>Most projects go live within 3–4 weeks from our first call.</p>
            </div>
            <a href="#contact" className="pv2-cta-btn">
              <i className="fas fa-arrow-right" /> Let's Talk
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
