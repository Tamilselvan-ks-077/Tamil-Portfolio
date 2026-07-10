import React, { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { HologramShaderMaterial } from './shaders/HologramShaderMaterial';

// Orbit skill node inside InteractiveAvatar
function OrbitNode({ label, icon, pos, color, setHoveredNode }) {
  const nodeRef = useRef();
  const [hovered, setHovered] = useState(false);
  const scaleTarget = hovered ? 1.25 : 1.0;

  useFrame((state) => {
    if (nodeRef.current) {
      nodeRef.current.quaternion.copy(state.camera.quaternion);
      const s = nodeRef.current.scale.x;
      const nextScale = THREE.MathUtils.lerp(s, scaleTarget, 0.12);
      nodeRef.current.scale.set(nextScale, nextScale, nextScale);
    }
  });

  const handlePointerOver = (e) => {
    e.stopPropagation();
    setHovered(true);
    setHoveredNode(label);
  };

  const handlePointerOut = () => {
    setHovered(false);
    setHoveredNode(null);
  };

  return (
    <group ref={nodeRef} position={pos}>
      <mesh 
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <sphereGeometry args={[0.18, 32, 32]} />
        <meshPhysicalMaterial 
          color={hovered ? color : '#ffffff'} 
          transmission={0.85}
          roughness={0.1}
          metalness={0.2}
          ior={1.45}
          thickness={0.08}
          transparent
          opacity={0.9}
        />
      </mesh>
      
      {hovered && (
        <mesh>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshBasicMaterial color={color} transparent opacity={0.12} wireframe />
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
            padding: '6px 12px',
            borderRadius: '16px',
            fontSize: '11px',
            fontWeight: 600,
            fontFamily: 'var(--font-sans)',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            opacity: hovered ? 1 : 0,
            transform: hovered ? 'scale(1) translateY(-5px)' : 'scale(0.8) translateY(0px)',
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <i className={`fa-solid ${icon}`} style={{ color }}></i>
          {label}
        </div>
      </Html>
    </group>
  );
}

export default function InteractiveAvatar({ profileImg }) {
  const cardRef = useRef();
  const orbitGroupRef = useRef();
  const texture = useTexture(profileImg);
  const [hoveredNode, setHoveredNode] = useState(null);

  // Setup hologram shader material memoized
  const shaderMaterial = useMemo(() => {
    const mat = new THREE.ShaderMaterial({
      uniforms: THREE.UniformsUtils.clone(HologramShaderMaterial.uniforms),
      vertexShader: HologramShaderMaterial.vertexShader,
      fragmentShader: HologramShaderMaterial.fragmentShader,
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide
    });
    mat.uniforms.uTexture.value = texture;
    return mat;
  }, [texture]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const { x, y } = state.pointer;

    // Update uTime uniform inside shader
    if (shaderMaterial) {
      shaderMaterial.uniforms.uTime.value = time;
    }

    // Smoothly tilt card based on mouse coord
    if (cardRef.current) {
      const targetRotationY = x * 0.25;
      const targetRotationX = -y * 0.25;
      cardRef.current.rotation.y = THREE.MathUtils.lerp(cardRef.current.rotation.y, targetRotationY, 0.08);
      cardRef.current.rotation.x = THREE.MathUtils.lerp(cardRef.current.rotation.x, targetRotationX, 0.08);
      cardRef.current.position.y = Math.sin(time * 1.5) * 0.05;
    }

    if (orbitGroupRef.current) {
      orbitGroupRef.current.rotation.y = time * 0.1;
    }
  });

  const nodes = [
    { label: 'React.js', icon: 'fa-code', pos: [1.8, 0.6, 0.2], color: '#0071e3' },
    { label: 'Python', icon: 'fa-terminal', pos: [-1.8, -0.6, -0.2], color: '#a1a1aa' },
    { label: 'Java', icon: 'fa-microchip', pos: [0.3, 1.7, 1.1], color: '#0071e3' },
    { label: 'Flask', icon: 'fa-server', pos: [-0.3, -1.7, -1.1], color: '#a1a1aa' },
    { label: 'PostgreSQL', icon: 'fa-database', pos: [1.1, -1.1, 1.1], color: '#0071e3' },
    { label: 'FastAPI', icon: 'fa-server', pos: [-1.2, 1.2, -1.1], color: '#a1a1aa' },
    { label: 'Three.js', icon: 'fa-cube', pos: [1.2, 1.3, -0.8], color: '#0071e3' }
  ];

  return (
    <group>
      {/* Orbit Rings */}
      <mesh rotation={[Math.PI / 2.2, 0, 0]}>
        <torusGeometry args={[2.2, 0.005, 8, 64]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.03} />
      </mesh>
      <mesh rotation={[0, 0, Math.PI / 3]}>
        <torusGeometry args={[2.5, 0.004, 8, 64]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.02} />
      </mesh>

      {/* Orbiting Nodes */}
      <group ref={orbitGroupRef}>
        {nodes.map((node, i) => (
          <OrbitNode 
            key={i} 
            {...node} 
            setHoveredNode={setHoveredNode}
          />
        ))}
      </group>

      {/* Holographic avatar card */}
      <group ref={cardRef}>
        {/* Border */}
        <mesh>
          <planeGeometry args={[2.08, 2.08]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.12} side={THREE.DoubleSide} />
        </mesh>
        
        {/* Hologram custom shader plane */}
        <mesh position={[0, 0, 0.01]}>
          <planeGeometry args={[2.0, 2.0]} />
          <primitive object={shaderMaterial} attach="material" />
        </mesh>

        {/* Physical glass overlay */}
        <mesh position={[0, 0, 0.02]}>
          <planeGeometry args={[2.0, 2.0]} />
          <meshPhysicalMaterial 
            color="#ffffff"
            transparent
            opacity={0.08}
            roughness={0.05}
            metalness={0.2}
            transmission={0.92}
            ior={1.48}
            thickness={0.12}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>
    </group>
  );
}
