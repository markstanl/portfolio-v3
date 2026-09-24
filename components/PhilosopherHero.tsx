"use client";

import { useGLTF } from "@react-three/drei";
import { Canvas, useFrame, type ThreeEvent } from "@react-three/fiber";
import { Suspense, useEffect, useRef } from "react";
import { Color, Mesh, ShaderMaterial } from "three";
import type { Group } from "three";
import { createDoodleMaterials } from "./doodleMaterial";

const MODEL_PATH = "/models/philosopher-bust2.glb";

const BASE_SPIN_SPEED = 0.4; // idle rotation, rad/sec
const DRAG_SENSITIVITY = 0.012; // rad per pixel of drag
const VELOCITY_DECAY = 3; // higher = snaps back to idle speed faster after release

type DragState = {
  dragging: boolean;
  pointerId: number | null;
  lastX: number;
  lastTime: number;
  pendingDelta: number;
  velocity: number;
};

// r3f substitutes its own capture-tracking object for PointerEvent.target/currentTarget
type PointerCaptureTarget = {
  setPointerCapture: (pointerId: number) => void;
  releasePointerCapture: (pointerId: number) => void;
};

function RotatingBust() {
  const group = useRef<Group>(null);
  const dragState = useRef<DragState>({
    dragging: false,
    pointerId: null,
    lastX: 0,
    lastTime: 0,
    pendingDelta: 0,
    velocity: BASE_SPIN_SPEED,
  });
  const { scene } = useGLTF(MODEL_PATH);

  useEffect(() => {
    const rootStyle = getComputedStyle(document.documentElement);
    const inkColor = new Color(
      rootStyle.getPropertyValue("--color-ink").trim() || "#000000",
    );
    const paperColor = new Color(
      rootStyle.getPropertyValue("--color-cream").trim() || "#fcfbf8",
    );

    // collect meshes before mutating the graph: traverse() walks the live
    // children array, so adding outline meshes mid-traversal would recurse
    const meshes: Mesh[] = [];
    scene.traverse((child) => {
      if (child instanceof Mesh) meshes.push(child);
    });

    for (const mesh of meshes) {
      // source model ships without a NORMAL accessor
      if (!mesh.geometry.attributes.normal)
        mesh.geometry.computeVertexNormals();
      const { fill, outline } = createDoodleMaterials(inkColor, paperColor);
      mesh.material = fill;
      mesh.add(new Mesh(mesh.geometry, outline));
    }
  }, [scene]);

  useFrame((threeState, delta) => {
    if (!group.current) return;
    const state = dragState.current;

    if (state.pendingDelta !== 0) {
      group.current.rotation.y += state.pendingDelta;
      state.pendingDelta = 0;
    }

    if (!state.dragging) {
      state.velocity +=
        (BASE_SPIN_SPEED - state.velocity) *
        Math.min(1, delta * VELOCITY_DECAY);
      group.current.rotation.y += state.velocity * delta;
    }

    group.current.traverse((child) => {
      if (child instanceof Mesh && child.material instanceof ShaderMaterial) {
        child.material.uniforms.uTime.value = threeState.clock.elapsedTime;
      }
    });

    // hover state only updates on native pointer events, so a stationary cursor
    // over a rotating model would otherwise keep a stale grab cursor forever
    threeState.events.update?.();
  });

  const handlePointerDown = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    const state = dragState.current;
    state.dragging = true;
    state.pointerId = e.pointerId;
    state.lastX = e.clientX;
    state.lastTime = performance.now();
    (e.target as unknown as PointerCaptureTarget).setPointerCapture(
      e.pointerId,
    );
    document.body.style.cursor = "grabbing";
  };

  const handlePointerMove = (e: ThreeEvent<PointerEvent>) => {
    const state = dragState.current;
    if (!state.dragging || state.pointerId !== e.pointerId) return;

    const now = performance.now();
    const dx = e.clientX - state.lastX;
    const dt = Math.max(now - state.lastTime, 1);

    state.pendingDelta += dx * DRAG_SENSITIVITY;
    state.velocity = (dx * DRAG_SENSITIVITY * 1000) / dt;
    state.lastX = e.clientX;
    state.lastTime = now;
  };

  const handlePointerUp = (e: ThreeEvent<PointerEvent>) => {
    const state = dragState.current;
    if (state.pointerId !== e.pointerId) return;
    state.dragging = false;
    state.pointerId = null;
    (e.target as unknown as PointerCaptureTarget).releasePointerCapture(
      e.pointerId,
    );
    document.body.style.cursor = "auto";
  };

  const handlePointerOver = () => {
    if (!dragState.current.dragging) document.body.style.cursor = "grab";
  };

  const handlePointerOut = () => {
    if (!dragState.current.dragging) document.body.style.cursor = "auto";
  };

  return (
    <group
      ref={group}
      position={[0, 0, 0]}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload(MODEL_PATH);

/**
 * Rotating 3D philosopher bust rendered with a hand-drawn "doodle" shader:
 * flat toon-shaded fill plus an inverted-hull outline, both wobbling on a
 * snapped low-fps jitter so it reads as sketched rather than rendered.
 * Grab the bust itself (not the surrounding canvas) and drag to spin it faster;
 * it eases back to the idle rotation speed on release.
 */
export default function PhilosopherHero() {
  return (
    <div className="ascii-hero relative aspect-square w-full select-none">
      <Canvas
        camera={{ position: [0, 0, 3.8], fov: 32 }}
        dpr={1}
        gl={{ alpha: true }}
        style={{ touchAction: "none" }}
      >
        <Suspense fallback={null}>
          <RotatingBust />
        </Suspense>
      </Canvas>
    </div>
  );
}
