import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';

export function Balloon({
  radius = 100,
  height = 150,
  speed = 1,
  initialAngle = 0,
}) {
  const groupRef = useRef();
  const { nodes, materials } = useGLTF('/model/balloon/balloon0.glb');
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    const angle = t * speed + initialAngle;
    groupRef.current.position.x = Math.cos(angle) * radius;
    groupRef.current.position.y = height - 50+20*Math.cos(angle);
    groupRef.current.position.z = Math.sin(angle) * radius;
    groupRef.current.rotation.y = Math.sin(t) * 0.8;
  });

  return (
    <group
      dispose={null}
      ref={groupRef}
      scale={hovered ? 55 : 50}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <mesh
        geometry={nodes.model.geometry}
        material={materials.CustomMaterial}
        rotation={[Math.PI / 2, 0, 0]}
      />
    </group>
  );
}

useGLTF.preload('/model/balloon/balloon0.glb');
