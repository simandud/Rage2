import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll, Stars, Plane } from '@react-three/drei';
import * as THREE from 'three';

export const ThreeBackground: React.FC = () => {
  const scroll = useScroll();
  const terrainRef = useRef<THREE.Mesh>(null);
  const starsRef = useRef<THREE.Group>(null);
  const gridRef = useRef<THREE.Mesh>(null);

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