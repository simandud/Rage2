import React, { useRef, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';

/**
 * COMPONENTE GLB CON EFECTO CROMADO PROFESIONAL + TEXTURAS VISIBLES
 * ¡ESPEJO METAL BRILLANTE PERO VES EL MODELO!
 */
export const GLBBackground: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const [model, setModel] = useState<THREE.Object3D | null>(null);
  const { scene } = useThree();

  useEffect(() => {
    // ═══════════════════════════════════════════════════════════════════════
    // ILUMINACIÓN CROMADA PROFESIONAL
    // ═══════════════════════════════════════════════════════════════════════
    
    // Luz ambiental blanca para que brille el cromado
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.8);
    scene.add(ambientLight);
    console.log('✓ Ambient Light Cromada: 1.8 intensidad');
    
    // ─────────────────────────────────────────────────────────────────────
    // DIRECTIONAL LIGHTS - Para reflejos de cromado
    // ─────────────────────────────────────────────────────────────────────
    
    // Luz principal blanca pura (para reflejos cromados)
    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 2.8);
    directionalLight1.position.set(30, 30, 30);
    directionalLight1.castShadow = true;
    scene.add(directionalLight1);
    console.log('✓ DirectionalLight 1 (Blanca): 2.8 intensidad');
    
    // Luz secundaria blanca
    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 2.2);
    directionalLight2.position.set(-30, 20, -30);
    directionalLight2.castShadow = true;
    scene.add(directionalLight2);
    console.log('✓ DirectionalLight 2 (Blanca): 2.2 intensidad');
    
    // Luz fría azulada para efecto profesional
    const directionalLight3 = new THREE.DirectionalLight(0xd0e8ff, 1.5);
    directionalLight3.position.set(0, 40, 10);
    scene.add(directionalLight3);
    console.log('✓ DirectionalLight 3 (Azul Claro): 1.5 intensidad');
    
    // ─────────────────────────────────────────────────────────────────────
    // POINT LIGHTS - Para reflejos de cromado desde todos lados
    // ─────────────────────────────────────────────────────────────────────
    
    // Luz blanca brillante frente
    const pointLight1 = new THREE.PointLight(0xffffff, 3.0, 150);
    pointLight1.position.set(25, 25, 25);
    scene.add(pointLight1);
    console.log('✓ PointLight 1 (Blanco Puro): 3.0 intensidad');
    
    // Luz blanca otro ángulo
    const pointLight2 = new THREE.PointLight(0xffffff, 2.5, 120);
    pointLight2.position.set(-25, 20, -25);
    scene.add(pointLight2);
    console.log('✓ PointLight 2 (Blanco Puro): 2.5 intensidad');
    
    // Luz azul claro para contraste
    const pointLight3 = new THREE.PointLight(0xe0f4ff, 2.0, 100);
    pointLight3.position.set(20, -10, 20);
    scene.add(pointLight3);
    console.log('✓ PointLight 3 (Azul Claro): 2.0 intensidad');
    
    // Luz blanca cálida sutil para profundidad
    const pointLight4 = new THREE.PointLight(0xfffacd, 1.8, 100);
    pointLight4.position.set(-20, 10, -20);
    scene.add(pointLight4);
    console.log('✓ PointLight 4 (Blanco Cálido): 1.8 intensidad');
    
    // ─────────────────────────────────────────────────────────────────────
    // SPOT LIGHTS - Para crear reflejos cromados intensos
    // ─────────────────────────────────────────────────────────────────────
    
    // Spot light blanco puro
    const spotLight1 = new THREE.SpotLight(0xffffff, 3.5, 150, Math.PI / 3, 0.5, 1.0);
    spotLight1.position.set(40, 40, 40);
    spotLight1.target.position.set(0, 0, 0);
    scene.add(spotLight1);
    scene.add(spotLight1.target);
    console.log('✓ SpotLight 1 (Blanco Puro): 3.5 intensidad');
    
    // Spot light azul
    const spotLight2 = new THREE.SpotLight(0xb3e5fc, 2.8, 120, Math.PI / 3, 0.5, 1.0);
    spotLight2.position.set(-40, 30, -40);
    spotLight2.target.position.set(0, 0, 0);
    scene.add(spotLight2);
    scene.add(spotLight2.target);
    console.log('✓ SpotLight 2 (Azul Claro): 2.8 intensidad');
    
    // ═══════════════════════════════════════════════════════════════════════
    // CARGAR GLB CON MATERIAL CROMADO REALISTA
    // ═══════════════════════════════════════════════════════════════════════
    
    const loader = new GLTFLoader();
    
    loader.load(
      '/assets/nam3.glb',
      (gltf) => {
        console.log('✓ GLB cargado para cromado profesional');
        
        const clonedScene = gltf.scene.clone();
        
        // Aplicar material cromado realista
        clonedScene.traverse((child: any) => {
          if (child instanceof THREE.Mesh) {
            // MATERIAL CROMADO PROFESIONAL
            // Combina metalness alto con roughness moderada para que se vea real
            child.material = new THREE.MeshStandardMaterial({
              color: 0xe8e8e8,           // Gris plata muy claro
              metalness: 0.95,           // Alto metalness (muy reflectante)
              roughness: 0.08,           // Bajo roughness (pulido, espejo) pero no perfecto
              envMapIntensity: 2.5,      // Reflejos del environment
              emissive: 0x444444,        // Pequeño glow
              emissiveIntensity: 0.15,   // Sutil
              side: THREE.DoubleSide,    // Ver ambos lados
            });
            
            // Sombras para realismo
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });
        
        clonedScene.scale.set(1.5, 1.5, 1.5);
        setModel(clonedScene);
        
        console.log('✓ Material cromado aplicado: METALNESS 0.95, ROUGHNESS 0.08');
        console.log('✓ Efecto espejo profesional activado');
      },
      (progress) => {
        const percent = Math.round((progress.loaded / progress.total) * 100);
        console.log(`Cargando GLB: ${percent}%`);
      },
      (error) => {
        console.error('✗ Error cargando GLB:', error);
      }
    );
    
    // Limpiar al desmontar
    return () => {
      scene.remove(ambientLight);
      scene.remove(directionalLight1);
      scene.remove(directionalLight2);
      scene.remove(directionalLight3);
      scene.remove(pointLight1);
      scene.remove(pointLight2);
      scene.remove(pointLight3);
      scene.remove(pointLight4);
      scene.remove(spotLight1);
      scene.remove(spotLight2);
      console.log('✓ Iluminación cromada limpiada');
    };
  }, [scene]);

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Rotación suave para ver los reflejos cromados
      groupRef.current.rotation.y += delta * 0.15;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.3;
      groupRef.current.rotation.z += delta * 0.05;
      
      // Movimiento vertical sutil
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 2;
    }
  });

  if (!model) {
    return null;
  }

  return (
    <group 
      ref={groupRef} 
      position={[0, 5, -25]}
      scale={1}
    >
      <primitive object={model} />
    </group>
  );
};