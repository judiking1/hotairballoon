'use client';

import { Canvas } from '@react-three/fiber';
import { Cloud, Clouds, Float, OrbitControls, Sky } from '@react-three/drei';
import Castle from './components/Castle';
import { random } from 'maath'
import { MeshLambertMaterial } from 'three';
import { Balloon } from './components/balloon';

const box = random.inBox(new Float32Array(100 * 3), { sides: [1, 1, 1] })
const spherical = random.onSphere(box, { radius: 1 })

export default function IndexPage() {
  return (
    <Canvas
      style={{ height: '100vh' }}
      frameloop={'always'}
      gl={{
        powerPreference: 'high-performance',
        alpha: false,
        antialias: true,
      }}
      camera={{ position: [-70, 90, 100], fov: 100}}
    >
      <OrbitControls
        target={[0, 60, 0]}
        minDistance={50}
        maxDistance={200}
      />
      <Sky
        distance={500000}
        sunPosition={[0, 0, -1]} // 태양의 위치
        inclination={0.4} // 하늘 빛 기울기
        turbidity={10} // 하늘의 탁도 (값이 높을수록 더 탁해짐)
        rayleigh={2} // 레일리 산란 (값이 높을수록 하늘이 더 파랗게 보임)
        mieCoefficient={0.005} // 미 산란 계수
        mieDirectionalG={0.8} // 미 산란 방향성
      />
      <Clouds scale={1} limit={spherical.length} material={MeshLambertMaterial}>
        <Float floatIntensity={4} rotationIntensity={1}>
          <Cloud
            segments={spherical.length}
            seed={1}
            volume={100}
            growth={200}
            smallestVolume={0.5}
            bounds={300}
            opacity={0.4}
            speed={0.1}
            concentrate="random"
            distribute={(cloud, index) => ({
              point: {
                x: spherical[index * 3 + 0],
                y: spherical[index * 3 + 1],
                z: spherical[index * 3 + 2],
              },
              //volume: Math.random(), // Optional
            })}
          />
        </Float>
      </Clouds>
      <Balloon position={[0, 155, -500]} />
      <ambientLight intensity={5.5} />
      <Castle position={[0, -50, 0]} scale={[5, 5, 5]} />
    </Canvas>
  );
}
