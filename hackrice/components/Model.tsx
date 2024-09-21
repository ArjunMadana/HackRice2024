import { useGLTF, OrbitControls, Html } from "@react-three/drei";
import { useRef, useState } from "react";
import {
  Group,
  Vector3,
  CatmullRomCurve3,
  TubeGeometry,
  MeshBasicMaterial,
  Mesh,
} from "three";
import { useSpring, animated } from "@react-spring/three"; // For animations
import { useThree } from "@react-three/fiber"; // For camera controls

// Preload both models
useGLTF.preload("/mountain.glb");
useGLTF.preload("/mappointer.glb");

export default function Model() {
  const group = useRef<Group>(null);

  // Load the mountain and the map pointer models
  const mountain = useGLTF("/mountain.glb");
  const mapPointer = useGLTF("/mappointer.glb");

  const [clickedPointer, setClickedPointer] = useState<number | null>(null); // Track which pointer is clicked
  const { camera } = useThree(); // Get the camera reference

  // Define the positions of the markers
  const pointerPositions = [
    new Vector3(0.75, 0.25, 1.75), // Pointer 1 Position
    new Vector3(0, 0.75, 0), // Pointer 1 Position
    new Vector3(2, 1.4, 0), // Pointer 2 Position
    new Vector3(1, 1.25, -1), // Pointer 3 Position
    new Vector3(1.6, 2.45, -2), // Pointer 4 Position
  ];

  // Create a smooth curve between the marker positions using CatmullRomCurve3
  const curve = new CatmullRomCurve3(pointerPositions);

  // Create TubeGeometry for a thicker line
  const tubeGeometry = new TubeGeometry(curve, 64, 0.05, 8, false); // Tube with radius 0.05

  // Spring animation for rotating the mountain
  const { rotation } = useSpring({
    rotation:
      clickedPointer === null
        ? [0, 0, 0]
        : getRotationForPointer(clickedPointer),
    config: { mass: 1, tension: 170, friction: 26 }, // Smooth rotation
  });

  // Handle pointer click logic
  const handlePointerClick = (pointerIndex: number) => {
    setClickedPointer(pointerIndex); // Mark the clicked pointer
  };

  // Reset logic to reset the mountain rotation and reset view
  const resetView = () => {
    setClickedPointer(null); // Reset clicked pointer state
  };

  return (
    <>
      {/* Group the mountain and the pointers together */}
      <animated.group
        ref={group}
        rotation={rotation} // Apply animated rotation
        position={[-1.75, -1.75, 0]} // Adjust the position of the entire group (Mountain and Pointers)
        scale={[1.5, 1.5, 1.5]}
      >
        {/* Mountain Model */}
        <primitive object={mountain.scene} /> {/* Render the mountain */}
        {/* Map Pointers */}
        {pointerPositions.map((pos, idx) => (
          <primitive
            key={idx}
            object={mapPointer.scene.clone()} // Clone the map pointer for each instance
            position={pos} // Set pointer position
            scale={[0.1, 0.1, 0.1]} // Keep the scale constant
            onClick={() => handlePointerClick(idx)} // Rotate mountain on click
          />
        ))}
        {/* Thicker Curved Line connecting the pointers using TubeGeometry */}
        <mesh>
          <tubeGeometry attach="geometry" args={[curve, 64, 0.02, 8, false]} />{" "}
          {/* Tube geometry with thickness */}
          <meshBasicMaterial attach="material" color="yellow" />
        </mesh>
      </animated.group>

      {/* Orbit Controls */}
      <OrbitControls
        enableZoom={clickedPointer === null}
        enablePan={true} // Enable panning
        onChange={() => {
          // Lock Y-axis for horizontal-only panning
          camera.position.y = 2; // Set a fixed Y position for the camera (adjust as needed)
        }}
      />

      {/* Reset View Button (appears when a pointer is clicked) */}
      {clickedPointer !== null && (
        <Html position={[0, 0, 0]} center>
          <div
            style={{
              background: "white",
              padding: "10px",
              cursor: "pointer",
            }}
            onClick={resetView}
          >
            Reset View
          </div>
        </Html>
      )}
    </>
  );
}
