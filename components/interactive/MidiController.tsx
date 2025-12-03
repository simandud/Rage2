// components/interactive/MidiController.tsx
import React, { useRef, useState } from "react";
import { useFrame, ThreeEvent } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";

// --- Materials ---
const matBase = new THREE.MeshStandardMaterial({
  color: "#1a1a1a",
  roughness: 0.4,
  metalness: 0.8,
});
const matKeyWhite = new THREE.MeshStandardMaterial({
  color: "#f0f0f0",
  roughness: 0.2,
  metalness: 0.1,
});
const matKeyBlack = new THREE.MeshStandardMaterial({
  color: "#111111",
  roughness: 0.2,
  metalness: 0.3,
});

// Helper for glowing materials
const getEmissiveMat = (color: string, intensity: number) =>
  new THREE.MeshStandardMaterial({
    color: intensity > 0 ? color : "#333333",
    emissive: color,
    emissiveIntensity: intensity,
    toneMapped: false,
    roughness: 0.4,
    metalness: 0.5,
  });

// Audio Feedback Helper
const playTone = (freq: number, type: OscillatorType = "sine") => {
  try {
    const ctx =
      new (window.AudioContext ||
        (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    gain.connect(ctx.destination);
    osc.connect(gain);

    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(
      0.001,
      ctx.currentTime + 0.3
    );

    osc.start();
    osc.stop(ctx.currentTime + 0.3);
  } catch {
    // ignorar errores de audio (ej. sin interacción previa)
  }
};

// --- Props ---

interface PartProps {
  position: [number, number, number];
  onClick?: (e: ThreeEvent<MouseEvent>) => void;
  onHover?: (
    e: ThreeEvent<PointerEvent>,
    name: string
  ) => void;
  onOut?: (e: ThreeEvent<PointerEvent>) => void;
  isHovered?: boolean;
}

// --- Sub-Components ---

const PianoKey: React.FC<
  PartProps & { type: "white" | "black" }
> = ({
  position,
  type,
  onClick,
  onHover,
  onOut,
  isHovered,
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [pressed, setPressed] = useState(false);
  const pressTimer = useRef<number>(0);

  useFrame((_, delta) => {
    if (meshRef.current) {
      const targetRotX = pressed ? 0.15 : 0;
      meshRef.current.rotation.x =
        THREE.MathUtils.lerp(
          meshRef.current.rotation.x,
          targetRotX,
          delta * 30
        );
    }
  });

  const handleDown = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setPressed(true);
    playTone(
      type === "white" ? 261.63 : 311.13,
      "triangle"
    );

    if (pressTimer.current) clearTimeout(pressTimer.current);
    pressTimer.current = window.setTimeout(
      () => setPressed(false),
      200
    );

    onClick && onClick(e as any);
  };

  const handleUp = () => {
    setPressed(false);
  };

  const args: [number, number, number] =
    type === "white"
      ? [0.8, 0.4, 2.8]
      : [0.5, 0.5, 1.8];
  const radius = type === "white" ? 0.05 : 0.02;
  const material = type === "white" ? matKeyWhite : matKeyBlack;
  const emissiveColor =
    type === "white" ? "#a5f3fc" : "#22d3ee";

  return (
    <group position={position}>
      <RoundedBox
        ref={meshRef}
        args={args}
        radius={radius}
        material={material}
        onPointerDown={handleDown}
        onPointerUp={handleUp}
        onPointerLeave={handleUp}
        onPointerOver={(e) =>
          onHover && onHover(e, "ARTISTS")
        }
        onPointerOut={onOut}
        castShadow
        receiveShadow
      >
        {(isHovered || pressed) && (
          <meshStandardMaterial
            color={type === "white" ? "#fff" : "#222"}
            emissive={emissiveColor}
            emissiveIntensity={pressed ? 2.0 : 0.5}
          />
        )}
      </RoundedBox>
    </group>
  );
};

const Knob: React.FC<PartProps> = ({
  position,
  onClick,
  onHover,
  onOut,
  isHovered,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const [value] = useState(Math.random());
  const [isSpinning, setIsSpinning] = useState(false);

  const handlePointerDown = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setIsSpinning(true);
    playTone(600, "sine");
    onClick && onClick(e as any);
    setTimeout(() => setIsSpinning(false), 500);
  };

  useFrame((_, delta) => {
    if (groupRef.current) {
      if (isSpinning) {
        groupRef.current.rotation.y += delta * 20;
      } else {
        const targetRot = THREE.MathUtils.lerp(
          -2.3,
          2.3,
          value
        );
        groupRef.current.rotation.y =
          THREE.MathUtils.lerp(
            groupRef.current.rotation.y,
            targetRot,
            delta * 5
          );
      }
    }
  });

  return (
    <group position={position}>
      <group ref={groupRef}>
        <mesh
          position={[0, 0.3, 0]}
          onPointerDown={handlePointerDown}
          onPointerOver={(e) =>
            onHover && onHover(e, "EVENTS")
          }
          onPointerOut={onOut}
          castShadow
        >
          <cylinderGeometry
            args={[0.35, 0.35, 0.6, 32]}
          />
          <primitive
            object={getEmissiveMat(
              "#06b6d4",
              isHovered || isSpinning
                ? isSpinning
                  ? 2.0
                  : 0.8
                : 0.2
            )}
            attach="material"
          />
        </mesh>
        <mesh
          position={[0, 0.61, 0.15]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <boxGeometry
            args={[0.08, 0.25, 0.02]}
          />
          <meshBasicMaterial color="#fff" />
        </mesh>
      </group>
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry
          args={[0.45, 0.5, 0.1, 32]}
        />
        <meshStandardMaterial color="#222" />
      </mesh>
    </group>
  );
};

const Slider: React.FC<PartProps> = ({
  position,
  onClick,
  onHover,
  onOut,
  isHovered,
}) => {
  const handleRef = useRef<THREE.Mesh>(null);
  const [value, setValue] = useState(0.5);
  const [isAnimating, setIsAnimating] = useState(false);

  const handlePointerDown = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setIsAnimating(true);
    setValue(Math.random());
    playTone(400, "sawtooth");
    onClick && onClick(e as any);
    setTimeout(() => setIsAnimating(false), 300);
  };

  useFrame((_, delta) => {
    if (handleRef.current) {
      const targetZ = THREE.MathUtils.lerp(
        -0.8,
        0.8,
        value
      );
      handleRef.current.position.z =
        THREE.MathUtils.lerp(
          handleRef.current.position.z,
          targetZ,
          delta * (isAnimating ? 20 : 5)
        );
    }
  });

  return (
    <group position={position}>
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0.01, 0]}
      >
        <planeGeometry args={[0.15, 2.2]} />
        <meshStandardMaterial
          color="#000"
          roughness={0.8}
        />
      </mesh>
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0.02, 0]}
      >
        <planeGeometry args={[0.02, 2]} />
        <meshBasicMaterial color="#333" />
      </mesh>

      <RoundedBox
        ref={handleRef}
        args={[0.5, 0.3, 0.6]}
        radius={0.05}
        position={[0, 0.2, 0]}
        onPointerDown={handlePointerDown}
        onPointerOver={(e) =>
          onHover && onHover(e, "NEWS")
        }
        onPointerOut={onOut}
        castShadow
      >
        <primitive
          object={getEmissiveMat(
            "#8b5cf6",
            isHovered || isAnimating
              ? isAnimating
                ? 1.5
                : 0.8
              : 0.2
          )}
          attach="material"
        />
        <mesh
          position={[0, 0.16, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <planeGeometry args={[0.4, 0.05]} />
          <meshBasicMaterial color="white" />
        </mesh>
      </RoundedBox>
    </group>
  );
};

