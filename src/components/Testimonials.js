'use client';

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { nextSlide, setSlide } from '@/redux/slices/testimonialsSlice';
import BackgroundVideo from './BackgroundVideo';

export default function Testimonials() {
  const dispatch = useDispatch();
  const currentSlide = useSelector((state) => state.testimonials.currentSlide);

  const testimonials = [
    {
      stars: 5,
      text: '"HMW WebWorks transformed our online presence completely. Our website traffic increased by 250% and conversions doubled within 3 months."',
      author: 'John Smith',
      role: 'CEO, TechFlow Solutions',
      avatar: 'https://via.placeholder.com/60x60/1e40af/ffffff?text=JS'
    },
    {
      stars: 5,
      text: '"The team delivered exactly what we needed. Professional, fast, and the design exceeded our expectations. Highly recommended!"',
      author: 'Maria Johnson',
      role: 'Founder, Creative Studio',
      avatar: 'https://via.placeholder.com/60x60/3730a3/ffffff?text=MJ'
    },
    {
      stars: 5,
      text: '"Outstanding work on our e-commerce platform. Sales increased by 180% and customer engagement improved significantly."',
      author: 'Robert Brown',
      role: 'Owner, Fashion Boutique',
      avatar: 'https://via.placeholder.com/60x60/1d4ed8/ffffff?text=RB'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      dispatch(nextSlide());
    }, 5000);
    return () => clearInterval(timer);
  }, [dispatch]);

  return (
    <section className="testimonials" style={{ position: 'relative', overflow: 'hidden' }}>
      <BackgroundVideo hueRotate="15deg" opacity={0.13} />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="section-header" data-aos="fade-up">
          <h2>What Our Clients Say</h2>
          <p>Real feedback from real clients</p>
        </div>
        <div className="testimonials-slider" data-aos="fade-up">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className={`testimonial-card ${currentSlide === index ? 'active' : ''}`}
              style={{
                display: currentSlide === index ? 'block' : 'none'
              }}
            >
              <div className="stars">
                {Array.from({ length: item.stars }).map((_, sIndex) => (
                  <i key={sIndex} className="fas fa-star"></i>
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
        <div className="testimonial-dots">
          {testimonials.map((_, index) => (
            <span
              key={index}
              className={`dot ${currentSlide === index ? 'active' : ''}`}
              onClick={() => dispatch(setSlide(index))}
            ></span>
          ))}
        </div>
      </div>
    </section>
  );
}
