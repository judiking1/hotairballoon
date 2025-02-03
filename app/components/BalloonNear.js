import React, { useEffect, useMemo, useRef, useState } from 'react';
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
  const hoverTimeout = useRef();
  const { scene } = useGLTF(modelPath);
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  const clonedChildren = useMemo(() => {
    return scene.children.map((child) => child.clone());
  }, [scene]);

  const handlePointerEnter = (e) => {
    e.stopPropagation();
    clearTimeout(hoverTimeout.current);
    setHover(true);
  };
  const handlePointerLeave = (e) => {
    e.stopPropagation();
    hoverTimeout.current = setTimeout(() => setHover(false), 100); // 100ms delay
  };
  useEffect(() => {
    return () => {
      clearTimeout(hoverTimeout.current);
    };
  }, []);
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
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onClick={() => {
        setActive(!active);
      }}
    >
      {clonedChildren.map((child) => (
        <primitive key={child.uuid} object={child} />
      ))}
    </group>
  );
}

// 미리 GLTF를 Preload 해 두기
useGLTF.preload('/model/balloon/balloon0.glb');
useGLTF.preload('/model/balloon/balloon2.glb');
