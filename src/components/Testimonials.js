'use client';

import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTestimonials, setCurrentSlide, nextSlide } from '@/redux/slices/testimonialsSlice';
import BackgroundVideo from './BackgroundVideo';

// Fallback clients shown when API has fewer than 3 entries
const FALLBACK = [
  { _id: 'f1', author: 'James Carter',  role: 'CEO, NovaTech',        stars: 5, avatar: 'https://i.pravatar.cc/600?img=11', text: 'HMW WebWorks delivered a stunning site that tripled our inbound leads within two months.' },
  { _id: 'f2', author: 'Priya Mehta',   role: 'Brand Director',       stars: 5, avatar: 'https://i.pravatar.cc/600?img=47', text: 'The team understood our brand identity immediately. The result was beyond anything we imagined.' },
  { _id: 'f3', author: 'Luca Rossi',    role: 'Founder, Elara Studio', stars: 5, avatar: 'https://i.pravatar.cc/600?img=52', text: 'Professional, fast, and incredibly creative. Our site looks world-class now.' },
  { _id: 'f4', author: 'Sophie Lane',   role: 'Head of Marketing',    stars: 5, avatar: 'https://i.pravatar.cc/600?img=25', text: 'The best investment we made this year. Our bounce rate dropped significantly after the redesign.' },
  { _id: 'f5', author: 'Omar Hassan',   role: 'CTO, BuildFlow',       stars: 5, avatar: 'https://i.pravatar.cc/600?img=33', text: 'Clean code, responsive design, and delivered on time. Exactly what we needed.' },
];

export default function Testimonials() {
  const dispatch = useDispatch();
  const { items, currentSlide, loading, error } = useSelector((s) => s.testimonials);
  const timerRef = useRef(null);
  const [quoteVisible, setQuoteVisible] = useState(false);

  useEffect(() => { dispatch(fetchTestimonials()); }, [dispatch]);

  // Use live data if available, otherwise fallback
  const data = items.length >= 3 ? items : FALLBACK;
  const total = data.length;
  const active = Math.min(currentSlide, total - 1);

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      dispatch(nextSlide());
    }, 6000);
  };

  useEffect(() => {
    resetTimer();
    return () => clearInterval(timerRef.current);
  }, [active, total]);

  // Animate quote in when slide changes
  useEffect(() => {
    setQuoteVisible(false);
    const t = setTimeout(() => setQuoteVisible(true), 80);
    return () => clearTimeout(t);
  }, [active]);

  const handleSelect = (index) => {
    dispatch(setCurrentSlide(index));
    resetTimer();
  };

  // Build the ordered strip list: left strips | active | right strips
  // We show up to 2 strips on each side
  const leftIndices  = [];
  const rightIndices = [];

  for (let offset = 2; offset >= 1; offset--) {
    leftIndices.push((active - offset + total) % total);
  }
  for (let offset = 1; offset <= 2; offset++) {
    rightIndices.push((active + offset) % total);
  }

  const accentColors = ['#00d4ff', '#a855f7', '#f97316', '#10b981', '#ef4444'];
  const getAccent = (i) => accentColors[i % accentColors.length];

  if (loading) {
    return (
      <section className="testimonials" id="testimonials" style={{ position: 'relative', overflow: 'hidden' }}>
        <BackgroundVideo hueRotate="15deg" opacity={0.13} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="section-header" data-aos="fade-up">
            <h2>What Our Clients Say</h2>
            <p>Real feedback from real clients</p>
          </div>
          <div className="tfan-loading">Loading testimonials…</div>
        </div>
      </section>
    );
  }

  return (
    <section className="testimonials" id="testimonials" style={{ position: 'relative', overflow: 'hidden' }}>
      <BackgroundVideo hueRotate="15deg" opacity={0.13} />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>

        <div className="section-header" data-aos="fade-up">
          <h2>What Our Clients Say</h2>
          <p>Real feedback from real clients</p>
        </div>

        {/* ── Fan Carousel ── */}
        <div className="tfan-stage" data-aos="fade-up" data-aos-delay="100">

          {/* Left strips */}
          <div className="tfan-side tfan-side-left">
            {leftIndices.map((idx, pos) => {
              const item   = data[idx];
              const depth  = leftIndices.length - 1 - pos; // 0 = closest to center
              return (
                <button
                  key={item._id}
                  className={`tfan-strip tfan-strip-left depth-${depth}`}
                  onClick={() => handleSelect(idx)}
                  aria-label={`View testimonial from ${item.author}`}
                  style={{ '--strip-accent': getAccent(idx) }}
                >
                  <div
                    className="tfan-strip-img"
                    style={{ backgroundImage: `url(${item.avatar || `https://i.pravatar.cc/600?u=${item._id}`})` }}
                  />
                  <span className="tfan-strip-name">{item.author}</span>
                </button>
              );
            })}
          </div>

          {/* Active center card */}
          <div className="tfan-center" key={active}>
            <div
              className="tfan-card"
              style={{ '--card-accent': getAccent(active) }}
            >
              {/* Portrait */}
              <div
                className="tfan-card-img"
                style={{ backgroundImage: `url(${data[active].avatar || `https://i.pravatar.cc/600?u=${data[active]._id}`})` }}
              />

              {/* Play / quote toggle button */}
              <button
                className="tfan-play-btn"
                onClick={() => setQuoteVisible((v) => !v)}
                aria-label="Read testimonial"
              >
                <i className="fas fa-quote-right" />
              </button>

              {/* Name + role overlay at bottom */}
              <div className="tfan-card-label">
                <span className="tfan-card-name">{data[active].author}</span>
                <span className="tfan-card-role">{data[active].role}</span>
              </div>

              {/* Stars */}
              <div className="tfan-stars">
                {Array.from({ length: data[active].stars || 5 }).map((_, si) => (
                  <i key={si} className="fas fa-star" />
                ))}
              </div>
            </div>

            {/* Quote panel below card */}
            <div className={`tfan-quote ${quoteVisible ? 'visible' : ''}`}>
              <p>"{data[active].text}"</p>
            </div>

            {/* Dots */}
            <div className="tfan-dots">
              {data.map((_, i) => (
                <button
                  key={i}
                  className={`tfan-dot ${i === active ? 'active' : ''}`}
                  onClick={() => handleSelect(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  style={{ '--dot-accent': getAccent(i) }}
                />
              ))}
            </div>
          </div>

          {/* Right strips */}
          <div className="tfan-side tfan-side-right">
            {rightIndices.map((idx, pos) => {
              const item  = data[idx];
              const depth = pos; // 0 = closest to center
              return (
                <button
                  key={item._id}
                  className={`tfan-strip tfan-strip-right depth-${depth}`}
                  onClick={() => handleSelect(idx)}
                  aria-label={`View testimonial from ${item.author}`}
                  style={{ '--strip-accent': getAccent(idx) }}
                >
                  <div
                    className="tfan-strip-img"
                    style={{ backgroundImage: `url(${item.avatar || `https://i.pravatar.cc/600?u=${item._id}`})` }}
                  />
                  <span className="tfan-strip-name">{item.author}</span>
                </button>
              );
            })}
          </div>

        </div>
        {/* end tfan-stage */}

      </div>
    </section>
  );
}
