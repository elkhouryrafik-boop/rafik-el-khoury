"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function Building() {
  const ref = useRef<THREE.Group>(null);
  const floors = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => i);
  }, []);

  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.18;
  });

  return (
    <group ref={ref}>
      {/* Site footprint */}
      <mesh position={[0, -0.05, 0]}>
        <boxGeometry args={[3.2, 0.05, 3.2]} />
        <meshBasicMaterial color="#111111" wireframe />
      </mesh>

      {/* Floors */}
      {floors.map((i) => (
        <mesh key={i} position={[0, 0.3 + i * 0.4, 0]}>
          <boxGeometry args={[2, 0.35, 2]} />
          <meshBasicMaterial
            color={i === 5 ? "#C8362D" : "#111111"}
            wireframe
            transparent
            opacity={i === 5 ? 1 : 0.7}
          />
        </mesh>
      ))}

      {/* Vertical rules */}
      {[-1, 1].map((x) =>
        [-1, 1].map((z) => (
          <line key={`${x}-${z}`}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                args={[new Float32Array([x, 0, z, x, 3.5, z]), 3]}
              />
            </bufferGeometry>
            <lineBasicMaterial color="#111111" transparent opacity={0.35} />
          </line>
        ))
      )}

      {/* Violation marker — pointing at floor 5 */}
      <mesh position={[1.3, 2.3, 1.3]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial color="#C8362D" />
      </mesh>
    </group>
  );
}

export function ArchaiScene() {
  return (
    <Canvas
      camera={{ position: [4.5, 3, 4.5], fov: 40 }}
      style={{ background: "transparent" }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={1} />
      <Building />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.4} />
    </Canvas>
  );
}
