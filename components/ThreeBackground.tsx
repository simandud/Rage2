import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll, Stars, Plane } from '@react-three/drei';
import * as THREE from 'three';

export const ThreeBackground: React.FC = () => {
  const scroll = useScroll();
  const terrainRef = useRef<THREE.Mesh>(null);
  const starsRef = useRef<THREE.Group>(null);
  const gridRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);

  // Create floating particles
  const particlesGeometry = useMemo(() => {
    const count = 1000;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 100;
      positions[i + 1] = (Math.random() - 0.5) * 100;
      positions[i + 2] = (Math.random() - 0.5) * 100;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, []);

  useFrame((state, delta) => {
    // Scroll offset (0 to 1)
    const offset = scroll.offset;
    const time = state.clock.elapsedTime;

    // Terrain Animation: Move texture or position to simulate flight
    if (terrainRef.current) {
      // Move terrain towards camera (z-axis) and loop it
      // We simulate movement by offsetting position based on time
      terrainRef.current.position.z = (time * 5) % 20; 
      
      // Slight tilt based on scroll
      terrainRef.current.rotation.x = -Math.PI / 2 + (offset * 0.05);
    }

    if (gridRef.current) {
        gridRef.current.position.z = (time * 5) % 20;
        gridRef.current.rotation.x = -Math.PI / 2 + (offset * 0.05);
    }

    // Stars Animation: Rotate and subtle zoom
    if (starsRef.current) {
      starsRef.current.rotation.z = time * 0.02;
      starsRef.current.rotation.y = offset * 0.2;
    }

    // Particles Animation: Float and rotate
    if (particlesRef.current) {
      particlesRef.current.rotation.y = time * 0.05;
      particlesRef.current.rotation.x = time * 0.02;

      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 1; i < positions.length; i += 3) {
        positions[i] = positions[i] + Math.sin(time + positions[i]) * 0.01;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }

    // Camera sway based on mouse pointer
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, state.pointer.x * 0.5, delta);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, state.pointer.y * 0.5, delta);
  });

  return (
    <>
      <color attach="background" args={['#010103']} />
      <fog attach="fog" args={['#010103', 5, 45]} />

      <group ref={starsRef}>
         <Stars radius={80} depth={50} count={6000} factor={4} saturation={0} fade speed={1} />
      </group>

      {/* Floating Particles */}
      <points ref={particlesRef} geometry={particlesGeometry}>
        <pointsMaterial
          size={0.05}
          color="#00d4ff"
          transparent
          opacity={0.6}
          sizeAttenuation
          depthWrite={false}
        />
      </points>

      {/* Digital Terrain - Wireframe Grid */}
      <Plane 
        ref={gridRef}
        args={[100, 100, 40, 40]} 
        position={[0, -4, -10]} 
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <meshBasicMaterial 
          color="#0055ff"
          wireframe
          transparent
          opacity={0.15}
        />
      </Plane>
      
      {/* Glow Plane underneath to give depth */}
      <Plane 
        args={[200, 200]} 
        position={[0, -8, -20]} 
        rotation={[-Math.PI / 2, 0, 0]}
      >
         <meshBasicMaterial color="#000510" />
      </Plane>

      <ambientLight intensity={0.5} color="#001133" />
      <pointLight position={[0, 10, -10]} intensity={2} color="#00d4ff" distance={50} />
      <spotLight position={[0, 0, 10]} angle={0.5} penumbra={1} intensity={1} color="#aa00ff" />
    </>
  );
};