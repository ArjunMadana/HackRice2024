"use client";
import React, { useState, useEffect } from "react";
import { FaCog, FaList, FaHome } from "react-icons/fa";
import { useRouter } from "next/navigation";

const Heading: React.FC = () => {
  const [hovered, setHovered] = useState<number | null>(null);
  const [showListModal, setShowListModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [goals, setGoals] = useState([]);

  const toggleListModal = () => {
    setShowListModal(!showListModal);
  };

  const toggleSettingsModal = () => {
    setShowSettingsModal(!showSettingsModal);
  };

  const closeListModal = () => {
    setShowListModal(false);
  };

  const closeSettingsModal = () => {
    setShowSettingsModal(false);
  };

  useEffect(() => {
    const fetchGoals = async () => {
      if (showListModal) {
        try {
          const response = await fetch("/api/goals");
          const data = await response.json();
          setGoals(data);
        } catch (error) {
          console.error("Failed to fetch goals:", error);
        }
      }
    };

    fetchGoals();
  }, [showListModal]);

  const router = useRouter();

  const handleCardClick = (goal) => {
    const queryParams = new URLSearchParams({
      topic: goal.topic,
      subtopics: JSON.stringify(goal.subtopics),
      learningPath: JSON.stringify(goal.learning_path),
      estimatedTime: goal.estimated_time_to_master,
    }).toString();
    router.push(`/${goal.environment}?${queryParams}`);
  };

  return (
    <div style={styles.container} className="mr-5">
      <button
        style={
          hovered === 2 ? { ...styles.button, ...styles.hover } : styles.button
        }
        onMouseEnter={() => setHovered(2)}
        onMouseLeave={() => setHovered(null)}
        onClick={() => (window.location.href = "/")}
      >
        <FaHome style={styles.icon} />
      </button>

      <button
        style={
          hovered === 1 ? { ...styles.button, ...styles.hover } : styles.button
        }
        onMouseEnter={() => setHovered(1)}
        onMouseLeave={() => setHovered(null)}
        onClick={toggleListModal}
      >
        <FaList style={styles.icon} />
      </button>

      {showListModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <button
              onClick={closeListModal}
              style={styles.closeButton}
              onMouseEnter={() =>
                setHovered(3)
              }
              onMouseLeave={() => setHovered(null)}
            >
              &times;
            </button>
            <h2
              style={{
                fontSize: "36px",
                fontWeight: "bold",
                marginBottom: "20px",
              }}
            >
              All Goals
            </h2>
            <div style={styles.goalList}>
              {goals.length > 0 ? (
                goals.map((goal, index) => (
                  <div
                    key={index}
                    style={styles.card}
                    onClick={() => handleCardClick(goal)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "scale(1.01)";
                      e.currentTarget.style.boxShadow =
                        "0px 6px 14px rgba(0, 0, 0, 0.2)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                      e.currentTarget.style.boxShadow =
                        "0px 4px 12px rgba(0, 0, 0, 0.1)";
                    }}
                  >
                    <div style={styles.cardContent}>
                      <div style={styles.goalName}>{goal.topic}</div>
                      <div style={styles.progressBarContainer}>
                        <div
                          style={{
                            ...styles.progressBar,
                            width: `${goal.progress}%`,
                          }}
                        >
                          {goal.progress}%
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div>No goals available.</div>
              )}
            </div>
          </div>
        </div>
      )}

      <button
        style={
          hovered === 0 ? { ...styles.button, ...styles.hover } : styles.button
        }
        onMouseEnter={() => setHovered(0)}
        onMouseLeave={() => setHovered(null)}
        onClick={toggleSettingsModal}
      >
        <FaCog style={styles.icon} />
      </button>

      {showSettingsModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <button
              onClick={closeSettingsModal}
              style={styles.closeButton}
              onMouseEnter={() => setHovered(3)}
              onMouseLeave={() => setHovered(null)}
            >
              &times;
            </button>
            <h2>Settings</h2>
            <p>Settings content goes here.</p>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    gap: "10px",
  },
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#148444",
    color: "white",
    border: "none",
    padding: "15px",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "all 0.2s ease-in-out",
  },
  hover: {
    transform: "scale(1.1)",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
  },
  icon: {
    fontSize: "40px",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    position: "relative",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.3)",
    textAlign: "center",
    width: "80%",
    height: "80%",
    overflowY: "auto",
  },
  closeButton: {
    position: "absolute",
    top: "10px",
    left: "10px",
    backgroundColor: "red",
    color: "white",
    border: "none",
    fontSize: "24px",
    fontWeight: "bold",
    borderRadius: "50%",
    width: "35px",
    height: "35px",
    cursor: "pointer",
    transition: "all 0.2s ease-in-out",
  },
  goalList: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  card: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
    cursor: "pointer",
    width: "100%",
  },
  cardContent: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
  },
  goalName: {
    flex: "1",
    fontSize: "18px",
    fontWeight: "bold",
    textAlign: "left",
  },
  progressBarContainer: {
    flex: "1",
    backgroundColor: "#e0e0e0",
    borderRadius: "5px",
    overflow: "hidden",
    height: "40px",
    marginLeft: "10px",
  },
  progressBar: {
    color: "black",
    height: "100%",
    backgroundColor: "#76c7c0",
    textAlign: "center",
    lineHeight: "40px",
    fontWeight: "bold",
  },
};

export default Heading;
