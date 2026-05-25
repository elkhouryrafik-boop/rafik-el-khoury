"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

const NODES: { label: string; pos: [number, number, number] }[] = [
  { label: "transcript", pos: [-2.4, 0.8, 0] },
  { label: "normalise", pos: [-1.2, -0.4, 0.3] },
  { label: "rag", pos: [0, 0.9, -0.2] },
  { label: "propose", pos: [1.2, -0.3, 0.4] },
  { label: "rank", pos: [2.4, 0.6, 0] },
];

function Pipeline() {
  const ref = useRef<THREE.Group>(null);
  const pulse = useRef(0);

  useFrame((_, dt) => {
    pulse.current = (pulse.current + dt * 0.4) % 1;
    if (ref.current) ref.current.rotation.y = Math.sin(performance.now() * 0.0002) * 0.3;
  });

  const edges = useMemo(() => {
    const arr: number[] = [];
    for (let i = 0; i < NODES.length - 1; i++) {
      arr.push(...NODES[i].pos, ...NODES[i + 1].pos);
    }
    return new Float32Array(arr);
  }, []);

  return (
    <group ref={ref}>
      {/* Pipeline edges */}
      <line>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[edges, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#111111" transparent opacity={0.5} />
      </line>

      {/* Nodes */}
      {NODES.map((n, i) => (
        <mesh key={i} position={n.pos}>
          <boxGeometry args={[0.4, 0.4, 0.4]} />
          <meshBasicMaterial color={i === 2 ? "#C8362D" : "#111111"} wireframe />
        </mesh>
      ))}

      {/* Travelling pulse */}
      <PulseDot />
    </group>
  );
}

function PulseDot() {
  const dot = useRef<THREE.Mesh>(null);
  useFrame(() => {
    if (!dot.current) return;
    const t = (performance.now() * 0.0004) % 1;
    const idx = Math.floor(t * (NODES.length - 1));
    const local = t * (NODES.length - 1) - idx;
    const a = NODES[idx].pos;
    const b = NODES[Math.min(idx + 1, NODES.length - 1)].pos;
    dot.current.position.set(
      a[0] + (b[0] - a[0]) * local,
      a[1] + (b[1] - a[1]) * local,
      a[2] + (b[2] - a[2]) * local
    );
  });
  return (
    <mesh ref={dot}>
      <sphereGeometry args={[0.1, 16, 16]} />
      <meshBasicMaterial color="#C8362D" />
    </mesh>
  );
}

export function GigAIScene() {
  return (
    <Canvas
      camera={{ position: [0, 1.5, 5], fov: 45 }}
      style={{ background: "transparent" }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={1} />
      <Pipeline />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.3} />
    </Canvas>
  );
}
