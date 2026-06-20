'use client';

import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTestimonials, nextSlide, prevSlide, setCurrentSlide } from '@/redux/slices/testimonialsSlice';
import BackgroundVideo from './BackgroundVideo';

export default function Testimonials() {
  const dispatch     = useDispatch();
  const { items, currentSlide, loading, error } = useSelector((state) => state.testimonials);
  const timerRef = useRef(null);

  // Fetch live testimonials from API on mount
  useEffect(() => {
    dispatch(fetchTestimonials());
  }, [dispatch]);

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (items.length > 0) {
      timerRef.current = setInterval(() => dispatch(nextSlide()), 5000);
    }
  };

  useEffect(() => {
    resetTimer();
    return () => clearInterval(timerRef.current);
  }, [dispatch, items.length]);

  const handlePrev = () => { dispatch(prevSlide());             resetTimer(); };
  const handleNext = () => { dispatch(nextSlide());             resetTimer(); };
  const handleDot  = (i) => { dispatch(setCurrentSlide(i));    resetTimer(); };

  const total = items.length;

  return (
    <section className="testimonials" style={{ position: 'relative', overflow: 'hidden' }}>
      <BackgroundVideo hueRotate="15deg" opacity={0.13} />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>

        <div className="section-header" data-aos="fade-up">
          <h2>What Our Clients Say</h2>
          <p>Real feedback from real clients</p>
        </div>

        {/* Loading state */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'rgba(255,255,255,0.4)' }}>
            Loading testimonials…
          </div>
        )}

        {/* Error state */}
        {error && !loading && (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'rgba(255,100,100,0.7)' }}>
            Could not load testimonials.
          </div>
        )}

        {/* Slider — only shown when data is loaded */}
        {!loading && !error && total > 0 && (
          <>
            <div className="tslider-wrap" data-aos="fade-up">

              {/* Left arrow */}
              <button className="tslider-arrow tslider-arrow-left" onClick={handlePrev} aria-label="Previous">
                <i className="fas fa-chevron-left" />
              </button>

              {/* Cards track */}
              <div className="tslider-track">
                {items.map((item, index) => (
                  <div
                    key={item._id}
                    className={`testimonial-card ${currentSlide === index ? 'active' : ''}`}
                  >
                    <div className="stars">
                      {Array.from({ length: item.stars }).map((_, si) => (
                        <i key={si} className="fas fa-star" />
                      ))}
                    </div>
                    <p>"{item.text}"</p>
                    <div className="testimonial-author">
                      <img
                        src={item.avatar || `https://i.pravatar.cc/60?u=${item._id}`}
                        alt={item.author}
                      />
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
                {items.map((_, index) => (
                  <span
                    key={index}
                    className={`dot ${currentSlide === index ? 'active' : ''}`}
                    onClick={() => handleDot(index)}
                  />
                ))}
              </div>
            </div>
          </>
        )}

        {/* Empty state after load */}
        {!loading && !error && total === 0 && (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'rgba(255,255,255,0.3)' }}>
            No testimonials available yet.
          </div>
        )}

      </div>
    </section>
  );
}
