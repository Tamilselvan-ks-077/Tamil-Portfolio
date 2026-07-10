import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Scene3D() {
  const groupRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.08;
      groupRef.current.rotation.x = Math.sin(time * 0.3) * 0.06;
    }
  });

  return (
    <group ref={groupRef} scale={1.1}>
      {[...Array(6)].map((_, i) => {
        const angle = (i / 6) * Math.PI * 2;
        const radius = 1.6;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = Math.sin(i * 1.5 + angle) * 0.4;

        return (
          <mesh 
            key={i} 
            position={[x, y, z]} 
            rotation={[Math.sin(i) * 0.4, Math.cos(i) * 0.4, i * 0.25]}
          >
            <boxGeometry args={[1.1, 0.7, 0.04]} />
            <meshPhysicalMaterial 
              color="#ffffff"
              transmission={0.9}
              roughness={0.05}
              metalness={0.1}
              ior={1.48}
              thickness={0.18}
              transparent
              opacity={0.75}
            />
          </mesh>
        );
      })}
      
      <pointLight position={[0, 0, 0]} intensity={2.5} color="#0071e3" />
      <pointLight position={[2, 2, 2]} intensity={1.5} color="#ffffff" />
      <pointLight position={[-2, -2, -2]} intensity={1} color="#a1a1aa" />
    </group>
  );
}