const Pad: React.FC<PartProps> = ({
  position,
  onClick,
  onHover,
  onOut,
  isHovered,
}) => {
  const [active, setActive] = useState(false);

  const handleDown = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    setActive(true);
    playTone(100, "square");
    onClick && onClick(e);
    setTimeout(() => setActive(false), 200);
  };

  return (
    <mesh
      position={position}
      onPointerDown={handleDown}
      onPointerOver={(e) =>
        onHover && onHover(e, "RELEASES")
      }
      onPointerOut={onOut}
    >
      <boxGeometry args={[0.9, 0.15, 0.9]} />
      <primitive
        object={getEmissiveMat(
          active ? "#ffffff" : "#ec4899",
          active ? 5.0 : isHovered ? 0.8 : 0.1
        )}
        attach="material"
      />
    </mesh>
  );
};

export const MidiController: React.FC = () => {
  const [hoveredMesh, setHoveredMesh] =
    useState<string | null>(null);
  const groupRef = useRef<THREE.Group>(null);

  // flotadito
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y =
        -Math.PI / 6 +
        Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
      groupRef.current.rotation.z =
        Math.cos(state.clock.elapsedTime * 0.3) * 0.02;
      groupRef.current.position.y =
        Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  const handlePointerOver = (
    e: ThreeEvent<PointerEvent>,
    partName: string,
    _label: string
  ) => {
    e.stopPropagation();
    document.body.style.cursor = "pointer";
    setHoveredMesh(partName);
  };

  const handlePointerOut = (
    e: ThreeEvent<PointerEvent>
  ) => {
    e.stopPropagation();
    document.body.style.cursor = "auto";
    setHoveredMesh(null);
  };

  // Navegación: hace scroll a la sección del HTML (Overlay)
  const handleInteraction = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <group
      ref={groupRef}
      rotation={[-Math.PI / 6, 0, 0]}
      position={[0, -0.5, 0]}
    >
      {/* Main Chassis */}
      <RoundedBox
        args={[12, 1, 8]}
        radius={0.2}
        smoothness={4}
        position={[0, -0.5, 0]}
        material={matBase}
        receiveShadow
        castShadow
      />

      {/* Side Panels */}
      <RoundedBox
        args={[1, 1.2, 8]}
        radius={0.1}
        position={[-6.2, -0.4, 0]}
        material={
          new THREE.MeshStandardMaterial({
            color: "#222",
          })
        }
      />
      <RoundedBox
        args={[1, 1.2, 8]}
        radius={0.1}
        position={[6.2, -0.4, 0]}
        material={
          new THREE.MeshStandardMaterial({
            color: "#222",
          })
        }
      />

      {/* KEYS -> ARTISTS */}
      <group position={[-2.5, 0.1, 2.5]}>
        {Array.from({ length: 7 }).map((_, i) => (
          <PianoKey
            key={`wk-${i}`}
            type="white"
            position={[i * 0.85 - 2.5, 0, 0]}
            isHovered={
              hoveredMesh === `Key-W-${i}`
            }
            onHover={(e) =>
              handlePointerOver(
                e,
                `Key-W-${i}`,
                "ARTISTS"
              )
            }
            onOut={handlePointerOut}
            onClick={() => handleInteraction("artists")}
          />
        ))}
        {[0, 1, 3, 4, 5].map((i) => (
          <PianoKey
            key={`bk-${i}`}
            type="black"
            position={[
              i * 0.85 - 2.5 + 0.425,
              0.2,
              -0.5,
            ]}
            isHovered={
              hoveredMesh === `Key-B-${i}`
            }
            onHover={(e) =>
              handlePointerOver(
                e,
                `Key-B-${i}`,
                "ARTISTS"
              )
            }
            onOut={handlePointerOut}
            onClick={() => handleInteraction("artists")}
          />
        ))}
      </group>

      {/* PADS -> RELEASES */}
      <group position={[3.5, 0.1, 2]}>
        {Array.from({ length: 8 }).map(
          (_, i) => {
            const row = Math.floor(i / 4);
            const col = i % 4;
            return (
              <Pad
                key={`pad-${i}`}
                position={[
                  col * 1.1 - 1.6,
                  0.05,
                  row * 1.1 - 0.5,
                ]}
                isHovered={
                  hoveredMesh === `Pad-${i}`
                }
                onHover={(e) =>
                  handlePointerOver(
                    e,
                    `Pad-${i}`,
                    "RELEASES"
                  )
                }
                onOut={handlePointerOut}
                onClick={() =>
                  handleInteraction("releases")
                }
              />
            );
          }
        )}
      </group>

      {/* KNOBS -> EVENTS */}
      <group position={[-2.5, 0.1, -2]}>
        {Array.from({ length: 6 }).map((_, i) => (
          <Knob
            key={`knob-${i}`}
            position={[i * 1.1 - 2.7, 0, 0]}
            isHovered={
              hoveredMesh === `Knob-${i}`
            }
            onHover={(e) =>
              handlePointerOver(
                e,
                `Knob-${i}`,
                "EVENTS"
              )
            }
            onOut={handlePointerOut}
            onClick={() =>
              handleInteraction("events")
            }
          />
        ))}
      </group>

      {/* SLIDERS -> NEWS */}
      <group position={[3.5, 0.1, -2]}>
        {Array.from({ length: 4 }).map((_, i) => (
          <Slider
            key={`slider-${i}`}
            position={[i * 1.1 - 1.6, 0, 0]}
            isHovered={
              hoveredMesh === `Slider-${i}`
            }
            onHover={(e) =>
              handlePointerOver(
                e,
                `Slider-${i}`,
                "NEWS"
              )
            }
            onOut={handlePointerOut}
            onClick={() =>
              handleInteraction("news")
            }
          />
        ))}
      </group>

      {/* LOGO -> INTRO */}
      <group position={[0, 0.1, -3]}>
        <mesh
          onPointerOver={(e) =>
            handlePointerOver(
              e as any,
              "Display",
              "HOME"
            )
          }
          onPointerOut={(e) =>
            handlePointerOut(e as any)
          }
          onClick={() => handleInteraction("intro")}
          position={[0, 0.05, 0]}
        >
          <boxGeometry args={[3, 0.2, 1]} />
          <meshStandardMaterial
            color="#000"
            roughness={0.1}
            metalness={0.9}
          />
        </mesh>
        <mesh
          position={[0, 0.16, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <planeGeometry args={[2.8, 0.8]} />
          <meshBasicMaterial
            color={
              hoveredMesh === "Display"
                ? "#f97316"
                : "#111"
            }
          />
        </mesh>
      </group>
    </group>
  );
};

export default MidiController;
