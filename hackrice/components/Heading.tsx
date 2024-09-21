"use client";
import React, { useState } from "react";
import { FaCog, FaList } from "react-icons/fa";

const Heading: React.FC = () => {
  const [hovered, setHovered] = useState<number | null>(null); // Track hovered button index
  const [showListModal, setShowListModal] = useState(false); // Track if the list modal should be shown
  const [showSettingsModal, setShowSettingsModal] = useState(false); // Track if the settings modal should be shown

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

  return (
    <div style={styles.container} className="mr-5">
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
            <h2 className="text-3xl font-bold">All Goals</h2>
            <ul>
              <li>Option 1</li>
              <li>Option 2</li>
              <li>Option 3</li>
            </ul>
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
    width: "50%",
    height: "50%",
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
};

export default Heading;
