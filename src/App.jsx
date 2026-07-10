import React, { useEffect, useRef, useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { View, PerspectiveCamera } from '@react-three/drei';
import { AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Modular Component Imports
import Preloader from './components/Preloader/Preloader';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Scene3D from './components/3D/Scene3D';
import About from './components/About/About';
import Skills from './components/Skills/Skills';
import Projects from './components/Projects/Projects';
import Experience from './components/Experience/Experience';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import CommandPalette from './components/UI/CommandPalette';
import ProjectModal from './components/Projects/ProjectModal';
import FloatingConstellation from './components/3D/FloatingConstellation';
import { Sparkles } from './components/Common/Icons';

export default function App() {
  // Preloader count-up state
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  const [typedText, setTypedText] = useState('');
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [selectedProject, setSelectedProject] = useState(null);
  
  // Easter Eggs
  const [showCmdPalette, setShowCmdPalette] = useState(false);
  const [cmdSearch, setCmdSearch] = useState('');
  const [easterTriggered, setEasterTriggered] = useState(false);
  const [easterText, setEasterText] = useState('');
  const [konamiProgress, setKonamiProgress] = useState([]);
  
  // Contact Form
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState('idle');

  // Shared Foreground View tracking references
  const mainScrollContainerRef = useRef(null);
  const avatarViewRef = useRef(null);
  const scene3DViewRef = useRef(null);
  const aboutViewRef = useRef(null);
  const skillsViewRef = useRef(null);
  const projectCardRefs = useRef([]);
  const modalViewRef = useRef(null);

  // Preloader progress count
  useEffect(() => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 6) + 2;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setTimeout(() => setLoading(false), 600);
      }
      setLoadingProgress(progress);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  // Text typing effect for hero
  useEffect(() => {
    if (loading) return;
    const titles = ['Frontend Engineer', 'React Specialist', 'Creative Developer'];
    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timer;

    const handleType = () => {
      const currentTitle = titles[titleIndex];
      if (isDeleting) {
        setTypedText(currentTitle.substring(0, charIndex - 1));
        charIndex--;
      } else {
        setTypedText(currentTitle.substring(0, charIndex + 1));
        charIndex++;
      }

      let speed = isDeleting ? 40 : 100;

      if (!isDeleting && charIndex === currentTitle.length) {
        speed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
        speed = 500;
      }

      timer = setTimeout(handleType, speed);
    };

    handleType();
    return () => clearTimeout(timer);
  }, [loading]);

  // Lenis Smooth Scroll + GSAP ScrollTrigger Integration
  useEffect(() => {
    if (loading) return;

    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
      infinite: false,
    });

    // Link Lenis scroll state to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // GSAP ScrollTrigger intro entrance
    gsap.fromTo('.hero-badge', 
      { y: 24, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.2 }
    );
    gsap.fromTo('.hero-name', 
      { y: 34, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1.0, ease: 'power3.out', delay: 0.3 }
    );
    gsap.fromTo('.hero-title-container', 
      { y: 24, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.45 }
    );
    gsap.fromTo('.hero-subtitle', 
      { y: 24, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.55 }
    );
    gsap.fromTo('.hero-ctas', 
      { y: 24, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.65 }
    );
    gsap.fromTo('.stat-item-hero', 
      { y: 24, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.1, delay: 0.75 }
    );
    gsap.fromTo('.hero-visual', 
      { scale: 0.95, opacity: 0 }, 
      { scale: 1, opacity: 1, duration: 1.2, ease: 'power3.out', delay: 0.5 }
    );

    // Scroll Storytelling: Animate background ambient blobs
    gsap.to('.blob-1', {
      x: '15vw',
      y: '10vh',
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.2
      }
    });
    gsap.to('.blob-2', {
      x: '-15vw',
      y: '-10vh',
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.2
      }
    });

    // Scroll Storytelling: Timeline Path reveal
    gsap.fromTo('.timeline-line', 
      { scaleY: 0 }, 
      {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: '.timeline-wrapper',
          start: 'top center',
          end: 'bottom center',
          scrub: true
        }
      }
    );

    // GSAP ScrollTrigger general reveals
    const revealElements = document.querySelectorAll('.gsap-reveal');
    revealElements.forEach((el) => {
      gsap.fromTo(el, 
        { y: 45, opacity: 0, filter: 'blur(8px)' },
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 1.0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    // Monitor current scroll offset to toggle scrolled header state
    const handleScroll = () => {
      setHeaderScrolled(window.scrollY > 40);

      // Determine active nav section based on viewport position
      const sections = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];
      for (const s of sections) {
        const el = document.getElementById(s);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140 && rect.bottom >= 140) {
            setActiveSection(s);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);

    // Cleanup Lenis & ScrollTrigger on unmount
    return () => {
      lenis.destroy();
      window.removeEventListener('scroll', handleScroll);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [loading]);

  // Command palette and Konami code key listener triggers
  useEffect(() => {
    const konamiCode = [
      'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
      'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'
    ];

    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setShowCmdPalette(prev => !prev);
      }

      // Konami code progression
      const nextProgress = [...konamiProgress, e.key];
      const matchLength = nextProgress.length;
      const partToMatch = konamiCode.slice(0, matchLength);

      if (nextProgress.toString() === partToMatch.toString()) {
        if (matchLength === konamiCode.length) {
          setKonamiProgress([]);
          setEasterTriggered(true);
          setEasterText('✨ Warp Space Constellation Mode Enabled.');
          setTimeout(() => setEasterTriggered(false), 8000);
        } else {
          setKonamiProgress(nextProgress);
        }
      } else {
        setKonamiProgress([]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [konamiProgress]);

  const cmdItems = [
    { name: 'Activate Warp Constellation', shortcut: 'E', action: () => { setEasterTriggered(true); setEasterText('✨ Warp Constellation Mode Enabled.'); setShowCmdPalette(false); } },
    { name: 'Reset Constellation Physics', shortcut: 'R', action: () => { setEasterTriggered(false); setShowCmdPalette(false); } },
    { name: 'Navigate to Projects Grid', shortcut: 'P', action: () => { document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); setShowCmdPalette(false); } },
    { name: 'Navigate to Contact Panel', shortcut: 'C', action: () => { document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); setShowCmdPalette(false); } }
  ];

  const handleFormChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormStatus('sending');
    setTimeout(() => {
      setFormStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setFormStatus('idle'), 4000);
    }, 1200);
  };

  return (
    <>
      {/* Luxury Preloader Screen */}
      <AnimatePresence>
        {loading && (
          <Preloader progress={loadingProgress} />
        )}
      </AnimatePresence>

      <div className="noise-overlay" />
      <div className="grid-lines" />

      {/* Luxury Ambience Blobs */}
      <div className="bg-blobs">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
      </div>

      {/* Background WebGL Scene (Constellation) */}
      {!loading && (
        <Canvas
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            pointerEvents: 'none',
            zIndex: 0
          }}
        >
          <FloatingConstellation easterTriggered={easterTriggered} />
        </Canvas>
      )}

      {/* Shared Foreground Canvas for tracking local Views (Optimized memory, no context loss) */}
      {!loading && (
        <Canvas
          className="canvas-viewport-container"
          eventSource={mainScrollContainerRef}
          style={{
            position: 'fixed',
            inset: 0,
            width: '100vw',
            height: '100vh',
            pointerEvents: 'none',
            zIndex: 98
          }}
        >
          <View.Port />
        </Canvas>
      )}

      {/* Main Layout Container */}
      <div ref={mainScrollContainerRef} className="app-container">
        
        {/* Header Navigation */}
        <Header 
          headerScrolled={headerScrolled} 
          activeSection={activeSection} 
        />

        {/* Hero Section */}
        <Hero 
          typedText={typedText} 
          loading={loading} 
          avatarViewRef={avatarViewRef} 
        />

        {/* 3D Glass Sculpture Mid Divider Section */}
        <section ref={scene3DViewRef} style={{ height: '40vh', position: 'relative', width: '100%', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {!loading && (
            <View track={scene3DViewRef}>
              <PerspectiveCamera makeDefault position={[0, 0, 4.5]} fov={50} />
              <ambientLight intensity={1.2} />
              <Suspense fallback={null}>
                <Scene3D />
              </Suspense>
            </View>
          )}
          <div 
            style={{ 
              position: 'absolute', 
              inset: 0, 
              background: 'linear-gradient(to bottom, #060608, rgba(6, 6, 8, 0.4), #060608)',
              zIndex: 2,
              pointerEvents: 'none'
            }} 
          />
          
          {/* Cyber Security Quote Overlay */}
          <div 
            className="gsap-reveal"
            style={{
              position: 'absolute',
              zIndex: 10,
              textAlign: 'center',
              padding: '0 24px',
              maxWidth: '800px',
              pointerEvents: 'none'
            }}
          >
            <div 
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                color: 'var(--accent-color)',
                letterSpacing: '5px',
                textTransform: 'uppercase',
                marginBottom: '16px',
                textShadow: '0 0 10px var(--accent-glow)'
              }}
            >
              // CORE LOOP
            </div>
            <blockquote 
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.5rem, 3.5vw, 2.8rem)',
                fontWeight: 800,
                color: '#ffffff',
                lineHeight: 1.4,
                letterSpacing: '-1px',
                marginBottom: '12px'
              }}
            >
              "Create. Break. Rebuild."
            </blockquote>
            <cite 
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                color: 'var(--text-muted)',
                fontStyle: 'normal',
                letterSpacing: '1px'
              }}
            >
              — THE DEVELOPER'S LOOP
            </cite>
          </div>
        </section>

        {/* About Section */}
        <About 
          loading={loading} 
          aboutViewRef={aboutViewRef} 
        />

        {/* Skills Section */}
        <Skills 
          loading={loading} 
          skillsViewRef={skillsViewRef} 
        />

        {/* Projects Showcase Section */}
        <Projects 
          loading={loading} 
          setSelectedProject={setSelectedProject} 
          projectCardRefs={projectCardRefs} 
        />

        {/* Technical Timeline Section */}
        <Experience />

        {/* Contact Section */}
        <Contact 
          formData={formData} 
          formStatus={formStatus} 
          handleFormSubmit={handleFormSubmit} 
          handleFormChange={handleFormChange} 
        />

        {/* Footer Section */}
        <Footer />
      </div>

      {/* Easter Egg Notification Trigger */}
      {easterTriggered && (
        <div className="easter-notification">
          <Sparkles size={20} style={{ color: '#0071e3' }} />
          <div>{easterText}</div>
        </div>
      )}

      {/* Command Palette Overlay */}
      <CommandPalette 
        showCmdPalette={showCmdPalette}
        setShowCmdPalette={setShowCmdPalette}
        cmdSearch={cmdSearch}
        setCmdSearch={setCmdSearch}
        cmdItems={cmdItems}
      />

      {/* Framer Motion project detail modal */}
      <ProjectModal 
        selectedProject={selectedProject}
        setSelectedProject={setSelectedProject}
        modalViewRef={modalViewRef}
      />
    </>
  );
}