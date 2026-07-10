import React, { Suspense } from 'react';
import { View, PerspectiveCamera } from '@react-three/drei';
import SkillsConstellation from '../3D/SkillsConstellation';

export default function Skills({ loading, skillsViewRef }) {
  return (
    <section id="skills" className="section">
      <div className="container">
        <div className="section-header gsap-reveal" style={{ textAlign: 'center' }}>
          <span className="section-subtitle">Capabilities</span>
          <h2 className="section-title">Interactive Technology Constellation</h2>
        </div>

        {/* 3D Skills Canvas */}
        <div ref={skillsViewRef} className="skills-container glass-panel gsap-reveal">
          {!loading && (
            <View track={skillsViewRef}>
              <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
              <ambientLight intensity={1.5} />
              <pointLight position={[10, 10, 10]} intensity={1.5} color="#0071e3" />
              <pointLight position={[-10, -10, -10]} intensity={1} color="#ffffff" />
              <Suspense fallback={null}>
                <SkillsConstellation setHoveredNode={() => {}} />
              </Suspense>
            </View>
          )}
        </div>
      </div>
    </section>
  );
}
