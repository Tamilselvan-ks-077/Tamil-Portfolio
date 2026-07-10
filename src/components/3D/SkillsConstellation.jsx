import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

// 3D Skill node in constellation grid
function SkillNode3D({ name, icon, pos, color, setHoveredNode }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const targetScale = hovered ? 1.3 : 1.0;
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.quaternion.copy(state.camera.quaternion);
      
      const time = state.clock.getElapsedTime();
      meshRef.current.position.y = pos[1] + Math.sin(time * 1.2 + pos[0]) * 0.12;
      meshRef.current.position.x = pos[0] + Math.cos(time * 0.6 + pos[2]) * 0.08;
      
      const currentScale = meshRef.current.scale.x;
      const nextScale = THREE.MathUtils.lerp(currentScale, targetScale, 0.1);
      meshRef.current.scale.set(nextScale, nextScale, nextScale);
    }
  });

  return (
    <group ref={meshRef} position={pos}>
      <mesh 
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); if (setHoveredNode) setHoveredNode(name); }}
        onPointerOut={() => { setHovered(false); if (setHoveredNode) setHoveredNode(null); }}
      >
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshPhysicalMaterial 
          color={hovered ? "#0071e3" : "#ffffff"} 
          transmission={0.85}
          roughness={0.15}
          metalness={0.1}
          ior={1.4}
          thickness={0.08}
          transparent
          opacity={0.88}
        />
      </mesh>
      
      {hovered && (
        <mesh>
          <sphereGeometry args={[0.32, 16, 16]} />
          <meshBasicMaterial color="#0071e3" transparent opacity={0.15} wireframe />
        </mesh>
      )}

      <Html distanceFactor={4} position={[0, 0.42, 0]} center>
        <div 
          style={{
            background: 'rgba(13, 13, 20, 0.95)',
            backdropFilter: 'blur(8px)',
            border: `1px solid rgba(255, 255, 255, 0.08)`,
            boxShadow: `0 8px 32px rgba(0, 0, 0, 0.3)`,
            color: '#f5f5f7',
            padding: '8px 14px',
            borderRadius: '20px',
            fontSize: '11px',
            fontWeight: 600,
            fontFamily: 'var(--font-sans)',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            opacity: hovered ? 1 : 0.82,
            transform: hovered ? 'scale(1.05) translateY(-5px)' : 'scale(1) translateY(0)',
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <i className={`fa-solid ${icon}`} style={{ color: hovered ? '#0071e3' : '#a1a1aa' }}></i>
          {name}
        </div>
      </Html>
    </group>
  );
}

// Dynamic constellation connections for skills canvas
function SkillsConnections({ nodes }) {
  const lineRef = useRef();

  useFrame(() => {
    if (lineRef.current) {
      const linePositions = [];
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dist = Math.hypot(
            nodes[i].pos[0] - nodes[j].pos[0],
            nodes[i].pos[1] - nodes[j].pos[1],
            nodes[i].pos[2] - nodes[j].pos[2]
          );
          if (dist < 2.6) {
            linePositions.push(...nodes[i].pos);
            linePositions.push(...nodes[j].pos);
          }
        }
      }
      const floatArray = new Float32Array(linePositions);
      lineRef.current.geometry.setAttribute('position', new THREE.BufferAttribute(floatArray, 3));
      lineRef.current.geometry.setDrawRange(0, linePositions.length / 3);
      lineRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <lineSegments ref={lineRef}>
      <bufferGeometry />
      <lineBasicMaterial color="#0071e3" transparent opacity={0.16} />
    </lineSegments>
  );
}

// Tech constellation nodes container
export default function SkillsConstellation({ setHoveredNode }) {
  const skills = [
    { name: 'React.js', icon: 'fa-code', pos: [-2.2, 1.2, 0] },
    { name: 'TypeScript', icon: 'fa-layer-group', pos: [-0.8, 1.4, -0.5] },
    { name: 'Java', icon: 'fa-microchip', pos: [0.8, 1.5, 0.5] },
    { name: 'Python', icon: 'fa-terminal', pos: [2.2, 1.1, 0] },
    { name: 'PostgreSQL', icon: 'fa-database', pos: [-2.4, -0.2, 0.4] },
    { name: 'Flask', icon: 'fa-server', pos: [-0.9, -0.4, -0.6] },
    { name: 'FastAPI', icon: 'fa-server', pos: [0.9, -0.3, 0.6] },
    { name: 'Docker', icon: 'fa-layer-group', pos: [2.4, -0.1, -0.4] },
    { name: 'Cybersecurity', icon: 'fa-lock', pos: [-1.6, -1.3, 0] },
    { name: 'Nmap', icon: 'fa-magnifying-glass', pos: [-0.4, -1.4, 0.5] },
    { name: 'Burp Suite', icon: 'fa-eye', pos: [0.8, -1.5, -0.5] },
    { name: 'Wireshark', icon: 'fa-desktop', pos: [1.8, -1.2, 0] }
  ];

  return (
    <>
      {skills.map((s, idx) => (
        <SkillNode3D 
          key={idx} 
          {...s} 
          setHoveredNode={setHoveredNode} 
        />
      ))}
      <SkillsConnections nodes={skills} />
    </>
  );
}
