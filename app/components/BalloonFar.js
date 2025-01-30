import React, { memo, useEffect, useMemo, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { MathUtils } from 'three';

const BalloonFar = memo(
  ({
    modelPath,
    position,
    baseScale = 1,
    hoverScale = 1.1,
    floatSpeed = 0.5,
    floatRange = 5,
  }) => {
    const groupRef = useRef(null);
    const hoverTimeout = useRef();
    const { scene } = useGLTF(modelPath);
    const [hovered, setHover] = useState(false);
    const [active, setActive] = useState(false);

    const offset = useMemo(() => Math.random() * 1000, []);
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

      // 시간 t
      const t = state.clock.getElapsedTime() * floatSpeed + offset;

      // 원래 고정 위치 + 부가적인 위아래 움직임
      const originalPos = position;
      const newY = originalPos[1] + Math.sin(t) * floatRange;

      groupRef.current.position.set(originalPos[0], newY, originalPos[2]);
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
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onClick={() => setActive(!active)}
      >
        {clonedChildren.map((child) => (
          <primitive key={child.uuid} object={child} />
        ))}
      </group>
    );
  }
);

useGLTF.preload('/model/balloon/balloon0.glb');
useGLTF.preload('/model/balloon/balloon2.glb');

export default BalloonFar;
