import React, { useEffect, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { MathUtils } from 'three';

export function BalloonNear({
  radius = 80,
  height = 150,
  speed = 0.2,
  initialAngle = 0,
  modelPath,
  baseScale = 1, // 기본 스케일
  hoverScale = 1.1, // 마우스 오버 시 스케일
  rotationSpeed = 0.8,
}) {
  const groupRef = useRef(null);
  const { scene } = useGLTF(modelPath);

  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto';
  }, [hovered]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    const angle = t * speed + initialAngle;

    // XZ 평면 상 원형 궤도
    groupRef.current.position.x = Math.cos(angle) * radius;
    groupRef.current.position.z = Math.sin(angle) * radius;

    // Y값: height (Castle 위치 맞춤?) + 추가로 흔들리는 효과
    groupRef.current.position.y = height + 20 * Math.cos(angle);

    // 풍선 몸체 살짝 회전
    groupRef.current.rotation.y = Math.sin(t) * rotationSpeed;
    groupRef.current.scale.x =
      groupRef.current.scale.y =
      groupRef.current.scale.z =
        MathUtils.lerp(
          groupRef.current.scale.z,
          hovered ? hoverScale : baseScale,
          0.1
        );
  });

  return (
    <group
      ref={groupRef}
      dispose={null}
      onPointerEnter={(e) => (e.stopPropagation(), setHover(true))}
      onPointerLeave={(e) => setHover(false)}
      onClick={() => {
        setActive(!active);
      }}
    >
      {scene.children.map((child) => (
        <primitive key={child.uuid} object={child.clone()} />
      ))}
    </group>
  );
}

// 미리 GLTF를 Preload 해 두기
useGLTF.preload('/model/balloon/balloon0.glb');
useGLTF.preload('/model/balloon/balloon2.glb');
