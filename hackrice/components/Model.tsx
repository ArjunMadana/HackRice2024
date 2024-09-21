import { useGLTF, OrbitControls } from "@react-three/drei";
import { useRef, useState } from "react";
import { Group } from "three";
import { useSpring, animated } from "@react-spring/three"; // Import the animation functions

useGLTF.preload("/mountain.glb");

export default function Model() {
  const group = useRef<Group>(null);
  const { scene } = useGLTF("/mountain.glb"); // Load the model
  const [clicked, setClicked] = useState(false);

  // Create spring-based animation for scale and position
  const { scale, position } = useSpring({
    scale: clicked ? [2.5, 2.5, 2.5] : [2, 2, 2], // Target scale on click
    position: clicked ? [-2.5, -0.5, 0] : [-2.5, -1, 0], // Adjust position dynamically if needed
    config: { mass: 1, tension: 170, friction: 26 }, // Adjust the animation speed and smoothness
  });

  return (
    <>
      <animated.group
        ref={group}
        scale={scale} // Apply animated scale
        position={position} // Apply animated position
        // onClick={() => setClicked(!clicked)} // Toggle click state
      >
        <primitive object={scene} /> {/* Render the scene */}
      </animated.group>
      <OrbitControls enableZoom={true} enablePan={false} />{" "}
      {/* Enable orbit controls */}
    </>
  );
}
