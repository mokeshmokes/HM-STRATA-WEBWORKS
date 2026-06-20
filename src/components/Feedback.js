'use client';

import { useState, useEffect, useRef } from 'react';
import api from '@/lib/api';

const STAR_LABELS = ['', 'Terrible', 'Poor', 'Average', 'Good', 'Amazing!'];

const TAGS = [
  'Website Design', 'Fast Delivery', 'Communication',
  'Value for Money', 'Support', 'Creativity',
  'Technical Skills', 'Professionalism'
];

export default function Feedback() {
  const [rating,    setRating]    = useState(0);
  const [hovered,   setHovered]   = useState(0);
  const [tags,      setTags]      = useState([]);
  const [message,   setMessage]   = useState('');
  const [name,      setName]      = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading,   setLoading]   = useState(false);
  const [error,     setError]     = useState('');
  const canvasRef = useRef(null);
  const animRef   = useRef(null);

  /* ── animated star-field canvas ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W = canvas.width  = canvas.offsetWidth;
    let H = canvas.height = canvas.offsetHeight;

    const resize = () => {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', resize);

    const stars = Array.from({ length: 160 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      r: Math.random() * 1.4 + 0.3,
      speed: Math.random() * 0.3 + 0.08,
      alpha: Math.random()
    }));

    const shoots = [];
    const spawnShoot = () => {
      shoots.push({
        x: Math.random() * W, y: Math.random() * H * 0.5,
        len: 100 + Math.random() * 120,
        speed: 6 + Math.random() * 6,
        alpha: 1, angle: Math.PI / 5
      });
    };
    const shootTimer = setInterval(spawnShoot, 2200);

    const orbs = Array.from({ length: 6 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      r: 60 + Math.random() * 100,
      dx: (Math.random() - 0.5) * 0.4,
      dy: (Math.random() - 0.5) * 0.4,
      hue: Math.random() * 60 + 190
    }));

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      orbs.forEach(o => {
        o.x += o.dx; o.y += o.dy;
        if (o.x < -o.r) o.x = W + o.r;
        if (o.x > W + o.r) o.x = -o.r;
        if (o.y < -o.r) o.y = H + o.r;
        if (o.y > H + o.r) o.y = -o.r;
        const g = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r);
        g.addColorStop(0, `hsla(${o.hue},100%,70%,0.10)`);
        g.addColorStop(1, 'transparent');
        ctx.beginPath(); ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
        ctx.fillStyle = g; ctx.fill();
      });
      stars.forEach(s => {
        s.y += s.speed;
        if (s.y > H) { s.y = 0; s.x = Math.random() * W; }
        s.alpha = 0.4 + 0.6 * Math.abs(Math.sin(Date.now() * 0.001 + s.x));
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200,230,255,${s.alpha})`; ctx.fill();
      });
      for (let i = shoots.length - 1; i >= 0; i--) {
        const sh = shoots[i];
        ctx.save();
        ctx.globalAlpha = sh.alpha;
        ctx.strokeStyle = 'rgba(0,212,255,0.9)';
        ctx.lineWidth = 1.5;
        ctx.shadowColor = '#00d4ff'; ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.moveTo(sh.x, sh.y);
        ctx.lineTo(sh.x - Math.cos(sh.angle) * sh.len, sh.y - Math.sin(sh.angle) * sh.len);
        ctx.stroke(); ctx.restore();
        sh.x += sh.speed; sh.y += sh.speed * 0.4; sh.alpha -= 0.018;
        if (sh.alpha <= 0) shoots.splice(i, 1);
      }
      animRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(animRef.current);
      clearInterval(shootTimer);
      window.removeEventListener('resize', resize);
    };
  }, []);

  const toggleTag = (t) =>
    setTags(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]);

  /* ── Submit to real API ── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rating) return;
    setLoading(true);
    setError('');
    try {
      await api.post('/api/feedback', {
        name:    name.trim() || 'Anonymous',
        rating,
        tags,
        message: message.trim(),
      });
      setSubmitted(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setRating(0);
    setTags([]);
    setMessage('');
    setName('');
    setError('');
  };

  return (
    <section id="feedback" className="feedback-section">
      <canvas ref={canvasRef} className="feedback-canvas" aria-hidden="true" />
      <div className="feedback-overlay" aria-hidden="true" />

      <div className="container feedback-container">

        {/* Left — pitch */}
        <div className="feedback-pitch" data-aos="fade-right">
          <span className="feedback-eyebrow">SHARE YOUR EXPERIENCE</span>
          <h2 className="feedback-heading">
            Your Opinion<br />
            <span className="feedback-gradient">Shapes Us</span>
          </h2>
          <p className="feedback-subtext">
            Every piece of feedback makes us better. Tell us what it was like
            working with us — it only takes 60 seconds and means the world to our team.
          </p>

          <div className="feedback-stats-row">
            {[
              { val: '98%',  desc: 'Client Satisfaction' },
              { val: '4.9★', desc: 'Average Rating' },
              { val: '200+', desc: 'Happy Clients' }
            ].map((s, i) => (
              <div key={i} className="feedback-stat">
                <strong>{s.val}</strong>
                <span>{s.desc}</span>
              </div>
            ))}
          </div>

          <div className="feedback-quote-card" data-aos="zoom-in" data-aos-delay="300">
            <i className="fas fa-quote-left feedback-quote-icon" />
            <p>"The attention to detail and responsiveness of the HMW team is unmatched. Truly a 5-star experience."</p>
            <div className="feedback-quote-author">
              <img src="https://i.pravatar.cc/36?img=4" alt="Client" />
              <span>— James W., Tech Startup CEO</span>
            </div>
          </div>
        </div>

        {/* Right — form */}
        <div className="feedback-form-wrap" data-aos="fade-left" data-aos-delay="150">
          <div className="feedback-card">

            {submitted ? (
              <div className="feedback-success">
                <div className="feedback-success-burst">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <span key={i} className="burst-ray" style={{ '--i': i }} />
                  ))}
                  <span className="feedback-success-emoji">🎉</span>
                </div>
                <h3>Thank You, {name || 'Friend'}!</h3>
                <p>Your feedback has been submitted and is pending review by our team.</p>
                <button className="feedback-reset-btn" onClick={handleReset}>
                  Submit Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <h3 className="feedback-form-title">Rate Your Experience</h3>

                {/* Star rating */}
                <div className="feedback-star-wrap">
                  <div className="feedback-star-row">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        key={star}
                        type="button"
                        className={`feedback-star-btn ${star <= (hovered || rating) ? 'lit' : ''}`}
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHovered(star)}
                        onMouseLeave={() => setHovered(0)}
                        aria-label={`${star} star`}
                      >
                        <i className="fas fa-star" />
                      </button>
                    ))}
                  </div>
                  <span className="feedback-star-label">
                    {(hovered || rating) ? STAR_LABELS[hovered || rating] : 'Tap a star to rate'}
                  </span>
                </div>

                {/* Tags */}
                <div className="feedback-tags-label">What did we do well?</div>
                <div className="feedback-tags">
                  {TAGS.map(t => (
                    <button
                      key={t}
                      type="button"
                      className={`feedback-tag ${tags.includes(t) ? 'active' : ''}`}
                      onClick={() => toggleTag(t)}
                    >
                      {tags.includes(t) && <i className="fas fa-check" />} {t}
                    </button>
                  ))}
                </div>

                {/* Name */}
                <div className="feedback-input-group">
                  <input
                    type="text"
                    placeholder="Your name (optional)"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="feedback-input"
                  />
                </div>

                {/* Message */}
                <div className="feedback-input-group">
                  <textarea
                    placeholder="Tell us more about your experience…"
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    className="feedback-input feedback-textarea"
                    rows={3}
                  />
                </div>

                {/* API error */}
                {error && (
                  <p style={{ color: '#f87171', fontSize: '0.85rem', marginBottom: '0.75rem' }}>
                    ⚠ {error}
                  </p>
                )}

                <button
                  type="submit"
                  className="feedback-submit-btn"
                  disabled={!rating || loading}
                >
                  {loading ? (
                    <><span className="fb-spinner" /> Submitting…</>
                  ) : (
                    <><i className="fas fa-paper-plane" /> Submit Feedback</>
                  )}
                  <span className="fb-btn-shine" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
