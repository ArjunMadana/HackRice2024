"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Sky } from "@react-three/drei"; // Import the Sky component
import HouseRender from "./HouseRender";

export default function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 2, 10], fov: 45 }} // Camera settings
      style={{ width: '100%', height: '100vh' }} // Full screen canvas
    >
      <directionalLight position={[-1, -1, 1]} intensity={1} />
      <ambientLight intensity={1} />
      <Suspense fallback={null}>
        <Sky
          distance={450000} // Camera distance
          sunPosition={[1, 0, 0]} // Position of the sun
          inclination={0} // Sun angle
          azimuth={1} // Sun horizontal position
        />
        <HouseRender />
      </Suspense>
    </Canvas>
  );
}
