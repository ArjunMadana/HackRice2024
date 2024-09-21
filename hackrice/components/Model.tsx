import { useGLTF, OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import { Group, Vector3, CatmullRomCurve3 } from "three";
import { useThree } from "@react-three/fiber";
import { useSpring, animated } from "@react-spring/three"; // Spring animation

// Preload all models
useGLTF.preload("/mountain.glb");
useGLTF.preload("/mappointer.glb");
useGLTF.preload("/cloud_ring.glb");
useGLTF.preload("/terrain.glb");

export default function Model() {
  const group = useRef<Group>(null);

  // Load the models
  const mountain = useGLTF("/mountain.glb");
  const mapPointer = useGLTF("/mappointer.glb");
  const cloudRing = useGLTF("/clouds.glb");
  const terrain = useGLTF("/terrain.glb");

  const { camera } = useThree(); // Get the camera reference

  const pointerPositions = [
    new Vector3(0.75, 0.25, 1.75),
    new Vector3(0.5, 0.75, 1),
    new Vector3(0, 0.75, 0),
    new Vector3(1, 0.9, 0),
    new Vector3(2, 1.4, 0),
    new Vector3(2, 2.2, -0.7),
    new Vector3(1.5, 1.75, -1.25),
    new Vector3(1.6, 2.45, -2),
  ];

  const curve = new CatmullRomCurve3(pointerPositions);

  // Create spring animation for the cloud ring
  const cloudRingSpring = useSpring({
    loop: true,
    from: { rotation: [0, 0, 0] },
    to: { rotation: [0, Math.PI * 2, 0] },
    config: { duration: 10000 }, // Adjust duration for speed
  });

  return (
    <>
      <animated.group
        ref={group}
        position={[-1.75, -1.75, 0]} // Adjust the position of the entire group (Mountain, Terrain, and Pointers)
        scale={[1.5, 1.5, 1.5]}
      >
        {/* Terrain Model */}
        <primitive
          object={terrain.scene}
          position={[0, 1.5, 0]}
          scale={[50, 30, 50]}
        />{" "}
        {/* Adjust position below the mountain */}
        {/* Mountain Model */}
        <primitive object={mountain.scene} /> {/* Render the mountain */}
        {/* Map Pointers */}
        {pointerPositions.map((pos, idx) => (
          <primitive
            key={idx}
            object={mapPointer.scene.clone()} // Clone the map pointer for each instance
            position={pos} // Set pointer position
            scale={[0.1, 0.1, 0.1]} // Keep the scale constant
          />
        ))}
        {/* Tube */}
        <mesh>
          <tubeGeometry attach="geometry" args={[curve, 64, 0.02, 8, false]} />{" "}
          {/* Tube geometry with thickness */}
          <meshBasicMaterial attach="material" color="yellow" />
        </mesh>
        {/* Cloud Ring Model with Animation */}
        <primitive
          object={cloudRing.scene}
          position={[5, 25, -1.25]} // Position above the mountain
          scale={[3, 3, 3]} // Adjust scale as needed
        />
      </animated.group>

      {/* Orbit Controls */}
      <OrbitControls
        enablePan={true} // Enable panning
        onChange={() => {
          camera.position.y = 2; // Set a fixed Y position for the camera (adjust as needed)
        }}
      />
    </>
  );
}
