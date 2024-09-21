import { useGLTF, OrbitControls, Html } from "@react-three/drei";
import { useRef, useState } from "react";
import { Group, Vector3, CatmullRomCurve3 } from "three";
import { useThree, useLoader, useFrame } from "@react-three/fiber";
import { TextureLoader } from "three";
import { useSpring, animated } from "@react-spring/three"; // Spring animation

// Preload all models
useGLTF.preload("/mountain.glb");
useGLTF.preload("/mappointer.glb");
useGLTF.preload("/cloud_ring.glb");
useGLTF.preload("/terrain.glb");

export default function Model() {
  // Load the models
  const mountain = useGLTF("/mountain.glb");
  const mapPointer = useGLTF("/mappointer.glb");
  const cloudRing = useGLTF("/clouds.glb");
  const terrain = useGLTF("/forest.glb");

  const group = useRef<Group>(null);
  const { scene, camera } = useThree(); // Get the camera reference
  const [clickedPointer, setClickedPointer] = useState(null); // State for the clicked pointer
  const [currentIcon, setCurrentIcon] = useState(0); // Keep track of the current map icon

  const pointerPositions = [
    new Vector3(1.5, 0.5, 1.25),
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

  // Define the spring for smooth camera movement
  const [{ position }, api] = useSpring(() => ({
    position: [camera.position.x, camera.position.y, camera.position.z],
    config: { mass: 1, tension: 80, friction: 26 }, // Adjust tension and friction for smoother movement
  }));

  // Apply the spring's position to the camera every frame
  useFrame(() => {
    camera.position.set(
      position.get()[0],
      position.get()[1],
      position.get()[2]
    );
    camera.lookAt(0, 0, 0);
  });

  const handleClick = (idx) => {
    setClickedPointer(clickedPointer === idx ? null : idx);
    setCurrentIcon(idx);

    // Get the clicked pointer's position and adjust the camera target
    const clickedPosition = pointerPositions[idx];
    const newCameraPos = [
      clickedPosition.x - 4, // Adjust the camera's target position relative to the clicked point
      clickedPosition.y + 4,
      clickedPosition.z + 8,
    ];

    // Start spring animation to move the camera to the new position
    api.start({ position: newCameraPos });
  };

  const handleClose = () => {
    setClickedPointer(null); // Close the dialog

    // Reset camera position to [0, 0, 5] (adjust as needed)
    api.start({ position: [0, 2, 10] });
  };

  // Handle left arrow click to go to the previous icon
  const handlePrevious = () => {
    const newIcon =
      currentIcon === 0 ? pointerPositions.length - 1 : currentIcon - 1;
    setCurrentIcon(newIcon);
    handleClick(newIcon);
  };

  // Handle right arrow click to go to the next icon
  const handleNext = () => {
    const newIcon =
      currentIcon === pointerPositions.length - 1 ? 0 : currentIcon + 1;
    setCurrentIcon(newIcon);
    handleClick(newIcon);
  };

  return (
    <>
      {/* Terrain Model */}
      <primitive
        object={terrain.scene}
        position={[-1.65, -1.6, -1.4]}
        scale={[0.75, 0.4, 0.75]}
      />{" "}
      <animated.group
        ref={group}
        position={[-1.75, -1.6, 0]} // Adjust the position of the entire group (Mountain, Terrain, and Pointers)
        scale={[1.5, 1.5, 1.5]}
      >
        <primitive object={mountain.scene} /> {/* Render the mountain */}
        {pointerPositions.map((pos, idx) => (
          <group key={idx} position={pos} onClick={() => handleClick(idx)}>
            <primitive
              object={mapPointer.scene.clone()} // Clone the map pointer for each instance
              scale={[0.1, 0.1, 0.1]} // Keep the scale constant
            />
            {/* Show the dialog only when the pointer is clicked */}
            {clickedPointer === idx && (
              <Html>
                <div
                  style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "25vw",
                    height: "25vh",
                    backgroundColor: "white", // The entire dialog is now white
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: 1000,
                    borderRadius: "10px", // Optional: Rounded corners
                    boxShadow: "0px 0px 10px rgba(0,0,0,0.5)", // Optional: Subtle shadow for better visibility
                    textAlign: "center",
                    position: "relative", // Allow positioning of the arrows
                  }}
                >
                  {/* Conditionally render the "Previous" arrow on the left */}
                  {currentIcon > 0 && (
                    <button
                      onClick={handlePrevious}
                      style={{
                        position: "absolute",
                        left: "-30px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        padding: "15px 15px",
                        backgroundColor: "#007bff",
                        color: "white",
                        border: "none",
                        borderRadius: "50%",
                        cursor: "pointer",
                        fontSize: "24px",
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-arrow-left"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
                        />
                      </svg>
                    </button>
                  )}

                  <div>
                    <p style={{ fontSize: "18px", margin: "0 0 20px 0" }}>
                      Dialog for Goal {currentIcon + 1}
                    </p>
                    <button
                      onClick={handleClose}
                      style={{
                        padding: "10px 20px",
                        backgroundColor: "#007bff",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        marginTop: "10px",
                      }}
                    >
                      Close
                    </button>
                  </div>

                  {/* Conditionally render the "Next" arrow on the right */}
                  {currentIcon < pointerPositions.length - 1 && (
                    <button
                      onClick={handleNext}
                      style={{
                        position: "absolute",
                        right: "-30px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        padding: "15px 15px",
                        backgroundColor: "#007bff",
                        color: "white",
                        border: "none",
                        borderRadius: "50%",
                        cursor: "pointer",
                        fontSize: "24px",
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-arrow-right"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
                        />
                      </svg>
                    </button>
                  )}
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
