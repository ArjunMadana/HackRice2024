import { useGLTF, OrbitControls, Html } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import { Group, Vector3, CatmullRomCurve3 } from "three";
import { useThree, useLoader, useFrame } from "@react-three/fiber";
import { TextureLoader } from "three";
import { useSpring, animated } from "@react-spring/three"; // Spring animation
import { useSearchParams } from "next/navigation";
import "../styles/global.css";

// Preload all models
useGLTF.preload("/tokyotower.glb");
useGLTF.preload("/mappointer.glb");
useGLTF.preload("/cloud_ring.glb");
useGLTF.preload("/island.glb");
useGLTF.preload("/airship.glb");

export default function Model() {
  const group = useRef<Group>(null);

  // Load the models
  const modelfile = useGLTF("/tokyotower.glb");
  const mapPointer = useGLTF("/mappointer.glb");
  const terrain = useGLTF("/island.glb");
  const airship = useGLTF("/airship.glb");

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

  const { scene, camera } = useThree(); // Get the camera reference
  const [clickedPointer, setClickedPointer] = useState(null); // State for the clicked pointer
  const [currentIcon, setCurrentIcon] = useState(0); // Keep track of the current map icon

  const pointerPositions = [
    new Vector3(0.7, 1.2, 0.8),
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

  // Define the spring for smooth camera movement
  const [{ position }, api] = useSpring(() => ({
    position: [camera.position.x, camera.position.y, camera.position.z],
    config: { mass: 1, tension: 80, friction: 26 },
  }));

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
      clickedPosition.x - 4,
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
        position={[0, -6.3, -1.5]}
        scale={[12 / 1.2, 7, 12 / 1.2]}
      />
      <animated.group
        ref={group}
        position={[-1.75, -2.5, 0]}
        scale={[1.5, 1.5, 1.5]}
      >
        <primitive
          object={modelfile.scene}
          rotation={[0, -0.4, 0]}
          position={[1.2, 0.93, -0.85]}
          scale={[0.03, 0.025, 0.03]}
        />
        <primitive
          object={airship.scene}
          rotation={[0, 0.75, 0]}
          position={[1.7, 3.45, -1.1]}
          scale={[0.005 / 1.5, 0.005 / 1.5, 0.005 / 1.5]}
        />
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
                        class="bi bi-x"
                        viewBox="0 0 16 16"
                      >
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                      </svg>
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
        <mesh>
          <tubeGeometry attach="geometry" args={[curve, 64, 0.02, 8, false]} />
          <meshBasicMaterial attach="material" color="yellow" />
        </mesh>
      </animated.group>
      <OrbitControls enablePan={true} minDistance={3} maxDistance={12} />
    </>
  );
}
