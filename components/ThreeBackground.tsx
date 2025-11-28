import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll, Stars, Plane } from '@react-three/drei';
import * as THREE from 'three';

/**
 * SISTEMA DE PARTÍCULAS CIRCULAR OPTIMIZADO
 */
const ParticleSystem: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null);

  const Particles = useMemo(() => {
    const TOTAL_PARTICLES = 10;
    
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(TOTAL_PARTICLES * 3);
    const colors = new Float32Array(TOTAL_PARTICLES * 3);
    const sizes = new Float32Array(TOTAL_PARTICLES);

    for (let i = 0; i < TOTAL_PARTICLES; i++) {
      const i3 = i * 3;

      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      const radius = Math.random() * 15 + 5;

      positions[i3] = Math.sin(phi) * Math.cos(theta) * radius;
      positions[i3 + 1] = Math.sin(phi) * Math.sin(theta) * radius;
      positions[i3 + 2] = Math.cos(phi) * radius - 20;

      const colorType = Math.random();
      
      if (colorType > 0.7) {
        colors[i3] = 0.95 + Math.random() * 0.05;
        colors[i3 + 1] = 0.95 + Math.random() * 0.05;
        colors[i3 + 2] = 1.0;
      } else if (colorType > 0.35) {
        colors[i3] = 0.2 + Math.random() * 0.3;
        colors[i3 + 1] = 0.5 + Math.random() * 0.4;
        colors[i3 + 2] = 1.0;
      } else {
        colors[i3] = 0.0;
        colors[i3 + 1] = 0.3 + Math.random() * 0.4;
        colors[i3 + 2] = 0.9 + Math.random() * 0.1;
      }

      sizes[i] = Math.random() * 2 + 0.2;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    return (
      <points ref={pointsRef} position={[0, 0, 0]}>
        <bufferGeometry attach="geometry" {...geometry} />
        <pointsMaterial
          attach="material"
          size={2}
          sizeAttenuation={true}
          vertexColors={true}
          transparent={true}
          opacity={0.85}
          map={createCanvasTexture()}
          alphaMap={createCanvasTexture()}
          alphaTest={0.1}
          depthWrite={false}
        />
      </points>
    );
  }, []);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    const positionAttribute = pointsRef.current.geometry.attributes.position;
    const positions = positionAttribute.array as Float32Array;
    const time = state.clock.elapsedTime;

    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i];
      const y = positions[i + 1];

      positions[i] += Math.sin(time * 0.15 + y * 0.1) * delta * 0.3;
      positions[i + 1] += Math.cos(time * 0.1 + x * 0.1) * delta * 0.25;
      positions[i + 2] += Math.sin(time * 0.08 + x * 0.05) * delta * 0.2;
    }

    positionAttribute.needsUpdate = true;
  });

  return <>{Particles}</>;
};

function createCanvasTexture(): THREE.Texture {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d')!;
  
  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
  gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.8)');
  gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 64, 64);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

/**
 * FUNCIÓN PARA INTERPOLAR COLORES HEX
 */
function lerpColor(color1: string, color2: string, t: number): string {
  const c1 = parseInt(color1.slice(1), 16);
  const c2 = parseInt(color2.slice(1), 16);

  const r1 = (c1 >> 16) & 255;
  const g1 = (c1 >> 8) & 255;
  const b1 = c1 & 255;

  const r2 = (c2 >> 16) & 255;
  const g2 = (c2 >> 8) & 255;
  const b2 = c2 & 255;

  const r = Math.round(r1 + (r2 - r1) * t);
  const g = Math.round(g1 + (g2 - g1) * t);
  const b = Math.round(b1 + (b2 - b1) * t);

  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}

/**
 * MAIN COMPONENT - AZUL OSCURO CON GRADIENTE AL SCROLL
 */
