"use client";

import { Canvas } from "@react-three/fiber";
import Model from "./VolcanoModel";
import { Suspense } from "react";
import { Sky } from "@react-three/drei"; // Import the Sky component

export default function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 2, 10], fov: 45 }} // Camera settings
      style={{ width: '100%', height: '100vh' }} // Full screen canvas
    >
      <directionalLight position={[-5, -5, 5]} intensity={4} />
      <ambientLight intensity={2.5} />
      <Suspense fallback={null}>
        {/* <Sky
          distance={450000} // Camera distance
          sunPosition={[0, 1, 0]} // Position of the sun
          inclination={0} // Sun angle
          azimuth={0.25} // Sun horizontal position
        /> */}
        <Model />
      </Suspense>
    </Canvas>
  );
}
