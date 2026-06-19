'use client';

export default function Footer() {
  const handleLinkClick = (e, targetId) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const offsetTop = targetElement.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <img
              src="/HM WEBWORKS.png"
              alt="HMW WebWorks"
              className="footer-logo"
            />
            <p>Creating digital experiences that drive business growth and success.</p>
            <div className="social-links">
              <a href="#" aria-label="Facebook" onClick={(e) => e.preventDefault()}>
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" aria-label="Twitter" onClick={(e) => e.preventDefault()}>
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" aria-label="LinkedIn" onClick={(e) => e.preventDefault()}>
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="#" aria-label="Instagram" onClick={(e) => e.preventDefault()}>
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
          <div className="footer-section">
            <h4>Services</h4>
            <ul>
              <li>
                <a href="#services" onClick={(e) => handleLinkClick(e, 'services')}>
                  Website Design
                </a>
              </li>
              <li>
                <a href="#services" onClick={(e) => handleLinkClick(e, 'services')}>
                  Web Development
                </a>
              </li>
              <li>
                <a href="#services" onClick={(e) => handleLinkClick(e, 'services')}>
                  E-Commerce
                </a>
              </li>
              <li>
                <a href="#services" onClick={(e) => handleLinkClick(e, 'services')}>
                  SEO Optimization
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Company</h4>
            <ul>
              <li>
                <a href="#about" onClick={(e) => handleLinkClick(e, 'about')}>
                  About Us
                </a>
              </li>
              <li>
                <a href="#portfolio" onClick={(e) => handleLinkClick(e, 'portfolio')}>
                  Portfolio
                </a>
              </li>
              <li>
                <a href="#pricing" onClick={(e) => handleLinkClick(e, 'pricing')}>
                  Pricing
                </a>
              </li>
              <li>
                <a href="#contact" onClick={(e) => handleLinkClick(e, 'contact')}>
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Contact Info</h4>
            <ul>
              <li>
                <i className="fas fa-phone"></i> +1 (555) 123-4567
              </li>
              <li>
                <i className="fas fa-envelope"></i> hello@hmwwebworks.com
              </li>
              <li>
                <i className="fas fa-map-marker-alt"></i> 123 Business Ave, Tech City
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} HMW WebWorks. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
