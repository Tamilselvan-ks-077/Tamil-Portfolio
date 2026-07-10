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
              Crafting secure, elegant, and responsive software.
            </h3>
            <p className="about-text">
              I am Tamilselvan, a computer science student specializing in advanced frontend architecture, fluid micro-interactions, and secure code flows. I prioritize structured layout logic and clean design.
            </p>
            <p className="about-text">
              With over three years of coding experience, I design modular apps that value performance and aesthetics. My technical expertise spans React development, network telemetry scanning, and system assessment tools.
            </p>

            <div className="about-stats">
              <div className="glass-panel stat-item">
                <div className="stat-number">99<span>%</span></div>
                <div className="stat-label">Uptime Dev</div>
              </div>
              <div className="glass-panel stat-item">
                <div className="stat-number">100<span>%</span></div>
                <div className="stat-label">Secure Logic</div>
              </div>
              <div className="glass-panel stat-item">
                <div className="stat-number">4<span>+</span></div>
                <div className="stat-label">Major Projects</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
