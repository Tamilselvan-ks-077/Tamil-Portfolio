import React, { Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { View, PerspectiveCamera } from '@react-three/drei';
import DeviceMockup from '../3D/DeviceMockup';
import { Play, Github } from '../Common/Icons';

export default function ProjectModal({ selectedProject, setSelectedProject, modalViewRef }) {
  return (
    <AnimatePresence>
      {selectedProject && (
        <motion.div 
          className="project-modal-overlay" 
          onClick={() => setSelectedProject(null)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div 
            className="project-modal-box glass-panel" 
            onClick={e => e.stopPropagation()}
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
          >
            <button className="project-modal-close" onClick={() => setSelectedProject(null)}>
              <i className="fa-solid fa-xmark"></i>
            </button>
            <div className="project-modal-grid">
              <div ref={modalViewRef} className="project-modal-visual">
                {modalViewRef.current && (
                  <View track={modalViewRef}>
                    <PerspectiveCamera makeDefault position={[0, 0, 3.5]} fov={45} />
                    <ambientLight intensity={1.5} />
                    <directionalLight position={[5, 5, 5]} intensity={1.5} color="#ffffff" />
                    <pointLight position={[-5, 5, 5]} intensity={1} color="#0071e3" />
                    <Suspense fallback={null}>
                      <DeviceMockup type={selectedProject.deviceType} textureUrl={selectedProject.image} />
                    </Suspense>
                  </View>
                )}
              </div>
              <div className="project-modal-info">
                <span className="tech-badge" style={{ alignSelf: 'flex-start' }}>
                  {selectedProject.badge}
                </span>
                <h3 className="project-modal-title">{selectedProject.title}</h3>
                <p className="project-modal-desc">{selectedProject.description}</p>
                <div className="project-modal-tech">
                  {selectedProject.tech.map(t => (
                    <span key={t} className="tech-badge">{t}</span>
                  ))}
                </div>
                <div className="project-modal-actions">
                  <a href={selectedProject.liveLink} target="_blank" rel="noreferrer" className="action-link-btn primary">
                    <Play size={14} /> Live Demo
                  </a>
                  <a href={selectedProject.codeLink} target="_blank" rel="noreferrer" className="action-link-btn">
                    <Github size={14} /> Source Code
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
