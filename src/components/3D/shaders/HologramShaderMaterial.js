import * as THREE from 'three';

export const HologramShaderMaterial = {
  uniforms: {
    uTime: { value: 0 },
    uColor: { value: new THREE.Color('#0071e3') },
    uTexture: { value: null }
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float uTime;
    uniform vec3 uColor;
    uniform sampler2D uTexture;
    varying vec2 vUv;

    void main() {
      vec4 texColor = texture2D(uTexture, vUv);
      
      // 1. Horizontal scanlines
      float line = sin(vUv.y * 65.0 + uTime * 5.0) * 0.5 + 0.5;
      float scan = step(0.82, line) * 0.22;
      
      // 2. Slow moving glowing bar
      float bar = sin(vUv.y * 3.5 - uTime * 2.0) * 0.5 + 0.5;
      float barGlow = pow(bar, 8.0) * 0.12;
      
      // Combine original image texture with cyan/blue glow highlights
      vec3 finalColor = mix(texColor.rgb, uColor, 0.22) + vec3(scan + barGlow);
      
      // Control opacity based on original alpha and effect intensities
      gl_FragColor = vec4(finalColor, texColor.a * (0.85 + scan * 0.15 + barGlow * 0.15));
    }
  `
};
