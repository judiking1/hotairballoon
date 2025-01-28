'use client';

import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, Sky } from '@react-three/drei';
import Box from './components/balloon';

export default function IndexPage() {
  return (
    <Canvas
      style={{ height: '100vh' }}
      frameloop={'always'}
      gl={{ powerPreference: 'high-performance', alpha: true, antialias: true }}
    >
      <OrbitControls />
      <Sky
        sunPosition={[0, 1, -300]}
        turbidity={10}
        rayleigh={2}
        mieCoefficient={0.005}
        mieDirectionalG={0.8}
      />
      {/* <ambientLight intensity={Math.PI / 2} /> */}
      <Environment preset="sunset" />
      <Box position={[-1.2, 0, 0]} />
      <Box position={[1.2, 0, 0]} />
    </Canvas>
  );
}
