"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function ParetoFront() {
  const ref = useRef<THREE.Group>(null);
  const points = useMemo(() => {
    // Pareto-front-ish scatter: two-objective trade-off
    const pts: [number, number, number][] = [];
    for (let i = 0; i < 80; i++) {
      const x = (i / 79) * 4 - 2;
      const y = Math.sqrt(Math.max(0, 1 - (x / 2) ** 2)) * 1.8 + (Math.random() - 0.5) * 0.15;
      const z = Math.cos(i * 0.5) * 0.6 + (Math.random() - 0.5) * 0.3;
      pts.push([x, y, z]);
    }
    return pts;
  }, []);

  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.15;
  });

  return (
    <group ref={ref}>
      {/* Pareto points */}
      {points.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.04, 12, 12]} />
          <meshBasicMaterial color={i % 7 === 0 ? "#C8362D" : "#111111"} />
        </mesh>
      ))}

      {/* Pareto frontier line */}
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[new Float32Array(points.flat()), 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#C8362D" linewidth={1} transparent opacity={0.6} />
      </line>

      {/* Axes */}
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[new Float32Array([-2.5, -0.05, 0, 2.5, -0.05, 0]), 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#111111" transparent opacity={0.4} />
      </line>
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[new Float32Array([-2.5, -0.05, 0, -2.5, 2.2, 0]), 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#111111" transparent opacity={0.4} />
      </line>
    </group>
  );
}

export function NatureGooddestScene() {
  return (
    <Canvas
      camera={{ position: [3.5, 2.5, 3.5], fov: 45 }}
      style={{ background: "transparent" }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={1} />
      <ParetoFront />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.4} />
    </Canvas>
  );
}
