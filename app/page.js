'use client';

import { Canvas } from '@react-three/fiber';
import {
  Bvh,
  Cloud,
  Clouds,
  Float,
  Instances,
  OrbitControls,
  Sky,
} from '@react-three/drei';
import Castle from './components/Castle';
import { random } from 'maath';
import { MeshLambertMaterial, NoToneMapping } from 'three';
import { BalloonNear } from './components/BalloonNear';
import { balloonsFarData, balloonsNearData } from './components/balloonsData';
import { BalloonFar } from './components/BalloonFar';

const box = random.inBox(new Float32Array(20 * 3), { sides: [4, 1, 4] });
const spherical = random.onSphere(box, { radius: 1 });

export default function IndexPage() {
  return (
    <Canvas
      style={{ height: '100vh' }}
      frameloop={'always'}
      gl={{
        powerPreference: 'high-performance',
        alpha: false,
        antialias: true,
        toneMapping: NoToneMapping,
      }}
      camera={{ position: [-70, 90, 100], fov: 75 }}
    >
      <OrbitControls
        target={[0, 60, 0]}
        minDistance={50}
        maxDistance={150}
        minPolarAngle={-Math.PI / 2}
        maxPolarAngle={Math.PI / 2}
        maxAzimuthAngle={Math.PI / 4}
        minAzimuthAngle={-Math.PI / 4}
      />
      <Sky
        distance={500000}
        sunPosition={[0, 0, -100]} // 태양의 위치
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
            volume={50}
            growth={50}
            smallestVolume={0.5}
            bounds={180}
            opacity={0.3}
            speed={0.1}
            concentrate="random"
          />
        </Float>
      </Clouds>
      <Bvh firstHitOnly>
        {balloonsFarData.map((props, idx) => (
          <BalloonFar key={idx} {...props} />
        ))}
        {balloonsNearData.map((props, idx) => (
          <BalloonNear key={idx} {...props} />
        ))}
      </Bvh>
      <ambientLight intensity={5.5} />
      <Castle position={[0, -50, 0]} scale={[5, 5, 5]} />
    </Canvas>
  );
}
