"use client";

import { AsciiRenderer, useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import type { Group } from "three";

const MODEL_PATH = "/models/philosopher-bust2.glb";

function RotatingBust() {
  const group = useRef<Group>(null);
  const { scene } = useGLTF(MODEL_PATH);

  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.4;
  });

  return (
    <group ref={group}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload(MODEL_PATH);

/**
 * Rotating 3D philosopher bust rendered as ASCII art via three.js's AsciiEffect.
 */
export default function PhilosopherHero() {
  return (
    <div className="ascii-hero relative aspect-square w-full select-none">
      <Canvas
        camera={{ position: [0, 0, 3], fov: 32 }}
        dpr={1}
        gl={{ alpha: true }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[2, 2, 3]} intensity={1.5} />
        <directionalLight position={[-2, -1, -2]} intensity={0.3} />
        <Suspense fallback={null}>
          <RotatingBust />
        </Suspense>
        <AsciiRenderer
          characters=" .:-+*=%@#"
          fgColor="var(--color-ink)"
          bgColor="transparent"
          invert={false}
          resolution={0.2}
        />
      </Canvas>
    </div>
  );
}
