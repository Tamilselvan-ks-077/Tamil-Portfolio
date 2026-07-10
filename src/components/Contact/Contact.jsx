import React from 'react';
import TiltCard from '../UI/TiltCard';
import { Mail, MapPin, Send } from '../Common/Icons';

export default function Contact({ formData, formStatus, handleFormSubmit, handleFormChange }) {
  return (
    <section id="contact" className="section">
      <div className="container">
        <div className="section-header gsap-reveal">
          <span className="section-subtitle">Get in Touch</span>
          <h2 className="section-title">Let's Connect</h2>
        </div>

        <div className="contact-grid">
          <div className="contact-info-container gsap-reveal">
            <p className="contact-descr">
              I'm always open to talking about front-end architecture, creative WebGL projects, secure application designs, or engineering roles. Reach out and let's build something remarkable.
            </p>

            <div className="contact-methods">
              <TiltCard className="glass-panel contact-method-card">
                <div className="method-icon-box">
                  <Mail size={18} />
                </div>
                <div>
                  <div className="method-label">Email</div>
                  <div className="method-value">tamilselvan@example.com</div>
                </div>
              </TiltCard>

              <TiltCard className="glass-panel contact-method-card">
                <div className="method-icon-box">
                  <MapPin size={18} />
                </div>
                <div>
                  <div className="method-label">Location</div>
                  <div className="method-value">Tamil Nadu, India</div>
                </div>
              </TiltCard>
            </div>
          </div>

          <div className="gsap-reveal" style={{ width: '100%' }}>
            <TiltCard className="glass-panel contact-form-container">
              {formStatus === 'success' ? (
                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                  <h3 style={{ marginBottom: '12px', fontSize: '1.4rem', fontFamily: 'var(--font-display)' }}>Message Transmitted!</h3>
                  <p style={{ color: 'var(--text-secondary)' }}>Thank you. I will review and connect back shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="method-label" style={{ marginBottom: '8px', display: 'block' }}>Name</label>
                      <input 
                        type="text" 
                        name="name" 
                        required 
                        placeholder="Your Name" 
                        className="form-input-field"
                        value={formData.name}
                        onChange={handleFormChange}
                      />
                    </div>
                    <div className="form-group">
                      <label className="method-label" style={{ marginBottom: '8px', display: 'block' }}>Email</label>
                      <input 
                        type="email" 
                        name="email" 
                        required 
                        placeholder="your.email@example.com" 
                        className="form-input-field"
                        value={formData.email}
                        onChange={handleFormChange}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="method-label" style={{ marginBottom: '8px', display: 'block' }}>Message</label>
                    <textarea 
                      name="message" 
                      required 
                      placeholder="Your message details..." 
                      className="form-input-field form-textarea-field"
                      value={formData.message}
                      onChange={handleFormChange}
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="submit-btn"
                    disabled={formStatus === 'sending'}
                  >
                    {formStatus === 'sending' ? 'Sending...' : 'Send Message'}
                    <Send size={16} />
                  </button>
                </form>
              )}
            </TiltCard>
          </div>
        </div>
      </div>
    </section>
  );
}
