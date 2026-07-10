import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

export default function DeviceMockup({ type, textureUrl }) {
  const groupRef = useRef();
  const texture = useTexture(textureUrl);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const { x, y } = state.pointer;
    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, x * 0.35, 0.06);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -y * 0.25 + 0.1, 0.06);
      groupRef.current.position.y = Math.sin(time * 1.2) * 0.04;
    }
  });

  if (type === 'laptop') {
    return (
      <group ref={groupRef} scale={1.1} position={[0, -0.2, 0]}>
        {/* Aluminum Base */}
        <mesh position={[0, -0.05, 0]}>
          <boxGeometry args={[2.6, 0.05, 1.8]} />
          <meshStandardMaterial color="#6b7280" metalness={0.85} roughness={0.15} />
        </mesh>
        
        {/* Trackpad */}
        <mesh position={[0, -0.022, 0.55]}>
          <boxGeometry args={[0.7, 0.001, 0.4]} />
          <meshStandardMaterial color="#374151" metalness={0.5} roughness={0.3} />
        </mesh>

        {/* Screen Lid */}
        <group position={[0, -0.025, -0.85]} rotation={[0.42, 0, 0]}>
          <mesh position={[0, 0.8, -0.02]}>
            <boxGeometry args={[2.6, 1.6, 0.04]} />
            <meshStandardMaterial color="#374151" metalness={0.8} roughness={0.2} />
          </mesh>
          <mesh position={[0, 0.8, 0.001]}>
            <planeGeometry args={[2.5, 1.5]} />
            <meshStandardMaterial map={texture} roughness={0.2} metalness={0.1} />
          </mesh>
          <mesh position={[0, 0.8, 0.002]}>
            <planeGeometry args={[2.5, 1.5]} />
            <meshPhysicalMaterial color="#ffffff" transparent opacity={0.1} roughness={0.05} metalness={0.9} transmission={0.5} ior={1.5} thickness={0.08} />
          </mesh>
        </group>
      </group>
    );
  }

  if (type === 'tablet') {
    return (
      <group ref={groupRef} scale={1.15} position={[0, 0, 0]}>
        <mesh>
          <boxGeometry args={[1.6, 2.2, 0.06]} />
          <meshStandardMaterial color="#4b5563" metalness={0.8} roughness={0.2} />
        </mesh>
        
        <mesh position={[0, 0, 0.031]}>
          <planeGeometry args={[1.45, 2.05]} />
          <meshStandardMaterial map={texture} roughness={0.2} metalness={0.1} />
        </mesh>

        <mesh position={[0, 0, 0.032]}>
          <planeGeometry args={[1.45, 2.05]} />
          <meshPhysicalMaterial color="#ffffff" transparent opacity={0.08} roughness={0.05} metalness={0.9} transmission={0.5} ior={1.5} thickness={0.08} />
        </mesh>
      </group>
    );
  }

  // phone
  return (
    <group ref={groupRef} scale={1.2} position={[0, 0, 0]}>
      <mesh>
        <boxGeometry args={[1.0, 2.0, 0.06]} />
        <meshStandardMaterial color="#1f2937" metalness={0.9} roughness={0.15} />
      </mesh>
      
      <mesh position={[0, 0, 0.031]}>
        <planeGeometry args={[0.92, 1.92]} />
        <meshStandardMaterial map={texture} roughness={0.2} metalness={0.1} />
      </mesh>

      <mesh position={[0, 0, 0.032]}>
        <planeGeometry args={[0.92, 1.92]} />
        <meshPhysicalMaterial color="#ffffff" transparent opacity={0.08} roughness={0.05} metalness={0.9} transmission={0.5} ior={1.5} thickness={0.08} />
      </mesh>
    </group>
  );
}
