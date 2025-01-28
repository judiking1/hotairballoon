'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sky } from '@react-three/drei';
import { Balloon } from './components/Balloon0';
import Castle from './components/Castle';

export default function IndexPage() {
  return (
    <Canvas
      style={{ height: '100vh' }}
      frameloop={'always'}
      gl={{ powerPreference: 'high-performance', alpha: true, antialias: true }}
    >
      <OrbitControls />
      <Sky
        distance={450000} // 카메라에서의 스카이박스 거리
        sunPosition={[0, 1, -100]} // 태양의 위치
        inclination={0.49} // 하늘 빛 기울기
        azimuth={0.5} // 태양의 위치(방향)
        turbidity={10}
        rayleigh={2}
        mieCoefficient={0.005}
        mieDirectionalG={0.8}
      />
      <Balloon position={[0, 5, -25]} />
      {/* <Ground /> */}
      {/* <Terrain position={[0,-50,0]} scale={2}/> */}
      {/* <ambientLight intensity={5.5} /> */}
      <Castle position={[0, -60, 0]} />
    </Canvas>
  );
}
