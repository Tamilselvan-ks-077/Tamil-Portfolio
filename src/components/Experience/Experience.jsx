import React from 'react';
import TiltCard from '../UI/TiltCard';
import { Shield, Cpu, Code } from '../Common/Icons';
import { timelineData } from '../../data/portfolioData';

// Map iconType strings to React components
const iconMap = {
  Shield: <Shield size={20} />,
  Cpu: <Cpu size={20} />,
  Code: <Code size={20} />
};

export default function Experience() {
  return (
    <section id="experience" className="section">
      <div className="container">
        <div className="section-header gsap-reveal" style={{ textAlign: 'center' }}>
          <span className="section-subtitle">Timeline</span>
          <h2 className="section-title">Technical Journey</h2>
        </div>

        <div className="timeline-wrapper gsap-reveal">
          {/* Animating ScrollTrigger timeline path line */}
          <div className="timeline-line" />

          {timelineData.map((item, idx) => (
            <div key={idx} className="timeline-item">
              <div className="timeline-dot-wrapper">
                <div className="timeline-dot">
                  {iconMap[item.iconType]}
                </div>
              </div>
              <TiltCard className="glass-panel timeline-card">
                <div className="timeline-date">{item.date}</div>
                <h3 className="timeline-role">{item.role}</h3>
                <div className="timeline-company">{item.company}</div>
                <p className="timeline-desc">{item.desc}</p>
              </TiltCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
