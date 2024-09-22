"use client";
import { useGLTF, OrbitControls, Html } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import { Group, Vector3, CatmullRomCurve3 } from "three";
import { useThree, useLoader, useFrame } from "@react-three/fiber";
import { TextureLoader } from "three";
import { useSpring, animated } from "@react-spring/three"; // Spring animation
import { useSearchParams } from "next/navigation";
import { FaCheckCircle } from "react-icons/fa";
import "../styles/global.css";

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

  const searchParams = useSearchParams();
  const [topic, setTopic] = useState("");
  const [subtopics, setSubtopics] = useState([]);
  const [learningPath, setLearningPath] = useState([]);
  const [estimatedTime, setEstimatedTime] = useState("");
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    const topicParam = searchParams.get("topic");
    const subtopicsParam = searchParams.get("subtopics");
    const learningPathParam = searchParams.get("learningPath");
    const estimatedTimeParam = searchParams.get("estimatedTime");

    if (topicParam) setTopic(topicParam);
    if (subtopicsParam) {
      try {
        const parsedSubtopics = JSON.parse(subtopicsParam);
        setSubtopics(parsedSubtopics);
      } catch (error) {
        console.error("Error parsing subtopics:", error);
        setSubtopics([]);
      }
    }
    if (learningPathParam) {
      try {
        setLearningPath(JSON.parse(learningPathParam));
      } catch (error) {
        console.error("Error parsing learning path:", error);
        setLearningPath([]);
      }
    }
    if (estimatedTimeParam) setEstimatedTime(estimatedTimeParam);

    setIsDataLoaded(true);
  }, [searchParams]);

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

    const clickedPosition = pointerPositions[idx];
    const newCameraPos = [
      clickedPosition.x - 4, // Adjust the camera's target position relative to the clicked point
      clickedPosition.y + 4,
      clickedPosition.z + 8,
    ];

    api.start({ position: newCameraPos });
  };

  const handleClose = () => {
    setClickedPointer(null); // Close the dialog

    api.start({ position: [0, 2, 10] });
  };

  const handlePrevious = () => {
    const newIcon =
      currentIcon === 0 ? pointerPositions.length - 1 : currentIcon - 1;
    setCurrentIcon(newIcon);
    handleClick(newIcon);
  };

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
            {clickedPointer === idx && (
              <Html>
                <div
                  style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "25vw",
                    height: "25vh",
                  }}
                >
                  <div className="content-box">
                    <button className="close-btn" onClick={handleClose}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        fill="currentColor"
                        className="bi bi-x"
                        viewBox="0 0 16 16"
                      >
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                      </svg>
                    </button>

                    <button
                      onClick={() => {
                        const updatedSubtopics = [...subtopics];
                        updatedSubtopics[idx].completed = !updatedSubtopics[idx].completed;
                        setSubtopics(updatedSubtopics);
                      }}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        position: "absolute",
                        top: "10px",
                        left: "10px",
                      }}
                    >
                      <FaCheckCircle
                        color={subtopics[idx].completed ? "blue" : "gray"}
                        size={24}
                      />
                    </button>

                    <h2 className="heading-topic">{subtopics[idx].subtopic}</h2>
                    <p className="details-text">{subtopics[idx].details}</p>
                    <h4 className="heading-resources">
                      Recommended Resources:
                    </h4>
                    <ul className="resource-list">
                      {subtopics[idx].recommended_resources.map(
                        (resource, index) => (
                          <li key={index}>{resource}</li>
                        )
                      )}
                    </ul>
                  </div>

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
                        className="bi bi-arrow-left"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
                        />
                      </svg>
                    </button>
                  )}

                  {/* Conditionally render the "Next" arrow on the right */}
                  {currentIcon < pointerPositions.length && (
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
                        className="bi bi-arrow-right"
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
    </>
  );
}
