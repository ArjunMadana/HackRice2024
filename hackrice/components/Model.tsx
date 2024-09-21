import { useGLTF, OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import { Group, Vector3, CatmullRomCurve3 } from "three";
import { useThree, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
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
  const terrain = useGLTF("/forest.glb");

  const { scene, camera } = useThree(); // Get the camera reference

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

  const skyTexture = useLoader(TextureLoader, "/sky2.jpg");

  // Set the sky texture as the scene background
  scene.background = skyTexture;

  // Create spring animation for the cloud ring
  const cloudRingSpring = useSpring({
    loop: true,
    from: { rotation: [0, 0, 0] },
    to: { rotation: [0, Math.PI * 2, 0] },
    config: { duration: 10000 }, // Adjust duration for speed
  });

  return (
    <>
      {/* Terrain Model */}
      <primitive
        object={terrain.scene}
        position={[-1.65, -1.75, -1.4]}
        scale={[0.75, 0.4, 0.75]}
      />{" "}
      <animated.group
        ref={group}
        position={[-1.75, -1.75, 0]} // Adjust the position of the entire group (Mountain, Terrain, and Pointers)
        scale={[1.5, 1.5, 1.5]}
      >
        <primitive object={mountain.scene} /> {/* Render the mountain */}
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
          <meshBasicMaterial attach="material" color="yellow" />
        </mesh>
      </animated.group>
      <OrbitControls
        enablePan={true} // Enable panning
        minDistance={3} // Set a minimum distance (for zoom in)
        maxDistance={12} // Set a maximum distance (for zoom out)
        onChange={() => {
          camera.position.y = 2; // Set a fixed Y position for the camera (adjust as needed)
        }}
      />
    </>
  );
}
