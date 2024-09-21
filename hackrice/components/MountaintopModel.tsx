import { useGLTF, OrbitControls, Html } from "@react-three/drei";
import { useRef, useState, useEffect} from "react";
import { Group, Vector3, CatmullRomCurve3 } from "three";
import { useThree, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import { useSpring, animated } from "@react-spring/three"; // Spring animation
import * as THREE from 'three';

// Preload all models
// Volcano by Poly by Google [CC-BY] via Poly Pizza
useGLTF.preload("/mountaintop.glb");
useGLTF.preload("/mappointer.glb");
useGLTF.preload("/cloud_ring.glb");
useGLTF.preload("/rivervalley.glb");

export default function Model() {
  const group = useRef<Group>(null);

  // Load the models
  const modelfile = useGLTF("/mountaintop.glb");
  const mapPointer = useGLTF("/mappointer.glb");
  const cloudRing = useGLTF("/clouds.glb");
  const terrain = useGLTF("/rivervalley.glb");

  // Store the original colors of the meshes to avoid cumulative tinting
  const originalColors = useRef(new Map()); // Use a map to store colors by mesh ID
  const { scene, camera } = useThree(); // Get the camera reference
  const [clickedPointer, setClickedPointer] = useState(null); // State for the clicked pointer

  const pointerPositions = [
    new Vector3(0.4, 0.3, 1.6),
    new Vector3(1.3, 0.35, 1),
    new Vector3(1.3, 1, 0),
    new Vector3(0.6, 1.2, 0),
    new Vector3(0.3, 1.7, -0.6),
    new Vector3(0.7, 2.1, -0.9),
    new Vector3(0.9, 2.6, -1.7),
    new Vector3(0.5, 3.1, -2.2),
  ];

  const curve = new CatmullRomCurve3(pointerPositions);

  const skyTexture = useLoader(TextureLoader, "/sky2.jpg");

  // Set the sky texture as the scene background
  scene.background = skyTexture;

  const handleClick = (idx) => {
    // Toggle the clicked pointer state to show or hide the dialog
    setClickedPointer(clickedPointer === idx ? null : idx);
  };

  useEffect(() => {
    modelfile.scene.traverse((child) => {
      if (child.isMesh) {
        // Store the original color once if it's not already stored
        if (!originalColors.current.has(child.uuid)) {
          originalColors.current.set(child.uuid, child.material.color.clone());
        }

        // Get the stored original color
        const originalColor = originalColors.current.get(child.uuid);

        // Set the tint color
        const tintColor = new THREE.Color(0x919c76);

        // Blend the tint color with the original color (lerp amount between 0 and 1)
        const blendedColor = originalColor.clone().lerp(tintColor, 0); // 30% tint

        // Apply the blended color back to the material
        child.material.color.copy(blendedColor);
      }
    });
  }, [modelfile]);

  return (
    <>
      {/* Terrain Model */}
      <primitive
        object={terrain.scene}
        position={[-0.5, -1.75, 2.7]}
        rotation={[0, 1, 0]}
        scale={[1.3, 0.6, 1.3]}
      />{" "}
      <animated.group
        ref={group}
        position={[-1.75, -1.75, 0]} // Adjust the position of the entire group (Mountain, Terrain, and Pointers)
        scale={[1.5, 1.5, 1.5]}
      >
        <primitive object={modelfile.scene} 
          // Rotation, position, and scale for the mountain model
          rotation={[0, -1.8, 0]}
          position={[1.2, 0.89, -0.95]}
          scale={[8, 8, 10]}
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
