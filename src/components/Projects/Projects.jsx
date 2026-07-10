import React, { Suspense } from 'react';
import { View, PerspectiveCamera } from '@react-three/drei';
import TiltCard from '../UI/TiltCard';
import DeviceMockup from '../3D/DeviceMockup';
import { projectsData } from '../../data/portfolioData';

export default function Projects({ loading, setSelectedProject, projectCardRefs }) {
  return (
    <section id="projects" className="section">
      <div className="container">
        <div className="section-header gsap-reveal">
          <span className="section-subtitle">Portfolio</span>
          <h2 className="section-title">Selected Projects</h2>
        </div>

        <div className="projects-grid gsap-reveal">
          {projectsData.map((project, idx) => {
            return (
              <TiltCard 
                key={idx} 
                className="glass-panel project-card"
                onClick={() => setSelectedProject(project)}
              >
                {/* Placeholder div tracked by our foreground Canvas View */}
                <div 
                  ref={el => projectCardRefs.current[idx] = el}
                  className="project-card-image-wrap"
                >
                  {!loading && projectCardRefs.current[idx] && (
                    <View track={projectCardRefs.current[idx]}>
                      <PerspectiveCamera makeDefault position={[0, 0, 3.4]} fov={45} />
                      <ambientLight intensity={1.4} />
                      <directionalLight position={[5, 5, 5]} intensity={1.5} color="#ffffff" />
                      <pointLight position={[-5, 5, 5]} intensity={1} color="#0071e3" />
                      <Suspense fallback={null}>
                        <DeviceMockup type={project.deviceType} textureUrl={project.image} />
                      </Suspense>
                    </View>
                  )}
                </div>
                <div className="project-card-content">
                  <div>
                    <span className="tech-badge" style={{ marginBottom: '12px', display: 'inline-block' }}>{project.badge}</span>
                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-desc">{project.description.slice(0, 100)}...</p>
                  </div>
                  <div className="project-tech">
                    {project.tech.map(t => (
                      <span key={t} className="tech-badge">{t}</span>
                    ))}
                  </div>
                </div>
              </TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
