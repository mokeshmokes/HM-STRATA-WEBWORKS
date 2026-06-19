'use client';

import { useState, useEffect } from 'react';
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
      dispatch(resetFileUpload());
    }
  }, [submitSuccess, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      dispatch(setFileName(file.name));
    }
  };

  const handleUploadStart = () => {
    dispatch(setFileUploadState('uploading'));
    // Simulate upload progress
    setTimeout(() => {
      dispatch(setFileUploadState('completed'));
    }, 2000);
  };

  const handleResetFile = () => {
    dispatch(resetFileUpload());
    const input = document.getElementById('requirement-file');
    if (input) {
      input.value = '';
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(submitFormStart());
    
    // Simulate API call
    setTimeout(() => {
      dispatch(submitFormSuccess({
        ...formData,
        requirementFile: fileName || null,
        timestamp: new Date().toISOString()
      }));
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
    <section id="contact" className="contact" style={{ position: 'relative', overflow: 'hidden' }}>
      <BackgroundVideo hueRotate="0deg" opacity={0.14} />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
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

            {/* Animated File Upload Option */}
            <div className="form-group" style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'block', marginBottom: '0.8rem', fontSize: '0.95rem', fontWeight: '550', color: 'var(--text-secondary)', fontFamily: 'Space Grotesk, sans-serif' }}>
                Requirement Document (Optional)
              </label>
              
              <div className={`file-upload-wrapper state-${fileUploadState}`}>
                <input
                  type="file"
                  id="requirement-file"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.zip"
                  style={{ display: 'none' }}
                  disabled={fileUploadState === 'uploading'}
                />

                {/* Idle view */}
                <div className="file-upload-view view-idle">
                  <label htmlFor="requirement-file" className="file-select-trigger">
                    <i className="fas fa-paperclip"></i>
                    <span className={`file-name-text ${!fileName ? 'placeholder' : ''}`}>
                      {fileName || 'Choose requirement file (PDF, DOC, ZIP, PNG)...'}
                    </span>
                  </label>
                  <button
                    type="button"
                    className="upload-action-btn"
                    onClick={handleUploadStart}
                    disabled={!fileName}
                  >
                    Upload
                  </button>
                </div>

                {/* Uploading view */}
                <div className="file-upload-view view-uploading">
                  <span>Uploading...</span>
                  <div className="upload-progress-fill"></div>
                </div>

                {/* Completed view */}
                <div className="file-upload-view view-completed">
                  <span className="completed-check">✓</span>
                  <span>Completed</span>
                  <button
                    type="button"
                    className="btn-clear-attachment"
                    onClick={handleResetFile}
                    title="Remove file"
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>
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
