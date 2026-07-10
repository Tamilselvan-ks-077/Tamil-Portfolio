import React from 'react';
import { motion } from 'framer-motion';
import { navLinks } from '../../data/portfolioData';

export default function Header({ headerScrolled, activeSection }) {
  const handleNavLinkClick = (e, targetId) => {
    e.preventDefault();
    document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className={headerScrolled ? 'scrolled' : ''}>
      <div className="logo-container">
        TAMIL<span className="logo-dot" />
      </div>

      <nav>
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={`nav-link ${activeSection === link.id ? 'active' : ''}`}
            onClick={(e) => handleNavLinkClick(e, link.id)}
          >
            {/* Sliding background indicator using Framer Motion */}
            {activeSection === link.id && (
              <motion.div 
                layoutId="activeNavIndicator"
                className="nav-active-pill"
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '20px',
                  background: 'rgba(255, 255, 255, 0.07)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  zIndex: -1
                }}
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
            {link.label}
          </a>
        ))}
      </nav>

      <div className="header-right">
        {/* Google Drive Resume Link */}
        <a 
          href="https://drive.google.com/file/d/1gzKuCG0WKRHFwCqo5DLtQXzCdHczp-qG/edit?usp=sharing" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="resume-btn"
        >
          Resume
        </a>
        <a 
          href="#contact" 
          className="contact-btn"
          onClick={(e) => handleNavLinkClick(e, 'contact')}
        >
          Connect
        </a>
      </div>
    </header>
  );
}
