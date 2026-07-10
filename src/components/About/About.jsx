import React, { Suspense } from 'react';
import { View, PerspectiveCamera } from '@react-three/drei';
import AboutSphere from '../3D/AboutSphere';

export default function About({ loading, aboutViewRef }) {
  return (
    <section id="about" className="section">
      <div className="container">
        <div className="section-header gsap-reveal">
          <span className="section-subtitle">Identity</span>
          <h2 className="section-title">About Me</h2>
        </div>
        
        <div className="about-grid">
          {/* About 3D Canvas Sphere morph */}
          <div ref={aboutViewRef} className="glass-panel gsap-reveal" style={{ height: '480px', width: '100%', position: 'relative', overflow: 'hidden' }}>
            {!loading && (
              <View track={aboutViewRef}>
                <PerspectiveCamera makeDefault position={[0, 0, 4]} fov={45} />
                <ambientLight intensity={1.5} />
                <pointLight position={[10, 10, 10]} intensity={1.5} color="#0071e3" />
                <pointLight position={[-10, -10, -10]} intensity={1} color="#ffffff" />
                <Suspense fallback={null}>
                  <AboutSphere />
                </Suspense>
              </View>
            )}
          </div>

          <div className="about-details gsap-reveal">
            <h3 style={{ fontSize: '1.6rem', fontWeight: 800, fontFamily: 'var(--font-display)', letterSpacing: '-0.3px' }}>
              Securing digital landscapes, one vulnerability at a time.
            </h3>
            <p className="about-text">
              I am Tamilselvan, a computer science student specializing in cybersecurity, penetration testing, and ethical hacking. I design, test, and audit security architectures and network systems to protect against emerging threats.
            </p>
            <p className="about-text">
              My technical expertise spans network scanning suites, real-time threat intelligence dashboards, and building secure full-stack software. I enjoy solving CTF challenges, hunting for vulnerabilities, and ensuring digital integrity.
            </p>

            <div className="about-stats">
              <div className="glass-panel stat-item">
                <div className="stat-number">200<span>+</span></div>
                <div className="stat-label">CTF Solves</div>
              </div>
              <div className="glass-panel stat-item">
                <div className="stat-number">100<span>%</span></div>
                <div className="stat-label">System Audited</div>
              </div>
              <div className="glass-panel stat-item">
                <div className="stat-number">15<span>+</span></div>
                <div className="stat-label">Bugs Reported</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
