"use client";
import React, { useState, useEffect } from "react";
import { FaCog, FaList, FaHome } from "react-icons/fa";
import { useRouter } from "next/navigation"; // Import useRouter for navigation

const Heading: React.FC = () => {
  const [hovered, setHovered] = useState<number | null>(null); // Track hovered button index
  const [showListModal, setShowListModal] = useState(false); // Track if the list modal should be shown
  const [showSettingsModal, setShowSettingsModal] = useState(false); // Track if the settings modal should be shown
  const [goals, setGoals] = useState([]); // State to store fetched goals

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

  // Fetch goals from the API
  useEffect(() => {
    const fetchGoals = async () => {
      if (showListModal) {
        try {
          const response = await fetch("/api/goals");
          const data = await response.json();
          setGoals(data); // Set the fetched goals
        } catch (error) {
          console.error("Failed to fetch goals:", error);
        }
      }
    };

    fetchGoals();
  }, [showListModal]); // Re-run fetch when the modal is toggled

  const router = useRouter();

  const handleCardClick = (goal) => {
    // Handle what happens when a card is clicked
    //console.log("Card clicked:", goal);
    const queryParams = new URLSearchParams({
      topic: goal.topic,
      subtopics: JSON.stringify(goal.subtopics),
      learningPath: JSON.stringify(goal.learning_path),
      estimatedTime: goal.estimated_time_to_master,
      id: goal._id
    }).toString();
    router.push(`/${goal.environment}?${queryParams}`);
  };

  useEffect(() => { 
    
  }, [router]);

  return (
    <div style={styles.container} className="mr-5">
      <button
        style={
          hovered === 2 ? { ...styles.button, ...styles.hover } : styles.button
        }
        onMouseEnter={() => setHovered(2)}
        onMouseLeave={() => setHovered(null)}
        onClick={() => (window.location.href = "/")} // Navigate to home when clicked
      >
        <FaHome style={styles.icon} />
      </button>

      <button
        style={
          hovered === 1 ? { ...styles.button, ...styles.hover } : styles.button
        }
        onMouseEnter={() => setHovered(1)}
        onMouseLeave={() => setHovered(null)}
        onClick={toggleListModal} // Toggle list modal visibility when the list icon is clicked
      >
        <FaList style={styles.icon} />
      </button>

      {showListModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <button onClick={closeListModal} style={styles.closeButton}>
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
                    onClick={() => handleCardClick(goal)} // Make the card clickable
                  >
                    <div style={styles.cardContent}>
                      <div style={styles.goalName}>{goal.topic}</div>
                      <div style={styles.progressBarContainer}>
                        <div
                          style={{
                            ...styles.progressBar,
                            width: `${goal.progress}%`, // Set width based on progress
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
        onClick={toggleSettingsModal} // Toggle settings modal visibility when the cog icon is clicked
      >
        <FaCog style={styles.icon} />
      </button>

      {showSettingsModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <button onClick={closeSettingsModal} style={styles.closeButton}>
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
    gap: "10px", // Adjust the gap between buttons if needed
  },
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    padding: "15px",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "all 0.2s ease-in-out", // Smooth transition for hover effects
  },
  hover: {
    transform: "scale(1.1)", // Slightly increase size on hover
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // Add shadow effect
  },
  icon: {
    fontSize: "40px", // Adjust the size of the icon if needed
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    position: "relative", // To position the close button within the modal
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.3)",
    textAlign: "center",
    width: "80%",
    height: "80%",
    overflowY: "auto", // Allow scrolling when content overflows
  },
  closeButton: {
    position: "absolute",
    top: "10px",
    left: "10px",
    backgroundColor: "red", // Red background
    color: "white", // White "X" icon
    border: "none",
    fontSize: "24px",
    fontWeight: "bold",
    borderRadius: "50%", // Circle button
    width: "35px",
    height: "35px",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  goalList: {
    display: "flex",
    flexDirection: "column",
    gap: "15px", // Add space between cards
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
    height: "40px", // Increase the height of the progress bar container
    marginLeft: "10px",
  },
  progressBar: {
    color: "black",
    height: "100%",
    backgroundColor: "#76c7c0",
    textAlign: "center",
    lineHeight: "40px", // Match this with the height to vertically center the text
    fontWeight: "bold", // Optional: Make the text bold
  },
};

export default Heading;
