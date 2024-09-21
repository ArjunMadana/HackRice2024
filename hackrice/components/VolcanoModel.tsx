import { useGLTF, OrbitControls, Html } from "@react-three/drei";
import { useRef, useState } from "react";
import { Group, Vector3, CatmullRomCurve3 } from "three";
import { useThree, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import { useSpring, animated } from "@react-spring/three"; // Spring animation

// Preload all models
// Volcano by Poly by Google [CC-BY] via Poly Pizza
useGLTF.preload("/volcano.glb");
useGLTF.preload("/mappointer.glb");
useGLTF.preload("/cloud_ring.glb");
useGLTF.preload("/terrain.glb");

export default function Model() {
  const group = useRef<Group>(null);

  // Load the models
  const modelfile = useGLTF("/volcano.glb");
  const mapPointer = useGLTF("/mappointer.glb");
  const cloudRing = useGLTF("/clouds.glb");
  const terrain = useGLTF("/valleyterrain.glb");

  const { scene, camera } = useThree(); // Get the camera reference
  const [clickedPointer, setClickedPointer] = useState(null); // State for the clicked pointer

  const pointerPositions = [
    new Vector3(1.8, 0.35, 1.8),
    new Vector3(2, 1.1, 0.5),
    new Vector3(0.95, 1.2, 1.2),
    new Vector3(-0.3, 0.7, 0.7),
    new Vector3(-0.9, 1.15, 0),
    new Vector3(-0.25, 1.7, -0.05),
    new Vector3(0.9, 2.3, -0.3),
    new Vector3(1.2, 2.9, -0.6),
  ];

  const curve = new CatmullRomCurve3(pointerPositions);

  const skyTexture = useLoader(TextureLoader, "/sky2.jpg");

  // Set the sky texture as the scene background
  scene.background = skyTexture;

  const handleClick = (idx) => {
    // Toggle the clicked pointer state to show or hide the dialog
    setClickedPointer(clickedPointer === idx ? null : idx);
  };

  return (
    <>
      {/* Terrain Model */}
      <primitive
        object={terrain.scene}
        position={[0, -1.75, -4]}
        scale={[0.75/10, 0.4/15, 0.75/10]}
      />{" "}
      <animated.group
        ref={group}
        position={[-1.75, -1.75, 0]} // Adjust the position of the entire group (Mountain, Terrain, and Pointers)
        scale={[1.5, 1.5, 1.5]}
      >
        <primitive object={modelfile.scene} 
          // Rotation, position, and scale for the mountain model
          rotation={[0, 0.8, 0]}
          position={[1.2, 0.93, -0.85]}
          scale={[3, 3, 3]}
        /> {/* Render the mountain */}
        {pointerPositions.map((pos, idx) => (
          <group key={idx} position={pos} onClick={() => handleClick(idx)}>
            <primitive
              object={mapPointer.scene.clone()} // Clone the map pointer for each instance
              scale={[0.1, 0.1, 0.1]} // Keep the scale constant
            />
            {/* Show the dialog only when the pointer is clicked */}
            {clickedPointer === idx && (
              <Html distanceFactor={10} position={[0, 0.75, 0]}>
                <div
                  style={{
                    background: "white",
                    padding: "12px",
                    borderRadius: "4px",
                    boxShadow: "0px 0px 10px rgba(0,0,0,0.5)",
                    width: "150px", // Narrower width
                    height: "75px", // Taller height
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    fontSize: "10px",
                  }}
                >
                  <p>Dialog for Goal {idx + 1}</p>
                  <button onClick={() => setClickedPointer(null)}>Close</button>
                </div>
              </Html>
            )}
          </group>
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
