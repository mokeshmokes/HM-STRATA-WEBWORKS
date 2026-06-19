'use client';

import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  submitFormStart,
  submitFormSuccess,
  resetSubmitStatus,
  setFileName,
  setFileUploadState,
  resetFileUpload
} from '@/redux/slices/contactSlice';
import BackgroundVideo from './BackgroundVideo';

export default function Contact() {
  const dispatch = useDispatch();
  const { isSubmitting, submitSuccess, fileUploadState, fileName } = useSelector((state) => state.contact);
  const [focusedField, setFocusedField] = useState(null);
  const [sent, setSent] = useState(false);
  const particlesRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  // Floating particles
  useEffect(() => {
    const container = particlesRef.current;
    if (!container) return;
    const count = 18;
    for (let i = 0; i < count; i++) {
      const p = document.createElement('span');
      p.className = 'contact-particle';
      p.style.cssText = `
        left:${Math.random() * 100}%;
        top:${Math.random() * 100}%;
        width:${2 + Math.random() * 4}px;
        height:${2 + Math.random() * 4}px;
        animation-delay:${Math.random() * 6}s;
        animation-duration:${6 + Math.random() * 8}s;
        opacity:${0.2 + Math.random() * 0.5};
      `;
      container.appendChild(p);
    }
    return () => { if (container) container.innerHTML = ''; };
  }, []);

  useEffect(() => {
    if (submitSuccess) {
      setSent(true);
      setFormData({ name: '', email: '', phone: '', service: '', message: '' });
      dispatch(resetSubmitStatus());
      dispatch(resetFileUpload());
      setTimeout(() => setSent(false), 5000);
    }
  }, [submitSuccess, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) dispatch(setFileName(file.name));
  };

  const handleUploadStart = () => {
    dispatch(setFileUploadState('uploading'));
    setTimeout(() => dispatch(setFileUploadState('completed')), 2000);
  };

  const handleResetFile = () => {
    dispatch(resetFileUpload());
    const input = document.getElementById('requirement-file');
    if (input) input.value = '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(submitFormStart());
    setTimeout(() => {
      dispatch(submitFormSuccess({ ...formData, requirementFile: fileName || null, timestamp: new Date().toISOString() }));
    }, 2000);
  };

  const services = [
    { label: 'Select a Service', value: '' },
    { label: '🎨 Website Design', value: 'website-design' },
    { label: '⚙️ Website Development', value: 'website-development' },
    { label: '🛒 E-Commerce Solutions', value: 'ecommerce' },
    { label: '📈 SEO Optimization', value: 'seo' },
    { label: '📣 Digital Marketing', value: 'digital-marketing' },
    { label: '✏️ Branding & Photography', value: 'branding' }
  ];

  const infoCards = [
    {
      icon: 'fa-phone',
      label: 'Call Us',
      value: '+1 (555) 123-4567',
      sub: 'Mon–Fri, 9am – 6pm',
      color: '#00d4ff',
      href: 'tel:+15551234567'
    },
    {
      icon: 'fa-envelope',
      label: 'Email Us',
      value: 'hello@hmwwebworks.com',
      sub: 'Reply within 24 hours',
      color: '#a855f7',
      href: 'mailto:hello@hmwwebworks.com'
    },
    {
      icon: 'fa-map-marker-alt',
      label: 'Our Office',
      value: 'Tech City, TC 12345',
      sub: '123 Business Avenue',
      color: '#f59e0b',
      href: '#'
    },
    {
      icon: 'fab fa-whatsapp',
      label: 'WhatsApp',
      value: 'Chat Instantly',
      sub: 'Usually replies in minutes',
      color: '#25d366',
      href: 'https://wa.me/15551234567'
    }
  ];

  return (
    <section id="contact" className="contact-v2" style={{ position: 'relative', overflow: 'hidden' }}>
      <BackgroundVideo hueRotate="200deg" opacity={0.10} />

      {/* Floating particles layer */}
      <div ref={particlesRef} className="contact-particles" aria-hidden="true" />

      {/* Ambient blobs */}
      <div className="contact-blob contact-blob-1" aria-hidden="true" />
      <div className="contact-blob contact-blob-2" aria-hidden="true" />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>

        {/* Header */}
        <div className="contact-v2-header" data-aos="fade-up">
          <span className="contact-eyebrow">GET IN TOUCH</span>
          <h2>Let's Build Something <span className="contact-gradient-text">Amazing</span></h2>
          <p>Have a project in mind? Drop us a message — we'll get back to you within 24 hours.</p>
        </div>

        <div className="contact-v2-grid">

          {/* LEFT — info + socials */}
          <div className="contact-v2-left" data-aos="fade-right" data-aos-delay="100">

            <div className="contact-info-cards">
              {infoCards.map((card, i) => (
                <a
                  key={i}
                  href={card.href}
                  className="contact-info-card"
                  target={card.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  data-aos="fade-up"
                  data-aos-delay={i * 80}
                  style={{ '--card-color': card.color }}
                >
                  <div className="cic-icon">
                    <i className={`fas ${card.icon}`} />
                  </div>
                  <div className="cic-text">
                    <span className="cic-label">{card.label}</span>
                    <strong className="cic-value">{card.value}</strong>
                    <span className="cic-sub">{card.sub}</span>
                  </div>
                  <div className="cic-arrow"><i className="fas fa-arrow-right" /></div>
                </a>
              ))}
            </div>

            {/* Availability badge */}
            <div className="contact-availability" data-aos="fade-up" data-aos-delay="400">
              <span className="availability-dot" />
              <p>We're currently <strong>accepting new projects</strong> — limited slots available this month.</p>
            </div>

            {/* Social row */}
            <div className="contact-socials" data-aos="fade-up" data-aos-delay="500">
              {[
                { icon: 'fa-instagram', href: '#', color: '#e1306c' },
                { icon: 'fa-facebook', href: '#', color: '#1877f2' },
                { icon: 'fa-linkedin', href: '#', color: '#0a66c2' },
                { icon: 'fa-twitter', href: '#', color: '#1da1f2' },
                { icon: 'fa-behance', href: '#', color: '#1769ff' }
              ].map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  className="contact-social-btn"
                  style={{ '--s-color': s.color }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className={`fab ${s.icon}`} />
                </a>
              ))}
            </div>
          </div>

          {/* RIGHT — form */}
          <div className="contact-v2-right" data-aos="fade-left" data-aos-delay="150">
            <div className="contact-form-card">

              {/* Success overlay */}
              {sent && (
                <div className="contact-success-overlay">
                  <div className="success-icon-wrap">
                    <i className="fas fa-check" />
                  </div>
                  <h3>Message Sent!</h3>
                  <p>We'll get back to you within 24 hours.</p>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate>
                <div className="form-row">
                  <div className={`cf-group ${focusedField === 'name' || formData.name ? 'active' : ''}`}>
                    <input
                      type="text"
                      name="name"
                      id="cf-name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      required
                      autoComplete="off"
                    />
                    <label htmlFor="cf-name"><i className="fas fa-user" /> Your Name</label>
                    <div className="cf-line" />
                  </div>
                  <div className={`cf-group ${focusedField === 'email' || formData.email ? 'active' : ''}`}>
                    <input
                      type="email"
                      name="email"
                      id="cf-email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      required
                      autoComplete="off"
                    />
                    <label htmlFor="cf-email"><i className="fas fa-envelope" /> Email Address</label>
                    <div className="cf-line" />
                  </div>
                </div>

                <div className="form-row">
                  <div className={`cf-group ${focusedField === 'phone' || formData.phone ? 'active' : ''}`}>
                    <input
                      type="tel"
                      name="phone"
                      id="cf-phone"
                      value={formData.phone}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('phone')}
                      onBlur={() => setFocusedField(null)}
                      autoComplete="off"
                    />
                    <label htmlFor="cf-phone"><i className="fas fa-phone" /> Phone Number</label>
                    <div className="cf-line" />
                  </div>
                  <div className={`cf-group cf-select-group ${formData.service ? 'active' : ''}`}>
                    <select
                      name="service"
                      id="cf-service"
                      value={formData.service}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('service')}
                      onBlur={() => setFocusedField(null)}
                      required
                    >
                      {services.map((svc) => (
                        <option key={svc.value} value={svc.value}>{svc.label}</option>
                      ))}
                    </select>
                    <label htmlFor="cf-service"><i className="fas fa-briefcase" /> Service Needed</label>
                    <div className="cf-line" />
                    <i className="fas fa-chevron-down cf-select-arrow" />
                  </div>
                </div>

                <div className={`cf-group cf-textarea-group ${focusedField === 'message' || formData.message ? 'active' : ''}`}>
                  <textarea
                    name="message"
                    id="cf-message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    required
                  />
                  <label htmlFor="cf-message"><i className="fas fa-comment-alt" /> Tell us about your project</label>
                  <div className="cf-line" />
                </div>

                {/* File upload */}
                <div className="cf-file-wrap">
                  <span className="cf-file-label">Requirement Doc <em>(optional)</em></span>
                  <div className={`cf-file-box state-${fileUploadState}`}>
                    <input
                      type="file"
                      id="requirement-file"
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.zip"
                      style={{ display: 'none' }}
                      disabled={fileUploadState === 'uploading'}
                    />
                    <div className="file-upload-view view-idle">
                      <label htmlFor="requirement-file" className="file-select-trigger">
                        <i className="fas fa-paperclip" />
                        <span className={!fileName ? 'placeholder' : ''}>
                          {fileName || 'Choose file — PDF, DOC, ZIP, PNG'}
                        </span>
                      </label>
                      <button type="button" className="upload-action-btn" onClick={handleUploadStart} disabled={!fileName}>
                        Upload
                      </button>
                    </div>
                    <div className="file-upload-view view-uploading">
                      <span>Uploading…</span>
                      <div className="upload-progress-fill" />
                    </div>
                    <div className="file-upload-view view-completed">
                      <span className="completed-check">✓</span>
                      <span>Uploaded!</span>
                      <button type="button" className="btn-clear-attachment" onClick={handleResetFile}>
                        <i className="fas fa-times" />
                      </button>
                    </div>
                  </div>
                </div>

                <button type="submit" className="cf-submit-btn" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <><span className="cf-spinner" /> Sending…</>
                  ) : (
                    <><i className="fas fa-paper-plane" /> Send Message</>
                  )}
                  <span className="cf-btn-shine" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
