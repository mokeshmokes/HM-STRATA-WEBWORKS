'use client';

import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { nextSlide, prevSlide, setSlide } from '@/redux/slices/testimonialsSlice';
import BackgroundVideo from './BackgroundVideo';

const testimonials = [
  {
    stars: 5,
    text: '"HMW WebWorks transformed our online presence completely. Website traffic increased by 250% and conversions doubled within just 3 months. Absolutely phenomenal team!"',
    author: 'John Smith',
    role: 'CEO, TechFlow Solutions',
    avatar: 'https://i.pravatar.cc/60?img=1'
  },
  {
    stars: 5,
    text: '"The team delivered exactly what we envisioned. Professional, fast, and the design far exceeded our expectations. I wouldn\'t hesitate to recommend them to anyone."',
    author: 'Maria Johnson',
    role: 'Founder, Creative Studio',
    avatar: 'https://i.pravatar.cc/60?img=5'
  },
  {
    stars: 5,
    text: '"Outstanding work on our e-commerce platform. Sales increased by 180% and customer engagement improved significantly. Worth every penny!"',
    author: 'Robert Brown',
    role: 'Owner, Fashion Boutique',
    avatar: 'https://i.pravatar.cc/60?img=3'
  },
  {
    stars: 5,
    text: '"Working with HMW WebWorks was a game changer for our restaurant. Our online bookings tripled after the new website launch. Simply brilliant work!"',
    author: 'Priya Nair',
    role: 'Director, Ember & Oak',
    avatar: 'https://i.pravatar.cc/60?img=9'
  },
  {
    stars: 5,
    text: '"They built our property listing platform from scratch with map integration and virtual tours. Enquiries went up by 112% in the first month alone."',
    author: 'Ahmed Al-Rashid',
    role: 'MD, Horizon Real Estate',
    avatar: 'https://i.pravatar.cc/60?img=12'
  },
  {
    stars: 5,
    text: '"The branding package they created for our gym chain was incredible. Brand recognition shot up and memberships grew by over 230%. Highly professional!"',
    author: 'Lisa Chen',
    role: 'Co-founder, Vertex Fitness',
    avatar: 'https://i.pravatar.cc/60?img=16'
  },
  {
    stars: 5,
    text: '"From concept to launch in under 4 weeks. The SaaS dashboard they built is clean, fast, and our users love it. Lead generation went up 95% instantly."',
    author: 'Daniel Murphy',
    role: 'CTO, NovaPulse',
    avatar: 'https://i.pravatar.cc/60?img=7'
  },
  {
    stars: 5,
    text: '"Our organic grocery subscription store saw a 145% jump in sign-ups within two months of the new website going live. The UX is absolutely flawless."',
    author: 'Sarah Williams',
    role: 'CEO, GreenLeaf Organics',
    avatar: 'https://i.pravatar.cc/60?img=25'
  },
  {
    stars: 5,
    text: '"The multi-vendor marketplace they built handles thousands of products flawlessly. Revenue grew 280% and checkout abandonment dropped dramatically."',
    author: 'Kevin Osei',
    role: 'Founder, TechGear Pro',
    avatar: 'https://i.pravatar.cc/60?img=11'
  },
  {
    stars: 5,
    text: '"Best investment we made for our architecture firm. The 3D project viewer and portfolio site brought in high-value clients we never had access to before."',
    author: 'Isabelle Fontaine',
    role: 'Principal, ArchVision Studio',
    avatar: 'https://i.pravatar.cc/60?img=20'
  }
];

export default function Testimonials() {
  const dispatch = useDispatch();
  const currentSlide = useSelector((state) => state.testimonials.currentSlide);
  const timerRef = useRef(null);

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => dispatch(nextSlide()), 5000);
  };

  useEffect(() => {
    resetTimer();
    return () => clearInterval(timerRef.current);
  }, [dispatch]);

  const handlePrev = () => { dispatch(prevSlide()); resetTimer(); };
  const handleNext = () => { dispatch(nextSlide()); resetTimer(); };
  const handleDot  = (i) => { dispatch(setSlide(i)); resetTimer(); };

  const total = testimonials.length;

  return (
    <section className="testimonials" style={{ position: 'relative', overflow: 'hidden' }}>
      <BackgroundVideo hueRotate="15deg" opacity={0.13} />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>

        <div className="section-header" data-aos="fade-up">
          <h2>What Our Clients Say</h2>
          <p>Real feedback from real clients</p>
        </div>

        <div className="tslider-wrap" data-aos="fade-up">

          {/* Left arrow */}
          <button className="tslider-arrow tslider-arrow-left" onClick={handlePrev} aria-label="Previous">
            <i className="fas fa-chevron-left" />
          </button>

          {/* Cards track */}
          <div className="tslider-track">
            {testimonials.map((item, index) => (
              <div
                key={index}
                className={`testimonial-card ${currentSlide === index ? 'active' : ''}`}
              >
                <div className="stars">
                  {Array.from({ length: item.stars }).map((_, si) => (
                    <i key={si} className="fas fa-star" />
                  ))}
                </div>
                <p>{item.text}</p>
                <div className="testimonial-author">
                  <img src={item.avatar} alt={item.author} />
                  <div>
                    <h4>{item.author}</h4>
                    <span>{item.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right arrow */}
          <button className="tslider-arrow tslider-arrow-right" onClick={handleNext} aria-label="Next">
            <i className="fas fa-chevron-right" />
          </button>
        </div>

        {/* Counter + dots */}
        <div className="tslider-footer" data-aos="fade-up">
          <span className="tslider-counter">{currentSlide + 1} / {total}</span>
          <div className="testimonial-dots">
            {testimonials.map((_, index) => (
              <span
                key={index}
                className={`dot ${currentSlide === index ? 'active' : ''}`}
                onClick={() => handleDot(index)}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
