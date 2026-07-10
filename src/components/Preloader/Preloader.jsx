import React from 'react';
import { motion } from 'framer-motion';

export default function Preloader({ progress }) {
  return (
    <motion.div 
      className="preloader"
      exit={{ 
        y: '-100vh',
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
      }}
    >
      <div className="preloader-count">{String(progress).padStart(3, '0')}%</div>
      <div className="preloader-bar">
        <div className="preloader-fill" style={{ width: `${progress}%` }} />
      </div>
      <div className="preloader-text">Initializing digital interface</div>
    </motion.div>
  );
}
