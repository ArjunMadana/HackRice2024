import { useGLTF, OrbitControls, Html } from "@react-three/drei";
import { useRef, useState } from "react";
import { Group, Vector3 } from "three";
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

  // Function to calculate the required rotation for a clicked pointer
  function getRotationForPointer(
    pointerIndex: number
  ): [number, number, number] {
    const pointerPositions = [
      new Vector3(0, 0.75, 0), // Position of Pointer 1
      new Vector3(-1, 1, 0), // Position of Pointer 2
    ];

    const pointerPosition = pointerPositions[pointerIndex];

    // Calculate the angle around the Y-axis to face the marker
    const angleToPointer = Math.atan2(
      pointerPosition.x - camera.position.x,
      pointerPosition.z - camera.position.z
    );

    // Convert the angle to Euler angles for rotation
    return [0, angleToPointer, 0]; // Only rotating around Y-axis (up axis)
  }

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
        position={[0, -1.5, 0]} // Adjust the position of the entire group (Mountain and Pointers)
      >
        {/* Mountain Model */}
        <primitive object={mountain.scene} /> {/* Render the mountain */}
        {/* Map Pointers */}
        <primitive
          object={mapPointer.scene}
          position={[0, 0.75, 0]} // Pointer 1 Position
          scale={[0.1, 0.1, 0.1]} // Keep the scale constant
          onClick={() => handlePointerClick(0)} // Rotate mountain on click
        />
      </animated.group>
      {/* Orbit Controls */}
      <OrbitControls
        enableZoom={clickedPointer === null}
        enablePan={clickedPointer === null}
      />{" "}
      {/* Disable orbit controls when zoomed */}
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
