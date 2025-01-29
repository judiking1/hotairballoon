import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

export function BalloonFar({
  modelPath,
  position,
  baseScale = 1,
  hoverScale = 1.1,
  floatSpeed = 0.5,
  floatRange = 5,
}) {
  const groupRef = useRef(null);
  const { scene } = useGLTF(modelPath);

  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  const scaleValue = hovered ? hoverScale : baseScale;

  const offset = Math.random() * 1000;

  useFrame((state) => {
    if (!groupRef.current) return;

    // 시간 t
    const t = state.clock.getElapsedTime() * floatSpeed + offset;

    // 원래 고정 위치 + 부가적인 위아래 움직임
    const originalPos = position;
    const newY = originalPos[1] + Math.sin(t) * floatRange;

    groupRef.current.position.set(originalPos[0], newY, originalPos[2]);
  });

  return (
    <group
      ref={groupRef}
      scale={scaleValue}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      onClick={() => setActive(!active)}
    >
      {scene.children.map((child) => (
        <primitive key={child.uuid} object={child.clone()} />
      ))}
    </group>
  );
}

useGLTF.preload('/model/balloon/balloon0.glb');
useGLTF.preload('/model/balloon/balloon2.glb');
