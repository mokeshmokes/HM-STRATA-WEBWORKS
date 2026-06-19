'use client';

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme, setTheme, setMobileMenuOpen, setActiveSection } from '@/redux/slices/uiSlice';
import Image from 'next/image';

export default function Header() {
  const dispatch = useDispatch();
  const { theme, mobileMenuOpen, activeSection } = useSelector((state) => state.ui);

  // Sync theme with body and local storage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    dispatch(setTheme(savedTheme));
  }, [dispatch]);

  useEffect(() => {
    if (theme === 'light') {
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Handle scroll to add scrolled class to navbar, and active page links
  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.getElementById('navbar');
      if (navbar) {
        if (window.scrollY > 100) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
      }

      // Track active section
      const sections = document.querySelectorAll('section, header');
      let current = 'home';
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 200) {
          current = section.getAttribute('id') || 'home';
        }
      });
      dispatch(setActiveSection(current));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [dispatch]);

  const handleLinkClick = (e, targetId) => {
    e.preventDefault();
    dispatch(setMobileMenuOpen(false));
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const offsetTop = targetElement.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  const navLinks = [
    { label: 'Home', target: 'home' },
    { label: 'Services', target: 'services' },
    { label: 'Portfolio', target: 'portfolio' },
    { label: 'About', target: 'about' },
    { label: 'Contact', target: 'contact' }
  ];

  return (
    <nav className="navbar" id="navbar">
      <div className="nav-container">
        <div className="nav-logo" style={{ display: 'flex', alignItems: 'center' }}>
          <Image
            src="/HM WEBWORKS.png"
            alt="HMW WebWorks"
            width={150}
            height={40}
            style={{ width: 'auto', height: '40px', objectFit: 'contain' }}
            priority
          />
        </div>
        <ul className={`nav-menu ${mobileMenuOpen ? 'active' : ''}`}>
          {navLinks.map((link) => (
            <li key={link.target}>
              <a
                href={`#${link.target}`}
                className={`nav-link ${activeSection === link.target ? 'active' : ''}`}
                onClick={(e) => handleLinkClick(e, link.target)}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <button
              className="theme-toggle"
              id="theme-toggle"
              onClick={() => dispatch(toggleTheme())}
              aria-label="Toggle theme"
            >
              <i className={`fas ${theme === 'light' ? 'fa-sun' : 'fa-moon'}`}></i>
            </button>
          </li>
        </ul>
        <div
          className={`hamburger ${mobileMenuOpen ? 'active' : ''}`}
          onClick={() => dispatch(setMobileMenuOpen(!mobileMenuOpen))}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
}
