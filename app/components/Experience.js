'use client';

import { Canvas } from '@react-three/fiber';
import {
  Bounds,
  Bvh,
  Cloud,
  Clouds,
  Float,
  OrbitControls,
  Sky,
} from '@react-three/drei';
import Castle from './Castle';
import { random } from 'maath';
import { MeshLambertMaterial, NoToneMapping } from 'three';
import { BalloonNear } from './BalloonNear';
import { balloonsFarData, balloonsNearData } from './balloonsData';
import BalloonFar from './BalloonFar';
import { useMemo } from 'react';

const box = random.inBox(new Float32Array(20 * 3), { sides: [4, 1, 4] });
const spherical = random.onSphere(box, { radius: 1 });

export const Experience = ({ isNight }) => {
  const skySettings = useMemo(() => {
    if (isNight) {
      return {
        distance: 450000,
        sunPosition: [0, 0, 100], // Adjust for night
        inclination: 0.2,
        turbidity: 20,
        rayleigh: 0.5,
        mieCoefficient: 0.01,
        mieDirectionalG: 0.7,
        azimuth: 0.25,
      };
    } else {
      return {
        distance: 450000,
        sunPosition: [0, 1, -100],
        inclination: 0.4,
        turbidity: 10,
        rayleigh: 2,
        mieCoefficient: 0.005,
        mieDirectionalG: 0.8,
        azimuth: 0.25,
      };
    }
  }, [isNight]);
  return (
    <Canvas
      style={{ height: '100vh', zIndex: 0 }}
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
        distance={skySettings.distance}
        sunPosition={skySettings.sunPosition}
        inclination={skySettings.inclination}
        turbidity={skySettings.turbidity}
        rayleigh={skySettings.rayleigh}
        mieCoefficient={skySettings.mieCoefficient}
        mieDirectionalG={skySettings.mieDirectionalG}
        azimuth={skySettings.azimuth}
      />
      <Clouds scale={1} limit={spherical.length} material={MeshLambertMaterial}>
        <Float floatIntensity={2} rotationIntensity={1}>
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
          <Bounds key={idx}>
            <BalloonNear {...props} />
          </Bounds>
        ))}
      </Bvh>
      <ambientLight intensity={isNight ? 0.5 : 5.5} />
      <directionalLight
        position={isNight ? [0, 10, 100] : [0, 100, 100]} // Adjust positions as needed
        intensity={isNight ? 0.5 : 1}
        color={isNight ? 0xaaaaaa : 0xffffff} // Soft gray for night, white for day
        castShadow // Enable shadows if needed
        shadow-mapSize-width={1024} // Adjust shadow quality
        shadow-mapSize-height={1024}
        shadow-camera-far={500}
        shadow-camera-left={-50}
        shadow-camera-right={50}
        shadow-camera-top={50}
        shadow-camera-bottom={-50}
      />
      <Castle position={[0, -50, 0]} scale={[5, 5, 5]} />
    </Canvas>
  );
};
