'use client';

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { submitFormStart, submitFormSuccess, resetSubmitStatus } from '@/redux/slices/contactSlice';

export default function Contact() {
  const dispatch = useDispatch();
  const { isSubmitting, submitSuccess } = useSelector((state) => state.contact);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  useEffect(() => {
    if (submitSuccess) {
      alert('Thank you for your message! We will get back to you soon.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: ''
      });
      dispatch(resetSubmitStatus());
    }
  }, [submitSuccess, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(submitFormStart());
    
    // Simulate API call
    setTimeout(() => {
      dispatch(submitFormSuccess({ ...formData, timestamp: new Date().toISOString() }));
    }, 2000);
  };

  const services = [
    { label: 'Select a Service', value: '' },
    { label: 'Website Design', value: 'website-design' },
    { label: 'Website Development', value: 'website-development' },
    { label: 'E-Commerce Solutions', value: 'ecommerce' },
    { label: 'SEO Optimization', value: 'seo' },
    { label: 'Digital Marketing', value: 'digital-marketing' },
    { label: 'Branding & Photography', value: 'branding' }
  ];

  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="section-header" data-aos="fade-up">
          <h2>Let's Start Your Project</h2>
          <p>Ready to transform your online presence? Get in touch with us today</p>
        </div>
        <div className="contact-content">
          <div className="contact-info" data-aos="fade-right">
            <div className="contact-item">
              <i className="fas fa-phone"></i>
              <div>
                <h4>Phone</h4>
                <p>+1 (555) 123-4567</p>
              </div>
            </div>
            <div className="contact-item">
              <i className="fas fa-envelope"></i>
              <div>
                <h4>Email</h4>
                <p>hello@hmwwebworks.com</p>
              </div>
            </div>
            <div className="contact-item">
              <i className="fas fa-map-marker-alt"></i>
              <div>
                <h4>Location</h4>
                <p>123 Business Ave, Tech City, TC 12345</p>
              </div>
            </div>
            <div className="contact-item whatsapp">
              <i className="fab fa-whatsapp"></i>
              <div>
                <h4>WhatsApp</h4>
                <a href="https://wa.me/15551234567" target="_blank" rel="noopener noreferrer">
                  Chat with us instantly
                </a>
              </div>
            </div>
          </div>
          <form className="contact-form" onSubmit={handleSubmit} data-aos="fade-left">
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="tel"
                name="phone"
                placeholder="Your Phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <select name="service" value={formData.service} onChange={handleChange} required>
                {services.map((svc) => (
                  <option key={svc.value} value={svc.value}>
                    {svc.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <textarea
                name="message"
                placeholder="Tell us about your project"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
