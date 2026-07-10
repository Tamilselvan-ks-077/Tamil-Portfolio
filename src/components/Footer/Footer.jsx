import React from 'react';
import { Github, Linkedin, ChevronUp } from '../Common/Icons';

export default function Footer() {
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer>
      <div className="footer-top">
        <div className="logo-container">
          TAMIL<span className="logo-dot" />
        </div>
        <div className="footer-socials">
          {[
            { icon: <Github size={18} />, href: 'https://github.com/Tamilselvan-ks-077' },
            { icon: <Linkedin size={18} />, href: 'https://www.linkedin.com/in/tamilselvan-ks' }
          ].map((s, idx) => (
            <a 
              key={idx} 
              href={s.href} 
              target="_blank" 
              rel="noreferrer" 
              className="footer-social-link"
            >
              {s.icon}
            </a>
          ))}
        </div>
      </div>

      <div className="footer-bottom">
        <div>© 2026 Tamilselvan. All rights reserved.</div>
        <button 
          className="scroll-top-btn"
          onClick={handleScrollTop}
        >
          Back to Top
          <ChevronUp size={16} />
        </button>
      </div>
    </footer>
  );
}
