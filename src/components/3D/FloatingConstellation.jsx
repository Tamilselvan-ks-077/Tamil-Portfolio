import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

export default function FloatingConstellation({ easterTriggered }) {
  const pointsRef = useRef();
  const count = 350;

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vels = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 2] = Math.random() * 10 - 8;
      
      vels[i * 3] = (Math.random() - 0.5) * 0.002;
      vels[i * 3 + 1] = Math.random() * 0.0015 + 0.0005;
      vels[i * 3 + 2] = (Math.random() - 0.5) * 0.002;
    }
    return [pos, vels];
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (!pointsRef.current) return;
    const geoArray = pointsRef.current.geometry.attributes.position.array;

    for (let i = 0; i < count; i++) {
      if (easterTriggered) {
        // Spiral galaxy formation
        const theta = time * 1.2 + (i * 0.06);
        const radius = (i % 25) * 0.2 + 0.5;
        const targetX = Math.cos(theta) * radius;
        const targetY = Math.sin(theta) * radius;
        const targetZ = -2 - (i % 20) * 0.12;

        geoArray[i * 3] = THREE.MathUtils.lerp(geoArray[i * 3], targetX, 0.05);
        geoArray[i * 3 + 1] = THREE.MathUtils.lerp(geoArray[i * 3 + 1], targetY, 0.05);
        geoArray[i * 3 + 2] = THREE.MathUtils.lerp(geoArray[i * 3 + 2], targetZ, 0.05);
      } else {
        // Calm drifting
        geoArray[i * 3] += velocities[i * 3];
        geoArray[i * 3 + 1] += velocities[i * 3 + 1];
        geoArray[i * 3 + 2] += velocities[i * 3 + 2];

        // Reset particles that drift too high
        if (geoArray[i * 3 + 1] > 8) {
          geoArray[i * 3 + 1] = -8;
          geoArray[i * 3] = (Math.random() - 0.5) * 16;
        }
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    pointsRef.current.rotation.y = time * 0.008;
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3}>
      <PointMaterial
        transparent
        color={easterTriggered ? '#38bdf8' : '#a1a1aa'}
        size={0.06}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={easterTriggered ? 0.65 : 0.18}
      />
    </Points>
  );
}
