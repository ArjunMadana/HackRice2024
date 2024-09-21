import { useGLTF, OrbitControls, Html } from "@react-three/drei";
import { use, useRef, useState } from "react";
import { Group, Vector3, CatmullRomCurve3 } from "three";
import { useThree, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import { useSpring, animated } from "@react-spring/three"; // Spring animation

// Preload all models
// Volcano by Poly by Google [CC-BY] via Poly Pizza
useGLTF.preload("/tokyotower.glb");
useGLTF.preload("/mappointer.glb");
useGLTF.preload("/cloud_ring.glb");
useGLTF.preload("/island.glb");
useGLTF.preload("/airship.jpg");

export default function Model() {
  const group = useRef<Group>(null);

  // Load the models
  const modelfile = useGLTF("/tokyotower.glb");
  const mapPointer = useGLTF("/mappointer.glb");
  const cloudRing = useGLTF("/clouds.glb");
  const terrain = useGLTF("/island.glb");
  const airship = useGLTF("/airship.glb");

  const { scene, camera } = useThree(); // Get the camera reference
  const [clickedPointer, setClickedPointer] = useState(null); // State for the clicked pointer

  const pointerPositions = [
    new Vector3(0.7, 1.2, 1.7),
    new Vector3(1.7, 1.5, 1),
    new Vector3(0.4, 1.6, 0.3),
    new Vector3(1.4, 1.7, -0.5),
    new Vector3(1, 2.2, -0.6),
    new Vector3(1.3, 2.6, -0.6),
    new Vector3(1.17, 3.25, -0.81),
    new Vector3(1.7, 3.3, -0.85),
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
        position={[0, -6.3, -1.5]}
        scale={[12/1.2, 7, 12/1.2]}
      />{" "}
      <animated.group
        ref={group}
        position={[-1.75, -2.5, 0]} // Adjust the position of the entire group (Mountain, Terrain, and Pointers)
        scale={[1.5, 1.5, 1.5]}
      >
      <primitive object={modelfile.scene} 
          // Rotation, position, and scale for the mountain model
          rotation={[0, -0.4, 0]}
          position={[1.2, 0.93, -0.85]}
          scale={[0.03, 0.025, 0.03]}
      /> {/* Render the mountain */}
      <primitive object={airship.scene} 
          // Rotation, position, and scale for the mountain model
          rotation={[0, 0.75, 0]}
          position={[1.7, 3.45, -1.1]}
          scale={[0.005/1.5, 0.005/1.5, 0.005/1.5]}
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
