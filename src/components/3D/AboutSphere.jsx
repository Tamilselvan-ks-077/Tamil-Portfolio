import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial } from '@react-three/drei';

export default function AboutSphere() {
  const sphereRef = useRef();
  const ringsRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (sphereRef.current) {
      sphereRef.current.rotation.y = time * 0.15;
      sphereRef.current.rotation.x = Math.sin(time * 0.5) * 0.1;
      sphereRef.current.position.y = Math.sin(time * 1.5) * 0.05;
    }
    if (ringsRef.current) {
      ringsRef.current.rotation.y = -time * 0.2;
      ringsRef.current.rotation.x = time * 0.08;
    }
  });

  return (
    <>
      <group ref={sphereRef}>
        {/* Outer Frosted Glass Sphere */}
        <mesh>
          <sphereGeometry args={[1.0, 32, 32]} />
          <meshPhysicalMaterial 
            color="#ffffff"
            transmission={0.88}
            roughness={0.08}
            metalness={0.15}
            ior={1.5}
            thickness={0.18}
            transparent
            opacity={0.65}
          />
        </mesh>
        
        {/* Central morphing plasma core */}
        <mesh>
          <sphereGeometry args={[0.38, 64, 64]} />
          <MeshDistortMaterial
            color="#0071e3"
            roughness={0.1}
            metalness={0.8}
            distort={0.42}
            speed={2.8}
          />
        </mesh>
      </group>

      {/* Orbiting rings */}
      <group ref={ringsRef}>
        <mesh rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[1.4, 0.015, 16, 100]} />
          <meshBasicMaterial color="#0071e3" transparent opacity={0.18} />
        </mesh>
        <mesh rotation={[-Math.PI / 4, Math.PI / 4, 0]}>
          <torusGeometry args={[1.65, 0.012, 16, 100]} />
          <meshBasicMaterial color="#a1a1aa" transparent opacity={0.12} />
        </mesh>
      </group>
    </>
  );
}
