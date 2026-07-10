import React, { useRef } from 'react';

export default function TiltCard({ children, className, style, ...props }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    cardRef.current.style.transform = `perspective(1000px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) scale3d(1.02, 1.02, 1.02)`;
    
    const shine = cardRef.current.querySelector('.card-shine');
    if (shine) {
      const shineX = (e.clientX - rect.left) / rect.width * 100;
      const shineY = (e.clientY - rect.top) / rect.height * 100;
      shine.style.background = `radial-gradient(circle at ${shineX}% ${shineY}%, rgba(0, 113, 227, 0.08) 0%, transparent 60%)`;
    }
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)';
    const shine = cardRef.current.querySelector('.card-shine');
    if (shine) {
      shine.style.background = 'transparent';
    }
  };

  return (
    <div 
      ref={cardRef}
      className={className}
      style={{
        ...style,
        position: 'relative',
        transition: 'transform 0.4s cubic-bezier(0.25, 1, 0.25, 1)',
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <div 
        className="card-shine"
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 'inherit',
          pointerEvents: 'none',
          zIndex: 3,
          transition: 'background 0.2s ease-out'
        }}
      />
      {children}
    </div>
  );
}
