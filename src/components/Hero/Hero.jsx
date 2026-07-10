import React, { Suspense } from 'react';
import { View, PerspectiveCamera } from '@react-three/drei';
import InteractiveAvatar from '../3D/InteractiveAvatar';
import { profileImg } from '../../data/portfolioData';

export default function Hero({ typedText, loading, avatarViewRef }) {
  const handleScrollToSection = (e, sectionId) => {
    e.preventDefault();
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="hero-section">
      <div className="hero-grid">
        <div className="hero-info">
          <div className="hero-badge">
            <span className="hero-badge-dot" style={{ backgroundColor: '#ff3b30', boxShadow: '0 0 10px #ff3b30' }} />
            Active Threat Analyst
          </div>
          <h1 className="hero-name">
            <span className="gradient-text-accent">TAMILSELVAN</span>
          </h1>
          <div className="hero-title-container">
            <span className="gradient-text-purple">{typedText || 'Ethical Hacker'}</span>
          </div>
          <p className="hero-subtitle">
            An ethical hacker and security researcher specializing in penetration testing, vulnerability assessment, and securing digital environments. Let's secure the web together.
          </p>

          <div className="hero-ctas">
            <a 
              href="#projects" 
              className="action-link-btn primary"
              onClick={(e) => handleScrollToSection(e, 'projects')}
            >
              Explore Projects
            </a>
            <a 
              href="#contact" 
              className="action-link-btn"
              onClick={(e) => handleScrollToSection(e, 'contact')}
            >
              Get in Touch
            </a>
          </div>

          <div className="about-stats" style={{ marginTop: 0, justifyContent: 'flex-start' }}>
            <div className="stat-item-hero" style={{ textAlign: 'left', paddingRight: '40px' }}>
              <div className="stat-number">12<span>+</span></div>
              <div className="stat-label">Deployments</div>
            </div>
            <div className="stat-item-hero" style={{ textAlign: 'left', paddingRight: '40px' }}>
              <div className="stat-number">200<span>+</span></div>
              <div className="stat-label">CTF Solves</div>
            </div>
            <div className="stat-item-hero" style={{ textAlign: 'left' }}>
              <div className="stat-number">3<span>+</span></div>
              <div className="stat-label">Years Coding</div>
            </div>
          </div>
        </div>

        {/* Interactive 3D Avatar Card Viewport */}
        <div className="hero-visual">
          <div ref={avatarViewRef} className="hero-avatar-container">
            {!loading && (
              <View track={avatarViewRef}>
                <PerspectiveCamera makeDefault position={[0, 0, 5.5]} fov={50} />
                <ambientLight intensity={1.5} />
                <directionalLight position={[5, 5, 5]} intensity={1.5} color="#ffffff" />
                <pointLight position={[-5, 5, 5]} intensity={1} color="#0071e3" />
                <Suspense fallback={null}>
                  <InteractiveAvatar profileImg={profileImg} />
                </Suspense>
              </View>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
