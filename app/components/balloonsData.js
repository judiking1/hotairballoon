const balloonModels = [
  '/model/balloon/balloon0.glb',
  '/model/balloon/balloon2.glb',
];

export const balloonsNearData = [
  {
    modelPath: balloonModels[0],
    radius: 70,
    speed: 0.2,
    height: 100,
    initialAngle: 0,
    baseScale: 50,
    hoverScale: 55,
    rotationSpeed: 0.8,
  },
  {
    modelPath: balloonModels[1],
    radius: 80,
    speed: 0.2,
    height: 100,
    initialAngle: Math.PI,
    baseScale: 0.5,
    hoverScale: 0.55,
    rotationSpeed: 0.8,
  }
];

export const balloonsFarData = Array.from({ length: 40 }).map(() => {
  const randomIndex = Math.floor(Math.random() * balloonModels.length);
  const chosenModel = balloonModels[randomIndex];

  // 2) 풍선 모델에 따라 scale 조건 분기
  let baseScale, hoverScale;
  if (randomIndex === 0) {
    // balloon0.glb인 경우
    baseScale = (Math.random() - 0.5) * 20 + 35;
    hoverScale = baseScale * 1.1;
  } else {
    // balloon2.glb, balloon3.glb인 경우
    baseScale = (Math.random() - 0.5) * 1 + 0.8;
    hoverScale = baseScale * 1.1;
  } 
  const x = (Math.random() - 0.5) * 1000;
  const y = 150 + Math.random() * 100;
  const z = -200 - Math.random() * 400;
  return {
    modelPath: chosenModel,
    position: [x, y, z],
    baseScale,
    hoverScale,
    floatSpeed: 0.1 + Math.random() * 0.5, // 0.3 ~ 0.8
    floatRange: Math.random() * 5, // 5~15
  };
});
