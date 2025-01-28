import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';

export function Balloon(props) {
  const groupRef = useRef();
  const { nodes, materials } = useGLTF('/model/balloon/balloon0.glb');
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    groupRef.current.position.y =  props.position[1]+ Math.sin(t) * 0.5;
    groupRef.current.position.x = props.position[0] + Math.sin(t) * 2;
    groupRef.current.position.z = props.position[2] + Math.cos(t) * 2;
    groupRef.current.rotation.y = Math.sin(t)*0.8;
  });

  return (
    <group
      {...props}
      dispose={null}
      ref={groupRef}
      scale={hovered ? 1.1 : 1}
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