export const ThreeBackground: React.FC = () => {
  const scroll = useScroll();
  const starsRef = useRef<THREE.Group>(null);
  const gridRef = useRef<THREE.Mesh>(null);
  const sceneRef = useRef<THREE.Color>(new THREE.Color('#001a4d'));

  // ════════════════════════════════════════════════════════════════════════
  // PALETA DE AZULES OSCUROS - PROGRESIÓN DEL SCROLL
  // ════════════════════════════════════════════════════════════════════════
  // Posición scroll 0.0 → Azul oscuro (inicial)
  // Posición scroll 0.25 → Azul más oscuro
  // Posición scroll 0.5 → Azul muy oscuro
  // Posición scroll 0.75+ → Casi negro con matiz azul
  // ════════════════════════════════════════════════════════════════════════

  const BLUE_DARK_PALETTE = [
    '#2F82C5',    // 0.0  - Azul oscuro inicial
    '#001240',    // 0.15 - Azul más oscuro
    '#000d33',    // 0.3  - Azul muy oscuro
    '#000a26',    // 0.45 - Azul muy oscuro intenso
    '#000619',    // 0.6  - Casi negro con azul
    '#000410',    // 0.75 - Casi negro puro
    '#000208',    // 0.9  - Negro extremo oscuro
    '#000103',    // 1.0  - Negro total
  ];

  const GRID_COLOR = '#0055ff';
  const GRID_DENSITY = 60;
  const ANIMATION_SPEED = 5;

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const starCount = isMobile ? 2000 : 4000;

  useFrame((state, delta) => {
    const offset = Math.min(scroll.offset, 1); // Limitar a 0-1
    const time = state.clock.elapsedTime;

    // ════════════════════════════════════════════════════════════════════════
    // INTERPOLACIÓN SUAVE A TRAVÉS DE LA PALETA DE AZULES OSCUROS
    // ════════════════════════════════════════════════════════════════════════
    
    let backgroundColor: string;
    let gridOpacity = 0.15;
    let fogFar = 50;

    // Calcular índice en la paleta (0-7)
    const paletteIndex = offset * (BLUE_DARK_PALETTE.length - 1);
    const colorIndex = Math.floor(paletteIndex);
    const nextIndex = Math.min(colorIndex + 1, BLUE_DARK_PALETTE.length - 1);
    const t = paletteIndex - colorIndex;

    // Interpolar entre dos colores de la paleta
    const currentColor = BLUE_DARK_PALETTE[colorIndex];
    const nextColor = BLUE_DARK_PALETTE[nextIndex];
    backgroundColor = lerpColor(currentColor, nextColor, t);

    // Ajustar opacidad y fog según scroll
    gridOpacity = 0.15 * (1 - offset * 0.7); // Va disminuyendo
    fogFar = 50 - (offset * 20); // La niebla se acerca

    // Aplicar color de fondo
    state.scene.background = new THREE.Color(backgroundColor);

    // GRID ANIMACIÓN
    if (gridRef.current) {
      gridRef.current.position.z = (time * ANIMATION_SPEED) % 20;
      gridRef.current.rotation.x = -Math.PI / 2 + offset * 0.05;

      // Cambiar color y opacidad de la malla
      if (gridRef.current.material instanceof THREE.MeshBasicMaterial) {
        (gridRef.current.material as THREE.MeshBasicMaterial).color.setStyle(backgroundColor);
        (gridRef.current.material as THREE.MeshBasicMaterial).opacity = gridOpacity;
      }
    }

    // STARS ANIMACIÓN
    if (starsRef.current) {
      starsRef.current.rotation.z = time * 0.02;
      starsRef.current.rotation.y = offset * 0.2;
      
      // Reducir opacidad de las estrellas al scroll
      starsRef.current.children.forEach((child: any) => {
        if (child.material && child.material.opacity !== undefined) {
          child.material.opacity = 1 - (offset * 0.5); // Desvanecen más
        }
      });
    }

    // CAMERA FOLLOW MOUSE
    state.camera.position.x = THREE.MathUtils.lerp(
      state.camera.position.x,
      state.pointer.x * 0.3,
      delta * 0.5
    );
    state.camera.position.y = THREE.MathUtils.lerp(
      state.camera.position.y,
      state.pointer.y * 0.3,
      delta * 0.5
    );
  });

  return (
    <>
      {/* BACKGROUND COLOR - Azul oscuro, cambia con scroll */}
      <color attach="background" args={['#71BBE3']} />
      <fog attach="fog" args={['#2F82C5', 10, 50]} />

      {/* STARS */}
      <group ref={starsRef}>
        <Stars
          radius={80}
          depth={50}
          count={starCount}
          factor={4}
          saturation={0}
          fade
          speed={1}
        />
      </group>

      {/* GRID ANIMADO */}
      <Plane
        ref={gridRef}
        args={[100, 100, GRID_DENSITY, GRID_DENSITY]}
        position={[0, -4, -10]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <meshBasicMaterial
          color={GRID_COLOR}
          wireframe
          transparent
          opacity={0.15}
        />
      </Plane>

      {/* FONDO NEGRO PROFUNDO */}
      <Plane
        args={[200, 200]}
        position={[0, -8, -20]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <meshBasicMaterial color="#000d33" />
      </Plane>

      {/* PARTÍCULAS */}
      <ParticleSystem />

      {/* ════════════════════════════════════════════════════════
          ILUMINACIÓN MEGA EXTREMA - MÁXIMO BRILLO TOTAL
          ════════════════════════════════════════════════════════ */}

      {/* LUZ AMBIENTAL - MÁXIMA */}
      <ambientLight intensity={7.0} color="#ffffff" />

      {/* DIRECTIONAL LIGHTS - DESDE TODOS LADOS */}
      <directionalLight
        position={[20, 20, 20]}
        intensity={4}
        color="#ffffff"
      />

      <directionalLight
        position={[-20, 20, -20]}
        intensity={3.5}
        color="#ffffff"
      />

      <directionalLight
        position={[0, 25, 0]}
        intensity={3.5}
        color="#ffffff"
      />

      {/* POINT LIGHTS - MÚLTIPLES FUENTES */}
      <pointLight
        position={[25, 25, 20]}
        intensity={3}
        color="#00d4ff"
        distance={200}
      />

      <pointLight
        position={[-25, 25, -20]}
        intensity={3}
        color="#0088ff"
        distance={200}
      />

      <pointLight
        position={[0, -20, 0]}
        intensity={3}
        color="#00ccff"
        distance={180}
      />

      <pointLight
        position={[20, -15, 20]}
        intensity={2.8}
        color="#0099ff"
        distance={160}
      />

      <pointLight
        position={[-20, -15, -20]}
        intensity={2.8}
        color="#0077ff"
        distance={160}
      />

      <pointLight
        position={[30, 5, 0]}
        intensity={2.5}
        color="#aa00ff"
        distance={150}
      />

      <pointLight
        position={[-30, 5, 0]}
        intensity={2.5}
        color="#ff4400"
        distance={150}
      />

      {/* SPOT LIGHTS - FOCOS INTENSOS */}
      <spotLight
        position={[0, 40, 10]}
        angle={Math.PI / 2}
        penumbra={1}
        intensity={3}
        color="#ffffff"
        distance={300}
      />

      <spotLight
        position={[40, 20, 30]}
        angle={Math.PI / 3}
        penumbra={0.8}
        intensity={2.8}
        color="#00ddff"
        distance={250}
      />

      <spotLight
        position={[-40, 20, -30]}
        angle={Math.PI / 3}
        penumbra={0.8}
        intensity={2.8}
        color="#00bbff"
        distance={250}
      />

      {/* LUCES ADICIONALES - FILL LIGHTS */}
      <pointLight
        position={[15, 10, 15]}
        intensity={2.5}
        color="#ffffff"
        distance={120}
      />

      <pointLight
        position={[-15, 10, -15]}
        intensity={2.5}
        color="#ffffff"
        distance={120}
      />

      <pointLight
        position={[0, 0, 25]}
        intensity={2.2}
        color="#0066ff"
        distance={100}
      />

      <pointLight
        position={[0, 0, -25]}
        intensity={2.2}
        color="#0044ff"
        distance={100}
      />

      {/* LUCES DESDE ABAJO - CRITICAL */}
      <pointLight
        position={[0, -30, 0]}
        intensity={2.5}
        color="#008BBE"
        distance={150}
      />

    </>
  );
};
