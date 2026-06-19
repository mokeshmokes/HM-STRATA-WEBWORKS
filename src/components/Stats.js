'use client';

import { useEffect, useRef, useState } from 'react';

function StatCard({ icon, target, label }) {
  const [count, setCount] = useState(0);
  const cardRef = useRef(null);
  const animatedRef = useRef(false);

  useEffect(() => {
    const observerOptions = { threshold: 0.5 };
    const currentCard = cardRef.current;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !animatedRef.current) {
          animatedRef.current = true;
          let start = 0;
          const end = parseInt(target);
          const duration = 1500; // 1.5 seconds duration
          const fps = 60;
          const increment = end / (duration / (1000 / fps));

          const animate = () => {
            start += increment;
            if (start < end) {
              setCount(Math.floor(start));
              requestAnimationFrame(animate);
            } else {
              setCount(end);
            }
          };
          animate();
          observer.unobserve(currentCard);
        }
      });
    }, observerOptions);

    if (currentCard) {
      observer.observe(currentCard);
    }

    return () => {
      if (currentCard) {
        observer.unobserve(currentCard);
      }
    };
  }, [target]);

  const displayCount = count === 99 ? `${count}%` : `${count}+`;

  return (
    <div className="stat-card" ref={cardRef}>
      <div className="stat-icon">
        <i className={`fas ${icon}`}></i>
      </div>
      <div className="stat-number">{displayCount}</div>
      <p>{label}</p>
    </div>
  );
}

export default function Stats() {
  const statsData = [
    { icon: 'fa-project-diagram', target: 100, label: 'Projects Completed' },
    { icon: 'fa-smile', target: 50, label: 'Happy Clients' },
    { icon: 'fa-star', target: 99, label: 'Client Satisfaction' },
    { icon: 'fa-rocket', target: 24, label: 'Hour Delivery' }
  ];

  return (
    <section className="why-choose-us">
      <div className="container">
        <div className="section-header" data-aos="fade-up">
          <h2>Why Choose HMW WebWorks</h2>
          <p>Proven results that speak for themselves</p>
        </div>
        <div className="stats-grid">
          {statsData.map((stat, index) => (
            <div key={index} data-aos="fade-up" data-aos-delay={(index + 1) * 100}>
              <StatCard icon={stat.icon} target={stat.target} label={stat.label} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
